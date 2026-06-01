/**
 * HomePage - 首页 / 睡前行动中心
 * Design: Dark navy, today's recommended action card, quick access shortcuts
 * Philosophy: 今晚行动中心，减少选择成本
 */
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [, navigate] = useLocation();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  const shortcuts = [
    { icon: "🌙", label: "夜醒", sub: "再入睡", path: "/night-wake", color: "#91BFA3" },
    { icon: "🌬️", label: "放松", sub: "3分钟", path: "/sleep-training", color: "#7B9FD4" },
    { icon: "☀️", label: "记录", sub: "早晨恢复感", path: "/morning", color: "#C9A66B" },
    { icon: "📊", label: "复盘", sub: "本周趋势", path: "/review", color: "#B8A0D4" },
  ];

  return (
    <div className="phone-frame flex flex-col" style={{ background: "#0D1623" }}>
      <div className="px-6 pt-14 pb-8 flex flex-col min-h-screen">

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-xs mb-0.5" style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif" }}>
              晚安
            </p>
            <p
              className="text-3xl font-light tracking-tight"
              style={{ color: "#EAE7DF", fontFamily: "'Noto Serif SC', serif" }}
            >
              {time}
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(201,166,107,0.12)", border: "1px solid rgba(201,166,107,0.2)" }}
          >
            <span className="text-lg">🌙</span>
          </div>
        </motion.div>

        {/* Main recommendation card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-3xl overflow-hidden mb-6 relative"
          style={{
            background: "linear-gradient(135deg, #16202F 0%, #1C2A3E 100%)",
            border: "1px solid rgba(201,166,107,0.15)",
          }}
        >
          {/* Subtle glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #C9A66B 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="p-6 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: "rgba(201,166,107,0.15)", color: "#C9A66B", fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                今晚推荐
              </div>
              <div
                className="px-2.5 py-1 rounded-full text-xs"
                style={{ background: "rgba(255,255,255,0.05)", color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                7 分钟
              </div>
            </div>

            <h2
              className="text-2xl mb-2"
              style={{ color: "#EAE7DF", fontFamily: "'Noto Serif SC', serif", fontWeight: 600 }}
            >
              准备下班
            </h2>
            <p
              className="text-sm mb-6 leading-relaxed"
              style={{ color: "#AEB7CC", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
            >
              把脑子里还在转的事情放下来，
              <br />今晚不用再处理。
            </p>

            {/* Steps preview */}
            <div className="flex gap-2 mb-6">
              {["待办卸载", "焦虑卸载", "入睡训练"].map((step, i) => (
                <div
                  key={step}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#AEB7CC",
                    fontFamily: "'Noto Sans SC', sans-serif",
                  }}
                >
                  <span style={{ color: "#C9A66B", fontWeight: 600 }}>{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>

            <button
              className="moon-btn"
              onClick={() => navigate("/shutdown")}
            >
              开始收尾
            </button>
          </div>
        </motion.div>

        {/* ASMR 助眠声音入口大卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-5"
        >
          <button
            onClick={() => navigate("/asmr")}
            className="w-full rounded-2xl overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #1a1f35 0%, #16202F 100%)",
              border: "1px solid rgba(201,166,107,0.2)",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              textAlign: "left",
              transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* 背景光晕 */}
            <div style={{
              position: "absolute",
              right: 0, top: 0, bottom: 0,
              width: "40%",
              background: "linear-gradient(90deg, transparent, rgba(201,166,107,0.06))",
              pointerEvents: "none",
            }} />
            <div
              style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: "rgba(201,166,107,0.12)",
                border: "1px solid rgba(201,166,107,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
              }}
            >
              🎧
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#EAE7DF", fontFamily: "'Noto Serif SC', serif" }}>
                  助眠声音
                </span>
                <span style={{
                  fontSize: 10, padding: "2px 7px", borderRadius: 20,
                  background: "rgba(201,166,107,0.15)", color: "#C9A66B",
                  fontFamily: "'Noto Sans SC', sans-serif",
                }}>
                  10 种声音类别
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#AEB7CC", fontFamily: "'Noto Sans SC', sans-serif", lineHeight: 1.4 }}>
                无说话 · 无音乐 · 纯自然ASMR声音
              </p>
            </div>
            <span style={{ color: "#C9A66B", fontSize: 18, flexShrink: 0 }}>›</span>
          </button>
        </motion.div>

        {/* Quick shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <p
            className="text-xs mb-3"
            style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif", letterSpacing: "0.05em" }}
          >
            快捷入口
          </p>
          <div className="grid grid-cols-4 gap-3">
            {shortcuts.map((s, i) => (
              <motion.button
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => navigate(s.path)}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl"
                style={{
                  background: "#16202F",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${s.color}18` }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: "#EAE7DF", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    {s.label}
                  </p>
                  <p className="text-xs" style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    {s.sub}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 px-4 py-3 rounded-2xl"
          style={{ background: "rgba(145,191,163,0.08)", border: "1px solid rgba(145,191,163,0.15)" }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "#91BFA3", fontFamily: "'Noto Sans SC', sans-serif" }}>
            💡 <span style={{ fontWeight: 500 }}>小提示：</span>睡前把脑中的待办写下来，能帮助大脑"放心"停止处理，更容易入睡。
          </p>
        </motion.div>

        {/* Bottom nav placeholder */}
        <div className="mt-auto pt-8">
          <div className="flex justify-around py-4 rounded-2xl" style={{ background: "#16202F", border: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { icon: "🏠", label: "今晚", active: true },
              { icon: "📈", label: "趋势", active: false },
              { icon: "🎵", label: "音频", active: false },
              { icon: "👤", label: "我的", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className="flex flex-col items-center gap-1"
                onClick={() => {
                  if (item.label === "趋势") navigate("/review");
                  else if (item.label === "音频") navigate("/asmr");
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className="text-xs"
                  style={{
                    color: item.active ? "#C9A66B" : "#6E7890",
                    fontFamily: "'Noto Sans SC', sans-serif",
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
