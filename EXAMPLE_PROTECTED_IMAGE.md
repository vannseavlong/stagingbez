# EXAMPLE: Converting to ProtectedImage

This file shows an example of how to convert a regular image or Next.js Image to use the ProtectedImage component for enhanced protection.

## Example 1: Converting regular `<img>` tag (mediaCard.tsx)

### Before:
```tsx
<img
  src={image}
  alt={title}
  className="w-full h-full lg:w-[384px] lg:h-[216px] md:w-[534px] md:h-[300px] object-cover"
/>
```

### After:
```tsx
import ProtectedImage from '@/app/components/common/ProtectedImage';

// In your component:
<div className="w-full h-full lg:w-[384px] lg:h-[216px] md:w-[534px] md:h-[300px] relative">
  <ProtectedImage
    src={image}
    alt={title}
    fill
    objectFit="cover"
    className=""
  />
</div>
```

## Example 2: Converting Next.js `Image` component

### Before:
```tsx
import Image from 'next/image';

<Image
  src="/images/hero.png"
  alt="Hero Image"
  width={800}
  height={600}
  priority
  className="rounded-lg"
/>
```

### After:
```tsx
import ProtectedImage from '@/app/components/common/ProtectedImage';

<ProtectedImage
  src="/images/hero.png"
  alt="Hero Image"
  width={800}
  height={600}
  priority
  className="rounded-lg"
/>
```

## Example 3: Using with `fill` prop (responsive images)

### Before:
```tsx
<div className="relative w-full h-[400px]">
  <Image
    src="/images/background.jpg"
    alt="Background"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>
```

### After:
```tsx
<div className="relative w-full h-[400px]">
  <ProtectedImage
    src="/images/background.jpg"
    alt="Background"
    fill
    objectFit="cover"
  />
</div>
```

## Example 4: With all props

```tsx
<ProtectedImage
  src="/images/premium-photo.jpg"
  alt="Premium Content"
  width={1200}
  height={800}
  quality={85}
  priority={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="rounded-lg shadow-xl"
  objectFit="cover"
/>
```

## Notes:
- All existing images are already protected by global CSS and ImageProtection component
- Use ProtectedImage component for images that need EXTRA protection (premium content, watermarked images, etc.)
- ProtectedImage works exactly like Next.js Image component with the same props
- The component adds a transparent overlay for additional protection
