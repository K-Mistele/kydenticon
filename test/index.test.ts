import { describe, expect, it } from "bun:test";
import {
	generateIdenticonPng,
	generateIdenticonSvg,
	generateRawIdenticonTable,
} from "../src";

describe("Kydenticon", () => {
	it("should generate raw identicon table", () => {
		const result = generateRawIdenticonTable("test@example.com");
		expect(result.table).toBeDefined();
		expect(result.color).toBeDefined();
		expect(result.table.length).toBe(5);
		expect(result.table[0]?.length).toBe(5);
		expect(result.color.length).toBe(3);
	});

	it("should generate consistent identicons for same input", () => {
		const result1 = generateRawIdenticonTable("test@example.com");
		const result2 = generateRawIdenticonTable("test@example.com");
		expect(result1.table).toEqual(result2.table);
		expect(result1.color).toEqual(result2.color);
	});

	it("should generate different identicons for different inputs", () => {
		const result1 = generateRawIdenticonTable("alice@example.com");
		const result2 = generateRawIdenticonTable("bob@example.com");
		expect(result1.table).not.toEqual(result2.table);
	});

	it("should generate SVG", () => {
		const svg = generateIdenticonSvg("test@example.com");
		expect(svg).toContain("<svg");
		expect(svg).toContain("</svg>");
		expect(svg).toContain("width=");
		expect(svg).toContain("height=");
	});

	it("should generate PNG buffer", () => {
		const png = generateIdenticonPng("test@example.com");
		expect(png).toBeInstanceOf(Buffer);
		expect(png.length).toBeGreaterThan(0);
		// Check PNG signature
		expect(png[0]).toBe(0x89);
		expect(png[1]).toBe(0x50);
		expect(png[2]).toBe(0x4e);
		expect(png[3]).toBe(0x47);
	});

	it("should respect custom colors", () => {
		const colors = ["#FF0000", "#00FF00", "#0000FF"];
		const result = generateRawIdenticonTable("test@example.com", 5, colors);
		expect(result.color).toBeDefined();
		// Color should be one of the provided colors (converted to 0-1 range)
		const isRedish =
			result.color[0] > 0.8 && result.color[1] < 0.2 && result.color[2] < 0.2;
		const isGreenish =
			result.color[0] < 0.2 && result.color[1] > 0.8 && result.color[2] < 0.2;
		const isBluish =
			result.color[0] < 0.2 && result.color[1] < 0.2 && result.color[2] > 0.8;
		expect(isRedish || isGreenish || isBluish).toBe(true);
	});
});
