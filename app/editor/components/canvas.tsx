"use client";

import { forwardRef, memo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { TextElement, ImageElement } from "./types";

// Memoized image layer with enhanced 3D
const ImageLayer = memo(
  ({
    img,
    isSelected,
    isDragging,
    onMouseDown,
  }: {
    img: ImageElement;
    isSelected: boolean;
    isDragging: boolean;
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {
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

    // Calculate if element has 3D rotation
    const has3DRotation = img.style.rotateX !== 0 || img.style.rotateY !== 0;

    return (
      <div
        className={`absolute cursor-move transition-transform ${
          isDragging ? "duration-0" : "duration-100"
        } ease-out hover:ring-1 hover:ring-white/30 ${
          isSelected ? "ring-2 ring-primary z-20" : "z-10"
        }`}
        onMouseDown={(e) => onMouseDown(e, img.id)}
        style={{
          left: img.position.x,
          top: img.position.y,
          willChange: isSelected || isDragging ? "transform" : undefined,
          // Enhanced 3D transform
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
    return (
      prev.img.id === next.img.id &&
      prev.img.position.x === next.img.position.x &&
      prev.img.position.y === next.img.position.y &&
      prev.img.style === next.img.style &&
      prev.isSelected === next.isSelected &&
      prev.isDragging === next.isDragging
    );
  }
);
ImageLayer.displayName = "ImageLayer";

// Memoized Text Layer with 3D depth
const TextLayer = memo(
  ({
    element,
    isSelected,
    isDragging,
    onMouseDown,
  }: {
    element: TextElement;
    isSelected: boolean;
    isDragging: boolean;
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {
    return (
      <div
        className={`absolute cursor-move select-none hover:ring-1 hover:ring-white/50 transition-all ${
          isDragging ? "duration-0" : "duration-100"
        } ${isSelected ? "ring-2 ring-primary z-50" : "z-30"}`}
        onMouseDown={(e) => onMouseDown(e, element.id)}
        style={{
          left: element.position.x,
          top: element.position.y,
          willChange: isSelected || isDragging ? "transform, left, top" : undefined,
          transformStyle: "preserve-3d",
          transform: `translateZ(${isSelected ? 30 : 10}px)`,
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
          backfaceVisibility: "hidden",
          contain: "layout style paint",
          filter: isSelected ? "brightness(1.03)" : "none",
        }}
      >
        {element.content}
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.element.id === next.element.id &&
      prev.element.position.x === next.element.position.x &&
      prev.element.position.y === next.element.position.y &&
      prev.element.style === next.element.style &&
      prev.element.content === next.element.content &&
      prev.isSelected === next.isSelected &&
      prev.isDragging === next.isDragging
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
  isDragging: boolean;
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
      isDragging,
    },
    ref
  ) => {
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
            transformStyle: "preserve-3d",
            perspective: "2500px",
            perspectiveOrigin: "center center",
            contain: "layout style",
          }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
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
              isDragging={isDragging && selectedElement === img.id}
              onMouseDown={onElementMouseDown}
            />
          ))}

          {textElements.map((element) => (
            <TextLayer
              key={element.id}
              element={element}
              isSelected={selectedElement === element.id}
              isDragging={isDragging && selectedElement === element.id}
              onMouseDown={onElementMouseDown}
            />
          ))}
        </div>
      </Card>
    );
  }
);

Canvas.displayName = "Canvas";
