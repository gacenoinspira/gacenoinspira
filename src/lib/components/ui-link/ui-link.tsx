"use client";

import Link from "next/link";
import React, {
  ComponentPropsWithRef,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface Props extends ComponentPropsWithRef<typeof Link> {
  namePath: string;
  classActive?: string;
}

export function UiLink({
  namePath,
  href,
  classActive = "",
  className = "",
  ...props
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const linkRef = useRef<HTMLAnchorElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Create wave animation
  const createWaveAnimation = useCallback(():
    | gsap.core.Timeline
    | undefined => {
    if (!waveRef.current || !linkRef.current) return;

    // Clear any existing animations
    animationRef.current?.kill();

    // Clear previous waves
    while (waveRef.current.firstChild) {
      waveRef.current.removeChild(waveRef.current.firstChild);
    }

    // Get computed styles for better color integration
    const linkStyles = window.getComputedStyle(linkRef.current);
    const textColor = linkStyles.color;

    // Create subtle wave elements
    const waves: HTMLElement[] = [];
    const opacityLevels = [0.12, 0.08, 0.05];
    const scales = [1.1, 1.2, 1.3];
    
    for (let i = 0; i < 3; i++) {
      const wave = document.createElement("div");
      Object.assign(wave.style, {
        position: "absolute",
        borderRadius: "6px",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        transform: "scale(0.9)",
        transformOrigin: "center",
        backgroundColor: textColor,
        opacity: "0",
        willChange: "transform, opacity",
        pointerEvents: "none",
        mixBlendMode: "overlay",
        filter: "blur(1px)",
        zIndex: "-1"
      });

      if (waveRef.current) {
        waveRef.current.appendChild(wave);
        waves.push(wave);
      }
    }

    // Create timeline for the wave effect
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.3,
      defaults: {
        ease: "sine.out",
        transformOrigin: "center"
      },
    });

    // Animate each wave with a slight delay and different properties
    waves.forEach((wave, index) => {
      const delay = index * 0.2;
      const scale = scales[index] || 1.1;
      const opacity = opacityLevels[index] || 0.1;

      tl.to(
        wave,
        {
          scale: scale * 0.95,
          opacity: opacity * 1.2,
          duration: 1.5,
          ease: "sine.inOut",
        },
        delay
      ).to(
        wave,
        {
          scale: scale * 1.05,
          opacity: 0,
          duration: 1.2,
          ease: "sine.in",
        },
        `-=${0.5}`
      );
    });

    return tl;
  }, []);

  // Set up animations and event listeners
  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    // Initial setup
    gsap.set(link, {
      position: 'relative',
      overflow: 'visible',
      zIndex: 0,
      transformOrigin: 'left center',
    });

    // Clean up previous animation
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Clear wave elements
    if (waveRef.current) {
      while (waveRef.current.firstChild) {
        waveRef.current.removeChild(waveRef.current.firstChild);
      }
    }

    // Create animations if active
    if (isActive) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        // Create flag waving animation - more subtle and natural
        const flagTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.5,
          defaults: {
            ease: 'sine.inOut',
            transformOrigin: 'left center',
          }
        });
        
        // More visible flag waving animation
        flagTl
          .to(link, {
            rotate: -3,  // Increased from -0.3
            duration: 2,
            ease: 'sine.inOut'
          })
          .to(link, {
            rotate: 2,   // Increased from 0.2
            duration: 2.5,
            ease: 'sine.inOut'
          })
          .to(link, {
            rotate: -1,  // Increased from -0.1
            duration: 1.5,
            ease: 'sine.inOut'
          })
          .to(link, {
            rotate: 3,   // Increased from 0.3
            duration: 3,
            ease: 'sine.inOut'
          })
          .to(link, {
            rotate: 0,
            duration: 2,
            ease: 'sine.inOut'
          });

        // Create wave animation
        const waveTl = createWaveAnimation();
        
        // Store timeline reference
        animationRef.current = gsap.timeline();
        animationRef.current.add(flagTl, 0);
        if (waveTl) {
          animationRef.current.add(waveTl, 0);
        }
      }, 50);

      return () => clearTimeout(timer);
    }

    // Clean up on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [isActive, createWaveAnimation, href]);

  // Handle click for wave effect
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isActive) return;
    e.preventDefault();
    
    if (!linkRef.current) {
      window.location.href = href.toString();
      return;
    }
    
    // Add flag effect to the button
    gsap.fromTo(linkRef.current, {
      rotate: -1,
      transformOrigin: 'left center'
    }, {
      rotate: 1,
      duration: 0.15,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
      clearProps: 'all',
      onComplete: () => {
        // Navigate after animation completes
        window.location.href = href.toString();
      }
    });

    // Create a subtle wave on click
    if (!waveRef.current) return;
    
    const wave = document.createElement("div");
    Object.assign(wave.style, {
      position: "absolute",
      borderRadius: "4px",
      width: "100%",
      height: "100%",
      backgroundColor: "currentColor",
      opacity: "0.15",
      transform: "scale(0.9)",
      transformOrigin: "center",
      willChange: "transform, opacity",
      pointerEvents: "none",
      mixBlendMode: "overlay",
      zIndex: "-1",
      filter: "blur(0.5px)"
    });

    waveRef.current.appendChild(wave);

    gsap.to(wave, {
      scale: 1.1,
      opacity: 0,
      duration: 0.8,
      ease: "sine.out",
      onComplete: () => {
        if (waveRef.current?.contains(wave)) {
          waveRef.current.removeChild(wave);
        }
      },
    });
  }, [isActive, href]);

  return (
    <div className="relative inline-block">
      <Link
        ref={linkRef}
        href={href}
        onClick={handleClick}
        className={`
          relative inline-flex items-center px-4 py-2
          text-sm font-medium rounded-md
          transition-all duration-300 z-10
          ${isActive ? classActive : ""} ${className}
          overflow-visible
        `}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
          position: "relative",
          isolation: "isolate",
          overflow: "visible",
          transitionProperty: "color, background-color, transform",
        }}
        {...props}
      >
        <span className="relative z-10">{namePath}</span>
        <div
          ref={waveRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: -1,
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateZ(0) translate(-50%, -50%)",
            willChange: "opacity",
          }}
        />
      </Link>
    </div>
  );
}
