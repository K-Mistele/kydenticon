import { mkdirSync, writeFileSync } from "node:fs";
import { generateIdenticonPng } from "../src/identicon";

// Create examples directory if it doesn't exist
try {
	mkdirSync("examples/images", { recursive: true });
} catch (err) {
	// Directory might already exist
}

// Generate examples with different inputs
const examples = [
	{ name: "alice@example.com", filename: "alice" },
	{ name: "bob@github.com", filename: "bob" },
	{ name: "charlie.dev", filename: "charlie" },
	{ name: "diana.smith", filename: "diana" },
	{ name: "echo-user", filename: "echo" },
	{ name: "frank123", filename: "frank" },
];

// Generate default style examples
console.log("Generating default style examples...");
for (const example of examples) {
	const pngBuffer = generateIdenticonPng(example.name, 5, 20, 0.1);
	writeFileSync(`examples/images/${example.filename}.png`, pngBuffer);
	console.log(`Generated: ${example.filename}.png`);
}

// Generate custom color palette examples
console.log("\nGenerating custom color examples...");
const customColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
for (const example of examples.slice(0, 3)) {
	const pngBuffer = generateIdenticonPng(
		example.name,
		5,
		20,
		0.1,
		customColors,
	);
	writeFileSync(`examples/images/${example.filename}-custom.png`, pngBuffer);
	console.log(`Generated: ${example.filename}-custom.png`);
}

// Generate different sizes
console.log("\nGenerating different sizes...");
const sizes = [
	{ size: 3, pixelSize: 25, suffix: "3x3" },
	{ size: 7, pixelSize: 15, suffix: "7x7" },
	{ size: 9, pixelSize: 12, suffix: "9x9" },
];

for (const sizeConfig of sizes) {
	const pngBuffer = generateIdenticonPng(
		"demo@example.com",
		sizeConfig.size,
		sizeConfig.pixelSize,
		0.1,
	);
	writeFileSync(`examples/images/demo-${sizeConfig.suffix}.png`, pngBuffer);
	console.log(`Generated: demo-${sizeConfig.suffix}.png`);
}

console.log("\nAll examples generated successfully!");
