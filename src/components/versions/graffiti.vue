<template>
  <MouseTail />
  <div
    class="min-h-screen bg-[#0d0d11] text-[#e2e8f0] font-sans relative overflow-x-hidden selection:bg-[#ff0055] selection:text-white p-4 sm:p-8"
  >
    <!-- Wall Texture & Paint Splatter Overlay -->
    <div
      class="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"
    ></div>
    
    <!-- Neon Glow Spots (Spray Paint Effect) -->
    <div
      class="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#ff0055]/20 blur-[130px] pointer-events-none"
    ></div>
    <div
      class="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#00f0ff]/20 blur-[130px] pointer-events-none"
    ></div>

    <div class="relative z-10 max-w-[1050px] mx-auto pb-20 space-y-16">
      
      <!-- Header / Main Wall Tag -->
      <header class="relative pt-12">
        <div class="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          
          <!-- Stencil Avatar with Sticker Effect -->
          <div class="relative group flex-shrink-0 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
            <div class="p-2 bg-white rounded-sm shadow-[8px_8px_0px_#ff0055] border-2 border-black">
              <img
                :src="'/assets/images/' + personalDetails.img"
                alt="Reinhard Esteban"
                class="w-40 h-40 object-cover grayscale contrast-200 border border-black"
              />
              <div class="mt-2 bg-black text-[#ccff00] text-[10px] font-black uppercase tracking-widest text-center py-1">
                STREET_TAG: ESYOT
              </div>
            </div>
          </div>

          <div class="flex-1 w-full">
            <div
              class="inline-block bg-[#ccff00] text-black font-black text-xs px-3 py-1 uppercase tracking-widest -rotate-1 shadow-[4px_4px_0px_#000] mb-4"
            >
              ★ AVAILABLE FOR HIRED WORK
            </div>
            
            <h1
              class="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-[4px_4px_0px_#ff0055]"
              style="font-family: 'Impact', sans-serif;"
            >
              {{ personalDetails.name }}
            </h1>
            
            <div class="flex items-center justify-center md:justify-start gap-3 my-3">
              <p class="text-2xl text-[#00f0ff] font-extrabold uppercase tracking-wide drop-shadow-[2px_2px_0px_#000]">
                // {{ personalDetails.title }}
              </p>
              <button
                @click="togglePopup"
                class="bg-[#ff0055] text-white p-1.5 rounded-none border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <HelpCircle :size="16" />
              </button>
            </div>

            <p class="text-lg text-gray-300 italic max-w-[550px] leading-relaxed border-l-4 border-[#ccff00] pl-4 my-4">
              "{{ personalDetails.tagline }}"
            </p>

            <!-- Stats Spray-Painted Counters -->
            <div class="grid grid-cols-3 gap-4 pt-4 max-w-[500px]">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="bg-black/60 border-2 border-[#00f0ff] p-3 shadow-[4px_4px_0px_#00f0ff]"
              >
                <span class="text-3xl font-black text-[#ccff00]">
                  <AnimatedNumber :value="stat.value" />{{ stat.suffix }}
                </span>
                <span class="block text-[10px] uppercase font-bold text-white tracking-widest mt-1">
                  {{ stat.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Wildstyle Info Modal -->
      <Teleport to="body">
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isShowPopup"
            class="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[100] p-6"
            @click.self="togglePopup"
          >
            <div
              class="bg-[#121216] border-4 border-[#ff0055] p-8 max-w-[500px] w-full shadow-[12px_12px_0px_#ccff00] relative"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 bg-[#ff0055] text-black">
                  <HelpCircle :size="24" />
                </div>
                <h3 class="text-2xl font-black text-white uppercase tracking-tight">
                  FULL STACK DEFINITION
                </h3>
              </div>
              <p class="text-gray-300 leading-relaxed mb-6 font-medium">
                A full-stack developer bridges the gap between what users see and what powers it behind the scenes. From crafting interfaces with frameworks like Vue or React, to engineering server logic with PHP, Laravel, or Node.js.
              </p>
              <button
                @click="togglePopup"
                class="w-full py-3 bg-[#ccff00] text-black font-black text-lg uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-white transition-all"
              >
                GOT IT
              </button>
            </div>
          </div>
        </transition>
      </Teleport>

      <!-- Section 01: About Wall -->
      <section class="space-y-6">
        <div class="inline-block bg-[#ff0055] text-black font-black text-xs px-3 py-1 uppercase tracking-widest rotate-1">
          01 // THE MANIFESTO
        </div>
        <h2 class="text-4xl font-black text-white uppercase tracking-tight drop-shadow-[3px_3px_0px_#00f0ff]">
          BACKGROUND & VIBES
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div class="space-y-4 text-gray-300 text-lg leading-relaxed bg-black/40 p-6 border-2 border-white/10">
            <p>
              I’m a software developer with 
              <strong class="text-[#ccff00] font-black text-xl">{{ years }}+ years</strong>
              of hands-on grind turning complex tech puzzles into clean, high-performance web, mobile, and desktop apps.
            </p>
            <p>
              I build architectures built to scale. From modernizing legacy setups to crafting smooth visual flows, I ship reliable code that helps projects make noise.
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <a
                href="https://github.com/esyot"
                target="_blank"
                class="bg-white text-black font-black text-xs px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#ff0055] hover:bg-[#ff0055] hover:text-white transition-all"
              >
                GITHUB Profile
              </a>
              <a
                href="https://www.linkedin.com/in/reinhard-esteban/"
                target="_blank"
                class="bg-white text-black font-black text-xs px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all"
              >
                LINKEDIN Profile
              </a>
            </div>
          </div>

          <!-- Poster Card -->
          <div class="bg-[#18181c] border-2 border-[#ccff00] p-6 shadow-[8px_8px_0px_#ff0055] rotate-[1deg]">
            <div class="space-y-4 font-bold text-sm">
              <div
                v-for="(val, key) in {
                  'Location': 'Philippines 🇵🇭',
                  'Core Focus': 'Web & Mobile Apps',
                  'Experience': years + '+ Years',
                  'Main Stack': 'PHP · JS · Node · Python',
                }"
                :key="key"
                class="flex justify-between border-b border-white/10 pb-2"
              >
                <span class="text-gray-400 uppercase text-xs">{{ key }}:</span>
                <span class="text-[#00f0ff]">{{ val }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 02: Shipped Works -->
      <section class="space-y-6">
        <div class="inline-block bg-[#00f0ff] text-black font-black text-xs px-3 py-1 uppercase tracking-widest -rotate-1">
          02 // SPRAY & WORK
        </div>
        <h2 class="text-4xl font-black text-white uppercase tracking-tight drop-shadow-[3px_3px_0px_#ff0055]">
          PROJECTS SHIPPED
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="project in projects"
            :key="project.name"
            class="bg-black/80 border-2 border-white/20 p-6 flex flex-col justify-between hover:border-[#ccff00] transition-all shadow-[6px_6px_0px_#121212] hover:shadow-[6px_6px_0px_#ccff00]"
          >
            <div>
              <div class="flex justify-between items-start mb-4">
                <Box class="text-[#ff0055]" :size="28" />
                <span class="text-[10px] font-black px-2 py-0.5 bg-[#ccff00] text-black uppercase">
                  {{ project.status }}
                </span>
              </div>
              <h3 class="text-2xl font-black text-white uppercase mb-2">
                {{ project.name }}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-6 italic">
                "{{ project.description }}"
              </p>
            </div>

            <div>
              <div class="flex flex-wrap gap-1.5 mb-6">
                <span
                  v-for="tech in project.tech_stack"
                  :key="tech"
                  class="text-[10px] font-bold px-2 py-0.5 bg-white/10 text-gray-300 border border-white/10"
                >
                  {{ tech }}
                </span>
              </div>
              <router-link
                :to="'/project/' + toSlug(project.name)"
                class="inline-flex items-center gap-2 text-xs font-black text-[#00f0ff] hover:text-[#ff0055] uppercase tracking-wider"
              >
                CHECK IT OUT <ArrowRight :size="14" />
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 03: History & Timeline -->
      <section class="space-y-6">
        <div class="inline-block bg-[#ccff00] text-black font-black text-xs px-3 py-1 uppercase tracking-widest rotate-1">
          03 // THE TRACK RECORD
        </div>
        <h2 class="text-4xl font-black text-white uppercase tracking-tight drop-shadow-[3px_3px_0px_#00f0ff]">
          CAREER HISTORY
        </h2>

        <div class="space-y-4">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="bg-[#121216] border-l-8 border-[#ff0055] p-6 border-y-2 border-r-2 border-y-white/10 border-r-white/10"
          >
            <div class="flex flex-col md:flex-row justify-between mb-2">
              <h3 class="text-xl font-black text-white uppercase">
                {{ job.title }} <span class="text-[#00f0ff]">@ {{ job.company }}</span>
              </h3>
              <span class="text-xs font-bold text-[#ccff00] uppercase">{{ job.period }} ({{ job.duration }})</span>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
              {{ job.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Section 04: Arsenal (Skills) -->
      <section class="space-y-6">
        <div class="inline-block bg-[#ff0055] text-black font-black text-xs px-3 py-1 uppercase tracking-widest -rotate-1">
          04 // CAN & NOZZLES
        </div>
        <h2 class="text-4xl font-black text-white uppercase tracking-tight drop-shadow-[3px_3px_0px_#ccff00]">
          SKILLS & TOOLS
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="bg-black/60 border border-white/20 p-4 text-center hover:border-[#00f0ff] transition-all"
          >
            <p class="font-black text-white text-sm uppercase mb-2">{{ skill.name }}</p>
            <div class="flex justify-center gap-1 text-[#ff0055]">
              <span v-for="i in 5" :key="i" :class="i <= skill.rating ? 'opacity-100' : 'opacity-20'">★</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 05: Contact / Get in Touch -->
      <section class="space-y-6">
        <div class="inline-block bg-[#00f0ff] text-black font-black text-xs px-3 py-1 uppercase tracking-widest rotate-1">
          05 // DROP A TAG
        </div>
        <h2 class="text-4xl font-black text-white uppercase tracking-tight drop-shadow-[3px_3px_0px_#ff0055]">
          GET IN TOUCH
        </h2>

        <div class="bg-[#121216] border-4 border-black p-8 shadow-[10px_10px_0px_#ccff00]">
          <div class="space-y-4 max-w-[600px]">
            <div>
              <label class="block text-xs font-black uppercase text-[#00f0ff] mb-1">YOUR NAME</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full bg-black border-2 border-white/20 p-3 text-white font-bold outline-none focus:border-[#ff0055]"
              />
            </div>
            <div>
              <label class="block text-xs font-black uppercase text-[#00f0ff] mb-1">SUBJECT</label>
              <input
                v-model="form.email"
                type="text"
                class="w-full bg-black border-2 border-white/20 p-3 text-white font-bold outline-none focus:border-[#ff0055]"
              />
            </div>
            <div>
              <label class="block text-xs font-black uppercase text-[#00f0ff] mb-1">MESSAGE</label>
              <textarea
                v-model="form.message"
                rows="4"
                class="w-full bg-black border-2 border-white/20 p-3 text-white font-bold outline-none focus:border-[#ff0055]"
              ></textarea>
            </div>
            <button
              @click="openGmail"
              class="w-full py-4 bg-[#ff0055] text-white font-black text-lg uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#ccff00] hover:text-black transition-all flex items-center justify-center gap-2"
            >
              SEND MESSAGE <Send :size="18" />
            </button>
          </div>
        </div>
      </section>

      <footer class="pt-10 border-t-2 border-white/10 text-center font-bold text-xs text-gray-500 uppercase tracking-widest">
        DESIGNED & TAGGED BY REINHARD ESTEBAN © {{ new Date().getFullYear() }}
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
  form: Object,
  isShowPopup: Boolean,
  togglePopup: Function,
  openGmail: Function,
  toSlug: Function,
  years: Number,
});
</script>
