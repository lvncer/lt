import { Talk } from "../types/talk";

export const SAMPLE_TALKS: Talk[] = [
  {
    id: 1,
    title: "情報処理技術者試験の勉強法",
    presenter: "kuwaharu",
    email: "siw23010015@class.siw.ac.jp",
    duration: 10,
    topic: "Other",
    description: "情報処理技術者試験の勉強法について。",
    status: "approved",
    dateSubmitted: new Date("2025-01-18T14:30:00Z"),
    imageUrl:
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    presentationDate: "2025-05-30",
    venue: "さいたまIT・WEB専門学校 PBLルーム",
    userId: 2,
    fullname: "kuwaharu",
    hasPresentationUrl: false,
    presentationUrl: null,
    allowArchive: false,
    archiveUrl: null,
    presentationStartTime: null,
  },
  {
    id: 2,
    title: "最高のWebアプリをデプロイせよ",
    presenter: "lvncer",
    email: "siw23010025@class.siw.ac.jp",
    duration: 10,
    topic: "Next.js",
    description: "最高のWebアプリをデプロイするための方法について。",
    status: "approved",
    dateSubmitted: new Date("2025-04-20T09:15:00Z"),
    imageUrl:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    presentationDate: "2025-05-30",
    venue: "さいたまIT・WEB専門学校 PBLルーム",
    userId: 3,
    fullname: "高橋希尋",
    hasPresentationUrl: false,
    presentationUrl: null,
    allowArchive: false,
    archiveUrl: null,
    presentationStartTime: null,
  },
  {
    id: 3,
    title: "バックアップを取ろうとして失敗した話",
    presenter: "Kur0den",
    email: "siw23010015@class.siw.ac.jp",
    duration: 10,
    topic: "Other",
    description: "バックアップを取ろうとして失敗した話について。",
    status: "approved",
    dateSubmitted: new Date("2025-01-15T12:00:00Z"),
    imageUrl:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    presentationDate: "2025-05-30",
    venue: "さいたまIT・WEB専門学校 PBLルーム",
    userId: 1,
    fullname: "Kur0den",
    hasPresentationUrl: false,
    presentationUrl: null,
    allowArchive: false,
    archiveUrl: null,
    presentationStartTime: null,
  },
];

export const TALK_IMAGE_URLS = [
  "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/7115104/pexels-photo-7115104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

export const TALK_VENUES = [
  "さいたまIT・WEB専門学校 PBLルーム",
  "さいたまIT・WEB専門学校 2階PC演習室",
  "その他",
];

// Topics for the dropdown
export const TALK_TOPICS = [
  // フロントエンド
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "Svelte",
  "SvelteKit",
  "SolidJS",
  "TypeScript",
  "JavaScript",
  "CSS",
  "Tailwind CSS",
  "Styled Components",
  "Emotion",
  "Web Components",
  "Micro Frontends",
  "WebAssembly",
  "Astro",
  "Remix",
  "Qwik",

  // UI/UX・アクセシビリティ
  "Accessibility",
  "UX Design for Developers",
  "Design Systems",
  "Component Libraries",
  "Figma to Code",

  // パフォーマンス・最適化
  "Performance",
  "Web Vitals",
  "Lazy Loading",
  "Tree Shaking",
  "Code Splitting",
  "Bundle Optimization",

  // テスト・品質保証
  "Testing",
  "Jest",
  "React Testing Library",
  "Playwright",
  "Cypress",
  "Test-Driven Development",

  // バックエンド
  "Node.js",
  "Express",
  "Fastify",
  "NestJS",
  "Deno",
  "Bun",
  "GraphQL",
  "REST APIs",
  "gRPC",
  "WebSockets",

  // DevOps・CI/CD
  "DevOps",
  "CI/CD",
  "GitHub Actions",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Infrastructure as Code",
  "Monitoring with Prometheus",
  "Observability",

  // 認証・セキュリティ
  "Authentication",
  "OAuth 2.0",
  "JWT",
  "OpenID Connect",
  "Zero Trust Architecture",
  "Security Best Practices",

  // データ・データベース
  "SQL vs NoSQL",
  "PostgreSQL",
  "MongoDB",
  "Prisma ORM",
  "Edge Databases",
  "Data Modeling",
  "Real-time Data",

  // モバイル・クロスプラットフォーム
  "Mobile Development",
  "React Native",
  "Flutter",
  "Expo",
  "PWA",
  "Capacitor.js",

  // AI・ML・データサイエンス
  "AI/ML",
  "ChatGPT API",
  "LangChain",
  "Vector Databases",
  "Prompt Engineering",
  "LLM Apps",
  "RAG (Retrieval-Augmented Generation)",
  "TensorFlow.js",

  // フロント×AIの応用
  "AI-powered UI",
  "Voice Interfaces",
  "Smart Search",
  "Real-time Transcription",

  // その他の話題
  "Web3",
  "Blockchain for Developers",
  "Smart Contracts",
  "Decentralized Identity",
  "Ethical Coding",
  "Career in Tech",
  "Remote Work Productivity",
  "Developer Tooling",
  "Open Source Contributions",
  "Other",
];

// Duration options in minutes
export const TALK_DURATIONS = [5, 10, 15, 20];
