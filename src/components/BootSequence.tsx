import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  const bootText = [
    "BIOS DATE 01/01/2077 14:22:54 VER 1.0.2",
    "CPU: QUANTUM CORE i9-9900K 128-CORE",
    "DETECTING PRIMARY MASTER ... 128TB SSD",
    "DETECTING PRIMARY SLAVE ... NONE",
    "CHECKING NVRAM ..................... OK",
    "LOADING KERNEL ..................... OK",
    "MOUNTING ROOT FILESYSTEM ........... OK",
    "INITIALIZING NEURAL NETWORK ........ OK",
    "ESTABLISHING SECURE CONNECTION ..... OK",
    "BYPASSING FIREWALL ................. OK",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((text, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 1000);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="flex flex-col items-start justify-start p-10 w-full h-full text-lg">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="mb-1"
        >
          {`> ${line}`}
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-3 h-5 bg-green-500 mt-2"
      />
    </div>
  );
};
