<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const skills = [
  { name: "HTML5", rating: 5 },
  { name: "CSS", rating: 4 },
  { name: "JavaScript", rating: 5 },
  { name: "TypeScript", rating: 3 },
  { name: "JAVA", rating: 4 },
  { name: "PHP", rating: 4 },
  { name: "Blade", rating: 4 },
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

const references = [
  {
    name: "Benjie Lenteria",
    role: "Proffesor/Supervisor",
  },
  {
    name: "Dr. Josefina Pangan",
    role: "CAST Dean/Supervisor",
  },
];

const personalDetails = {
  name: "Reinhard Esteban",
  img: "profile_img.jpg",
};
</script>

<template>
  <DefaultLayout>
    <div class="min-h-screen bg-black/90 text-white font-sans p-6">
      <header class="flex flex-col items-center mb-12 text-center">
        <div>
          <img
            :src="'/assets/images/' + personalDetails.img"
            alt="profile image"
            class="w-30 h-30 border-2 border-yellow-500 rounded-full"
          />
        </div>
        <h1 class="text-4xl font-bold">{{ personalDetails.name }}</h1>
        <p class="text-lg text-gray-400 mt-2">Full Stack Developer</p>
      </header>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Resume</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          A highly motivated <span class="font-semibold">fresh graduate</span> with a
          <span class="font-semibold">Bachelor of Science in Information Technology</span
          >, eager to apply my skills in real-world projects. I bring hands-on experience
          in both frontend and backend technologies, including Vue.js, Laravel, Tailwind
          CSS, and more. I'm passionate about crafting innovative, clean, and responsive
          web applications that solve real-world problems and make a meaningful impact.
        </p>
        <p class="text-gray-300 leading-relaxed">
          During my On-the-Job Training at
          <span class="font-semibold">Mater Dei College</span>, I had the exciting
          opportunity to contribute to a web application for the Human Resources Office.
          This project allowed me to help digitize and streamline HR processes, including
          leave and travel forms, and enhance the maintenance of the Personnel Control
          System (PCS).
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

      <!-- <section>
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          References
        </h2>

        <ul class="space-y-3">
          <li v-for="(ref, index) in references" :key="index">
            <span>{{ ref.name }}</span>
          </li>
        </ul>
      </section> -->
    </div>
  </DefaultLayout>
</template>
