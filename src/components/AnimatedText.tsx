"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!textRef.current || hasAnimated.current) return;

    const currentTextRef = textRef.current;
    const text = currentTextRef.textContent || "";
    const words = text.split(" ");

    // Limpiar el contenido actual
    currentTextRef.textContent = "";

    // Crear un contenedor para las palabras
    const container = document.createElement("div");
    container.className = "text-container";

    // Función para el efecto de hover
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("char")) {
        // Mover ligeramente el carácter en la dirección del movimiento del mouse
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Aumentar el multiplicador para un movimiento más notorio (de 5 a 12)
        const moveX = ((x - centerX) / centerX) * 12;
        const moveY = ((y - centerY) / centerY) * 12;

        // Añadir rotación para mayor efecto
        const rotation = moveX * 2;

        gsap.to(target, {
          x: moveX,
          y: moveY,
          rotation: rotation,
          duration: 0.3, // Animación más rápida
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("char")) {
        // Volver a la posición original con efecto más pronunciado
        gsap.to(target, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8, // Animación un poco más lenta al regresar
          ease: "elastic.out(1, 0.3)", // Más rebote
        });
      }
    };

    // Crear spans para cada palabra con letras individuales
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";
      wordSpan.style.overflow = "visible";
      wordSpan.style.verticalAlign = "top";

      // Envolver cada carácter en un span para animación individual
      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.style.display = "inline-block";
        charSpan.style.transform = "translateY(20px)";
        charSpan.style.opacity = "0";
        charSpan.style.willChange = "transform, opacity";
        charSpan.textContent = char === " " ? "\u00A0" : char;
        wordSpan.appendChild(charSpan);
      });

      // Agregar espacio entre palabras (excepto después de la última palabra)
      if (wordIndex < words.length - 1) {
        wordSpan.appendChild(document.createTextNode(" "));
      }

      container.appendChild(wordSpan);
    });

    currentTextRef.appendChild(container);

    // Obtener todos los elementos de caracteres para la animación
    const wordsEl = container.querySelectorAll(".word");

    // Crear una línea de tiempo para la animación
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.6,
      },
      delay: delay,
      onComplete: () => {
        hasAnimated.current = true;
      },
    });

    // Animar cada palabra con un efecto escalonado
    wordsEl.forEach((word, wordIndex) => {
      const wordDelay = wordIndex * 0.1;
      const wordChars = word.querySelectorAll(".char");

      // Animar cada carácter en la palabra
      wordChars.forEach((char, charIndex) => {
        const charDelay = wordDelay + charIndex * 0.03;

        // Animación del carácter
        tl.to(
          char as HTMLElement,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          charDelay
        );
      });
    });

    // Agregar event listeners para el efecto de hover
    const chars = container.querySelectorAll(".char");
    chars.forEach((char) => {
      char.addEventListener("mousemove", handleMouseMove as EventListener);
      char.addEventListener("mouseleave", handleMouseLeave as EventListener);
    });

    // Función de limpieza
    return () => {
      // Limpiar cualquier animación de GSAP
      tl.kill();

      // Remover event listeners
      chars.forEach((char) => {
        char.removeEventListener("mousemove", handleMouseMove as EventListener);
        char.removeEventListener(
          "mouseleave",
          handleMouseLeave as EventListener
        );
      });
    };
  }, [delay, className]);

  return (
    <div className={`animated-text-wrapper ${className}`}>
      <p ref={textRef} className={`animated-text ${className}`}>
        {children}
      </p>
    </div>
  );
}
