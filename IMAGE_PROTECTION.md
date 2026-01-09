# Image Protection Guide

This document explains how image protection is implemented on the bEasy website to prevent casual downloading of images.

## ⚠️ Important Notice

**Complete prevention is impossible**: Any image displayed in a browser can technically be downloaded by determined users through:
- Browser DevTools (Inspect Element)
- Screenshot tools
- View Page Source
- Browser cache
- Third-party download extensions

However, these protections make it significantly harder for **casual users** to download images.

---

## 🛡️ Protection Methods Implemented

### 1. **Global CSS Protection** (`globals.css`)
Automatically applied to all images:
- Disables right-click/context menu
- Prevents drag-and-drop
- Disables image selection
- Prevents touch callouts on mobile devices

### 2. **ImageProtection Component** (`app/components/ImageProtection.tsx`)
Global client-side protection:
- Listens for right-click events on images
- Prevents drag events
- Blocks keyboard shortcuts (Ctrl+S on images)

**Usage**: Already added to root layout - protects all images automatically.

### 3. **ProtectedImage Component** (`app/components/common/ProtectedImage.tsx`)
Enhanced protection for specific images:
- Wraps Next.js Image component
- Adds transparent overlay
- Disables all interaction methods
- Provides better protection for important images

**Usage Example**:
```tsx
import ProtectedImage from '@/app/components/common/ProtectedImage';

// Instead of:
<Image src="/images/hero.png" alt="Hero" width={800} height={600} />

// Use:
<ProtectedImage src="/images/hero.png" alt="Hero" width={800} height={600} />
```

---

## 📝 How to Use

### Option 1: Automatic Protection (Already Active)
All images are automatically protected via:
- Global CSS rules in `globals.css`
- `ImageProtection` component in root layout

**No additional action needed** - all existing images are protected!

### Option 2: Enhanced Protection for Specific Images
For images requiring extra protection (e.g., premium content, watermarked images):

```tsx
import ProtectedImage from '@/app/components/common/ProtectedImage';

function MyComponent() {
  return (
    <ProtectedImage 
      src="/images/premium-photo.jpg"
      alt="Premium content"
      width={1200}
      height={800}
      className="rounded-lg"
      priority={true}
    />
  );
}
```

**Props**: Same as Next.js `Image` component:
- `src`, `alt`, `width`, `height`, `className`
- `fill`, `priority`, `quality`, `sizes`
- `style`, `objectFit`

---

## 🔧 Additional Protection Options

### 1. Add Watermarks
Add visible watermarks to important images using image editing tools or dynamic watermarking.

### 2. Lower Image Quality
Use lower resolution images for web display:
```tsx
<ProtectedImage 
  src="/images/photo.jpg"
  quality={60}  // Lower quality (default is 75)
/>
```

### 3. Lazy Loading
Delay loading images until needed:
```tsx
<ProtectedImage 
  src="/images/photo.jpg"
  loading="lazy"
/>
```

### 4. Custom Right-Click Message (Optional)
You can add a custom alert when users try to right-click. Edit `ImageProtection.tsx`:

```tsx
const handleContextMenu = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'IMG' || target.closest('img')) {
    e.preventDefault();
    alert('Image downloading is disabled on this website.'); // Add this line
    return false;
  }
};
```

---

## 🧪 Testing Protection

### Test Checklist:
- [ ] Right-click on images - context menu should be blocked
- [ ] Try dragging images - should not work
- [ ] Try selecting images - should not be selectable
- [ ] Mobile: Long-press on images - should not show save options
- [ ] Try Ctrl+S on images - should be blocked

### Bypass Methods (What Determined Users Can Still Do):
1. **DevTools**: Open Inspector, find image URL, download
2. **View Source**: View page source, find image paths
3. **Screenshots**: Take screenshots of the page
4. **Network Tab**: Monitor network requests in DevTools
5. **Browser Cache**: Access cached images

---

## 📱 Mobile Considerations

Mobile devices have additional protection:
- Touch callouts disabled (`-webkit-touch-callout: none`)
- Long-press save disabled on iOS Safari
- Drag-and-drop disabled on Android

---

## ⚖️ Legal Protection

Technical protection alone is not enough. Consider:
1. **Copyright Notice**: Add "© 2026 bEasy Cambodia. All rights reserved."
2. **Terms of Service**: Prohibit image downloading in your T&C
3. **DMCA Protection**: Register copyrights for important images
4. **Watermarks**: Visual deterrent and ownership proof

---

## 🔄 Disabling Protection (If Needed)

If you need to disable protection temporarily:

### Disable Global Protection:
Remove from `app/layout.tsx`:
```tsx
<ImageProtection />  // Remove this line
```

### Disable CSS Protection:
Comment out the "IMAGE PROTECTION STYLES" section in `globals.css`.

### For Specific Images:
Use regular Next.js `Image` component instead of `ProtectedImage`.

---

## 📊 Summary

| Method | Protection Level | User Friendliness | Performance Impact |
|--------|-----------------|-------------------|-------------------|
| Global CSS | Medium | High | None |
| ImageProtection Component | Medium-High | High | Negligible |
| ProtectedImage Component | High | Medium | Very Low |
| Watermarks | Very High | Medium | Low |
| Low Quality | Medium | High | Positive |

**Recommended**: Use the automatic global protection (already active) for all images. For premium/important images, use `ProtectedImage` component with watermarks.

---

## 🚀 Next Steps

1. ✅ Global protection is already active
2. Consider adding watermarks to important images
3. Add copyright notices to footer
4. Update Terms of Service
5. Test protection on different devices/browsers

For questions or issues, consult the development team.
