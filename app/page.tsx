"use client";
import Input from "@/components/Input";
import { useRef, useState } from "react";
import MessageBox from "@/components/MessageBox";
import LottieLoader from "@/components/Runner";
import axios from "axios";
import Nothing from "@/components/Nothing";
export default function Home() {
  const [messages, setMessages] = useState<
    {
      message: string;
      role: string;
    }[]
  >([]);
  const [loading,setLoading]=useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="w-full flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-2">
        <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto">
          <div className="space-y-4 mb-20">
            
            {
              (messages.length<=0)?<div className="w-full h-full items-center justify-center flex flex-col"><Nothing/></div>:""
            }
            
            {messages.map((msg, index) => (
              <MessageBox key={index} msg={msg} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl   fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4">
        {
          loading?<LottieLoader/>:""
        }
        <Input
          value={value}
          onValueChange={(v) => {
            setValue(v);
          }}
          onSubmit={() => {
            const messageHistory=messages;
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                role: "user",
                message: value,
              },
            ]);
            let query=value;

            setValue("");
            setLoading(true);

            const data = {
              query:value,
              history:messageHistory,
            };

            axios
            .post("http://127.0.0.1:5000/send", data)
            .then((response) => {
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  role: "bot",
                  message: response.data,
                },
              ]);
            })
            .catch((error) => {
              console.error("Error sending request:", error);
              alert("Error Occured Plese Try Again Later")
            }).finally(()=>{
              query="";
              setLoading(false)
            })

          }}
        />
      </div>
    </div>
  );
}
