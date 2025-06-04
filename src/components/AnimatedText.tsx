"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Decorative SVG icons
const decorations = [
  '🌿', '✨', '🌺', '🌎', '🎯', '💫', '🌙', '🌟', '🍃', '🌼',
  '🌻', '🌹', '🌞', '🌊', '🏞️', '🌄', '🌅', '🌠', '🌌', '🎨'
];

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  withDecorations?: boolean;
}

export function AnimatedText({ children, className = '', delay = 0, withDecorations = true }: AnimatedTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!textRef.current || hasAnimated.current) return;
    
    // Store a reference to the current ref value
    const currentTextRef = textRef.current;
    const currentDecoElements: HTMLElement[] = [];
    
    // Split text into words and wrap each word in a span
    const text = currentTextRef.textContent || '';
    const words = text.split(' ');
    
    // Clear the text content
    currentTextRef.textContent = '';
    
    // Create a container for the words
    const container = document.createElement('div');
    container.className = 'text-container';
    
    // Create a container for decorative elements
    const decoContainer = document.createElement('div');
    decoContainer.className = 'deco-container';
    decoContainer.style.position = 'absolute';
    decoContainer.style.top = '0';
    decoContainer.style.left = '0';
    decoContainer.style.width = '100%';
    decoContainer.style.height = '100%';
    decoContainer.style.pointerEvents = 'none';
    decoContainer.style.overflow = 'visible';
    decoContainer.style.zIndex = '0';
    
    // Append the container to the text ref
    textRef.current.appendChild(container);
    textRef.current.appendChild(decoContainer);
    
    // Create spans for each word with individual letters
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      wordSpan.style.overflow = 'visible';
      wordSpan.style.verticalAlign = 'top';
      wordSpan.style.position = 'relative';
      
      // Add a subtle gradient overlay for main title
      if (className.includes('mainTitle')) {
        const gradientOverlay = document.createElement('span');
        gradientOverlay.style.position = 'absolute';
        gradientOverlay.style.top = '0';
        gradientOverlay.style.left = '0';
        gradientOverlay.style.width = '100%';
        gradientOverlay.style.height = '100%';
        gradientOverlay.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)';
        gradientOverlay.style.opacity = '0';
        wordSpan.appendChild(gradientOverlay);
      }
      
      // Wrap each character in a span for individual animation
      word.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.style.display = 'inline-block';
        charSpan.style.transform = 'translateY(40px) rotateX(-90deg) scale(0.8)';
        charSpan.style.opacity = '0';
        charSpan.style.transformOrigin = 'bottom center';
        charSpan.style.willChange = 'transform, opacity, text-shadow, background';
        charSpan.style.position = 'relative';
        charSpan.style.zIndex = '1';
        
        // Set text color to inherit from parent
        charSpan.style.color = 'inherit';
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        wordSpan.appendChild(charSpan);
      });
      
      // Add space between words (except after the last word)
      if (wordIndex < words.length - 1) {
        wordSpan.appendChild(document.createTextNode(' '));
      }
      
      container.appendChild(wordSpan);
    });
    
    textRef.current.appendChild(container);
    
    // Get all character elements for animation
    const chars = container.querySelectorAll('.char');
    const wordsEl = container.querySelectorAll('.word');
    
    // Create a timeline for the animation
    const tl = gsap.timeline({
      defaults: { 
        ease: 'power3.out',
        duration: 1,
      },
      delay: delay,
      onComplete: () => {
        hasAnimated.current = true;
      }
    });
    
    // Animate each word with a staggered effect
    wordsEl.forEach((word, wordIndex) => {
      const wordDelay = wordIndex * 0.1;
      const wordChars = word.querySelectorAll('.char');
      const gradientOverlay = word.querySelector('span:first-child');
      
      // Animate each character in the word
      wordChars.forEach((char, charIndex) => {
        const charDelay = wordDelay + (charIndex * 0.03);
        
        // Character animation
        tl.to(char, {
          y: 0,
          rotationX: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, charDelay);
        
        // Add decorative elements for some characters
        if (withDecorations && Math.random() > 0.7) {
          const deco = document.createElement('span');
          deco.textContent = decorations[Math.floor(Math.random() * decorations.length)];
          deco.style.position = 'absolute';
          deco.style.fontSize = '0.5em';
          deco.style.opacity = '0';
          deco.style.pointerEvents = 'none';
          deco.style.zIndex = '10';
          
          // Position around the character
          const offsetX = (Math.random() - 0.5) * 60;
          const offsetY = (Math.random() - 0.5) * 40 - 30;
          
          deco.style.left = `${50 + offsetX}%`;
          deco.style.top = `${50 + offsetY}%`;
          
          decoContainer.appendChild(deco);
          currentDecoElements.push(deco);
          
          // Animate decorative element
          tl.to(deco, {
            opacity: 0.8,
            scale: 1.5,
            duration: 0.5,
            y: -20,
            ease: 'back.out(1.7)'
          }, charDelay + 0.2);
          
          tl.to(deco, {
            opacity: 0,
            scale: 0.5,
            y: -40,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              if (deco.parentNode) {
                deco.parentNode.removeChild(deco);
              }
            }
          }, `+=0.5`);
        }
        
        // Add a subtle bounce effect for main title
        if (className.includes('mainTitle')) {
          tl.to(char, {
            y: -15,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
            // Bounce effect complete
          }, `+=0.1`);
        }
      });
      
      // Animate gradient overlay for main title
      if (gradientOverlay && className.includes('mainTitle')) {
        tl.to(gradientOverlay, {
          opacity: 0.6,
          x: '100%',
          duration: 0.8,
          ease: 'power2.inOut'
        }, wordDelay);
      }
    });
    
    // Add a subtle scale animation to the entire container for main title
    if (className.includes('mainTitle')) {
      tl.to(container, {
        scale: 1.02,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut'
      }, '>0.2');
    }
    
    // Add hover effect using GSAP's built-in hover
    if (typeof window !== 'undefined') {
      const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement;
        gsap.to(target, {
          y: -5,
          textShadow: '0 5px 15px rgba(255, 255, 255, 0.5)',
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = (e: Event) => {
        const target = e.target as HTMLElement;
        gsap.to(target, {
          y: 0,
          textShadow: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      chars.forEach(char => {
        char.addEventListener('mouseenter', handleMouseEnter as EventListener);
        char.addEventListener('mouseleave', handleMouseLeave as EventListener);
      });
      
      return () => {
        chars.forEach(char => {
          char.removeEventListener('mouseenter', handleMouseEnter as EventListener);
          char.removeEventListener('mouseleave', handleMouseLeave as EventListener);
        });
        tl.kill();
      };
    }
    
    // Cleanup function
    return () => {
      tl.kill();
      // Clean up any remaining decorative elements
      const decoContainer = currentTextRef.querySelector('.deco-container');
      if (decoContainer) {
        while (decoContainer.firstChild) {
          decoContainer.removeChild(decoContainer.firstChild);
        }
      }
      // Clear the deco elements array
      currentDecoElements.length = 0;
    };
  }, [delay, className, withDecorations]);

  return (
    <div className={`animated-text-wrapper ${className}`}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <p ref={textRef} className="animated-text" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </p>
      </div>
    </div>
  );
}
