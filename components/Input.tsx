'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Input = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    const inputField = container?.querySelector("input") as HTMLInputElement;
    const sendButton = container?.querySelector("img") as HTMLImageElement;

    inputField?.addEventListener("focus", () => {
      gsap.to(container, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    inputField?.addEventListener("blur", () => {
      gsap.to(container, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    sendButton?.addEventListener("mouseover", () => {
        gsap.to(sendButton, {
          rotation: 15,
          scale: 1.2,
          duration: 0.3,
          ease: "bounce.out",
        });
      });
  
      sendButton?.addEventListener("mouseout", () => {
        gsap.to(sendButton, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: "bounce.out",
        });
      });
  }, []);

  return (
    <div ref={containerRef} style={{
        backgroundColor:"#FEF9F2"
    }} className="flex w-full h-[40px]  rounded-lg border-black border-2 items-center px-3">
      <input
        type="text"
        placeholder="Type a message"
        className="chat-input text-sm flex-grow bg-transparent border-none outline-none"
      />
      <img
        src="/send.svg"
        alt="Send"
        className="send-btn w-4 h-4 cursor-pointer"
      />
    </div>
  );
};

export default Input;
