/**
 * StatusSelectPage - 今晚状态选择
 * Design: Dark navy, 4 status cards with icons, warm gold selected state
 * Philosophy: 快速共鸣，让用户感到被理解
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const statuses = [
  {
    id: "brain-overtime",
    icon: "🧠",
    title: "脑子停不下来",
    desc: "工作还在脑内加班",
    color: "#7B9FD4",
  },
  {
    id: "procrastinate",
    icon: "📱",
    title: "明知道该睡",
    desc: "但舍不得放下手机",
    color: "#C9A66B",
  },
  {
    id: "anxiety",
    icon: "💭",
    title: "越想睡越清醒",
    desc: "开始担心明天状态",
    color: "#B8A0D4",
  },
  {
    id: "night-wake",
    icon: "🌙",
    title: "半夜醒了",
    desc: "醒后很难再睡",
    color: "#91BFA3",
  },
];

export default function StatusSelectPage() {
  const [, navigate] = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => navigate("/home"), 400);
  };

  return (
    <div className="phone-frame flex flex-col" style={{ background: "#0D1623" }}>
      <div className="px-6 pt-14 pb-8 flex flex-col h-full min-h-screen">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-1 mb-8 w-fit"
          style={{ color: "#6E7890" }}
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
          transition={{ delay: 0.15, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          <h1
            className="text-3xl mb-2"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontWeight: 700,
              color: "#EAE7DF",
            }}
          >
            今晚你卡在哪？
          </h1>
          <p className="text-sm" style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif" }}>
            选一个最像你的状态
          </p>
        </motion.div>

        {/* Status cards */}
        <div className="flex flex-col gap-3 stagger">
          {statuses.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className={`status-card text-left flex items-center gap-4 ${selected === s.id ? "selected" : ""}`}
              onClick={() => handleSelect(s.id)}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
              >
                {s.icon}
              </div>
              {/* Text */}
              <div className="flex-1">
                <p
                  className="text-base font-medium mb-0.5"
                  style={{ color: "#EAE7DF", fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  {s.title}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "#6E7890", fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  {s.desc}
                </p>
              </div>
              {/* Arrow */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={selected === s.id ? "#C9A66B" : "#3D4A5E"}
                strokeWidth="2"
                className="flex-shrink-0"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          ))}
        </div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs mt-auto pt-8"
          style={{ color: "#3D4A5E", fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          你的选择只用于今晚的推荐，不会被记录评分
        </motion.p>
      </div>
    </div>
  );
}
