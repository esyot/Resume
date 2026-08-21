<template>
  <MouseTail />
  <div
    class="min-h-screen bg-[#030712] text-cyan-400 font-mono p-4 sm:p-8 md:p-12 selection:bg-cyan-500 selection:text-black overflow-x-hidden relative"
  >
    <div
      class="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#00f0ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0d_1px,transparent_1px)] bg-[size:32px_32px] z-0"
    ></div>

    <div class="fixed -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed -bottom-40 -right-40 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-[1100px] mx-auto w-full relative z-10 space-y-12">
      
      <div class="flex justify-between items-center border-b border-cyan-500/30 pb-2 text-[10px] sm:text-xs text-cyan-500/70 tracking-widest uppercase">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-cyan-400 animate-ping rounded-full"></span>
          <span>SYS_STATUS // NOMINAL</span>
        </div>
        <div class="hidden sm:block">ORBITAL_ID: 0x8849-ESTEBAN</div>
        <div>SEC_LEVEL: ALPHA-9</div>
      </div>

      <header class="relative border border-cyan-500/40 bg-slate-950/80 p-6 md:p-8 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.15)] [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))]">
        <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
        <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>

        <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div class="relative group flex-shrink-0">
            <div class="w-36 h-36 p-1 border-2 border-cyan-400/80 relative [clip-path:polygon(10%_0,100%_0,100%_90%,90%_100%,0_100%,0_10%)]">
              <img
                :src="'/assets/images/' + personalDetails.img"
                alt="Reinhard Esteban"
                class="w-full h-full object-cover filter contrast-125 saturate-150 border border-cyan-500/50"
              />
              <div class="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"></div>
            </div>
            <div class="absolute -bottom-2 -right-2 bg-fuchsia-600 text-black font-bold text-[9px] px-2 py-0.5 tracking-tighter">
              OPERATIVE
            </div>
          </div>

          <div class="flex-1 text-center md:text-left space-y-3">
            <div>
              <div class="text-xs text-fuchsia-400 font-bold tracking-widest uppercase mb-1">
                // NEURAL_INTERFACE_ID
              </div>
              <h1 class="text-3xl md:text-5xl font-black text-white tracking-wider uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                {{ personalDetails.name }}
              </h1>
              <p class="text-cyan-300 font-semibold text-lg tracking-wide mt-1">
                {{ personalDetails.title }}
              </p>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {{ personalDetails.tagline }}
            </p>

            <div class="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                @click="togglePopup"
                class="border border-cyan-400 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-400 hover:text-black font-bold px-4 py-2 text-xs tracking-wider transition-all duration-200 flex items-center gap-2 [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]"
              >
                <HelpCircle :size="14" /> INITIALIZE_DIAGNOSTIC
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-3 gap-4 border-t border-cyan-500/20 pt-6">
          <div v-for="stat in stats" :key="stat.label" class="text-center md:text-left">
            <div class="text-[10px] text-fuchsia-400 tracking-widest uppercase">{{ stat.label }}</div>
            <div class="text-2xl md:text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]">
              <AnimatedNumber :value="stat.value" />{{ stat.suffix }}
            </div>
          </div>
        </div>
      </header>

      <Teleport to="body">
        <div
          v-if="isShowPopup"
          class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-mono text-sm"
        >
          <div class="border-2 border-fuchsia-500 bg-slate-950 w-full max-w-2xl p-6 relative shadow-[0_0_40px_rgba(255,0,127,0.3)] [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]">
            <div class="flex justify-between items-center border-b border-fuchsia-500/40 pb-3 mb-4">
              <span class="text-fuchsia-400 font-bold tracking-widest text-xs">// DATA_BUFFER_DECODE</span>
              <button @click="togglePopup" class="text-gray-400 hover:text-white font-bold text-xs">[ CLOSE_X ]</button>
            </div>
            
            <p class="text-slate-200 leading-relaxed space-y-4">
              A full-stack developer bridges the gap between client-side holographic visuals and backend core engines. Modernizing legacy systems, engineering high-speed real-time data pipelines, and architecting robust software matrices.
            </p>
            
            <div class="mt-6 pt-4 border-t border-fuchsia-500/20 flex justify-end">
              <button @click="togglePopup" class="bg-fuchsia-600 hover:bg-fuchsia-500 text-black font-bold px-4 py-2 text-xs tracking-wider">
                ACKNOWLEDGE
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <section class="border-l-2 border-cyan-400 pl-6 space-y-4 relative">
        <div class="flex items-center gap-2 text-xs text-fuchsia-400 font-bold tracking-widest uppercase">
          <span class="w-1.5 h-1.5 bg-fuchsia-400"></span> CORE_MANIFEST
        </div>
        <h2 class="text-2xl font-bold text-white tracking-wide uppercase">Operational Overview</h2>
        
        <div class="text-slate-300 leading-relaxed max-w-3xl space-y-3">
          <p>
            Operating with <span class="text-cyan-300 font-bold">{{ years }}+ operational cycles</span> engineering scalable web, mobile, and desktop systems. Specialized in modular code design, real-time data handling, and optimized frontend user interfaces.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
          <div class="bg-cyan-950/30 border border-cyan-500/30 p-3">
            <span class="text-fuchsia-400 block mb-1">ORIGIN_NODE</span>
            <span class="text-white font-semibold">Philippines 🇵🇭</span>
          </div>
          <div class="bg-cyan-950/30 border border-cyan-500/30 p-3">
            <span class="text-fuchsia-400 block mb-1">PRIMARY_FOCUS</span>
            <span class="text-white font-semibold">Web & Mobile HUDs</span>
          </div>
          <div class="bg-cyan-950/30 border border-cyan-500/30 p-3">
            <span class="text-fuchsia-400 block mb-1">TECH_CORE</span>
            <span class="text-white font-semibold">PHP · JS · Node · Python</span>
          </div>
          <div class="bg-cyan-950/30 border border-cyan-500/30 p-3 flex items-center justify-around">
            <a href="https://github.com/esyot" target="_blank" class="text-cyan-400 hover:text-fuchsia-400 font-bold">[ GITHUB ]</a>
            <a href="https://www.linkedin.com/in/reinhard-esteban/" target="_blank" class="text-cyan-400 hover:text-fuchsia-400 font-bold">[ LINKEDIN ]</a>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="flex items-center gap-2 text-xs text-fuchsia-400 font-bold tracking-widest uppercase">
          <span class="w-1.5 h-1.5 bg-fuchsia-400"></span> DEPLOYED_MODULES
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="project in projects"
            :key="project.name"
            class="bg-slate-950/60 border border-cyan-500/30 p-6 relative hover:border-cyan-400 transition-all duration-300 group [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]"
          >
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {{ project.name }}
              </h3>
              <span class="text-[10px] px-2 py-0.5 border border-cyan-500/50 text-cyan-300 uppercase font-semibold">
                {{ project.status }}
              </span>
            </div>

            <p class="text-slate-400 text-xs mb-4 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-1.5 mb-6">
              <span
                v-for="tech in project.tech_stack"
                :key="tech"
                class="text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 px-2 py-0.5"
              >
                {{ tech }}
              </span>
            </div>

            <router-link
              :to="'/project/' + toSlug(project.name)"
              class="inline-flex items-center gap-2 text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 tracking-wider uppercase"
            >
              ACCESS_DATA_STREAM →
            </router-link>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="flex items-center gap-2 text-xs text-fuchsia-400 font-bold tracking-widest uppercase">
          <span class="w-1.5 h-1.5 bg-fuchsia-400"></span> CAREER_LOGS
        </div>

        <div class="space-y-4">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="border-l-2 border-fuchsia-500/60 bg-slate-950/40 p-4 pl-6 relative hover:bg-slate-900/40 transition-colors"
          >
            <div class="flex flex-col sm:flex-row justify-between sm:items-center text-xs text-slate-400 mb-2 gap-1">
              <span class="text-cyan-400 font-bold uppercase">CYCLE: {{ job.period }}</span>
              <span class="text-fuchsia-400">{{ job.duration }}</span>
            </div>
            
            <h4 class="text-base font-bold text-white mb-1">
              {{ job.title }} <span class="text-slate-400 font-normal">@ {{ job.company }}</span>
            </h4>
            
            <p class="text-xs text-slate-300 leading-relaxed">
              {{ job.description }}
            </p>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="flex items-center gap-2 text-xs text-fuchsia-400 font-bold tracking-widest uppercase">
          <span class="w-1.5 h-1.5 bg-fuchsia-400"></span> CORE_CAPABILITIES
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="border border-cyan-500/20 bg-slate-950/40 p-3 flex flex-col justify-between"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-white">{{ skill.name }}</span>
              <span class="text-[10px] text-cyan-400 font-bold">{{ skill.rating * 20 }}%</span>
            </div>
            <div class="w-full bg-slate-900 h-1.5 border border-cyan-500/30 overflow-hidden">
              <div
                class="bg-gradient-to-r from-cyan-500 to-fuchsia-500 h-full"
                :style="{ width: `${skill.rating * 20}%` }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="flex items-center gap-2 text-xs text-fuchsia-400 font-bold tracking-widest uppercase">
          <span class="w-1.5 h-1.5 bg-fuchsia-400"></span> TRANSMIT_SIGNAL
        </div>

        <div class="border border-cyan-500/40 bg-slate-950/80 p-6 relative [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]">
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-cyan-400 uppercase mb-1">TRANSMITTER_NAME</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="IDENTIFIER..."
                  class="w-full bg-slate-900 border border-cyan-500/30 text-white text-xs p-2.5 outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label class="block text-xs text-cyan-400 uppercase mb-1">TRANSMISSION_SUBJECT</label>
                <input
                  v-model="form.email"
                  type="text"
                  placeholder="SUBJECT..."
                  class="w-full bg-slate-900 border border-cyan-500/30 text-white text-xs p-2.5 outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs text-cyan-400 uppercase mb-1">ENCODED_PAYLOAD</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="TYPE TRANSMISSION HERE..."
                class="w-full bg-slate-900 border border-cyan-500/30 text-white text-xs p-2.5 outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <button
              @click="openGmail"
              class="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-black font-extrabold text-xs px-8 py-3 tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              BROADCAST_PAYLOAD
            </button>
          </div>
        </div>
      </section>

      <footer class="text-center text-xs text-slate-500 border-t border-cyan-500/20 pt-6">
        SYS_VER: 2026.8.21 // OPERATIONAL FRAMEWORK // REINHARD ESTEBAN
      </footer>

    </div>
  </div>
</template>

<script setup>

import { 
  HelpCircle, 
} from "lucide-vue-next";

import MouseTail from "../MouseTail.vue";
import AnimatedNumber from "../AnimatedNumber.vue";


defineProps({
  personalDetails: Object,
  stats: Array,
  skills: Array,
  careerHistory: Array,
  references: Array,
  form: Object,
  isShowPopup: Boolean,
  togglePopup: Function,
  openGmail: Function,
  toSlug: Function,
  years: Number,
  statusColors: Object,
  handleCardTilt: Function,
  resetCardTilt: Function
})
</script>