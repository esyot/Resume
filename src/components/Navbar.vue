<script setup>
import { ref } from "vue";

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>
<template>
  <nav class="sticky top-0 bg-gray-900 shadow-lg select-none z-10">
    <div class="flex sm:hidden items-center p-4 text-white justify-between">
      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <div class="relative" @mouseenter="menuOpen = true" @mouseleave="menuOpen = false">
      <div class="hidden md:block p-4 text-white cursor-pointer" @click="toggleMenu">
        Menu
      </div>
      <transition
        name="slide-down"
        enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-200 ease-in"
      >
        <ul
          v-show="menuOpen"
          class="absolute right-0 w-full bg-gray-800/80 shadow-lg z-50 space-y-4 p-4 text-black overflow-hidden"
          :class="
            menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          "
        >
          <li>
            <router-link
              to="/home"
              title="Click to proceed to home page."
              class="w-full text-white hover:opacity-50"
              active-class="text-yellow-500"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              title="Click to proceed to contact information page."
              class="w-full text-white hover:opacity-50"
              active-class="text-yellow-500"
              >Contact</router-link
            >
          </li>
        </ul>
      </transition>
    </div>
  </nav>
</template>
