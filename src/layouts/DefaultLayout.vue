<template>
  <div id="app" class="min-h-screen flex flex-col relative">
    <!-- Navbar -->
    <nav class="sticky top-0 bg-black select-none z-10">
      <div class="md:hidden flex items-center p-4 text-white">
        <button @click="toggleMenu" class="text-white focus:outline-none">
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

      <ul
        :class="{ hidden: !menuOpen, 'md:flex': true }"
        class="md:flex space-x-8 p-4 text-white font-bold sm:space-y-0 space-y-4"
      >
        <li>
          <router-link
            to="/home"
            title="Click to proceed to home page."
            class="hover:opacity-50"
            active-class="text-yellow-400"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/contact"
            title="Click to proceed to contact information page."
            class="hover:opacity-50"
            active-class="text-yellow-400"
            >Contact</router-link
          >
        </li>
      </ul>
    </nav>

    <div class="flex-1 overflow-auto">
      <slot />
    </div>

    <button
      v-show="showScrollButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 text-black rounded-full cursor-pointer shadow-lg hover:bg-yellow-300 transition duration-300"
    >
      <i class="fas fa-circle-chevron-up fa-3x text-yellow-500 text-lg"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      menuOpen: false,
      showScrollButton: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
