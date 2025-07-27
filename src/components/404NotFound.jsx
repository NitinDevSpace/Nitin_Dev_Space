import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url('/404.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content Wrapper */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Side: 404 */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[180px] md:text-[240px] font-extrabold text-white"
        >
          404
        </motion.div>

        {/* Right Side: Message and Button */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-light mb-4">Page Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-8 py-3 border border-white rounded-md text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            BACK HOME
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;