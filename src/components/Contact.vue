<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();

const contactInfo = [
  {
    icon: "fas fa-envelope text-blue-500 text-xl w-6",
    text: "rei.nhard3367@gmail.com",
    isLink: false,
  },
  {
    icon: "fas fa-phone text-green-500 text-xl w-6",
    text: "+63 (963) 3867-4260 (Globe)",
    isLink: false,
  },
  {
    icon: "fab fa-facebook text-blue-700 text-xl w-6",
    text: "/reinhard.esteban",
    link: "https://facebook.com/reinhard.esteban",
    isLink: true,
  },
  {
    icon: "fab fa-instagram text-pink-500 text-xl w-6",
    text: "@esyyyot",
    link: "https://instagram.com/esyyyot",
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
  <div class="min-h-screen flex items-center justify-center bg-black/90 p-6">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
      <ul class="space-y-4 text-gray-700 text-lg">
        <li
          v-for="(item, index) in contactInfo"
          :key="index"
          class="flex items-center space-x-4"
        >
          <i :class="item.icon"></i>
          <span v-if="!item.isLink">{{ item.text }}</span>
          <a v-else :href="item.link" class="hover:underline" target="_blank">
            {{ item.text }}
          </a>
          <button
            class="ml-auto text-gray-500 hover:text-gray-700"
            @click="copyToClipboard(item.text)"
          >
            <i class="fas fa-copy"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
