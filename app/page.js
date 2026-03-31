"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Animasi Varian Global ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// --- Komponen Wrapper Animasi ---
const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Komponen Countdown Premium ---
const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance < 0) return clearInterval(timer);
      setTimeLeft({
        Hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
        Jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        Menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        Detik: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex gap-3 md:gap-6 justify-center my-10"
    >
      {Object.entries(timeLeft).map(([label, value]) => (
        <motion.div
          key={label}
          variants={fadeInUp}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-full shadow-sm border border-stone-100 mb-2">
            <span className="text-2xl md:text-3xl font-serif text-[#6b7a66]">
              {value}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioRef = useRef(null);

  const data = {
    childName: "Akhdan Ziyad",
    parents: "Bapak Akhdan Ziyad & Ibu Rohini",
    targetDate: "2026-04-12T09:00:00",
    displayDate: "Minggu, 12 April 2026",
    location: "Gedung Pertemuan Slawi, Tegal",
    wa: "628123456789",
  };

  const galleryImages = ["/anak1.png", "/anak2.png", "/anak3.png"];

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(
        () => setCurrentSlide((p) => (p + 1) % galleryImages.length),
        5000,
      );
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current)
      audioRef.current.play().catch(() => setIsPlaying(false));
  };

  const toggleMusic = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#555d50] selection:bg-[#94a38e]/20 overflow-x-hidden font-sans">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* --- MUSIC CONTROL --- */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-[250] w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center border border-stone-200 text-[#94a38e]"
        >
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          >
            {isPlaying ? "💿" : "🔇"}
          </motion.div>
        </motion.button>
      )}

      {/* --- COVER PAGE --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.section
            exit={{
              y: "-100%",
              opacity: 0,
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[300] bg-[#faf9f6] flex flex-col items-center justify-center text-center p-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30 pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <p className="text-[#94a38e] font-arabic text-4xl mb-6 italic">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
              <p className="uppercase tracking-[0.5em] text-[9px] mb-8 text-stone-400 font-bold">
                Walimatul Khitan
              </p>

              <div className="relative mb-12 flex justify-center">
                <div className="w-56 h-80 rounded-t-full border-[12px] border-white shadow-2xl overflow-hidden bg-stone-100 z-10">
                  <img
                    src="/hero.png"
                    className="w-full h-full object-cover"
                    alt="Hero"
                  />
                </div>
                <div className="absolute -inset-4 border border-[#94a38e]/20 rounded-t-full -z-0 translate-y-3 scale-105" />
              </div>

              <h1 className="text-6xl font-serif text-[#6b7a66] mb-8 font-light italic leading-none tracking-tight">
                {data.childName}
              </h1>
              <div className="mb-12">
                <p className="text-[10px] text-stone-400 mb-2 uppercase tracking-[0.2em] font-bold">
                  Yth. Bapak/Ibu/Saudara/i
                </p>
                <h2 className="text-3xl font-serif text-stone-800">
                  {guestName}
                </h2>
              </div>

              <button
                onClick={handleOpen}
                className="group relative px-12 py-4 rounded-full bg-[#94a38e] text-white text-[10px] uppercase tracking-[0.4em] shadow-lg transition-all active:scale-95 font-bold overflow-hidden"
              >
                <span className="relative z-10">Buka Undangan</span>
                <div className="absolute inset-0 bg-black/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* --- KONTEN UTAMA --- */}
      {isOpen && (
        <div className="relative">
          {/* SECTION 1: CINEMATIC GALLERY */}
          <section className="h-screen relative flex items-center justify-center overflow-hidden bg-stone-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                src={galleryImages[currentSlide]}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf9f6]" />
            <div className="relative z-10 text-center">
              <ScrollReveal>
                <h1 className="text-7xl md:text-9xl font-serif italic text-white drop-shadow-2xl font-light">
                  {data.childName}
                </h1>
                <div className="h-[1px] w-24 bg-white/40 mx-auto mt-8" />
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION 2: MUKADIMAH */}
          <section className="py-32 px-8 text-center max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-[#94a38e] font-arabic text-5xl mb-10 italic">
                Assalamu’alaikum Wr. Wb.
              </div>
              <p className="font-serif italic text-xl leading-relaxed text-stone-500 mb-12">
                "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
                Bapak/Ibu/Saudara/i untuk menghadiri acara syukuran khitanan
                putra kami:"
              </p>
              <h3 className="text-5xl font-serif text-[#6b7a66] mb-6 font-light tracking-tight italic">
                {data.childName}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#94a38e] font-bold mb-4 italic opacity-70">
                Putra Ketiga Dari
              </p>
              <p className="text-2xl font-serif text-stone-700 italic">
                {data.parents}
              </p>
            </ScrollReveal>
          </section>

          {/* SECTION 3: COUNTDOWN */}
          <section className="py-24 px-6">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto bg-white p-12 rounded-[60px] shadow-sm border border-stone-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#94a38e]/10" />
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-4 font-bold tracking-widest">
                  Menuju Hari Bahagia
                </h4>
                <Countdown targetDate={data.targetDate} />
                <p className="text-sm italic font-serif leading-relaxed text-stone-400 max-w-sm mx-auto px-4">
                  "Peristiwa penting dalam perjalanan hidup lelaki muslim adalah
                  menjelang akil baligh, saat manis dalam kenangan sejarah
                  panjang seorang muslim."
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* SECTION 4: INFO ACARA */}
          <section className="py-32 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal
              delay={0.2}
              className="relative group flex justify-center"
            >
              <div className="relative">
                <div className="aspect-[4/5] w-full max-w-md rounded-[80px] overflow-hidden shadow-2xl border-[15px] border-white bg-stone-100">
                  <img
                    src="/anak2.jpg"
                    className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110"
                    alt="Info"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#f4f1ea] rounded-full flex items-center justify-center p-8 text-center text-[10px] font-serif italic shadow-xl z-20 border-4 border-white">
                  Save The Date 2026
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-12 text-center lg:text-left">
              <ScrollReveal delay={0.4}>
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#94a38e] mb-6 font-bold italic">
                  Waktu Pelaksanaan
                </h4>
                <div className="text-5xl font-serif text-[#6b7a66] mb-4 italic font-light">
                  {data.displayDate}
                </div>
                <p className="text-xl text-stone-400 italic font-serif tracking-wide">
                  09.00 WIB - Selesai
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#94a38e] mb-6 font-bold italic">
                  Lokasi Acara
                </h4>
                <p className="text-2xl font-serif text-stone-600 leading-relaxed italic mb-10 font-light">
                  {data.location}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`}
                  target="_blank"
                  className="inline-flex items-center px-12 py-4 bg-[#94a38e] text-white text-[11px] uppercase tracking-[0.4em] rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all font-bold"
                >
                  Buka Google Maps
                </a>
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION 5: GALLERY */}
          <section className="py-20 px-6 bg-[#f4f1ea]/40">
            <ScrollReveal>
              <div className="columns-2 md:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="overflow-hidden rounded-3xl shadow-md border-8 border-white"
                  >
                    <img
                      src={img}
                      className="w-full object-cover transition-all duration-700 hover:scale-110"
                      alt="Gallery"
                    />
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* SECTION 6: GUESTBOOK */}
          <section className="py-32 px-6">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <h4 className="font-serif text-5xl text-[#6b7a66] mb-12 italic font-light">
                  Doa & Ucapan
                </h4>
                <div className="space-y-6 bg-white p-10 md:p-14 rounded-[60px] border border-stone-100 shadow-sm">
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full px-8 py-5 rounded-full bg-[#faf9f6] border-none outline-none focus:ring-1 focus:ring-[#94a38e]/30 text-sm transition-all"
                  />
                  <textarea
                    placeholder="Tulis doa restu Anda..."
                    className="w-full px-8 py-6 rounded-[40px] bg-[#faf9f6] border-none outline-none focus:ring-1 focus:ring-[#94a38e]/30 text-sm h-40 resize-none transition-all"
                  />
                  <button className="w-full py-5 bg-[#6b7a66] text-white rounded-full text-[11px] uppercase tracking-[0.4em] font-bold shadow-xl hover:bg-[#555d50] transition-all duration-300">
                    Kirim Ucapan
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* SECTION 7: PENUTUP */}
          <footer className="py-40 text-center px-6 relative bg-[#faf9f6]">
            <ScrollReveal>
              <p className="text-[10px] uppercase tracking-[0.6em] text-stone-300 mb-8 font-bold">
                Kami yang berbahagia,
              </p>
              <h2 className="text-5xl md:text-6xl font-serif italic text-[#6b7a66] mb-12 font-light leading-snug">
                {data.parents}
              </h2>
              <div className="w-16 h-[1px] bg-[#94a38e]/30 mx-auto mb-12" />
              <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 mb-6 font-bold italic opacity-60">
                Turut Mengundang:
              </p>
              <p className="text-2xl font-serif italic text-stone-500 font-light">
                Keluarga Besar H. Zainal
              </p>
              <div className="mt-32 text-[9px] uppercase tracking-[0.8em] text-stone-300 font-bold">
                Slawi • Jawa Tengah • 2026
              </div>
            </ScrollReveal>
          </footer>
        </div>
      )}
    </main>
  );
}

export default function PremiumInvitation() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center font-serif italic text-[#94a38e]">
          Memuat Kebahagiaan...
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}
