<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const toast = useToast();

const contactInfo = [
  {
    icon: "freecon icon-envelope icon-gray-400",
    text: "rei.nhard3367@gmail.com",
    isLink: false,
  },
  {
    icon: "freecon icon-phone icon-green-400",
    text: "+63 (966) 867-4260 (Globe)",
    isLink: false,
  },
  {
    icon: "freecon brand-facebook icon-blue-500",
    text: "/reinhard.esteban",
    link: "https://facebook.com/reinhard.esteban",
    isLink: true,
  },
  {
    icon: "freecon brand-instagram icon-pink-400",
    text: "@esyyyot",
    link: "https://instagram.com/esyyyot",
    isLink: true,
  },
  {
    icon: "freecon brand-linkedin icon-blue-400",
    text: "/in/reinhard-esteban",
    link: "https://linkedin.com/in/reinhard-esteban",
    isLink: true,
  },
];

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.warning("Text Copied to clipboard!");
  });
};
</script>

<template>
  <DefaultLayout>
    <div class="min-h-screen flex items-center justify-center bg-black/90">
      <div class="m-4 bg-yellow-500/20 rounded-2xl shadow-md w-full max-w-xl">
        <ul class="space-y-4 text-lg p-6 m-2">
          <li
            v-for="(item, index) in contactInfo"
            :key="index"
            class="flex items-center space-x-4"
          >
            <i :class="item.icon"></i>
            <span v-if="!item.isLink" class="text-yellow-400">{{ item.text }}</span>
            <a
              v-else
              :href="item.link"
              class="hover:underline text-yellow-400"
              target="_blank"
            >
              {{ item.text }}
            </a>
            <button
              class="ml-auto text-gray-200 hover:text-white"
              @click="copyToClipboard(item.text)"
            >
              <i class="freecon icon-copy icon-hover-fade"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </DefaultLayout>
</template>
