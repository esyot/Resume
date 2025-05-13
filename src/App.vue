<script>
export default {
  name: "App",
};
</script>
<template>
  <div id="app">
    <nav class="sticky top-0 bg-black select-none">
      <ul class="flex space-x-8 p-4 text-white font-bold">
        <li>
          <router-link
            to="/home"
            title="Click to proceed to home page."
            class="hover:opacity-50"
            active-class="text-yellow-400 "
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/contact"
            title="Click to proceed to contact information page."
            class="hover:opacity-50"
            active-class="text-yellow-400 "
            >Contact</router-link
          >
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>
