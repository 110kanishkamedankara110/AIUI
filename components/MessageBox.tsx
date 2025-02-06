import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react"; // For copy button icon

type Props = {
  index: number;
  msg: {
    role: string;
    message: string;
    isTyping?: boolean; // Added typing indicator support
  };
};

const MessageBox = ({ index, msg }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (message: string) => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      key={index}
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      } items-start space-x-2`}
    >
      {/* Bot Avatar */}
      {msg.role === "bot" && (
        <div className="border-black border-2 w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
          <Image
            src="/bot.svg"
            width={32}
            height={32}
            alt="Profile"
            className="object-contain"
          />
        </div>
      )}

      {/* Message Box */}
      <div
        className={`p-3 rounded-lg max-w-xl markdown`} // Increased width
        style={{
          backgroundColor: msg.role === "user" ? "#EB5A3C" : "#155E95",
          color: msg.role === "user" ? "#FBF5E5" : "#D9EAFD",
        }}
      >
        {/* AI Typing Animation */}
        {msg.isTyping ? (
          <div className="text-gray-400 text-sm animate-pulse">AI is typing...</div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const codeText = String(children).trim();
                if (inline) {
                  return <code className="bg-gray-700 px-2 py-1 rounded">{codeText}</code>;
                }
                return (
                  <div className="relative">
                    <button
                      className="absolute top-2 right-2 text-gray-300 hover:text-white"
                      onClick={() => handleCopy(codeText)}
                    >
                      <Copy size={16} />
                    </button>
                    <pre className="p-3 rounded-lg overflow-x-auto bg-black text-white">{children}</pre>
                  </div>
                );
              },
            }}
          >
            {msg.message}
          </ReactMarkdown>
        )}
      </div>

      {/* User Avatar */}
      {msg.role === "user" && (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/user.svg"
            width={32}
            height={32}
            alt="Profile"
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBox;
