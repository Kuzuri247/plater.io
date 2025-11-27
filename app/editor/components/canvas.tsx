"use client";

import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { TextElement, ImageStyle } from "./types";

interface EditorCanvasProps {
  width: number;
  height: number;
  canvasBackground: string;
  userImage: string | null;
  userImageStyle: ImageStyle;
  imagePosition: { x: number; y: number };
  onImageMouseDown: (e: React.MouseEvent) => void;
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
      userImage,
      userImageStyle,
      imagePosition,
      onImageMouseDown,
      onEmptyClick,
      textElements,
      selectedElement,
      onElementMouseDown,
      onMouseMove,
      onMouseUp,
    },
    ref,
  ) => {
    return (
      <Card className="p-0 bg-transparent border-none shadow-none overflow-visible relative group/canvas">
        <div
          ref={ref}
          className="relative overflow-hidden shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center select-none"
          style={{
            width: width,
            height: height,
            background: canvasBackground,
            borderRadius: "8px",
          }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* User Image Layer - Only renders when image exists */}
          {userImage ? (
            <div
              className="absolute cursor-move transition-transform duration-75 ease-linear hover:ring-1 hover:ring-white/30"
              onMouseDown={onImageMouseDown}
              style={{
                left: imagePosition.x,
                top: imagePosition.y,
                transform: `scale(${userImageStyle.scale / 100}) rotate(${userImageStyle.rotate}deg)`,
                borderRadius: `${userImageStyle.borderRadius}px`,
                boxShadow: userImageStyle.shadow === 'none' ? 'none' : userImageStyle.shadow,
                opacity: userImageStyle.opacity / 100,
                filter: `blur(${userImageStyle.blur}px)`,
              }}
            >
              {/* Noise Overlay */}
              {userImageStyle.noise > 0 && (
                  <div 
                      className="absolute inset-0 z-10 pointer-events-none rounded-[inherit]"
                      style={{
                          opacity: userImageStyle.noise / 100,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                      }}
                  />
              )}

              <img
                src={userImage}
                alt="User upload"
                draggable={false}
                className="block object-contain pointer-events-none"
                style={{
                  borderRadius: `${userImageStyle.borderRadius}px`,
                  maxWidth: "none",
                  maxHeight: "none",
                }}
              />
            </div>
          ) : (
            /* Centered Upload Skeleton - Renders directly in flex container when no image */
            <div 
              onClick={onEmptyClick}
              className="w-64 h-40 bg-background/20 backdrop-blur-sm border-2 border-dashed  border-neutral-400 rounded-lg flex flex-col items-center justify-center text-neutral-500 cursor-pointer hover:bg-background/30 hover:border-neutral-400 transition-all z-10"
            >
              <ImageIcon className="w-8 h-8 mb-2 opacity-50 text-neutral-400" />
              <span className="text-xs text-neutral-400 font-medium">Click to Upload</span>
            </div>
          )}

          {/* Text Elements Layer */}
          {textElements.map((element) => (
            <div
              key={element.id}
              className={`absolute cursor-move select-none hover:ring-1 hover:ring-white/50 transition-shadow ${
                selectedElement === element.id ? "ring-2 ring-primary z-50" : "z-10"
              }`}
              style={{
                left: element.position.x,
                top: element.position.y,
                fontSize: element.style.fontSize,
                fontFamily: element.style.fontFamily,
                fontWeight: element.style.fontWeight,
                color: element.style.color,
                textShadow: element.style.textShadow,
                backgroundColor: element.style.showBackground ? element.style.backgroundColor : "transparent",
                borderRadius: `${element.style.borderRadius}px`,
                padding: `${element.style.padding}px`,
                lineHeight: 1.2,
              }}
              onMouseDown={(e) => onElementMouseDown(e, element.id)}
            >
              {element.content}
            </div>
          ))}
        </div>
      </Card>
    );
  },
);

Canvas.displayName = "Canvas";