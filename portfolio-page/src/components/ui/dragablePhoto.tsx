"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import raghavImg from "@/assets/images/raghav.png";

export default function DraggablePhoto() {
  const [resetKey, setResetKey] = useState(0);

  const takeMeHome = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-full min-h-[300px] max-w-[200px] mx-auto md:mx-0">
      <div
        onClick={takeMeHome}
        className="absolute inset-0 border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-zinc-50 transition-colors rounded-sm"
      >
        <p className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold text-center uppercase">
          bring me back!
        </p>
      </div>

      <motion.div
        key={resetKey}
        drag
        dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
        dragMomentum={true}
        whileDrag={{ zIndex: 50, scale: 1.1 }}
        whileTap={{ cursor: "grabbing" }}
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute inset-0 z-10 cursor-grab touch-none select-none"
      >
        <img
          src={raghavImg}
          alt="Raghav"
          className="w-full h-full object-cover pointer-events-none select-none border border-border shadow-sm bg-white"
        />
      </motion.div>
    </div>
  );
}
