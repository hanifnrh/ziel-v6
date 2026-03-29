"use client"
import {motion} from 'framer-motion';

export const Loader = () => (
  <div className="flex gap-2">
    <motion.span
      animate={{ scale: [0, 1, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, times: [0, 0.5, 1] }}
      className="size-3.5 rounded-full bg-blue-500"
    />
    <motion.span
      animate={{ x: [0, 24, 0] }}
      transition={{ duration: 0.7, repeat: Infinity }}
      className="size-3.5 rounded-full bg-violet-500"
    />
    <motion.span
      animate={{ x: [0, 24, 0] }}
      transition={{ duration: 0.7, repeat: Infinity }}
      className="size-3.5 rounded-full bg-indigo-500"
    />
    <motion.span
      animate={{ scale: [1, 0, 1] }}
      transition={{ duration: 0.7, repeat: Infinity, times: [0, 0.5, 1] }}
      className="size-3.5 rounded-full bg-sky-500"
    />
  </div>
);