<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
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
} from "lucide-vue-next";

import { projects } from "../data/projects.js";
import AnimatedCounter from "./AnimatedCounter.vue";

const toast = useToast();
const isShowPopup = ref(false);
const showAllProjects = ref(false);

const togglePopup = () => (isShowPopup.value = !isShowPopup.value);

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
    // Fallback: open Gmail compose
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

let observer = null;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach(
        (e) => e.isIntersecting && e.target.classList.add("revealed"),
      ),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
onUnmounted(() => observer?.disconnect());

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
      "Integrated localized digital payment gateways including GCash and Maya.",
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
    company: "Independent Consultant",
    employment_type: "Freelance",
    period: "May 2022 — Present",
    location: "Remote",
    stack: "Laravel · Vue · React · Next.js · Prisma · Tailwind",
    bullets: [
      "Architected and deployed scalable web applications using modern JavaScript frameworks.",
      "Integrated third-party APIs, database solutions, and cloud services to deliver robust end-to-end digital solutions.",
      "Managed full project lifecycles independently, ensuring on-time delivery and adherence to high-quality software standards.",
    ],
  },
];

const years = ref(6);

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
  { value: years.value, label: "Years Experience" },
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

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
</script>

<template>
  <div
    v-if="true"
    class="min-h-screen bg-[#f8f9fa] text-neutral-900 antialiased font-sans"
  >
    <div class="border-b border-neutral-200">
      <div
        class="max-w-4xl mx-auto w-full px-6 sm:px-10 py-5 flex items-center justify-between"
      >
        <span class="font-display text-lg text-neutral-900">R. Esteban</span>
        <nav
          class="hidden sm:flex items-center gap-6 text-xs uppercase tracking-[0.18em] font-medium text-neutral-500"
        >
          <a href="#work" class="hover:text-neutral-900 transition-colors"
            >Work</a
          >
          <a href="#experience" class="hover:text-neutral-900 transition-colors"
            >Experience</a
          >
          <a href="#contact" class="hover:text-neutral-900 transition-colors"
            >Contact</a
          >

          <a
            href="/public/assets/cv/resteban_portfolio.pdf"
            download
            class="inline-flex items-center gap-1.5 text-neutral-900 border-b border-neutral-900 pb-0.5 hover:gap-2.5 transition-all"
          >
            Resume <Download class="w-3 h-3" />
          </a>
        </nav>
      </div>
    </div>

    <div class="max-w-4xl mx-auto w-full px-6 sm:px-10">
      <header class="pt-16 sm:pt-24 pb-14 sm:pb-20">
        <div
          class="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 text-[11px] font-mono uppercase tracking-widest text-neutral-500"
        >
          <span class="inline-flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
            {{ personalDetails.availability }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <MapPin class="w-3 h-3" /> {{ personalDetails.location }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <Briefcase class="w-3 h-3" /> {{ personalDetails.title }}
          </span>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 md:gap-14 items-start"
        >
          <div class="flex-shrink-0">
            <div
              class="w-40 h-40 overflow-hidden border border-neutral-200 bg-neutral-100"
            >
              <img
                :src="'/assets/images/' + personalDetails.img"
                alt="Reinhard Esteban"
                class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p
              class="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-3"
            >
              Portfolio — {{ new Date().getFullYear() }}
            </p>
          </div>

          <div class="space-y-6">
            <p
              class="text-xs uppercase tracking-[0.22em] text-neutral-500 font-medium"
            >
              {{ personalDetails.title }}
            </p>
            <h1
              class="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02] text-neutral-900"
            >
              {{ personalDetails.name }}
            </h1>
            <p
              class="text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-xl"
            >
              {{ personalDetails.tagline }}
            </p>

            <div class="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <a
                href="#contact"
                class="text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:gap-3 inline-flex items-center gap-1.5 transition-all"
              >
                Get in touch <ArrowUpRight class="w-3.5 h-3.5" />
              </a>
              <a
                href="/public/assets/cv/resteban_portfolio.pdf"
                download
                class="text-sm font-medium text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 pb-0.5 inline-flex items-center gap-1.5 transition-colors"
              >
                Download CV <Download class="w-3.5 h-3.5" />
              </a>
              <button
                @click="togglePopup"
                class="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                What is full-stack?
              </button>
            </div>
          </div>
        </div>

        <div
          class="mt-16 grid grid-cols-3 divide-x divide-neutral-200 border-y border-neutral-200"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="py-6 px-2 sm:px-6 text-center sm:text-left"
          >
            <div class="font-display text-4xl text-neutral-900">
              <AnimatedCounter :value="stat.value" />
            </div>
            <div
              class="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-2"
            >
              {{ stat.label }}
            </div>
          </div>
        </div>
      </header>

      <!-- Popup Modal -->
      <Teleport to="body">
        <transition name="modal">
          <div
            v-if="isShowPopup"
            class="fixed inset-0 bg-neutral-900/40 flex items-center justify-center z-[100] p-4"
          >
            <div
              class="bg-[#f8f9fa] border border-neutral-200 p-8 max-w-lg w-full"
            >
              <div class="flex justify-between items-start mb-6">
                <span
                  class="text-xs uppercase tracking-[0.22em] text-neutral-500 font-medium"
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
                A full-stack developer designs intuitive user interfaces,
                manages robust database backends, and connects the entire
                software puzzle from end to end — ensuring scalable and reliable
                architecture.
              </p>
              <div class="pt-8">
                <button
                  @click="togglePopup"
                  class="text-sm font-medium bg-neutral-900 text-white px-6 py-2.5 hover:bg-neutral-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </transition>
      </Teleport>

      <!-- About -->
      <section class="border-t border-neutral-200 py-14 sm:py-20 reveal">
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium sticky top-6"
          >
            About
          </p>
          <div class="space-y-6 max-w-2xl">
            <p class="text-[15px] leading-[1.75] text-neutral-700">
              I am a software engineer with
              <span class="font-semibold text-neutral-900">
                <AnimatedCounter :value="years" /> years
              </span>
              of experience in full-cycle software development. I specialize in
              crafting performant web, mobile, and desktop applications using
              modern architectural patterns.
            </p>
            <p class="text-[15px] leading-[1.75] text-neutral-700">
              From structuring robust backend APIs to designing intuitive user
              interfaces, my primary goal is to translate complex business
              requirements into accessible, reliable, and scalable software
              solutions.
            </p>
            <div class="flex flex-wrap gap-6 pt-4">
              <a
                href="https://github.com/esyot"
                target="_blank"
                class="text-sm font-medium text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 pb-0.5 inline-flex items-center gap-1.5 transition-colors"
              >
                <Github :size="14" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/reinhard-esteban/"
                target="_blank"
                class="text-sm font-medium text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 pb-0.5 inline-flex items-center gap-1.5 transition-colors"
              >
                <Linkedin :size="14" /> LinkedIn
              </a>
              <a
                :href="'mailto:' + EMAIL"
                class="text-sm font-medium text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 pb-0.5 inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail :size="14" /> {{ EMAIL }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="work"
        class="border-t border-neutral-200 py-14 sm:py-20 reveal"
      >
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium"
          >
            Selected Work
          </p>

          <div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 border-t border-neutral-200 pt-6"
            >
              <router-link
                v-for="(project, idx) in visibleProjects"
                :key="project.name"
                :to="'/project/' + toSlug(project.name)"
                class="group block"
              >
                <div
                  class="aspect-[16/10] w-full overflow-hidden border border-neutral-200 bg-neutral-100 mb-4"
                >
                  <img
                    v-if="project.thumbnail"
                    :src="'/' + project.thumbnail"
                    :alt="project.name"
                    class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center text-neutral-300 font-mono text-[11px] uppercase tracking-widest"
                  >
                    {{ project.name }}
                  </div>
                </div>

                <div class="flex items-baseline justify-between gap-4 mb-2">
                  <div class="flex items-baseline gap-3 min-w-0">
                    <span
                      class="text-[11px] font-mono text-neutral-400 flex-shrink-0"
                    >
                      {{ String(idx + 1).padStart(2, "0") }}
                    </span>
                    <h3
                      class="font-display text-xl sm:text-2xl text-neutral-900 leading-tight group-hover:italic transition-all"
                    >
                      {{ project.name }}
                    </h3>
                  </div>
                  <ArrowUpRight
                    class="w-4 h-4 text-neutral-400 flex-shrink-0 group-hover:text-neutral-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>

                <p
                  class="text-[14px] leading-[1.65] text-neutral-600 mb-3 ml-7"
                >
                  {{ project.description }}
                </p>

                <!-- Metrics row -->
                <div
                  v-if="project.metrics?.length"
                  class="flex flex-wrap gap-x-3 gap-y-1 ml-7 mb-3"
                >
                  <span
                    v-for="m in project.metrics"
                    :key="m"
                    class="text-[11px] font-mono text-neutral-500"
                  >
                    · {{ m }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-x-3 gap-y-1 ml-7">
                  <span
                    v-for="(tech, i) in project.tech_stack"
                    :key="tech"
                    class="text-[12px] text-neutral-500 font-mono"
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

            <div v-if="otherProjects.length" class="mt-8 text-center">
              <button
                @click="showAllProjects = !showAllProjects"
                class="text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:gap-2 transition-all"
              >
                {{
                  showAllProjects
                    ? "Show featured only"
                    : `Show all ${projects.length} projects`
                }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        class="border-t border-neutral-200 py-14 sm:py-20 reveal"
      >
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium"
          >
            Experience
          </p>

          <div class="divide-y divide-neutral-200 border-y border-neutral-200">
            <div
              v-for="(job, idx) in careerHistory"
              :key="idx"
              class="py-7 first:pt-5 last:pb-5"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3"
              >
                <h3 class="text-lg font-semibold text-neutral-900">
                  {{ job.title }}
                  <span class="text-neutral-500 font-normal"
                    >— {{ job.company }}</span
                  >
                  <span
                    class="text-xs text-neutral-400 font-normal block sm:inline"
                  >
                    · {{ job.employment_type }} · {{ job.location }}
                  </span>
                </h3>
                <span
                  class="text-[11px] font-mono uppercase tracking-widest text-neutral-400 flex-shrink-0"
                >
                  {{ job.period }}
                </span>
              </div>
              <p
                v-if="job.stack"
                class="text-[12px] font-mono text-neutral-500 mb-3"
              >
                {{ job.stack }}
              </p>
              <ul class="space-y-1.5 list-disc list-outside ml-5">
                <li
                  v-for="(b, i) in job.bullets"
                  :key="i"
                  class="text-[15px] leading-[1.65] text-neutral-600"
                >
                  {{ b }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-neutral-200 py-14 sm:py-20 reveal">
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium"
          >
            Education
          </p>

          <div class="divide-y divide-neutral-200 border-y border-neutral-200">
            <div class="py-7 first:pt-5 last:pb-5">
              <div
                class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2"
              >
                <h3 class="text-lg font-semibold text-neutral-900">
                  Mater Dei College
                </h3>
              </div>
              <p class="text-[15px] leading-[1.7] text-neutral-600 max-w-2xl">
                Bachelor of Science in Information Technology
              </p>
            </div>

            <div class="py-7 first:pt-5 last:pb-5">
              <div
                class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2"
              >
                <h3 class="text-lg font-semibold text-neutral-900">
                  San Agustin National High School
                </h3>
              </div>
              <p class="text-[15px] leading-[1.7] text-neutral-600 max-w-2xl">
                Senior High School – Programming & Animation (NCIII Certified)
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="border-t border-neutral-200 py-14 sm:py-20 reveal">
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium"
          >
            Toolset
          </p>

          <div class="space-y-8 border-t border-neutral-200 pt-6">
            <div v-for="group in skillGroups" :key="group.label">
              <p
                class="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-3"
              >
                {{ group.label }}
              </p>
              <div class="flex flex-wrap gap-x-2 gap-y-2">
                <span
                  v-for="item in group.items"
                  :key="item"
                  class="text-sm text-neutral-800 border border-neutral-200 px-3 py-1.5"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        class="border-t border-neutral-200 py-14 sm:py-20 reveal"
      >
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <p
            class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium"
          >
            Contact
          </p>

          <div class="space-y-8 max-w-lg">
            <div class="space-y-4">
              <h2
                class="font-display text-4xl sm:text-5xl text-neutral-900 leading-tight"
              >
                Let's build something.
              </h2>
              <p class="text-[15px] leading-relaxed text-neutral-600">
                Have a project in mind, a role to fill, or want to collaborate?
                Send a message — or email directly and I'll respond within a
                day.
              </p>
              <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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
                  Copy email
                </button>
              </div>
            </div>

            <form @submit.prevent="submitContact" class="space-y-6">
              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                  >Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Your name"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="you@company.com"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                  >Subject</label
                >
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="Role / project"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                  >Message</label
                >
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="How can we collaborate?"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                :disabled="submitting"
                class="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition-colors"
              >
                {{ submitting ? "Sending…" : "Send message" }}
                <Send class="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer
        class="border-t border-neutral-200 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-mono"
      >
        <span>© {{ new Date().getFullYear() }} Reinhard Esteban</span>
        <span class="uppercase tracking-widest">Built with intention</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.font-display {
  font-family: "Instrument Serif", Georgia, "Times New Roman", serif;
  font-weight: 400;
}
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
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
</style>
