/**
 * SleepTrainingPage - 入睡训练播放页（v4：15场景 + 定时关闭）
 * Design: Deep night palette, breathing orb, real audio player
 * Philosophy: 声音是入睡的锚点，让用户感到被陪伴
 * 音频待接入：15段新自然声/ASMR音频确认后上传
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

// ─── Scene data ────────────────────────────────────────────────────────────────
const SCENE_GROUPS = [
  {
    group: "ASMR 触感声",
    scenes: [
      { id: "brush",     emoji: "🧹", label: "刷子刮擦", desc: "轻柔刷毛刮擦声",     src: "", color: "#D4B8A0", phrase: "细软的刷毛让大脑放空" },
      { id: "tapping",   emoji: "👆", label: "指尖敲击", desc: "指尖轻敲各种物体",   src: "", color: "#A0B4D4", phrase: "轻柔的敲击声带你入眠" },
      { id: "ear",       emoji: "👂", label: "耳部清洁", desc: "轻柔耳部按摩声",     src: "", color: "#C4A0D4", phrase: "耳边的轻柔声让全身放松" },
      { id: "hairbrush", emoji: "💆", label: "梳头按摩", desc: "头皮按摩与梳头声",   src: "", color: "#D4A0B8", phrase: "头皮的轻柔刺激带你入眠" },
      { id: "eating",    emoji: "🍰", label: "咀嚼音",   desc: "轻柔咀嚼声",         src: "", color: "#D4C4A0", phrase: "满足感的咀嚼声让心安定" },
      { id: "journal",   emoji: "📓", label: "手帐胶带", desc: "撕纸胶带与文具声",   src: "", color: "#D4A0A0", phrase: "细碎文具声让大脑放空" },
      { id: "slime",     emoji: "🫧", label: "史莱姆",   desc: "捏压与肥皂切割声",   src: "", color: "#B4D4A0", phrase: "柔软的声音抚平焦虑" },
      { id: "spa",       emoji: "🧖", label: "护肤护理", desc: "护肤按摩轻柔声",     src: "", color: "#D4B8D4", phrase: "轻柔护理，让身体完全放松" },
      { id: "wiping",    emoji: "🧽", label: "擦拭声",   desc: "抹布擦拭桌面声",     src: "", color: "#A8C4B8", phrase: "干净整洁的声音让心平静" },
      { id: "keyboard",  emoji: "⌨️", label: "键盘声",   desc: "机械键盘敲击声",     src: "", color: "#A0C4D4", phrase: "敲击声让思维渐渐清空" },
    ],
  },
  {
    group: "生活环境声",
    scenes: [
      { id: "cooking",   emoji: "🍳", label: "厨房烹饪", desc: "切菜翻炒锅铲声",     src: "", color: "#A0D4B8", phrase: "温暖厨房声让心回家" },
      { id: "washer",    emoji: "🌀", label: "洗衣机",   desc: "洗衣机转动水声",     src: "", color: "#7B9FD4", phrase: "稳定的转动声带来安心感" },
      { id: "bookpages", emoji: "📖", label: "翻书声",   desc: "纸页轻柔翻动声",     src: "", color: "#C9A66B", phrase: "书页的沙沙声带你入梦" },
      { id: "coffee",    emoji: "☕", label: "磨咖啡豆", desc: "咖啡豆研磨声",       src: "", color: "#B8956A", phrase: "磨豆声带来清晨的宁静" },
      { id: "fireplace", emoji: "🔥", label: "壁炉声",   desc: "木柴燃烧噼啪声",     src: "", color: "#D4906B", phrase: "温暖的火焰声让身心放松" },
    ],
  },
];

const ALL_SCENES = SCENE_GROUPS.flatMap((g) => g.scenes);

// 4-2-6 呼吸法
const BREATH_CYCLE = [
  { label: "吸气", duration: 4000, targetScale: 1.35 },
  { label: "屏住", duration: 2000, targetScale: 1.35 },
  { label: "呼气", duration: 6000, targetScale: 1.0 },
];

// 定时选项（分钟，0 = 不限时）
const TIMER_OPTIONS = [
  { label: "不限时", value: 0 },
  { label: "15 分钟", value: 15 },
  { label: "30 分钟", value: 30 },
  { label: "60 分钟", value: 60 },
];

export default function SleepTrainingPage() {
  const [, navigate] = useLocation();
  const [activeGroup, setActiveGroup] = useState(0);
  const [sceneId, setSceneId] = useState("brush");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  // Breathing
  const [breathPhaseIdx, setBreathPhaseIdx] = useState(0);
  const [breathLabel, setBreathLabel] = useState("准备好了吗");
  const [orbScale, setOrbScale] = useState(1.0);

  // Timer
  const [selectedTimer, setSelectedTimer] = useState(0); // minutes, 0 = unlimited
  const [remainingMs, setRemainingMs] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);

  // Elapsed
  const [elapsed, setElapsed] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const breathTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scene = ALL_SCENES.find((s) => s.id === sceneId) ?? ALL_SCENES[1];

  // ── Init audio ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  // ── Switch scene ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!audioRef.current) return;
    const wasPlaying = isPlaying;
    audioRef.current.pause();
    if (scene.src) {
      audioRef.current.src = scene.src;
      audioRef.current.load();
      if (wasPlaying) audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.src = "";
      if (wasPlaying) {
        setIsPlaying(false);
        stopBreathing();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  // ── Volume ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // ── Breathing loop ──────────────────────────────────────────────────────────
  const runBreath = useCallback((phaseIdx: number) => {
    const phase = BREATH_CYCLE[phaseIdx];
    setBreathPhaseIdx(phaseIdx);
    setBreathLabel(phase.label);
    setOrbScale(phase.targetScale);
    breathTimerRef.current = setTimeout(() => runBreath((phaseIdx + 1) % BREATH_CYCLE.length), phase.duration);
  }, []);

  const stopBreathing = useCallback(() => {
    if (breathTimerRef.current) clearTimeout(breathTimerRef.current);
    setBreathLabel("已暂停");
    setOrbScale(1.0);
  }, []);

  // ── Stop all ────────────────────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    stopBreathing();
    if (tickRef.current) clearInterval(tickRef.current);
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setTimerActive(false);
    setRemainingMs(0);
    setBreathLabel("声音已自动停止");
  }, [stopBreathing]);

  // ── Play / pause ────────────────────────────────────────────────────────────
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopBreathing();
      if (tickRef.current) clearInterval(tickRef.current);
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setTimerActive(false);
    } else {
      if (scene.src) {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
      runBreath(0);
      tickRef.current = setInterval(() => setElapsed((t) => t + 1), 1000);

      // Start sleep timer if set
      if (selectedTimer > 0) {
        const ms = selectedTimer * 60 * 1000;
        setRemainingMs(ms);
        setTimerActive(true);
        sleepTimerRef.current = setTimeout(() => stopAll(), ms);
        countdownRef.current = setInterval(() => {
          setRemainingMs((r) => {
            if (r <= 1000) { clearInterval(countdownRef.current!); return 0; }
            return r - 1000;
          });
        }, 1000);
      }
    }
  };

  // ── Cleanup ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (breathTimerRef.current) clearTimeout(breathTimerRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      audioRef.current?.pause();
    };
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const formatMs = (ms: number) => {
    const totalSec = Math.ceil(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
  };

  const currentBreathDuration = BREATH_CYCLE[breathPhaseIdx].duration / 1000;
  const breathEase = breathPhaseIdx === 2
    ? ([0.77, 0, 0.175, 1] as [number, number, number, number])
    : ([0.23, 1, 0.32, 1] as [number, number, number, number]);

  return (
    <div
      className="phone-frame flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0D1B2E 0%, #0A1628 60%, #060E1A 100%)" }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 50}%`,
              background: "rgba(255,255,255,0.7)",
            }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full px-5 pt-11 pb-5 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => { audioRef.current?.pause(); navigate("/home"); }}
            className="flex items-center gap-1"
            style={{ color: "rgba(234,231,223,0.45)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span className="text-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>返回</span>
          </motion.button>

          <div className="flex items-center gap-2">
            {/* Elapsed */}
            <AnimatePresence>
              {elapsed > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="px-2.5 py-1 rounded-full text-xs"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(234,231,223,0.5)", fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  {formatTime(elapsed)}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timer countdown badge */}
            <AnimatePresence>
              {timerActive && remainingMs > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                  style={{ background: `${scene.color}18`, border: `1px solid ${scene.color}35`, color: scene.color, fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  {formatMs(remainingMs)} 后停止
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-center mb-4"
        >
          <h1 className="text-xl mb-0.5" style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: "#EAE7DF" }}>
            入睡训练
          </h1>
          <p className="text-xs" style={{ color: "rgba(174,183,204,0.6)", fontFamily: "'Noto Sans SC', sans-serif" }}>
            {isPlaying ? scene.phrase : "选择一个声音场景，开始放松"}
          </p>
        </motion.div>

        {/* Breathing orb */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
            <motion.div
              className="absolute rounded-full"
              style={{ width: 160, height: 160, background: `radial-gradient(circle, ${scene.color}12 0%, transparent 70%)` }}
              animate={isPlaying ? { scale: [1, 1.12, 1], opacity: [0.3, 0.7, 0.3] } : { scale: 1, opacity: 0.15 }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 108, height: 108,
                background: `radial-gradient(circle at 38% 32%, ${scene.color}55, ${scene.color}18)`,
                border: `1px solid ${scene.color}38`,
                boxShadow: `0 0 40px ${scene.color}22, inset 0 0 20px ${scene.color}0A`,
              }}
              animate={{ scale: isPlaying ? orbScale : 1 }}
              transition={{ duration: currentBreathDuration, ease: breathEase }}
            >
              <span className="text-3xl select-none">{scene.emoji}</span>
            </motion.div>
          </div>

          <motion.p
            key={breathLabel} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm font-medium"
            style={{ color: scene.color, fontFamily: "'Noto Sans SC', sans-serif", minHeight: 20 }}
          >
            {breathLabel}
          </motion.p>

          {isPlaying && (
            <div className="flex gap-1.5 mt-1.5">
              {BREATH_CYCLE.map((_, i) => (
                <div key={i} className="rounded-full" style={{ width: 5, height: 5, background: i === breathPhaseIdx ? scene.color : `${scene.color}30`, transition: "background 0.3s" }} />
              ))}
            </div>
          )}
        </div>

        {/* Group tabs */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex gap-2 mb-3"
        >
          {SCENE_GROUPS.map((g, i) => (
            <button
              key={g.group}
              onClick={() => setActiveGroup(i)}
              className="px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: activeGroup === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                color: activeGroup === i ? "#EAE7DF" : "rgba(174,183,204,0.5)",
                border: `1px solid ${activeGroup === i ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"}`,
                fontFamily: "'Noto Sans SC', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {g.group}
            </button>
          ))}
        </motion.div>

        {/* Scene grid */}
        <motion.div
          key={activeGroup}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className={`grid gap-2 mb-4 ${activeGroup === 0 ? 'grid-cols-5' : 'grid-cols-5'}`}
        >
          {SCENE_GROUPS[activeGroup].scenes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSceneId(s.id)}
              className="flex flex-col items-center gap-1 py-2.5 rounded-2xl"
              style={{
                background: sceneId === s.id ? `${s.color}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${sceneId === s.id ? `${s.color}45` : "rgba(255,255,255,0.07)"}`,
                transform: sceneId === s.id ? "scale(1.04)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              <span className="text-xl">{s.emoji}</span>
              <span className="text-xs" style={{ color: sceneId === s.id ? s.color : "rgba(174,183,204,0.5)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: sceneId === s.id ? 500 : 400 }}>
                {s.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Volume */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mb-3 px-1"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(174,183,204,0.4)" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          </svg>
          <input
            type="range" min={0} max={1} step={0.01} value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1" style={{ accentColor: scene.color, height: "3px" }}
          />
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(174,183,204,0.4)" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </motion.div>

        {/* Sleep timer selector */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="mb-3"
        >
          <button
            onClick={() => setShowTimerPicker((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl"
            style={{
              background: selectedTimer > 0 ? `${scene.color}12` : "rgba(255,255,255,0.04)",
              border: `1px solid ${selectedTimer > 0 ? `${scene.color}35` : "rgba(255,255,255,0.07)"}`,
              transition: "all 0.2s",
            }}
          >
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={selectedTimer > 0 ? scene.color : "rgba(174,183,204,0.45)"} strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              <span className="text-xs" style={{ color: selectedTimer > 0 ? scene.color : "rgba(174,183,204,0.55)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                {selectedTimer > 0 ? `${selectedTimer} 分钟后自动停止` : "定时关闭（可选）"}
              </span>
            </div>
            <motion.svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(174,183,204,0.4)" strokeWidth="2"
              animate={{ rotate: showTimerPicker ? 180 : 0 }} transition={{ duration: 0.2 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {showTimerPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-4 gap-1.5 pt-2">
                  {TIMER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSelectedTimer(opt.value); setShowTimerPicker(false); }}
                      className="py-2 rounded-xl text-xs"
                      style={{
                        background: selectedTimer === opt.value ? `${scene.color}22` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selectedTimer === opt.value ? `${scene.color}45` : "rgba(255,255,255,0.07)"}`,
                        color: selectedTimer === opt.value ? scene.color : "rgba(174,183,204,0.55)",
                        fontFamily: "'Noto Sans SC', sans-serif",
                        fontWeight: selectedTimer === opt.value ? 500 : 400,
                        transition: "all 0.15s",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Play button */}
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          onClick={scene.src ? togglePlay : undefined}
          whileTap={scene.src ? { scale: 0.97 } : {}}
          className="w-full py-3.5 rounded-2xl font-semibold text-base flex items-center justify-center gap-3"
          style={{
            background: !scene.src ? "rgba(255,255,255,0.04)" : isPlaying ? "rgba(255,255,255,0.07)" : `linear-gradient(135deg, ${scene.color}, ${scene.color}CC)`,
            color: !scene.src ? "rgba(174,183,204,0.35)" : isPlaying ? "rgba(234,231,223,0.65)" : "#0D1B2E",
            border: !scene.src ? "1px solid rgba(255,255,255,0.07)" : isPlaying ? "1px solid rgba(255,255,255,0.1)" : "none",
            fontFamily: "'Noto Sans SC', sans-serif",
            boxShadow: (!scene.src || isPlaying) ? "none" : `0 4px 22px ${scene.color}32`,
            transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
            cursor: scene.src ? "pointer" : "default",
          }}
        >
          {isPlaying ? (
            <><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>暂停播放</>
          ) : !scene.src ? (
            <>✨ 呼吸引导模式（音频升级后开放）</>
          ) : (
            <><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>开始播放</>
          )}
        </motion.button>

        {/* Tip */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          className="text-center text-xs mt-3"
          style={{ color: "rgba(174,183,204,0.3)", fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          可以放下手机，声音会持续陪伴你
        </motion.p>
      </div>
    </div>
  );
}
