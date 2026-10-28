<template>
  <div
    v-if="project"
    class="min-h-screen bg-[#faf9f6] text-neutral-900 antialiased font-sans"
  >
    <!-- Thin top rule -->
    <div class="border-b border-neutral-200">
      <div
        class="max-w-4xl mx-auto w-full px-6 sm:px-10 py-5 flex items-center justify-between"
      >
        <router-link
          to="/"
          class="text-xs uppercase tracking-[0.18em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft class="w-3.5 h-3.5" /> Back to Portfolio
        </router-link>
        <span
          class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-mono"
        >
          Project
        </span>
      </div>
    </div>

    <div class="max-w-4xl mx-auto w-full px-6 sm:px-10">
      <!-- Header -->
      <header class="pt-16 sm:pt-24 pb-14 sm:pb-20">
        <p
          class="text-xs uppercase tracking-[0.22em] text-neutral-500 font-medium mb-8"
        >
          Selected Work
        </p>

        <h1
          class="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02] text-neutral-900 mb-8"
        >
          {{ project.name }}
        </h1>

        <div class="flex flex-wrap gap-x-3 gap-y-2 mb-10">
          <span
            v-for="(tech, i) in project.tech_stack"
            :key="tech"
            class="text-sm text-neutral-600 font-mono"
          >
            {{ tech
            }}<span
              v-if="i < project.tech_stack.length - 1"
              class="text-neutral-300 ml-3"
              >·</span
            >
          </span>
        </div>

        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:gap-3 transition-all"
        >
          Visit live site
          <ExternalLink class="w-3.5 h-3.5" />
        </a>
      </header>

      <!-- Overview -->
      <section class="border-t border-neutral-200 py-14 sm:py-20">
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <div>
            <p
              class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium sticky top-6"
            >
              Overview
            </p>
          </div>
          <div
            v-html="formattedDetailsHtml"
            class="text-[15px] leading-[1.75] text-neutral-700 [&_strong]:text-neutral-900 [&_strong]:font-semibold"
          ></div>
        </div>
      </section>

      <!-- Gallery -->
      <section
        v-if="project.images && project.images.length > 0"
        class="border-t border-neutral-200 py-14 sm:py-20"
      >
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <div>
            <p
              class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium"
            >
              Plates
            </p>
          </div>

          <div class="space-y-5">
            <!-- Main stage -->
            <figure
              @click="openLightbox"
              class="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border border-neutral-200 cursor-zoom-in group"
            >
              <transition name="plate" mode="out-in">
                <img
                  :key="activeIndex"
                  :src="resolveImagePath(project.images[activeIndex])"
                  :alt="project.name + ' — plate ' + (activeIndex + 1)"
                  class="w-full h-full object-cover"
                />
              </transition>

              <figcaption
                class="absolute bottom-3 left-3 text-[11px] font-mono uppercase tracking-widest text-white bg-neutral-900/70 px-2 py-1"
              >
                Plate {{ String(activeIndex + 1).padStart(2, "0") }} —
                {{ String(project.images.length).padStart(2, "0") }}
              </figcaption>

              <div
                v-if="project.images.length > 1"
                class="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none"
              >
                <button
                  @click.stop="prevImage"
                  class="pointer-events-auto w-9 h-9 bg-white border border-neutral-300 text-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft class="w-4 h-4" />
                </button>
                <button
                  @click.stop="nextImage"
                  class="pointer-events-auto w-9 h-9 bg-white border border-neutral-300 text-neutral-800 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </figure>

            <!-- Thumbs -->
            <div
              v-if="project.images.length > 1"
              class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin"
            >
              <button
                v-for="(image, index) in project.images"
                :key="index"
                @click="setActiveImage(index)"
                class="relative flex-shrink-0 w-20 aspect-[16/10] overflow-hidden border transition-all focus:outline-none"
                :class="
                  activeIndex === index
                    ? 'border-neutral-900'
                    : 'border-neutral-200 opacity-60 hover:opacity-100'
                "
              >
                <img
                  :src="resolveImagePath(image)"
                  class="w-full h-full object-cover"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Demo Request -->
      <section class="border-t border-neutral-200 py-14 sm:py-20">
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16">
          <div>
            <p
              class="text-xs uppercase tracking-[0.18em] text-neutral-400 font-medium"
            >
              Walkthrough
            </p>
          </div>

          <div class="space-y-10">
            <div class="max-w-lg space-y-4">
              <p class="text-[15px] leading-relaxed text-neutral-700">
                Want to see how <em>{{ project.name }}</em> can be adapted for
                your team? Send a request and we'll arrange a live session.
              </p>
              <p class="text-sm text-neutral-500">
                Or email directly —
                <a
                  href="mailto:rei.nhard3367@gmail.com"
                  class="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                  >rei.nhard3367@gmail.com</a
                >
              </p>
            </div>

            <!-- Underlined form, editorial style -->
            <form @submit.prevent="openBookingGmail" class="max-w-lg space-y-6">
              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  v-model="bookingForm.name"
                  type="text"
                  placeholder="Your name"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                >
                  Preferred schedule
                </label>
                <input
                  v-model="bookingForm.preferredTime"
                  type="text"
                  placeholder="e.g. Friday afternoon"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label
                  class="block text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-2"
                >
                  Notes
                </label>
                <textarea
                  v-model="bookingForm.message"
                  rows="3"
                  placeholder="Goals, customizations, questions…"
                  class="w-full bg-transparent border-0 border-b border-neutral-300 text-neutral-900 text-[15px] py-2.5 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                class="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
              >
                Submit request
                <Send class="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer
        class="border-t border-neutral-200 py-10 flex items-center justify-between text-xs text-neutral-400 font-mono"
      >
        <span>© {{ new Date().getFullYear() }} Reinhard Esteban</span>
        <router-link to="/" class="hover:text-neutral-900 transition-colors">
          Return to index →
        </router-link>
      </footer>
    </div>

    <!-- Lightbox -->
    <transition name="lightbox-fade">
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]"
        @click.self="closeLightbox"
      >
        <div
          class="flex items-center justify-between px-6 py-5 text-neutral-300 font-mono text-xs uppercase tracking-widest border-b border-neutral-800"
        >
          <span>
            {{ project.name }} — Plate
            {{ String(activeIndex + 1).padStart(2, "0") }}
          </span>
          <button
            @click="closeLightbox"
            class="w-8 h-8 flex items-center justify-center hover:text-white transition-colors"
            aria-label="Close"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="flex-1 flex items-center justify-center relative px-6 py-6">
          <button
            v-if="project.images.length > 1"
            @click.stop="prevImage"
            class="absolute left-6 w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <img
            :src="resolveImagePath(project.images[activeIndex])"
            :alt="project.name"
            class="max-w-full max-h-[80vh] object-contain"
          />

          <button
            v-if="project.images.length > 1"
            @click.stop="nextImage"
            class="absolute right-6 w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>

        <div
          v-if="project.images.length > 1"
          class="flex justify-center gap-2 px-6 py-4 border-t border-neutral-800 overflow-x-auto"
        >
          <button
            v-for="(image, index) in project.images"
            :key="'lb-' + index"
            @click.stop="setActiveImage(index)"
            class="flex-shrink-0 w-16 aspect-[16/10] overflow-hidden border transition-all"
            :class="
              activeIndex === index
                ? 'border-white opacity-100'
                : 'border-neutral-700 opacity-40 hover:opacity-100'
            "
          >
            <img
              :src="resolveImagePath(image)"
              class="w-full h-full object-cover"
              alt=""
            />
          </button>
        </div>
      </div>
    </transition>
  </div>

  <div
    v-else
    class="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] text-neutral-900 p-8"
  >
    <p class="text-lg mb-6">Project not found.</p>
    <router-link
      to="/"
      class="text-sm uppercase tracking-widest border-b border-neutral-900 pb-1"
    >
      Return to index
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
  Send,
  X,
  ArrowLeft,
} from "lucide-vue-next";

