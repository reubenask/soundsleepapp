/**
 * ShutdownRitualPage - 睡前关闭仪式 / 待办卸载
 * Design: Dark, focused input, warm gold CTA
 * Philosophy: 把脑中未完成的事写下来，让大脑放心停止处理
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function ShutdownRitualPage() {
  const [, navigate] = useLocation();
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const addItem = () => {
    if (input.trim()) {
      setItems((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  const handleSave = () => {
    if (input.trim()) {
      setItems((prev) => [...prev, input.trim()]);
      setInput("");
    }
    setSaved(true);
    setTimeout(() => navigate("/anxiety"), 1200);
  };

  return (
    <div className="phone-frame flex flex-col" style={{ background: "#0D1623" }}>
      <div className="px-6 pt-14 pb-8 flex flex-col min-h-screen">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/home")}
          className="flex items-center gap-1 mb-8 w-fit"
          style={{ color: "#6E7890" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>返回</span>
        </motion.button>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="h-1 flex-1 rounded-full"
              style={{
                background: step === 1 ? "linear-gradient(90deg, #C9A66B, #E0C48A)" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📋</span>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(201,166,107,0.12)", color: "#C9A66B", fontFamily: "'Noto Sans SC', sans-serif" }}>
              第 1 步 · 待办卸载
            </span>
          </div>
          <h1
            className="text-2xl mb-2"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: "#EAE7DF" }}
          >
            把工作放下
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            写下还在脑内转的事，它们会被保存到明天
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-4"
        >
          <div
            className="rounded-2xl p-4 flex gap-3"
            style={{ background: "#16202F", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  addItem();
                }
              }}
              placeholder="例：明天汇报、客户回复、还没确认的方案……"
              rows={3}
              className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
              style={{
                color: "#EAE7DF",
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 300,
              }}
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={addItem}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(201,166,107,0.12)",
                color: "#C9A66B",
                fontFamily: "'Noto Sans SC', sans-serif",
                border: "1px solid rgba(201,166,107,0.2)",
              }}
            >
              + 添加一条
            </button>
          </div>
        </motion.div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 16, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 mb-3 px-4 py-3 rounded-xl"
                style={{ background: "#16202F", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                  style={{ background: "rgba(201,166,107,0.15)", border: "1px solid rgba(201,166,107,0.3)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A66B" }} />
                </div>
                <p className="text-sm flex-1" style={{ color: "#AEB7CC", fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {item}
                </p>
                <button
                  onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
                  style={{ color: "#3D4A5E" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Save CTA */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {!saved ? (
              <motion.div key="save">
                <button className="moon-btn" onClick={handleSave}>
                  存到明天
                </button>
                <p
                  className="text-center text-xs mt-3"
                  style={{ color: "#3D4A5E", fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  它已经被记录，今晚不用再处理
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="saved"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
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
                  已存好，继续下一步
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
