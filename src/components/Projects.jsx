import React, { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import {
  CodingAppsWebsitesDatabase,
  ShoppingShippingCart,
  EcologyOrganicSunGrowth,
  ComputersDevicesElectronicsLaptop,
  InternetNetworkWww,
  BusinessProductScale,
  CodingAppsWebsitesMobile,
  MultipleUser,
  TravelWayfindingPoolLadder,
  TechnologyRobotAiSignal1,
  ComputersDevicesElectronicsWebcam,
  MapNavigationCompass,
  CarDrive,
  MobilePhone,
} from "./Svgs";

const projectsData = [
  {
    id: "parkingapp",
    title: "Application de stationnement",
    description:
      "Conception et développement d’une application mobile d'aide au stationnement prédictif. L’application permet de voir les rues adjacentes d'une adresse et d'afficher la probabilité de places disponibles, en s’appuyant sur l'analyse de critères multiples (points d’intérêt, météo, fuseaux horaires, etc ...).",
    techs: [
      "React native",
      "Expo",
      "Supabase",
      "FastAPI",
      "Python",
      "Machine Learning",
    ],
    isNew: true,
    date: "2026",
    svgs: [
      <MapNavigationCompass key="1" />,
      <CarDrive key="2" />,
      <MobilePhone key="3" />,
    ],
  },
  {
    id: "ecom",
    title: "Site e-commerce",
    description:
      "Conception et développement d’une solution e-commerce pour l'entreprise Mecamot, spécialisée dans la vente, l'entretien et la réparation de matériel de motoculture.",
    techs: [
      "React.js",
      "Express.js",
      "Prisma",
      "MySQL",
      "Tailwind CSS",
      "Stripe",
    ],
    isNew: false,
    date: "2024",
    svgs: [
      <CodingAppsWebsitesDatabase key="1" />,
      <ShoppingShippingCart key="2" />,
      <EcologyOrganicSunGrowth key="3" />,
    ],
  },
  {
    id: "mjustice",
    title: "Stage Ministère de la Justice",
    description:
      "Stage de 8 semaines au sein du Ministère de la Justice de Nancy (2e année de BUT). Participation à la conception et au développement d'une application web interne, dédiée à l'optimisation et au suivi de la gestion des déploiements.",
    techs: ["JavaScript", "Bootstrap", "PHP", "MySQL"],
    isNew: false,
    date: "Mai - Juin 2024 (8 semaines)",
    svgs: [
      <ComputersDevicesElectronicsLaptop key="1" />,
      <InternetNetworkWww key="2" />,
      <BusinessProductScale key="3" />,
    ],
  },
  {
    id: "netlor",
    title: "Stage Netlor",
    description:
      "Stage de 14 semaines au sein de l'entreprise Netlor (3e année de BUT). Participation à la migration d'une API et de bases de données, à la conception et au développement d'une application mobile, dédiée à l'assistance et à l'optimisation des missions des maîtres-nageurs.",
    techs: ["Flutter", "MySQL", "PHP", "MongoDB", "Go"],
    isNew: false,
    date: "Février - Mai 2025 (14 semaines)",
    svgs: [
      <CodingAppsWebsitesMobile key="1" />,
      <MultipleUser key="2" />,
      <TravelWayfindingPoolLadder key="3" />,
    ],
  },
  {
    id: "projet_tutore",
    title: "Projet tutoré",
    description:
      "Conception d'un système de vidéosurveillance intelligent interconnecté. Déploiement d'un maillage de caméras couplé à un modèle d'intelligence artificielle pour la détection automatisée de comportements suspects et la transmission d'alertes en temps réel sur une application mobile.",
    techs: ["Flutter", "Python", "SupaBase", "Java"],
    isNew: false,
    date: "Septembre 2024 - Janvier 2025",
    svgs: [
      <TechnologyRobotAiSignal1 key="1" />,
      <CodingAppsWebsitesMobile key="2" />,
      <ComputersDevicesElectronicsWebcam key="3" />,
    ],
  },
];

export default function Projects({ onSelectProject }) {
  const splideRef = useRef(null);

  useEffect(() => {
    if (splideRef.current) {
      const splide = new Splide(splideRef.current, {
        type: "loop",
        perPage: 1,
        perMove: 1,
        gap: "1.5rem",
        padding: "2rem",
        arrows: true,
        pagination: true,
        trimSpace: false,
        padding: { left: "10%", right: "10%" },
        focus: "center",
        breakpoints: {
          768: {
            padding: { left: "5%", right: "5%" },
          },
        },
      });

      splide.mount();

      return () => {
        splide.destroy();
      };
    }
  }, []);

  return (
    <section className="min-h-screen justify-center flex flex-col mt-16 md:mt-24">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold text-center text-burnt-peach-400 mb-12 md:mb-16">
          Projets
        </h1>

        <div ref={splideRef} id="project-carousel" className="splide pb-12">
          <div className="splide__track relative">
            {/* Pixelated blur overlays on edges */}
            <div className="pixelated-blur-left absolute top-0 bottom-0 left-0 z-10 pointer-events-none"></div>
            <div className="pixelated-blur-right absolute top-0 bottom-0 right-0 z-10 pointer-events-none"></div>

            <ul className="splide__list">
              {projectsData.map((project) => (
                <li
                  className="splide__slide !h-auto flex flex-col"
                  key={project.id}
                >
                  <div className="rounded-lg overflow-hidden mt-8 shadow-lg flex-1 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-px flex-1">
                      <div className="p-5 md:p-10 flex flex-col justify-start bg-burnt-peach-50 h-full md:col-span-3">
                        <div className="mb-4 md:mb-6">
                          <div className="flex flex-row items-center gap-3 mb-2 md:mb-4">
                            <h3
                              className="text-3xl font-bold text-burnt-peach-700"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {project.title}
                            </h3>
                            {project.isNew && (
                              <span className="px-2.5 py-0.5 bg-majorelle-blue-100 text-majorelle-blue-800 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse shrink-0">
                                Nouveau
                              </span>
                            )}
                          </div>

                          {/* Emojis row on mobile only */}
                          <div className="flex flex-row gap-3 mb-4 md:hidden">
                            {project.svgs.map((svg, idx) => (
                              <div
                                key={idx}
                                className="p-2 bg-burnt-peach-100 rounded-lg flex items-center justify-center"
                              >
                                {React.cloneElement(svg, {
                                  width: 32,
                                  height: 32,
                                })}
                              </div>
                            ))}
                          </div>

                          <p
                            className="text-gray-600 leading-relaxed"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {project.description}
                          </p>
                        </div>

                        {project.date && (
                          <div className="mb-4 md:mb-6 text-burnt-peach-600 font-semibold text-sm">
                            <span>{project.date}</span>
                          </div>
                        )}

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-2xl font-semibold text-burnt-peach-700 mb-2 md:mb-4">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techs.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-burnt-peach-100 text-burnt-peach-400 rounded-full text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto pt-4">
                          <button
                            className="w-full cursor-pointer md:w-auto px-6 py-3 bg-burnt-peach-500 text-white rounded-lg font-medium hover:bg-burnt-peach-400 transition-colors"
                            onClick={() => onSelectProject(project.id)}
                          >
                            Voir plus
                            <i className="fa-solid fa-arrow-right ml-2"></i>
                          </button>
                        </div>
                      </div>

                      <div className="hidden md:flex flex-col items-center justify-center gap-8 bg-majorelle-blue-50 p-8 md:col-span-1">
                        {project.svgs}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
