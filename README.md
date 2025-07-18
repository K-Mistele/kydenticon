# Kydenticon

The easiest way to create beautiful GitHub-style identicons in Node.js and TypeScript.

Kydenticon generates deterministic, symmetric identicons from any string input (usernames, emails, hashes, etc.) with beautiful color palettes and multiple output formats.

## ✨ Features

- 🎨 **Beautiful Identicons**: Generate symmetric, visually appealing identicons
- 🔄 **Deterministic**: Same input always produces the same identicon
- 🎭 **Multiple Formats**: SVG and PNG output support
- 🎨 **Custom Colors**: Use your own color palettes
- 📏 **Configurable**: Adjust size, pixel size, and padding
- 🚀 **Zero Dependencies**: Pure TypeScript with built-in PNG encoding
- ⚡ **Fast**: Optimized algorithms for quick generation
- 🔧 **Next.js Ready**: Built-in route handlers for web apps
- 🏗️ **Built with Bun**: Modern TypeScript tooling

## 📸 Examples

### Default Style
These identicons use the built-in algorithmic color generation:

| Input | Identicon |
|-------|-----------|
| `alice@example.com` | ![Alice](examples/images/alice.png) |
| `bob@github.com` | ![Bob](examples/images/bob.png) |
| `charlie.dev` | ![Charlie](examples/images/charlie.png) |
| `diana.smith` | ![Diana](examples/images/diana.png) |
| `echo-user` | ![Echo](examples/images/echo.png) |
| `frank123` | ![Frank](examples/images/frank.png) |

### Custom Color Palette
Same inputs with a custom color palette `["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"]`:

| Input | Identicon |
|-------|-----------|
| `alice@example.com` | ![Alice Custom](examples/images/alice-custom.png) |
| `bob@github.com` | ![Bob Custom](examples/images/bob-custom.png) |
| `charlie.dev` | ![Charlie Custom](examples/images/charlie-custom.png) |

### Different Sizes
Examples showing different grid sizes:

| Size | Identicon |
|------|-----------|
| 3×3 grid | ![3x3](examples/images/demo-3x3.png) |
| 5×5 grid (default) | ![5x5](examples/images/alice.png) |
| 7×7 grid | ![7x7](examples/images/demo-7x7.png) |
| 9×9 grid | ![9x9](examples/images/demo-9x9.png) |

## 📦 Installation

```bash
bun add kydenticon
```

Or with npm:
```bash
npm install kydenticon
```

## 🚀 Quick Start

```typescript
import { generateIdenticonPng, generateIdenticonSvg } from 'kydenticon';
import { writeFileSync } from 'fs';

// Generate a PNG identicon
const pngBuffer = generateIdenticonPng('user@example.com');
writeFileSync('identicon.png', pngBuffer);

// Generate an SVG identicon
const svgString = generateIdenticonSvg('user@example.com');
console.log(svgString);
```

## 📚 API Reference

### Core Functions

#### `generateIdenticonPng(idcode, size?, pixelSize?, padding?, colors?)`

Generates an identicon as a PNG Buffer.

**Parameters:**
- `idcode: string` - The input string (email, username, hash, etc.)
- `size?: number` - Grid size (default: 5)
- `pixelSize?: number` - Size of each pixel in the grid (default: 20)
- `padding?: number` - Padding as a percentage of the identicon size (default: 0)
- `colors?: string[]` - Custom color palette as hex strings

**Returns:** `Buffer` - PNG image data

**Example:**
```typescript
// Basic usage
const png = generateIdenticonPng('user@example.com');

// With custom settings
const customPng = generateIdenticonPng(
  'user@example.com',
  7,              // 7x7 grid
  25,             // 25px per pixel
  0.1,            // 10% padding
  ['#FF6B6B', '#4ECDC4', '#45B7D1'] // Custom colors
);
```

#### `generateIdenticonSvg(idcode, size?, pixelSize?, colors?)`

Generates an identicon as an SVG string.

**Parameters:**
- `idcode: string` - The input string
- `size?: number` - Grid size (default: 5)
- `pixelSize?: number` - Size of each pixel (default: 20)
- `colors?: string[]` - Custom color palette

**Returns:** `string` - SVG markup

**Example:**
```typescript
const svg = generateIdenticonSvg('user@example.com', 5, 20, ['#FF0000', '#00FF00']);
```

#### `generateRawIdenticonTable(idcode, size?, colors?)`

Generates the raw identicon data (pattern table and color).

**Parameters:**
- `idcode: string` - The input string
- `size?: number` - Grid size (default: 5)
- `colors?: string[]` - Custom color palette

