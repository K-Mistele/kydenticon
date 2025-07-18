import Image from "next/image";

const users = [
	"alice@example.com",
	"bob@github.com",
	"charlie.dev",
	"diana.smith",
	"echo-user",
	"frank123",
];

export default function IdenticonDemo() {
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
					Kydenticon Next.js Examples
				</h1>

				<div className="space-y-12">
					{/* Using Next.js Image Component */}
					<section>
						<h2 className="text-2xl font-semibold mb-6 text-gray-800">
							Using Next.js{" "}
							<code className="bg-gray-200 px-2 py-1 rounded">next/image</code>
						</h2>
						<p className="text-gray-600 mb-4">
							The Next.js Image component provides optimizations like lazy
							loading, responsive images, and automatic format optimization.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
							{users.map((user) => (
								<div key={user} className="text-center">
									<Image
										src={`/identicon/${encodeURIComponent(user)}`}
										alt={`Avatar for ${user}`}
										width={100}
										height={100}
										className="rounded-lg shadow-md mx-auto"
										// Optional: Add placeholder for better UX
										placeholder="blur"
										blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyBHkFOTBcAn4QTzM3rtu1xINIRvXB0dGxl7QW6bH3kd6XNyRUfHKS2JV96kT6nNJZrlV6mMXqmHYV36FYcAXv"
									/>
									<p className="text-xs text-gray-600 mt-2 break-all">{user}</p>
								</div>
							))}
						</div>
					</section>

					{/* Using Regular IMG Tags */}
					<section>
						<h2 className="text-2xl font-semibold mb-6 text-gray-800">
							Using Regular{" "}
							<code className="bg-gray-200 px-2 py-1 rounded">&lt;img&gt;</code>{" "}
							Tags
						</h2>
						<p className="text-gray-600 mb-4">
							Regular img tags work perfectly and are simpler when you don't
							need Next.js optimizations. Great for when you want direct
							control.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
							{users.map((user) => (
								<div key={user} className="text-center">
									<img
										src={`/identicon/${encodeURIComponent(user)}`}
										alt={`Avatar for ${user}`}
										width={100}
										height={100}
										className="rounded-lg shadow-md mx-auto"
										loading="lazy" // Manual lazy loading
									/>
									<p className="text-xs text-gray-600 mt-2 break-all">{user}</p>
								</div>
							))}
						</div>
					</section>

					{/* SVG Examples */}
					<section>
						<h2 className="text-2xl font-semibold mb-6 text-gray-800">
							SVG Identicons (7×7 Grid)
						</h2>
						<p className="text-gray-600 mb-4">
							SVG identicons are scalable and perfect for icons that need to
							look crisp at any size.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
							{users.slice(0, 4).map((user) => (
								<div key={user} className="text-center">
									<Image
										src={`/identicon-svg/${encodeURIComponent(user)}`}
										alt={`SVG Avatar for ${user}`}
										width={120}
										height={120}
										className="rounded-lg shadow-md mx-auto"
									/>
									<p className="text-xs text-gray-600 mt-2 break-all">{user}</p>
								</div>
							))}
						</div>
					</section>

					{/* Different Sizes Demo */}
					<section>
						<h2 className="text-2xl font-semibold mb-6 text-gray-800">
							Different Sizes with Same User
						</h2>
						<p className="text-gray-600 mb-4">
							Same identicon at different sizes to show scalability.
						</p>
						<div className="flex items-end justify-center gap-4 flex-wrap">
							{[32, 48, 64, 96, 128].map((size) => (
								<div key={size} className="text-center">
									<img
										src={`/identicon/${encodeURIComponent("demo@example.com")}`}
										alt="Demo avatar"
										width={size}
										height={size}
										className="rounded shadow-md mx-auto"
									/>
									<p className="text-xs text-gray-600 mt-1">{size}px</p>
								</div>
							))}
						</div>
					</section>

					{/* Usage Code Examples */}
					<section>
						<h2 className="text-2xl font-semibold mb-6 text-gray-800">
							Code Examples
						</h2>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-medium mb-2">
									Next.js Image Component
								</h3>
								<pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
									{`import Image from 'next/image';

<Image
  src="/identicon/user@example.com"
  alt="User avatar"
  width={64}
  height={64}
  className="rounded-full"
/>`}
								</pre>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-2">Regular IMG Tag</h3>
								<pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
									{`<img
  src="/identicon/user@example.com"
  alt="User avatar"
  width="64"
  height="64"
  className="rounded-full"
  loading="lazy"
/>`}
								</pre>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-2">Dynamic URLs</h3>
								<pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
									{`// For user emails or usernames with special characters
const userEmail = "user@example.com";
const avatarUrl = \`/identicon/\${encodeURIComponent(userEmail)}\`;

// For SVG version
const svgUrl = \`/identicon-svg/\${encodeURIComponent(userEmail)}\`;`}
								</pre>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
