<template>
  <div
    v-if="project"
    class="bg-[#080b12] text-[#e8eaf0] min-h-screen font-sans"
  >
    <div class="max-w-[1100px] mx-auto px-6 py-20">
      <router-link
        to="/home"
        class="text-[#d4af37] hover:underline mb-8 inline-block"
        >&larr; Back to Home</router-link
      >
      <h1 class="text-5xl font-bold text-white font-display mb-4">
        {{ project.name }}
      </h1>
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="tech in project.tech_stack"
          :key="tech"
          class="text-xs font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/60"
        >
          {{ tech }}
        </span>
      </div>
      <div
        v-html="formattedDetailsHtml"
        class="text-lg text-[#8891a4] leading-relaxed mb-16 [&_strong]:text-white [&_strong]:font-semibold [&_strong]:font-display"
      ></div>

      <div v-if="project.images && project.images.length > 0" class="mb-24">
        <h2 class="text-3xl font-bold text-white font-display mb-8">
          Project Gallery
        </h2>

        <div class="relative group">
          <div
            class="absolute -inset-1.5 bg-gradient-to-r from-[#d4af37] to-blue-600 rounded-2xl blur-2xl opacity-15 group-hover:opacity-25 transition duration-1000"
          ></div>

          <div
            class="relative bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm"
          >
            <div
              @click="openLightbox"
              class="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#03060a] cursor-zoom-in group/stage"
            >
              <transition name="gallery-fade" mode="out-in">
                <img
                  :key="activeIndex"
                  :src="
                    '/' + project.images[activeIndex].replace('public/', '')
                  "
                  :alt="project.name + ' slide ' + (activeIndex + 1)"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover/stage:scale-[1.03]"
                />
              </transition>

              <div
                class="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white/90 tracking-widest select-none"
              >
                {{ String(activeIndex + 1).padStart(2, "0") }} /
                {{ String(project.images.length).padStart(2, "0") }}
              </div>

              <div
                v-if="project.images.length > 1"
                class="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none"
              >
                <button
                  @click.stop="prevImage"
                  class="pointer-events-auto p-3.5 rounded-xl bg-black/60 hover:bg-black/95 border border-white/10 hover:border-[#d4af37] text-white/80 hover:text-white transition-all duration-300 transform -translate-x-2 group-hover/stage:translate-x-0 opacity-0 group-hover/stage:opacity-100"
                  aria-label="Previous Image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  @click.stop="nextImage"
                  class="pointer-events-auto p-3.5 rounded-xl bg-black/60 hover:bg-black/95 border border-white/10 hover:border-[#d4af37] text-white/80 hover:text-white transition-all duration-300 transform translate-x-2 group-hover/stage:translate-x-0 opacity-0 group-hover/stage:opacity-100"
                  aria-label="Next Image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              v-if="project.images.length > 1"
              class="mt-4 flex gap-3 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              <button
                v-for="(image, index) in project.images"
                :key="index"
                @click="setActiveImage(index)"
                class="relative flex-shrink-0 w-24 aspect-[16/9] rounded-lg overflow-hidden border transition-all duration-300 transform focus:outline-none"
                :class="
                  activeIndex === index
                    ? 'border-[#d4af37] scale-[1.04] ring-4 ring-[#d4af37]/20 z-10'
                    : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                "
              >
                <img
                  :src="'/' + image.replace('public/', '')"
                  class="w-full h-full object-cover"
                  alt="Thumbnail navigation"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section class="border-t border-white/10 pt-20 mb-20">
        <div class="flex flex-col mb-12">
          <h2 class="text-4xl font-bold text-white font-display">
            Book a Demo
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-8">
            <p class="text-lg text-[#8891a4] leading-relaxed">
              Interested in seeing how
              <strong class="text-white">{{ project.name }}</strong> can be
              customized or scaled for your business needs? Provide your details
              to instantly prepare a personalized demo request.
            </p>

            <div class="space-y-6">
              <div class="flex items-center gap-6 group">
                <div
                  class="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#080b12] transition-all duration-300"
                >
                  <!-- Custom Calendar SVG -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-xs font-bold text-[#5a6275] uppercase tracking-widest mb-1"
                  >
                    Direct Inquiries
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
                    v-model="bookingForm.name"
                    type="text"
                    placeholder="John Doe"
                    class="w-full bg-[#10151f] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/20"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-xs font-bold text-[#5a6275] uppercase tracking-widest ml-1"
                    >Preferred Date / Time</label
                  >
                  <input
                    v-model="bookingForm.preferredTime"
                    type="text"
                    placeholder="e.g., Friday Afternoon"
                    class="w-full bg-[#10151f] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label
                  class="text-xs font-bold text-[#5a6275] uppercase tracking-widest ml-1"
                  >Message / Specifications</label
                >
                <textarea
                  v-model="bookingForm.message"
                  rows="4"
                  placeholder="Tell me more about your business needs or customization requests..."
                  class="w-full bg-[#10151f] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-all placeholder:text-white/20 resize-none"
                ></textarea>
              </div>

              <button
                @click="openBookingGmail"
                class="group relative flex items-center justify-center gap-3 w-full py-5 bg-[#d4af37] text-[#080b12] rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#d4af37]/10 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                ></div>
                <span class="relative z-10 flex items-center gap-2">
                  Request Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </span>
              </button>

              <p
                class="text-[10px] text-[#5a6275] text-center uppercase tracking-widest mt-4"
              >
                Clicking will open a new tab with your booking details ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Immersive Fullscreen Glassmorphic Lightbox -->
    <transition name="lightbox-fade">
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-50 flex flex-col justify-between p-6 bg-[#04060b]/98 backdrop-blur-md"
        @click.self="closeLightbox"
      >
        <!-- Dynamic Header -->
        <div
          class="flex items-center justify-between text-white/60 max-w-7xl mx-auto w-full select-none"
        >
          <span class="font-mono text-sm tracking-wider uppercase">
            {{ project.name }} <span class="text-[#d4af37] mx-2">//</span> Frame
            {{ activeIndex + 1 }}
          </span>
          <button
            @click="closeLightbox"
            class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all duration-200"
            aria-label="Close Lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          class="flex-1 flex items-center justify-center relative max-w-7xl mx-auto w-full px-12"
        >
          <button
            v-if="project.images.length > 1"
            @click="prevImage"
            class="absolute left-0 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:border-[#d4af37] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <img
            :src="'/' + project.images[activeIndex].replace('public/', '')"
            :alt="project.name"
            class="max-w-full max-h-[75vh] object-contain rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/5 transition-all duration-500"
          />

          <button
            v-if="project.images.length > 1"
            @click="nextImage"
            class="absolute right-0 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:border-[#d4af37] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="project.images.length > 1"
          class="flex justify-center gap-2 overflow-x-auto py-4 select-none"
        >
          <button
            v-for="(image, index) in project.images"
            :key="'lb-' + index"
            @click="setActiveImage(index)"
            class="relative flex-shrink-0 w-16 aspect-[16/9] rounded-md overflow-hidden border transition-all duration-200"
            :class="
              activeIndex === index
                ? 'border-[#d4af37] scale-105 ring-2 ring-[#d4af37]/40 z-10'
                : 'border-white/10 opacity-40 hover:opacity-100'
            "
          >
            <img
              :src="'/' + image.replace('public/', '')"
              class="w-full h-full object-cover"
              alt="Thumbnail navigation"
            />
          </button>
        </div>
      </div>
    </transition>
  </div>
  <div v-else class="bg-[#080b12] text-white text-center py-20">
    <p>Project not found.</p>
    <router-link
      to="/home"
      class="text-[#d4af37] hover:underline mt-4 inline-block"
      >&larr; Back to Home</router-link
    >
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { projects } from "../data/projects.js";

const route = useRoute();
const slug = route.params.slug;

const activeIndex = ref(0);
const isLightboxOpen = ref(false);

const bookingForm = ref({
  name: "",
  preferredTime: "",
  message: "",
});

const toSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const project = computed(() => {
  return projects.find((p) => toSlug(p.name) === slug);
});

const openBookingGmail = () => {
  const projectName = project.value?.name || "Your Project";
  const visitorName = bookingForm.value.name || "Portfolio Visitor";
  const preferredTime = bookingForm.value.preferredTime || "Flexible";

  const subject = encodeURIComponent(
    `Demo Request: ${projectName} — ${visitorName}`,
  );

  const bodyMessage =
    bookingForm.value.message ||
    "I would love to arrange a demo or discuss this system.";
  const body = encodeURIComponent(
    `Hi Rei,\n\nI just checked out your project "${projectName}" on your portfolio and I would love to request a brief demo/walkthrough.\n\n` +
      `Preferred Schedule: ${preferredTime}\n` +
      `Notes/Inquiry: ${bodyMessage}\n\n` +
      `Best regards,\n${visitorName}`,
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rei.nhard3367@gmail.com&su=${subject}&body=${body}`;
  window.open(gmailUrl, "_blank");
};

// Image navigation handlers
const prevImage = () => {
  if (!project.value?.images?.length) return;
  activeIndex.value =
    (activeIndex.value - 1 + project.value.images.length) %
    project.value.images.length;
};

const nextImage = () => {
  if (!project.value?.images?.length) return;
  activeIndex.value = (activeIndex.value + 1) % project.value.images.length;
};

const setActiveImage = (index) => {
  activeIndex.value = index;
};

const openLightbox = () => {
  isLightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  document.body.style.overflow = "";
};

const handleGlobalKeydown = (e) => {
  if (!project.value?.images || project.value.images.length <= 1) return;
  if (e.key === "ArrowLeft") {
    prevImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  } else if (e.key === "Escape" && isLightboxOpen.value) {
    closeLightbox();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
  document.body.style.overflow = "";
});

const formattedDetailsHtml = computed(() => {
  if (!project.value?.full_details) return "";

  let rawText = project.value.full_details;

  rawText = rawText.replace(
    /analytics\.Leveraging/g,
    "analytics.\n\nLeveraging",
  );

  rawText = rawText.replace(/([^\n])•/g, "$1\n•");

  const lines = rawText.split("\n");
  let htmlResult = "";
  let inList = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const cleanLine = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    if (cleanLine.startsWith("•") || cleanLine.startsWith("-")) {
      if (!inList) {
        htmlResult += '<ul class="space-y-4 my-6 pl-1">';
        inList = true;
      }
      const itemContent = cleanLine.replace(/^[•-]\s*/, "");
      htmlResult += `
        <li class="flex items-start">
          <span class="text-[#d4af37] mr-3 mt-1.5 select-none text-sm">◆</span>
          <span>${itemContent}</span>
        </li>`;
    } else {
      if (inList) {
        htmlResult += "</ul>";
        inList = false;
      }
      htmlResult += `<p class="mb-6">${cleanLine}</p>`;
    }
  }

  if (inList) {
    htmlResult += "</ul>";
  }

  return htmlResult;
});
</script>

<style scoped>
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.gallery-fade-enter-from {
  opacity: 0;
  transform: scale(0.975);
}
.gallery-fade-leave-to {
  opacity: 0;
  transform: scale(1.025);
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.4);
}
</style>
