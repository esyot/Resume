export const projects = [
  {
    name: "CG's Travellers Inn",
    link: "https://travellers-inn.candgph.com/",
    description:
      "Replaced manual booking headaches with an automated, high-conversion room reservation system that captures direct tourist bookings 24/7 without third-party fees.",
    tech_stack: ["Laravel", "Vue", "Inertia"],
    full_details: `An all-in-one reservation and property management system built to transition a traditional inn into a modern, self-service hospitality hub. Key features include:

• **Multi-Service Reservation Engine**: A unified checkout flow that allows guests to book Rooms, guided local Tours, and bundled vacation Packages seamlessly.
• **Smart Date Filtering (Anti-Double Booking)**: A real-time availability algorithm that dynamically checks booked dates and locks out occupied slots, guaranteeing zero booking conflicts.
• **Integrated Payment Gateways**: Secure online payment integrations enabling guests to pay instantly using local e-wallets and major credit cards to secure their slots.
• **Real-Time Chat Support**: An instant messaging system that connects website visitors directly with the staff to resolve inquiries on the spot and drive conversions.
• **Robust Admin Panel**: A centralized dashboard designed for property owners to manage active reservations, handle customer messages in real-time, adjust room availability, and view performance analytics.

Leveraging the Inertia.js monolith bridge, this platform delivers the lightning-fast, reactive user experience of a single-page Vue application alongside the robust security and database integrity of Laravel.`,
    status: "Staging",
    statusColor: "blue",
    images: [
      "assets/images/projects/cgs-travellers-inn/1.png",
      "assets/images/projects/cgs-travellers-inn/2.png",
      "assets/images/projects/cgs-travellers-inn/3.png",
      "assets/images/projects/cgs-travellers-inn/4.png",
      "assets/images/projects/cgs-travellers-inn/5.png",
      "assets/images/projects/cgs-travellers-inn/6.png",
      "assets/images/projects/cgs-travellers-inn/7.png",
      "assets/images/projects/cgs-travellers-inn/8.png",
    ],
  },
  {
    name: "C&G Trading & Warehousing",
    link: "https://cgstravellersinn.onrender.com/",
    description:
      "Architected the migration of a legacy COBOL-based enterprise system into a modern web ecosystem—unifying fragmented warehouse logistics and real-time point-of-sale into a secure, single source of truth.",
    tech_stack: ["Laravel", "React", "Inertia"],
    status: "Staging",
    statusColor: "blue",
  },
  {
    name: "ScratchSQL",
    link: "https://scratch-sql.vercel.app/",
    description:
      "Solved the bottleneck of tedious database design by turning visual canvas schemas directly into production-ready Laravel migrations and raw SQL instantly.",
    tech_stack: ["Next.js", "Prisma", "Tailwind", "Shadcn/ui", "Supabase"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "Keith Kurlander",
    link: "https://keithkurlander.com/",
    description:
      "Engineered a high-performance personal brand platform that removed friction from the client onboarding funnel, directly scaling coaching inquiries and automated book sales.",
    tech_stack: ["WordPress", "Elementor"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC PRMS",
    link: "https://prop.materdeicollege.com",
    description:
      "Eliminated chaotic paperwork and scheduling conflicts by building a digital property reservation system that automates campus asset approval workflows.",
    tech_stack: ["Laravel", "Blade", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC SEC",
    link: "https://sec.materdeicollege.com",
    description:
      "Replaced disjointed communication channels with a centralized event coordination platform, preventing logistical clashes between student groups and administration.",
    tech_stack: ["Laravel", "Vue", "Inertia", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC HR",
    link: "https://hr.materdeicollege.com",
    description:
      "Digitized a legacy, paper-heavy Human Resources department, drastically reducing manual data entry errors and speeding up administrative employee requests.",
    tech_stack: ["Laravel", "Vue", "Inertia", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "FREECON",
    link: "https://freecon-one.vercel.app",
    description:
      "Created an open-source icon library to bypass restrictive assets licensing and heavy dependencies, giving developers a zero-overhead UI toolkit.",
    tech_stack: ["HTML"],
    status: "Shipped",
    statusColor: "green",
  },
];
