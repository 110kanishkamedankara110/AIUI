import { useEffect } from "react";
import lottie from "lottie-web";
import listener from "../public/listening.json"; // Import your Lottie JSON file

const Listening = ({onClick}) => {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("listener"), // The container to render the animation in
      animationData: listener, // Your Lottie JSON file
      loop: true, // Animation will loop indefinitely
      autoplay: true,
      renderer: "svg", // or "canvas"
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet", // Ensures the aspect ratio is maintained
      },
    });

    // Clean up the animation on unmount
    return () => {
      animation.destroy(); // Destroy the animation when the component is unmounted
    };
  }, []);

  return <span
  onClick={onClick}
  className="ml-2 cursor-pointer"
  id="listener"
  style={{
    width: "20px",
    height: "20px",
    display: "inline-block", // Ensures the container holds dimensions
  }}
></span>;
};

export default Listening;
