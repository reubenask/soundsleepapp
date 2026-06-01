/**
 * MorningLogPage - 早晨记录
 * Design: Warm ivory/morning palette, energy selector, confidence slider
 * Philosophy: 低压力反馈，记录恢复感而不是睡眠分数
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const energyLevels = [
  { id: "great", emoji: "✨", label: "神清气爽", color: "#91BFA3" },
  { id: "ok", emoji: "😌", label: "还不错", color: "#C9A66B" },
  { id: "tired", emoji: "😴", label: "有点累", color: "#7B9FD4" },
  { id: "rough", emoji: "😵", label: "很疲惫", color: "#B8A0D4" },
];

export default function MorningLogPage() {
  const [, navigate] = useLocation();
  const [energy, setEnergy] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(60);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate("/review"), 1200);
  };

  return (
    <div
      className="phone-frame flex flex-col"
      style={{ background: "#F7F1E5" }}
    >
      {/* Morning background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/HFwLnQjeKfz67yDkutiaMR/sleep-morning-GcC9miN3stGefCBPR9Yqfz.webp"
          alt=""
          className="w-full h-48 object-cover opacity-30"
          style={{ objectPosition: "center top" }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to bottom, rgba(247,241,229,0) 50%, rgba(247,241,229,1) 100%)" }}
        />
      </div>

      <div className="relative z-10 px-6 pt-14 pb-8 flex flex-col min-h-screen">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/home")}
          className="flex items-center gap-1 mb-8 w-fit"
          style={{ color: "#9AA0B0" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>返回</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <p className="text-sm mb-1" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
            早上好
          </p>
          <h1
            className="text-3xl"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: "#283044" }}
          >
            昨晚怎么样？
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
            用 3 秒记录一下恢复感
          </p>
        </motion.div>

        {/* Energy selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <p
            className="text-sm font-medium mb-3"
            style={{ color: "#283044", fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            今天精力如何？
          </p>
          <div className="grid grid-cols-4 gap-2">
            {energyLevels.map((e) => (
              <button
                key={e.id}
                onClick={() => setEnergy(e.id)}
                className="flex flex-col items-center gap-2 py-3 rounded-2xl"
                style={{
                  background: energy === e.id ? `${e.color}20` : "rgba(255,255,255,0.7)",
                  border: `1px solid ${energy === e.id ? `${e.color}60` : "rgba(40,48,68,0.08)"}`,
                  transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
                  transform: energy === e.id ? "scale(1.03)" : "scale(1)",
                }}
              >
                <span className="text-2xl">{e.emoji}</span>
                <span
                  className="text-xs"
                  style={{
                    color: energy === e.id ? e.color : "#9AA0B0",
                    fontFamily: "'Noto Sans SC', sans-serif",
                    fontWeight: energy === e.id ? 500 : 400,
                  }}
                >
                  {e.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Confidence slider */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8 p-5 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(40,48,68,0.08)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium" style={{ color: "#283044", fontFamily: "'Noto Sans SC', sans-serif" }}>
              昨晚睡眠信心
            </p>
            <span
              className="text-lg font-semibold"
              style={{ color: "#C9A66B", fontFamily: "'Noto Serif SC', serif" }}
            >
              {confidence}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full"
            style={{
              accentColor: "#C9A66B",
              height: "4px",
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>很差</span>
            <span className="text-xs" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>很好</span>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mb-6"
        >
          <p className="text-sm font-medium mb-2" style={{ color: "#283044", fontFamily: "'Noto Sans SC', sans-serif" }}>
            有什么想记录的？（可选）
          </p>
          <textarea
            rows={2}
            placeholder="例：昨晚关闭仪式很有用，感觉脑子清空了……"
            className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(40,48,68,0.08)",
              color: "#283044",
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 300,
            }}
          />
        </motion.div>

        {/* CTA */}
        <AnimatePresence mode="wait">
          {!saved ? (
            <motion.button
              key="save"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleSave}
              className="w-full py-4 rounded-2xl font-semibold text-base"
              style={{
                background: "linear-gradient(135deg, #C9A66B, #E0C48A)",
                color: "#283044",
                fontFamily: "'Noto Sans SC', sans-serif",
                boxShadow: "0 4px 20px rgba(201,166,107,0.25)",
                transition: "all 0.2s",
              }}
            >
              保存记录
            </motion.button>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(145,191,163,0.2)", border: "1px solid rgba(145,191,163,0.4)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#91BFA3" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: "#91BFA3", fontFamily: "'Noto Sans SC', sans-serif" }}>
                已记录，查看本周复盘
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
