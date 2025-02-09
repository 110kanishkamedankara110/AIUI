import { useEffect } from "react";
import lottie from "lottie-web";
import loaderJson from "../public/smile.json"; // Import your Lottie JSON file

const Nothing = () => {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-loader-not"), // The container to render the animation in
      animationData: loaderJson, // Your Lottie JSON file
      loop: true, // Animation will loop indefinitely
      autoplay: true, // Start animation automatically
    });

    // Clean up the animation on unmount
    return () => {
      animation.destroy(); // Destroy the animation when the component is unmounted
    };
  }, []);

  return (
    <>
      <div id="lottie-loader-not" style={{ width: "100%", height: "100%" }}></div>
      <p className="text-5xl text-gray-500 ">Welcome to Dynamic biz</p>
    </>
  );
};

export default Nothing;
