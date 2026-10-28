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
  Settings,
  Layers,
  Terminal,
  Atom,
  Tablet,
  Wind,
  Box,
  Database,
  Flame,
  ChevronUp,
  Cpu,
  Link as LinkIcon,
  Lightbulb,
  FileText,
  Mail,
  HelpCircle,
  Sparkles,
  Rocket,
  User,
  Clock,
  Github,
  Linkedin,
  ExternalLink,
  CheckCircle2,
  Send,
} from "lucide-vue-next";

import { projects } from "../data/projects.js";

// Import your custom components
import CursorTail from "./CursorTail.vue";
import AnimatedCounter from "./AnimatedCounter.vue";

const toast = useToast();
const isShowPopup = ref(false);

const togglePopup = () => {
  isShowPopup.value = !isShowPopup.value;
};

const form = ref({
  name: "",
  email: "",
  message: "",
});

const openGmail = () => {
  if (!form.value.name || !form.value.message) {
    toast.error("Please fill in your name and message so we can connect!");
    return;
  }

  toast.success("Preparing your email draft...");

  setTimeout(() => {
    const subject = encodeURIComponent(`Inquiry from ${form.value.name}`);
    const body = encodeURIComponent(
      `${form.value.message}\n\nFrom: ${form.value.name}\nEmail: ${form.value.email}`,
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rei.nhard3367@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");

    // Reset form
    form.value = { name: "", email: "", message: "" };
  }, 1000);
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "opacity-100",
            "translate-y-0",
            "scale-100",
          );
          entry.target.classList.remove(
            "opacity-0",
            "translate-y-8",
            "scale-95",
          );
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const skills = [
  {
    name: "HTML5",
    rating: 4,
    icon: Globe,
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
  {
    name: "CSS",
    rating: 4,
    icon: Palette,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    name: "JavaScript",
    rating: 4,
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    name: "TypeScript",
    rating: 4,
    icon: Code2,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    name: "GIT",
    rating: 4,
    icon: GitBranch,
    color: "text-red-500",
    bg: "bg-red-100",
  },
  {
    name: "Flutter",
    rating: 4,
    icon: Smartphone,
    color: "text-cyan-500",
    bg: "bg-cyan-100",
  },
  {
    name: "JAVA",
    rating: 4,
    icon: Coffee,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    name: "PHP",
    rating: 4,
    icon: Server,
    color: "text-indigo-500",
    bg: "bg-indigo-100",
  },
  {
    name: "Vue",
    rating: 4,
    icon: Layers,
    color: "text-emerald-500",
    bg: "bg-emerald-100",
  },
  {
    name: "React",
    rating: 4,
    icon: Atom,
    color: "text-sky-500",
    bg: "bg-sky-100",
  },
  {
    name: "Tailwind CSS",
    rating: 4,
    icon: Wind,
    color: "text-teal-500",
    bg: "bg-teal-100",
  },
  {
    name: "Laravel",
    rating: 4,
    icon: Box,
    color: "text-rose-500",
    bg: "bg-rose-100",
  },
];

const careerHistory = [
  {
    title: "Freelance Software Engineer",
    company: "Show Techs Projects",
    link: "https://resteban-resume.vercel.app",
    employment_type: "Freelance",
    period: "May 2022 - Today",
    duration: `${new Date().getFullYear() - 2022} years`,
    description: `Architected and deployed scalable web applications using modern JavaScript frameworks, optimizing performance and user experience while collaborating closely with clients to translate business requirements into clean, maintainable code.`,
  },
  {
    title: "Senior Software Engineer",
    company: "Hashed.IT",
    link: "https://hashed.it.com",
    employment_type: "Contract Based",
    period: "May 2025 - May 2026",
    duration: "1 year 1 month",
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

const toSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden relative"
  >
    <!-- Animated Cursor Tail Component -->
    <CursorTail />

    <!-- Modern Animated Gradients Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        class="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-300/20 blur-[120px] mix-blend-multiply"
      ></div>
      <div
        class="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/20 blur-[120px] mix-blend-multiply"
      ></div>
      <div
        class="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-emerald-300/10 blur-[120px] mix-blend-multiply"
      ></div>
    </div>

    <div
      class="max-w-5xl mx-auto w-full p-4 sm:p-8 md:p-12 space-y-16 relative z-10"
    >
      <!-- Header Section -->
      <header
        class="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 reveal opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
      >
        <div
          class="flex flex-col md:flex-row gap-10 items-center md:items-start"
        >
          <!-- Avatar Frame -->
          <div class="relative flex-shrink-0 group">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20 blur-lg"
            ></div>
            <div
              class="w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105"
            >
              <img
                :src="'/assets/images/' + personalDetails.img"
                alt="Reinhard Esteban"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Main Info -->
          <div class="flex-1 text-center md:text-left space-y-5 pt-2">
            <div
              class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-1.5 text-sm font-bold rounded-full border border-purple-200/50 shadow-sm"
            >
              <Rocket :size="16" class="text-purple-600 animate-pulse" /> Open
              to Opportunities
            </div>

            <h1
              class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700"
            >
              {{ personalDetails.name }}
            </h1>

            <p class="text-purple-600 font-bold text-xl md:text-2xl">
              {{ personalDetails.title }}
            </p>

            <p
              class="text-slate-600 text-lg leading-relaxed max-w-2xl font-medium"
            >
              {{ personalDetails.tagline }}
            </p>

            <div
              class="pt-2 flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <button
                @click="togglePopup"
                class="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-full border border-slate-200 shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle :size="18" class="text-blue-500" /> What is
                Full-Stack?
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div
          class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-slate-200/60 pt-8"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center md:text-left group"
          >
            <div
              class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-600"
            >
              <AnimatedCounter :value="stat.value" />
            </div>
            <div
              class="text-sm font-bold tracking-wider text-slate-500 mt-2 uppercase"
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
            class="fixed inset-0 bg-slate-900/20 backdrop-blur-md flex items-center justify-center z-[100] p-4"
          >
            <div
              class="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl border border-white space-y-6 transform transition-all"
            >
              <div class="flex justify-between items-center">
                <div
                  class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center"
                >
                  <Sparkles :size="24" class="text-purple-600" />
                </div>
                <button
                  @click="togglePopup"
                  class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 class="text-2xl font-bold text-slate-900 mb-3">
                  Full-Stack Defined
                </h3>
                <p class="text-slate-600 leading-relaxed text-base font-medium">
                  A full-stack developer designs intuitive user interfaces,
                  manages robust database backends, and connects the entire
                  software puzzle from end to end, ensuring scalable and
                  reliable architecture.
                </p>
              </div>

              <div class="pt-4 flex justify-end">
                <button
                  @click="togglePopup"
                  class="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm cursor-pointer w-full sm:w-auto"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        </transition>
      </Teleport>

      <!-- About Me Section -->
      <section
        class="space-y-6 reveal opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out delay-100"
      >
        <h2
          class="text-2xl font-black text-slate-900 flex items-center gap-3 ml-2"
        >
          <div class="p-2 bg-blue-100 rounded-xl">
            <User :size="24" class="text-blue-600" />
          </div>
          Professional Summary
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="md:col-span-2 bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm border border-white/80 space-y-5 text-slate-700 text-lg leading-relaxed font-medium"
          >
            <p>
              I am a software engineer with over
              <span
                class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
                ><AnimatedCounter :value="years" /> years</span
              >
              of experience in full-cycle software development. I specialize in
              crafting performant web, mobile, and desktop applications using
              modern architectural patterns.
            </p>
            <p>
              From structuring robust backend APIs to designing intuitive user
              interfaces, my primary goal is to translate complex business
              requirements into accessible, reliable, and scalable software
              solutions.
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <a
                href="https://github.com/esyot"
                target="_blank"
                class="px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Github :size="18" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/reinhard-esteban/"
                target="_blank"
                class="px-6 py-3 rounded-full bg-[#0a66c2] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-[#004182] hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Linkedin :size="18" /> LinkedIn
              </a>
            </div>
          </div>

          <!-- Quick Details Sidebar -->
          <div
            class="bg-gradient-to-br from-purple-500 to-blue-600 rounded-[2rem] p-8 shadow-lg text-white space-y-6 relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"
            ></div>
            <div class="relative z-10 space-y-6">
              <div>
                <span
                  class="text-purple-100 font-bold uppercase text-xs tracking-wider"
                  >Location</span
                >
                <span class="text-white font-bold text-lg block mt-1"
                  >Philippines</span
                >
              </div>
              <div class="border-t border-white/20 pt-4">
                <span
                  class="text-purple-100 font-bold uppercase text-xs tracking-wider"
                  >Focus Areas</span
                >
                <span class="text-white font-bold text-lg block mt-1"
                  >Full-Stack Web & Mobile</span
                >
              </div>
              <div class="border-t border-white/20 pt-4">
                <span
                  class="text-purple-100 font-bold uppercase text-xs tracking-wider"
                  >Core Stack</span
                >
                <span class="text-white font-bold text-lg block mt-1"
                  >PHP, JS/TS, Node, Vue/React</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Projects -->
      <section
        class="space-y-6 reveal opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
      >
        <h2
          class="text-2xl font-black text-slate-900 flex items-center gap-3 ml-2"
        >
          <div class="p-2 bg-emerald-100 rounded-xl">
            <Box :size="24" class="text-emerald-600" />
          </div>
          Featured Projects
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(project, idx) in projects"
            :key="project.name"
            class="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 shadow-sm hover:shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
          >
            <div>
              <div class="flex justify-between items-start mb-4 gap-2">
                <h3
                  class="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-all"
                >
                  {{ project.name }}
                </h3>
                <span
                  class="text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <span
                    class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                  ></span>
                  {{ project.status }}
                </span>
              </div>

              <p
                class="text-slate-600 text-base mb-6 leading-relaxed font-medium"
              >
                {{ project.description }}
              </p>
            </div>

            <div>
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in project.tech_stack"
                  :key="tech"
                  class="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-semibold shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>

              <router-link
                :to="'/project/' + toSlug(project.name)"
                class="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full"
              >
                View Documentation <ExternalLink :size="16" />
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section
        class="space-y-6 reveal opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
      >
        <h2
          class="text-2xl font-black text-slate-900 flex items-center gap-3 ml-2"
        >
          <div class="p-2 bg-orange-100 rounded-xl">
            <Clock :size="24" class="text-orange-600" />
          </div>
          Work History
        </h2>

        <div class="space-y-4">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow space-y-4"
          >
            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
            >
              <h3 class="text-xl font-bold text-slate-900">
                {{ job.title }}
                <span
                  class="text-orange-500 font-semibold block sm:inline mt-1 sm:mt-0"
                  >@ {{ job.company }}</span
                >
              </h3>
              <div
                class="flex items-center gap-3 text-sm font-bold text-slate-500"
              >
                <span class="bg-slate-100 px-3 py-1.5 rounded-full shadow-sm">{{
                  job.period
                }}</span>
                <span class="text-slate-400">{{ job.duration }}</span>
              </div>
            </div>

            <p class="text-base text-slate-600 leading-relaxed font-medium">
              {{ job.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Skills Grid -->
      <section
        class="space-y-6 reveal opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
      >
        <h2
          class="text-2xl font-black text-slate-900 flex items-center gap-3 ml-2"
        >
          <div class="p-2 bg-rose-100 rounded-xl">
            <Zap :size="24" class="text-rose-600" />
          </div>
          Core Technologies
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[1.5rem] p-5 shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all cursor-default"
          >
            <div :class="[skill.bg, 'p-3 rounded-2xl shadow-inner']">
              <component :is="skill.icon" :size="20" :class="skill.color" />
            </div>
            <span class="text-base font-bold text-slate-800 truncate">{{
              skill.name
            }}</span>
          </div>
        </div>
      </section>

      <!-- Contact Form -->
      <section
        class="space-y-6 reveal opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out pb-12"
      >
        <h2
          class="text-2xl font-black text-slate-900 flex items-center gap-3 ml-2"
        >
          <div class="p-2 bg-indigo-100 rounded-xl">
            <Mail :size="24" class="text-indigo-600" />
          </div>
          Get in Touch
        </h2>

        <div
          class="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 sm:p-10 shadow-lg relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"
          ></div>

          <form @submit.prevent="openGmail" class="space-y-6 relative z-10">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700 ml-2"
                  >Full Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Jane Doe"
                  class="w-full bg-white/50 border border-slate-200 rounded-2xl text-slate-900 text-base p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700 ml-2"
                  >Subject</label
                >
                <input
                  v-model="form.email"
                  type="text"
                  placeholder="Project Consultation"
                  class="w-full bg-white/50 border border-slate-200 rounded-2xl text-slate-900 text-base p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-700 ml-2"
                >Message</label
              >
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="How can we collaborate?"
                class="w-full bg-white/50 border border-slate-200 rounded-2xl text-slate-900 text-base p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all resize-none shadow-sm"
              ></textarea>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <Send :size="20" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Footer -->
      <footer
        class="text-center text-sm font-semibold text-slate-400 border-t border-slate-200 pt-8 pb-12"
      >
        © {{ new Date().getFullYear() }} Reinhard Esteban. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap");

.font-sans {
  font-family:
    "Nunito",
    system-ui,
    -apple-system,
    sans-serif;
}

/* Modal scale and fade transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
