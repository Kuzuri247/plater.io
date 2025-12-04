"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import { ImageElement } from "../../types";
import { Move } from "lucide-react";

// Helper for crop handles
const CropHandle = ({ 
  position, 
  onMouseDown 
}: { 
  position: "top" | "right" | "bottom" | "left", 
  onMouseDown: (e: React.MouseEvent) => void 
}) => {
  const isVertical = position === "left" || position === "right";
  return (
    <div
      onMouseDown={(e) => { e.stopPropagation(); onMouseDown(e); }}
      className={`absolute z-50 flex items-center justify-center
        ${position === "top" ? "top-0 left-0 right-0 h-1.5 cursor-ns-resize" : ""}
        ${position === "bottom" ? "bottom-0 left-0 right-0 h-1.5 cursor-ns-resize" : ""}
        ${position === "left" ? "left-0 top-0 bottom-0 w-1.5 cursor-ew-resize" : ""}
        ${position === "right" ? "right-0 top-0 bottom-0 w-1.5 cursor-ew-resize" : ""}
      `}
    />
  );
};

export const ImageLayer = memo(
  ({
    img,
    isSelected,
    isDragging,
    isCropping,
    onMouseDown,
    onCropChange,
  }: {
    img: ImageElement;
    isSelected: boolean;
    isDragging: boolean;
    isCropping: boolean;
    onMouseDown: (e: React.MouseEvent, id: string) => void;
    onCropChange: (id: string, newCrop: { top: number; right: number; bottom: number; left: number }) => void;
  }) => {
    const layerRef = useRef<HTMLDivElement>(null);
    
    // Logic for dragging crop handles
    const handleCropStart = (e: React.MouseEvent, side: "top" | "right" | "bottom" | "left") => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startCrop = { ...img.style.crop };
      
      // Get element dimensions to calculate percentage
      const rect = layerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const handleMove = (moveEvent: MouseEvent) => {
        if (!rect) return;
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        
        // Simple approximation: calculating delta percentage based on screen size of element
        // Note: For rotated elements, this simple logic might feel inverted depending on rotation.
        // A full implementation requires projecting vectors. 
        // This implementation works best for unrotated images or slight rotations.
        
        const deltaPctX = (deltaX / rect.width) * 100;
        const deltaPctY = (deltaY / rect.height) * 100;

        const newCrop = { ...startCrop };

        if (side === "top") newCrop.top = Math.min(Math.max(0, startCrop.top + deltaPctY), 100 - newCrop.bottom - 10);
        if (side === "bottom") newCrop.bottom = Math.min(Math.max(0, startCrop.bottom - deltaPctY), 100 - newCrop.top - 10);
        if (side === "left") newCrop.left = Math.min(Math.max(0, startCrop.left + deltaPctX), 100 - newCrop.right - 10);
        if (side === "right") newCrop.right = Math.min(Math.max(0, startCrop.right - deltaPctX), 100 - newCrop.left - 10);

        onCropChange(img.id, newCrop);
      };

      const handleUp = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    };

    const hasCrop =
      img.style.crop.top > 0 ||
      img.style.crop.right > 0 ||
      img.style.crop.bottom > 0 ||
      img.style.crop.left > 0;
    const hasShapeClip = img.style.clipPath !== "none";

    let clipStyle = undefined;
    if (hasShapeClip) {
      clipStyle = img.style.clipPath;
    } else if (hasCrop) {
      clipStyle = `inset(${img.style.crop.top}% ${img.style.crop.right}% ${img.style.crop.bottom}% ${img.style.crop.left}%)`;
    }

    const has3DRotation = img.style.rotateX !== 0 || img.style.rotateY !== 0;

    return (
      <div
        ref={layerRef}
        className={`absolute cursor-move transition-transform ${
          isDragging ? "duration-0" : "duration-100"
        } ease-out hover:ring-1 hover:ring-white/30 ${
          isSelected && !isCropping ? "ring-2 ring-primary z-20" : "z-10"
        } ${isCropping ? "z-50 ring-1 ring-dashed ring-primary/50" : ""}`}
        onMouseDown={(e) => !isCropping && onMouseDown(e, img.id)}
        style={{
          left: img.position.x,
          top: img.position.y,
          willChange: isSelected || isDragging ? "transform" : undefined,
          transformStyle: "preserve-3d",
          transform: `
            perspective(${has3DRotation ? 2000 : 1500}px) 
            rotateX(${img.style.rotateX}deg) 
            rotateY(${img.style.rotateY}deg) 
            rotateZ(${img.style.rotate}deg) 
            scale3d(${img.style.scale / 100}, ${img.style.scale / 100}, 1)
            scaleX(${img.style.flipX ? -1 : 1})
            scaleY(${img.style.flipY ? -1 : 1})
            translateZ(${isSelected ? 20 : 0}px)
          `,
          borderRadius: `${img.style.borderRadius}px`,
          boxShadow: img.style.shadow === "none" ? "none" : img.style.shadow,
          opacity: img.style.opacity / 100,
          filter: `blur(${img.style.blur}px) ${isSelected ? "brightness(1.03)" : ""}`,
          clipPath: clipStyle,
          backfaceVisibility: has3DRotation ? "visible" : "hidden",
          contain: "layout style paint",
        }}
      >
        {/* Render Crop Handles if in cropping mode */}
        {isCropping && isSelected && (
          <>
            <div className="absolute inset-0 border-4 border-dashed border-primary pointer-events-none" 
                 style={{ 
                   top: `${img.style.crop.top}%`, 
                   bottom: `${img.style.crop.bottom}%`, 
                   left: `${img.style.crop.left}%`, 
                   right: `${img.style.crop.right}%` 
                 }} 
            />
            {/* We place handles on the edge of the bounding box, but they affect the inner clip */}
            <CropHandle position="top" onMouseDown={(e) => handleCropStart(e, "top")} />
            <CropHandle position="bottom" onMouseDown={(e) => handleCropStart(e, "bottom")} />
            <CropHandle position="left" onMouseDown={(e) => handleCropStart(e, "left")} />
            <CropHandle position="right" onMouseDown={(e) => handleCropStart(e, "right")} />
            
            {/* Visual Guide */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
              Drag edges to crop
            </div>
          </>
        )}

        {/* noise */}
        {img.style.noise > 0 && (
          <div
            className="absolute inset-0 z-10 pointer-events-none rounded-[inherit] mix-blend-overlay"
            style={{
              opacity: img.style.noise / 100,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' seed='15' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              contain: "strict",
            }}
          />
        )}

        <img
          src={img.src}
          alt="Layer"
          draggable={false}
          loading="lazy"
          className="block object-contain pointer-events-none"
          style={{
            borderRadius: `${img.style.borderRadius}px`,
            maxWidth: "none",
            maxHeight: "none",
            // We apply crop on the container div usually, but if using inset on image directly:
            // clipPath: clipStyle, 
            // In this specific architecture, clipping the parent div is usually safer for transforms
          }}
        />
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.img.id === next.img.id &&
      prev.img.position.x === next.img.position.x &&
      prev.img.position.y === next.img.position.y &&
      prev.img.style === next.img.style &&
      prev.isSelected === next.isSelected &&
      prev.isDragging === next.isDragging &&
      prev.isCropping === next.isCropping 
    );
  }
);
ImageLayer.displayName = "ImageLayer";