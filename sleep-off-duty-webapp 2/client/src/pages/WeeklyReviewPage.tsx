/**
 * WeeklyReviewPage - 周复盘
 * Design: Warm morning palette, trend charts, encouraging copy
 * Philosophy: 趋势而非审判，"你不是每天都完美，但正在变得更稳定"
 */
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const weekData = [
  { day: "周一", score: 45, done: false },
  { day: "周二", score: 62, done: true },
  { day: "周三", score: 58, done: true },
  { day: "周四", score: 70, done: true },
  { day: "周五", score: 55, done: false },
  { day: "周六", score: 78, done: true },
  { day: "周日", score: 82, done: true },
];

const maxScore = 100;

export default function WeeklyReviewPage() {
  const [, navigate] = useLocation();

  const completedDays = weekData.filter((d) => d.done).length;
  const avgScore = Math.round(weekData.reduce((s, d) => s + d.score, 0) / weekData.length);
  const trend = weekData[weekData.length - 1].score - weekData[0].score;

  return (
    <div
      className="phone-frame flex flex-col"
      style={{ background: "#F7F1E5" }}
    >
      <div className="px-6 pt-14 pb-8 flex flex-col min-h-screen">
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
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-xs mb-1" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
            本周复盘
          </p>
          <h1
            className="text-2xl mb-2"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: "#283044" }}
          >
            你正在变得更稳定
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}
          >
            你不是每天都完美，但这周整体在往好的方向走。
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { label: "关闭完成", value: `${completedDays}/7`, sub: "天", color: "#C9A66B" },
            { label: "平均信心", value: `${avgScore}`, sub: "%", color: "#91BFA3" },
            { label: "趋势变化", value: `+${trend}`, sub: "pts", color: "#7B9FD4" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(40,48,68,0.08)" }}
            >
              <p
                className="text-2xl font-semibold"
                style={{ color: stat.color, fontFamily: "'Noto Serif SC', serif" }}
              >
                {stat.value}
                <span className="text-sm font-normal">{stat.sub}</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 mb-6"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(40,48,68,0.08)" }}
        >
          <p className="text-sm font-medium mb-4" style={{ color: "#283044", fontFamily: "'Noto Sans SC', sans-serif" }}>
            睡眠信心趋势
          </p>
          <div className="flex items-end gap-2 h-24">
            {weekData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.score / maxScore) * 80}px` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full rounded-t-lg"
                  style={{
                    background: d.done
                      ? `linear-gradient(to top, #C9A66B, #E0C48A)`
                      : "rgba(40,48,68,0.1)",
                    minHeight: "4px",
                  }}
                />
                <span className="text-xs" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {d.day.replace("周", "")}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievement cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col gap-3 mb-6"
        >
          <div
            className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: "rgba(145,191,163,0.12)", border: "1px solid rgba(145,191,163,0.25)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(145,191,163,0.2)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#91BFA3" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "#283044", fontFamily: "'Noto Sans SC', sans-serif" }}>
                睡前关闭完成 5/7
              </p>
              <p className="text-xs" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
                比上周多了 2 次
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: "rgba(201,166,107,0.1)", border: "1px solid rgba(201,166,107,0.2)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(201,166,107,0.15)" }}
            >
              <span className="text-lg">⏰</span>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "#283044", fontFamily: "'Noto Sans SC', sans-serif" }}>
                入睡时间前移 23 分钟
              </p>
              <p className="text-xs" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
                平均从 0:42 → 0:19
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next week suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(40,48,68,0.08)" }}
        >
          <p className="text-xs mb-2" style={{ color: "#9AA0B0", fontFamily: "'Noto Sans SC', sans-serif" }}>
            下周建议
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#283044", fontFamily: "'Noto Sans SC', sans-serif" }}>
            继续保留 <span style={{ color: "#C9A66B", fontWeight: 600 }}>7 分钟睡前收尾</span>，你已经建立了习惯的雏形。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
