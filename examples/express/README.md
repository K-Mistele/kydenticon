# Kydenticon Express.js Example

A simple Express.js server that demonstrates how to serve identicons using Kydenticon.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

3. **Visit the demo:**
   Open http://localhost:3000 in your browser

## 🔗 API Endpoints

### PNG Identicons
- **URL**: `/identicon/:identifier`
- **Example**: http://localhost:3000/identicon/user@example.com
- **Format**: PNG
- **Settings**: 5×5 grid, custom color palette

### SVG Identicons  
- **URL**: `/identicon-svg/:identifier`
- **Example**: http://localhost:3000/identicon-svg/user@example.com
- **Format**: SVG
- **Settings**: 7×7 grid, purple/teal theme

### Health Check
- **URL**: `/health`
- **Returns**: Server status and timestamp

## 📁 File Structure

```
examples/express/
├── server.js          # Express.js server with identicon routes
├── public/
│   └── index.html     # Demo page with examples
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## 🎨 Customization

### Modify Colors
Edit the color arrays in `server.js`:

```javascript
// PNG endpoint colors
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

// SVG endpoint colors  
const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
```

### Adjust Settings
Modify the generation parameters:

```javascript
const pngBuffer = generateIdenticonPng(
  identifier,
  5,     // Grid size (3-15)
  20,    // Pixel size
  0.1,   // Padding (0-0.5) 
  colors // Color palette
);
```

## 🔧 Production Considerations

### Caching
The example includes basic caching headers:
```javascript
res.set({
  'Cache-Control': 'public, max-age=31536000', // 1 year
  'ETag': `"${identifier}"`
});
```

### Error Handling
Add proper error handling for production:
```javascript
app.get('/identicon/:identifier', (req, res) => {
  try {
    // ... generation code
  } catch (error) {
    console.error('Error generating identicon:', error);
    res.status(500).json({ error: 'Failed to generate identicon' });
  }
});
```

### Rate Limiting
Consider adding rate limiting for production:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/identicon', limiter);
```

### Input Validation
Add validation for identifiers:
```javascript
app.get('/identicon/:identifier', (req, res) => {
  const { identifier } = req.params;
  
  // Basic validation
  if (!identifier || identifier.length > 100) {
    return res.status(400).json({ error: 'Invalid identifier' });
  }
  
  // ... rest of the code
});
```

## 🌐 Deployment

### Environment Variables
```bash
PORT=3000
NODE_ENV=production
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel/Netlify
For serverless deployment, convert routes to serverless functions:

```javascript
// api/identicon/[identifier].js
const { generateIdenticonPng } = require('kydenticon');

module.exports = (req, res) => {
  const { identifier } = req.query;
  const png = generateIdenticonPng(decodeURIComponent(identifier));
  
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.send(png);
};
```

## 🔗 Integration Examples

### User Profiles
```javascript
// Route for user profile with avatar
app.get('/user/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  const avatarUrl = `/identicon/${encodeURIComponent(user.email)}`;
  
  res.render('profile', { user, avatarUrl });
});
```

### API Response with Avatar URLs
```javascript
app.get('/api/users', async (req, res) => {
  const users = await getUsers();
  
  const usersWithAvatars = users.map(user => ({
    ...user,
    avatar: `/identicon/${encodeURIComponent(user.email)}`
  }));
  
  res.json(usersWithAvatars);
});
```

## 📊 Performance

- **Generation Time**: ~1-3ms per identicon
- **Memory Usage**: Minimal, no persistent storage
- **Caching**: 1-year cache headers for deterministic results
- **Concurrent Requests**: Handles multiple simultaneous generations

The server can easily handle hundreds of concurrent identicon requests. 