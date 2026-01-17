"use client";

import Image from "next/image";

interface ProtectedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

/**
 * ProtectedImage component - Prevents casual image downloading
 * Features:
 * - Disables right-click context menu
 * - Prevents drag and drop
 * - Disables image selection
 * - Adds transparent overlay
 */
export default function ProtectedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  quality,
  sizes,
  style,
  objectFit = "cover",
}: ProtectedImageProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  const imageStyle = {
    ...style,
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
  };

  return (
    <div
      className={`protected-image-wrapper relative ${className}`}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          style={{
            ...imageStyle,
            objectFit: objectFit,
          }}
          draggable={false}
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          sizes={sizes}
          style={imageStyle}
          draggable={false}
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        />
      )}
    </div>
  );
}
