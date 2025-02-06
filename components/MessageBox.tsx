import ReactMarkdown from "react-markdown";

type Props = {
  index: number;
  msg: {
    sender: string;
    text: string;
  };
};

const MessageBox = ({ index, msg }: Props) => {
  const ui = (
    <div
      key={index}
      className={`flex ${
        msg.sender === "user" ? "justify-end" : "justify-start"
      } items-start space-x-2`}
    >
      {msg.sender == "bot" ? (
        <div className=" border-black border-2 w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
          <img
            src={"/bot.svg"}
            alt="Profile"
            className="w-6 h-6 object-contain"
          />
        </div>
      ) : (
        ""
      )}
      <div
        className={`p-3 rounded-lg max-w-xs `}
        style={{
          backgroundColor: msg.sender == "user" ? "#EB5A3C" : "#155E95",
          color: msg.sender == "user" ? "#FBF5E5" : "#D9EAFD",
        }}
      >
        <ReactMarkdown>{msg.text}</ReactMarkdown>
      </div>
      {msg.sender == "user" ? (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={"/user.svg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
  return ui;
};

export default MessageBox;
