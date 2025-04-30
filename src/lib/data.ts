import { Talk } from "../types/talk";

export const SAMPLE_TALKS: Talk[] = [
  {
    id: 1,
    title: "Reactサーバーコンポーネントの未来",
    presenter: "Alex Johnson",
    email: "alex.j@example.com",
    duration: 10,
    topic: "React",
    description:
      "Reactサーバーコンポーネントの探求と、それがReactアプリケーションの構築方法をどのように変えるかについて。",
    status: "approved",
    date_submitted: "2025-01-15T12:00:00Z",
    image_url:
      "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    presentation_date: "2025-04-28",
    venue: "さいたまIT・WEB専門学校 PBLルーム",
    user_id: 1,
  },
  {
    id: 2,
    title: "アクセシブルなUIの構築",
    presenter: "Samantha Lee",
    email: "sams@example.com",
    duration: 15,
    topic: "Accessibility",
    description:
      "誰もが利用可能なWebアプリケーションを作成するためのベストプラクティス。",
    status: "approved",
    date_submitted: "2025-01-18T14:30:00Z",
    image_url:
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    presentation_date: "2025-04-28",
    venue: "さいたまIT・WEB専門学校 PBLルーム",
    user_id: 2,
  },
  {
    id: 3,
    title: "5分で最高のWebアプリをデプロイせよ",
    presenter: "lvncer",
    email: "siw23010025@class.siw.ac.jp",
    duration: 5,
    topic: "Next.js",
    description:
      "いかにNext.Jsが素晴らしいか、もはやWebアプリ開発において必須になりつつあるこれを、熱く語ろう。",
    status: "approved",
    date_submitted: "2025-04-20T09:15:00Z",
    image_url:
      "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    presentation_date: "2025-04-28",
    venue: "さいたまIT・WEB専門学校 PBLルーム",
    user_id: 3,
  },
];

export const TALK_IMAGE_URLS = [
  "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/7115104/pexels-photo-7115104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

export const TALK_VENUES = ["さいたまIT・WEB専門学校 PBLルーム", "その他"];

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
