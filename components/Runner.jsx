import { useEffect } from "react";
import lottie from "lottie-web";
import loaderJson from "../public/runner.json";  // Import your Lottie JSON file

const LottieLoader = () => {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-loader"),  // The container to render the animation in
      animationData: loaderJson,  // Your Lottie JSON file
      loop: true,  // Animation will loop indefinitely
      autoplay: true,  // Start animation automatically
    });

    // Clean up the animation on unmount
    return () => {
      animation.destroy();  // Destroy the animation when the component is unmounted
    };
  }, []);

  return (
    <div id="lottie-loader" style={{ width: "100px", height: "100px"}}></div>
  );
};

export default LottieLoader;
