import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Repeat, Share, MoreHorizontal, ThumbsUp, Send, Bookmark, Image as ImageIcon } from 'lucide-react';

// Social Media Post Components
const XPost = () => (
  <div className="bg-card border border-border p-6 text-card-foreground w-full max-w-md mx-auto shadow-2xl relative z-10">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-muted rounded-full" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[15px] font-display">Alex Creator</span>
            <span className="text-muted-foreground text-[14px]">@alexcreates</span>
          </div>
        </div>
      </div>
    </div>
    <div className="mb-6 text-[16px] leading-relaxed font-light">
      Just used PlateCreator to schedule my whole week of content. The brutalist templates are literally a cheat code.
      <br/><br/>
      <span className="text-primary">#contentcreator</span> <span className="text-primary">#growth</span>
    </div>
    <div className="flex justify-between text-muted-foreground border-t border-border pt-4">
      <div className="flex items-center gap-2 group cursor-pointer hover:text-foreground transition-colors">
        <MessageCircle size={18} />
        <span className="text-xs">12</span>
      </div>
      <div className="flex items-center gap-2 group cursor-pointer hover:text-foreground transition-colors">
        <Repeat size={18} />
        <span className="text-xs">5</span>
      </div>
      <div className="flex items-center gap-2 group cursor-pointer hover:text-foreground transition-colors">
        <Heart size={18} />
        <span className="text-xs">84</span>
      </div>
      <div className="flex items-center gap-2 group cursor-pointer hover:text-foreground transition-colors">
        <Share size={18} />
      </div>
    </div>
  </div>
);

const LinkedInPost = () => (
  <div className="bg-card border border-border p-6 text-card-foreground w-full max-w-md mx-auto shadow-2xl relative z-10">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-muted rounded-full" />
        <div>
           <div className="font-bold text-[14px] font-display leading-tight">Sarah Design</div>
           <div className="text-muted-foreground text-[12px]">Product Designer</div>
        </div>
      </div>
      <MoreHorizontal size={20} className="text-muted-foreground" />
    </div>
    <div className="mb-6 text-[14px] leading-relaxed font-light">
      Consistency is the hardest part of building a personal brand. 
      <br /><br />
      Finally found a workflow that works with PlateCreator. 
      The drag-and-drop scheduler is a game changer. 👇
    </div>
    <div className="border-t border-border pt-3 flex justify-between text-muted-foreground">
      <div className="flex flex-col items-center gap-1 hover:bg-muted p-2 cursor-pointer flex-1 transition-colors rounded">
        <ThumbsUp size={16} />
        <span className="text-[10px] uppercase tracking-wider hidden sm:inline">Like</span>
      </div>
      <div className="flex flex-col items-center gap-1 hover:bg-muted p-2 cursor-pointer flex-1 transition-colors rounded">
        <MessageCircle size={16} />
        <span className="text-[10px] uppercase tracking-wider hidden sm:inline">Comment</span>
      </div>
      <div className="flex flex-col items-center gap-1 hover:bg-muted p-2 cursor-pointer flex-1 transition-colors rounded">
        <Repeat size={16} />
        <span className="text-[10px] uppercase tracking-wider hidden sm:inline">Repost</span>
      </div>
      <div className="flex flex-col items-center gap-1 hover:bg-muted p-2 cursor-pointer flex-1 transition-colors rounded">
        <Send size={16} className="-rotate-45 mb-1" />
        <span className="text-[10px] uppercase tracking-wider hidden sm:inline">Send</span>
      </div>
    </div>
  </div>
);

const InstagramPost = () => (
  <div className="bg-card border border-border text-card-foreground w-full max-w-md mx-auto shadow-2xl pb-2 relative z-10">
    <div className="flex justify-between items-center p-3 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-muted rounded-full" />
        <span className="text-xs font-bold font-display">visual_architect</span>
      </div>
      <MoreHorizontal size={16} className="text-muted-foreground" />
    </div>
    
    {/* Reduced height from aspect-square to specific height to fit frame better */}
    <div className="h-56 w-full bg-muted/30 flex items-center justify-center border-b border-border relative overflow-hidden group">
       <div className="absolute inset-0 opacity-50" 
            style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 4px, currentColor 4px, currentColor 5px)',
                color: 'oklch(var(--border))'
            }}
       />
       <div className="relative z-10 flex flex-col items-center text-muted-foreground">
          <ImageIcon size={32} strokeWidth={1} className="mb-2"/>
       </div>
    </div>

    <div className="px-4 py-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-3 text-foreground">
          <Heart size={20} className="cursor-pointer hover:text-muted-foreground transition-colors" />
          <MessageCircle size={20} className="cursor-pointer hover:text-muted-foreground transition-colors" />
          <Send size={20} className="cursor-pointer hover:text-muted-foreground transition-colors -rotate-45" />
        </div>
        <Bookmark size={20} className="cursor-pointer hover:text-muted-foreground transition-colors" />
      </div>
      
      <div className="text-xs font-bold mb-1">3,492 likes</div>
      <div className="text-xs leading-snug text-muted-foreground line-clamp-2">
        <span className="font-bold mr-2 text-foreground">visual_architect</span>
        Minimalist designs that convert. Built entirely in PlateCreator. Link in bio.
      </div>
    </div>
  </div>
);

