import { useEffect } from "react";
import lottie from "lottie-web";
import listener2 from "../public/listening2.json"; // Import your Lottie JSON file

const Listening2 = () => {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("listener2"), // The container to render the animation in
      animationData: listener2, // Your Lottie JSON file
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
  className="w-full mb-[-7]"
  id="listener2"
  style={{
    display: "inline-block", // Ensures the container holds dimensions
  }}
></span>;
};

export default Listening2;
