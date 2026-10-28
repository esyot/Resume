<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import {
  Globe,
  Palette,
  Zap,
  Code2,
  GitBranch,
  Smartphone,
  Coffee,
  Server,
  Layers,
  Atom,
  Wind,
  Box,
  Send,
  ArrowUpRight,
  X,
} from "lucide-vue-next";

import { projects } from "../data/projects.js";
import AnimatedCounter from "./AnimatedCounter.vue";

const toast = useToast();
const isShowPopup = ref(false);

const togglePopup = () => {
  isShowPopup.value = !isShowPopup.value;
};

const form = ref({ name: "", email: "", message: "" });

const openGmail = () => {
  if (!form.value.name || !form.value.message) {
    toast.error("Please fill in your name and message.");
    return;
  }
  toast.success("Preparing your email draft…");
  setTimeout(() => {
    const subject = encodeURIComponent(`Inquiry from ${form.value.name}`);
    const body = encodeURIComponent(
      `${form.value.message}\n\nFrom: ${form.value.name}\nEmail: ${form.value.email}`,
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=rei.nhard3367@gmail.com&su=${subject}&body=${body}`,
      "_blank",
    );
    form.value = { name: "", email: "", message: "" };
  }, 700);
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const skills = [
  { name: "HTML5", icon: Globe },
  { name: "CSS", icon: Palette },
  { name: "JavaScript", icon: Zap },
  { name: "TypeScript", icon: Code2 },
  { name: "GIT", icon: GitBranch },
  { name: "Flutter", icon: Smartphone },
  { name: "JAVA", icon: Coffee },
  { name: "PHP", icon: Server },
  { name: "Vue", icon: Layers },
  { name: "React", icon: Atom },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Laravel", icon: Box },
];

const careerHistory = [
  {
    title: "Freelance Software Engineer",
    company: "Show Techs Projects",
    link: "https://resteban-resume.vercel.app",
    employment_type: "Freelance",
    period: "May 2022 — Today",
    duration: `${new Date().getFullYear() - 2022} yrs`,
    description:
      "Architected and deployed scalable web applications using modern JavaScript frameworks, optimizing performance and user experience while collaborating closely with clients to translate business requirements into clean, maintainable code.",
  },
  {
    title: "Senior Software Engineer",
    company: "Hashed.IT",
    link: "https://hashed.it.com",
    employment_type: "Contract",
    period: "May 2025 — May 2026",
    duration: "1 yr 1 mo",
    description:
      "Built intelligent systems powering local industries including AI integrations, custom enterprise software, and automated workflows for utilities and educational institutions.",
  },
];

const years = new Date().getFullYear() - 2017;

const personalDetails = {
  name: "Reinhard Esteban",
  img: "profile_img.jpg",
  title: "Full Stack Developer",
  tagline: "Crafting digital experiences that scale, delight, and endure.",
};

const stats = [
  { value: years, label: "Years Experience" },
  { value: projects.length, label: "Projects Built" },
  { value: skills.length, label: "Tools Mastered" },
];

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
</script>

<template>
  <div
    v-if="true"
    class="min-h-screen bg-[#faf9f6] text-neutral-900 antialiased font-sans"
  >
    <!-- Thin top rule -->
    <div class="border-b border-neutral-200">
      <div
        class="max-w-4xl mx-auto w-full px-6 sm:px-10 py-5 flex items-center justify-between"
      >
        <span class="font-display text-lg text-neutral-900"> R. Esteban </span>
        <nav
          class="hidden sm:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-neutral-500"
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
        </nav>
      </div>
    </div>

    <div class="max-w-4xl mx-auto w-full px-6 sm:px-10">
      <!-- Header / Hero -->
      <header class="pt-16 sm:pt-24 pb-14 sm:pb-20">
        <div
          class="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 md:gap-14 items-start"
        >
          <!-- Portrait -->
          <div class="flex-shrink-0">
            <div
              class="w-40 h-40 md:w-40 md:h-40 overflow-hidden border border-neutral-200 bg-neutral-100"
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

          <!-- Intro -->
          <div class="space-y-6">
            <p
              class="text-xs uppercase tracking-[0.22em] text-neutral-500 font-medium"
            >
              Full Stack Developer
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
                href="mailto:rei.nhard3367@gmail.com"
                class="text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:gap-3 inline-flex items-center gap-1.5 transition-all"
              >
                Get in touch <ArrowUpRight class="w-3.5 h-3.5" />
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

        <!-- Stats strip -->
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
              class="bg-[#faf9f6] border border-neutral-200 p-8 max-w-lg w-full"
            >
              <div class="flex justify-between items-start mb-6">
                <span
                  class="text-xs uppercase tracking-[0.22em] text-neutral-500 font-medium"
                >
                  Definition
                </span>
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
              I am a software engineer with over
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
            </div>
          </div>
        </div>
      </section>

      <!-- Selected Work -->
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

          <div
            class="space-y-0 divide-y divide-neutral-200 border-t border-neutral-200"
          >
            <router-link
              v-for="(project, idx) in projects"
              :key="project.name"
              :to="'/project/' + toSlug(project.name)"
              class="group block py-8 first:pt-6 last:pb-0 hover:bg-transparent"
            >
              <div class="flex items-baseline justify-between gap-6 mb-3">
                <div class="flex items-baseline gap-4 min-w-0">
                  <span
                    class="text-[11px] font-mono text-neutral-400 flex-shrink-0"
                  >
                    {{ String(idx + 1).padStart(2, "0") }}
                  </span>
                  <h3
                    class="font-display text-2xl sm:text-3xl text-neutral-900 leading-tight truncate group-hover:italic transition-all"
                  >
                    {{ project.name }}
                  </h3>
                </div>
                <ArrowUpRight
                  class="w-5 h-5 text-neutral-400 flex-shrink-0 group-hover:text-neutral-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>

              <p
                class="text-[15px] leading-[1.7] text-neutral-600 mb-4 ml-8 max-w-2xl"
              >
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-x-3 gap-y-2 ml-8">
                <span
                  v-for="(tech, i) in project.tech_stack"
                  :key="tech"
                  class="text-sm text-neutral-500 font-mono"
                >
                  {{ tech
                  }}<span
                    v-if="i < project.tech_stack.length - 1"
                    class="text-neutral-300 ml-3"
                    >·</span
                  >
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Experience -->
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
                  <span class="text-neutral-500 font-normal">
                    — {{ job.company }}
                  </span>
                </h3>
                <span
                  class="text-[11px] font-mono uppercase tracking-widest text-neutral-400 flex-shrink-0"
                >
                  {{ job.period }}
                </span>
              </div>
              <p class="text-[15px] leading-[1.7] text-neutral-600 max-w-2xl">
                {{ job.description }}
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

          <div>
            <div
              class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-0 border-t border-neutral-200"
            >
              <div
                v-for="skill in skills"
                :key="skill.name"
                class="flex items-center gap-3 py-3.5 border-b border-neutral-200"
              >
                <component
                  :is="skill.icon"
                  :size="14"
                  class="text-neutral-400 flex-shrink-0"
                />
                <span class="text-sm text-neutral-800 truncate">
                  {{ skill.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
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

          <div class="space-y-10 max-w-lg">
            <div class="space-y-4">
              <h2
                class="font-display text-4xl sm:text-5xl text-neutral-900 leading-tight"
              >
                Let's build something.
              </h2>
              <p class="text-[15px] leading-relaxed text-neutral-600">
                Have a project in mind or want to collaborate? Send a message
                and I'll get back to you.
              </p>
            </div>

            <form @submit.prevent="openGmail" class="space-y-6">
              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                >
                  Name
                </label>
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
                >
                  Subject
                </label>
                <input
                  v-model="form.email"
                  type="text"
                  placeholder="Project consultation"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="How can we collaborate?"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                class="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
              >
                Send message
                <Send class="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer
        class="border-t border-neutral-200 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-mono"
      >
        <span>© {{ new Date().getFullYear() }} Reinhard Esteban</span>
        <span class="uppercase tracking-widest"> Built with intention </span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.font-display {
  font-family: "Instrument Serif", Georgia, "Times New Roman", serif;
  font-weight: 400;
}

/* Reveal — softer than before, no scale */
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
