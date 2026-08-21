<template>
  <MouseTail />
  <div
    class="min-h-screen bg-[#050505] text-[#4af626] font-mono p-2 sm:p-6 md:p-10 selection:bg-[#4af626] selection:text-black overflow-x-hidden text-sm md:text-base"
    style="text-shadow: 0 0 2px rgba(74, 246, 38, 0.4);"
  >
    <!-- CRT Scanline Overlay -->
    <div
      class="fixed inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 opacity-50"
    ></div>

    <div class="max-w-[1000px] mx-auto w-full relative z-10">
      
      <!-- Fake Terminal Window Header -->
      <div class="border border-[#4af626]/30 bg-[#0a0a0a] mb-6 hidden md:block">
        <div class="border-b border-[#4af626]/30 px-4 py-1 text-xs text-center text-[#4af626]/60 flex items-center justify-between">
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
            <span class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
          </div>
          <span>esyot@Reinhards-MacBook-Pro: ~ — -bash — 100x35</span>
          <div class="w-10"></div>
        </div>
      </div>

      <header class="mb-12">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ whoami --profile
        </div>
        
        <div class="flex flex-col md:flex-row gap-8 items-start pl-0 md:pl-4">
          <!-- Terminal Filtered Avatar -->
          <div class="relative border-2 border-[#4af626] p-1 flex-shrink-0">
            <img
              :src="'/assets/images/' + personalDetails.img"
              alt="Reinhard Esteban"
              class="w-32 h-32 object-cover grayscale sepia-[1] hue-rotate-[70deg] saturate-[3] contrast-[1.5] brightness-[0.8]"
            />
            <div class="absolute top-0 right-0 bg-[#4af626] text-black text-[10px] px-1 font-bold">RAW</div>
          </div>
          
          <div class="flex-1 w-full space-y-2 text-gray-300">
            <div>
              <span class="text-[#4af626]">NAME="</span>{{ personalDetails.name }}<span class="text-[#4af626]">"</span>
            </div>
            <div>
              <span class="text-[#4af626]">ROLE="</span>{{ personalDetails.title }}<span class="text-[#4af626]">"</span>
            </div>
            <div>
              <span class="text-[#4af626]">STATUS="</span><span class="text-green-300 animate-pulse">[ONLINE]</span> Available for opportunities<span class="text-[#4af626]">"</span>
            </div>
            <div class="pt-2">
              <span class="text-[#4af626]">BIO="</span>{{ personalDetails.tagline }}<span class="text-[#4af626]">"</span>
            </div>
            
            <div class="pt-4 flex gap-4">
              <button
                @click="togglePopup"
                class="border border-[#4af626] px-3 py-1 text-xs hover:bg-[#4af626] hover:text-black transition-none focus:outline-none flex items-center gap-2"
              >
                <HelpCircle :size="12" /> ./define_fullstack.sh
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-4 pl-0 md:pl-4 max-w-[600px]">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col border border-[#4af626]/30 p-2"
          >
            <span class="text-[#4af626] text-xs uppercase">{{ stat.label }}</span>
            <span class="text-xl md:text-2xl font-bold text-white">
              <AnimatedNumber :value="stat.value" />{{ stat.suffix }}
            </span>
          </div>
        </div>
      </header>

      <!-- Nano-style Popup -->
      <Teleport to="body">
        <div
          v-if="isShowPopup"
          class="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 font-mono text-sm md:text-base selection:bg-[#4af626] selection:text-black"
          style="text-shadow: 0 0 2px rgba(74, 246, 38, 0.4);"
        >
          <!-- CRT Overlay inside popup -->
          <div class="fixed inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-50 z-0"></div>
          
          <div class="border-2 border-[#4af626] bg-[#050505] w-full max-w-[700px] flex flex-col relative z-10 shadow-[0_0_20px_rgba(74,246,38,0.2)]">
            <!-- Nano Header -->
            <div class="bg-[#4af626] text-black px-4 py-1 flex justify-between font-bold text-xs uppercase tracking-wider">
              <span>GNU nano 7.2</span>
              <span>/var/definitions/fullstack.txt</span>
              <span>Modified</span>
            </div>
            
            <!-- Content -->
            <div class="p-6 text-gray-300 min-h-[250px] leading-relaxed whitespace-pre-wrap">
A full-stack developer bridges the gap between what users see and what powers it behind the scenes. 

From crafting pixel-perfect interfaces with frameworks like Vue or React, to engineering robust server-side logic and databases with PHP, Laravel, or Node.js.

<span class="animate-pulse bg-[#4af626] w-2 h-4 inline-block align-middle"></span>
            </div>
            
            <!-- Nano Footer Controls -->
            <div class="bg-[#4af626]/20 px-4 py-2 border-t border-[#4af626]/30 text-xs flex flex-wrap gap-x-6 gap-y-2">
              <button @click="togglePopup" class="text-gray-300 hover:text-[#4af626] focus:outline-none flex gap-1">
                <span class="bg-[#4af626] text-black px-1 font-bold">^X</span> Exit
              </button>
              <div class="text-gray-400 flex gap-1"><span class="bg-gray-600 text-black px-1">^O</span> Write Out</div>
              <div class="text-gray-400 flex gap-1"><span class="bg-gray-600 text-black px-1">^W</span> Where Is</div>
              <div class="text-gray-400 flex gap-1"><span class="bg-gray-600 text-black px-1">^K</span> Cut Text</div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Section: About -->
      <section class="mb-12">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ cat ~/about.txt
        </div>
        <div class="pl-0 md:pl-4 text-gray-300 leading-relaxed max-w-[800px] space-y-4">
          <p>
            I’m a software developer with <span class="text-white font-bold">{{ years }}+ years</span> of experience turning tricky technical puzzles into smooth, performant user experiences across web, mobile, and desktop.
          </p>
          <p>
            Beyond writing clean code, I enjoy designing thoughtful architectures that grow alongside your product. Whether it's fine-tuning real-time data flows or modernizing legacy setups, my goal is simple: ship reliable software that genuinely helps your business thrive.
          </p>
          
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm border border-[#4af626]/20 p-4 w-fit">
            <div class="flex gap-4"><span class="text-[#4af626]">LOCATION:</span> <span>Philippines 🇵🇭</span></div>
            <div class="flex gap-4"><span class="text-[#4af626]">FOCUS:</span> <span>Web & Mobile Apps</span></div>
            <div class="flex gap-4"><span class="text-[#4af626]">STACK:</span> <span>PHP · JS · Node · Python</span></div>
            <div class="flex gap-4 text-blue-400">
              <a href="https://github.com/esyot" target="_blank" class="hover:underline hover:text-[#4af626]">[ GitHub ]</a>
              <a href="https://www.linkedin.com/in/reinhard-esteban/" target="_blank" class="hover:underline hover:text-[#4af626]">[ LinkedIn ]</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Projects -->
      <section class="mb-12">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~/projects</span>$ ls -la
        </div>
        <div class="pl-0 md:pl-4 font-mono text-sm overflow-x-auto">
          <div class="text-gray-400 mb-2">total 4096</div>
          <div class="flex gap-4 mb-2 border-b border-[#4af626]/20 text-[#4af626]/70 pb-1 min-w-[600px]">
            <div class="w-24">PERMISSIONS</div>
            <div class="w-16">OWNER</div>
            <div class="w-24">SIZE</div>
            <div class="w-48">LAST MODIFIED</div>
            <div class="flex-1">NAME/EXECUTE</div>
          </div>
          
          <div
            v-for="(project, idx) in projects"
            :key="project.name"
            class="group mb-4 min-w-[600px]"
          >
            <div class="flex gap-4 text-gray-300 group-hover:text-white transition-none">
              <div class="w-24 text-blue-400">-rwxr-xr-x</div>
              <div class="w-16">esyot</div>
              <div class="w-24">{{ (Math.random() * 900 + 100).toFixed(0) }}KB</div>
              <div class="w-48 text-yellow-400/80">Aug {{ (idx * 2 + 1).toString().padStart(2, '0') }} 2026 14:0{{ idx }}</div>
              <div class="flex-1">
                <router-link
                  :to="'/project/' + toSlug(project.name)"
                  class="font-bold text-[#4af626] hover:bg-[#4af626] hover:text-black px-1 transition-none"
                >
                  ./{{ toSlug(project.name) }}.sh
                </router-link>
              </div>
            </div>
            
            <div class="pl-4 mt-2 border-l-2 border-[#4af626]/30 text-gray-400 text-xs ml-4">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[#4af626]">STATUS:</span> 
                <span :class="['px-1 text-black font-bold', statusColors[project.statusColor].bg]">{{ project.status }}</span>
              </div>
              <div><span class="text-[#4af626]">DESC:</span> {{ project.description }}</div>
              <div><span class="text-[#4af626]">DEPS:</span> [ {{ project.tech_stack.join(', ') }} ]</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Career History -->
      <section class="mb-12">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ tail -n 10 /var/log/career_history.log
        </div>
        <div class="pl-0 md:pl-4 space-y-2 text-sm text-gray-300">
          <div
            v-for="(job, idx) in careerHistory"
            :key="idx"
            class="border-l-2 border-blue-500/50 pl-4 py-2 hover:bg-white/5 transition-none group"
          >
            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 font-bold mb-1">
              <span class="text-gray-500 font-normal">[{{ job.period }}]</span>
              <span class="text-yellow-400">[JOB]</span>
              <span class="text-blue-300">
                <a v-if="job.link" :href="job.link" target="_blank" class="hover:underline">@{{ job.company }}</a>
                <span v-else>@{{ job.company }}</span>
              </span>
              <span class="text-white">{{ job.title }}</span>
            </div>
            <div class="text-xs text-[#4af626] mb-2">Duration: {{ job.duration }} | Type: {{ job.employment_type }}</div>
            <p class="text-gray-400 group-hover:text-gray-200 break-words leading-relaxed">
              > {{ job.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Section: Education -->
      <section class="mb-12">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ sudo make education
        </div>
        <div class="pl-0 md:pl-4 space-y-4">
          <div
            v-for="(edu, idx) in [
              { school: 'JAPeR Memorial High School', desc: 'ICT Track — Foundation in IT', active: false },
              { school: 'San Agustin National High School', desc: 'NC III — Programming & Animation', active: false },
              { school: 'Mater Dei College', desc: 'Bachelor of Science in Information Technology', active: true, tag: 'BSIT Graduate' }
            ]"
            :key="idx"
            class="flex items-start gap-4"
          >
            <div class="mt-1 font-bold text-lg">
              <span v-if="edu.active" class="text-green-500">[*]</span>
              <span v-else class="text-gray-600">[ ]</span>
            </div>
            <div>
              <div :class="['font-bold text-base', edu.active ? 'text-white' : 'text-gray-400']">{{ edu.school }}</div>
              <div class="text-gray-500 text-sm">-- {{ edu.desc }}</div>
              <div v-if="edu.tag" class="mt-1 text-xs text-black bg-[#4af626] px-2 py-0.5 inline-block font-bold">{{ edu.tag }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Expertise (Skills) -->
      <section class="mb-12">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ htop --filter="skills"
        </div>
        <div class="pl-0 md:pl-4 text-sm font-mono">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8">
            <div v-for="skill in skills" :key="skill.name" class="flex items-center justify-between group">
              <div class="flex items-center gap-3">
                <component :is="skill.icon" class="text-gray-500 w-4 h-4" />
                <span class="text-white group-hover:text-[#4af626]">{{ skill.name.padEnd(12, ' ') }}</span>
              </div>
              <div class="text-[#4af626] tracking-widest text-[10px]">
                <span v-for="i in 5" :key="i">
                  <span v-if="i <= skill.rating">█</span>
                  <span v-else class="text-gray-800">▒</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: References -->
      <section class="mb-12">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ ping -c 4 authorized_keys
        </div>
        <div class="pl-0 md:pl-4 font-mono text-sm">
          <div v-for="(ref, index) in references" :key="index" class="mb-4 text-gray-300">
            <div><span class="text-blue-400">Reply from</span> <span class="text-white font-bold">{{ ref.name }}</span> <span class="text-gray-500">({{ ref.role }})</span></div>
            <div class="pl-4 text-xs text-gray-400 border-l border-gray-700 mt-1">
              bytes=32 time&lt;1ms TTL=119
              <br>
              <span class="text-[#4af626]">contact: </span>
              <a :href="`mailto:${ref.email}`" class="text-blue-400 hover:bg-blue-400 hover:text-black px-1 transition-none">{{ ref.email }}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Contact Form -->
      <section class="mb-20">
        <div class="mb-4">
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ mail -s "Project Inquiry" rei.nhard3367@gmail.com
        </div>
        
        <div class="pl-0 md:pl-4">
          <div class="border border-[#4af626]/50 bg-black p-4 md:p-6 shadow-[0_0_15px_rgba(74,246,38,0.05)]">
            <div class="text-gray-500 mb-6 text-xs">// Enter payload details. Executing will generate a draft via default mail client.</div>
            
            <div class="space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center">
                <label class="text-[#4af626] w-24 mb-1 sm:mb-0">From_Name:</label>
                <div class="flex-1 flex items-center bg-transparent border-b border-[#4af626]/30 focus-within:border-[#4af626]">
                  <span class="text-gray-500 mr-2">"</span>
                  <input
                    v-model="form.name"
                    type="text"
                    class="w-full bg-transparent text-white outline-none font-mono text-sm py-1 placeholder:text-gray-700"
                    placeholder="Enter your string..."
                  />
                  <span class="text-gray-500 ml-2">"</span>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center">
                <label class="text-[#4af626] w-24 mb-1 sm:mb-0">Subject:</label>
                <div class="flex-1 flex items-center bg-transparent border-b border-[#4af626]/30 focus-within:border-[#4af626]">
                  <span class="text-gray-500 mr-2">"</span>
                  <input
                    v-model="form.email"
                    type="text"
                    class="w-full bg-transparent text-white outline-none font-mono text-sm py-1 placeholder:text-gray-700"
                    placeholder="Enter your string..."
                  />
                  <span class="text-gray-500 ml-2">"</span>
                </div>
              </div>

              <div class="flex flex-col">
                <label class="text-[#4af626] mb-2">Message_Body: &lt;&lt;EOF</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  class="w-full bg-[#0a0a0a] border border-[#4af626]/30 text-white outline-none font-mono text-sm p-3 focus:border-[#4af626] resize-y placeholder:text-gray-700"
                  placeholder="Start typing your payload here..."
                ></textarea>
                <div class="text-[#4af626] mt-1">EOF</div>
              </div>

              <div class="pt-4">
                <button
                  @click="openGmail"
                  class="border-2 border-[#4af626] text-[#4af626] px-6 py-2 font-bold hover:bg-[#4af626] hover:text-black focus:outline-none transition-none flex items-center gap-3"
                >
                  <Send :size="16" /> [ EXECUTE SEND ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom fake prompt -->
      <footer class="pt-10 border-t border-[#4af626]/30 text-sm">
        <div class="mb-2 text-gray-500">// System initialized. End of file. © {{ new Date().getFullYear() }}</div>
        <div>
          <span class="text-[#4af626] font-bold">esyot@Reinhards-MacBook-Pro</span>:<span class="text-blue-400">~</span>$ <span class="animate-pulse bg-[#4af626] w-2.5 h-4 inline-block align-middle ml-1"></span>
        </div>
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