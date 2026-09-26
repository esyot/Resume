<template>
  <div
    v-if="project"
    class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900 relative overflow-x-hidden"
  >
    <!-- Animated Cursor Tail Component -->
    <CursorTail />

    <!-- Modern Animated Gradients Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        class="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-300/20 blur-[120px] mix-blend-multiply"
      ></div>
      <div
        class="absolute top-[30%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/20 blur-[120px] mix-blend-multiply"
      ></div>
      <div
        class="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-emerald-300/10 blur-[120px] mix-blend-multiply"
      ></div>
    </div>

    <div
      class="max-w-5xl mx-auto w-full p-4 sm:p-8 md:p-12 space-y-12 relative z-10"
    >
      <!-- Top Navigation -->
      <div>
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-white rounded-full text-slate-700 font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft class="w-4 h-4 text-purple-600" /> Back to Portfolio
        </router-link>
      </div>

      <!-- Main Header Card -->
      <header
        class="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 space-y-6"
      >
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span
              class="px-3 py-1 bg-purple-100 text-purple-700 font-bold text-xs rounded-full border border-purple-200/50"
            >
              Project Details
            </span>
          </div>

          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700"
          >
            {{ project.name }}
          </h1>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in project.tech_stack"
            :key="tech"
            class="text-xs font-semibold px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-full shadow-sm"
          >
            {{ tech }}
          </span>
        </div>

        <div v-if="project.link" class="pt-2">
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Visit Live Site
            <ExternalLink class="w-4 h-4" />
          </a>
        </div>
      </header>

      <!-- Project Specifications Container -->
      <section
        class="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 space-y-6"
      >
        <h2 class="text-2xl font-black text-slate-900 flex items-center gap-3">
          <div class="p-2 bg-purple-100 rounded-xl">
            <Layers class="w-6 h-6 text-purple-600" />
          </div>
          Project Overview
        </h2>

        <div
          v-html="formattedDetailsHtml"
          class="text-base text-slate-600 leading-relaxed font-medium [&_strong]:text-slate-900 [&_strong]:font-bold [&_ul]:space-y-3 [&_ul]:my-4 [&_li]:flex [&_li]:items-start [&_li]:gap-3"
        ></div>
      </section>

      <!-- Gallery Showcase -->
      <section
        v-if="project.images && project.images.length > 0"
        class="space-y-6"
      >
        <h2
          class="text-2xl font-black text-slate-900 flex items-center gap-3 ml-2"
        >
          <div class="p-2 bg-blue-100 rounded-xl">
            <Sparkles class="w-6 h-6 text-blue-600" />
          </div>
          Project Showcase
        </h2>

        <div
          class="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 space-y-6 relative"
        >
          <!-- Main Display Stage -->
          <div
            @click="openLightbox"
            class="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-slate-900/5 border border-slate-200/60 cursor-zoom-in group shadow-inner"
          >
            <transition name="gallery-fade" mode="out-in">
              <img
                :key="activeIndex"
                :src="resolveImagePath(project.images[activeIndex])"
                :alt="project.name + ' slide ' + (activeIndex + 1)"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </transition>

            <!-- Frame Badge Indicator -->
            <div
              class="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold shadow-md select-none"
            >
              Frame {{ String(activeIndex + 1).padStart(2, "0") }} /
              {{ String(project.images.length).padStart(2, "0") }}
            </div>

            <!-- Stage Navigation Controls -->
            <div
              v-if="project.images.length > 1"
              class="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none"
            >
              <button
                @click.stop="prevImage"
                class="pointer-events-auto w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-slate-800 flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft class="w-6 h-6" />
              </button>
              <button
                @click.stop="nextImage"
                class="pointer-events-auto w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-slate-800 flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all"
                aria-label="Next Image"
              >
                <ChevronRight class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- Thumbnails Row -->
          <div
            v-if="project.images.length > 1"
            class="flex gap-4 overflow-x-auto py-2 scrollbar-thin"
          >
            <button
              v-for="(image, index) in project.images"
              :key="index"
              @click="setActiveImage(index)"
              class="relative flex-shrink-0 w-28 aspect-[16/9] rounded-2xl overflow-hidden border-2 transition-all focus:outline-none"
              :class="
                activeIndex === index
                  ? 'border-purple-600 scale-105 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              "
            >
              <img
                :src="resolveImagePath(image)"
                class="w-full h-full object-cover"
                alt="Thumbnail"
              />
            </button>
          </div>
        </div>
      </section>

      <!-- Booking / Demo Section -->
      <section class="space-y-6 pt-4">
        <h2
          class="text-2xl font-black text-slate-900 flex items-center gap-3 ml-2"
        >
          <div class="p-2 bg-emerald-100 rounded-xl">
            <CalendarDays class="w-6 h-6 text-emerald-600" />
          </div>
          Request Demo & Walkthrough
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Direct Inquiry Info -->
          <div
            class="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2.5rem] p-8 shadow-lg text-white flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div
              class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"
            ></div>

            <div class="space-y-4 relative z-10">
              <h3 class="text-2xl font-bold">Interactive Demo</h3>
              <p class="text-purple-100 text-base leading-relaxed font-medium">
                Want to see how
                <strong class="text-white">{{ project.name }}</strong> can be
                configured or expanded for your specific workflow? Send over
                your schedule preferences to coordinate a live session.
              </p>
            </div>

            <div class="border-t border-white/20 pt-6 relative z-10 space-y-1">
              <span
                class="text-xs font-bold text-purple-200 uppercase tracking-widest block"
              >
                Direct Contact Email
              </span>
              <a
                href="mailto:rei.nhard3367@gmail.com"
                class="text-lg font-extrabold text-white hover:text-purple-200 transition-colors underline"
              >
                rei.nhard3367@gmail.com
              </a>
            </div>
          </div>

          <!-- Booking Form Card -->
          <div
            class="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80"
          >
            <div class="space-y-5">
              <div class="space-y-1.5">
                <label class="block text-sm font-bold text-slate-700 ml-2"
                  >Your Name</label
                >
                <input
                  v-model="bookingForm.name"
                  type="text"
                  placeholder="John Doe"
                  class="w-full bg-white/60 border border-slate-200 rounded-2xl text-slate-900 text-sm p-4 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all shadow-sm"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-sm font-bold text-slate-700 ml-2"
                  >Preferred Schedule</label
                >
                <input
                  v-model="bookingForm.preferredTime"
                  type="text"
                  placeholder="e.g., Friday Afternoon"
                  class="w-full bg-white/60 border border-slate-200 rounded-2xl text-slate-900 text-sm p-4 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all shadow-sm"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-sm font-bold text-slate-700 ml-2"
                  >Notes / Customizations Needed</label
                >
                <textarea
                  v-model="bookingForm.message"
                  rows="3"
                  placeholder="Describe your goals or customization needs..."
                  class="w-full bg-white/60 border border-slate-200 rounded-2xl text-slate-900 text-sm p-4 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all resize-none shadow-sm"
                ></textarea>
              </div>

              <button
                @click="openBookingGmail"
                class="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Demo Request</span>
                <Send class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Fullscreen Lightbox Modal -->
      <transition name="lightbox-fade">
        <div
          v-if="isLightboxOpen"
          class="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 bg-slate-900/90 backdrop-blur-lg"
          @click.self="closeLightbox"
        >
          <!-- Lightbox Top Header -->
          <div
            class="flex items-center justify-between text-white max-w-6xl mx-auto w-full select-none"
          >
            <span class="text-sm font-bold text-purple-300">
              {{ project.name }} — Frame {{ activeIndex + 1 }}
            </span>
            <button
              @click="closeLightbox"
              class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close Lightbox"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Lightbox Main Image Stage -->
          <div
            class="flex-1 flex items-center justify-center relative max-w-6xl mx-auto w-full px-8 py-4"
          >
            <button
              v-if="project.images.length > 1"
              @click.stop="prevImage"
              class="absolute left-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft class="w-6 h-6" />
            </button>

            <img
              :src="resolveImagePath(project.images[activeIndex])"
              :alt="project.name"
              class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            <button
              v-if="project.images.length > 1"
              @click.stop="nextImage"
              class="absolute right-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight class="w-6 h-6" />
            </button>
          </div>

          <!-- Lightbox Thumbnails Track -->
          <div
            v-if="project.images.length > 1"
            class="flex justify-center gap-3 overflow-x-auto py-2 select-none"
          >
            <button
              v-for="(image, index) in project.images"
              :key="'lb-' + index"
              @click.stop="setActiveImage(index)"
              class="relative flex-shrink-0 w-16 aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all"
              :class="
                activeIndex === index
                  ? 'border-purple-400 scale-105 opacity-100'
                  : 'border-transparent opacity-40 hover:opacity-100'
              "
            >
              <img
                :src="resolveImagePath(image)"
                class="w-full h-full object-cover"
                alt="Thumbnail"
              />
            </button>
          </div>
        </div>
      </transition>

      <!-- Footer -->
      <footer
        class="text-center text-sm font-semibold text-slate-400 border-t border-slate-200 pt-8 pb-12"
      >
        © {{ new Date().getFullYear() }} Reinhard Esteban. All rights reserved.
      </footer>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-8"
  >
    <p class="text-xl font-bold">Project details not found.</p>
    <router-link
      to="/"
      class="text-purple-600 font-bold underline mt-4 inline-flex items-center gap-2"
    >
      <ArrowLeft class="w-4 h-4" /> Back to Portfolio
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { projects } from "../data/projects.js";
import {
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  Send,
  X,
  ArrowLeft,
  Layers,
  Sparkles,
} from "lucide-vue-next";

import CursorTail from "../components/CursorTail.vue";

const route = useRoute();
const toast = useToast();
const slug = route.params.slug;

const activeIndex = ref(0);
const isLightboxOpen = ref(false);

const bookingForm = ref({
  name: "",
  preferredTime: "",
  message: "",
});

const resolveImagePath = (path) => {
  if (!path) return "";
  const clean = path.replace(/^public\//, "").replace(/^\//, "");
  return `/${clean}`;
};

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
  if (!bookingForm.value.name) {
    toast.error("Please enter your name to submit a demo request.");
    return;
  }

  toast.success("Preparing your demo request draft...");

  setTimeout(() => {
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

    bookingForm.value = { name: "", preferredTime: "", message: "" };
  }, 800);
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
  if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
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
          <span class="text-purple-600 mr-2 select-none text-xs">✨</span>
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
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
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
  background: #cbd5e1;
  border-radius: 9999px;
}
</style>
