const express = require("express");
const { generateIdenticonPng, generateIdenticonSvg } = require("kydenticon");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (for our demo page)
app.use(express.static("public"));

// PNG Identicon endpoint
app.get("/identicon/:identifier", (req, res) => {
	try {
		const { identifier } = req.params;

		// Custom color palette
		const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

		// Generate PNG identicon
		const pngBuffer = generateIdenticonPng(
			decodeURIComponent(identifier), // Decode URL-encoded identifier
			5, // 5x5 grid
			20, // 20px per pixel
			0.1, // 10% padding
			colors,
		);

		// Set headers for caching and content type
		res.set({
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000", // Cache for 1 year
			ETag: `"${identifier}"`, // Simple ETag based on identifier
		});

		res.send(pngBuffer);
	} catch (error) {
		console.error("Error generating identicon:", error);
		res.status(500).send("Error generating identicon");
	}
});

// SVG Identicon endpoint
app.get("/identicon-svg/:identifier", (req, res) => {
	try {
		const { identifier } = req.params;

		// Different color palette for SVG
		const colors = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

		// Generate SVG identicon
		const svgString = generateIdenticonSvg(
			decodeURIComponent(identifier),
			7, // 7x7 grid for more detail
			15, // 15px per pixel
			colors,
		);

		// Set headers
		res.set({
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=31536000",
			ETag: `"${identifier}"`,
		});

		res.send(svgString);
	} catch (error) {
		console.error("Error generating SVG identicon:", error);
		res.status(500).send("Error generating SVG identicon");
	}
});

// Demo page
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
	console.log(
		`🚀 Kydenticon Express server running on http://localhost:${PORT}`,
	);
	console.log(
		`📸 PNG identicons: http://localhost:${PORT}/identicon/user@example.com`,
	);
	console.log(
		`🎨 SVG identicons: http://localhost:${PORT}/identicon-svg/user@example.com`,
	);
});
