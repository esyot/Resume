
<template>
  <div
    class="min-h-screen bg-[#fffdf9] text-zinc-800 font-sans p-4 sm:p-8 md:p-12 selection:bg-amber-200 selection:text-zinc-900 overflow-x-hidden relative"
  >
    <!-- Hand-drawn Grid Background Pattern -->
    <div
      class="fixed inset-0 pointer-events-none bg-[radial-gradient(#e5e0d8_1px,transparent_1px)] [background-size:32px_32px] opacity-70 z-0"
    ></div>

    <!-- Doodle Floating Decorative Dabs -->
    <div class="fixed top-12 left-12 w-16 h-16 border-2 border-dashed border-amber-400 rounded-full animate-spin-slow pointer-events-none opacity-40"></div>
    <div class="fixed bottom-20 right-16 w-20 h-20 bg-sky-200/50 rounded-full blur-xl pointer-events-none"></div>

    <div class="max-w-[1050px] mx-auto w-full relative z-10 space-y-12">
      
      <!-- Doodle Banner Header -->
      <header class="bg-white border-3 border-zinc-900 rounded-[30px] p-6 sm:p-10 shadow-[6px_6px_0px_0px_#18181b] relative overflow-hidden transform -rotate-1">
        <div class="absolute -top-3 right-10 bg-amber-300 border-2 border-zinc-900 px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-[2px_2px_0px_0px_#18181b] rotate-3 flex items-center gap-1.5">
          <Sparkles :size="14" /> Playful Edition
        </div>

        <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          <!-- Doodle Avatar Frame -->
          <div class="relative group flex-shrink-0">
            <div class="w-36 h-36 p-1.5 bg-amber-100 border-3 border-zinc-900 rounded-[24px] shadow-[4px_4px_0px_0px_#18181b] rotate-2">
              <img
                :src="'/assets/images/' + personalDetails.img"
                alt="Reinhard Esteban"
                class="w-full h-full object-cover rounded-[18px] border-2 border-zinc-900 filter contrast-110"
              />
            </div>
          </div>

          <div class="flex-1 text-center md:text-left space-y-3">
            <div>
              <span class="inline-flex items-center gap-1.5 bg-sky-200 border-2 border-zinc-900 px-3 py-1 text-xs font-bold text-zinc-900 rounded-lg shadow-[2px_2px_0px_0px_#18181b] -rotate-1 mb-2">
                <Rocket :size="14" /> Software Developer
              </span>
              <h1 class="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight">
                {{ personalDetails.name }}
              </h1>
              <p class="text-zinc-600 font-semibold text-lg mt-1">
                {{ personalDetails.title }}
              </p>
            </div>

            <p class="text-zinc-700 text-sm leading-relaxed max-w-xl font-medium">
              {{ personalDetails.tagline }}
            </p>

            <div class="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                @click="togglePopup"
                class="bg-emerald-300 hover:bg-emerald-400 text-zinc-900 font-bold px-5 py-2.5 rounded-2xl border-3 border-zinc-900 shadow-[4px_4px_0px_0px_#18181b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#18181b] transition-all text-xs flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle :size="16" /> What is Full-Stack?
              </button>
            </div>
          </div>
        </div>

        <!-- Doodle Stats Cards Grid -->
        <div class="mt-10 grid grid-cols-3 gap-4 border-t-3 border-zinc-900 pt-8">
          <div
            v-for="(stat, idx) in stats"
            :key="stat.label"
            :class="[
              'p-4 rounded-2xl border-3 border-zinc-900 shadow-[4px_4px_0px_0px_#18181b] text-center md:text-left',
              idx === 0 ? 'bg-amber-100' : idx === 1 ? 'bg-sky-100' : 'bg-rose-100'
            ]"
          >
            <div class="text-[11px] font-bold uppercase tracking-wider text-zinc-700">{{ stat.label }}</div>
            <div class="text-2xl md:text-3xl font-black text-zinc-900 mt-1">
              <AnimatedNumber :value="stat.value" />{{ stat.suffix }}
            </div>
          </div>
        </div>
      </header>

      <!-- Doodle Definition Popup Modal -->
      <Teleport to="body">
        <div
          v-if="isShowPopup"
          class="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-sm"
        >
          <div class="bg-white border-3 border-zinc-900 rounded-[32px] p-8 max-w-xl w-full shadow-[8px_8px_0px_0px_#18181b] space-y-6 relative transform rotate-1">
            <div class="flex justify-between items-center border-b-2 border-zinc-900 pb-4">
              <h3 class="text-lg font-black text-zinc-900 flex items-center gap-2">
                <Sparkles :size="20" class="text-amber-500" /> Doodle Note: Full-Stack
              </h3>
              <button @click="togglePopup" class="text-zinc-900 font-black px-3 py-1 bg-amber-200 border-2 border-zinc-900 rounded-xl shadow-[2px_2px_0px_0px_#18181b] hover:bg-amber-300 cursor-pointer">X</button>
            </div>
            
            <p class="text-zinc-700 leading-relaxed font-medium">
              A full-stack developer acts like an all-around creator—designing friendly user interfaces, managing solid server databases, and making sure all pieces fit together like a fun puzzle!
            </p>
            
            <div class="pt-2 flex justify-end">
              <button
                @click="togglePopup"
                class="bg-amber-300 hover:bg-amber-400 text-zinc-900 font-bold px-6 py-2.5 rounded-2xl border-3 border-zinc-900 shadow-[4px_4px_0px_0px_#18181b] transition-all text-xs cursor-pointer"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Section: About Me -->
      <section class="space-y-6">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
          <User :size="24" class="text-amber-600" /> About Me
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 bg-white border-3 border-zinc-900 rounded-[28px] p-6 md:p-8 shadow-[6px_6px_0px_0px_#18181b] space-y-4 text-zinc-700 text-sm leading-relaxed">
            <p>
              I’m a software developer with <strong class="text-zinc-900 font-bold">{{ years }}+ years</strong> of experience building full-stack web, mobile, and desktop applications.
            </p>
            <p>
              Whether it's sketching out clean code architecture or polishing UI components, I enjoy turning ideas into reliable, delightful software.
            </p>
            
            <div class="flex gap-4 pt-4">
              <a href="https://github.com/esyot" target="_blank" class="px-4 py-2 rounded-xl bg-amber-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 shadow-[3px_3px_0px_0px_#18181b] hover:bg-amber-200 transition-all flex items-center gap-1.5">
                <Github :size="14" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/reinhard-esteban/" target="_blank" class="px-4 py-2 rounded-xl bg-sky-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 shadow-[3px_3px_0px_0px_#18181b] hover:bg-sky-200 transition-all flex items-center gap-1.5">
                <Linkedin :size="14" /> LinkedIn
              </a>
            </div>
          </div>

          <!-- Doodle Sidebar Highlights -->
          <div class="bg-amber-50 border-3 border-zinc-900 rounded-[28px] p-6 shadow-[6px_6px_0px_0px_#18181b] space-y-4 text-xs">
            <div class="space-y-1">
              <span class="text-amber-700 block font-bold uppercase tracking-wider text-[10px]">Location</span>
              <span class="text-zinc-900 font-black text-sm">Philippines</span>
            </div>
            <div class="border-t-2 border-zinc-900 pt-3 space-y-1">
              <span class="text-amber-700 block font-bold uppercase tracking-wider text-[10px]">Core Focus</span>
              <span class="text-zinc-900 font-black text-sm">Web & Mobile Apps</span>
            </div>
            <div class="border-t-2 border-zinc-900 pt-3 space-y-1">
              <span class="text-amber-700 block font-bold uppercase tracking-wider text-[10px]">Toolkit</span>
              <span class="text-zinc-900 font-black text-sm">PHP · JS · Node · Python</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Projects -->
      <section class="space-y-6">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
          <Rocket :size="24" class="text-sky-600" /> Featured Projects
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(project, idx) in projects"
            :key="project.name"
            :class="[
              'bg-white border-3 border-zinc-900 rounded-[28px] p-6 shadow-[6px_6px_0px_0px_#18181b] flex flex-col justify-between hover:-translate-y-1 transition-transform',
              idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
            ]"
          >
            <div>
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-black text-zinc-900">
                  {{ project.name }}
                </h3>
                <span class="text-[10px] px-3 py-1 rounded-full bg-emerald-100 border-2 border-zinc-900 text-zinc-900 font-bold shadow-[2px_2px_0px_0px_#18181b] flex items-center gap-1">
                  <CheckCircle2 :size="12" /> {{ project.status }}
                </span>
              </div>

              <p class="text-zinc-600 text-xs mb-6 leading-relaxed font-medium">
                {{ project.description }}
              </p>
            </div>

            <div>
              <div class="flex flex-wrap gap-1.5 mb-6">
                <span
                  v-for="tech in project.tech_stack"
                  :key="tech"
                  class="text-[10px] bg-zinc-100 text-zinc-900 border-2 border-zinc-900 px-2.5 py-0.5 rounded-lg font-bold shadow-[2px_2px_0px_0px_#18181b]"
                >
                  {{ tech }}
                </span>
              </div>

              <router-link
                :to="'/project/' + toSlug(project.name)"
                class="inline-flex items-center gap-1.5 text-xs font-black text-zinc-900 hover:text-sky-600 underline"
              >
                View Project Details <ExternalLink :size="12" />
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Experience -->
      <section class="space-y-6">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
          <Clock :size="24" class="text-rose-600" /> Work Experience
        </h2>

        <div class="space-y-4">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="bg-white border-3 border-zinc-900 rounded-[28px] p-6 shadow-[6px_6px_0px_0px_#18181b] space-y-2"
          >
            <div class="flex flex-col sm:flex-row justify-between text-xs font-bold text-zinc-500 gap-1">
              <span class="text-amber-700 bg-amber-100 px-2.5 py-0.5 border-2 border-zinc-900 rounded-lg inline-block w-fit shadow-[2px_2px_0px_0px_#18181b]">{{ job.period }}</span>
              <span>{{ job.duration }}</span>
            </div>
            
            <h3 class="text-base font-black text-zinc-900 pt-1">
              {{ job.title }} <span class="text-zinc-600 font-semibold">@ {{ job.company }}</span>
            </h3>
            
            <p class="text-xs text-zinc-700 leading-relaxed font-medium">
              {{ job.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Section: Skills -->
      <section class="space-y-6">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
          <Zap :size="24" class="text-amber-500" /> Skills & Mastery
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="bg-white border-3 border-zinc-900 rounded-2xl p-4 shadow-[4px_4px_0px_0px_#18181b] flex flex-col justify-between"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-black text-zinc-900">{{ skill.name }}</span>
              <span class="text-[10px] font-bold text-zinc-600">{{ skill.rating * 20 }}%</span>
            </div>
            <div class="w-full bg-zinc-100 h-2.5 rounded-full border-2 border-zinc-900 overflow-hidden">
              <div
                class="bg-amber-400 h-full rounded-full border-r-2 border-zinc-900"
                :style="{ width: `${skill.rating * 20}%` }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Contact Form -->
      <section class="space-y-6">
        <h2 class="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
          <Mail :size="24" class="text-emerald-600" /> Get in Touch
        </h2>

        <div class="bg-white border-3 border-zinc-900 rounded-[32px] p-8 shadow-[8px_8px_0px_0px_#18181b]">
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-zinc-700 mb-1.5">Your Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  class="w-full bg-amber-50/50 border-3 border-zinc-900 rounded-xl text-zinc-900 text-xs p-3 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b]"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-zinc-700 mb-1.5">Subject</label>
                <input
                  v-model="form.email"
                  type="text"
                  placeholder="Project Collaboration"
                  class="w-full bg-amber-50/50 border-3 border-zinc-900 rounded-xl text-zinc-900 text-xs p-3 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b]"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-zinc-700 mb-1.5">Message</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Tell me about your project..."
                class="w-full bg-amber-50/50 border-3 border-zinc-900 rounded-xl text-zinc-900 text-xs p-3 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b] resize-none"
              ></textarea>
            </div>

            <button
              @click="openGmail"
              class="w-full sm:w-auto bg-amber-300 hover:bg-amber-400 text-zinc-900 font-black text-xs px-8 py-3 rounded-xl border-3 border-zinc-900 shadow-[4px_4px_0px_0px_#18181b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#18181b] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail :size="16" /> Send Doodle Mail
            </button>
          </div>
        </div>
      </section>

      <footer class="text-center text-xs font-bold text-zinc-500 border-t-2 border-zinc-900 pt-8">
        Hand-crafted by Reinhard Esteban © {{ new Date().getFullYear() }}
      </footer>

    </div>
  </div>
</template>

<script setup>
import { 
  HelpCircle, 
  Sparkles, 
  User, 
  Rocket, 
  Clock, 
  Zap, 
  Mail, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-vue-next";

import MouseTail from "../MouseTail.vue";
import AnimatedNumber from "../AnimatedNumber.vue";

defineProps({
  personalDetails: Object,
  stats: Array,
  skills: Array,
  careerHistory: Array,
  form: Object,
  isShowPopup: Boolean,
  togglePopup: Function,
  openGmail: Function,
  toSlug: Function,
  years: Number,
});
</script>
