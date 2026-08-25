<template>
  <div
    v-if="project"
    class="bg-[#fffef9] text-zinc-900 min-h-screen font-doodle p-4 sm:p-8 md:p-12 relative overflow-x-hidden selection:bg-amber-200"
  >
    <!-- Background Hand-drawn Grid -->
    <div
      class="fixed inset-0 pointer-events-none bg-[radial-gradient(#d4cebe_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 z-0"
    ></div>

    <div class="max-w-[980px] mx-auto w-full relative z-10 space-y-10">
      
      <!-- Back Link -->
      <div>
        <router-link
          to="/"
          class="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-200 border-2 border-zinc-900 rounded-xl font-bold text-xs shadow-[2px_2px_0px_0px_#18181b] hover:bg-amber-300 transition-all font-hand"
        >
          &larr; Back to Portfolio
        </router-link>
      </div>

      <!-- Main Header Card -->
      <header
        class="bg-white border-3 border-zinc-900 rounded-[28px] p-6 sm:p-10 shadow-[6px_6px_0px_0px_#18181b] relative transform -rotate-1"
      >
        <!-- Tape Banner -->
        <div
          class="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-100/90 border-y border-zinc-400 rotate-1 opacity-90 pointer-events-none shadow-sm"
        ></div>

        <h1
          class="text-3xl sm:text-5xl font-black text-zinc-900 font-hand tracking-tight mb-4"
        >
          {{ project.name }}
        </h1>

        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tech in project.tech_stack"
            :key="tech"
            class="text-[11px] font-bold px-3 py-1 bg-amber-50 border-2 border-zinc-900 rounded-lg text-zinc-900 shadow-[1.5px_1.5px_0px_0px_#18181b]"
          >
            {{ tech }}
          </span>
        </div>

        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-300 border-2 border-zinc-900 text-zinc-900 rounded-xl font-bold hover:bg-emerald-400 shadow-[3px_3px_0px_0px_#18181b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#18181b] transition-all text-xs font-hand"
        >
          Visit Live Site
          <ExternalLink class="w-4 h-4" />
        </a>
      </header>

      <!-- Project Specifications Container -->
      <section
        class="bg-white border-3 border-zinc-900 rounded-[28px] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#18181b] space-y-4"
      >
        <h2 class="text-xl font-black text-zinc-900 font-hand border-b-2 border-zinc-900 pb-2">
          Project Overview
        </h2>
        <div
          v-html="formattedDetailsHtml"
          class="text-sm text-zinc-800 leading-relaxed [&_strong]:text-zinc-900 [&_strong]:font-black [&_strong]:font-hand [&_ul]:space-y-3 [&_ul]:my-4 [&_li]:flex [&_li]:items-start [&_li]:gap-2"
        ></div>
      </section>

      <!-- Gallery Carousel -->
      <section
        v-if="project.images && project.images.length > 0"
        class="space-y-4"
      >
        <h2 class="text-2xl font-black text-zinc-900 font-hand flex items-center gap-2">
          <span>🎨</span> Project Showcase
        </h2>

        <div
          class="bg-white border-3 border-zinc-900 rounded-[28px] p-4 sm:p-6 shadow-[6px_6px_0px_0px_#18181b] space-y-4 relative"
        >
          <!-- Main Stage -->
          <div
            @click="openLightbox"
            class="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 border-2 border-zinc-900 cursor-zoom-in group"
          >
            <transition name="gallery-fade" mode="out-in">
              <img
                :key="activeIndex"
                :src="'/' + project.images[activeIndex].replace('public/', '')"
                :alt="project.name + ' slide ' + (activeIndex + 1)"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </transition>

            <!-- Frame Indicator -->
            <div
              class="absolute top-3 left-3 bg-white border-2 border-zinc-900 px-3 py-1 rounded-lg text-xs font-bold text-zinc-900 font-hand shadow-[2px_2px_0px_0px_#18181b] select-none"
            >
              Frame {{ String(activeIndex + 1).padStart(2, "0") }} /
              {{ String(project.images.length).padStart(2, "0") }}
            </div>

            <!-- Controls -->
            <div
              v-if="project.images.length > 1"
              class="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none"
            >
              <button
                @click.stop="prevImage"
                class="pointer-events-auto p-2.5 rounded-xl bg-amber-200 border-2 border-zinc-900 text-zinc-900 hover:bg-amber-300 transition-all shadow-[2px_2px_0px_0px_#18181b]"
                aria-label="Previous Image"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                @click.stop="nextImage"
                class="pointer-events-auto p-2.5 rounded-xl bg-amber-200 border-2 border-zinc-900 text-zinc-900 hover:bg-amber-300 transition-all shadow-[2px_2px_0px_0px_#18181b]"
                aria-label="Next Image"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Thumbnails Track -->
          <div
            v-if="project.images.length > 1"
            class="flex gap-3 overflow-x-auto py-2 scrollbar-thin"
          >
            <button
              v-for="(image, index) in project.images"
              :key="index"
              @click="setActiveImage(index)"
              class="relative flex-shrink-0 w-24 aspect-[16/9] rounded-xl overflow-hidden border-2 border-zinc-900 transition-all focus:outline-none"
              :class="
                activeIndex === index
                  ? 'ring-2 ring-amber-400 scale-[1.03] shadow-[2px_2px_0px_0px_#18181b]'
                  : 'opacity-60 hover:opacity-100'
              "
            >
              <img
                :src="'/' + image.replace('public/', '')"
                class="w-full h-full object-cover"
                alt="Thumbnail"
              />
            </button>
          </div>
        </div>
      </section>

      <!-- Booking / Demo Section -->
      <section class="space-y-4 pt-4">
        <h2 class="text-2xl font-black text-zinc-900 font-hand flex items-center gap-2">
          <CalendarDays class="w-6 h-6 text-amber-600" /> Request Demo & Walkthrough
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Direct Inquiry Info -->
          <div
            class="bg-amber-50 border-3 border-zinc-900 rounded-[28px] p-6 shadow-[6px_6px_0px_0px_#18181b] space-y-4 rotate-1"
          >
            <p class="text-xs text-zinc-800 leading-relaxed font-medium">
              Want to see how <strong class="text-zinc-900 font-bold font-hand">{{ project.name }}</strong> can be configured or expanded for your specific workflow? Submit your request details to setup a direct demo call.
            </p>

            <div class="border-t-2 border-dashed border-zinc-900 pt-4">
              <span class="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">
                Direct Contact
              </span>
              <a
                href="mailto:rei.nhard3367@gmail.com"
                class="text-xs font-black text-zinc-900 hover:text-amber-700 underline font-hand"
              >
                rei.nhard3367@gmail.com
              </a>
            </div>
          </div>

          <!-- Doodle Booking Form -->
          <div
            class="bg-white border-3 border-zinc-900 rounded-[28px] p-6 shadow-[6px_6px_0px_0px_#18181b] space-y-4"
          >
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-zinc-800 mb-1">Your Name</label>
                <input
                  v-model="bookingForm.name"
                  type="text"
                  placeholder="John Doe"
                  class="w-full bg-amber-50/40 border-2 border-zinc-900 rounded-xl text-zinc-900 text-xs p-2.5 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b]"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-zinc-800 mb-1">Preferred Schedule</label>
                <input
                  v-model="bookingForm.preferredTime"
                  type="text"
                  placeholder="e.g., Friday Afternoon"
                  class="w-full bg-amber-50/40 border-2 border-zinc-900 rounded-xl text-zinc-900 text-xs p-2.5 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b]"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-zinc-800 mb-1">Project Notes / Requirements</label>
                <textarea
                  v-model="bookingForm.message"
                  rows="3"
                  placeholder="Describe your goals or customization needs..."
                  class="w-full bg-amber-50/40 border-2 border-zinc-900 rounded-xl text-zinc-900 text-xs p-2.5 outline-none focus:bg-white font-medium shadow-[2px_2px_0px_0px_#18181b] resize-none"
                ></textarea>
              </div>

              <button
                @click="openBookingGmail"
                class="w-full py-2.5 bg-amber-300 hover:bg-amber-400 border-2 border-zinc-900 rounded-xl font-black text-xs text-zinc-900 shadow-[3px_3px_0px_0px_#18181b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0px_0px_#18181b] transition-all cursor-pointer flex items-center justify-center gap-2 font-hand"
              >
                <span>Submit Demo Request</span>
                <Send class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <transition name="lightbox-fade">
        <div
          v-if="isLightboxOpen"
          class="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 bg-zinc-900/80 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <div
            class="flex items-center justify-between text-white max-w-6xl mx-auto w-full select-none"
          >
            <span class="font-hand text-sm font-bold text-amber-300">
              {{ project.name }} — Frame {{ activeIndex + 1 }}
            </span>
            <button
              @click="closeLightbox"
              class="p-2 rounded-xl bg-amber-300 border-2 border-zinc-900 text-zinc-900 font-black shadow-[2px_2px_0px_0px_#18181b] hover:bg-amber-400"
              aria-label="Close Lightbox"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div
            class="flex-1 flex items-center justify-center relative max-w-6xl mx-auto w-full px-8"
          >
            <button
              v-if="project.images.length > 1"
              @click="prevImage"
              class="absolute left-0 p-3 rounded-xl bg-amber-200 border-2 border-zinc-900 text-zinc-900 hover:bg-amber-300 shadow-[2px_2px_0px_0px_#18181b]"
            >
              <ChevronLeft class="w-6 h-6" />
            </button>

            <img
              :src="'/' + project.images[activeIndex].replace('public/', '')"
              :alt="project.name"
              class="max-w-full max-h-[75vh] object-contain rounded-2xl border-3 border-zinc-900 bg-white shadow-[8px_8px_0px_0px_#18181b]"
            />

            <button
              v-if="project.images.length > 1"
              @click="nextImage"
              class="absolute right-0 p-3 rounded-xl bg-amber-200 border-2 border-zinc-900 text-zinc-900 hover:bg-amber-300 shadow-[2px_2px_0px_0px_#18181b]"
            >
              <ChevronRight class="w-6 h-6" />
            </button>
          </div>

          <div
            v-if="project.images.length > 1"
            class="flex justify-center gap-2 overflow-x-auto py-2 select-none"
          >
            <button
              v-for="(image, index) in project.images"
              :key="'lb-' + index"
              @click="setActiveImage(index)"
              class="relative flex-shrink-0 w-16 aspect-[16/9] rounded-lg overflow-hidden border-2 border-zinc-900 transition-all"
              :class="
                activeIndex === index
                  ? 'ring-2 ring-amber-400 scale-105'
                  : 'opacity-50 hover:opacity-100'
              "
            >
              <img
                :src="'/' + image.replace('public/', '')"
                class="w-full h-full object-cover"
                alt="Thumbnail"
              />
            </button>
          </div>
        </div>
      </transition>

      <!-- Footer -->
      <footer
        class="text-center text-xs font-bold text-zinc-600 border-t-2 border-dashed border-zinc-400 pt-6 font-hand"
      >
        Hand-crafted by Reinhard Esteban © {{ new Date().getFullYear() }}
      </footer>
    </div>
  </div>

  <div v-else class="bg-[#fffef9] text-zinc-900 text-center py-20 font-hand">
    <p class="text-lg">Project details not found.</p>
    <router-link
      to="/"
      class="text-amber-700 font-bold underline mt-4 inline-block"
      >&larr; Back to Portfolio</router-link
    >
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { projects } from "../data/projects.js";
import {
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  Send,
  X,
} from "lucide-vue-next";

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
        htmlResult += '<ul class="space-y-3 my-4 pl-1">';
        inList = true;
      }
      const itemContent = cleanLine.replace(/^[•-]\s*/, "");
      htmlResult += `
        <li class="flex items-start">
          <span class="text-amber-600 mr-2 select-none text-xs">✏️</span>
          <span>${itemContent}</span>
        </li>`;
    } else {
      if (inList) {
        htmlResult += "</ul>";
        inList = false;
      }
      htmlResult += `<p class="mb-4">${cleanLine}</p>`;
    }
  }

  if (inList) {
    htmlResult += "</ul>";
  }

  return htmlResult;
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kalam:wght@400;700&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap");

.font-hand {
  font-family: "Kalam", cursive;
}

.font-doodle {
  font-family: "Plus Jakarta Sans", sans-serif;
}

.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.gallery-fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
.gallery-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #d4cebe;
  border-radius: 9999px;
}
</style>