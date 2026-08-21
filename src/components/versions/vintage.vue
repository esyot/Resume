<template>
  <MouseTail />
  <div
    class="min-h-screen bg-[#f0eae1] text-[#2c241d] font-serif p-4 sm:p-8 md:p-16 selection:bg-[#2c241d] selection:text-[#f4eee1] overflow-x-hidden relative"
    style="background-image: radial-gradient(#d8ccbc 0.75px, transparent 0.75px); background-size: 16px 16px;"
  >
    <!-- SVG Grain / Scratch Noise Filter Definition -->
    <svg class="hidden">
      <filter id="paper-grunge">
        <feturbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <fecolormatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" />
      </filter>
    </svg>

    <!-- Vintage Broadsheet Frame with Crease and Fold Overlay -->
    <div class="max-w-[1200px] mx-auto w-full border-4 border-double border-[#2c241d] p-6 sm:p-10 md:p-14 bg-[#f9f5ec] shadow-[0_20px_50px_rgba(44,36,29,0.18)] relative overflow-hidden">
      
      <!-- CSS Paper Noise & Scratch Texture Overlay -->
      <div class="absolute inset-0 pointer-events-none z-30 opacity-70 mix-blend-multiply" style="filter: url(#paper-grunge);"></div>

      <!-- Vertical Center Paper Fold Crease Line -->
      <div class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none z-25 bg-gradient-to-r from-transparent via-[#2c241d]/15 to-transparent"></div>
      
      <!-- Horizontal Cross Crease Line -->
      <div class="absolute top-1/3 left-0 right-0 h-[1px] pointer-events-none z-25 bg-gradient-to-b from-transparent via-[#2c241d]/10 to-transparent"></div>

      <!-- Dog-eared Top Right Corner Shadow (Physical Crease Effect) -->
      <div class="absolute top-0 right-0 w-16 h-16 pointer-events-none z-25 bg-gradient-to-bl from-[#2c241d]/20 via-transparent to-transparent transform rotate-0"></div>

      <!-- Top Newspaper Banner -->
      <div class="flex justify-between items-center border-b-2 border-[#2c241d] pb-3 mb-8 text-xs tracking-[0.25em] uppercase font-mono relative z-10">
        <div>VOL. XXIV // NO. 04</div>
        <div class="text-center font-bold tracking-widest text-sm">THE ARCHITECTURAL GAZETTE</div>
        <div>MANILA, PHILIPPINES</div>
      </div>

      <!-- Main Feature Hero Header -->
      <header class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#2c241d] pb-10 mb-10 relative z-10">
        <div class="lg:col-span-8 space-y-4">
          <div class="font-mono text-xs tracking-widest text-[#7c6f5d] uppercase">
            § SPECIAL MONOGRAPH &bull; MASTER BUILDER PROFILE
          </div>
          <h1 class="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight uppercase leading-[0.9] font-serif underline decoration-1 underline-offset-8">
            {{ personalDetails.name }}
          </h1>
          <p class="text-xl sm:text-2xl font-light italic text-[#5a4d3f] max-w-xl">
            "{{ personalDetails.tagline }}"
          </p>
        </div>

        <div class="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full space-y-6">
          <!-- Vintage Photo Frame with Scratched / Aged Look -->
          <div class="w-32 h-40 sm:w-40 sm:h-48 border-4 border-[#2c241d] p-2 bg-[#f4eee1] shadow-[4px_4px_0px_#2c241d] relative">
            <div class="absolute inset-2 pointer-events-none z-10 bg-gradient-to-tr from-black/20 via-transparent to-white/10 mix-blend-overlay"></div>
            <img
              :src="'/assets/images/' + personalDetails.img"
              alt="Reinhard Esteban"
              class="w-full h-full object-cover filter sepia-[0.5] contrast-125 brightness-95 grayscale-[0.2]"
            />
          </div>
          <div class="text-left lg:text-right font-mono text-xs space-y-1">
            <div class="font-bold uppercase tracking-wider">{{ personalDetails.title }}</div>
            <div class="text-[#7c6f5d]">LICENSED &bull; EST. 2026</div>
          </div>
        </div>
      </header>

      <!-- Newspaper Quick Metrics Bar -->
      <div class="grid grid-cols-3 border-y-2 border-[#2c241d] py-5 mb-12 text-center font-mono bg-[#f4eee1]/50 relative z-10">
        <div v-for="stat in stats" :key="stat.label" class="border-r last:border-r-0 border-[#2c241d]/40 px-4">
          <div class="text-[10px] uppercase tracking-widest text-[#7c6f5d] mb-1">* {{ stat.label }} *</div>
          <div class="text-3xl md:text-4xl font-serif font-bold">
            <AnimatedNumber :value="stat.value" />{{ stat.suffix }}
          </div>
        </div>
      </div>

      <!-- Editorial Popup Modal -->
      <Teleport to="body">
        <div
          v-if="isShowPopup"
          class="fixed inset-0 bg-[#2c241d]/60 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4 font-serif"
        >
          <div class="bg-[#f9f5ec] border-4 border-[#2c241d] max-w-xl w-full p-8 shadow-[8px_8px_0px_#2c241d] space-y-6 relative">
            <div class="flex justify-between items-center border-b-2 border-[#2c241d] pb-4">
              <span class="font-mono text-xs tracking-widest uppercase font-bold">[ EDITORIAL MANUSCRIPT ]</span>
              <button @click="togglePopup" class="font-mono text-xs uppercase tracking-wider hover:text-[#7c6f5d] font-bold">[ CLOSE &times; ]</button>
            </div>
            
            <p class="text-lg leading-relaxed font-light italic text-[#3a3025]">
              "A full-stack artisan acts as both structural architect and master mason—bridging high-level visual drafting with deep programmatic engineering to construct immortal systems."
            </p>
            
            <div class="pt-4 border-t border-[#2c241d]/30 flex justify-end font-mono">
              <button @click="togglePopup" class="bg-[#2c241d] text-[#f4eee1] px-6 py-2 text-xs tracking-widest uppercase font-bold hover:bg-[#4a3d31]">
                Acknowledge Decree
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Section: Lead Article / About Me -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start relative z-10">
        <div class="lg:col-span-4 space-y-4 border-r-0 lg:border-r lg:border-[#2c241d]/30 lg:pr-8">
          <h2 class="text-3xl font-normal tracking-tight border-b border-[#2c241d] pb-2">
            The Philosophy
          </h2>
          <p class="font-mono text-xs text-[#7c6f5d] uppercase tracking-widest">
            Column by The Desk
          </p>
          <button
            @click="togglePopup"
            class="font-mono text-xs font-bold uppercase tracking-widest border border-[#2c241d] px-4 py-2 hover:bg-[#2c241d] hover:text-[#f4eee1] transition-colors mt-2 block w-full text-center shadow-[2px_2px_0px_#2c241d]"
          >
            Read Manuscript →
          </button>
        </div>

        <div class="lg:col-span-8 space-y-6 text-lg leading-relaxed font-light text-[#3a3025] columns-1 md:columns-2 gap-8 [column-rule:1px_solid_rgba(44,36,29,0.2)]">
          <p class="first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:font-serif">
            Operating across <strong class="font-normal text-[#2c241d]">{{ years }}+ years</strong> of dedicated practice, digital craft requires a meticulous balance of form and logic. Every application is treated as a published volume—clean typography, responsive layouts, and robust backend mechanics working in absolute harmony.
          </p>
          <p>
            Based in the Philippine islands, working globally to deliver precise software solutions across web, mobile, and specialized display interfaces.
          </p>
          
          <div class="flex flex-col gap-2 pt-4 font-mono text-xs uppercase tracking-widest break-inside-avoid">
            <a href="https://github.com/esyot" target="_blank" class="underline hover:text-[#7c6f5d]">&bull; GitHub Archive</a>
            <a href="https://www.linkedin.com/in/reinhard-esteban/" target="_blank" class="underline hover:text-[#7c6f5d]">&bull; LinkedIn Registry</a>
          </div>
        </div>
      </section>

      <!-- Section: Portfolio / Featured Works -->
      <section class="mb-16 space-y-8 relative z-10">
        <div class="border-b-2 border-[#2c241d] pb-3 flex justify-between items-end">
          <h2 class="text-3xl font-normal tracking-tight">Selected Exhibitions</h2>
          <span class="font-mono text-xs tracking-widest uppercase text-[#7c6f5d]">Portfolio Index</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(project, index) in projects"
            :key="project.name"
            class="border-2 border-[#2c241d] p-6 bg-[#f9f5ec] space-y-6 flex flex-col justify-between shadow-[4px_4px_0px_#2c241d] hover:translate-x-0.5 hover:translate-y-0.5 transition-all relative"
          >
            <div class="space-y-4">
              <div class="flex justify-between items-start font-mono text-xs text-[#7c6f5d]">
                <span class="tracking-widest uppercase font-bold">PLATE NO. 0{{ index + 1 }}</span>
                <span class="uppercase border border-[#2c241d] px-2 py-0.5 text-[10px] bg-[#f4eee1]">{{ project.status }}</span>
              </div>
              <h3 class="text-2xl font-normal tracking-tight">
                {{ project.name }}
              </h3>
              <p class="text-sm font-light text-[#5a4d3f] leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <div class="space-y-4 pt-4 border-t border-[#2c241d]/20">
              <div class="flex flex-wrap gap-1 font-mono text-[10px] tracking-wider uppercase text-[#7c6f5d]">
                <span v-for="tech in project.tech_stack" :key="tech" class="border border-[#2c241d]/40 px-2 py-0.5 bg-[#f4eee1]">
                  {{ tech }}
                </span>
              </div>

              <router-link
                :to="'/project/' + toSlug(project.name)"
                class="font-mono text-xs font-bold tracking-widest uppercase underline block hover:text-[#7c6f5d]"
              >
                Inspect Entry Blueprint →
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Career Timeline / Chronicles -->
      <section class="mb-16 space-y-8 relative z-10">
        <div class="border-b-2 border-[#2c241d] pb-3">
          <h2 class="text-3xl font-normal tracking-tight">Chronicles & Experience</h2>
        </div>

        <div class="space-y-6">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-[#2c241d]/30 pb-6 items-start"
          >
            <div class="md:col-span-3 font-mono text-xs text-[#7c6f5d] uppercase tracking-widest pt-1">
              <div>{{ job.period }}</div>
              <div class="text-[#2c241d] font-bold mt-1">&#9632; {{ job.duration }}</div>
            </div>
            
            <div class="md:col-span-9 space-y-2">
              <h3 class="text-xl font-normal">
                {{ job.title }} <span class="text-[#7c6f5d] font-light">— {{ job.company }}</span>
              </h3>
              <p class="text-sm font-light text-[#5a4d3f] leading-relaxed">
                {{ job.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Technical Proficiency / Index -->
      <section class="mb-16 space-y-8 relative z-10">
        <div class="border-b-2 border-[#2c241d] pb-3">
          <h2 class="text-3xl font-normal tracking-tight">Technical Ledger</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="border border-[#2c241d] p-5 bg-[#f9f5ec] space-y-3 shadow-[2px_2px_0px_#2c241d]"
          >
            <div class="flex justify-between items-center font-mono text-xs">
              <span class="font-bold tracking-wider uppercase">{{ skill.name }}</span>
              <span class="text-[#7c6f5d]">{{ skill.rating * 20 }}%</span>
            </div>
            <!-- Vintage segmented/hatched progress meter -->
            <div class="w-full bg-[#f4eee1] border border-[#2c241d] h-2 p-0.5">
              <div
                class="bg-[#2c241d] h-full"
                :style="{ width: `${skill.rating * 20}%` }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Dispatch / Contact -->
      <section class="mb-10 space-y-6 relative z-10">
        <div class="border-b-2 border-[#2c241d] pb-3">
          <h2 class="text-3xl font-normal tracking-tight">Dispatch a Telegram</h2>
        </div>

        <div class="border-2 border-[#2c241d] p-8 bg-[#f9f5ec] space-y-6 shadow-[4px_4px_0px_#2c241d]">
          <div class="space-y-4 font-mono">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs uppercase tracking-widest text-[#7c6f5d] mb-2">* Your Name / Publication</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="E.g., Lord Byron"
                  class="w-full border border-[#2c241d] bg-[#f4eee1] text-[#2c241d] text-xs p-3 outline-none focus:bg-white font-serif shadow-inner"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-widest text-[#7c6f5d] mb-2">* Subject / Inquiry</label>
                <input
                  v-model="form.email"
                  type="text"
                  placeholder="Commission Inquiry"
                  class="w-full border border-[#2c241d] bg-[#f4eee1] text-[#2c241d] text-xs p-3 outline-none focus:bg-white font-serif shadow-inner"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs uppercase tracking-widest text-[#7c6f5d] mb-2">* Message Body</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Inscribe your correspondence here..."
                class="w-full border border-[#2c241d] bg-[#f4eee1] text-[#2c241d] text-xs p-3 outline-none focus:bg-white font-serif resize-none shadow-inner"
              ></textarea>
            </div>

            <button
              @click="openGmail"
              class="bg-[#2c241d] text-[#f4eee1] font-bold text-xs uppercase tracking-widest px-8 py-3 hover:bg-[#4a3d31] transition-colors shadow-[3px_3px_0px_#7c6f5d]"
            >
              Transmit Telegram →
            </button>
          </div>
        </div>
      </section>

      <!-- Footer Colophon -->
      <footer class="border-t-2 border-[#2c241d] pt-6 flex flex-col sm:flex-row justify-between items-center font-mono text-xs tracking-widest uppercase text-[#7c6f5d] relative z-10">
        <div>COLOPHON &bull; ARCHIVAL TYPE & PRINT</div>
        <div class="text-[#2c241d] font-bold my-2 sm:my-0">REINHARD ESTEBAN &copy; {{ new Date().getFullYear() }}</div>
        <div>ALL RIGHTS RESERVED</div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import MouseTail from "../MouseTail.vue";
import AnimatedNumber from "../AnimatedNumber.vue";

defineProps({
  personalDetails: Object,
  stats: Array,
  skills: Array,
  careerHistory: Array,
  references: Array,
  projects: Array, 
  form: Object,
  isShowPopup: Boolean,
  togglePopup: Function,
  openGmail: Function,
  toSlug: Function,
  years: Number,
  statusColors: Object,
  handleCardTilt: Function,
  resetCardTilt: Function
});
</script>