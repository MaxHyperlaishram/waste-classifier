// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-3xl font-bold mb-6">Welcome to Waste Classifier</h1>
//       <button
//         onClick={() => navigate("/classify")}
//         className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg"
//       >
//         Start Classification
//       </button>
//     </div>
//   );
// };

// export default Home;

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For smooth animations

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      {/* Animated Header */}
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to Waste Classifier ♻️
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg text-center max-w-md mb-8 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Upload an image and let AI classify your waste for a greener world! 🌍✨
      </motion.p>

      {/* Button with hover effects */}
      <motion.button
        onClick={() => navigate("/classify")}
        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg text-lg shadow-lg transition-all hover:bg-blue-600 hover:text-white hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Classification 🚀
      </motion.button>
    </div>
  );
};

export default Home;

