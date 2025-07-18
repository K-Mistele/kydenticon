import { generateIdenticonPng, generateIdenticonSvg } from "../identicon";

type NextjsRouteHandler =
	| ((
			req: Request,
			{ params }: { params: Promise<{ identifier: string }> },
	  ) => Response)
	| ((
			req: Request,
			{ params }: { params: Promise<{ identifier: string }> },
	  ) => Promise<Response>);

/**
 * Create a Next.js route handler for identicons.
 *
 * @param size - The size of the identicon.
 * @param pixelSize - The size of each pixel.
 * @param colors - The colors to use for the identicon.
 * @param padding - The padding around the identicon.
 * @param returnType - The type of identicon to return.
 * @returns A Next.js route handler.
 */
export function createIdenticonRouteHandler(
	size = 5,
	pixelSize = 20,
	colors: string[] = ["#34D399", "#F87171", "#60A5FA", "#FBBF24", "#C084FC"],
	padding = 0.2,
	returnType: "png" | "svg" = "png",
): NextjsRouteHandler {
	return async (
		_: Request,
		{ params }: { params: Promise<{ identifier: string }> },
	) => {
		const { identifier } = await params;

		if (returnType === "png") {
			const pngBuffer = generateIdenticonPng(
				identifier,
				size,
				pixelSize,
				padding,
				colors,
			);
			return new Response(new Uint8Array(pngBuffer), {
				status: 200,
				headers: {
					"Content-Type": "image/png",
					"Cache-Control": "public, max-age=31536000", // Cache for 1 year since identicons are deterministic
				},
			});
		}
		return new Response(
			generateIdenticonSvg(identifier, size, pixelSize, colors),
			{
				status: 200,
				headers: {
					"Content-Type": "image/svg+xml",
					"Cache-Control": "public, max-age=31536000", // Cache for 1 year since identicons are deterministic
				},
			},
		);
	};
}
