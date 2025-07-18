export function hsvToRgb(
	h: number,
	s: number,
	v: number,
): [number, number, number] {
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
		default:
			return [0, 0, 0];
	}
}

/**
 * Parse a hex color code (with or without #) into RGB values in the range 0-1.
 */
export function parseHexColor(hexColor: string): [number, number, number] {
	// Remove # if present
	const hex = hexColor.replace("#", "");

	// Parse RGB components
	const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
	const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
	const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

	return [r, g, b];
}

/**
 * Deterministically select a color from the provided array based on the hash.
 */
export function selectColorFromPalette(
	hash: string,
	colors: string[],
): [number, number, number] {
	if (colors.length === 0) {
		// Fallback to a default color if no colors provided
		return [0.5, 0.5, 0.5]; // Gray
	}

	// Use first 6 hex characters from hash to get a number
	const hexValue = hash.substring(0, 6);
	const colorIndex = Number.parseInt(hexValue, 16) % colors.length;
	const selectedColor = colors[colorIndex];

	if (!selectedColor) {
		// Fallback to first color if selected index is somehow invalid
		return parseHexColor(colors[0]);
	}

	return parseHexColor(selectedColor);
}
