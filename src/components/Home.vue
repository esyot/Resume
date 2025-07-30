<script setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { ref } from "vue";

const isShowPopup = ref(false);
const togglePopup = () => {
  isShowPopup.value = !isShowPopup.value;
};

const skills = [
  { name: "HTML5", rating: 4 },
  { name: "CSS", rating: 4 },
  { name: "JavaScript", rating: 4 },
  { name: "TypeScript", rating: 3 },
  { name: "Flutter", rating: 4 },
  { name: "JAVA", rating: 4 },
  { name: "PHP", rating: 4 },
  { name: "Blade", rating: 4 },
  { name: "Vue.js", rating: 4 },
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
    name: "MDC HR",
    link: "https://hr.materdeicollege.com",
    description:
      "This website was created to assist the Human Resource Office in Mater Dei College.",
  },
  {
    name: "FREECON",
    link: "https://freecon-one.vercel.app",
    description:
      "FREECON is a user-friendly and flexible open-source icon library designed for developers",
  },
];

function formatPhone(phone) {
  return phone.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1-$2-$3");
}

const references = [
  {
    name: "Sheryl Enriquez",
    sex: "female",
    role: "Proffesor",
    phone: formatPhone("09991506636"),
    email: "sherylenriquez30@gmail.com",
  },
  {
    name: "Benjie Lenteria",
    sex: "male",
    role: "Proffesor/Supervisor",
    phone: formatPhone("09173035716"),
    email: "hawkmanlentrix@gmail.com",
  },
  {
    name: "Josefina J. Pangan",
    sex: "female",
    role: "CAST Dean/Supervisor",
    phone: formatPhone("09239113760"),
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
    <div
      class="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-yellow-800/80 text-white font-sans p-6"
    >
      <header
        class="slide-to-bottom flex flex-col sm:flex-row sm:items-start items-center justify-center space-x-4 mb-12 text-center"
      >
        <div>
          <img
            :src="'/assets/images/' + personalDetails.img"
            alt="profile image"
            class="w-30 h-30 border-2 border-yellow-500 sm:rounded rounded-full"
          />
        </div>

        <div class="flex flex-col items-center sm:items-start space-x-2">
          <h1 class="text-4xl font-bold">{{ personalDetails.name }}</h1>
          <div class="flex items-center space-x-2">
            <div>
              <p class="text-lg text-gray-400">Full Stack Web Developer</p>
            </div>

            <i
              @click="togglePopup"
              title="A full-stack developer is skilled in both front-end and back-end development of web applications. They work on the user interface (using HTML, CSS, JavaScript, and frameworks like React or Vue) and the server-side (using technologies like MySQL, PHP, Node.js, and frameworks like Laravel). They also handle version control, APIs, deployment, and sometimes DevOps, making them capable of managing all layers of a web application."
              class="freecon icon-info-circle cursor-help"
            ></i>
          </div>
        </div>
      </header>

      <div
        v-if="isShowPopup"
        class="flex fixed inset-0 justify-center items-center rounded-xl z-50"
        @click.self="togglePopup"
      >
        <div
          class="flex flex-col items-center gap-2 min-w-[300px] bg-gray-800 p-4 rounded-3xl shadow-md mx-2"
        >
          <p
            class="whitespace-normal max-w-100 text-yellow-500 text-sm p-2 rounded-lg text-justify"
          >
            A full-stack developer is a versatile professional proficient in both
            front-end and back-end web development. On the front-end, they build user
            interfaces using technologies like HTML, CSS, JavaScript, and frameworks such
            as Vue.js or React. On the back-end, they develop server-side logic, manage
            databases, and create APIs using tools like PHP, Node.js, Laravel, or MySQL.
            Full-stack developers are also familiar with version control systems (e.g.,
            Git), deployment processes, and often basic DevOps practices. Their broad
            skill set enables them to design, implement, and maintain complete web
            applications from start to finish, bridging the gap between user experience
            and server functionality.
          </p>

          <button
            @click="togglePopup"
            class="px-4 py-2 bg-yellow-500 rounded hover:opacity-50 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      <section class="slide-to-left mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-yellow-100/20 pb-2">
          Background
        </h2>
        <p class="text-gray-300 leading-relaxed mb-2">
          I am a web developer with five years of professional experience. I graduated
          from Mater Dei College with a
          <span class="font-semibold">Bachelor of Science in Information Technology</span
          >. I possess expertise in both frontend and backend development and working them
          together using <span class="text-yellow-400">Laravel </span>(backend) and
          <span class="text-yellow-400">Vue </span> (Front-end) or
          <span class="text-yellow-400">React </span>(Front-end) , using
          <span class="text-yellow-400">Inertia.js</span>.
        </p>

        <p class="text-gray-300 leading-relaxed">
          I am highly motivated to learn new technologies and am eager to contribute my
          skills and enthusiasm in a professional environment. Also open to taking on web
          development projects and would be happy to discuss potential collaborations.
        </p>
      </section>

      <section class="slide-to-right mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-yellow-100/20 pb-2">
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

      <section class="slide-to-top mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-yellow-100/20 pb-2">
          Skills
        </h2>
        <ul class="space-y-4 bg-gray-500/20 p-2 rounded-2xl shadow-md">
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
                  'freecon icon-star icon-xl',
                  i <= skill.rating ? 'icon-yellow-500' : 'icon-gray-600',
                ]"
              ></i>
            </div>
          </li>
        </ul>
      </section>

      <section class="slide-to-left">
        <h2 class="text-2xl font-semibold mb-4 border-b border-yellow-100/20 pb-2">
          Sample Projects
        </h2>
        <ul class="space-y-3">
          <li
            v-for="project in projects"
            :key="project.name"
            class="hover:bg-gray-800/50 p-3 rounded-lg transition"
            :title="project.description + ' Click to view.'"
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

      <section class="slide-to-right">
        <h2 class="text-2xl font-semibold mb-4 border-b border-yellow-100/20 pb-2">
          References
        </h2>

        <div class="overflow-x-auto">
          <div class="flex space-x-6">
            <div
              v-for="(ref, index) in references"
              :key="index"
              class="min-w-[250px] bg-gay-800 rounded-2xl shadow-2xl p-6 flex-shrink-0 flex flex-col space-y-3 border-2 border-yellow-400 hover:scale-90 transition-transform duration-300 relative overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 m-2 flex items-center justify-center pointer-events-none"
              >
                <i class="freecon icon-info-circle icon-yellow-500"></i>
              </div>

              <span
                class="font-extrabold text-xl flex items-center text-yellow-300 drop-shadow"
              >
                <i
                  :class="'freecon' + ' icon-user-' + ref.sex + ' icon-yellow-400 mr-2'"
                ></i>
                {{ ref.name }}
              </span>
              <span class="flex items-center text-yellow-200 font-semibold">
                <i class="freecon icon-briefcase icon-yellow-400 mr-2"></i>
                {{ ref.role }}
              </span>
              <span v-if="ref.phone" class="flex items-center text-gray-200">
                <i class="freecon icon-phone icon-yellow-400 mr-2"></i>
                {{ ref.phone }}
              </span>
              <span class="flex items-center text-gray-200">
                <i class="freecon icon-envelope icon-yellow-400 mr-2"></i>
                {{ ref.email }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </DefaultLayout>
</template>
