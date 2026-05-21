import Image from "next/image";

const techLogos = [
	{
		name: "React",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
	},
	{
		name: "Next.js",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
	},
	{
		name: "TypeScript",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
	},
	{
		name: "JavaScript",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
	},
	{
		name: "Node.js",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
	},
	{
		name: "Python",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
	},
	{
		name: "Go",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
	},
	{
		name: "Rust",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
	},
	{
		name: "Docker",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
	},
	{
		name: "Kubernetes",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
	},
	{
		name: "PostgreSQL",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
	},
	{
		name: "MySQL",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
	},
	{
		name: "MongoDB",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
	},
	{
		name: "Redis",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
	},
	{
		name: "GraphQL",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
	},
	{
		name: "Tailwind CSS",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
	},
	{
		name: "Figma",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
	},
	{
		name: "Git",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
	},
	{
		name: "Linux",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
	},
	{
		name: "Vue.js",
		src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
	},
];

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
	return (
		<div
			aria-hidden={ariaHidden}
			className="flex min-w-max shrink-0 items-center gap-4 pr-4"
		>
			{techLogos.map((logo) => (
				<div
					key={logo.name}
					className="flex h-24 w-36 items-center justify-center rounded-2xl border border-border bg-card/80 px-6 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
				>
					<Image
						src={logo.src}
						alt={ariaHidden ? "" : `${logo.name} logo`}
						width={56}
						height={56}
						className="h-14 w-14 object-contain"
					/>
					<span className="sr-only">{logo.name}</span>
				</div>
			))}
		</div>
	);
}

export default function PopularTopics() {
	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				<div className="text-center mb-20">
					<h2 className="text-3xl lg:text-5xl font-normal tracking-wide mb-8">
						Popular topics & technologies
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						ライトニングトークでよく取り上げられるトピックや技術スタックです。
					</p>
				</div>
			</div>

			<div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
				<div className="flex w-max animate-logo-marquee hover:[animation-play-state:paused]">
					<LogoRow />
					<LogoRow ariaHidden />
				</div>
			</div>
		</section>
	);
}
