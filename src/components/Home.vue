<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import {
  Send,
  ArrowUpRight,
  X,
  Github,
  Linkedin,
  Download,
  Mail,
  MapPin,
  Briefcase,
  Sun,
  Moon,
} from "lucide-vue-next";

import "@google/model-viewer";
import { ModelViewerElement } from "@google/model-viewer";
import portraitModelUrl from "../assets/models/model.glb?url";
import { projects } from "../data/projects.js";
import AnimatedCounter from "./AnimatedCounter.vue";

ModelViewerElement.meshoptDecoderLocation =
  "https://unpkg.com/meshoptimizer@0.17.0/meshopt_decoder.js";

const toast = useToast();

/* ------------------------------------------------------------------ *
 * UI state
 * ------------------------------------------------------------------ */
const isShowPopup = ref(false);
const showAllProjects = ref(false);
const rootRef = ref(null);
const mainRef = ref(null);
const modelViewerRef = ref(null);
const enable3D = ref(true);
const modelLoaded = ref(false);
const modelError = ref(false);
const loadProgress = ref(0);
const activeStage = ref("intro");
const hotspotsReady = ref(false);
const hasInteracted = ref(false);
const isDesktop = ref(true);

/* ------------------------------------------------------------------ *
 * Theme: follows the OS until the visitor picks one, then remembers it.
 * ------------------------------------------------------------------ */
const THEME_KEY = "portfolio-theme";
const readStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};
const systemPrefersDark = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-color-scheme: dark)").matches;

const storedTheme = readStoredTheme();
const isDark = ref(storedTheme ? storedTheme === "dark" : systemPrefersDark());
const isBooting = ref(false);
const themeClass = computed(() =>
  isDark.value ? "pf-theme-dark" : "pf-theme-light",
);

let themeMedia = null;
let bootTimer = null;
let layoutTimer = null;

const syncDocumentTheme = (dark) => {
  const el = document.documentElement;
  el.style.colorScheme = dark ? "dark" : "light";
  el.style.backgroundColor = dark ? "#060b14" : "#f4f5f6";
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  try {
    localStorage.setItem(THEME_KEY, isDark.value ? "dark" : "light");
  } catch {
    /* storage unavailable — theme just won't persist */
  }
};

const onSystemThemeChange = (e) => {
  if (!readStoredTheme()) isDark.value = e.matches;
};

// Short "power-on" flicker whenever the hologram switches on.
const playBoot = () => {
  if (reduceMotion) return;
  isBooting.value = true;
  clearTimeout(bootTimer);
  bootTimer = setTimeout(() => (isBooting.value = false), 1500);
};

// Live camera readout (72deg / 82deg = the original front view)
const currentThetaDeg = ref(72);
const currentPhiDeg = ref(82);

const togglePopup = () => (isShowPopup.value = !isShowPopup.value);

/* ------------------------------------------------------------------ *
 * Contact
 * ------------------------------------------------------------------ */
const form = ref({ name: "", email: "", subject: "", message: "" });
const EMAIL = "rei.nhard3367@gmail.com";

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    toast.success("Email copied to clipboard.");
  } catch {
    toast.error("Couldn't copy — select the email manually.");
  }
};

// Real form submission → Formspree (replace endpoint with your own)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME"; // TODO
const submitting = ref(false);

