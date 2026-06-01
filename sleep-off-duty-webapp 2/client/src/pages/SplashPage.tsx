/**
 * SplashPage - 启动页 / 品牌承诺页
 * Design: Deep navy background with hero moon image, warm gold CTA
 * Philosophy: 建立品牌承诺，低压力，不评判
 */
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function SplashPage() {
  const [, navigate] = useLocation();

  return (
    <div className="phone-frame relative flex flex-col overflow-hidden" style={{ background: "#0A1220" }}>
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/HFwLnQjeKfz67yDkutiaMR/sleep-hero-night-EkRHnZkkeMNoqshnc8RD3r.webp"
          alt=""
          className="w-full h-full object-cover opacity-70"
          style={{ objectPosition: "center top" }}
        />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, transparent 30%, rgba(10,18,32,0.7) 60%, rgba(10,18,32,0.98) 80%)"
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full min-h-screen px-6">
        {/* Top status bar spacing */}
        <div className="h-14" />

        {/* Brand tag top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A66B" }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: "#C9A66B", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 500 }}>
            Sleep Off Duty
          </span>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Main content bottom */}
        <div className="pb-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1
              className="text-4xl leading-tight mb-3"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontWeight: 700,
                color: "#EAE7DF",
                letterSpacing: "-0.5px"
              }}
            >
              睡眠下班
            </h1>
            <p
              className="text-lg leading-relaxed mb-2"
              style={{ color: "#C9A66B", fontFamily: "'Noto Serif SC', serif", fontWeight: 400 }}
            >
              让大脑准时下班
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#AEB7CC", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
            >
              让身体安心入睡
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="my-6 h-px"
            style={{ background: "rgba(201,166,107,0.2)", transformOrigin: "left" }}
          />

          {/* Promise text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-sm leading-relaxed mb-8"
            style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            不打分，不评判，只陪你慢慢收尾。
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="moon-btn"
            onClick={() => navigate("/status")}
          >
            今晚开始
          </motion.button>

          {/* Bottom hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="text-center text-xs mt-4"
            style={{ color: "#3D4A5E" }}
          >
            已有账号？
            <span style={{ color: "#6E7890" }}> 继续上次</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
