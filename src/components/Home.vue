<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { ref } from "vue";

const isShowPopup = ref(false);
const togglePopup = () => {
  isShowPopup.value = !isShowPopup.value;
};

const skills = [
  { name: "HTML5", rating: 5 },
  { name: "CSS", rating: 4 },
  { name: "JavaScript", rating: 5 },
  { name: "TypeScript", rating: 3 },
  { name: "Flutter", rating: 4 },
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
      "This website was created to assist students and teachers in Mater Dei College with their school events.",
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
    name: "Shryl Enriquez",
    role: "Proffesor",
    phone: "09991506636",
    email: "sherylenriquez30@gmail.com",
  },
  {
    name: "Benjie Lenteria",
    role: "Proffesor/Supervisor",
    phone: "09173035716",
    email: "hawkmanlentrix@gmail.com",
  },
  {
    name: "Dr. Josefina Pangan",
    role: "CAST Dean/Supervisor",
    phone: "",
    email: "j1fina@yahoo.com",
  },
];

const personalDetails = {
  name: "Reinhard U. Esteban",
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
        <div class="flex items-center space-x-2">
          <p class="text-lg text-gray-400 mt-2">Full Stack Developer</p>
          <div class="relative">
            <i
              @click="togglePopup"
              title="A full-stack developer is skilled in both front-end and back-end development of web applications. They work on the user interface (using HTML, CSS, JavaScript, and frameworks like React or Vue) and the server-side (using technologies like MySQL, PHP, Node.js, and frameworks like Laravel). They also handle version control, APIs, deployment, and sometimes DevOps, making them capable of managing all layers of a web application."
              class="fas fa-circle-info hover:opacity-50 cursor-help"
            ></i>

            <div
              v-if="isShowPopup"
              class="flex fixed inset-0 justify-center items-center"
              @click.self="togglePopup"
            >
              <div class="space-y-3">
                <button
                  @click="togglePopup"
                  class="rounded-full bg-white hover:opacity-50 cursor-pointer"
                >
                  <i class="fas fa-circle-xmark fa-2x text-yellow-500"></i>
                </button>
                <p
                  class="w-90 bg-gray-800 text-yellow-500 text-sm p-2 rounded-lg shadow-xl border border-white text-justify"
                >
                  A full-stack developer is a versatile professional proficient in both
                  front-end and back-end web development. On the front-end, they build
                  user interfaces using technologies like HTML, CSS, JavaScript, and
                  frameworks such as Vue.js or React. On the back-end, they develop
                  server-side logic, manage databases, and create APIs using tools like
                  PHP, Node.js, Laravel, or MySQL. Full-stack developers are also familiar
                  with version control systems (e.g., Git), deployment processes, and
                  often basic DevOps practices. Their broad skill set enables them to
                  design, implement, and maintain complete web applications from start to
                  finish, bridging the gap between user experience and server
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Background
        </h2>
        <p class="text-gray-300 leading-relaxed mb-2">
          I recently graduated from <span class="font-semibold">Mater Dei College</span>,
          earning a
          <span class="font-semibold">Bachelor of Science in Information Technology</span
          >. Throughout my studies, I gained hands-on experience in both frontend and
          backend development, working with technologies like
          <span class="text-yellow-400">Vue.js</span>,
          <span class="text-yellow-400">Laravel</span>,
          <span class="text-yellow-400">React</span>,
          <span class="text-yellow-400">Next.js</span>, and
          <span class="text-yellow-400">Inertia.js</span>.
        </p>
        <p class="text-gray-300 leading-relaxed mb-2">
          During my On-the-Job Training at the Human Resources Department of Mater Dei
          College, I developed a digital system to help manage and monitor employee leave
          and travel forms. I also enjoyed working on group projects and attending
          seminars, which helped me grow my technical skills and learn how to collaborate
          effectively.
        </p>
        <p class="text-gray-300 leading-relaxed">
          I am enthusiastic about learning new things and look forward to contributing my
          skills and energy in a professional setting.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Education
        </h2>
        <ul class="space-y-2">
          <li>
            <span class="font-bold">JAPeR Memorial High School</span> – ICT <br />
            <span class="text-gray-400 text-sm">Graduated: 2016</span>
          </li>
          <li>
            <span class="font-bold">San Agustin National High School</span> – TVL-ICT NC
            III<br />
            <span class="text-gray-400 text-sm">Graduated: 2019</span>
          </li>
          <li>
            <span class="font-bold">Mater Dei College</span> – Bachelor of Science in
            Information Technology<br />
            <span class="text-gray-400 text-sm">Graduated: 2025</span>
          </li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Skills</h2>
        <ul class="space-y-4 bg-gray-500/20 p-2 rounded-2xl">
          <li
            v-for="skill in skills"
            :key="skill.name"
            :title="'Skill: ' + skill.name + ', Rating: ' + skill.rating"
            class="flex hover:border justify-between items-center hover:scale-95 transition-transform duration-300 ease-in-out p-2 cursor-help"
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
                <i class="fas fa-link text-yellow-500"></i>
                <span class="underline">{{ project.name }}</span>
              </div>

              <i class="text-gray-500">{{ project.description }}</i>
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          References
        </h2>

        <ul class="space-y-3">
          <li
            v-for="(ref, index) in references"
            :key="index"
            class="flex flex-col space-y-1"
          >
            <span>
              <i class="fas fa-user text-yellow-500 mr-2"></i>
              {{ ref.name }}
            </span>
            <span v-if="ref.phone">
              <i class="fas fa-phone text-yellow-500 mr-2"></i>
              {{ ref.phone }}
            </span>
            <span>
              <i class="fas fa-envelope text-yellow-500 mr-2"></i>
              {{ ref.email }}
            </span>
          </li>
        </ul>
      </section>
    </div>
  </DefaultLayout>
</template>
