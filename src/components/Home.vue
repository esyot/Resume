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
          <i
            title="A full-stack developer is skilled in both front-end and back-end development of web applications. They work on the user interface (using HTML, CSS, JavaScript, and frameworks like React or Vue) and the server-side (using technologies like MySQL, PHP, Node.js, and frameworks like Laravel). They also handle version control, APIs, deployment, and sometimes DevOps, making them capable of managing all layers of a web application."
            class="fas fa-circle-info hover:opacity-50 cursor-help"
          ></i>
        </div>
      </header>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Resume</h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          I am a passionate and results-driven developer,
          <span class="font-semibold">graduated from Mater Dei College</span> with a
          <span class="font-semibold">Bachelor of Science in Information Technology</span
          >. My expertise spans both frontend and backend development, with hands-on
          experience in <span class="text-yellow-400">Vue.js</span>,
          <span class="text-yellow-400">Laravel</span>,
          <span class="text-yellow-400">Tailwind CSS</span>, and other modern
          technologies. I thrive on building clean, responsive, and user-centric web
          applications that deliver real value.
        </p>
        <p class="text-gray-300 leading-relaxed mb-4">
          Throughout my academic and professional journey, I have actively contributed to
          diverse teams, helping to optimize workflows and achieve project goals. My
          collaborative approach enables me to bring fresh perspectives, streamline
          processes, and deliver innovative solutions that make a measurable impact.
        </p>
        <p class="text-gray-300 leading-relaxed mb-4">
          My On-the-Job Training (OJT) provided invaluable real-world experience, allowing
          me to work alongside industry professionals on live projects. This opportunity
          sharpened my technical abilities and strengthened my communication and teamwork
          skills.
        </p>
        <p class="text-gray-300 leading-relaxed mb-4">
          I have also completed specialized training and seminars in web development and
          software engineering, keeping me up-to-date with the latest industry trends and
          best practices. My commitment to continuous learning ensures I can quickly adapt
          to new technologies and deliver high-quality results.
        </p>
        <p class="text-gray-300 leading-relaxed">
          I am eager to contribute my skills and enthusiasm to forward-thinking teams,
          where I can help create impactful digital solutions and continue growing as a
          developer.
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