**Returns:** 
```typescript
{
  table: number[][];           // 2D array of 0s and 1s
  color: [number, number, number]; // RGB values (0-1 range)
}
```

**Example:**
```typescript
const { table, color } = generateRawIdenticonTable('user@example.com');
console.log('Pattern:', table);
console.log('Color (RGB 0-1):', color);
```

### Next.js Integration

#### `createIdenticonRouteHandler(size?, pixelSize?, colors?, padding?, returnType?)`

Creates a Next.js App Router route handler for serving identicons.

**Parameters:**
- `size?: number` - Grid size (default: 5)
- `pixelSize?: number` - Pixel size (default: 20)
- `colors?: string[]` - Custom colors (default: predefined palette)
- `padding?: number` - Padding percentage (default: 0.2)
- `returnType?: 'png' | 'svg'` - Output format (default: 'png')

**Example:**
```typescript
// app/identicon/[identifier]/route.ts
import { createIdenticonRouteHandler } from 'kydenticon';

export const GET = createIdenticonRouteHandler(
  5,    // 5x5 grid
  20,   // 20px per pixel
  ['#FF6B6B', '#4ECDC4', '#45B7D1'], // Custom colors
  0.1,  // 10% padding
  'png' // PNG format
);
```

Then access identicons at: `/identicon/user@example.com`

## 🎨 Color Palettes

### Default Algorithmic Colors
When no custom colors are provided, Kydenticon uses a sophisticated algorithm to generate colors based on the input string's hash, ensuring:
- Consistent colors for the same input
- Good contrast and readability
- Pleasing color combinations

### Custom Color Palettes
Provide an array of hex color strings to use a custom palette:

```typescript
const retroColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const neonColors = ['#FF073A', '#39FF14', '#00FFFF', '#FF6600', '#8A2BE2'];
const earthyColors = ['#8B4513', '#228B22', '#DAA520', '#800080', '#FF4500'];

const png = generateIdenticonPng('user@example.com', 5, 20, 0.1, retroColors);
```

## 🔧 Advanced Usage

### Creating Profile Pictures
```typescript
import { generateIdenticonPng } from 'kydenticon';

function createUserAvatar(email: string, size: number = 128) {
  const pixelSize = Math.floor(size / 5); // Adjust for desired final size
  return generateIdenticonPng(email, 5, pixelSize, 0.1);
}

const avatar = createUserAvatar('john.doe@example.com', 128);
```

### Batch Generation
```typescript
const users = ['alice@example.com', 'bob@example.com', 'charlie@example.com'];
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

const identicons = users.map(user => ({
  email: user,
  png: generateIdenticonPng(user, 5, 20, 0.1, colors),
  svg: generateIdenticonSvg(user, 5, 20, colors)
}));
```

### Using with Express.js
```typescript
import express from 'express';
import { generateIdenticonPng } from 'kydenticon';

const app = express();

app.get('/identicon/:id', (req, res) => {
  const png = generateIdenticonPng(req.params.id, 5, 20, 0.1);
  res.set('Content-Type', 'image/png');
  res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
  res.send(png);
});
```

## 🏗️ Development

### Setup
```bash
# Clone the repository
git clone https://github.com/K-Mistele/kydenticon.git
cd kydenticon

# Install dependencies
bun install

# Run tests
bun test

# Build the library
bun run build

# Generate examples (for documentation)
bun examples/generate-examples.ts
```

### Project Structure
```
kydenticon/
├── src/
│   ├── identicon.ts    # Core identicon generation
│   ├── colors.ts       # Color utilities
│   ├── next/           # Next.js integration
│   └── index.ts        # Main exports
├── test/
│   └── index.test.ts   # Test suite
├── examples/
│   ├── generate-examples.ts  # Example generation script
│   └── images/              # Generated example images
└── dist/               # Built output
```

## 🤔 How It Works

Kydenticon uses a deterministic algorithm to generate identicons:

1. **Hashing**: Creates SHA-512 hashes of the input string
2. **Pattern Generation**: Uses hash bits to create a symmetric 2D pattern
3. **Color Calculation**: Derives colors from hash or selects from custom palette
4. **Rendering**: Outputs as SVG strings or PNG buffers with native encoding

The algorithm ensures:
- **Deterministic**: Same input always produces the same result
- **Symmetric**: Patterns are mirrored for visual appeal
- **Diverse**: Different inputs produce visually distinct results
- **Scalable**: Works well at any grid size

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [GitHub Repository](https://github.com/K-Mistele/kydenticon)
- [NPM Package](https://www.npmjs.com/package/kydenticon)
- [Issues](https://github.com/K-Mistele/kydenticon/issues)
