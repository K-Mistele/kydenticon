import { createIdenticonRouteHandler } from "kydenticon";

// SVG version with different settings
export const GET = createIdenticonRouteHandler(
	7, // 7x7 grid for more detail
	15, // 15px per pixel
	["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"], // Purple/teal theme
	0.15, // 15% padding
	"svg", // SVG format
);

// This creates an SVG endpoint at /identicon-svg/[identifier]
// SVGs are great for:
// - Scalability without quality loss
// - Smaller file sizes for simple patterns
// - Easy styling with CSS
