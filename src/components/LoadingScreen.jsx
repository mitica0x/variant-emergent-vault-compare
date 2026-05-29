import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ isVisible, onComplete }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#080b16" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(24,180,212,0.07) 0%, transparent 70%)" }} />
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <span style={{ fontSize: "2.8rem", fontWeight: 600, letterSpacing: "-0.02em", fontFamily: "sans-serif" }}>
                <span style={{ color: "#e4e4e7" }}>Coin</span>
                <span style={{ color: "#18b4d4" }}>Siglieri</span>
              </span>
            </motion.div>
            <motion.div className="h-px rounded-full" style={{ background: "rgba(255,255,255,0.07)", width: 220 }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#18b4d4" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
                onAnimationComplete={() => { setTimeout(onComplete, 150); }}
              />
            </motion.div>
            <motion.p
              style={{ color: "#52525b", fontSize: "0.7rem", letterSpacing: "0.22em", fontFamily: "monospace", textTransform: "uppercase" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              In the market since 2017
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
