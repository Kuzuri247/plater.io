"use client";

import { forwardRef, memo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { TextElement, ImageElement } from "./types";

// Memoized image layer
const ImageLayer = memo(
  ({
    img,
    isSelected,
    onMouseDown,
  }: {
    img: ImageElement;
    isSelected: boolean;
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {
    // Shadow Logic
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

    return (
      <div
        className={`absolute cursor-move transition-transform duration-75 ease-linear hover:ring-1 hover:ring-white/30 ${
          isSelected ? "ring-2 ring-primary z-20" : "z-10"
        }`}
        onMouseDown={(e) => onMouseDown(e, img.id)}
        style={{
          left: img.position.x,
          top: img.position.y,
          // Only add will-change when selected for better performance
          willChange: isSelected ? "transform" : undefined,
          // transform3d for GPU acceleration
          transform: `
          translate3d(0, 0, 0)
          perspective(1000px) 
          rotateX(${img.style.rotateX}deg) 
          rotateY(${img.style.rotateY}deg) 
          rotateZ(${img.style.rotate}deg) 
          scale3d(${img.style.scale / 100}, ${img.style.scale / 100}, 1)
          scaleX(${img.style.flipX ? -1 : 1})
          scaleY(${img.style.flipY ? -1 : 1})
        `,
          borderRadius: `${img.style.borderRadius}px`,
          boxShadow: img.style.shadow === "none" ? "none" : img.style.shadow,
          opacity: img.style.opacity / 100,
          filter: `blur(${img.style.blur}px)`,
          clipPath: clipStyle,
          // Add performance optimizations
          backfaceVisibility: "hidden",
          contain: "layout style paint",
        }}
      >
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
            clipPath: clipStyle,
          }}
        />
      </div>
    );
  },
  (prev, next) => {
    // Optimized comparison
    return (
      prev.img.id === next.img.id &&
      prev.img.position.x === next.img.position.x &&
      prev.img.position.y === next.img.position.y &&
      prev.img.style === next.img.style &&
      prev.isSelected === next.isSelected
    );
  }
);
ImageLayer.displayName = "ImageLayer";

// Memoized Text Layer
const TextLayer = memo(
  ({
    element,
    isSelected,
    onMouseDown,
  }: {
    element: TextElement;
    isSelected: boolean;
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {
    return (
      <div
        className={`absolute cursor-move select-none hover:ring-1 hover:ring-white/50 transition-shadow ${
          isSelected ? "ring-2 ring-primary z-50" : "z-30"
        }`}
        onMouseDown={(e) => onMouseDown(e, element.id)}
        style={{
          left: element.position.x,
          top: element.position.y,
          // Only add will-change when selected
          willChange: isSelected ? "transform, left, top" : undefined,
          // Add GPU acceleration
          transform: "translate3d(0, 0, 0)",
          fontSize: element.style.fontSize,
          fontFamily: element.style.fontFamily,
          fontWeight: element.style.fontWeight,
          color: element.style.color,
          textShadow: element.style.textShadow,
          backgroundColor: element.style.showBackground
            ? element.style.backgroundColor
            : "transparent",
          borderRadius: `${element.style.borderRadius}px`,
          padding: `${element.style.padding}px`,
          lineHeight: 1.2,
          // Add performance optimizations
          backfaceVisibility: "hidden",
          contain: "layout style paint",
        }}
      >
        {element.content}
      </div>
    );
  },
  (prev, next) => {
    // Optimized comparison
    return (
      prev.element.id === next.element.id &&
      prev.element.position.x === next.element.position.x &&
      prev.element.position.y === next.element.position.y &&
      prev.element.style === next.element.style &&
      prev.element.content === next.element.content &&
      prev.isSelected === next.isSelected
    );
  }
);
TextLayer.displayName = "TextLayer";

interface EditorCanvasProps {
  width: number;
  height: number;
  canvasBackground: string;
  imageElements: ImageElement[];
  onEmptyClick: () => void;
  textElements: TextElement[];
  selectedElement: string | null;
  onElementMouseDown: (e: React.MouseEvent, elementId: string) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
}

export const Canvas = forwardRef<HTMLDivElement, EditorCanvasProps>(
  (
    {
      width,
      height,
      canvasBackground,
      imageElements,
      onEmptyClick,
      textElements,
      selectedElement,
      onElementMouseDown,
      onMouseMove,
      onMouseUp,
    },
    ref
  ) => {
    // Memoize callbacks to prevent child re-renders
    const handleEmptyClick = useCallback(() => {
      onEmptyClick();
    }, [onEmptyClick]);

    return (
      <Card className="p-0 bg-transparent border-none shadow-none overflow-visible relative group/canvas">
        <div
          ref={ref}
          className="relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center select-none"
          style={{
            width: width,
            height: height,
            background: canvasBackground,
            // Add performance hints
            contain: "layout style",
            willChange: "background",
          }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Fallback if no images */}
          {imageElements.length === 0 && (
            <div
              onClick={handleEmptyClick}
              className="w-64 h-40 bg-background/20 backdrop-blur-sm border-2 border-dashed border-neutral-400 rounded-lg flex flex-col items-center justify-center text-neutral-500 cursor-pointer hover:bg-background/30 hover:border-neutral-400 transition-all z-10"
            >
              <ImageIcon className="w-8 h-8 mb-2 opacity-50 text-neutral-400" />
              <span className="text-xs text-neutral-400 font-medium">
                Click to Upload
              </span>
            </div>
          )}

          {imageElements.map((img) => (
            <ImageLayer
              key={img.id}
              img={img}
              isSelected={selectedElement === img.id}
              onMouseDown={onElementMouseDown}
            />
          ))}

          {textElements.map((element) => (
            <TextLayer
              key={element.id}
              element={element}
              isSelected={selectedElement === element.id}
              onMouseDown={onElementMouseDown}
            />
          ))}
        </div>
      </Card>
    );
  }
);

Canvas.displayName = "Canvas";
