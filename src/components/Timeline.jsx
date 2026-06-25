import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

// Customizable timeline data for sub-items and popovers
const subItemsData = {
  bac: {
    id: "bac",
    emoji: "🎓",
    year: "2018 - 2022",
    title: "Bac technologique",
    institution: "Lycée Boutet de Monvel - Lunéville",
    date: "2018 - 2022",
    details: "BAC Technologique STI2D. Obtenu avec mention bien.",
  },
  "stage-justice": {
    id: "stage-justice",
    emoji: "⚖️",
    year: "2024",
    title: "Stage - Ministère de la Justice",
    institution: "Ministère de la Justice - Nancy",
    date: "Mai - Juin 2024 (8 semaines)",
    details:
      "Stage de 8 semaines au sein du Ministère de la Justice de Nancy durant ma seconde année de BUT. Développement d'un site web interne visant à améliorer la gestion des déploiements de matériel.",
  },
  "stage-netlor": {
    id: "stage-netlor",
    emoji: "🏊‍♂️",
    year: "2025",
    title: "Stage - Netlor",
    institution: "Netlor - Nancy",
    date: "Février - Mai 2025 (14 semaines)",
    details:
      "Stage de 14 semaines au sein de l'entreprise Netlor (Nancy) durant ma troisième année de BUT. Développement d'une application mobile visant à aider les maître nageurs, migration d'API et de base de données.",
  },
  "but-diplome": {
    id: "but-diplome",
    emoji: "💻",
    year: "2025",
    title: "Obtention du BUT Informatique RA-IL",
    institution: "IUT Charlemagne - Nancy",
    date: "2025",
    details:
      "BUT en Informatique, parcours RA-IL (Réalisation d'applications - Ingénierie logicielle). Formation complète couvrant le génie logiciel, le web, le réseaux et les bases de données.",
  },
  "utt-etranger": {
    id: "utt-etranger",
    emoji: "✈️",
    year: "2027",
    title: "Semestre étranger (à venir)",
    institution: "? ? ?",
    date: "Mars 2027",
    details:
      "Semestre d'études à l'étranger obligatoire dans une université partenaire dans le cadre du cursus d'ingénieur.",
  },
  "utt-stage": {
    id: "utt-stage",
    emoji: "💼",
    year: "2027",
    title: "Stage de fin d'étude (à venir)",
    institution: "? ? ?",
    date: "Septembre 2027 (6 mois)",
    details: "Stage de fin d'études d'ingénieur.",
  },
  "utt-diplome": {
    id: "utt-diplome",
    emoji: "🎓",
    year: "2025 - 2028",
    title: "Cycle ingénieur UTT",
    institution: "Université de Technologie de Troyes (UTT)",
    date: "2025 - 2028 (en cours)",
    details:
      "Formation d'ingénieur en Informatique et Systèmes d'Information (ISI). Approfondissement en architecture logicielle, sécurité des réseaux, IA et gestion de projets complexes.",
  },
};

