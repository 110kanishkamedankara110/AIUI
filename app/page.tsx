"use client";
import "regenerator-runtime/runtime";

import Input from "@/components/Input";
import { useRef, useState } from "react";
import MessageBox from "@/components/MessageBox";
import LottieLoader from "@/components/Runner";
import axios from "axios";
import Nothing from "@/components/Nothing";
import Image from "next/image";
export default function Home() {
  const [messages, setMessages] = useState<
    {
      message: string;
      role: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="w-full flex flex-col">
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
              <MessageBox key={index} msg={msg} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4">
        {loading ? <LottieLoader /> : ""}
        <Input
          onSubmit={(value) => {
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
            axios
              .post("http://127.0.0.1:5000/ask", data)
              .then((response) => {
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    role: "bot",
                    message: response.data,
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
                    message: `Error Occured Plese Try Again Later : ${error}`,
                  },
                ]);
              })
              .finally(() => {
                query = "";
                setLoading(false);
              });
          }}
        />
      </div>
      <div
        className="fixed z-50 cursor-pointer "
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }}
      >
        <Image
          width={30}
          height={30}
          src="/botton.svg"
          alt="Send"
          className="send-btn cursor-pointer"
        />
      </div>
    </div>
  );
}
