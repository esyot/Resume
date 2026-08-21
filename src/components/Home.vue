<script setup>
import { ref, computed, defineAsyncComponent, onMounted, onUnmounted } from "vue";
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
  ArrowRight,
  Send,
} from "lucide-vue-next";

import { projects } from "../data/projects.js";

// Theme Switcher State
const themes = [
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'cli', name: 'CLI' },
  { id: 'doodle', name: 'Doodle' },
  { id: 'graffiti', name: 'Graffiti' },
  { id: 'vintage', name: 'Vintage' }
];

const currentTheme = ref('vintage'); // Default to vintage if you want it first

// Dynamic Component Resolution for Versions
const activeComponent = computed(() => {
  switch (currentTheme.value) {
    case 'sci-fi':
      return defineAsyncComponent(() => import('./versions/sci-fi.vue'));
    case 'cli':
      return defineAsyncComponent(() => import('./versions/cli.vue'));
    case 'doodle':
      return defineAsyncComponent(() => import('./versions/doodle.vue'));
    case 'graffiti':
      return defineAsyncComponent(() => import('./versions/graffiti.vue'));
    case 'vintage':
      return defineAsyncComponent(() => import('./versions/vintage.vue'));
  }
});

const isShowPopup = ref(false);
const togglePopup = () => {
  isShowPopup.value = !isShowPopup.value;
};

const mouseX = ref(0);
const mouseY = ref(0);

const form = ref({
  name: "",
  email: "",
  message: "",
});

const handleMouseMove = (e) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20;
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20;
};

const handleCardTilt = (e, el) => {
  if (!el || window.matchMedia("(max-width: 768px)").matches) return;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const tiltX = ((y - cy) / cy) * 12;
  const tiltY = ((cx - x) / cx) * 12;
  el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
};

const resetCardTilt = (el) => {
  if (!el) return;
  el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
};

const openGmail = () => {
  const subject = encodeURIComponent(
    `Inquiry from ${form.value.name || "Portfolio Visitor"}`,
  );
  const body = encodeURIComponent(
    `${form.value.message}\n\nFrom: ${form.value.name}\nEmail: ${form.value.email}`,
  );
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rei.nhard3367@gmail.com&su=${subject}&body=${body}`;
  window.open(gmailUrl, "_blank");
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
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
    description: `Architected and deployed scalable web applications using modern JavaScript frameworks, optimizing performance and user experience while collaborating closely with clients to translate business requirements into clean, maintainable code. Integrated third-party APIs, database solutions, and cloud services to deliver robust, end-to-end digital solutions. Managed full project lifecycles independently, ensuring on-time delivery and adherence to high-quality software standards.`,
  },
  {
    title: "Senior Software Engineer",
    company: "Hashed.IT",
    link: "https://hashed.it.com",
    employment_type: "Contract Based",
    period: "May 2025 - May 2026",
    duration: "1 year 1 month",
    description:
      "As a Web Developer at Hashed.IT, I build the intelligent systems powering the next generation of local industries. From AI integrations and custom enterprise software to automation workflows for utilities and schools, I help transform complex business demands into streamlined digital solutions.",
  },
  {
    title: "Web Developer",
    company: "Brandetize",
    link: "https://brandetize.com",
    employment_type: "Contract Based",
    period: "Dec 2025 - Mar 2026",
    duration: "4 months",
    description: `As a developer at Brandetize, I build and optimize the high-performing digital architecture that drives growth. My focus centers on engineering seamless marketing funnels, scaling lead generation systems, and managing robust platform maintenance to ensure flawless digital experiences for clients.`,
  },
  {
    title: "Web Developer",
    company: "Onda Fit",
    link: "https://onda.fit",
    employment_type: "Contract Based",
    period: "Jun 2025 - Dec 2025",
    duration: "7 months",
    description:
      "As one of the pioneer developers behind Onda Fit, I helped build the go-to management platform and 'operating system' for Philippine sports and wellness hubs. From pickleball courts to Pilates studios, the platform optimizes local businesses by streamlining scheduling, driving membership retention, and integrating seamless digital payments via GCash and Maya.",
  },
  {
    title: "Software Developer (Thesis Project)",
    company: "Mater Dei College - Bohol",
    link: "",
    employment_type: "On The Job Training",
    period: "Jan 2025 - Apr 2025",
    duration: "4 months",
    description:
      "Developed the Mater Dei College Enterprise Management Platform including an Asset Management Engine to digitize leasing and borrowing workflows, an HR & Leave Automation module for secure leave requests and approvals, and a Performance Evaluation System to manage teacher performance ratings.",
  },
];

const years =
  new Date(new Date() - new Date("2021-01-01")).getFullYear() - 1970;

const references = [
  {
    name: "Julio Lopez",
    sex: "male",
    role: "Contractor / Developer / CEO",
    email: "juliolopez241997@gmail.com",
  },
  {
    name: "Sheryl Enriquez",
    sex: "female",
    role: "Professor",
    email: "sherylenriquez30@gmail.com",
  },
  {
    name: "Benjie Lenteria",
    sex: "male",
    role: "Professor / Supervisor",
    email: "hawkmanlentrix@gmail.com",
  },
  {
    name: "Josefina J. Pangan",
    sex: "female",
    role: "CAST Dean / Supervisor",
    email: "j1fina@yahoo.com",
  },
];

const personalDetails = {
  name: "Reinhard Esteban",
  img: "profile_img.jpg",
  title: "Full Stack Developer",
  tagline: "Crafting digital experiences that scale, delight, and endure.",
};

const stats = [
  { value: years, label: "Years of Experience", suffix: "" },
  { value: projects.length, label: "Projects Delivered", suffix: "" },
  { value: skills.length, label: "Technologies Mastered", suffix: "" },
];

const statusColors = {
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  blue: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/30",
    dot: "bg-sky-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
};

const toSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Floating Theme Switcher Navigation Bar -->
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] bg-slate-950/80 backdrop-blur-xl border border-white/20 p-2 rounded-full shadow-2xl flex items-center gap-1.5 overflow-x-auto max-w-[95vw]">
      <button
        v-for="theme in themes"
        :key="theme.id"
        @click="currentTheme = theme.id"
        :class="[
          'px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer',
          currentTheme === theme.id
            ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)]'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        ]"
      >
        {{ theme.name }}
      </button>
    </div>

 
    <component
      :is="activeComponent"
      :personalDetails="personalDetails"
      :stats="stats"
      :skills="skills"
      :careerHistory="careerHistory"
      :references="references"
      :projects="projects"
      :form="form"
      :isShowPopup="isShowPopup"
      :togglePopup="togglePopup"
      :openGmail="openGmail"
      :toSlug="toSlug"
      :years="years"
      :statusColors="statusColors"
      :handleCardTilt="handleCardTilt"
      :resetCardTilt="resetCardTilt"
    />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Syne:wght@400..800&display=swap");

.font-display {
  font-family: "Syne", sans-serif;
}

body {
  font-family: "DM Sans", sans-serif;
  background-color: #080b12;
}

.preserve-3d {
  transform-style: preserve-3d;
  will-change: transform;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #10151f inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>