<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const toast = useToast();

const contactInfo = [
  {
    icon: "fas fa-envelope text-grayy-400 text-xl w-6",
    text: "rei.nhard3367@gmail.com",
    isLink: false,
  },
  {
    icon: "fas fa-phone text-green-400 text-xl w-6",
    text: "+63 (963) 3867-4260 (Globe)",
    isLink: false,
  },
  {
    icon: "fab fa-facebook text-blue-500 text-xl w-6",
    text: "/reinhard.esteban",
    link: "https://facebook.com/reinhard.esteban",
    isLink: true,
  },
  {
    icon: "fab fa-instagram text-pink-400 text-xl w-6",
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
  <DefaultLayout>
    <div class="min-h-screen flex items-center justify-center bg-black/90">
      <div class="m-4 bg-yellow-500/20 rounded-2xl shadow-md w-full max-w-xl">
        <ul class="space-y-4 text-yellow-100 text-lg p-6 m-2">
          <li
            v-for="(item, index) in contactInfo"
            :key="index"
            class="flex items-center space-x-4"
          >
            <i :class="item.icon"></i>
            <span v-if="!item.isLink">{{ item.text }}</span>
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
              <i class="fas fa-copy"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </DefaultLayout>
</template>
