"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import styles from "./ui-header.module.css";
import { UiLink } from "@/lib/components/index";
import { SearchIcon } from "@/lib/icons/search.icon";
import Image from "next/image";
import { MenuBurger } from "@/lib/components/menu-burger/menu-burger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function UiHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  const runHeaderAnimation = () => {
    // Clear any existing animations
    if (animationRef.current) {
      animationRef.current.revert();
    }

    // Initialize new animation context
    animationRef.current = gsap.context(() => {
      // Get elements
      const header = headerRef.current;
      const logo = logoRef.current;
      const nav = navRef.current;
      const search = searchRef.current;

      if (!header || !logo || !nav || !search) return;

      // Set initial state (invisible and slightly above)
      gsap.set(header, { y: -20, opacity: 0 });
      gsap.set([logo, ...Array.from(nav.children), search], { opacity: 0 });

      // Animate header in
      gsap.to(header, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.1
      });

      // Stagger children animations
      gsap.to([logo, ...Array.from(nav.children), search], {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });
    });
  };

  // Run animation on mount and route change
  useEffect(() => {
    runHeaderAnimation();
    
    // Cleanup GSAP context on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.revert();
      }
    };
  }, [pathname]); // Re-run when pathname changes

  return (
    <header ref={headerRef} className={`${styles.header} fixed w-full z-50 transition-all duration-300`}>
      <div ref={logoRef} className="relative">
        <Image 
          src="/img/logo.svg" 
          alt="Logo" 
          className={styles.logo} 
          width={150} 
          height={40} 
          priority
        />
      </div>
      <MenuBurger />
      <nav ref={navRef} className={styles.nav}>
        <UiLink
          namePath="Home"
          href="/"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
        <UiLink
          namePath="¿Donde ir?"
          href="/where"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
        <UiLink
          namePath="¿Que hacer?"
          href="/what"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
      </nav>
      <div ref={searchRef} className={`${styles.searchContainer} group`}>
        <input
          type="text"
          placeholder="Explora los cinco corazones"
          className={`${styles.input} focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
        />
        <button className={`${styles.button} group-hover:bg-primary-600 transition-colors duration-300`}>
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}
