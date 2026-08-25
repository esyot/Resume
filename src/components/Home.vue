<script setup>
import { ref, onMounted, onUnmounted } from "vue";
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
  Send
} from "lucide-vue-next";

import { projects } from "../data/projects.js";

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
  const subject = encodeURIComponent(
    `Inquiry from ${form.value.name || "Portfolio Visitor"}`
  );
  const body = encodeURIComponent(
    `${form.value.message}\n\nFrom: ${form.value.name}\nEmail: ${form.value.email}`
  );
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rei.nhard3367@gmail.com&su=${subject}&body=${body}`;
  window.open(gmailUrl, "_blank");
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const skills = [
  { name: "HTML5", rating: 4, icon: Globe },
  { name: "CSS", rating: 4, icon: Palette },
  { name: "JavaScript", rating: 4, icon: Zap },
  { name: "TypeScript", rating: 4, icon: Code2 },
  { name: "GIT", rating: 4, icon: GitBranch },
  { name: "Flutter", rating: 4, icon: Smartphone },
  { name: "JAVA", rating: 4, icon: Coffee },
  { name: "PHP", rating: 4, icon: Server },
  { name: "Blade", rating: 4, icon: Settings },
  { name: "Vue", rating: 4, icon: Layers },
  { name: "Python", rating: 3, icon: Terminal },
  { name: "React", rating: 4, icon: Atom },
  { name: "React Native", rating: 4, icon: Tablet },
  { name: "Tailwind CSS", rating: 4, icon: Wind },
  { name: "Laravel", rating: 4, icon: Box },
  { name: "SQL", rating: 4, icon: Database },
  { name: "Firebase", rating: 4, icon: Flame },
  { name: "Next.js", rating: 4, icon: ChevronUp },
  { name: "Node.js", rating: 3, icon: Cpu },
  { name: "Inertia", rating: 4, icon: LinkIcon },
  { name: "Nuxt.js", rating: 3, icon: Lightbulb },
  { name: "WordPress", rating: 3, icon: FileText },
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
  {
    title: "Web Developer",
    company: "Brandetize",
    link: "https://brandetize.com",
    employment_type: "Contract Based",
    period: "Dec 2025 - Mar 2026",
    duration: "4 months",
    description: `Engineered seamless marketing funnels, scaled lead generation systems, and maintained digital architectures for client web assets.`,
  },
  {
    title: "Web Developer",
    company: "Onda Fit",
    link: "https://onda.fit",
    employment_type: "Contract Based",
    period: "Jun 2025 - Dec 2025",
    duration: "7 months",
    description:
      "Co-created the primary management platform for Philippine sports hubs, streamlining scheduling, membership retention, and digital payments via GCash and Maya.",
  },
  {
    title: "Software Developer (Thesis Project)",
    company: "Mater Dei College - Bohol",
    link: "",
    employment_type: "On The Job Training",
    period: "Jan 2025 - Apr 2025",
    duration: "4 months",
    description:
      "Engineered an enterprise platform featuring asset management, leave automation, and teacher performance evaluation workflows.",
  },
];

const years = new Date().getFullYear() - 2021;

const personalDetails = {
  name: "Reinhard Esteban",
  img: "profile_img.jpg",
  title: "Full Stack Developer",
  tagline: "Crafting digital experiences that scale, delight, and endure.",
};

const stats = [
  { value: `${years}+`, label: "Years Exp." },
  { value: projects.length, label: "Projects Built" },
  { value: skills.length, label: "Skills & Tools" },
];

const toSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
</script>

<template>
  <div class="min-h-screen bg-[#fffef9] text-zinc-900 font-doodle p-4 sm:p-8 md:p-12 selection:bg-amber-200 selection:text-zinc-900 relative overflow-x-hidden">
    <!-- Grid Doodle Pattern Background -->
    <div class="fixed inset-0 pointer-events-none bg-[radial-gradient(#d4cebe_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 z-0"></div>

    <!-- Hand-drawn Visual Doodles -->
     <div class="fixed top-10 left-8 w-24 h-24 bg-amber-200/40 rounded-full blur-xl pointer-events-none"></div>
       <div class="fixed bottom-10 right-8 w-24 h-24 bg-amber-200/40 rounded-full blur-xl pointer-events-none"></div>

    <div class="max-w-[960px] mx-auto w-full relative z-10 space-y-12">

      <!-- Header Card with Tape Effects -->
      <header class="bg-white border-3 border-zinc-900 rounded-[30px] p-6 sm:p-10 shadow-[6px_6px_0px_0px_#18181b] relative transform -rotate-1">
        <!-- Masking Tape Doodle -->
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/80 border-y border-zinc-400 rotate-2 opacity-90 pointer-events-none shadow-sm"></div>

        <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          <!-- Avatar Frame -->
          <div class="relative flex-shrink-0 group">
            <div class="w-36 h-36 p-2 bg-amber-100 border-3 border-zinc-900 rounded-[24px] shadow-[4px_4px_0px_0px_#18181b] rotate-2">
              <img
                :src="'/assets/images/' + personalDetails.img"
                alt="Reinhard Esteban"
                class="w-full h-full object-cover rounded-[16px] border-2 border-zinc-900 filter contrast-105"
              />
            </div>
            <!-- Star SVG Annotation -->
            <div class="absolute -top-3 -right-3 text-amber-500 font-hand text-xl rotate-12">✦</div>
          </div>

          <!-- Main Info -->
          <div class="flex-1 text-center md:text-left space-y-3">
            <div class="inline-flex items-center gap-1.5 bg-sky-200 border-2 border-zinc-900 px-3 py-1 text-xs font-bold rounded-lg shadow-[2px_2px_0px_0px_#18181b] -rotate-1">
              <Rocket :size="14" /> Software Developer
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 font-hand">
              {{ personalDetails.name }}
            </h1>

            <p class="text-zinc-600 font-bold text-base">
              {{ personalDetails.title }}
            </p>

            <p class="text-zinc-700 text-sm leading-relaxed max-w-xl font-medium">
              "{{ personalDetails.tagline }}"
            </p>

            <div class="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                @click="togglePopup"
                class="bg-emerald-300 hover:bg-emerald-400 text-zinc-900 font-bold px-4 py-2 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_0px_#18181b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#18181b] transition-all text-xs flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle :size="16" /> What is Full-Stack?
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Stats Banner -->
        <div class="mt-8 grid grid-cols-3 gap-3 sm:gap-4 border-t-3 border-zinc-900 pt-6">
          <div
            v-for="(stat, idx) in stats"
            :key="stat.label"
            :class="[
              'p-3 sm:p-4 rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_0px_#18181b] text-center',
              idx === 0 ? 'bg-amber-100 -rotate-1' : idx === 1 ? 'bg-sky-100 rotate-1' : 'bg-rose-100 -rotate-1'
            ]"
          >
            <div class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-700">{{ stat.label }}</div>
            <div class="text-xl sm:text-3xl font-black text-zinc-900 mt-1 font-hand">
              {{ stat.value }}
            </div>
          </div>
        </div>
      </header>

      <!-- Popup Modal -->
      <Teleport to="body">
        <div
          v-if="isShowPopup"
          class="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-sm font-doodle"
        >
          <div class="bg-white border-3 border-zinc-900 rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-[8px_8px_0px_0px_#18181b] space-y-4 relative transform rotate-1">
            <div class="flex justify-between items-center border-b-2 border-zinc-900 pb-3">
              <h3 class="text-base font-black text-zinc-900 flex items-center gap-2 font-hand">
                <Sparkles :size="18" class="text-amber-500" /> Doodle Note: Full-Stack
              </h3>
              <button @click="togglePopup" class="text-zinc-900 font-black px-2.5 py-0.5 bg-amber-200 border-2 border-zinc-900 rounded-lg shadow-[2px_2px_0px_0px_#18181b] hover:bg-amber-300 cursor-pointer">✕</button>
            </div>
            
            <p class="text-zinc-700 leading-relaxed font-medium">
              A full-stack developer designs user interfaces, manages database backends, and connects the entire software puzzle from end to end!
            </p>
            
            <div class="pt-2 flex justify-end">
              <button
                @click="togglePopup"
                class="bg-amber-300 hover:bg-amber-400 text-zinc-900 font-bold px-5 py-2 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_0px_#18181b] transition-all text-xs cursor-pointer"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- About Me -->
      <section class="space-y-4">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2 font-hand">
          <User :size="22" class="text-amber-600" /> About Me
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 bg-white border-3 border-zinc-900 rounded-[24px] p-6 shadow-[5px_5px_0px_0px_#18181b] space-y-3 text-zinc-800 text-sm leading-relaxed">
            <p>
              I’m a software developer with <strong class="text-zinc-900 font-bold bg-amber-200 px-1 rounded">{{ years }}+ years</strong> of experience crafting web, mobile, and desktop applications.
            </p>
            <p>
              Whether structuring robust backend architectures or designing playful UIs, I love turning complex logic into accessible, reliable software.
            </p>
            
            <div class="flex gap-3 pt-3">
              <a href="https://github.com/esyot" target="_blank" class="px-3.5 py-1.5 rounded-xl bg-amber-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 shadow-[2px_2px_0px_0px_#18181b] hover:bg-amber-200 transition-all flex items-center gap-1.5">
                <Github :size="14" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/reinhard-esteban/" target="_blank" class="px-3.5 py-1.5 rounded-xl bg-sky-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 shadow-[2px_2px_0px_0px_#18181b] hover:bg-sky-200 transition-all flex items-center gap-1.5">
                <Linkedin :size="14" /> LinkedIn
              </a>
            </div>
          </div>

          <!-- Highlight Sticky Note -->
          <div class="bg-amber-50 border-3 border-zinc-900 rounded-[24px] p-5 shadow-[5px_5px_0px_0px_#18181b] space-y-3 text-xs rotate-1 relative">
            <div class="space-y-0.5">
              <span class="text-amber-700 font-bold uppercase text-[10px]">Location</span>
              <span class="text-zinc-900 font-black block text-sm font-hand">Philippines 🇵🇭</span>
            </div>
            <div class="border-t-2 border-dashed border-zinc-800 pt-2 space-y-0.5">
              <span class="text-amber-700 font-bold uppercase text-[10px]">Core Focus</span>
              <span class="text-zinc-900 font-black block text-sm font-hand">Full-Stack Web & Mobile</span>
            </div>
            <div class="border-t-2 border-dashed border-zinc-800 pt-2 space-y-0.5">
              <span class="text-amber-700 font-bold uppercase text-[10px]">Toolkit</span>
              <span class="text-zinc-900 font-black block text-xs">PHP · JS/TS · Node · Vue/React</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Projects -->
      <section class="space-y-4">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2 font-hand">
          <Rocket :size="22" class="text-sky-600" /> Featured Projects
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(project, idx) in projects"
            :key="project.name"
            :class="[
              'bg-white border-3 border-zinc-900 rounded-[24px] p-5 shadow-[5px_5px_0px_0px_#18181b] flex flex-col justify-between hover:-translate-y-1 transition-all',
              idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
            ]"
          >
            <div>
              <div class="flex justify-between items-start mb-2 gap-2">
                <h3 class="text-base font-black text-zinc-900 font-hand">
                  {{ project.name }}
                </h3>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 border-2 border-zinc-900 text-zinc-900 font-bold shadow-[1.5px_1.5px_0px_0px_#18181b] flex items-center gap-1 shrink-0">
                  <CheckCircle2 :size="10" /> {{ project.status }}
                </span>
              </div>

              <p class="text-zinc-700 text-xs mb-4 leading-relaxed font-medium">
                {{ project.description }}
              </p>
            </div>

            <div>
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="tech in project.tech_stack"
                  :key="tech"
                  class="text-[10px] bg-amber-50 text-zinc-900 border border-zinc-900 px-2 py-0.5 rounded-md font-bold shadow-[1px_1px_0px_0px_#18181b]"
                >
                  {{ tech }}
                </span>
              </div>

              <router-link
                :to="'/project/' + toSlug(project.name)"
                class="inline-flex items-center gap-1 text-xs font-black text-zinc-900 hover:text-sky-600 underline"
              >
                View Project Details <ExternalLink :size="12" />
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section class="space-y-4">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2 font-hand">
          <Clock :size="22" class="text-rose-600" /> Work Experience
        </h2>

        <div class="space-y-4">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="bg-white border-3 border-zinc-900 rounded-[24px] p-5 shadow-[5px_5px_0px_0px_#18181b] space-y-2 relative"
          >
            <div class="flex flex-wrap justify-between text-xs font-bold text-zinc-600 gap-2">
              <span class="text-amber-800 bg-amber-100 px-2 py-0.5 border border-zinc-900 rounded-md shadow-[1.5px_1.5px_0px_0px_#18181b]">{{ job.period }}</span>
              <span>{{ job.duration }}</span>
            </div>
            
            <h3 class="text-base font-black text-zinc-900 pt-1 font-hand">
              {{ job.title }} <span class="text-zinc-600 font-semibold font-sans">@ {{ job.company }}</span>
            </h3>
            
            <p class="text-xs text-zinc-700 leading-relaxed font-medium">
              {{ job.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Skills Grid -->
      <section class="space-y-4">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2 font-hand">
          <Zap :size="22" class="text-amber-500" /> Skills & Tools
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="bg-white border-2 border-zinc-900 rounded-xl p-3 shadow-[3px_3px_0px_0px_#18181b] flex items-center gap-2.5 hover:rotate-1 transition-transform"
          >
            <component :is="skill.icon" :size="18" class="text-zinc-800 shrink-0" />
            <span class="text-xs font-black text-zinc-900 font-hand truncate">{{ skill.name }}</span>
          </div>
        </div>
      </section>

      <!-- Contact Form -->
      <section class="space-y-4">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2 font-hand">
          <Mail :size="22" class="text-emerald-600" /> Send a Note
        </h2>

        <div class="bg-white border-3 border-zinc-900 rounded-[28px] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#18181b]">
          <form @submit.prevent="openGmail" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-zinc-800 mb-1">Your Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  class="w-full bg-amber-50/40 border-2 border-zinc-900 rounded-xl text-zinc-900 text-xs p-2.5 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b]"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-zinc-800 mb-1">Subject</label>
                <input
                  v-model="form.email"
                  type="text"
                  placeholder="Project Inquiry"
                  class="w-full bg-amber-50/40 border-2 border-zinc-900 rounded-xl text-zinc-900 text-xs p-2.5 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b]"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-zinc-800 mb-1">Message</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Let's build something awesome..."
                class="w-full bg-amber-50/40 border-2 border-zinc-900 rounded-xl text-zinc-900 text-xs p-2.5 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="bg-amber-300 hover:bg-amber-400 text-zinc-900 font-black text-xs px-6 py-2.5 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_0px_#18181b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#18181b] transition-all cursor-pointer flex items-center gap-2"
            >
              <Send :size="14" /> Send Doodle Mail
            </button>
          </form>
        </div>
      </section>

      <!-- Footer -->
      <footer class="text-center text-xs font-bold text-zinc-600 border-t-2 border-dashed border-zinc-400 pt-6 font-hand">
        Hand-crafted by Reinhard Esteban © {{ new Date().getFullYear() }}
      </footer>

    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kalam:wght@400;700&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap");

.font-hand {
  font-family: "Kalam", cursive;
}

.font-doodle {
  font-family: "Plus Jakarta Sans", sans-serif;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>