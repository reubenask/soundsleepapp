/**
 * AnxietyUnloadPage - 焦虑卸载 / 认知改写卡片
 * Design: Worry card + reframe card, gentle purple accent
 * Philosophy: CBT-I认知重构的生活化表达，不说教，只提供更柔和的替代表达
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const worries = [
  {
    worry: "如果睡不好，明天会不会完了？",
    reframe: "即使今晚一般，我也可以用更慢的节奏开始明天。身体比我们想象的更有弹性。",
    tag: "工作表现焦虑",
  },
  {
    worry: "已经 12 点了，再不睡就完了。",
    reframe: "看时间只会让焦虑升级。哪怕只睡 5 小时，也比带着焦虑躺着更有效。",
    tag: "时间焦虑",
  },
  {
    worry: "我好像每天都睡不好，是不是有问题？",
    reframe: "偶尔睡不好是正常的。真正的睡眠障碍需要时间形成，一两次不代表什么。",
    tag: "睡眠灾难化",
  },
];

export default function AnxietyUnloadPage() {
  const [, navigate] = useLocation();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const current = worries[currentIdx];

  const handleFlip = () => setFlipped(true);

  const handleNext = () => {
    if (currentIdx < worries.length - 1) {
      setCurrentIdx((i) => i + 1);
      setFlipped(false);
    } else {
      setDone(true);
      setTimeout(() => navigate("/sleep-training"), 1000);
    }
  };

  return (
    <div className="phone-frame flex flex-col" style={{ background: "#0D1623" }}>
      <div className="px-6 pt-14 pb-8 flex flex-col min-h-screen">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/shutdown")}
          className="flex items-center gap-1 mb-8 w-fit"
          style={{ color: "#6E7890" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>返回</span>
        </motion.button>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="h-1 flex-1 rounded-full"
              style={{
                background: step <= 2 ? "linear-gradient(90deg, #C9A66B, #E0C48A)" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💭</span>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(184,160,212,0.12)", color: "#B8A0D4", fontFamily: "'Noto Sans SC', sans-serif" }}>
              第 2 步 · 焦虑卸载
            </span>
          </div>
          <h1
            className="text-2xl mb-2"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: "#EAE7DF" }}
          >
            今晚最担心？
          </h1>
          <p className="text-sm" style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif" }}>
            {currentIdx + 1} / {worries.length} · 点击卡片看看另一种想法
          </p>
        </motion.div>

        {/* Card */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIdx}-${flipped}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              {!flipped ? (
                /* Worry card */
                <button
                  onClick={handleFlip}
                  className="w-full text-left rounded-3xl p-6"
                  style={{
                    background: "linear-gradient(135deg, #1C2A3E, #1A2035)",
                    border: "1px solid rgba(184,160,212,0.2)",
                    minHeight: "200px",
                  }}
                >
                  <div
                    className="inline-block px-2.5 py-1 rounded-full text-xs mb-4"
                    style={{ background: "rgba(184,160,212,0.12)", color: "#B8A0D4", fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {current.tag}
                  </div>
                  <p
                    className="text-lg leading-relaxed mb-6"
                    style={{ color: "#EAE7DF", fontFamily: "'Noto Serif SC', serif", fontWeight: 400 }}
                  >
                    "{current.worry}"
                  </p>
                  <div className="flex items-center gap-2" style={{ color: "#6E7890" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                    <span className="text-xs" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                      点击看看另一种想法
                    </span>
                  </div>
                </button>
              ) : (
                /* Reframe card */
                <div
                  className="w-full rounded-3xl p-6"
                  style={{
                    background: "linear-gradient(135deg, #162030, #1A2A1E)",
                    border: "1px solid rgba(145,191,163,0.25)",
                    minHeight: "200px",
                  }}
                >
                  <div
                    className="inline-block px-2.5 py-1 rounded-full text-xs mb-4"
                    style={{ background: "rgba(145,191,163,0.12)", color: "#91BFA3", fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    换一种想法
                  </div>
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: "#EAE7DF", fontFamily: "'Noto Serif SC', serif", fontWeight: 400 }}
                  >
                    {current.reframe}
                  </p>
                  <div className="flex items-center gap-2" style={{ color: "#91BFA3" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-xs" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                      这个想法更稳一些
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="next">
                {flipped ? (
                  <button className="moon-btn" onClick={handleNext}>
                    {currentIdx < worries.length - 1 ? "下一个担心" : "带着它入睡"}
                  </button>
                ) : (
                  <button className="moon-btn-outline" onClick={() => navigate("/sleep-training")}>
                    跳过，直接入睡
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <p className="text-sm" style={{ color: "#91BFA3", fontFamily: "'Noto Sans SC', sans-serif" }}>
                  很好，继续下一步
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
