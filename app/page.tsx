'use client'
import Image from "next/image";
import Input from "../../components/Input";
import { useState } from "react";
import MessageBox from "../../components/MessageBox";

export default function Home() {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'user' },
    { text: 'Hi there! How can I help you?', sender: 'bot' },
    { text: 'Hi there! How can I help you?', sender: 'bot' },
    { text: `
      


### Key Changes:

1. **Reversing the Order**:
   - : For the user, the profile picture will be placed on the right side (reversing the direction of the flex container).
   - : For the bot, the profile picture will be placed on the left side, as it's the default flex direction.

2. **Flexbox Layout**:
   - Using  for the user means the message box (text) will come first, and the profile image will be placed after it (on the right side).
   - For the bot, we use, so the profile image appears first (on the left side), followed by the message box.

3. **Message Styling**:
   - : For the user, to style the message with a blue background and white text.
   - : For the bot, to style the message with a gray background and black text.

### Result:
- The user's profile picture will be on the right side of the message box, and the bot's profile picture will be on the left side.
- The messages will align properly, with each message from the user and bot having its respective style and alignment.

Let me know if you need further adjustments!
      `, sender: 'user' },
  ]);
    return (
      <div className="w-full h-screen flex flex-col">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-4 mb-20">
            {messages.map((msg, index) => (
              <MessageBox key={index} msg={msg} index={index} />
            ))}
          </div>
        </div>
      </div>
    
      {/* Input Box (Fixed at the Bottom) */}
      <div className="w-full max-w-4xl mx-auto p-4 border-t bg-white">
        <Input />
      </div>
    </div>
    
    
  );
}