export default function Timeline() {
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [popoverCoords, setPopoverCoords] = useState({ top: 0, left: 0 });
  const prevFlippedStatesRef = useRef({});
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeJalon = subItemsData[activeId];

  const toggleGroup = (groupId) => {
    setExpandedGroupId(expandedGroupId === groupId ? null : groupId);
    setActiveId(null);
  };

  const handleButtonClick = (e, id) => {
    e.stopPropagation();
    if (activeId === id) {
      setActiveId(null);
    } else {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      setPopoverCoords({
        top: window.scrollY + buttonRect.top - 12,
        left: window.scrollX + buttonRect.left + buttonRect.width / 2,
      });
      setActiveId(id);
    }
  };

  // Close popover on window scroll or resize to keep position in sync
  useEffect(() => {
    const handleClose = () => setActiveId(null);
    window.addEventListener("resize", handleClose);
    window.addEventListener("scroll", handleClose, { passive: true });
    return () => {
      window.removeEventListener("resize", handleClose);
      window.removeEventListener("scroll", handleClose);
    };
  }, []);

  // Exact 3D flip animation matching Board's tiles behavior
  useEffect(() => {
    const tilts = [-30, 25, -15, 30, -10, 15, -20];
    const itemIds = [
      "bac",
      "but-header",
      "stage-justice",
      "stage-netlor",
      "but-diplome",
      "utt-header",
      "utt-etranger",
      "utt-stage",
      "utt-diplome",
    ];

    itemIds.forEach((id, idx) => {
      const isFlipped =
        activeId === id ||
        (id === "but-header" && expandedGroupId === "but") ||
        (id === "utt-header" && expandedGroupId === "utt");

      const wasFlipped = !!prevFlippedStatesRef.current[id];
      if (isFlipped === wasFlipped) {
        // No change in flip state, skip animating this jalon
        return;
      }

      // Update ref state
      prevFlippedStatesRef.current[id] = isFlipped;

      const buttons = document.querySelectorAll(`[data-timeline-btn="${id}"]`);
      const tiltX = tilts[idx % tilts.length];

      buttons.forEach((btn) => {
        if (isFlipped) {
          gsap
            .timeline()
            .set(btn, { transformPerspective: 1000 })
            .to(btn, {
              rotateY: 450,
              rotateX: tiltX,
              duration: 0.5,
              ease: "power2.out",
            })
            .to(
              btn,
              {
                rotateY: 540,
                rotateX: 0,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.25",
            );
        } else {
          const currentRotateY = gsap.getProperty(btn, "rotateY");
          if (Math.abs(currentRotateY) > 0.1) {
            gsap
              .timeline()
              .to(btn, {
                rotateY: 990,
                rotateX: tiltX,
                duration: 0.5,
                ease: "power2.out",
              })
              .to(
                btn,
                {
                  rotateY: 1080,
                  rotateX: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.set(btn, { rotateY: 0, rotateX: 0 });
                  },
                },
                "-=0.25",
              );
          } else {
            gsap.set(btn, { rotateY: 0, rotateX: 0 });
          }
        }
      });
    });
  }, [activeId, expandedGroupId]);

  const renderPopoverContent = (jalon) => (
    <>
      <div className="relative flex justify-between items-center mb-2 z-10 gap-3">
        <h4 className="text-lg font-bold text-burnt-peach-400 md:text-xl">
          {jalon.title}
        </h4>
        <button
          onClick={() => setActiveId(null)}
          className="text-gray-400 hover:text-burnt-peach-400 transition-colors p-1 rounded-full hover:bg-neutral-800 cursor-pointer shrink-0"
        >
          <i className="fa-solid fa-xmark text-sm md:text-base leading-none"></i>
        </button>
      </div>
      <div className="relative z-10">
        <p className="text-xs md:text-sm font-semibold text-majorelle-blue-300 mb-2">
          {jalon.institution}
        </p>
        <p className="text-[11px] md:text-xs italic text-gray-400 mb-3">
          {jalon.date}
        </p>
        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
          {jalon.details}
        </p>
      </div>
    </>
  );

  return (
    <div
      className="bg-burnt-peach-50 p-4 md:p-6 rounded-lg w-full flex flex-col h-auto relative timeline-root-container max-w-6xl mx-auto overflow-visible"
      style={{ height: "auto", minHeight: "fit-content" }}
    >
      <h2 className="text-3xl font-semibold text-burnt-peach-700 mb-4">
        Mon Parcours
      </h2>

      {activeId !== null && (
        <div
          className="fixed inset-0 z-45 bg-black/40 backdrop-blur-xs md:bg-transparent md:backdrop-blur-none transition-opacity duration-300"
          onClick={() => setActiveId(null)}
        />
      )}

      {/* 1. MOBILE TIMELINE (Vertical, block md:hidden) */}
      <div className="md:hidden relative py-4 overflow-visible">
        <div className="flex flex-col overflow-visible">
          {/* BAC */}
          <div className="flex items-stretch overflow-visible">
            {/* Left column for button and vertical line segment */}
            <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
              <div className="absolute left-1/2 -translate-x-1/2 top-[22px] bottom-0 w-[8px] bg-burnt-peach-400 z-0"></div>
              <button
                onClick={() => setActiveId(activeId === "bac" ? null : "bac")}
                data-timeline-btn="bac"
                className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 outline-none select-none hover:scale-108 p-0 border-0 ${activeId === "bac" ? "shadow-[0_0_12px_rgba(215,75,40,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                  <span className="select-none z-10">🎓</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
                <div
                  className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="select-none z-10">🎓</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
              </button>
            </div>
            {/* Right column for text */}
            <div
              onClick={() => setActiveId(activeId === "bac" ? null : "bac")}
              className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
            >
              <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                2018 - 2022
              </span>
              <p
                className={`text-lg font-bold mt-2 transition-colors duration-200 ${activeId === "bac" ? "text-burnt-peach-500" : "text-burnt-peach-800"}`}
              >
                Bac Technologique
              </p>
            </div>
          </div>

          {/* BUT */}
          <div className="relative overflow-visible">
            <div className="flex items-stretch overflow-visible">
              <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                {/* Top segment: connects from BAC (always peach) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[22px] w-[8px] bg-burnt-peach-400 z-0"></div>
                {/* Bottom segment: connects to sub-items or UTT */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-[22px] bottom-0 w-[8px] z-0 transition-colors duration-500 ${expandedGroupId === "but" ? "bg-majorelle-blue-500" : "bg-burnt-peach-400"}`}
                ></div>
                <button
                  onClick={() => toggleGroup("but")}
                  data-timeline-btn="but-header"
                  className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 outline-none select-none hover:scale-108 p-0 border-0 ${expandedGroupId === "but" ? "shadow-[0_0_12px_rgba(215,75,40,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                    <span className="select-none z-10">💻</span>
                    <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                  </div>
                  <div
                    className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <span className="select-none z-10">💻</span>
                    <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                  </div>
                </button>
              </div>
              <div
                onClick={() => toggleGroup("but")}
                className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
              >
                <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                  2022 - 2025
                </span>
                <p
                  className={`text-lg font-bold mt-2 transition-colors duration-200 ${expandedGroupId === "but" ? "text-burnt-peach-500" : "text-burnt-peach-800"}`}
                >
                  BUT Informatique
                </p>
              </div>
            </div>

            <div
              className="pl-0 overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: expandedGroupId === "but" ? "1000px" : "0px",
                opacity: expandedGroupId === "but" ? 1 : 0,
                overflow: expandedGroupId === "but" ? "visible" : "hidden",
              }}
            >
              {/* stage-justice */}
              <div className="flex items-stretch overflow-visible">
                <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[8px] bg-majorelle-blue-500 z-0"></div>
                  <button
                    onClick={() =>
                      setActiveId(
                        activeId === "stage-justice" ? null : "stage-justice",
                      )
                    }
                    data-timeline-btn="stage-justice"
                    className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "stage-justice" ? "shadow-[0_0_12px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                      <span className="select-none z-10">⚖️</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                    <div
                      className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="select-none z-10">⚖️</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                  </button>
                </div>
                <div
                  onClick={() =>
                    setActiveId(
                      activeId === "stage-justice" ? null : "stage-justice",
                    )
                  }
                  className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
                >
                  <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                    2024
                  </span>
                  <p
                    className={`text-lg font-bold mt-2 transition-colors duration-200 ${activeId === "stage-justice" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                  >
                    Stage - Ministère de la Justice
                  </p>
                </div>
              </div>

              {/* stage-netlor */}
              <div className="flex items-stretch overflow-visible">
                <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[8px] bg-majorelle-blue-500 z-0"></div>
                  <button
                    onClick={() =>
                      setActiveId(
                        activeId === "stage-netlor" ? null : "stage-netlor",
                      )
                    }
                    data-timeline-btn="stage-netlor"
                    className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "stage-netlor" ? "shadow-[0_0_12px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                      <span className="select-none z-10">🏊‍♂️</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                    <div
                      className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="select-none z-10">🏊‍♂️</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                  </button>
                </div>
                <div
                  onClick={() =>
                    setActiveId(
                      activeId === "stage-netlor" ? null : "stage-netlor",
                    )
                  }
                  className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
                >
                  <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                    2025
                  </span>
                  <p
                    className={`text-lg font-bold mt-2 transition-colors duration-200 ${activeId === "stage-netlor" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                  >
                    Stage - Netlor
                  </p>
                </div>
              </div>

              {/* but-diplome */}
              <div className="flex items-stretch overflow-visible">
                <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                  {/* Top segment: connects from active stage-netlor (always blue) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[22px] w-[8px] bg-majorelle-blue-500 z-0"></div>
                  {/* Bottom segment: connects to UTT (always peach) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[22px] bottom-0 w-[8px] bg-burnt-peach-400 z-0"></div>
                  <button
                    onClick={() =>
                      setActiveId(
                        activeId === "but-diplome" ? null : "but-diplome",
                      )
                    }
                    data-timeline-btn="but-diplome"
                    className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "but-diplome" ? "shadow-[0_0_12px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                      <span className="select-none z-10">💻</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                    <div
                      className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="select-none z-10">💻</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                  </button>
                </div>
                <div
                  onClick={() =>
                    setActiveId(
                      activeId === "but-diplome" ? null : "but-diplome",
                    )
                  }
                  className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
                >
                  <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                    2025
                  </span>
                  <p
                    className={`text-lg font-bold mt-2 transition-colors duration-200 ${activeId === "but-diplome" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                  >
                    Obtention du BUT Informatique RA-IL
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* UTT */}
          <div className="relative overflow-visible">
            <div className="flex items-stretch overflow-visible">
              <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                {/* Top segment: connects from but-diplome (always peach) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[22px] w-[8px] bg-burnt-peach-400 z-0"></div>
                {expandedGroupId === "utt" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[22px] bottom-0 w-[8px] bg-majorelle-blue-500 z-0 transition-colors duration-500"></div>
                )}
                {expandedGroupId !== "utt" && (
                  <>
                    <div className="absolute left-1/2 -translate-x-1/2 top-[22px] bottom-[14px] w-[8px] bg-burnt-peach-400 z-0"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-x-[10px] border-x-transparent border-t-[14px] border-t-burnt-peach-400 z-0"></div>
                  </>
                )}
                <button
                  onClick={() => toggleGroup("utt")}
                  data-timeline-btn="utt-header"
                  className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 p-0 border-0 ${expandedGroupId === "utt" ? "shadow-[0_0_12px_rgba(215,75,40,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.4)]"}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                    <span className="select-none z-10">🚀</span>
                    <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                  </div>
                  <div
                    className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <span className="select-none z-10">🚀</span>
                    <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                  </div>
                </button>
              </div>
              <div
                onClick={() => toggleGroup("utt")}
                className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
              >
                <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                  2025 - 2028
                </span>
                <p
                  className={`text-lg font-bold mt-2 transition-colors duration-200 ${expandedGroupId === "utt" ? "text-burnt-peach-500" : "text-burnt-peach-800"}`}
                >
                  Cycle Ingénieur Informatique
                </p>
              </div>
            </div>

            <div
              className="pl-0 overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: expandedGroupId === "utt" ? "1000px" : "0px",
                opacity: expandedGroupId === "utt" ? 1 : 0,
                overflow: expandedGroupId === "utt" ? "visible" : "hidden",
              }}
            >
              {/* Sub-item: Départ semestre étranger */}
              <div className="flex items-stretch overflow-visible">
                <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[8px] bg-majorelle-blue-500 z-0"></div>
                  <button
                    onClick={() =>
                      setActiveId(
                        activeId === "utt-etranger" ? null : "utt-etranger",
                      )
                    }
                    data-timeline-btn="utt-etranger"
                    className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "utt-etranger" ? "shadow-[0_0_12px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                      <span className="select-none z-10">✈️</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                    <div
                      className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="select-none z-10">✈️</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                  </button>
                </div>
                <div
                  onClick={() =>
                    setActiveId(
                      activeId === "utt-etranger" ? null : "utt-etranger",
                    )
                  }
                  className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
                >
                  <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                    Mars 2027
                  </span>
                  <p
                    className={`text-lg font-bold mt-2 transition-colors duration-200 ${activeId === "utt-etranger" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                  >
                    Départ semestre étranger
                  </p>
                </div>
              </div>

              {/* Sub-item: Stage de fin d'étude */}
              <div className="flex items-stretch overflow-visible">
                <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[8px] bg-majorelle-blue-500 z-0"></div>
                  <button
                    onClick={() =>
                      setActiveId(activeId === "utt-stage" ? null : "utt-stage")
                    }
                    data-timeline-btn="utt-stage"
                    className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "utt-stage" ? "shadow-[0_0_12px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                      <span className="select-none z-10">💼</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                    <div
                      className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="select-none z-10">💼</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                  </button>
                </div>
                <div
                  onClick={() =>
                    setActiveId(activeId === "utt-stage" ? null : "utt-stage")
                  }
                  className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
                >
                  <span className="text-base whitespace-nowrap font-bold text-burnt-peach-600 block">
                    Septembre 2027
                  </span>
                  <p
                    className={`text-lg font-bold mt-2 transition-colors duration-200 ${activeId === "utt-stage" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                  >
                    Stage de fin d'étude
                  </p>
                </div>
              </div>

              {/* Sub-item: Cycle d'Ingénieur UTT */}
              <div className="flex items-stretch overflow-visible">
                <div className="relative w-16 flex flex-col items-center justify-start shrink-0 overflow-visible">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-[14px] w-[8px] bg-majorelle-blue-500 z-0"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-x-[10px] border-x-transparent border-t-[14px] border-t-majorelle-blue-500 z-0"></div>
                  <button
                    onClick={() =>
                      setActiveId(
                        activeId === "utt-diplome" ? null : "utt-diplome",
                      )
                    }
                    data-timeline-btn="utt-diplome"
                    className={`relative z-10 w-11 h-11 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "utt-diplome" ? "shadow-[0_0_12px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_12px_rgba(223,111,83,0.35)]"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                      <span className="select-none z-10">🎓</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                    <div
                      className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span className="select-none z-10">🎓</span>
                      <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                    </div>
                  </button>
                </div>
                <div
                  onClick={() =>
                    setActiveId(
                      activeId === "utt-diplome" ? null : "utt-diplome",
                    )
                  }
                  className="pl-4 min-h-[44px] pt-1 pb-12 cursor-pointer grow text-left"
                >
                  <span className="text-base font-bold text-burnt-peach-600 block">
                    2025 - 2028
                  </span>
                  <p
                    className={`text-lg font-bold mt-2 transition-colors duration-200 ${activeId === "utt-diplome" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                  >
                    Cycle Ingénieur UTT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 2. DESKTOP TIMELINE (Horizontal, hidden md:block) */}
      <div className="hidden md:block relative w-full overflow-visible py-0 perspective-[1000px]">
        <div
          onScroll={() => setActiveId(null)}
          className="relative w-full h-[135px] flex justify-start items-center px-6 overflow-x-auto overflow-y-visible scrollbar-thin"
        >
          {/* BAC */}
          <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] bg-burnt-peach-400 z-0"></div>
            <div className="absolute top-[5px] h-8 flex items-end justify-center">
              <span
                className={`text-lg font-bold transition-colors duration-200 ${activeId === "bac" ? "text-burnt-peach-500" : "text-burnt-peach-600"}`}
              >
                2018 - 2022
              </span>
            </div>
            <button
              onClick={(e) => handleButtonClick(e, "bac")}
              data-timeline-btn="bac"
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 p-0 border-0 ${activeId === "bac" ? "shadow-[0_0_15px_rgba(215,75,40,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                <span className="select-none z-10 text-lg">🎓</span>
                <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
              </div>
              <div
                className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span className="select-none z-10 text-lg">🎓</span>
                <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
              </div>
            </button>
            <div
              onClick={(e) => handleButtonClick(e, "bac")}
              className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
            >
              <p
                className={`text-base font-bold leading-snug transition-colors duration-200 ${activeId === "bac" ? "text-burnt-peach-500" : "text-burnt-peach-800"}`}
              >
                Bac Technologique
              </p>
            </div>
          </div>

          {/* BUT HEADER */}
          <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
            <div
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] z-0 transition-colors duration-500 ${expandedGroupId === "but" ? "bg-majorelle-blue-500" : "bg-burnt-peach-400"}`}
            ></div>
            <div className="absolute top-[5px] h-8 flex items-end justify-center">
              <span
                className={`text-lg font-bold transition-colors duration-200 ${expandedGroupId === "but" ? "text-burnt-peach-500" : "text-burnt-peach-600"}`}
              >
                2022 - 2025
              </span>
            </div>
            <button
              onClick={() => toggleGroup("but")}
              data-timeline-btn="but-header"
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 p-0 border-0 ${expandedGroupId === "but" ? "shadow-[0_0_15px_rgba(215,75,40,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                <span className="select-none z-10 text-lg">💻</span>
                <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
              </div>
              <div
                className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span className="select-none z-10 text-lg">💻</span>
                <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
              </div>
            </button>
            <div
              onClick={() => toggleGroup("but")}
              className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
            >
              <p
                className={`text-base font-bold leading-snug transition-colors duration-200 ${expandedGroupId === "but" ? "text-burnt-peach-500" : "text-burnt-peach-800"}`}
              >
                BUT Informatique
              </p>
            </div>
          </div>

          {/* Collapsible Sub-Timeline BUT (Horizontal) */}
          <div
            className="flex items-center h-full transition-all duration-500 ease-in-out"
            style={{
              maxWidth: expandedGroupId === "but" ? "480px" : "0px",
              opacity: expandedGroupId === "but" ? 1 : 0,
              overflow: expandedGroupId === "but" ? "visible" : "hidden",
            }}
          >
            {/* Sub-item 2: Stage Justice */}
            <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] bg-majorelle-blue-500 z-0"></div>
              <div className="absolute top-[5px] h-8 flex items-end justify-center">
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${activeId === "stage-justice" ? "text-majorelle-blue-600" : "text-burnt-peach-600"}`}
                >
                  2024
                </span>
              </div>
              <button
                onClick={(e) => handleButtonClick(e, "stage-justice")}
                data-timeline-btn="stage-justice"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "stage-justice" ? "shadow-[0_0_15px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                  <span className="select-none z-10 text-lg">⚖️</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
                <div
                  className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="select-none z-10 text-lg">⚖️</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
              </button>
              <div
                onClick={(e) => handleButtonClick(e, "stage-justice")}
                className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
              >
                <p
                  className={`text-base font-bold leading-snug transition-colors duration-200 ${activeId === "stage-justice" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                >
                  Stage - Justice
                </p>
              </div>
            </div>

            {/* Sub-item 3: Stage Netlor */}
            <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] bg-majorelle-blue-500 z-0"></div>
              <div className="absolute top-[5px] h-8 flex items-end justify-center">
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${activeId === "stage-netlor" ? "text-majorelle-blue-600" : "text-burnt-peach-600"}`}
                >
                  2025
                </span>
              </div>
              <button
                onClick={(e) => handleButtonClick(e, "stage-netlor")}
                data-timeline-btn="stage-netlor"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "stage-netlor" ? "shadow-[0_0_15px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                  <span className="select-none z-10 text-lg">🏊‍♂️</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
                <div
                  className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="select-none z-10 text-lg">🏊‍♂️</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
              </button>
              <div
                onClick={(e) => handleButtonClick(e, "stage-netlor")}
                className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
              >
                <p
                  className={`text-base font-bold leading-snug transition-colors duration-200 ${activeId === "stage-netlor" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                >
                  Stage - Netlor
                </p>
              </div>
            </div>

            {/* Sub-item 4: Obtention BUT */}
            <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] bg-burnt-peach-400 z-0"></div>
              <div className="absolute top-[5px] h-8 flex items-end justify-center">
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${activeId === "but-diplome" ? "text-majorelle-blue-600" : "text-burnt-peach-600"}`}
                >
                  2025
                </span>
              </div>
              <button
                onClick={(e) => handleButtonClick(e, "but-diplome")}
                data-timeline-btn="but-diplome"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "but-diplome" ? "shadow-[0_0_15px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                  <span className="select-none z-10 text-lg">💻</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
                <div
                  className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="select-none z-10 text-lg">💻</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
              </button>
              <div
                onClick={(e) => handleButtonClick(e, "but-diplome")}
                className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
              >
                <p
                  className={`text-base font-bold leading-snug transition-colors duration-200 ${activeId === "but-diplome" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                >
                  Obtention du BUT
                </p>
              </div>
            </div>
          </div>

          {/* UTT HEADER */}
          <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
            {expandedGroupId === "utt" && (
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] bg-majorelle-blue-500 z-0 transition-colors duration-500"></div>
            )}
            {expandedGroupId !== "utt" && (
              <>
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[38px] h-[8px] bg-burnt-peach-400 z-0"></div>
                <div className="absolute left-[118px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-burnt-peach-400 z-0"></div>
              </>
            )}
            <div className="absolute top-[5px] h-8 flex items-end justify-center">
              <span
                className={`text-lg font-bold transition-colors duration-200 ${expandedGroupId === "utt" ? "text-burnt-peach-500" : "text-burnt-peach-600"}`}
              >
                2025 - 2028
              </span>
            </div>
            <button
              onClick={() => toggleGroup("utt")}
              data-timeline-btn="utt-header"
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 p-0 border-0 ${expandedGroupId === "utt" ? "shadow-[0_0_15px_rgba(215,75,40,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                <span className="select-none z-10 text-lg">🚀</span>
                <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
              </div>
              <div
                className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span className="select-none z-10 text-lg">🚀</span>
                <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
              </div>
            </button>
            <div
              onClick={() => toggleGroup("utt")}
              className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
            >
              <p
                className={`text-base font-bold leading-snug transition-colors duration-200 ${expandedGroupId === "utt" ? "text-burnt-peach-500" : "text-burnt-peach-800"}`}
              >
                Cycle Ingénieur
              </p>
            </div>
          </div>

          {/* Collapsible Sub-Timeline UTT (Horizontal) */}
          <div
            className="flex items-center h-full transition-all duration-500 ease-in-out"
            style={{
              maxWidth: expandedGroupId === "utt" ? "480px" : "0px",
              opacity: expandedGroupId === "utt" ? 1 : 0,
              overflow: expandedGroupId === "utt" ? "visible" : "hidden",
            }}
          >
            {/* Sub-item: Départ semestre étranger */}
            <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] bg-majorelle-blue-500 z-0"></div>
              <div className="absolute top-[5px] h-8 flex items-end justify-center">
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${activeId === "utt-etranger" ? "text-majorelle-blue-600" : "text-burnt-peach-600"}`}
                >
                  Mars 2027
                </span>
              </div>
              <button
                onClick={(e) => handleButtonClick(e, "utt-etranger")}
                data-timeline-btn="utt-etranger"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "utt-etranger" ? "shadow-[0_0_15px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                  <span className="select-none z-10 text-lg">✈️</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
                <div
                  className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="select-none z-10 text-lg">✈️</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
              </button>
              <div
                onClick={(e) => handleButtonClick(e, "utt-etranger")}
                className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
              >
                <p
                  className={`text-base font-bold leading-snug transition-colors duration-200 ${activeId === "utt-etranger" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                >
                  Semestre étranger
                </p>
              </div>
            </div>

            {/* Sub-item: Stage de fin d'étude */}
            <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-40 h-[8px] bg-majorelle-blue-500 z-0"></div>
              <div className="absolute top-[5px] h-8 flex items-end justify-center">
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${activeId === "utt-stage" ? "text-majorelle-blue-600" : "text-burnt-peach-600"}`}
                >
                  Septembre 2027
                </span>
              </div>
              <button
                onClick={(e) => handleButtonClick(e, "utt-stage")}
                data-timeline-btn="utt-stage"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "utt-stage" ? "shadow-[0_0_15px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                  <span className="select-none z-10 text-lg">💼</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
                <div
                  className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="select-none z-10 text-lg">💼</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
              </button>
              <div
                onClick={(e) => handleButtonClick(e, "utt-stage")}
                className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
              >
                <p
                  className={`text-base font-bold leading-snug transition-colors duration-200 ${activeId === "utt-stage" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                >
                  Stage fin d'étude
                </p>
              </div>
            </div>

            {/* Sub-item 3: Cycle d'Ingénieur UTT */}
            <div className="relative flex flex-col items-center text-center w-40 shrink-0 h-full overflow-visible">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[38px] h-[8px] bg-majorelle-blue-500 z-0"></div>
              <div className="absolute left-[118px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-majorelle-blue-500 z-0"></div>
              <div className="absolute top-[5px] h-8 flex items-end justify-center">
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${activeId === "utt-diplome" ? "text-majorelle-blue-600" : "text-burnt-peach-600"}`}
                >
                  2025 - 2028
                </span>
              </div>
              <button
                onClick={(e) => handleButtonClick(e, "utt-diplome")}
                data-timeline-btn="utt-diplome"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-lg shadow-md cursor-pointer p-0 border-0 ${activeId === "utt-diplome" ? "shadow-[0_0_15px_rgba(76,73,234,0.5)]" : "hover:shadow-[0_0_15px_rgba(223,111,83,0.4)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="tile-face inset-0 bg-burnt-peach-500 flex items-center justify-center rounded-lg text-white overflow-hidden">
                  <span className="select-none z-10 text-lg">🎓</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
                <div
                  className="tile-face inset-0 bg-majorelle-blue-500 flex items-center justify-center rounded-lg text-white overflow-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="select-none z-10 text-lg">🎓</span>
                  <div className="chromatic-aberration opacity-40 mix-blend-screen absolute inset-0 rounded-lg"></div>
                </div>
              </button>
              <div
                onClick={(e) => handleButtonClick(e, "utt-diplome")}
                className="absolute top-[98px] w-full flex justify-center text-center px-2 cursor-pointer max-w-[180px] hover:opacity-80 transition-opacity"
              >
                <p
                  className={`text-base font-bold leading-snug transition-colors duration-200 ${activeId === "utt-diplome" ? "text-majorelle-blue-600" : "text-burnt-peach-800"}`}
                >
                  Cycle Ingénieur UTT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP POPOVER OVERLAY */}
      {!isMobile &&
        activeId !== null &&
        activeJalon &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: `${popoverCoords.top}px`,
              left: `${popoverCoords.left}px`,
              transform: "translate(-50%, -100%)",
            }}
            className="hidden md:block z-[9999] w-[350px] bg-neutral-900 border-2 border-burnt-peach-400 text-white rounded-xl shadow-2xl p-6 text-left transition-all duration-300 transform origin-bottom overflow-hidden scale-100 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {renderPopoverContent(activeJalon)}
          </div>,
          document.body,
        )}

      {/* MOBILE MODAL OVERLAY */}
      {activeId !== null && activeJalon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-[1000px] md:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setActiveId(null)}
          />
          <div className="relative bg-neutral-900 border-2 border-burnt-peach-400 text-white rounded-xl shadow-2xl p-6 max-w-sm w-full z-10 overflow-hidden transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
            {renderPopoverContent(activeJalon)}
          </div>
        </div>
      )}
    </div>
  );
}
