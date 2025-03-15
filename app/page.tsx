"use client";
import "regenerator-runtime/runtime";
import Input from "@/components/Input";
import { useCallback, useRef, useState } from "react";
import MessageBox from "@/components/MessageBox";
import LottieLoader from "@/components/Runner";
import Listening2 from "@/components/Listening2";
import axios from "axios";
import Nothing from "@/components/Nothing";
import Image from "next/image";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
export default function Home() {
  const [messages, setMessages] = useState<
    {
      message: string;
      role: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState<string>();

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenmessage, setIsOpenMessage] = useState(false);

  const onSubmit = (value: string) => {
    const messageHistory = messages;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "user",
        message: value,
      },
    ]);
    let query = value;
    setLoading(true);

    const data = {
      query: value,
      history: messageHistory,
    };
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    fetch(`https://bot.hellodynamicbiz.com/ask`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure proper content type
      },
    })
      .then((response) => response.text()) // Convert response to text
      .then((text) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            message: text, // Use the resolved text
          },
        ]);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        console.error("Error sending request:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            message: `Error Occurred. Please Try Again Later: ${error.message}`,
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-col p-10">
      <div className="flex-1 space-y-4 px-4 py-2">
        <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto">
          <div className="space-y-4 mb-20">
            {messages.length <= 0 ? (
              <div className="w-full h-full items-center justify-center flex flex-col">
                <Nothing />
              </div>
            ) : (
              ""
            )}

            {messages.map((msg, index) => (
              <MessageBox
                handleSend={onSubmit}
                key={index}
                msg={msg}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4">
        {loading ? <LottieLoader /> : ""}

        <Input isOpenSetter={setIsOpen} onSubmit={onSubmit} />
      </div>
      <div className="fixed top-0 left-0 z-50 flex justify-between items-center  w-full p-4">
        <div
          className="cursor-pointer"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <Image
            width={30}
            height={30}
            src="/botton.svg"
            alt="Scroll to Bottom"
            className="send-btn cursor-pointer"
          />
        </div>
        <button
          style={{ borderWidth: 2, borderColor: "#10375c" }}
          className="bg-white  text-black-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          onClick={() => router.push("login")}
        >
          Login
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg sm:max-w-xl lg:max-w-2xl w-full relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-4">Complain Box</h2>
            <div className="flex flex-col gap-4">
              <input
                id="inp"
                ref={inputRef}
                type="text"
                onKeyDown={(e) => {}}
                onKeyUp={(e) => {
                  const value = inputRef.current?.value;
                }}
                placeholder="Type Complain"
                style={{
                  borderWidth: 2,
                  borderColor: "#10375c",
                }}
                className="chat-input p-2 rounded-lg h-full w-full placeholder-[#10375C] text-[#10375C] text-base md:text-lg flex-grow bg-transparent outline-none"
              />
              <button
                style={{ borderWidth: 2, borderColor: "#10375c" }}
                className="bg-white w-fit pl-2 pr-2 text-black-600 rounded-md font-semibold hover:bg-gray-200 transition"
                onClick={() => {
                  if (inputRef.current?.value.trim() !== "") {
                    const messageHistory = messages;

                    setLoading(true);

                    const data = {
                      query: "complain " + inputRef.current?.value.trim(),
                      history: messageHistory,
                    };

                    fetch(`https://bot.hellodynamicbiz.com/ask`, {
                      body: JSON.stringify(data),
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then((response) => response.text())
                      .then((text) => {
                        setMessage(text);
                        setIsOpen(false);
                        setIsOpenMessage(true);
                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      })
                      .catch((e) => {
                        setMessage(e);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                }}
              >
                Complain
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpenmessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg sm:max-w-xl lg:max-w-2xl w-full relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => {
                setIsOpenMessage(false);
                setMessage("");
              }}
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-4">Message</h2>
            <p>{message}</p>
            <div className="flex flex-col gap-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}
