import { createIdenticonRouteHandler } from "kydenticon";

// Create identicon route handler with custom settings
export const GET = createIdenticonRouteHandler(
	5, // 5x5 grid
	20, // 20px per pixel
	["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"], // Custom colors
	0.1, // 10% padding
	"png", // PNG format
);

// This creates an endpoint at /identicon/[identifier]
// Examples:
// - /identicon/user@example.com
// - /identicon/john.doe
// - /identicon/user123
