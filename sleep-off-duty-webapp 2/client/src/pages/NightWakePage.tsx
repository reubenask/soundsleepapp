/**
 * NightWakePage - 夜醒模式
 * Design: Extreme dark, minimal text, no clock, ultra-low stimulation
 * Philosophy: 醒来后不慌、不看时间、防止焦虑升级
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function NightWakePage() {
  const [, navigate] = useLocation();
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  const handleBreath = () => {
    setStarted(true);
    setCount((c) => c + 1);
  };

  return (
    <div
      className="phone-frame flex flex-col"
      style={{ background: "#040810" }}
    >
      <div className="px-6 pt-16 pb-10 flex flex-col min-h-screen items-center justify-between">

        {/* Top - minimal back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          onClick={() => navigate("/home")}
          className="self-start"
          style={{ color: "#3D4A5E" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </motion.button>

        {/* Center content */}
        <div className="flex flex-col items-center text-center flex-1 justify-center">
          {/* Soft glow orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            className="relative mb-10"
          >
            <div
              className="w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(201,166,107,0.08) 0%, transparent 70%)",
                boxShadow: "0 0 60px rgba(201,166,107,0.06)",
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ fontSize: "48px" }}
            >
              🌙
            </div>
          </motion.div>

          {/* Main text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-sm mb-3"
            style={{ color: "#3D4A5E", fontFamily: "'Noto Sans SC', sans-serif", letterSpacing: "0.1em" }}
          >
            你醒了，没关系
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-3xl mb-8"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontWeight: 600,
              color: "#AEB7CC",
              letterSpacing: "-0.5px",
            }}
          >
            先别看时间
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-sm leading-loose max-w-xs"
            style={{ color: "#3D4A5E", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            把注意力放到呼气上。
            <br />
            不用判断今晚好不好，
            <br />
            只需要重新安定下来。
          </motion.p>

          {/* Breath counter */}
          <AnimatePresence>
            {started && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex flex-col items-center gap-2"
              >
                <p className="text-xs" style={{ color: "#3D4A5E", fontFamily: "'Noto Sans SC', sans-serif" }}>
                  已呼吸
                </p>
                <p
                  className="text-4xl"
                  style={{ color: "#6E7890", fontFamily: "'Noto Serif SC', serif" }}
                >
                  {count}
                </p>
                <p className="text-xs" style={{ color: "#3D4A5E", fontFamily: "'Noto Sans SC', sans-serif" }}>
                  次
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="w-full flex flex-col gap-3"
        >
          <button
            onClick={handleBreath}
            className="w-full py-4 rounded-2xl text-sm"
            style={{
              background: "rgba(201,166,107,0.08)",
              border: "1px solid rgba(201,166,107,0.15)",
              color: "#C9A66B",
              fontFamily: "'Noto Sans SC', sans-serif",
              transition: "all 0.2s",
            }}
          >
            {started ? "再呼一次" : "5 分钟再入睡"}
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 text-xs"
            style={{ color: "#3D4A5E", fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            我已经安定了，回到首页
          </button>
        </motion.div>
      </div>
    </div>
  );
}
