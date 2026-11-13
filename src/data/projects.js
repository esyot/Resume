export const projects = [
  {
    name: "Multi-Branch Business ERP & POS",
    live: "",
    private: true, // no public link — case study only
    repo: null,
    featured: true,
    thumbnail: "assets/images/projects/pos/1.png",
    role: "Sole developer / architect",
    duration: "8 months",
    // TODO: replace with your real numbers
    metrics: [
      "9 branches synced",
      "Change-only sync (SymmetricDS-inspired)",
      "Full offline-first operation",
    ],
    description:
      "Offline-first multi-branch ERP + POS where each branch runs independently and syncs only changed rows to a central hub when connectivity returns.",
    tech_stack: ["Laravel", "Inertia.js", "React", "TypeScript", "Shadcn/UI"],
    full_details: `A business ERP and point-of-sale platform engineered for multi-branch retail operations. Each branch runs a fully independent deployment on its own local server or PC, while a central main hub coordinates synchronization. Key features include:

- **Independent Branch Deployments**: Every branch operates on its own local server/PC with full offline capability, so sales, stock, and operations keep running even without internet access.
- **Main Hub → Branch Integration**: A central main hub listens for incoming branch changes, receiving and reconciling updates from every branch location into a unified view.
- **Dedicated Change-Sync Engine**: A sync engine inspired by SymmetricDS uses triggers that capture only changed rows. When a branch PC regains internet connectivity, it waits for the connection and then sends only those changes as a query to the main hub — minimizing bandwidth and avoiding full re-syncs.
- **Granular Inventory & Stock Tracking**: Tracks product variants, serial numbers, reorder thresholds, low-stock alerts, and batch lifecycles with automated stock reconciliation to prevent inventory leakage and over-selling.
- **Unified POS & Sales Engine**: A fast, intuitive point-of-sale interface optimized for high-volume transactions, supporting digital receipts, split payments, customer loyalty tracking, and local-first operation with deferred sync.
- **Multi-User Access Control & RBAC**: Advanced role-based permissions framework featuring fine-grained resource access, secure onboarding pipelines, and comprehensive user action audit logs.

Built with Laravel, Inertia.js, and React over a relational database, the platform delivers a reactive single-page experience while guaranteeing transactional integrity at each branch and reliable, change-only synchronization to the main hub.`,
    status: "Shipped",
    statusColor: "green",
    images: [
      "assets/images/projects/pos/1.png",
      "assets/images/projects/pos/2.png",
      "assets/images/projects/pos/3.png",
      "assets/images/projects/pos/4.png",
      "assets/images/projects/pos/5.png",
      "assets/images/projects/pos/6.png",
      "assets/images/projects/pos/7.png",
      "assets/images/projects/pos/8.png",
      "assets/images/projects/pos/9.png",
    ],
  },
  {
    name: "ScratchSQL",
    live: "https://scratch-sql.vercel.app/",
    repo: null, // TODO: link if public
    featured: true,
    thumbnail: "assets/images/projects/scratch-sql/1.png",
    role: "Full-stack developer",
    duration: "3 months",
    metrics: [
      "AI schema generation",
      "Instant Laravel + SQL export",
      "Real-time collaborative canvas",
    ],
    description:
      "Visual ERD canvas + AI copilot that turns database designs into production-ready Laravel migrations and raw SQL in seconds.",
    full_details: `A collaborative AI canvas designed for senior development teams to visually architect, discuss, and refine database structures in real time. Key features include:

• **Interactive ERD Canvas**: A flexible drag-and-drop workspace to build entity-relationship diagrams, complete with customizable table boxes, field data types, constraints, and visual relationship connectors.
• **AI Schema Copilot**: An intelligent assistant that generates, optimizes, and refines complex database schemas on the fly based on natural language prompts and design discussions.
• **Instant Code Export**: A multi-format code generator that transforms your visual diagram into clean, ready-to-deploy Laravel migrations, raw SQL scripts, and schema definitions in seconds.
• **Real-Time Team Collaboration**: A shared canvas environment enabling engineering leads and architects to map relationships, resolve design bottlenecks, and align on database architecture together.
• **Granular Schema Control**: Full precision over table attributes, primary/foreign key indexes, nullable constraints, and cascade behaviors with an intuitive control panel.

Engineered to bridge high-level architecture discussions and code generation, Scratch SQL turns database modeling into a seamless visual and AI-assisted workflow.`,
    tech_stack: ["Next.js", "Prisma", "Tailwind", "Shadcn/ui", "Supabase"],
    status: "Shipped",
    statusColor: "green",
    images: [
      "assets/images/projects/scratch-sql/1.png",
      "assets/images/projects/scratch-sql/2.png",
      "assets/images/projects/scratch-sql/3.png",
      "assets/images/projects/scratch-sql/4.png",
      "assets/images/projects/scratch-sql/5.png",
    ],
  },
  {
    name: "Chicky",
    live: "https://chicky-drab.vercel.app/",
    repo: null, // Add if public
    featured: true,
    // The most visually impressive dashboard for the homepage card
    thumbnail: "assets/images/projects/chicky/1.png",
    role: "Full-stack developer",
    duration: "2 months",
    metrics: [
      "Multi-tenant farm isolation",
      "Live RTSP video monitoring",
      "Automated financial ledger",
      "AI-driven yield insights",
    ],
    description:
      "Granular, multi-tenant poultry management platform featuring live CCTV monitoring, automated financial ledgers, and AI-driven yield analytics.",
    tech_stack: ["Next.js", "Prisma", "Neon DB", "Tailwind CSS", "Shadcn/UI"],
    full_details: `A comprehensive multi-site poultry management application engineered to replace manual farm logs with precise, relational tracking across sites, cages, individual birds, and egg yields. Key features include:

• **Multi-Tenant Farm Isolation**: Enables users to create and manage isolated operational sites mapped directly to specific locations and site codes, complete with role-based access control (Admin, User) and automated onboarding pipelines.
• **Live Video Monitoring & Streams**: Integrated RTSP live-streaming and cloud-recorded video playback, allowing farm operators to monitor flock activity and security directly from the dashboard.
• **Nested Cage & Door Matrix**: Implements a granular structural hierarchy mapping physical facility units (\`Cage\`) to individual door compartments (\`CageDoor\`) for precise bird housing and yield tracking.
• **Granular Egg Yield & Inventory Tracking**: Features real-time yield tracking per cage door, customizable size classifications (Jumbo, XL, Large, Medium, Small, Pullets), tray management, and detailed breakdowns of untrayed stock vs. active trays.
• **AI Yield Analytics & Insights**: Features a "Learning Curve" dashboard comparing actual cumulative yield vs. optimal benchmarks, automatically flagging low-yield doors and providing actionable operational insights (e.g., feed distribution or bird age warnings).
• **Financial Ledger & POS**: A complete financial dashboard to record sales (by tray or loose egg), track expenses (feeds, supplies, medicine), and view consolidated monthly revenue vs. expense analytics.
• **Individual Bird Tracking**: Tracks individual chickens via unique registration codes (e.g., \`CHK-145\`), assigning them to specific cage doors alongside lifecycle delivery timestamps and dynamic age brackets.

Powered by Next.js and Prisma ORM over a relational PostgreSQL architecture, this system ensures strict data integrity across complex nested relationships while maintaining lightning-fast performance for field operations.`,
    status: "Shipped",
    statusColor: "green",
    images: [
      "assets/images/projects/chicky/1.png",
      "assets/images/projects/chicky/5.png",
      "assets/images/projects/chicky/12.png",
      "assets/images/projects/chicky/10.png",
      "assets/images/projects/chicky/2.png",
      "assets/images/projects/chicky/14.png",
      "assets/images/projects/chicky/13.png",
      "assets/images/projects/chicky/11.png",
      "assets/images/projects/chicky/6.png",
      "assets/images/projects/chicky/7.png",
      "assets/images/projects/chicky/9.png",
      "assets/images/projects/chicky/8.png",
    ],
  },
  {
    name: "Buzyness",
    live: "https://buzyness.netlify.app/",
    repo: null,
    featured: false,
    thumbnail: null,
    role: "Full-stack developer",
    duration: "1 month",
    metrics: [
      "Read-only API integrations (privacy-first)",
      "Multi-business dashboard",
      "<2 min setup per business",
    ],
    description:
      "Privacy-first financial dashboard consolidating sales and expenses across multiple apps via read-only public APIs — no database credentials required.",
    tech_stack: [
      "React",
      "TanStack Start",
      "Tailwind CSS",
      "Shadcn/UI",
      "Neon",
    ],
    full_details: `A centralized financial monitoring workspace designed for founders and multi-app operators to track revenue streams and operational costs without compromising sensitive data. Key features include:

• **Unified Portfolio Dashboard**: Aggregates total net revenue, combined expenses, and active venture metrics into a single real-time overview.
• **Privacy-First API Integration**: Connects directly via read-only public Sales and Expenses API endpoints, eliminating the need for database credentials or sensitive banking access.
• **Multi-Business Sync**: Streamlines tracking across diverse apps, e-commerce stores, and SaaS products in under two minutes per connection.
• **Comparative Financial Insights**: Monitors daily cash flow, combined overhead, and profit margins to optimize resource allocation across all connected ventures.
• **Streamlined 3-Step Setup**: Features a frictionless workflow to expose public endpoints, link API keys to workspace dashboards, and instantly view consolidated financial analytics.

Built with TanStack Router, React, and Shadcn/UI components, the application delivers a modern, responsive interface with high-performance visualization capabilities.`,
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC PRMS",
    live: "https://prop.materdeicollege.com",
    repo: null,
    featured: false,
    thumbnail: null,
    role: "Full-stack developer",
    duration: "2 months",
    metrics: ["Automated approval workflows", "Campus-wide asset management"],
    description:
      "Digital property reservation system that automates campus asset approval workflows and eliminates scheduling conflicts.",
    tech_stack: ["Laravel", "Blade", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC SEC",
    live: "https://sec.materdeicollege.com",
    repo: null,
    featured: false,
    thumbnail: null,
    role: "Full-stack developer",
    duration: "2 months",
    metrics: ["Centralized event coordination", "Prevents scheduling clashes"],
    description:
      "Centralized event coordination platform preventing logistical clashes between student groups and administration.",
    tech_stack: ["Laravel", "Vue", "Inertia", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "MDC HR",
    live: "https://hr.materdeicollege.com",
    repo: null,
    featured: false,
    thumbnail: null,
    role: "Full-stack developer",
    duration: "3 months",
    metrics: [
      "Digitized paper-heavy HR workflows",
      "Reduced manual data-entry errors",
    ],
    description:
      "Digitized a legacy, paper-heavy HR department — cutting manual data-entry errors and speeding up employee requests.",
    tech_stack: ["Laravel", "Vue", "Inertia", "Tailwind"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "Keith Kurlander",
    live: "https://keithkurlander.com/",
    repo: null,
    featured: false,
    thumbnail: null,
    role: "Front-end developer",
    duration: "1 month",
    metrics: ["High-performance brand platform", "Automated book-sales funnel"],
    description:
      "High-performance personal brand platform that removed friction from the client onboarding funnel — scaling coaching inquiries and automated book sales.",
    tech_stack: ["WordPress", "Elementor"],
    status: "Shipped",
    statusColor: "green",
  },
  {
    name: "FREECON",
    live: "https://freecon-one.vercel.app",
    repo: "https://github.com/esyot",
    featured: false,
    thumbnail: null,
    role: "Creator / maintainer",
    duration: "Ongoing",
    metrics: ["Open-source icon library", "Zero-dependency, license-free"],
    description:
      "Open-source icon library built to bypass restrictive asset licensing and heavy dependencies — a zero-overhead UI toolkit for developers.",
    tech_stack: ["HTML"],
    status: "Shipped",
    statusColor: "green",
  },
];
