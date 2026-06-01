/**
 * 助眠声音页面 - ASMRPage
 * 设计哲学：深夜蓝 + 暖月光金，极简低压力，沉浸式声音体验
 * 布局：左侧分类导航（移动端顶部横滑） + 右侧视频列表 + 底部播放控制栏
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  Play,
  Pause,
  X,
  Heart,
  Clock,
  Headphones,
  ChevronRight,
} from "lucide-react";

// ─── 数据 ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "brush",
    emoji: "🪮",
    name: "刷麦 · 刮擦",
    description: "软刷轻扫麦克风，细腻刮擦声，最经典的ASMR触发",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-brush-card-2L76jg8zJZ6gXoQzQGZvaA.webp",
    videos: [
      { id: "GkULbdgBDOA", title: "ASMR Brushing Microphone Sounds" },
      { id: "2Oo_4CXBkfE", title: "ASMR Soft Brush Sounds for Sleep" },
      { id: "Wf_aSqWpkXw", title: "ASMR Scratching & Brushing Sounds" },
      { id: "4Bs_GnSbGFk", title: "ASMR Gentle Brush Triggers No Talking" },
      { id: "SzMcKJFJoGE", title: "ASMR Brushing Sounds Close Up" },
    ],
  },
  {
    id: "tapping",
    emoji: "🫰",
    name: "敲击 · Tapping",
    description: "指尖轻敲各种材质表面，节奏感十足的放松声音",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    videos: [
      { id: "FNBnBrBVJGc", title: "ASMR Tapping & Scratching Sounds" },
      { id: "Z0P-hCNpC_I", title: "ASMR Fast Tapping No Talking" },
      { id: "7sSAN0cJm6s", title: "ASMR Tapping on Various Surfaces" },
      { id: "3XBGF7xJDEA", title: "ASMR Slow Tapping for Deep Sleep" },
      { id: "eLMJ4sCIVCo", title: "ASMR Finger Tapping Compilation" },
    ],
  },
  {
    id: "ear",
    emoji: "👂",
    name: "耳部清洁 · 按摩",
    description: "耳朵清洁与按摩声音，深度放松的双耳体验",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    videos: [
      { id: "NqFKMTFNbKM", title: "ASMR Ear Cleaning & Massage" },
      { id: "UHBsKg_FXHM", title: "ASMR Ear Attention No Talking" },
      { id: "7JqHNNMXlJE", title: "ASMR Ear Cleaning Sounds for Sleep" },
      { id: "ZfVHJUMPVaI", title: "ASMR Binaural Ear Massage" },
      { id: "dZzCkBbhGqc", title: "ASMR Ear Cleaning Compilation" },
    ],
  },
  {
    id: "personal-care",
    emoji: "🌿",
    name: "个人护理 · 角色扮演",
    description: "被照顾的温柔体验，护肤与个人护理的安心声音",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    videos: [
      { id: "1oTvFfHqxCQ", title: "ASMR Personal Attention Roleplay" },
      { id: "xMFKNPFgPOY", title: "ASMR Skincare Routine No Talking" },
      { id: "W1GVxnHjpgA", title: "ASMR Spa Treatment Sounds" },
      { id: "fDRmGYhzSaI", title: "ASMR Face Care & Massage" },
      { id: "0jHDnKnJFfE", title: "ASMR Personal Care Attention" },
    ],
  },
  {
    id: "hairbrush",
    emoji: "✨",
    name: "梳头 · 头皮按摩",
    description: "梳发与头皮按摩声，最能触发酥麻感的经典体验",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    videos: [
      { id: "vBVkgBnFqaI", title: "ASMR Hair Brushing & Scalp Massage" },
      { id: "JnAkVMYNfYk", title: "ASMR Brushing Your Hair No Talking" },
      { id: "vNPnBkJFMjU", title: "ASMR Scalp Massage & Hair Play" },
      { id: "xNTM7Q9YCAA", title: "ASMR Hair Brushing Sounds for Sleep" },
      { id: "yvqe5_4MXGE", title: "ASMR Gentle Hair Brushing" },
    ],
  },
  {
    id: "eating",
    emoji: "🍗",
    name: "吃播 · 咀嚼音",
    description: "酥脆咀嚼声与食物声音，满足感十足的解压体验",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    videos: [
      { id: "3khhdBbR5m8", title: "GIANT FRIED CHICKEN (ASMR CRUNCHY EATING SOUNDS)" },
      { id: "71BsRp4Ehjw", title: "ASMR BEST CRUNCHY EATING SOUNDS (Tobiko Eggs)" },
      { id: "sq64stra218", title: "ASMR CRUNCHY CHICKEN WINGS & SPICY NOODLES" },
      { id: "jhD5iIrJG80", title: "ASMR CRUNCHY VEGGIE PLATTER (EATING SOUNDS)" },
      { id: "4a_NGIdhqKw", title: "ASMR MUKBANG BLACK BEAN FIRE NOODLES" },
    ],
  },
  {
    id: "cooking",
    emoji: "🍳",
    name: "烹饪 · 厨房声音",
    description: "切菜、煎炒、水声，温暖厨房里的自然白噪音",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-cooking-card-ET4L36Xdq5Dh9NXdVbKn2R.webp",
    videos: [
      { id: "FnhQ2QvLIXc", title: "ASMR COOKING NO TALKING ASMR SOUNDS" },
      { id: "S4bgm3a8sQI", title: "ASMR Making breakfast ~ cooking eggs!" },
      { id: "DoRSCsrKbq8", title: "ASMR Cooking No talking 5 hours deep relaxation" },
      { id: "hBhLvA3RvVY", title: "ASMR Cooking spaghetti & meatballs!" },
      { id: "kazwMSkeoSQ", title: "2 Hours ASMR Cooking with Recipes No Talking" },
    ],
  },
  {
    id: "keyboard",
    emoji: "⌨️",
    name: "键盘 · 办公声音",
    description: "机械键盘敲击与翻纸声，专注工作的白噪音伴侣",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-keyboard-card-Zb62i5GWvyjwtXS4F3KyG4.webp",
    videos: [
      { id: "vxo2o92Zc3o", title: "ASMR Extremely Relaxing Keyboard Typing 3Hr" },
      { id: "fe1tdko12pU", title: "Mechanical keyboard typing (no talking ASMR)" },
      { id: "VABl4mFT7uk", title: "ASMR Keyboard Typing (NO TALKING) Mechanical" },
      { id: "U0U7KwoSAqk", title: "ASMR Admin Work, Typing, Paperwork" },
      { id: "HE13qoYreRU", title: "ASMR Paper & Typing Sounds • Home Office Ambiance" },
    ],
  },
  {
    id: "journal",
    emoji: "📖",
    name: "手帐 · 胶带 · 文具",
    description: "和纸胶带撕拉、贴纸揭取与纸张摩擦，最细腻的文具声音",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-paper-card-Fvw6CFjRMeTnntUEQsYkWB.webp",
    videos: [
      { id: "_HVLDUn8AKI", title: "Journaling Ambience | ASMR Journal with Me | 90 Minutes" },
      { id: "q_Quy66n_tU", title: "Relaxing Diary Ambience | ASMR Journal with Me | 100 Minutes" },
      { id: "HAEINtwAf_4", title: "ASMR Aesthetic Journaling | The Washi Tape Shop" },
      { id: "Kf_cbtP4zXE", title: "ASMR Journal with Me ft. stickers" },
      { id: "jA7p1d9Ec0U", title: "ASMR Junk Journal: Paper Crinkles & Washi Tape Peeling" },
    ],
  },
  {
    id: "slime",
    emoji: "🫧",
    name: "史莱姆 · 肥皂切割",
    description: "史莱姆拉伸与肥皂切割，视觉与听觉双重满足感",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    videos: [
      { id: "MfRzXEPcP9A", title: "Satisfying Slime ASMR | Relaxing Best Slimes No Talking" },
      { id: "LhMwd0JzTXA", title: "Satisfying Slime ASMR | Compilation No Talking" },
      { id: "zEGF-dKSLGg", title: "Most Relaxing ASMR Slime Compilation No Talking" },
      { id: "nGZ2Zi0tiXA", title: "ASMR 100 Slime Triggers For Sleep And Tingles" },
      { id: "G4PiJc3MlK8", title: "ASMR First Cut 200 Cutting soap Cubes Oddly Satisfying" },
    ],
  },
];

// ─── 类型 ──────────────────────────────────────────────────────────────────
interface Video {
  id: string;
  title: string;
}

interface Category {
  id: string;
  emoji: string;
  name: string;
  description: string;
  image: string;
  videos: Video[];
}

// ─── 主组件 ────────────────────────────────────────────────────────────────
export default function ASMRPage() {
  const [, navigate] = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 定时器逻辑
  useEffect(() => {
    if (timerMinutes !== null && playingVideo) {
      setTimeLeft(timerMinutes * 60);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerRef.current!);
            setPlayingVideo(null);
            setTimerMinutes(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerMinutes, playingVideo]);

  const toggleFavorite = (videoId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) next.delete(videoId);
      else next.add(videoId);
      return next;
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSetTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setShowTimerPicker(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0d1b2a 0%, #112240 60%, #0a1628 100%)",
        color: "#EAE7DF",
        fontFamily: "'Noto Serif SC', serif",
        maxWidth: 430,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* ── 顶部导航栏 ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(13,27,42,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,166,107,0.15)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: 10,
            padding: "8px 10px",
            color: "#C9A66B",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#EAE7DF" }}>
            🎧 助眠声音
          </div>
          <div style={{ fontSize: 11, color: "#AEB7CC", marginTop: 1 }}>
            无说话 · 无音乐 · 纯自然声音
          </div>
        </div>
        <button
          onClick={() => setShowTimerPicker(true)}
          style={{
            background: timeLeft ? "rgba(201,166,107,0.2)" : "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: 10,
            padding: "8px 10px",
            color: timeLeft ? "#C9A66B" : "#AEB7CC",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
          }}
        >
          <Clock size={16} />
          {timeLeft ? formatTime(timeLeft) : "定时"}
        </button>
      </div>

      {/* ── 分类横滑导航 ── */}
      <div
        ref={categoryScrollRef}
        style={{
          display: "flex",
          gap: 10,
          padding: "14px 20px",
          overflowX: "auto",
          scrollbarWidth: "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0,
              padding: "8px 14px",
              borderRadius: 20,
              border: activeCategory.id === cat.id
                ? "1px solid #C9A66B"
                : "1px solid rgba(255,255,255,0.1)",
              background: activeCategory.id === cat.id
                ? "rgba(201,166,107,0.15)"
                : "rgba(255,255,255,0.04)",
              color: activeCategory.id === cat.id ? "#C9A66B" : "#AEB7CC",
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* ── 分类介绍卡片 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{ padding: "16px 20px 0" }}
        >
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              height: 120,
              marginBottom: 16,
            }}
          >
            <img
              src={activeCategory.image}
              alt={activeCategory.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "14px 16px",
                background: "linear-gradient(0deg, rgba(13,27,42,0.85) 0%, transparent 100%)",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: "#EAE7DF" }}>
                {activeCategory.emoji} {activeCategory.name}
              </div>
              <div style={{ fontSize: 12, color: "#AEB7CC", marginTop: 3 }}>
                {activeCategory.description}
              </div>
            </div>
          </div>

          {/* ── 视频列表 ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: playingVideo ? 120 : 24 }}>
            {activeCategory.videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => setPlayingVideo(video)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: playingVideo?.id === video.id
                    ? "rgba(201,166,107,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: playingVideo?.id === video.id
                    ? "1px solid rgba(201,166,107,0.4)"
                    : "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {/* 缩略图 */}
                <div
                  style={{
                    width: 64,
                    height: 48,
                    borderRadius: 8,
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {playingVideo?.id === video.id && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(201,166,107,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Pause size={18} color="#fff" />
                    </div>
                  )}
                </div>

                {/* 标题 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      color: playingVideo?.id === video.id ? "#C9A66B" : "#EAE7DF",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {video.title}
                  </div>
                </div>

                {/* 收藏按钮 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(video.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 6,
                    flexShrink: 0,
                  }}
                >
                  <Heart
                    size={16}
                    color={favorites.has(video.id) ? "#C9A66B" : "#AEB7CC"}
                    fill={favorites.has(video.id) ? "#C9A66B" : "none"}
                  />
                </button>

                {/* 播放图标 */}
                {playingVideo?.id !== video.id && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(201,166,107,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Play size={12} color="#C9A66B" fill="#C9A66B" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── 底部播放控制栏 ── */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 430,
              zIndex: 100,
              background: "rgba(13,27,42,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(201,166,107,0.2)",
            }}
          >
            {/* YouTube 播放器（隐藏但真实播放音频） */}
            <div style={{ width: "100%", aspectRatio: "16/9" }}>
              <iframe
                key={playingVideo.id}
                src={`https://www.youtube.com/embed/${playingVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "0",
                }}
              />
            </div>

            {/* 播放信息栏 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px 20px",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(201,166,107,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Headphones size={16} color="#C9A66B" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#EAE7DF",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {playingVideo.title}
                </div>
                <div style={{ fontSize: 11, color: "#AEB7CC", marginTop: 2 }}>
                  {activeCategory.emoji} {activeCategory.name}
                  {timeLeft && ` · ${formatTime(timeLeft)} 后停止`}
                </div>
              </div>
              <button
                onClick={() => {
                  setPlayingVideo(null);
                  setTimerMinutes(null);
                  setTimeLeft(null);
                  if (timerRef.current) clearInterval(timerRef.current);
                }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px",
                  color: "#AEB7CC",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 定时器选择弹窗 ── */}
      <AnimatePresence>
        {showTimerPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 200,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            onClick={() => setShowTimerPicker(false)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 430,
                background: "#112240",
                borderRadius: "20px 20px 0 0",
                padding: "24px 20px 40px",
                border: "1px solid rgba(201,166,107,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#EAE7DF",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                ⏱ 定时关闭
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "不限时", value: null },
                  { label: "15 分钟后停止", value: 15 },
                  { label: "30 分钟后停止", value: 30 },
                  { label: "60 分钟后停止", value: 60 },
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => {
                      if (option.value === null) {
                        setTimerMinutes(null);
                        setTimeLeft(null);
                        if (timerRef.current) clearInterval(timerRef.current);
                        setShowTimerPicker(false);
                      } else {
                        handleSetTimer(option.value);
                      }
                    }}
                    style={{
                      padding: "14px 20px",
                      borderRadius: 12,
                      border: timerMinutes === option.value
                        ? "1px solid #C9A66B"
                        : "1px solid rgba(255,255,255,0.1)",
                      background: timerMinutes === option.value
                        ? "rgba(201,166,107,0.15)"
                        : "rgba(255,255,255,0.04)",
                      color: timerMinutes === option.value ? "#C9A66B" : "#EAE7DF",
                      fontSize: 15,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {option.label}
                    {timerMinutes === option.value && (
                      <span style={{ color: "#C9A66B", fontSize: 12 }}>✓ 当前</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
