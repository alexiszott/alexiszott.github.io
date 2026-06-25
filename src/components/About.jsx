import React from "react";
import Timeline from "./Timeline";

export default function About() {
  return (
    <section className="min-h-screen flex flex-col p-4 md:p-6 md:justify-center justify-start mt-16 md:mt-24">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-burnt-peach-400 mb-6 md:mb-8">
        À propos
      </h1>

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 md:my-auto my-0">
        {/* Profil */}
        <div className="bg-burnt-peach-50 p-8 md:p-10 rounded-lg flex flex-col">
          <h2 className="text-3xl font-semibold text-burnt-peach-700 mb-6">
            Profil - Étudiant Ingénieur en Informatique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="space-y-4">
              <p className="text-lg text-burnt-peach-500 flex items-center">
                <span className="mr-4 w-6 text-center">
                  <i className="fa-solid fa-user"></i>
                </span>
                <strong>Alexis ZOTT</strong>
              </p>
              <p className="text-lg text-burnt-peach-500 flex items-center">
                <span className="mr-4 w-6 text-center">
                  <i className="fa-solid fa-cake-candles"></i>
                </span>
                23 ans
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-burnt-peach-500 flex items-center">
                <span className="mr-4 w-6 text-center">
                  <i className="fa-solid fa-graduation-cap"></i>
                </span>
                Étudiant en 1ère année de cycle ingénieur (UTT)
              </p>
              <p className="text-lg text-burnt-peach-500 flex items-center">
                <span className="mr-4 w-6 text-center">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                Troyes, France
              </p>
            </div>
          </div>
        </div>

        {/* Recherche de stage - Annonce */}
        <div className="bg-majorelle-blue-50 p-8 md:p-10 rounded-lg flex flex-col border border-majorelle-blue-100/50 shadow-md">
          <h2 className="text-3xl font-semibold text-majorelle-blue-700 mb-6 flex items-center gap-3 text-left">
            Recherche de stage de fin d'étude d'Ingénieur en Informatique
            (Actif)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="md:col-span-2 space-y-4 text-left">
              <p className="text-gray-700 leading-relaxed">
                Futur ingénieur en informatique, je recherche un stage de fin
                d'études axé sur le développement logicielle, d'applications web
                ou mobile. Je recherche des projets qui me permettront d'élever
                mes compétences techniques déjà renforcées durant mes deux
                stages, de mettre en pratique mes connaissances acquises durant
                mon BUT et mon diplome d'ingénieur.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-majorelle-blue-600 shadow-xs border border-majorelle-blue-100/50">
                  Développement full-stack
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-majorelle-blue-600 shadow-xs border border-majorelle-blue-100/50">
                  Formation SCRUM (Certification PSPO 1)
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-majorelle-blue-600 shadow-xs border border-majorelle-blue-100/50">
                  Anglais : Niveau B2+ (TOEIC)
                </span>
              </div>
            </div>
            <div className="space-y-4 bg-white/40 p-6 rounded-xl border border-majorelle-blue-100 flex flex-col justify-center text-left">
              <div className="flex items-center gap-3 text-majorelle-blue-700">
                <i className="fa-solid fa-calendar shrink-0 w-5 text-center"></i>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Durée / Dates
                  </p>
                  <p className="text-sm font-bold text-majorelle-blue-900">
                    6 mois - à partir de septembre 2027
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-majorelle-blue-700">
                <i className="fa-solid fa-location-dot shrink-0 w-5 text-center"></i>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Localisation
                  </p>
                  <p className="text-sm font-bold text-majorelle-blue-900">
                    Paris / Île-de-France
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parcours (Timeline) */}
        <Timeline />
      </div>
    </section>
  );
}
