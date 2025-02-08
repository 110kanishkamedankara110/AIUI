import Image from "next/image";
import {
  ClassAttributes,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react"; // For copy button icon
import ButtonRemark from "./ButtonRemark";
import QuestionRemark from "./ButtonRemark";

type Props = {
  index: number;
  msg: {
    role: string;
    message: string;
    isTyping?: boolean; // Added typing indicator support
  };
  handleSend: (value: string) => void;
};
type CodeProps = {
  node: any;
  inline: boolean; // Explicitly define `inline` here
  className: string;
  children: React.ReactNode;
  [key: string]: any;
};
const MessageBox = ({ index, msg, handleSend }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (message: string) => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const [isSpeaking, setIsSpeaking] = useState(false);

  const ttx = () => {
    !isSpeaking ? handleSpeak(msg.message) : handleStop();
  };

  const handleSpeak = (text: string) => {
    if (!text) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    const speak = () => {
      const voices = synth.getVoices();
      console.log(voices); // Debugging: See available voices

      // Select the preferred female voice
      const voice = voices.find((v) =>
        /Google UK English Female/i.test(v.name)
      );

      if (voice) {
        utterance.voice = voice;
        utterance.pitch = 1.1; // Slightly higher pitch for a more natural tone
        utterance.rate = 0.9; // Slow down for clarity
        utterance.volume = 1.0; // Full volume
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = speak; // Wait for voices to load
    } else {
      speak();
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const CustomButton = ({ text }: { text: string }) => {
    return (
      <button onClick={() => handleSend(text)} className="bg-white text-black p-2 rounded-sm">
        {text}
      </button>
    );
  };

  const parseCustomButton = (text: string) => {
    try {
      const match = text.match(/^:::(.+?):::$/);
      if (match) {
        return { text: match[1] };
      }
    } catch {
      return null;
    }
  };

  // Markdown components override

  return (
    <div
      key={index}
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      } items-start space-x-2`}
    >
      {msg.role === "bot" && (
        <div
          className="cursor-pointer w-6 h-6 aspect-square flex items-center justify-center border-2 border-black"
          style={{
            marginRight: "-20px",
            marginTop: "-10px",
            zIndex: 999,
            backgroundColor: "white",
            borderRadius: "50%",
          }}
          onClick={() => ttx()}
        >
          <Image
            src="/speaker.svg"
            width={14}
            height={14}
            alt="Profile"
            className="object-contain bottom-0 ml"
          />
        </div>
      )}
      {/* Bot Avatar */}
      {msg.role === "bot" && (
        <Image
          src="/bot.svg"
          width={32}
          height={32}
          alt="Profile"
          className="object-contain border-black border-2 rounded-full"
        />
      )}

      {/* Message Box */}
      <div
        className={`p-3 rounded-lg max-w-xl markdown`} // Increased width
        style={{
          backgroundColor: msg.role === "user" ? "#EB5A3C" : "#F5F5F5",
          color: msg.role === "user" ? "#FBF5E5" : "#4B164C",
        }}
      >
        {/* AI Typing Animation */}
        {msg.isTyping ? (
          <div className="text-gray-400 text-sm animate-pulse">
            AI is typing...
          </div>
        ) : (
          <div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({
                  node,
                  className,
                  children,
                  ...props
                }: HTMLAttributes<HTMLElement> &
                  ExtraProps &
                  ClassAttributes<HTMLElement>) {
                  const codeText = String(children).trim();

                  return (
                    <div className="relative">
                      <button
                        className="absolute top-2 right-2 text-gray-300 hover:text-white"
                        onClick={() => handleCopy(codeText)}
                      >
                        <Copy size={16} />
                      </button>
                      <pre className="p-3 rounded-lg overflow-x-auto bg-black text-white">
                        {children}
                      </pre>
                    </div>
                  );
                },
                p: ({ children }) => {
                  const buttonData = parseCustomButton(children as string);
                  if (buttonData) {
                    return <CustomButton text={buttonData.text} />
                  }
                  return <p>{children}</p>;
                },
              }}
            >
              {msg.message}
            </ReactMarkdown>
          </div>
        )}
      </div>
      
      {/* User Avatar */}
      {msg.role === "user" && (
        <Image
          src="/user.svg"
          width={32}
          height={32}
          alt="Profile"
          className="object-contain  border-black border-2 rounded-full"
        />
      )}
      {msg.role === "user" && (
        <div
          className="absolute cursor-pointer w-6 h-6 flex items-center justify-center border-2 border-black"
          style={{
            marginRight: "-10px",
            marginTop: "-10px",
            zIndex: 999,
            backgroundColor: "white",
            borderRadius: "50%",
          }}
          onClick={() => ttx()}
        >
          <Image
            src="/speaker.svg"
            width={14}
            height={14}
            alt="Profile"
            className="object-contain bottom-0"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBox;
