# Kydenticon Next.js Examples

This directory contains complete examples of how to use Kydenticon with Next.js applications.

## 🚀 Quick Setup

1. **Install Kydenticon** in your Next.js project:
   ```bash
   npm install kydenticon
   # or
   bun add kydenticon
   ```

2. **Copy the route handlers** to your Next.js app:
   ```
   your-nextjs-app/
   ├── app/
   │   ├── identicon/
   │   │   └── [identifier]/
   │   │       └── route.ts          # Copy this file
   │   └── identicon-svg/
   │       └── [identifier]/
   │           └── route.ts          # Copy this file
   ```

3. **Use in your components** as shown in `page.tsx`

## 📁 File Structure

```
examples/nextjs/
├── app/
│   ├── identicon/[identifier]/
│   │   └── route.ts              # PNG identicon route handler
│   ├── identicon-svg/[identifier]/
│   │   └── route.ts              # SVG identicon route handler
│   └── page.tsx                  # Demo page with examples
└── README.md                     # This file
```

## 🔗 Route Handlers

### PNG Identicons (`/identicon/[identifier]`)
- **Grid Size**: 5×5
- **Pixel Size**: 20px
- **Colors**: Custom palette (coral, teal, blue, orange, mint)
- **Padding**: 10%
- **Format**: PNG

### SVG Identicons (`/identicon-svg/[identifier]`)
- **Grid Size**: 7×7 (more detailed)
- **Pixel Size**: 15px
- **Colors**: Purple/teal theme
- **Padding**: 15%
- **Format**: SVG

## 🖼️ Usage Examples

### With Next.js Image Component
```tsx
import Image from 'next/image';

function UserAvatar({ email }: { email: string }) {
  return (
    <Image
      src={`/identicon/${encodeURIComponent(email)}`}
      alt={`Avatar for ${email}`}
      width={64}
      height={64}
      className="rounded-full"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

**Benefits of Next.js Image:**
- ✅ Automatic image optimization
- ✅ Lazy loading by default
- ✅ Responsive images
- ✅ Placeholder support
- ✅ WebP/AVIF format conversion

### With Regular IMG Tag
```tsx
function UserAvatar({ email }: { email: string }) {
  return (
    <img
      src={`/identicon/${encodeURIComponent(email)}`}
      alt={`Avatar for ${email}`}
      width="64"
      height="64"
      className="rounded-full"
      loading="lazy"
    />
  );
}
```

**When to use regular IMG:**
- ✅ Simpler implementation
- ✅ Direct control over loading
- ✅ No build-time dependencies
- ✅ Works with any styling system

## 🎨 Customizing Route Handlers

You can customize the identicons by modifying the route handler parameters:

```tsx
// app/identicon/[identifier]/route.ts
import { createIdenticonRouteHandler } from 'kydenticon';

export const GET = createIdenticonRouteHandler(
  8,    // Grid size (3-15 recommended)
  12,   // Pixel size in px
  [     // Custom color palette
    '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#FFA07A', '#98D8C8', '#DDA0DD'
  ],
  0.2,  // Padding (0-0.5 recommended)
  'png' // Format: 'png' | 'svg'
);
```

## 🔒 URL Encoding

Always encode identifiers that might contain special characters:

```tsx
// ✅ Safe for emails, usernames with special characters
const avatarUrl = `/identicon/${encodeURIComponent(user.email)}`;

// ❌ Unsafe - might break with emails containing @ or +
const avatarUrl = `/identicon/${user.email}`;
```

## 🎯 Advanced Usage

### User Profile Component
```tsx
interface UserProfileProps {
  user: {
    name: string;
    email: string;
  };
  size?: number;
}

function UserProfile({ user, size = 64 }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={`/identicon/${encodeURIComponent(user.email)}`}
        alt={`${user.name}'s avatar`}
        width={size}
        height={size}
        className="rounded-full ring-2 ring-gray-200"
      />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
```

### Comment System Avatars
```tsx
function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <img
            src={`/identicon/${encodeURIComponent(comment.authorEmail)}`}
            alt={`${comment.author}'s avatar`}
            className="w-8 h-8 rounded-full flex-shrink-0"
            loading="lazy"
          />
          <div className="flex-1">
            <p className="font-medium text-sm">{comment.author}</p>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Responsive Avatar Sizes
```tsx
function ResponsiveAvatar({ email, name }: { email: string; name: string }) {
  return (
    <Image
      src={`/identicon/${encodeURIComponent(email)}`}
      alt={`${name}'s avatar`}
      width={48}
      height={48}
      className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
    />
  );
}
```

## 🚀 Performance Tips

1. **Use Next.js Image** for better performance and user experience
2. **Cache identicons** - they're deterministic, so cache aggressively:
   ```tsx
   // The route handler already sets Cache-Control headers
   // "Cache-Control": "public, max-age=31536000" (1 year)
   ```
3. **Preload critical avatars** for above-the-fold content:
   ```tsx
   <link rel="preload" as="image" href="/identicon/user@example.com" />
   ```
4. **Consider SVG for icons** - smaller file sizes, infinitely scalable

## 🎨 Styling Ideas

```css
/* Rounded avatar */
.avatar-round { border-radius: 50%; }

/* Avatar with border */
.avatar-bordered { 
  border: 2px solid #e5e7eb; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Hover effect */
.avatar-hover:hover { 
  transform: scale(1.05); 
  transition: transform 0.2s;
}

/* Status indicator */
.avatar-online {
  position: relative;
}
.avatar-online::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}
``` 