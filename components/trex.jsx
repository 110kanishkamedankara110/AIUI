import { useEffect } from "react";
import lottie from "lottie-web";
import trex from "../public/trex.json"; // Import your Lottie JSON file

const Trex = () => {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("trex"), // The container to render the animation in
      animationData: trex, // Your Lottie JSON file
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
  id="trex"
  style={{
    display: "inline-block", // Ensures the container holds dimensions
  }}
></span>;
};

export default Trex;
