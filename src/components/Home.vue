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
  ArrowRight,
  Send,
  ExternalLink,
} from "lucide-vue-next";
import MouseTail from "./MouseTail.vue";
import AnimatedNumber from "./AnimatedNumber.vue";

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

const projects = [
  {
    name: "Ace Farms",
    link: "https://ace-farms.vercel.app/",
    description:
      "Transitioned a traditional agricultural operation into the digital space, eliminating supply chain friction and opening a direct-to-consumer online revenue channel.",
    tech_stack: ["Next.js", "Tailwind", "Shadcn/ui", "Supabase"],
    status: "In Development",
    statusColor: "amber",
  },
  {
    name: "CG's Travellers Inn",
    link: "https://travellers-inn.candgph.com/",
    description:
      "Replaced manual booking headaches with an automated, high-conversion room reservation system that captures direct tourist bookings 24/7 without third-party fees.",
    tech_stack: ["Laravel", "Vue", "Inertia"],
    status: "Staging",
    statusColor: "blue",
  },
  {
    name: "C&G Trading & Warehousing",
    link: "https://candg-pos.onrender.com/",
    description:
      "Architected the migration of a legacy COBOL-based enterprise system into a modern web ecosystem—unifying fragmented warehouse logistics and real-time point-of-sale into a secure, single source of truth.",
    tech_stack: ["Laravel", "React", "Inertia"],
    status: "Staging",
    statusColor: "blue",
  },
  {
    name: "ScratchSQL",
    link: "https://scratch-sql.vercel.app/",
    description:
      "Solved the bottleneck of tedious database design by turning visual canvas schemas directly into production-ready Laravel migrations and raw SQL instantly.",
    tech_stack: ["Next.js", "Prisma", "Tailwind", "Shadcn/ui", "Supabase"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "Keith Kurlander",
    link: "https://keithkurlander.com/",
    description:
      "Engineered a high-performance personal brand platform that removed friction from the client onboarding funnel, directly scaling coaching inquiries and automated book sales.",
    tech_stack: ["WordPress", "Elementor"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC PRMS",
    link: "https://prop.materdeicollege.com",
    description:
      "Eliminated chaotic paperwork and scheduling conflicts by building a digital property reservation system that automates campus asset approval workflows.",
    tech_stack: ["Laravel", "Blade", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC SEC",
    link: "https://sec.materdeicollege.com",
    description:
      "Replaced disjointed communication channels with a centralized event coordination platform, preventing logistical clashes between student groups and administration.",
    tech_stack: ["Laravel", "Vue", "Inertia", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC HR",
    link: "https://hr.materdeicollege.com",
    description:
      "Digitized a legacy, paper-heavy Human Resources department, drastically reducing manual data entry errors and speeding up administrative employee requests.",
    tech_stack: ["Laravel", "Vue", "Inertia", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "FREECON",
    link: "https://freecon-one.vercel.app",
    description:
      "Created an open-source icon library to bypass restrictive assets licensing and heavy dependencies, giving developers a zero-overhead UI toolkit.",
    tech_stack: ["HTML"],
    status: "Shipped",
    statusColor: "green",
  },
];

const careerHistory = [
  {
    title: "Senior Software Engineer",
    company: "Hashed.IT",
    link: "https://hashed.it.com",
    period: "May 2025 - May 2026",
    duration: "1 year 1 month",
    description:
      "As a Web Developer at Hashed.IT, I build the intelligent systems powering the next generation of local industries. From AI integrations and custom enterprise software to automation workflows for utilities and schools, I help transform complex business demands into streamlined digital solutions.",
  },
  {
    title: "Web Developer",
    company: "Brandetize",
    link: "https://brandetize.com",
    period: "Dec 2025 - Mar 2026",
    duration: "4 months",
    description: `As a developer at Brandetize , I build and optimize the high-performing digital architecture that drives growth. My focus centers on engineering seamless marketing funnels, scaling lead generation systems, and managing robust platform maintenance to ensure flawless digital experiences for clients.`,
  },
  {
    title: "Web Developer",
    company: "Onda Fit",
    link: "https://onda.fit",
    period: "Jun 2025 - Dec 2025",
    duration: "7 months",
    description:
      "As one of the pioneer developers behind Onda Fit , I helped build the go-to management platform and 'operating system' for Philippine sports and wellness hubs. From pickleball courts to Pilates studios, the platform optimizes local businesses by streamlining scheduling, driving membership retention, and integrating seamless digital payments via GCash and Maya.",
  },
  {
    title: "Software Developer (Thesis Project)",
    company: "Mater Dei College - Bohol",
    link: "",
    period: "Jan 2025 - Apr 2025",
    duration: "4 months",
    description:
      "Developed the Mater Dei College Enterprise Management Platform including an Asset Management Engine to digitize leasing and borrowing workflows, an HR & Leave Automation module for secure leave requests and approvals, and a Performance Evaluation System to manage teacher performance ratings.",
  },
];

const yearStarted = new Date("2022-01-01");
const today = new Date();
let years = today.getFullYear() - yearStarted.getFullYear();
if (
  today.getMonth() < yearStarted.getMonth() ||
  (today.getMonth() === yearStarted.getMonth() &&
    today.getDate() < yearStarted.getDate())
) {
  years--;
}

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
  { value: years, label: "Years of Experience" },
  { value: projects.length, label: "Projects Delivered" },
  { value: skills.length, label: "Technologies Mastered" },
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
</script>

<template>
  <MouseTail />
  <div
    class="min-h-screen bg-[#080b12] text-[#e8eaf0] font-sans relative overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-white"
  >
    <div
      class="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(212,175,55,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.04)_1px,transparent_1px)] bg-[size:60px_60px]"
    ></div>
    <div
      class="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-[#d4af37]/10 blur-[120px] animate-pulse z-0 pointer-events-none"
    ></div>
    <div
      class="fixed bottom-[200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] animate-pulse delay-700 z-0 pointer-events-none"
    ></div>

    <div class="relative z-10 max-w-[1100px] mx-auto px-6 pb-20">
      <header
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 py-24 md:py-32"
      >
        <div
          class="flex flex-col md:flex-row items-center gap-14 text-center md:text-left"
        >
          <div class="relative flex-shrink-0 group">
            <div
              class="absolute inset-[-6px] rounded-[2rem] bg-gradient-to-tr from-[#d4af37] via-transparent to-[#d4af37] animate-[spin_6s_linear_infinite] opacity-70"
            ></div>
            <img
              :src="'/assets/images/' + personalDetails.img"
              alt="Reinhard Esteban"
              class="relative z-10 w-40 h-40 rounded-[1.8rem] object-cover border-[3px] border-[#080b12]"
            />
            <div
              class="absolute inset-0 rounded-[1.8rem] shadow-[0_0_60px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_80px_rgba(212,175,55,0.5)] transition-shadow duration-500"
            ></div>
          </div>
          <div class="flex-1">
            <div
              class="inline-flex items-center gap-2 text-[13px] text-[#a3e635] bg-[#a3e635]/10 border border-[#a3e635]/20 px-4 py-1.5 rounded-full mb-6 tracking-wide mx-auto md:mx-0"
            >
              <span
                class="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"
              ></span>
              Available for opportunities
            </div>
            <h1
              class="text-5xl md:text-7xl font-black leading-tight tracking-tight bg-gradient-to-br from-white via-white to-[#d4af37] bg-clip-text text-transparent mb-4 font-display"
            >
              {{ personalDetails.name }}
            </h1>
            <div
              class="flex items-center justify-center md:justify-start gap-3 mb-4"
            >
              <p class="text-xl text-[#d4af37] font-semibold tracking-wide">
                {{ personalDetails.title }}
              </p>
              <button
                @click="togglePopup"
                class="w-6 h-6 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center transition-all hover:bg-[#d4af37]/30 hover:scale-110 active:scale-95"
              >
                <HelpCircle :size="14" />
              </button>
            </div>
            <p
              class="text-lg text-[#8891a4] italic mb-10 max-w-[480px] leading-relaxed"
            >
              "{{ personalDetails.tagline }}"
            </p>
            <div class="flex flex-wrap gap-10">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="flex flex-col"
              >
                <span class="text-6xl font-black text-[#d4af37]">
                  <AnimatedNumber :value="stat.value" />{{ stat.suffix }}
                </span>
                <span class="text-[0.7rem] uppercase tracking-widest">{{
                  stat.label
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Teleport to="body">
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isShowPopup"
            class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-6"
            @click.self="togglePopup"
          >
            <div
              class="bg-[#10151f] border border-[#d4af37]/30 rounded-[2rem] p-10 max-w-[500px] w-full shadow-2xl transform transition-all"
            >
              <div class="flex items-center gap-4 mb-6">
                <div class="p-3 bg-[#d4af37]/10 rounded-2xl">
                  <HelpCircle class="text-[#d4af37]" :size="32" />
                </div>
                <h3 class="text-2xl font-bold text-white font-display">
                  What is a Full Stack Developer?
                </h3>
              </div>
              <p class="text-[#8891a4] leading-relaxed text-lg mb-8">
                A full-stack developer bridges the gap between what users see
                and what powers it behind the scenes. From crafting
                pixel-perfect interfaces with frameworks like Vue or React, to
                engineering robust server-side logic and databases with PHP,
                Laravel, or Node.js.
              </p>
              <button
                @click="togglePopup"
                class="w-full py-4 bg-[#d4af37] text-[#080b12] rounded-2xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#d4af37]/20"
              >
                Understood
              </button>
            </div>
          </div>
        </transition>
      </Teleport>

      <section
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-32"
      >
        <div class="flex flex-col mb-12">
          <span
            class="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-2"
            >01 — About</span
          >
          <h2 class="text-4xl font-bold text-white font-display">Background</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6 text-lg text-[#8891a4] leading-relaxed">
            <p>
              I'm a software developer with
              <strong class="text-[#d4af37] font-semibold text-xl"
                >{{ years }}+ years</strong
              >
              of experience turning complex technical bottlenecks into smooth,
              scalable user experiences across web, mobile, and desktop.
            </p>
            <p>
              I don't just write clean code—I build architecture that scales
              with your user base. Whether optimizing real-time data pipelines
              or streamlining legacy systems, my focus is always on shipping
              high-performance software that solves critical business problems.
            </p>
          </div>
          <div
            class="relative group"
            @mousemove="(e) => handleCardTilt(e, $event.currentTarget)"
            @mouseleave="(e) => resetCardTilt($event.currentTarget)"
          >
            <div
              class="bg-gradient-to-br from-[#d4af37]/15 to-transparent border border-[#d4af37]/20 rounded-[2rem] p-8 transition-transform duration-200 ease-out preserve-3d"
            >
              <div class="space-y-5">
                <div
                  v-for="(val, key) in {
                    'Based in': 'Philippines 🇵🇭',
                    Focus: 'Web & Mobile Apps',
                    Experience: years + '+ Years',
                    Stack: 'PHP · JavaScript · Node  · Python',
                  }"
                  :key="key"
                  class="flex justify-between items-center border-b border-white/5 pb-4"
                >
                  <span
                    class="text-[#5a6275] font-medium uppercase text-xs tracking-wider"
                    >{{ key }}</span
                  >
                  <span class="text-white font-semibold">{{ val }}</span>
                </div>
                <div class="flex justify-between items-center pt-2">
                  <span
                    class="text-[#5a6275] font-medium uppercase text-xs tracking-wider"
                    >Status</span
                  >
                  <span
                    class="text-[#a3e635] font-bold flex items-center gap-2"
                  >
                    <span
                      class="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"
                    ></span>
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-32"
      >
        <div class="flex flex-col mb-12">
          <span
            class="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-2"
            >04.5 — Career History</span
          >
          <h2 class="text-4xl font-bold text-white font-display">
            Career History
          </h2>
        </div>

        <div class="space-y-6">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
          >
            <div class="flex items-start justify-between mb-3 gap-4">
              <div>
                <h3 class="text-xl font-bold text-white">{{ job.title }}</h3>
                <a
                  v-if="job.link"
                  :href="job.link"
                  target="_blank"
                  rel="noopener"
                  class="text-sm text-[#d4af37] hover:underline block"
                >
                  {{ job.company }}
                </a>
                <span v-else class="text-sm text-[#d4af37] block">{{
                  job.company
                }}</span>
              </div>
              <div class="text-right text-sm text-[#8891a4]">
                <div>{{ job.period }}</div>
                <div class="font-bold text-white">{{ job.duration }}</div>
              </div>
            </div>
            <p class="text-[#8891a4] leading-relaxed">{{ job.description }}</p>
          </div>
        </div>
      </section>

      <section
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-32"
      >
        <div class="flex flex-col mb-12">
          <span
            class="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-2"
            >02 — Education</span
          >
          <h2 class="text-4xl font-bold text-white font-display">
            Academic Journey
          </h2>
        </div>
        <div
          class="relative border-l-2 border-[#d4af37]/20 ml-4 space-y-12 py-4"
        >
          <div
            v-for="(edu, idx) in [
              {
                school: 'JAPeR Memorial High School',
                desc: 'ICT Track — Foundation in Information and Communications Technology',
                active: false,
              },
              {
                school: 'San Agustin National High School',
                desc: 'NC III — Programming & Animation',
                active: false,
              },
              {
                school: 'Mater Dei College',
                desc: 'Bachelor of Science in Information Technology',
                active: true,
                tag: 'BSIT Graduate',
              },
            ]"
            :key="idx"
            class="relative pl-10 group"
          >
            <div
              :class="[
                'absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-[#080b12] transition-colors duration-500',
                edu.active
                  ? 'bg-[#d4af37] shadow-[0_0_15px_#d4af37]'
                  : 'bg-[#2a2f3e] border-[#d4af37]/40',
              ]"
            ></div>
            <h3
              class="text-xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors"
            >
              {{ edu.school }}
            </h3>
            <p class="text-[#8891a4] leading-relaxed max-w-2xl">
              {{ edu.desc }}
            </p>
            <span
              v-if="edu.tag"
              class="inline-block mt-4 text-xs font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-4 py-1.5 rounded-full"
              >{{ edu.tag }}</span
            >
          </div>
        </div>
      </section>

      <section
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-32"
      >
        <div class="flex flex-col mb-12">
          <span
            class="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-2"
            >03 — Expertise</span
          >
          <h2 class="text-4xl font-bold text-white font-display">
            Skills & Technologies
          </h2>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <div
            v-for="skill in skills"
            :key="skill.name"
            @mousemove="(e) => handleCardTilt(e, $event.currentTarget)"
            @mouseleave="(e) => resetCardTilt($event.currentTarget)"
            class="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 group transition-all duration-300 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 hover:shadow-xl hover:shadow-[#d4af37]/5 preserve-3d"
          >
            <component
              :is="skill.icon"
              class="text-[#d4af37]/50 group-hover:text-[#d4af37] transition-all duration-500 mb-4 group-hover:scale-110"
              :size="32"
            />
            <p class="text-sm font-bold text-[#c8cdd8] mb-3">
              {{ skill.name }}
            </p>
            <div class="flex gap-1">
              <span
                v-for="i in 5"
                :key="i"
                :class="[
                  'text-[10px]',
                  i <= skill.rating ? 'text-[#d4af37]' : 'text-white/10',
                ]"
                >★</span
              >
            </div>
          </div>
        </div>
      </section>

      <section
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-32"
      >
        <div class="flex flex-col mb-12">
          <span
            class="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-2"
            >04 — Work</span
          >
          <h2 class="text-4xl font-bold text-white font-display">
            Projects I've Shipped
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="project in projects"
            :key="project.name"
            @mousemove="(e) => handleCardTilt(e, $event.currentTarget)"
            @mouseleave="(e) => resetCardTilt($event.currentTarget)"
            class="group bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-[#d4af37]/30 hover:bg-white/[0.04] preserve-3d"
          >
            <a
              :href="project.link"
              target="_blank"
              class="p-8 h-full flex flex-col"
            >
              <div class="flex justify-between items-start mb-6">
                <div
                  class="p-3 bg-[#d4af37]/10 rounded-2xl group-hover:scale-110 transition-transform duration-500"
                >
                  <Box class="text-[#d4af37]" :size="24" />
                </div>
                <span
                  :class="[
                    'text-[10px] font-bold px-3 py-1 rounded-full border flex items-center gap-2 uppercase tracking-tighter',
                    statusColors[project.statusColor].bg,
                    statusColors[project.statusColor].text,
                    statusColors[project.statusColor].border,
                  ]"
                >
                  <span
                    :class="[
                      'w-1.5 h-1.5 rounded-full',
                      statusColors[project.statusColor].dot,
                    ]"
                  ></span>
                  {{ project.status }}
                </span>
              </div>
              <h3
                class="text-2xl font-bold text-white mb-4 group-hover:text-[#d4af37] transition-colors"
              >
                {{ project.name }}
              </h3>
              <p
                class="text-[#8891a4] leading-relaxed mb-8 flex-1 line-clamp-3 italic"
              >
                "{{ project.description }}"
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in project.tech_stack"
                  :key="tech"
                  class="text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/60"
                >
                  {{ tech }}
                </span>
              </div>
              <div
                class="flex items-center gap-2 text-[#d4af37] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0"
              >
                Explore Project <ArrowRight :size="16" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-32"
      >
        <div class="flex flex-col mb-12">
          <span
            class="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-2"
            >05 — References</span
          >
          <h2 class="text-4xl font-bold text-white font-display">
            People Who Know My Work
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(ref, index) in references"
            :key="index"
            @mousemove="(e) => handleCardTilt(e, $event.currentTarget)"
            @mouseleave="(e) => resetCardTilt($event.currentTarget)"
            class="bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-8 flex flex-col hover:border-[#d4af37]/40 transition-all duration-300 group preserve-3d"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-amber-200/20 flex items-center justify-center text-[#080b12] font-black text-xl mb-6 shadow-lg shadow-[#d4af37]/10 group-hover:scale-110 transition-transform"
            >
              {{
                ref.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
              }}
            </div>
            <h3 class="text-lg font-bold text-white mb-1">{{ ref.name }}</h3>
            <p
              class="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-6"
            >
              {{ ref.role }}
            </p>
            <div class="space-y-3 mt-auto">
              <a
                :href="`mailto:${ref.email}`"
                class="flex items-center gap-3 text-sm text-[#8891a4] hover:text-[#d4af37] transition-colors break-all"
              >
                <Mail :size="14" /> {{ ref.email }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        class="reveal opacity-0 translate-y-10 transition-all duration-1000 mb-32"
      >
        <div class="flex flex-col mb-12">
          <span
            class="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-2"
            >06 — Contact</span
          >
          <h2 class="text-4xl font-bold text-white font-display">
            Get In Touch
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-8">
            <p class="text-lg text-[#8891a4] leading-relaxed">
              Have a project in mind or just want to chat? Fill out the details
              here, and it will automatically prepare a Gmail draft for you.
            </p>

            <div class="space-y-6">
              <div class="flex items-center gap-6 group">
                <div
                  class="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#080b12] transition-all"
                >
                  <Mail :size="20" />
                </div>
                <div>
                  <p
                    class="text-xs font-bold text-[#5a6275] uppercase tracking-widest mb-1"
                  >
                    Email Me
                  </p>
                  <a
                    href="mailto:rei.nhard3367@gmail.com"
                    class="text-white font-bold hover:text-[#d4af37] transition-colors"
                    >rei.nhard3367@gmail.com</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-10"
          >
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label
                    class="text-xs font-bold text-[#5a6275] uppercase tracking-widest ml-1"
                    >Your Name</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="John Doe"
                    class="w-full bg-[#10151f] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/20"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-xs font-bold text-[#5a6275] uppercase tracking-widest ml-1"
                    >Subject</label
                  >
                  <input
                    v-model="form.email"
                    type="text"
                    placeholder="Project Inquiry"
                    class="w-full bg-[#10151f] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label
                  class="text-xs font-bold text-[#5a6275] uppercase tracking-widest ml-1"
                  >Message</label
                >
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Briefly describe your project..."
                  class="w-full bg-[#10151f] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/20 resize-none"
                ></textarea>
              </div>

              <button
                @click="openGmail"
                class="group relative flex items-center justify-center gap-3 w-full py-5 bg-[#d4af37] text-[#080b12] rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#d4af37]/10 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                ></div>
                <span class="relative z-10 flex items-center gap-2">
                  Send Message <Send :size="16" />
                </span>
              </button>

              <p
                class="text-[10px] text-[#5a6275] text-center uppercase tracking-widest mt-4"
              >
                Clicking will open a new tab with your message ready to send.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer class="pt-20 border-t border-white/10 relative text-center">
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#d4af37]/10 blur-[50px] pointer-events-none"
        ></div>
        <p
          class="text-lg text-[#5a6275] flex justify-center flex-col sm:flex-row gap-4"
        >
          Designed & Built by
          <strong class="text-[#d4af37]">Reinhard U. Esteban</strong>
        </p>
        <p
          class="text-xs text-[#3a3f50] mt-4 font-bold tracking-[0.2em] uppercase"
        >
          © {{ new Date().getFullYear() }} — Digital Craftsmanship
        </p>
      </footer>
    </div>
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
