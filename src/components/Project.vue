<template>
  <div
    ref="rootRef"
    :class="themeClass"
    class="pf-root relative min-h-screen bg-[color:var(--bg)] text-neutral-900 antialiased font-sans selection:bg-[color:var(--sel-bg)] selection:text-[color:var(--sel-fg)] overflow-x-clip"
  >
    <!-- =========================================================
         BACKDROP: same wash, grid and orbit ring as the portfolio.
         The inner ring turns with scroll, like the camera azimuth there.
    ========================================================== -->
    <div
      class="fixed inset-0 z-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div class="backdrop-wash absolute inset-0"></div>
      <div class="backdrop-grid absolute inset-0"></div>

      <div
        class="ring-glow hidden lg:block w-[460px] h-[460px] border border-neutral-300/60 rounded-full relative translate-x-40 opacity-75"
      >
        <div
          class="absolute inset-7 rounded-full border border-dashed border-neutral-300/70 will-change-transform"
          style="transform: rotate(calc(var(--sp, 0) * 360deg))"
        >
          <span
            class="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[color:var(--accent)] rotate-45"
          ></span>
        </div>
        <span
          class="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-400 tracking-widest bg-[color:var(--bg)] px-2"
        >
          Scan {{ progressPct }}%
        </span>
      </div>
    </div>

    <!-- =========================================================
         FIXED CHROME
    ========================================================== -->
    <header
      class="fixed top-0 inset-x-0 z-40 border-b border-neutral-200/80 bg-[color:var(--chrome)] backdrop-blur-md"
    >
      <div
        class="max-w-7xl mx-auto w-full px-5 sm:px-10 py-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <router-link to="/" class="font-display text-xl text-neutral-900"
            >R. Esteban</router-link
          >
          <router-link
            to="/"
            class="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.14em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors border-l border-neutral-300 pl-3"
          >
            <ArrowLeft class="w-3.5 h-3.5" /> Back to portfolio
          </router-link>
        </div>

        <nav
          class="flex items-center gap-5 sm:gap-7 text-[11px] tracking-[0.14em] font-medium text-neutral-500"
        >
          <router-link
            to="/"
            class="sm:hidden inline-flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft class="w-3.5 h-3.5" /> Back
          </router-link>
          <a
            v-if="project"
            href="#walkthrough"
            class="hidden sm:inline hover:text-neutral-900 transition-colors"
            >Walkthrough</a
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
        </nav>
      </div>

      <div
        class="prog absolute bottom-0 left-0 h-px w-full origin-left bg-[color:var(--accent)]"
        style="transform: scaleX(var(--sp, 0))"
      ></div>
    </header>

    <!-- =========================================================
         PROJECT
    ========================================================== -->
    <main
      v-if="project"
      class="relative z-10 max-w-4xl mx-auto w-full px-5 sm:px-10 pt-28 pb-16 space-y-8"
    >
      <!-- Hero -->
      <section
        @mousemove="handleCardMove"
        @mouseleave="handleCardLeave"
        style="--i: 0; --depth: 1"
        class="reveal floating-panel p-7 sm:p-12"
      >
        <p
          class="text-[11px] font-mono tracking-[0.18em] text-neutral-500 mb-8"
        >
          Selected work
        </p>

        <h1
          class="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02] text-neutral-900 mb-6"
        >
          {{ project.name }}
        </h1>

        <div
          v-if="project.role || project.duration"
          class="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-[12px] font-mono tracking-widest text-neutral-500"
        >
          <span v-if="project.role">Role: {{ project.role }}</span>
          <span v-if="project.duration">Duration: {{ project.duration }}</span>
        </div>

        <div class="flex flex-wrap gap-x-3 gap-y-2 mb-8">
          <span
            v-for="(tech, i) in project.tech_stack"
            :key="tech"
            class="text-sm text-neutral-600 font-mono"
          >
            {{ tech
            }}<span
              v-if="i < project.tech_stack.length - 1"
              class="text-neutral-300 ml-3"
              >·</span
            >
          </span>
        </div>

        <div
          v-if="project.metrics?.length"
          class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div
            v-for="m in project.metrics"
            :key="m"
            class="border border-neutral-200 bg-[color:var(--chip-bg)] px-4 py-3"
          >
            <p class="text-[13px] text-neutral-700 leading-snug">{{ m }}</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            v-if="project.live"
            :href="project.live"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-solid inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.14em] font-medium transition-colors"
          >
            Visit live site <ExternalLink class="w-3.5 h-3.5" />
          </a>
          <a
            v-if="project.repo"
            :href="project.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 pb-0.5 transition-colors"
          >
            <Github class="w-3.5 h-3.5" /> View source
          </a>
          <span
            v-if="project.private && !project.live"
            class="text-sm text-neutral-500 italic"
          >
            Private / client deployment — walkthrough on request.
          </span>
        </div>
      </section>

      <!-- Overview -->
      <section
        @mousemove="handleCardMove"
        @mouseleave="handleCardLeave"
        style="--i: 0; --depth: 0.7"
        class="reveal floating-panel p-7 sm:p-12"
      >
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-[11px] font-mono tracking-[0.18em] text-neutral-400 md:sticky md:top-24 self-start"
          >
            Overview
          </p>
          <div
            v-html="formattedDetailsHtml"
            class="text-[15px] leading-[1.75] text-neutral-700 [&_strong]:text-neutral-900 [&_strong]:font-semibold"
          ></div>
        </div>
      </section>

      <!-- Plates -->
      <section
        v-if="project.images && project.images.length > 0"
        @mousemove="handleCardMove"
        @mouseleave="handleCardLeave"
        style="--i: 0; --depth: 1.15"
        class="reveal floating-panel p-7 sm:p-12"
      >
        <div class="">
          <div class="space-y-5">
            <figure
              @click="openLightbox"
              class="plate-frame relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border border-neutral-200 cursor-zoom-in"
            >
              <transition name="plate" mode="out-in">
                <img
                  :key="activeIndex"
                  :src="resolveImagePath(project.images[activeIndex])"
                  :alt="project.name + ' — plate ' + (activeIndex + 1)"
                  class="w-full h-full object-cover"
                />
              </transition>

              <!-- hologram scan (dark mode) -->
              <span class="plate-scan" aria-hidden="true"></span>

              <figcaption
                class="plate-caption absolute bottom-3 left-3 text-[11px] font-mono tracking-widest px-2 py-1"
              >
                Plate {{ String(activeIndex + 1).padStart(2, "0") }} —
                {{ String(project.images.length).padStart(2, "0") }}
              </figcaption>
              <div
                v-if="project.images.length > 1"
                class="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none"
              >
                <button
                  @click.stop="prevImage"
                  class="plate-btn pointer-events-auto w-9 h-9 flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft class="w-4 h-4" />
                </button>
                <button
                  @click.stop="nextImage"
                  class="plate-btn pointer-events-auto w-9 h-9 flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </figure>

            <div
              v-if="project.images.length > 1"
              class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin"
            >
              <button
                v-for="(image, index) in project.images"
                :key="index"
                @click="setActiveImage(index)"
                class="relative flex-shrink-0 w-20 aspect-[16/10] overflow-hidden border transition-all focus:outline-none"
                :class="
                  activeIndex === index
                    ? 'border-[color:var(--accent)]'
                    : 'border-neutral-200 opacity-60 hover:opacity-100'
                "
                :aria-label="'Show plate ' + (index + 1)"
              >
                <img
                  :src="resolveImagePath(image)"
                  loading="lazy"
                  class="w-full h-full object-cover"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Walkthrough -->
      <section
        id="walkthrough"
        @mousemove="handleCardMove"
        @mouseleave="handleCardLeave"
        style="--i: 0; --depth: 0.8"
        class="reveal floating-panel p-7 sm:p-12 scroll-mt-24"
      >
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-[11px] font-mono tracking-[0.18em] text-neutral-400 self-start"
          >
            Walkthrough
          </p>
          <div class="space-y-10">
            <div class="max-w-lg space-y-4">
              <p class="text-[15px] leading-relaxed text-neutral-700">
                Want to see how <em>{{ project.name }}</em> can be adapted for
                your team? Send a request and we'll arrange a live session.
              </p>
              <p class="text-sm text-neutral-500">
                Or email directly —
                <a
                  href="mailto:rei.nhard3367@gmail.com"
                  class="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                  >rei.nhard3367@gmail.com</a
                >
              </p>
            </div>

            <form @submit.prevent="openBookingGmail" class="max-w-lg space-y-6">
              <div>
                <label
                  for="b-name"
                  class="block text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-2"
                  >Name</label
                >
                <input
                  id="b-name"
                  v-model="bookingForm.name"
                  type="text"
                  placeholder="Your name"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label
                  for="b-time"
                  class="block text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-2"
                  >Preferred schedule</label
                >
                <input
                  id="b-time"
                  v-model="bookingForm.preferredTime"
                  type="text"
                  placeholder="e.g. Friday afternoon"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label
                  for="b-notes"
                  class="block text-[10px] font-mono tracking-[0.16em] text-neutral-500 mb-2"
                  >Notes</label
                >
                <textarea
                  id="b-notes"
                  v-model="bookingForm.message"
                  rows="3"
                  placeholder="Goals, customizations, questions…"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn-solid inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.14em] font-medium transition-colors"
              >
                Submit request <Send class="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer
        class="border-t border-neutral-300/80 py-8 flex items-center justify-between text-xs text-neutral-500 font-mono"
      >
        <span>© {{ new Date().getFullYear() }} Reinhard Esteban</span>
        <router-link to="/" class="hover:text-neutral-900 transition-colors"
          >Return to index →</router-link
        >
      </footer>
    </main>

    <!-- Not found -->
    <main
      v-else
      class="relative z-10 min-h-screen flex items-center justify-center p-8"
    >
      <div
        class="floating-panel reveal revealed p-10 text-center space-y-6 max-w-md w-full"
        style="--depth: 0.8"
      >
        <p class="font-display text-3xl text-neutral-900">Project not found.</p>
        <router-link
          to="/"
          class="btn-solid inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.14em] font-medium"
          >Return to index</router-link
        >
      </div>
    </main>

    <!-- Lightbox -->
    <transition name="lightbox-fade">
      <div
        v-if="project && isLightboxOpen"
        class="lb fixed inset-0 z-50 flex flex-col"
        role="dialog"
        aria-modal="true"
        :aria-label="project.name + ' plates'"
        @click.self="closeLightbox"
      >
        <div
          class="lb-bar flex items-center justify-between px-6 py-5 font-mono text-xs tracking-widest border-b"
        >
          <span
            >{{ project.name }} — Plate
            {{ String(activeIndex + 1).padStart(2, "0") }}</span
          >
          <button
            @click="closeLightbox"
            class="lb-btn w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center relative px-6 py-6"
          @click.self="closeLightbox"
        >
          <button
            v-if="project.images.length > 1"
            @click.stop="prevImage"
            class="lb-btn absolute left-6 w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <img
            :src="resolveImagePath(project.images[activeIndex])"
            :alt="project.name"
            class="lb-img max-w-full max-h-[80vh] object-contain"
          />
          <button
            v-if="project.images.length > 1"
            @click.stop="nextImage"
            class="lb-btn absolute right-6 w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
        <div
          v-if="project.images.length > 1"
          class="lb-bar flex justify-center gap-2 px-6 py-4 border-t overflow-x-auto"
        >
          <button
            v-for="(image, index) in project.images"
            :key="'lb-' + index"
            @click.stop="setActiveImage(index)"
            class="lb-thumb flex-shrink-0 w-16 aspect-[16/10] overflow-hidden border transition-all"
            :class="{ 'is-active': activeIndex === index }"
            :aria-label="'Show plate ' + (index + 1)"
          >
            <img
              :src="resolveImagePath(image)"
              class="w-full h-full object-cover"
              alt=""
            />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { projects } from "../data/projects.js";