const ScalePattern = () => {
  // Grid Logic: 
  // Odd rows (0, 2, 4...): Columns 0, 2, 4 (visual 1, 3, 5)
  // Even rows (1, 3...): Columns 1, 3 (visual 2, 4)
  const rows = 5;
  const cols = 5;
  
  return (
    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none select-none z-0 gap-0">
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        // Determine if this cell should have the pattern
        let isActive = false;
        if (row % 2 === 0) {
          // Rows 1, 3, 5 (index 0, 2, 4) -> Active on cols 1, 3, 5 (index 0, 2, 4)
          if (col % 2 === 0) isActive = true;
        } else {
           // Rows 2, 4 (index 1, 3) -> Active on cols 2, 4 (index 1, 3)
           if (col % 2 !== 0) isActive = true;
        }

        return (
          <div key={i} className="relative border-[0.5px] border-border/20">
            {isActive && (
              <div 
                className="absolute inset-0 opacity-100 dark:opacity-50 transition-opacity duration-500"
                style={{
                  backgroundImage: 'repeating-linear-gradient(315deg, oklch(var(--primary)/0.15) 0, oklch(var(--primary)/0.15) 1px, transparent 0, transparent 50%)',
                  backgroundSize: '9px 9px'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-[90%] md:w-[80%] mx-auto min-h-[85vh] md:min-h-[90vh] flex items-center justify-center pt-24 pb-10 bg-background">
      <div className="relative z-10 h-full w-full flex flex-col justify-center">
        
        {/* Cool Tech Corners */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-[4px] border-l-[4px] border-foreground z-30" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-[4px] border-r-[4px] border-foreground z-30" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-[4px] border-l-[4px] border-foreground z-30" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-[4px] border-r-[4px] border-foreground z-30" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border bg-background w-full shadow-2xl relative z-20">
          
          {/* Left Column: Content with Scale Pattern */}
          <div className="relative p-6 md:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border overflow-hidden min-h-[450px] lg:min-h-[600px]">
            
            <ScalePattern />
            
            <div className="relative z-10">
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6 }}
                 className="inline-block mb-6 px-3 py-1 border border-border text-muted-foreground text-xs uppercase tracking-widest bg-background/50 backdrop-blur-sm"
              >
                v1.0 Launch Soon
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tighter leading-[0.9] text-foreground font-display uppercase"
              >
                Everything<br/>
                In A Plate
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-md font-light"
              >
                Transform content creation with meme templates, stylish text integration, and smart post scheduling.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button size="md" variant="primary">
                  Start Creating Free
                 </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Rotating Social Mocks */}
          <div className="relative min-h-[400px] lg:min-h-[600px] bg-background flex items-center justify-center overflow-hidden p-6 md:p-8">
             {/* Simple Grid Background for Right Column */}
             <div className="absolute inset-0" 
                  style={{ 
                    backgroundImage: 'linear-gradient(oklch(var(--border)/0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--border)/0.3) 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                  }} 
             />
             
             <div className="relative z-10 w-full max-w-md flex flex-col items-center">
               <AnimatePresence mode="wait">
                  {activeSlide === 0 && (
                    <motion.div
                      key="x-container"
                      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5 }}
                      className="w-full flex flex-col items-start gap-2"
                    >
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Twitter / X</div>
                      <XPost />
                    </motion.div>
                  )}
                  {activeSlide === 1 && (
                    <motion.div
                      key="linkedin-container"
                      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5 }}
                      className="w-full flex flex-col items-start gap-2"
                    >
                      <div className="text-xs font-bold uppercase tracking-widest text-[#0A66C2] pl-1">LinkedIn</div>
                      <LinkedInPost />
                    </motion.div>
                  )}
                  {activeSlide === 2 && (
                    <motion.div
                      key="instagram-container"
                      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5 }}
                      className="w-full flex flex-col items-start gap-2"
                    >
                      <div className="text-xs font-bold uppercase tracking-widest text-[#E1306C] pl-1">Instagram</div>
                      <InstagramPost />
                    </motion.div>
                  )}
               </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};