const route = useRoute();
const toast = useToast();
const slug = route.params.slug;

const activeIndex = ref(0);
const isLightboxOpen = ref(false);

const bookingForm = ref({ name: "", preferredTime: "", message: "" });

const resolveImagePath = (path) => {
  if (!path) return "";
  const clean = path.replace(/^public\//, "").replace(/^\//, "");
  return `/${clean}`;
};

const toSlug = (name) =>
  name
    ? name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    : "";

const project = computed(() => projects.find((p) => toSlug(p.name) === slug));

const openBookingGmail = () => {
  if (!bookingForm.value.name) {
    toast.error("Please enter your name.");
    return;
  }
  toast.success("Preparing draft…");
  setTimeout(() => {
    const projectName = project.value?.name || "Your Project";
    const visitorName = bookingForm.value.name || "Visitor";
    const preferredTime = bookingForm.value.preferredTime || "Flexible";
    const subject = encodeURIComponent(
      `Demo Request: ${projectName} — ${visitorName}`,
    );
    const bodyMessage =
      bookingForm.value.message || "I'd like to arrange a demo.";
    const body = encodeURIComponent(
      `Hi Rei,\n\nI just checked out "${projectName}" on your portfolio and would love to request a walkthrough.\n\nPreferred Schedule: ${preferredTime}\nNotes: ${bodyMessage}\n\nBest regards,\n${visitorName}`,
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=rei.nhard3367@gmail.com&su=${subject}&body=${body}`,
      "_blank",
    );
    bookingForm.value = { name: "", preferredTime: "", message: "" };
  }, 500);
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

const setActiveImage = (i) => {
  activeIndex.value = i;
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
  if (e.key === "ArrowLeft") prevImage();
  else if (e.key === "ArrowRight") nextImage();
  else if (e.key === "Escape" && isLightboxOpen.value) closeLightbox();
};

onMounted(() => window.addEventListener("keydown", handleGlobalKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
  document.body.style.overflow = "";
});

// Cleaner overview parser — numbered items with hairline dividers, no emoji
const formattedDetailsHtml = computed(() => {
  if (!project.value?.full_details) return "";

  let rawText = project.value.full_details;
  rawText = rawText.replace(
    /analytics\.Leveraging/g,
    "analytics.\n\nLeveraging",
  );
  rawText = rawText.replace(/([^\n])•/g, "$1\n•");

  const lines = rawText.split("\n");
  let html = "";
  let inList = false;
  let counter = 0;

  const flushList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
      counter = 0;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const clean = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    if (clean.startsWith("•") || clean.startsWith("-")) {
      if (!inList) {
        html +=
          '<ul class="my-6 divide-y divide-neutral-200 border-y border-neutral-200">';
        inList = true;
      }
      counter += 1;
      const item = clean.replace(/^[•-]\s*/, "");
      html += `
        <li class="grid grid-cols-[2.5rem_1fr] py-3 items-baseline">
          <span class="text-[11px] font-mono text-neutral-400">${String(counter).padStart(2, "0")}</span>
          <span class="text-[15px] leading-[1.7] text-neutral-700">${item}</span>
        </li>`;
    } else {
      flushList();
      html += `<p class="mb-5 text-[15px] leading-[1.75] text-neutral-700">${clean}</p>`;
    }
  }
  flushList();
  return html;
});
</script>

<style scoped>
/* Serif display face for the title — no inline style needed */
.font-display {
  font-family: "Instrument Serif", Georgia, "Times New Roman", serif;
  font-weight: 400;
}

.plate-enter-active,
.plate-leave-active {
  transition: opacity 0.25s ease;
}
.plate-enter-from,
.plate-leave-to {
  opacity: 0;
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
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #d4d4d4;
}
</style>
