"use client";
import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

type Props = {
  value: string;
  onSubmit: () => void;
  onValueChange: (value: string) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, onSubmit, onValueChange }: Props, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      const container = containerRef.current;

      const inputField = inputRef.current;
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
      <div
        ref={containerRef}
        style={{ backgroundColor: "#FEF9F2" }}
        className="flex w-full h-[50px] rounded-lg border-black border-2 items-center px-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Handle enter key press
              console.log("Enter key pressed");
              // You can call your submit function here
              onSubmit();
            }
          }}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Type a message"
          className="chat-input h-full text-sm flex-grow bg-transparent outline-none"
        />
        <Image
          onClick={() => {
            onSubmit();
          }}
          width={20}
          height={20}
          src="/send.svg"
          alt="Send"
          className="send-btn w-5 h-5 cursor-pointer"
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