import {
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Send,
  X,
  ArrowLeft,
  Github,
  Sun,
  Moon,
} from "lucide-vue-next";
import { useTheme } from "../composables/useTheme.js";
import "../assets/theme.css";

const route = useRoute();
const toast = useToast();
const { isDark, themeClass, toggleTheme } = useTheme();

const slug = computed(() => route.params.slug);

const rootRef = ref(null);
const activeIndex = ref(0);
const isLightboxOpen = ref(false);
const progressPct = ref(0);
const bookingForm = ref({ name: "", preferredTime: "", message: "" });

const resolveImagePath = (path) => {
  if (!path) return "";
  const clean = path.replace(/^public\//, "").replace(/^\//, "");
  return `/${clean}`;
};

const toSlug = (name) =>
  name
    ? name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    : "";

const project = computed(() =>
  projects.find((p) => toSlug(p.name) === slug.value),
);

/* ------------------------------------------------------------------ *
 * Booking request
 * ------------------------------------------------------------------ */
const openBookingGmail = () => {
  if (!bookingForm.value.name) {
    toast.error("Please enter your name.");
    return;
  }
  toast.success("Preparing draft…");
  setTimeout(() => {
    const projectName = project.value?.name || "Your Project";
    const visitorName = bookingForm.value.name || "Visitor";
    const preferredTime = bookingForm.value.preferredTime || "Flexible";
    const subject = encodeURIComponent(
      `Demo Request: ${projectName} — ${visitorName}`,
    );
    const bodyMessage =
      bookingForm.value.message || "I'd like to arrange a demo.";
    const body = encodeURIComponent(
      `Hi Rei,\n\nI just checked out "${projectName}" on your portfolio and would love to request a walkthrough.\n\nPreferred Schedule: ${preferredTime}\nNotes: ${bodyMessage}\n\nBest regards,\n${visitorName}`,
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=rei.nhard3367@gmail.com&su=${subject}&body=${body}`,
      "_blank",
    );
    bookingForm.value = { name: "", preferredTime: "", message: "" };
  }, 500);
};

/* ------------------------------------------------------------------ *
 * Plates + lightbox
 * ------------------------------------------------------------------ */
const prevImage = () => {
  if (!project.value?.images?.length) return;
  activeIndex.value =
    (activeIndex.value - 1 + project.value.images.length) %
    project.value.images.length;
};
const nextImage = () => {
  if (!project.value?.images?.length) return;
  activeIndex.value = (activeIndex.value + 1) % project.value.images.length;
};
const setActiveImage = (i) => (activeIndex.value = i);
const openLightbox = () => {
  isLightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};
const closeLightbox = () => {
  isLightboxOpen.value = false;
  document.body.style.overflow = "";
};

const handleGlobalKeydown = (e) => {
  // Escape always closes the lightbox, even with a single plate.
  if (e.key === "Escape" && isLightboxOpen.value) {
    closeLightbox();
    return;
  }
  if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
  if (!project.value?.images || project.value.images.length <= 1) return;
  if (e.key === "ArrowLeft") prevImage();
  else if (e.key === "ArrowRight") nextImage();
};

/* ------------------------------------------------------------------ *
 * Motion: the portfolio's camera parallax, driven by pointer + scroll
 *   --ox / --oy  pointer position (-1…1), panels drift by their --depth
 *   --sv         scroll velocity, panels trail the scroll slightly
 *   --sp         scroll progress (header line + backdrop ring)
 * ------------------------------------------------------------------ */
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

let reduceMotion = false;
let rafId = null;
let lastT = 0;
let lastY = 0;
let vel = 0;
let px = 0;
let py = 0;
let tx = 0;
let ty = 0;
let revealObserver = null;
const cssVars = {};

const setVar = (name, value) => {
  if (cssVars[name] === value) return;
  cssVars[name] = value;
  rootRef.value?.style.setProperty(name, value);
};

const onPointerMove = (e) => {
  tx = (e.clientX / window.innerWidth - 0.5) * 2;
  ty = (e.clientY / window.innerHeight - 0.5) * 2;
};

const tick = (now) => {
  rafId = requestAnimationFrame(tick);
  const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016;
  lastT = now;

  const y = window.scrollY;
  const raw = dt > 0 ? (y - lastY) / dt : 0;
  lastY = y;
  vel += (clamp(raw / 1600, -1, 1) - vel) * (1 - Math.exp(-dt * 7));

  const k = 1 - Math.exp(-dt * 4);
  px += (tx - px) * k;
  py += (ty - py) * k;

  const max = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const sp = clamp(y / max, 0, 1);

  setVar("--ox", px.toFixed(3));
  setVar("--oy", py.toFixed(3));
  setVar("--sv", vel.toFixed(3));
  setVar("--sp", sp.toFixed(4));

  const pct = Math.round(sp * 100);
  if (progressPct.value !== pct) progressPct.value = pct;
};

/* Tilt + glare on hover (gentler than the portfolio: these panels are large) */
const handleCardMove = (e) => {
  if (window.innerWidth < 1024 || reduceMotion) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--rx", `${(x * 2).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${(-y * 2).toFixed(2)}deg`);
  el.style.setProperty("--tz", "4px");
  el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty("--glare", "0.4");
};

const handleCardLeave = (e) => {
  const el = e.currentTarget;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
  el.style.setProperty("--tz", "0px");
  el.style.setProperty("--glare", "0");
};

const observeReveals = () => {
  if (!revealObserver) return;
  document.querySelectorAll(".reveal:not([data-obs])").forEach((el) => {
    el.dataset.obs = "1";
    revealObserver.observe(el);
  });
};

// Navigating between projects reuses this component.
watch(slug, () => {
  activeIndex.value = 0;
  closeLightbox();
  window.scrollTo(0, 0);
  nextTick(observeReveals);
});

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  lastY = window.scrollY;

  window.addEventListener("keydown", handleGlobalKeydown);
  if (!reduceMotion) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }

  revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("revealed");
        revealObserver.unobserve(e.target);
      }),
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
  );
  observeReveals();

  rafId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
  window.removeEventListener("pointermove", onPointerMove);
  if (rafId) cancelAnimationFrame(rafId);
  revealObserver?.disconnect();
  document.body.style.overflow = "";
});

/* ------------------------------------------------------------------ *
 * Overview text → HTML (utility classes flip with the theme)
 * ------------------------------------------------------------------ */
const formattedDetailsHtml = computed(() => {
  if (!project.value?.full_details) return "";
  let rawText = project.value.full_details;
  rawText = rawText.replace(
    /analytics\.Leveraging/g,
    "analytics.\n\nLeveraging",
  );
  rawText = rawText.replace(/([^\n])•/g, "$1\n•");

  const lines = rawText.split("\n");
  let html = "",
    inList = false,
    counter = 0;
  const flushList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
      counter = 0;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const clean = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    if (clean.startsWith("•") || clean.startsWith("-")) {
      if (!inList) {
        html +=
          '<ul class="my-6 divide-y divide-neutral-200 border-y border-neutral-200">';
        inList = true;
      }
      counter += 1;
      const item = clean.replace(/^[•-]\s*/, "");
      html += `<li class="grid grid-cols-[2.5rem_1fr] py-3 items-baseline">
        <span class="text-[11px] font-mono text-neutral-400">${String(counter).padStart(2, "0")}</span>
        <span class="text-[15px] leading-[1.7] text-neutral-700">${item}</span>
      </li>`;
    } else {
      flushList();
      html += `<p class="mb-5 text-[15px] leading-[1.75] text-neutral-700">${clean}</p>`;
    }
  }
  flushList();
  return html;
});
</script>

<style scoped>
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

/* ------------------------------------------------------------------
   Backdrop + chrome (same as the portfolio)
------------------------------------------------------------------- */
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

/* ------------------------------------------------------------------
   Floating panels (translate = parallax, transform = tilt,
   opacity/scale/filter = reveal)
------------------------------------------------------------------- */
.floating-panel {
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

  translate: calc(var(--ox, 0) * var(--depth, 1) * -10px)
    calc(
      var(--oy, 0) * var(--depth, 1) * -6px + var(--sv, 0) * var(--depth, 1) *
        12px
    );
  transform: perspective(1400px) rotateX(var(--ry, 0deg))
    rotateY(var(--rx, 0deg)) translateZ(var(--tz, 0px));
  transform-style: preserve-3d;

  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-color 0.5s ease,
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    scale 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, translate;
}

.floating-panel:hover {
  border-color: var(--panel-line-hover);
  box-shadow: var(--panel-shadow-hover);
}

.reveal {
  opacity: 0;
  scale: 0.97;
  filter: blur(8px);
}

.reveal.revealed {
  opacity: 1;
  scale: 1;
  filter: none;
}

/* ------------------------------------------------------------------
   Plates
------------------------------------------------------------------- */
.plate-frame {
  box-shadow: var(--plate-glow);
}

.plate-caption {
  background: var(--cap-bg);
  color: var(--cap-fg);
  border: 1px solid var(--cap-line);
}

.plate-btn {
  background: var(--panel);
  border: 1px solid var(--panel-line);
  color: var(--hs-ink);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.plate-btn:hover {
  background: var(--btn-bg);
  color: var(--btn-fg);
  box-shadow: var(--btn-glow);
}

/* Scanlines + sweeping beam over the active plate (dark mode only) */
.plate-scan {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.pf-theme-dark .plate-scan {
  opacity: 1;
}

.plate-scan::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(56, 189, 248, 0) 0 2px,
    rgba(56, 189, 248, 0.07) 2px 3px
  );
  animation: plate-drift 5s linear infinite;
}

.plate-scan::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -25%;
  height: 25%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(56, 189, 248, 0.12) 55%,
    rgba(186, 230, 253, 0.4) 97%,
    transparent
  );
  mix-blend-mode: screen;
  animation: plate-sweep 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes plate-drift {
  to {
    background-position-y: 24px;
  }
}

@keyframes plate-sweep {
  0% {
    top: -25%;
  }
  55%,
  100% {
    top: 100%;
  }
}

.plate-enter-active,
.plate-leave-active {
  transition: opacity 0.25s ease;
}

.plate-enter-from,
.plate-leave-to {
  opacity: 0;
}

/* a plate "locks in" with a brief flicker */
.pf-theme-dark .plate-enter-active {
  animation: plate-flicker 0.45s steps(1, end) 1;
}

@keyframes plate-flicker {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.85;
  }
  35% {
    opacity: 0.25;
  }
  55%,
  100% {
    opacity: 1;
  }
}

/* ------------------------------------------------------------------
   Lightbox (own colors so it stays legible when the neutral scale flips)
------------------------------------------------------------------- */
.lb {
  background: var(--lb-bg);
}

.lb-bar {
  color: var(--lb-text);
  border-color: var(--lb-line);
}

.lb-btn {
  color: var(--lb-dim);
}

.lb-btn:hover {
  color: var(--lb-active);
}

.lb-img {
  box-shadow: var(--plate-glow);
}

.lb-thumb {
  border-color: var(--lb-idle);
  opacity: 0.4;
}

.lb-thumb:hover {
  opacity: 1;
}

.lb-thumb.is-active {
  border-color: var(--lb-active);
  opacity: 1;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: var(--color-neutral-300, #d4d4d4);
}

.floating-panel a:focus-visible,
.floating-panel button:focus-visible,
.plate-btn:focus-visible,
.lb-btn:focus-visible {
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

  .plate-scan::before,
  .plate-scan::after,
  .pf-theme-dark .plate-enter-active {
    animation: none;
  }
}
</style>
