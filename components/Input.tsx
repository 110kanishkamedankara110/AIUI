"use client";
import { forwardRef, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import SpeechToText from "./SpeechToText";

interface Props {
  onSubmit: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(({ onSubmit }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resetTranscriptRef = useRef<(() => void) | null>(null);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inputField = inputRef.current;
    const sendButton = container.querySelector(".send-btn") as HTMLImageElement;
    const micButton = container.querySelector(".mic-btn") as HTMLImageElement;

    inputField?.addEventListener("focus", () => {
      gsap.to(container, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });

    inputField?.addEventListener("blur", () => {
      gsap.to(container, { scale: 1, duration: 0.3, ease: "power2.out" });
    });

    const animateButton = (button: HTMLImageElement) => {
      button.addEventListener("mouseover", () => {
        gsap.to(button, { rotation: 15, scale: 1.2, duration: 0.3, ease: "bounce.out" });
      });

      button.addEventListener("mouseout", () => {
        gsap.to(button, { rotation: 0, scale: 1, duration: 0.3, ease: "bounce.out" });
      });
    };

    if (sendButton) animateButton(sendButton);
    if (micButton) animateButton(micButton);
  }, []);

  const handleTranscriptChange = (text: string) => {
    if (inputRef.current) {
      inputRef.current.value = text;
    }
  };

  const handleReset = () => {
    resetTranscriptRef.current?.();
    setTranscript("");
  };

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: "#FEF9F2" }}
      className="flex w-full h-[60px] lg:h-[50px] rounded-lg border-black border-2 items-center px-4 md:px-3"
    >
      <input
        ref={(el) => {
          inputRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
          }
        }}
        type="text"
        onKeyDown={(e) => {
          const value = inputRef.current?.value;
          if (value && e.key === "Enter") {
            onSubmit(value);
          }
        }}
        placeholder="Type a message"
        className="chat-input h-full text-base md:text-lg flex-grow bg-transparent outline-none"
      />
      <div className="flex gap-3 md:gap-2 justify-center items-center">
        <SpeechToText
          onResetRef={(resetFn) => (resetTranscriptRef.current = resetFn)}
          onTranscriptChange={handleTranscriptChange}
        />
        <Image
          onClick={() => {
            const value = inputRef.current?.value;
            if (value) {
              onSubmit(value);
              handleReset();
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }
          }}
          width={32}
          height={32}
          src="/send.svg"
          alt="Send"
          className="send-btn w-8 h-8 md:w-5 md:h-5 cursor-pointer"
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";
export default Input;