const submitContact = async () => {
  if (!form.value.name || !form.value.message || !form.value.email) {
    toast.error("Please fill in your name, email, and message.");
    return;
  }
  submitting.value = true;
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form.value),
    });
    if (!res.ok) throw new Error("Network error");
    toast.success("Message sent — I'll get back to you soon.");
    form.value = { name: "", email: "", subject: "", message: "" };
  } catch {
    const subject = encodeURIComponent(
      form.value.subject || `Inquiry from ${form.value.name}`,
    );
    const body = encodeURIComponent(
      `${form.value.message}\n\nFrom: ${form.value.name}\nEmail: ${form.value.email}`,
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`,
      "_blank",
    );
    toast.info("Opened email draft as fallback.");
  } finally {
    submitting.value = false;
  }
};

/* ------------------------------------------------------------------ *
 * Camera choreography
 * ------------------------------------------------------------------ */
const STAGES = [
  {
    id: "intro",
    label: "Intro",
    anchor: "top",
    pose: { theta: 72, phi: 82, radius: 105, offsetX: -0.14, panX: 0, panY: 0 },
  },
  {
    id: "about",
    label: "About",
    anchor: "about",
    pose: {
      theta: 115,
      phi: 76,
      radius: 98,
      offsetX: -0.22,
      panX: 0.26,
      panY: 0,
    },
  },
  {
    id: "work",
    label: "Work",
    anchor: "work",
    pose: { theta: 35, phi: 74, radius: 112, offsetX: -0.08, panX: 0, panY: 0 },
  },
  {
    id: "experience",
    label: "Experience",
    anchor: "experience",
    pose: { theta: 105, phi: 86, radius: 100, offsetX: -0.2, panX: 0, panY: 0 },
  },
  {
    id: "toolset",
    label: "Toolset",
    anchor: "toolset",
    pose: {
      theta: 48,
      phi: 78,
      radius: 96,
      offsetX: -0.1,
      panX: -0.26,
      panY: 0,
    },
  },
  {
    id: "contact",
    label: "Contact",
    anchor: "contact",
    pose: { theta: 72, phi: 82, radius: 94, offsetX: -0.14, panX: 0, panY: 0 },
  },
];

const POSE_KEYS = ["theta", "phi", "radius", "offsetX", "panX", "panY"];

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (t) => t * t * (3 - 2 * t);
const angleDelta = (from, to) => ((((to - from) % 360) + 540) % 360) - 180;

const mixPose = (a, b, t) => {
  const out = {};
  for (const k of POSE_KEYS) out[k] = lerp(a[k], b[k], t);
  return out;
};

// Phones: panels cover the full width, so keep the model centered and a touch smaller.
const resolvePose = (p) => ({
  ...p,
  panX: isDesktop.value ? p.panX : 0,
  radius: p.radius + (isDesktop.value ? 0 : 8),
});

let baseTarget = { x: 0, y: 0.8, z: 0 };
let cur = { ...resolvePose(STAGES[0].pose) };
let tgt = { ...cur };
let stageCenters = [];
let userUntil = 0;
let lastAppliedKey = "";
let introPlaying = false;
let reduceMotion = false;
let rafId = null;
let lastT = 0;
let lastScrollY = 0;
let scrollVel = 0;

const computeLayout = () => {
  isDesktop.value = window.innerWidth >= 1024;
  stageCenters = STAGES.map((s) => {
    const el = document.querySelector(`[data-stage="${s.id}"]`);
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return r.top + window.scrollY + r.height / 2;
  });
};

const scheduleLayout = () => {
  clearTimeout(layoutTimer);
  layoutTimer = setTimeout(() => {
    computeLayout();
    computeTargetFromScroll();
  }, 120);
};

const computeTargetFromScroll = () => {
  const n = STAGES.length;
  if (!stageCenters.length) return;
  const anchor = window.scrollY + window.innerHeight * 0.5;

  let i = 0;
  while (i < n - 1 && anchor >= stageCenters[i + 1]) i++;

  let pose;
  let stageIdx = i;
  if (i >= n - 1) {
    pose = STAGES[n - 1].pose;
  } else {
    const span = stageCenters[i + 1] - stageCenters[i] || 1;
    const t = clamp((anchor - stageCenters[i]) / span, 0, 1);
    pose = mixPose(STAGES[i].pose, STAGES[i + 1].pose, smoothstep(t));
    stageIdx = t > 0.5 ? i + 1 : i;
  }

  tgt = resolvePose(pose);
  const id = STAGES[stageIdx].id;
  if (activeStage.value !== id) activeStage.value = id;
};

const writeCamera = (mv, o, sway = 0, swayPhi = 0, force = false) => {
  if (!mv) return;
  const th = (o.theta * Math.PI) / 180;

  // Screen-space pan: slide the target along the camera's right vector.
  const tx = baseTarget.x + o.offsetX + o.panX * Math.cos(th);
  const ty = baseTarget.y + o.panY;
  const tz = baseTarget.z - o.panX * Math.sin(th);

  const orbit = `${(o.theta + sway).toFixed(2)}deg ${clamp(o.phi + swayPhi, 10, 170).toFixed(2)}deg ${o.radius.toFixed(1)}%`;
  const target = `${tx.toFixed(3)}m ${ty.toFixed(3)}m ${tz.toFixed(3)}m`;
  const key = `${orbit}|${target}`;

  if (force || key !== lastAppliedKey) {
    lastAppliedKey = key;
    mv.cameraOrbit = orbit;
    mv.cameraTarget = target;
    if (typeof mv.jumpCameraToGoal === "function") mv.jumpCameraToGoal();
  }
};

// CSS variables published to the whole page so panels can react to the camera.
const cssVars = {};
const setVar = (name, value) => {
  if (cssVars[name] === value) return;
  cssVars[name] = value;
  rootRef.value?.style.setProperty(name, value);
};

const tick = (now) => {
  rafId = requestAnimationFrame(tick);
  const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016;
  lastT = now;

  // Scroll velocity → panels trail the scroll slightly.
  const y = window.scrollY;
  const rawV = dt > 0 ? (y - lastScrollY) / dt : 0;
  lastScrollY = y;
  scrollVel +=
    (clamp(rawV / 1600, -1, 1) - scrollVel) * (1 - Math.exp(-dt * 7));

  computeTargetFromScroll();

  const mv = modelViewerRef.value;
  if (mv && enable3D.value && modelLoaded.value && now > userUntil) {
    const rate = reduceMotion ? 60 : introPlaying ? 2.2 : 4.5;
    const k = 1 - Math.exp(-dt * rate);

    cur.theta += angleDelta(cur.theta, tgt.theta) * k;
    cur.phi += (tgt.phi - cur.phi) * k;
    cur.radius += (tgt.radius - cur.radius) * k;
    cur.offsetX += (tgt.offsetX - cur.offsetX) * k;
    cur.panX += (tgt.panX - cur.panX) * k;
    cur.panY += (tgt.panY - cur.panY) * k;

    if (
      introPlaying &&
      Math.abs(angleDelta(cur.theta, tgt.theta)) < 0.8 &&
      Math.abs(tgt.radius - cur.radius) < 0.8
    ) {
      introPlaying = false;
    }

    // Tiny idle breathing so the model never feels frozen.
    const live = !reduceMotion && !introPlaying;
    const sway = live ? Math.sin(now / 1700) * 1.1 : 0;
    const swayPhi = live ? Math.cos(now / 2300) * 0.45 : 0;
    writeCamera(mv, cur, sway, swayPhi);
  }

  const thetaDeg = Math.round(cur.theta);
  if (currentThetaDeg.value !== thetaDeg) currentThetaDeg.value = thetaDeg;
  const phiDeg = Math.round(cur.phi);
  if (currentPhiDeg.value !== phiDeg) currentPhiDeg.value = phiDeg;

  // Camera → page: panels use these for depth parallax.
  const ox = clamp(angleDelta(72, cur.theta) / 48, -1.25, 1.25);
  const oy = clamp((cur.phi - 82) / 10, -1.25, 1.25);
  const max = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  setVar("--ox", ox.toFixed(3));
  setVar("--oy", oy.toFixed(3));
  // Projector base flattens as the camera drops toward the horizon.
  const flat = clamp(Math.cos((cur.phi * Math.PI) / 180) * 1.6, 0.14, 0.5);
  setVar("--flat", flat.toFixed(3));
  setVar("--sv", scrollVel.toFixed(3));
  setVar("--sp", clamp(y / max, 0, 1).toFixed(4));
};

const onUserCameraChange = (event) => {
  if (event.detail?.source !== "user-interaction") return;
  userUntil = performance.now() + 2600;
  hasInteracted.value = true;

  const mv = modelViewerRef.value;
  if (mv && typeof mv.getCameraOrbit === "function") {
    const o = mv.getCameraOrbit();
    if (typeof o?.theta === "number" && typeof o?.phi === "number") {
      cur.theta = (o.theta * 180) / Math.PI;
      cur.phi = (o.phi * 180) / Math.PI;
    }
  }
};

const onModelProgress = (e) => {
  loadProgress.value = Math.round((e.detail?.totalProgress || 0) * 100);
};

const onModelError = () => {
  modelLoaded.value = false;
  modelError.value = true;
};

const triggerLoad3D = () => {
  modelError.value = false;
  modelLoaded.value = false;
  loadProgress.value = 0;
  enable3D.value = true;
};

/* ------------------------------------------------------------------ *
 * 3D-anchored annotation tags (model-viewer hotspots)
 * ------------------------------------------------------------------ */
const hotspots = computed(() => [
  {
    id: "base",
    stages: ["intro"],
    side: "r",
    f: [0.2, 0.4, 0.12],
    kicker: "Based in",
    label: "Philippines · GMT+8",
  },
  {
    id: "since",
    stages: ["about"],
    side: "l",
    f: [-0.2, 0.3, 0.12],
    kicker: "Freelance since",
    label: "2021",
  },
  {
    id: "shipped",
    stages: ["work"],
    side: "r",
    f: [0.22, 0.12, 0.12],
    kicker: "Shipped",
    label: `${projects.length} projects`,
  },
  {
    id: "front",
    stages: ["toolset"],
    side: "r",
    f: [0.2, 0.4, 0.12],
    kicker: "Front-end",
    label: "React · Vue · TypeScript",
  },
  {
    id: "back",
    stages: ["toolset"],
    side: "r",
    f: [0.22, 0.1, 0.12],
    kicker: "Back-end",
    label: "Laravel · Node.js",
  },
]);

const placeHotspots = (mv) => {
  try {
    const c = mv.getBoundingBoxCenter();
    const d = mv.getDimensions();
    hotspots.value.forEach((h) => {
      const x = c.x + h.f[0] * d.x;
      const y = c.y + h.f[1] * d.y;
      const z = c.z + h.f[2] * d.z;
      mv.updateHotspot({
        name: `hotspot-${h.id}`,
        position: `${x.toFixed(3)}m ${y.toFixed(3)}m ${z.toFixed(3)}m`,
      });
    });
    mv.updateHotspot({
      name: "hotspot-base",
      position: `${c.x.toFixed(3)}m ${(c.y - d.y / 2).toFixed(3)}m ${c.z.toFixed(3)}m`,
    });
    hotspotsReady.value = true;
  } catch {
    hotspotsReady.value = false;
  }
};

/* ------------------------------------------------------------------ *
 * Hologram material pass (dark mode only, fully reversible)
 * ------------------------------------------------------------------ */
const HOLO_TINT = [0.38, 0.78, 1, 1];
const HOLO_EMISSIVE = [0.02, 0.26, 0.6];
const HOLO_ALPHA = 1;
const holoStash = new WeakMap();

const applyHologram = (on) => {
  const materials = modelViewerRef.value?.model?.materials;
  if (!materials) return;

  materials.forEach((m) => {
    try {
      const pbr = m.pbrMetallicRoughness;
      if (!holoStash.has(m)) {
        holoStash.set(m, {
          base: [...pbr.baseColorFactor],
          emissive: [...m.emissiveFactor],
          alphaMode: m.alphaMode,
        });
      }
      const o = holoStash.get(m);

      if (on) {
        const [r, g, b, a] = o.base;
        pbr.setBaseColorFactor([
          r * HOLO_TINT[0],
          g * HOLO_TINT[1],
          b * HOLO_TINT[2],
          a * HOLO_ALPHA,
        ]);
        m.setEmissiveFactor(HOLO_EMISSIVE);
        if (HOLO_ALPHA < 1) m.setAlphaMode("BLEND");
      } else {
        pbr.setBaseColorFactor(o.base);
        m.setEmissiveFactor(o.emissive);
        m.setAlphaMode(o.alphaMode);
      }
    } catch {
      /* material API not available — CSS hologram effects still apply */
    }
  });
};

const onModelLoad = () => {
  const mv = modelViewerRef.value;

  if (mv && typeof mv.getCameraTarget === "function") {
    const t = mv.getCameraTarget();
    baseTarget = {
      x: Number.isFinite(t?.x) ? t.x : 0,
      y: Number.isFinite(t?.y) ? t.y : 0.8,
      z: Number.isFinite(t?.z) ? t.z : 0,
    };
  }

  computeLayout();
  computeTargetFromScroll();

  cur = reduceMotion
    ? { ...tgt }
    : {
        ...tgt,
        theta: tgt.theta - 42,
        phi: tgt.phi - 9,
        radius: tgt.radius + 36,
      };
  introPlaying = !reduceMotion;

  writeCamera(mv, cur, 0, 0, true);
  placeHotspots(mv);
  applyHologram(isDark.value);
  modelError.value = false;
  modelLoaded.value = true;
  if (isDark.value) playBoot();
};

/* ------------------------------------------------------------------ *
 * Panel tilt + glare (CSS variables → no inline transform fights)
 * ------------------------------------------------------------------ */
const handleCardMove = (e) => {
  if (!isDesktop.value || reduceMotion) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--rx", `${(x * 4.5).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${(-y * 4.5).toFixed(2)}deg`);
  el.style.setProperty("--tz", "6px");
  el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty("--glare", "0.5");
};

const handleCardLeave = (e) => {
  const el = e.currentTarget;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
  el.style.setProperty("--tz", "0px");
  el.style.setProperty("--glare", "0");
};

/* ------------------------------------------------------------------ *
 * Reveal + navigation
 * ------------------------------------------------------------------ */
let revealObserver = null;
let layoutObserver = null;

const observeReveals = () => {
  if (!revealObserver) return;
  document.querySelectorAll(".reveal:not([data-obs])").forEach((el) => {
    el.dataset.obs = "1";
    revealObserver.observe(el);
  });
};

const goTo = (anchor) => {
  const el = document.getElementById(anchor);
  if (!el) return;
  el.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
};

const onKeydown = (e) => {
  if (e.key === "Escape" && isShowPopup.value) isShowPopup.value = false;
};

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lowMem =
    typeof navigator !== "undefined" &&
    typeof navigator.deviceMemory === "number" &&
    navigator.deviceMemory <= 4;
  const saveData =
    typeof navigator !== "undefined" && !!navigator.connection?.saveData;
  const smallScreen = window.innerWidth < 1024;
  enable3D.value = !(smallScreen && (lowMem || saveData));

  syncDocumentTheme(isDark.value);
  themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  themeMedia.addEventListener?.("change", onSystemThemeChange);

  computeLayout();
  computeTargetFromScroll();
  cur = { ...tgt };
  lastScrollY = window.scrollY;

  window.addEventListener("resize", scheduleLayout, { passive: true });
  window.addEventListener("keydown", onKeydown);

  if (typeof ResizeObserver !== "undefined" && mainRef.value) {
    layoutObserver = new ResizeObserver(scheduleLayout);
    layoutObserver.observe(mainRef.value);
  }

  revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("revealed");
        revealObserver.unobserve(e.target);
      }),
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
  );
  observeReveals();

  rafId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  window.removeEventListener("resize", scheduleLayout);
  window.removeEventListener("keydown", onKeydown);
  themeMedia?.removeEventListener?.("change", onSystemThemeChange);
  clearTimeout(bootTimer);
  clearTimeout(layoutTimer);
  document.documentElement.style.colorScheme = "";
  document.documentElement.style.backgroundColor = "";
  if (rafId) cancelAnimationFrame(rafId);
  revealObserver?.disconnect();
  layoutObserver?.disconnect();
});

watch(showAllProjects, () => nextTick(observeReveals));

watch(isDark, (dark) => {
  syncDocumentTheme(dark);
  applyHologram(dark);
  if (dark) playBoot();
});

/* ------------------------------------------------------------------ *
 * Content
 * ------------------------------------------------------------------ */
const skillGroups = [
  {
    label: "Front-end",
    items: [
      "React",
      "Next.js",
      "Vue",
      "Inertia.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
    ],
  },
  {
    label: "Back-end",
    items: [
      "Laravel",
      "PHP",
      "Node.js",
      "Python",
      "REST/GraphQL APIs",
      "Prisma ORM",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "Neon", "Schema design & migrations"],
  },
  {
    label: "Tooling & Infra",
    items: ["Git", "Vercel", "Netlify", "Linux", "Docker (basic)", "CI basics"],
  },
  {
    label: "Also familiar with",
    items: ["React Native", "Java", "WordPress / Elementor"],
  },
];

const careerHistory = [
  {
    title: "Senior Software Engineer",
    company: "Hashed.IT",
    employment_type: "Contract",
    period: "May 2024 — May 2025",
    location: "Remote",
    stack: "Laravel · React · AI integrations · PostgreSQL",
    bullets: [
      "Engineered intelligent systems and digital solutions powering the next generation of local industries.",
      "Integrated advanced AI solutions and optimized backend architectures to scale system capabilities.",
    ],
  },
  {
    title: "Web Developer",
    company: "Brandetize",
    employment_type: "Contract",
    period: "Dec 2023 — Mar 2024",
    location: "Remote",
    stack: "JavaScript · API Integrations · Marketing Funnels",
    bullets: [
      "Built and optimized the high-performing digital architecture driving company and client growth.",
      "Focused on engineering seamless marketing funnels, scaling robust lead generation systems, and managing platform maintenance.",
    ],
  },
  {
    title: "Web Developer",
    company: "Onda Fit",
    employment_type: "Contract",
    period: "Jun 2023 — Dec 2023",
    location: "Remote",
    stack: "React · Laravel · Payment Gateways",
    bullets: [
      "Served as a pioneer developer building the definitive management platform for Philippine sports and wellness hubs (pickleball, Pilates).",
      "Optimized local business operations by streamlining scheduling systems and driving membership retention features.",
    ],
  },
  {
    title: "Software Developer (Thesis Project)",
    company: "Mater Dei College – Bohol",
    employment_type: "Academic",
    period: "Jan 2023 — Apr 2023",
    location: "Bohol, PH",
    stack: "Laravel · Vue · Inertia · Tailwind",
    bullets: [
      "Developed the Mater Dei College Enterprise Management Platform (PRMS, SEC, HR systems).",
      "Built an Asset Management Engine to digitize equipment leasing workflows.",
      "Built an HR & Leave Automation module handling secure, digital leave requests.",
    ],
  },
  {
    title: "Freelance Software Engineer",
    company: "Independent",
    employment_type: "Freelance",
    period: "Since 2021",
    location: "Remote",
    stack: "Laravel · Vue · React · Next.js · Prisma · Tailwind",
    bullets: [
      "Architected and deployed scalable web applications using modern JavaScript frameworks.",
      "Integrated third-party APIs, database solutions, and cloud services to deliver robust end-to-end digital solutions.",
      "Managed full project lifecycles independently, ensuring on-time delivery and adherence to high-quality software standards.",
    ],
  },
];

const personalDetails = {
  name: "Reinhard Esteban",
  img: "profile_img.jpg",
  title: "Full-Stack Web Developer",
  tagline:
    "Solution-oriented Full-Stack Developer engineering seamless user interfaces paired with secure, robust backend logic.",
  location: "Philippines · Remote (GMT+8)",
  availability: "Open to full-stack roles",
};

const stats = computed(() => [
  { text: "Since 2021", label: "Freelance" },
  { value: projects.length, label: "Projects Shipped" },
  {
    value: skillGroups.reduce((n, g) => n + g.items.length, 0),
    label: "Tools Used",
  },
]);

const featuredProjects = computed(() => projects.filter((p) => p.featured));
const otherProjects = computed(() => projects.filter((p) => !p.featured));
const visibleProjects = computed(() =>
  showAllProjects.value ? projects : featuredProjects.value,
);

const azLabel = computed(() =>
  String(((currentThetaDeg.value % 360) + 360) % 360).padStart(3, "0"),
);
const elLabel = computed(() =>
  String(Math.max(0, currentPhiDeg.value)).padStart(3, "0"),
);

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
</script>

<template>
  <div
    ref="rootRef"
    :class="themeClass"
    class="pf-root relative min-h-screen bg-[color:var(--bg)] text-neutral-900 antialiased font-sans selection:bg-[color:var(--sel-bg)] selection:text-[color:var(--sel-fg)] overflow-x-clip"
  >
    <!-- =========================================================
         LAYER 0: BACKDROP & STAGE RINGS
    ========================================================== -->
    <div
      class="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div class="backdrop-wash absolute inset-0"></div>
      <div class="backdrop-grid absolute inset-0"></div>

      <div
        class="ring-glow hidden lg:block w-[460px] h-[460px] border border-neutral-300/60 rounded-full relative translate-x-10 transition-[scale,opacity] duration-700"
        :class="
          activeStage === 'work'
            ? 'scale-110 opacity-40'
            : 'scale-100 opacity-75'
        "
      >
        <div
          class="absolute inset-7 rounded-full border border-dashed border-neutral-300/70 will-change-transform"
          :style="{ transform: `rotate(${72 - currentThetaDeg}deg)` }"
        >
          <span
            class="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[color:var(--accent)] rotate-45"
          ></span>
        </div>

        <span
          class="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-400 tracking-widest bg-[color:var(--bg)] px-2"
        >
          Orbit {{ currentThetaDeg }}°
        </span>
        <span
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-400 tracking-widest bg-[color:var(--bg)] px-2 capitalize"
        >
          {{ activeStage }}
        </span>
      </div>
    </div>

    <div
      class="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
      <div
        class="holo-wrap relative w-full h-full max-w-[920px] max-h-[92vh] lg:translate-x-12 pointer-events-none"
        :class="{ 'is-booting': isBooting }"
      >
        <model-viewer
          ref="modelViewerRef"
          :src="portraitModelUrl"
          alt="Interactive 3D portrait model of Reinhard Esteban"
          camera-controls
          disable-zoom
          disable-pan
          touch-action="pan-y"
          loading="eager"
          interpolation-decay="0"
          :shadow-intensity="isDark ? '0' : '0.9'"
          shadow-softness="0.85"
          :exposure="isDark ? 1.3 : 1.05"
          camera-orbit="72deg 82deg 105%"
          min-camera-orbit="auto 40deg 60%"
          max-camera-orbit="auto 110deg 220%"
          interaction-prompt="none"
          class="mv-stage pointer-events-auto block w-full h-full focus:outline-none cursor-grab active:cursor-grabbing"
          :class="{ 'is-loaded': modelLoaded }"
          @load="onModelLoad"
          @progress="onModelProgress"
          @camera-change="onUserCameraChange"
        >
          <div
            v-for="h in hotspots"
            :key="h.id"
            :slot="`hotspot-${h.id}`"
            data-position="0m 0m 0m"
            class="hs"
            :class="[
              h.side === 'l' ? 'hs-l' : 'hs-r',
              { 'hs-on': hotspotsReady && h.stages.includes(activeStage) },
            ]"
          >
            <span class="hs-dot"></span>
            <span class="hs-line"></span>
            <span class="hs-label">
              <span class="hs-kicker">{{ h.kicker }}</span>
              <span class="hs-text">{{ h.label }}</span>
            </span>
          </div>

          <div
            slot="hotspot-base"
            data-position="0m 0m 0m"
            class="holo-base"
            :class="{ 'is-on': hotspotsReady }"
          >
            <span class="holo-cone"></span>
            <span class="holo-disc">
              <span class="holo-pool"></span>
              <span class="holo-ring r1"></span>
              <span class="holo-ring r2"></span>
              <span class="holo-ring r3"></span>
            </span>
          </div>
        </model-viewer>

        <div class="holo-fx" aria-hidden="true">
          <span class="holo-lines"></span>
          <span class="holo-beam"></span>
        </div>
      </div>
    </div>

    <header
      class="fixed top-0 inset-x-0 z-40 border-b border-neutral-200/80 bg-[color:var(--chrome)] backdrop-blur-md"
    >
      <div
        class="max-w-7xl mx-auto w-full px-5 sm:px-10 py-4 flex items-center justify-center"
      >
        <nav
          class="flex items-center gap-5 sm:gap-7 text-[11px] tracking-[0.14em] font-medium text-neutral-500"
        >
          <a
            href="#about"
            class="hidden sm:inline hover:text-neutral-900 transition-colors"
            >About</a
          >
          <a
            href="#work"
            class="hidden sm:inline hover:text-neutral-900 transition-colors"
            >Work</a
          >
          <a
            href="#experience"
            class="hidden sm:inline hover:text-neutral-900 transition-colors"
            >Experience</a
          >
          <a
            href="#contact"
            class="hidden sm:inline hover:text-neutral-900 transition-colors"
            >Contact</a
          >

          <button
            @click="toggleTheme"
            :aria-pressed="isDark"
            :title="
              isDark ? 'Switch to light mode' : 'Switch to dark hologram mode'
            "
            class="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <Sun v-if="isDark" class="w-3.5 h-3.5" />
            <Moon v-else class="w-3.5 h-3.5" />
            <span class="hidden md:inline">{{
              isDark ? "Light" : "Dark"
            }}</span>
          </button>
          <a
            href="/assets/cv/resteban_portfolio.pdf"
            download
            class="inline-flex items-center gap-1.5 text-neutral-900 border-b border-neutral-900 pb-0.5 hover:gap-2.5 transition-all"
          >
            Resume <Download class="w-3 h-3" />
          </a>
        </nav>
      </div>

      <div
        class="prog absolute bottom-0 left-0 h-px w-full origin-left bg-[color:var(--accent)]"
        style="transform: scaleX(var(--sp, 0))"
      ></div>
    </header>

    <!-- Model loader -->
    <Transition name="fade">
      <div
        v-if="!modelLoaded"
        class="fixed bottom-14 inset-x-0 z-40 flex flex-col items-center gap-3 pointer-events-none"
        role="status"
        aria-live="polite"
      >
        <div class="w-40 h-px bg-neutral-300 overflow-hidden">
          <div
            class="h-full bg-[color:var(--accent)] transition-all duration-200"
            :style="{ width: `${loadProgress}%` }"
          ></div>
        </div>
        <span class="text-[10px] font-mono tracking-[0.18em] text-neutral-500">
          Loading 3D model · {{ loadProgress }}%
        </span>
      </div>
    </Transition>

    <!-- Stage rail -->
    <nav
      class="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5"
      aria-label="Page sections"
    >
      <button
        v-for="s in STAGES"
        :key="s.id"
        @click="goTo(s.anchor)"
        class="rail-item group flex items-center gap-3 text-[10px] font-mono tracking-widest"
        :class="
          activeStage === s.id
            ? 'text-[color:var(--accent)]'
            : 'text-neutral-400'
        "
        :aria-current="activeStage === s.id ? 'true' : undefined"
      >
        <span
          class="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
        >
          {{ s.label }}
        </span>
        <span
          class="block h-px bg-current transition-all duration-500"
          :class="activeStage === s.id ? 'w-8' : 'w-3 group-hover:w-5'"
        ></span>
      </button>
    </nav>

    <!-- =========================================================
         LAYER 30: SPATIAL FLOATING CONTENT LAYER
    ========================================================== -->
    <main
      ref="mainRef"
      class="relative z-30 pointer-events-none max-w-7xl mx-auto px-5 sm:px-10"
    >
      <!-- 1. HERO STAGE -->
      <section
        id="top"
        data-stage="intro"
        class="min-h-screen pt-28 pb-16 flex flex-col justify-between"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 sm:pt-8"
        >
          <div
            @mousemove="handleCardMove"
            @mouseleave="handleCardLeave"
            style="--i: 1; --depth: 1.1"
            class="reveal lg:col-span-5 pointer-events-auto floating-panel p-6 sm:p-8"
          >
            <div
              class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-5 text-[10px] font-mono tracking-widest text-neutral-500"
            >
              <span class="inline-flex items-center gap-1.5">
                <MapPin class="w-3 h-3" /> {{ personalDetails.location }}
              </span>
              <span class="inline-flex items-center gap-1.5">
                <Briefcase class="w-3 h-3" /> {{ personalDetails.title }}
              </span>
            </div>

            <h1
              class="font-display text-5xl sm:text-6xl tracking-tight leading-[1.0] text-neutral-900 mb-5"
            >
              {{ personalDetails.name }}
            </h1>

            <p
              class="text-[15px] sm:text-base text-neutral-700 leading-relaxed mb-7"
            >
              {{ personalDetails.tagline }}
            </p>

            <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#contact"
                class="btn-solid text-xs tracking-[0.14em] font-medium px-4 py-2.5 inline-flex items-center gap-2 transition-colors"
              >
                Get in touch <ArrowUpRight class="w-3.5 h-3.5" />
              </a>
              <button
                @click="togglePopup"
                class="text-xs font-mono tracking-wider text-neutral-500 hover:text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors"
              >
                What is full-stack?
              </button>
            </div>
          </div>

          <div class="hidden lg:block lg:col-span-4 min-h-[340px]"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 pt-12">
          <div
            @mousemove="handleCardMove"
            @mouseleave="handleCardLeave"
            style="--i: 3; --depth: 0.6"
            class="reveal lg:col-span-6 lg:col-start-4 pointer-events-auto floating-panel grid grid-cols-3 divide-x divide-neutral-200"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="py-4 px-3 sm:px-6 text-center"
            >
              <div
                class="font-display text-neutral-900"
                :class="stat.text ? 'text-xl sm:text-3xl' : 'text-3xl'"
              >
                <AnimatedCounter
                  v-if="stat.value !== undefined"
                  :value="stat.value"
                />
                <span v-else>{{ stat.text }}</span>
              </div>
              <div
                class="text-[10px] font-mono tracking-widest text-neutral-400 mt-1"
              >
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. ABOUT STAGE -->
      <section
        id="about"
        data-stage="about"
        class="py-20 sm:py-32 grid grid-cols-1 lg:grid-cols-12 items-center"
      >
        <div
          @mousemove="handleCardMove"
          @mouseleave="handleCardLeave"
          style="--i: 0; --depth: 1.25"
          class="reveal lg:col-span-5 lg:col-start-8 pointer-events-auto floating-panel p-7 sm:p-9 space-y-6"
        >
          <div class="flex items-center justify-between">
            <span
              class="text-[11px] font-mono tracking-[0.18em] text-neutral-400"
            >
              About
            </span>
            <span class="text-[11px] font-mono text-neutral-400">GMT+8</span>
          </div>

          <h2 class="font-display text-3xl sm:text-4xl text-neutral-900">
            End-to-end engineering, built with clarity.
          </h2>

          <p class="text-[15px] leading-[1.75] text-neutral-700">
            I have worked independently as a freelance software developer since
            2021. I specialize in crafting performant web, mobile, and desktop
            applications using modern architectural patterns.
          </p>
          <p class="text-[15px] leading-[1.75] text-neutral-700">
            From structuring robust backend APIs to designing intuitive user
            interfaces, my primary goal is to translate complex business
            requirements into accessible, reliable, and scalable software
            solutions.
          </p>

          <div class="flex flex-wrap gap-5 pt-3 border-t border-neutral-200/80">
            <a
              href="https://github.com/esyot"
              target="_blank"
              rel="noopener"
              class="text-xs font-mono tracking-wider text-neutral-900 hover:underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              <Github :size="13" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/reinhard-esteban/"
              target="_blank"
              rel="noopener"
              class="text-xs font-mono tracking-wider text-neutral-900 hover:underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              <Linkedin :size="13" /> LinkedIn
            </a>
            <a
              :href="'mailto:' + EMAIL"
              class="text-xs font-mono text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1.5"
            >
              <Mail :size="13" /> {{ EMAIL }}
            </a>
          </div>
        </div>
      </section>

      <!-- 3. SELECTED WORK STAGE -->
      <section id="work" data-stage="work" class="py-20 sm:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-12 mb-10">
          <div
            style="--i: 0; --depth: 0.8"
            class="reveal lg:col-span-5 pointer-events-auto floating-panel px-6 py-4 flex items-center justify-between"
          >
            <span
              class="text-[11px] font-mono tracking-[0.18em] text-neutral-500"
            >
              Selected work ({{ visibleProjects.length }}/{{ projects.length }})
            </span>
            <button
              v-if="otherProjects.length"
              @click="showAllProjects = !showAllProjects"
              class="text-xs font-medium text-neutral-900 border-b border-neutral-900 pb-0.5"
            >
              {{ showAllProjects ? "Featured only" : "View all" }}
            </button>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start"
        >
          <div
            v-for="(project, idx) in visibleProjects"
            :key="project.name"
            @mousemove="handleCardMove"
            @mouseleave="handleCardLeave"
            :style="{ '--i': 0, '--depth': idx % 2 === 0 ? 0.8 : 1.4 }"
            :class="[
              'reveal pointer-events-auto floating-panel p-5 sm:p-6 group',
              idx % 2 === 0
                ? 'lg:col-span-5 lg:col-start-1'
                : 'lg:col-span-5 lg:col-start-8 lg:mt-16',
            ]"
          >
            <router-link :to="'/project/' + toSlug(project.name)" class="block">
              <div
                class="aspect-[16/10] w-full overflow-hidden border border-neutral-200 bg-neutral-100 mb-4"
              >
                <img
                  v-if="project.thumbnail"
                  :src="'/' + String(project.thumbnail).replace(/^\/+/, '')"
                  :alt="project.name"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-neutral-400 font-mono text-[11px] tracking-widest"
                >
                  {{ project.name }}
                </div>
              </div>

              <div class="flex items-baseline justify-between gap-4 mb-2">
                <div class="flex items-baseline gap-2.5 min-w-0">
                  <span class="text-[11px] font-mono text-neutral-400">
                    {{ String(idx + 1).padStart(2, "0") }}
                  </span>
                  <h3
                    class="font-display text-2xl text-neutral-900 leading-tight group-hover:italic transition-all"
                  >
                    {{ project.name }}
                  </h3>
                </div>
                <ArrowUpRight
                  class="w-4 h-4 text-neutral-400 flex-shrink-0 group-hover:text-neutral-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>

              <p class="text-[14px] leading-[1.65] text-neutral-600 mb-3">
                {{ project.description }}
              </p>

              <div
                v-if="project.metrics?.length"
                class="flex flex-wrap gap-x-3 gap-y-1 mb-3"
              >
                <span
                  v-for="m in project.metrics"
                  :key="m"
                  class="text-[11px] font-mono text-neutral-500"
                >
                  · {{ m }}
                </span>
              </div>

              <div
                class="flex flex-wrap gap-x-2.5 gap-y-1 pt-3 border-t border-neutral-200/70"
              >
                <span
                  v-for="(tech, i) in project.tech_stack"
                  :key="tech"
                  class="text-[11px] text-neutral-500 font-mono"
                >
                  {{ tech
                  }}<span
                    v-if="i < project.tech_stack.length - 1"
                    class="text-neutral-300 ml-2"
                    >·</span
                  >
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 4. EXPERIENCE & EDUCATION STAGE -->
      <section
        id="experience"
        data-stage="experience"
        class="py-20 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <div
          @mousemove="handleCardMove"
          @mouseleave="handleCardLeave"
          style="--i: 0; --depth: 0.7"
          class="reveal lg:col-span-4 lg:col-start-1 lg:sticky lg:top-24 pointer-events-auto floating-panel p-6 sm:p-7 space-y-6 order-2 lg:order-1"
        >
          <span
            class="block text-[11px] font-mono tracking-[0.18em] text-neutral-400"
          >
            Education
          </span>

          <div class="space-y-5 divide-y divide-neutral-200">
            <div>
              <h3 class="text-base font-semibold text-neutral-900">
                Mater Dei College
              </h3>
              <p class="text-sm text-neutral-600 mt-1">
                Bachelor of Science in Information Technology
              </p>
            </div>

            <div class="pt-5">
              <h3 class="text-base font-semibold text-neutral-900">
                San Agustin National High School
              </h3>
              <p class="text-sm text-neutral-600 mt-1">
                Senior High School – Programming & Animation (NCIII Certified)
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 lg:col-start-7 space-y-5 order-1 lg:order-2">
          <div
            style="--i: 0; --depth: 1"
            class="reveal pointer-events-auto floating-panel px-6 py-4"
          >
            <span
              class="text-[11px] font-mono tracking-[0.18em] text-neutral-500"
            >
              Experience
            </span>
          </div>

          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            @mousemove="handleCardMove"
            @mouseleave="handleCardLeave"
            :style="{ '--i': 0, '--depth': 0.9 + (idx % 3) * 0.2 }"
            class="reveal pointer-events-auto floating-panel p-6 sm:p-7"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-2"
            >
              <h3 class="text-base sm:text-lg font-semibold text-neutral-900">
                {{ job.title }}
                <span class="text-neutral-500 font-normal"
                  >— {{ job.company }}</span
                >
              </h3>
              <span
                class="text-[10px] font-mono tracking-widest text-neutral-400 flex-shrink-0"
              >
                {{ job.period }}
              </span>
            </div>

            <p class="text-[11px] font-mono text-neutral-500 mb-3">
              {{ job.employment_type }} · {{ job.location }}
              <span v-if="job.stack"> — {{ job.stack }}</span>
            </p>

            <ul class="space-y-1.5 list-disc list-outside ml-4">
              <li
                v-for="(b, i) in job.bullets"
                :key="i"
                class="text-[14px] leading-[1.65] text-neutral-600"
              >
                {{ b }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 5. TOOLSET STAGE -->
      <section
        id="toolset"
        data-stage="toolset"
        class="py-20 sm:py-32 grid grid-cols-1 lg:grid-cols-12"
      >
        <div
          @mousemove="handleCardMove"
          @mouseleave="handleCardLeave"
          style="--i: 0; --depth: 1.15"
          class="reveal lg:col-span-6 lg:col-start-1 pointer-events-auto floating-panel p-7 sm:p-9 space-y-6"
        >
          <span
            class="block text-[11px] font-mono tracking-[0.18em] text-neutral-400"
          >
            Technical toolset
          </span>

          <div class="space-y-6 divide-y divide-neutral-200/80">
            <div
              v-for="(group, gIdx) in skillGroups"
              :key="group.label"
              :class="gIdx > 0 ? 'pt-5' : ''"
            >
              <p
                class="text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-2.5"
              >
                {{ group.label }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="item in group.items"
                  :key="item"
                  class="text-xs text-neutral-800 bg-[color:var(--chip-bg)] border border-neutral-200 px-2.5 py-1 hover:border-neutral-900 transition-colors"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. CONTACT STAGE -->
      <section
        id="contact"
        data-stage="contact"
        class="py-20 sm:py-32 grid grid-cols-1 lg:grid-cols-12"
      >
        <div
          @mousemove="handleCardMove"
          @mouseleave="handleCardLeave"
          style="--i: 0; --depth: 0.8"
          class="reveal lg:col-span-6 lg:col-start-4 pointer-events-auto floating-panel p-7 sm:p-10 space-y-7"
        >
          <div class="space-y-3">
            <span
              class="text-[11px] font-mono tracking-[0.18em] text-neutral-400"
            >
              Contact
            </span>
            <h2
              class="font-display text-4xl sm:text-5xl text-neutral-900 leading-tight"
            >
              Let's build something.
            </h2>
            <p class="text-[15px] leading-relaxed text-neutral-600">
              Have a project in mind, a role to fill, or want to collaborate?
              Send a message — or email directly and I'll respond within a day.
            </p>
            <div
              class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono"
            >
              <a
                :href="'mailto:' + EMAIL"
                class="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
              >
                {{ EMAIL }}
              </a>
              <button
                @click="copyEmail"
                class="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                [Copy email]
              </button>
            </div>
          </div>

          <form @submit.prevent="submitContact" class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  for="c-name"
                  class="block text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-1.5"
                  >Name</label
                >
                <input
                  id="c-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your name"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-sm py-2 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label
                  for="c-email"
                  class="block text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-1.5"
                  >Email</label
                >
                <input
                  id="c-email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@company.com"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-sm py-2 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>
            </div>

            <div>
              <label
                for="c-subject"
                class="block text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-1.5"
                >Subject</label
              >
              <input
                id="c-subject"
                v-model="form.subject"
                type="text"
                placeholder="Role / project"
                class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-sm py-2 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
              />
            </div>

            <div>
              <label
                for="c-message"
                class="block text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-1.5"
                >Message</label
              >
              <textarea
                id="c-message"
                v-model="form.message"
                rows="3"
                placeholder="How can we collaborate?"
                class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-sm py-2 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="btn-solid inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.14em] font-medium disabled:opacity-50 transition-colors"
            >
              {{ submitting ? "Sending…" : "Send message" }}
              <Send class="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      <footer
        class="pointer-events-auto border-t border-neutral-300/80 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-mono"
      >
        <span>© {{ new Date().getFullYear() }} Reinhard Esteban</span>
        <span class="tracking-widest">Built with intention</span>
      </footer>
    </main>

    <!-- Popup Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="isShowPopup"
          :class="themeClass"
          class="modal-scrim fixed inset-0 backdrop-blur-xs flex items-center justify-center z-[100] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full-stack definition"
          @click.self="togglePopup"
        >
          <div
            class="modal-card border border-neutral-300 p-8 max-w-lg w-full shadow-2xl"
          >
            <div class="flex justify-between items-start mb-6">
              <span
                class="text-xs tracking-[0.2em] text-neutral-500 font-medium"
                >Definition</span
              >
              <button
                @click="togglePopup"
                class="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                aria-label="Close"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
            <h3
              class="font-display text-3xl text-neutral-900 mb-4 leading-tight"
            >
              Full-Stack, defined.
            </h3>
            <p class="text-[15px] leading-[1.75] text-neutral-700">
              A full-stack developer designs intuitive user interfaces, manages
              robust database backends, and connects the entire software puzzle
              from end to end — ensuring scalable and reliable architecture.
            </p>
            <div class="pt-8">
              <button
                @click="togglePopup"
                class="btn-solid text-sm font-medium px-6 py-2.5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style>
.pf-theme-light {
  color-scheme: light;
  --bg: #f4f5f6;
  --chrome: rgba(248, 249, 250, 0.8);
  --accent: #171717;
  --sel-bg: #171717;
  --sel-fg: #ffffff;
  --chip-bg: rgba(255, 255, 255, 0.8);

  --wash: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.92) 0%,
    rgba(244, 245, 246, 0.35) 55%,
    rgba(235, 237, 240, 0.7) 100%
  );
  --grid: #d4d4d8;
  --grid-opacity: 0.35;
  --ring-glow: none;

  --panel: rgba(248, 249, 250, 0.86);
  --panel-tex: linear-gradient(transparent, transparent);
  --panel-line: rgba(212, 212, 216, 0.9);
  --panel-line-hover: rgba(161, 161, 170, 0.95);
  --panel-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04), 0 18px 40px -18px rgba(23, 23, 23, 0.12);
  --panel-shadow-hover:
    0 1px 2px rgba(0, 0, 0, 0.05), 0 26px 48px -20px rgba(23, 23, 23, 0.2);
  --bracket: #171717;
  --glare-rgb: 255, 255, 255;

  --btn-bg: #171717;
  --btn-bg-hover: #404040;
  --btn-fg: #ffffff;
  --btn-line: #171717;
  --btn-glow: none;

  --hs-bg: rgba(248, 249, 250, 0.92);
  --hs-line: rgba(212, 212, 216, 0.9);
  --hs-ink: #171717;
  --hs-sub: #737373;
  --hs-halo: rgba(244, 245, 246, 0.9);
  --hs-glow: none;

  --scrim: rgba(23, 23, 23, 0.4);
  --modal-card: #f8f9fa;
  --modal-glow: none;
}

.pf-theme-dark {
  color-scheme: dark;
  --bg: #060b14;
  --chrome: rgba(6, 11, 20, 0.72);
  --accent: #38bdf8;
  --sel-bg: rgba(56, 189, 248, 0.45);
  --sel-fg: #ffffff;
  --chip-bg: rgba(14, 30, 54, 0.7);

  --wash:
    radial-gradient(
      circle at 58% 50%,
      rgba(18, 70, 140, 0.38) 0%,
      rgba(6, 11, 20, 0) 62%
    ),
    radial-gradient(circle at center, #0a1424 0%, #060b14 100%);
  --grid: rgba(56, 189, 248, 0.2);
  --grid-opacity: 0.45;
  --ring-glow:
    0 0 40px -10px rgba(56, 189, 248, 0.45),
    inset 0 0 40px -18px rgba(56, 189, 248, 0.3);

  --panel: rgba(8, 18, 34, 0.62);
  --panel-tex: repeating-linear-gradient(
    to bottom,
    rgba(125, 211, 252, 0.035) 0 1px,
    transparent 1px 3px
  );
  --panel-line: rgba(56, 189, 248, 0.28);
  --panel-line-hover: rgba(125, 211, 252, 0.72);
  --panel-shadow:
    0 0 0 1px rgba(56, 189, 248, 0.05), 0 0 28px -8px rgba(56, 189, 248, 0.3),
    0 18px 40px -18px rgba(0, 0, 0, 0.65);
  --panel-shadow-hover:
    0 0 0 1px rgba(56, 189, 248, 0.12), 0 0 40px -6px rgba(56, 189, 248, 0.5),
    0 24px 48px -20px rgba(0, 0, 0, 0.7);
  --bracket: #7dd3fc;
  --glare-rgb: 125, 211, 252;

  --btn-bg: linear-gradient(
    180deg,
    rgba(56, 189, 248, 0.24),
    rgba(37, 99, 235, 0.3)
  );
  --btn-bg-hover: linear-gradient(
    180deg,
    rgba(56, 189, 248, 0.38),
    rgba(37, 99, 235, 0.46)
  );
  --btn-fg: #e6f6ff;
  --btn-line: rgba(125, 211, 252, 0.55);
  --btn-glow:
    0 0 18px -4px rgba(56, 189, 248, 0.6),
    inset 0 0 12px rgba(56, 189, 248, 0.15);

  --hs-bg: rgba(6, 16, 32, 0.82);
  --hs-line: rgba(56, 189, 248, 0.5);
  --hs-ink: #e6f6ff;
  --hs-sub: #7dd3fc;
  --hs-halo: rgba(6, 11, 20, 0.9);
  --hs-glow: 0 0 16px -2px rgba(56, 189, 248, 0.5);

  --scrim: rgba(2, 6, 14, 0.7);
  --modal-card: rgba(8, 18, 34, 0.94);
  --modal-glow: 0 0 40px -8px rgba(56, 189, 248, 0.4);

  --color-neutral-50: #0a1018;
  --color-neutral-100: #0f1826;
  --color-neutral-200: #1b2a40;
  --color-neutral-300: #26405f;
  --color-neutral-400: #6f8fb5;
  --color-neutral-500: #8aa5c6;
  --color-neutral-600: #a3bad6;
  --color-neutral-700: #c3d3e8;
  --color-neutral-800: #dbe6f5;
  --color-neutral-900: #eaf3ff;
  --color-neutral-950: #f5faff;
}
</style>

<style scoped>
.pf-root,
.floating-panel {
  touch-action: pan-y;
}

.font-display {
  font-family: "Instrument Serif", Georgia, "Times New Roman", serif;
  font-weight: 400;
}

.pf-theme-dark .font-display {
  text-shadow:
    0 0 22px rgba(56, 189, 248, 0.38),
    1px 0 rgba(255, 70, 140, 0.14),
    -1px 0 rgba(56, 200, 255, 0.22);
}

.backdrop-wash {
  background: var(--wash);
}

.backdrop-grid {
  opacity: var(--grid-opacity);
  background-image:
    linear-gradient(to right, var(--grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(
    ellipse 55% 55% at 50% 50%,
    #000 40%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 55% 55% at 50% 50%,
    #000 40%,
    transparent 100%
  );
}

.ring-glow {
  box-shadow: var(--ring-glow);
}

.prog {
  transition: box-shadow 0.4s ease;
}

.pf-theme-dark .prog {
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.85);
}

.btn-solid {
  background: var(--btn-bg);
  color: var(--btn-fg);
  border: 1px solid var(--btn-line);
  box-shadow: var(--btn-glow);
}

.btn-solid:hover:not(:disabled) {
  background: var(--btn-bg-hover);
}

.modal-scrim {
  background: var(--scrim);
}

.modal-card {
  background: var(--modal-card);
  box-shadow: var(--modal-glow);
}

.floating-panel {
  --delay: calc(var(--i, 0) * 110ms);

  background-color: var(--panel);
  background-image:
    radial-gradient(
      380px circle at var(--mx, 50%) var(--my, 0%),
      rgba(var(--glare-rgb), var(--glare, 0)),
      transparent 60%
    ),
    linear-gradient(var(--bracket), var(--bracket)),
    linear-gradient(var(--bracket), var(--bracket)),
    linear-gradient(var(--bracket), var(--bracket)),
    linear-gradient(var(--bracket), var(--bracket)), var(--panel-tex);
  background-repeat: no-repeat;
  background-size:
    100% 100%,
    10px 1px,
    1px 10px,
    10px 1px,
    1px 10px,
    100% 100%;
  background-position:
    0 0,
    0 0,
    0 0,
    100% 100%,
    100% 100%,
    0 0;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--panel-line);
  box-shadow: var(--panel-shadow);

  translate: calc(var(--ox, 0) * var(--depth, 1) * -16px)
    calc(
      var(--oy, 0) * var(--depth, 1) * -10px + var(--sv, 0) * var(--depth, 1) *
        14px
    );
  transform: perspective(1100px) rotateX(var(--ry, 0deg))
    rotateY(var(--rx, 0deg)) translateZ(var(--tz, 0px));
  transform-style: preserve-3d;

  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-color 0.5s ease,
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--delay),
    scale 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--delay),
    filter 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--delay);
  will-change: transform, translate;
}

.floating-panel:hover {
  border-color: var(--panel-line-hover);
  box-shadow: var(--panel-shadow-hover);
}

.reveal {
  opacity: 0;
  scale: 0.965;
  filter: blur(8px);
}

.reveal.revealed {
  opacity: 1;
  scale: 1;
  filter: none;
}

.mv-stage {
  opacity: 0;
  transition:
    opacity 1.2s ease,
    filter 0.8s ease;
}

.mv-stage.is-loaded {
  opacity: 1;
}

.pf-theme-dark .mv-stage {
  filter: drop-shadow(0 0 20px rgba(56, 189, 248, 0.38)) saturate(1.1);
}

.pf-theme-dark .mv-stage.is-loaded {
  animation: holo-idle 9s linear infinite;
}

.pf-theme-dark .holo-wrap.is-booting .mv-stage.is-loaded {
  animation: holo-boot 1.3s steps(1, end) 1;
}

@keyframes holo-idle {
  0%,
  90%,
  100% {
    opacity: 1;
  }
  91% {
    opacity: 0.86;
  }
  92% {
    opacity: 1;
  }
  95% {
    opacity: 0.93;
  }
  96% {
    opacity: 1;
  }
}

@keyframes holo-boot {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  16% {
    opacity: 0.15;
  }
  26% {
    opacity: 1;
  }
  34% {
    opacity: 0.4;
  }
  44%,
  100% {
    opacity: 1;
  }
}

.holo-fx {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.9s ease;
  -webkit-mask-image: radial-gradient(
    ellipse 40% 50% at 50% 54%,
    #000 35%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 40% 50% at 50% 54%,
    #000 35%,
    transparent 100%
  );
}

.pf-theme-dark .holo-fx {
  opacity: 1;
}

.holo-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(56, 189, 248, 0) 0 2px,
    rgba(56, 189, 248, 0.09) 2px 3px
  );
  animation: holo-drift 5s linear infinite;
}

.holo-beam {
  position: absolute;
  left: 0;
  right: 0;
  top: -20%;
  height: 20%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(56, 189, 248, 0.14) 55%,
    rgba(186, 230, 253, 0.45) 97%,
    transparent
  );
  mix-blend-mode: screen;
  animation: holo-sweep 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes holo-drift {
  to {
    background-position-y: 24px;
  }
}

@keyframes holo-sweep {
  0% {
    top: -20%;
  }
  55%,
  100% {
    top: 100%;
  }
}

.holo-base {
  position: relative;
  width: 0;
  height: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.9s ease 0.2s;
}

.pf-theme-dark .holo-base.is-on {
  opacity: 1;
}

.holo-disc {
  position: absolute;
  left: 0;
  top: 0;
  width: clamp(240px, 36vh, 380px);
  aspect-ratio: 1;
  translate: -50% -50%;
  transform: scaleY(var(--flat, 0.2));
}

.holo-pool {
  position: absolute;
  inset: -8%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(56, 189, 248, 0.5) 0%,
    rgba(37, 99, 235, 0.22) 45%,
    transparent 70%
  );
}

.holo-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(125, 211, 252, 0.75);
  box-shadow:
    0 0 12px rgba(56, 189, 248, 0.6),
    inset 0 0 12px rgba(56, 189, 248, 0.35);
}

.holo-ring.r1 {
  inset: 0;
}

.holo-ring.r2 {
  inset: 14%;
  border-style: dashed;
  border-color: rgba(125, 211, 252, 0.5);
  animation: holo-spin 22s linear infinite;
}

.holo-ring.r3 {
  inset: 30%;
  border-color: rgba(186, 230, 253, 0.8);
  animation: holo-spin 14s linear infinite reverse;
}

.holo-cone {
  position: absolute;
  left: 0;
  top: 0;
  width: clamp(200px, 30vh, 320px);
  height: min(60vh, 540px);
  translate: -50% -100%;
  background: linear-gradient(
    to top,
    rgba(56, 189, 248, 0.22),
    rgba(56, 189, 248, 0.06) 55%,
    transparent
  );
  clip-path: polygon(14% 100%, 86% 100%, 100% 0, 0 0);
  mix-blend-mode: screen;
}

@keyframes holo-spin {
  to {
    rotate: 360deg;
  }
}

.hs {
  position: relative;
  display: block;
  width: 10px;
  height: 10px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.hs.hs-on {
  opacity: 1;
}

.hs-dot {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: var(--accent);
  box-shadow:
    0 0 0 3px var(--hs-halo),
    var(--hs-glow);
}

.hs-dot::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 9999px;
  border: 1px solid var(--accent);
  animation: hs-pulse 2.4s ease-out infinite;
}

.hs-line {
  position: absolute;
  top: 50%;
  width: 44px;
  height: 1px;
  background: var(--accent);
  box-shadow: var(--hs-glow);
  transform: scaleX(0);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}

.hs-on .hs-line {
  transform: scaleX(1);
}

.hs-r .hs-line {
  left: 100%;
  transform-origin: left center;
}

.hs-l .hs-line {
  right: 100%;
  transform-origin: right center;
}

.hs-label {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  white-space: nowrap;
  padding: 6px 10px;
  background: var(--hs-bg);
  border: 1px solid var(--hs-line);
  box-shadow: var(--hs-glow);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.5s ease 0.35s;
}

.hs-on .hs-label {
  opacity: 1;
}

.hs-r .hs-label {
  left: calc(100% + 44px);
}

.hs-l .hs-label {
  right: calc(100% + 44px);
  text-align: right;
}

.hs-kicker {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--hs-sub);
}

.hs-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--hs-ink);
}

@keyframes hs-pulse {
  0% {
    transform: scale(0.6);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@media (max-width: 1023px) {
  .hs {
    display: none;
  }

  .holo-wrap {
    transform: none;
  }

  .floating-panel {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    will-change: auto;
  }

  .holo-beam,
  .holo-cone {
    mix-blend-mode: normal;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

model-viewer::part(default-progress-bar) {
  display: none;
}

.rail-item:focus-visible,
.floating-panel a:focus-visible,
.floating-panel button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .floating-panel {
    translate: none;
    transition: none;
  }

  .reveal {
    opacity: 1;
    scale: 1;
    filter: none;
  }

  .hs-dot::after,
  .holo-lines,
  .holo-beam,
  .holo-ring,
  .pf-theme-dark .mv-stage.is-loaded,
  .pf-theme-dark .holo-wrap.is-booting .mv-stage.is-loaded {
    animation: none;
  }
}
</style>
