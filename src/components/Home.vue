<script setup>
const skills = [
  { name: "HTML5", rating: 5 },
  { name: "CSS", rating: 4 },
  { name: "JavaScript", rating: 5 },
  { name: "TypeScript", rating: 3 },
  { name: "Vue.js", rating: 5 },
  { name: "Tailwind CSS", rating: 4 },
  { name: "Laravel", rating: 4 },
  { name: "MySQL", rating: 4 },
  { name: "React", rating: 3 },
  { name: "Next.js", rating: 3 },
  { name: "Inertia.js", rating: 4 },
];

const projects = [
  {
    name: "MDC PRMS",
    link: "https://prop.materdeicollege.com",
    description:
      "This website was created to help Mater Dei College with their property reservations.",
  },
  {
    name: "MDC SEC",
    link: "https://sec.materdeicollege.com",
    description:
      "This website was created to assist students and teachers with school events.",
  },
  {
    name: "V-Record",
    link: "https://v-record.resteban.tech",
    description:
      "This website was created to help establishments track and monitor vehicles checking in or out of the establishment.",
  },
];

const personalDetails = {
  name: "Reinhard Esteban",
  img: "profile_img.jpg",
};
</script>

<template>
  <div class="min-h-screen bg-black/90 text-white font-sans p-6">
    <header class="flex flex-col items-center mb-12 text-center">
      <div>
        <img
          :src="'/public/assets/images/' + personalDetails.img"
          alt="profile image"
          class="w-30 h-30 border-2 border-yellow-500 rounded-full"
        />
      </div>
      <h1 class="text-4xl font-bold">{{ personalDetails.name }}</h1>
      <p class="text-lg text-gray-400 mt-2">Full Stack Developer</p>
    </header>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Resume</h2>
      <p class="text-gray-300 leading-relaxed">
        Experienced developer with expertise in frontend and backend technologies
        including Vue.js, Laravel, Tailwind CSS, and more. Passionate about building
        clean, responsive, and efficient web applications.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Skills</h2>
      <ul class="space-y-4">
        <li
          v-for="skill in skills"
          :key="skill.name"
          :title="'Skill: ' + skill.name + ', Rating: ' + skill.rating"
          class="flex justify-between items-center hover:bg-gray-800 p-2 cursor-help"
        >
          <span>{{ skill.name }}</span>
          <div class="flex space-x-1">
            <i
              v-for="i in 5"
              :key="i"
              :class="[
                'fas fa-star',
                i <= skill.rating ? 'text-yellow-400' : 'text-gray-600',
              ]"
            ></i>
          </div>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
        Sample Projects
      </h2>
      <ul class="space-y-3">
        <li
          v-for="project in projects"
          :key="project.name"
          class="hover:bg-gray-800 p-3 rounded-lg transition"
        >
          <a :href="project.link" target="_blank" class="flex flex-col space-x-3">
            <div class="space-x-2">
              <i class="fas fa-link text-blue-400"></i>
              <span class="underline">{{ project.name }}</span>
            </div>

            <i class="text-gray-500">{{ project.description }}</i>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
