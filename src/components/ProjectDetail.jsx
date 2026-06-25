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

const projectDetails = {
  parkingapp: {
    title: "Application de stationnement",
    subtitle: "Aide au stationnement prédictif sur mobile",
    svgs: [
      <MapNavigationCompass key="1" />,
      <CarDrive key="2" />,
      <MobilePhone key="3" />,
    ],
    isMobileCarousel: true,
    images: [
      {
        src: "/images/projects/parking/show.PNG",
        alt: "Détails des probabilités de places",
      },
      {
        src: "/images/projects/parking/history.PNG",
        alt: "Aperçu de l'historique.",
      },
      ,
      {
        src: "/images/projects/parking/default_ping.PNG",
        alt: "Aperçu de la carte de stationnement",
      },
      {
        src: "/images/projects/parking/default_search.PNG",
        alt: "Aperçu de la carte de stationnement",
      },
      {
        src: "/images/projects/parking/profile.PNG",
        alt: "Aperçu du profil utilisateur",
      },
    ],
    description: (
      <>
        <p className="leading-relaxed text-gray-900 mb-4">
          Ce projet est un projet personnel que j'ai dédicé de développement sur
          mon temps libre suite à une réflexion que je me suis faite : Je
          détestait aller en ville avec ma voiture car je ne savais pas ou il
          pourrait avoir de la place pour me garer. J'ai donc décidé de créer
          une application qui permet de prédire les places disponibles dans les
          rues adjacentes d'une adresse donnée, en se basant sur plusieurs
          critères tels que les points d'intérêt (restaurants, écoles, hôpitaux,
          boites de nuits ...), la météo, le jour de la semaine, l'heure, etc.
          L'application est développée en React Native et utilise Supabase pour
          la gestion des données et FastAPI pour le backend.
        </p>
        <p className="text-gray-900 mb-4 font-bold">
          <strong>Fonctionnalités principales :</strong>
        </p>
        <ul className="mb-4 list-disc pl-5 text-gray-900 space-y-1">
          <li>
            <strong>Cartographie :</strong> Visualisation des rues coloration de
            ces dernières selon la probabilité de trouver une place libre.
          </li>
          <li>
            <strong>Prédiction intelligent :</strong> Intégration d'un
            algorithme de prédiction basé sur des critères multiples (météo,
            jour de la semaine, heure, points d'intérêt environnants). Dans
            l'avenir je souhaite intégrer un modèle de crowd sourcing pour
            améliorer la précision des prédictions en se basant sur les retours
            des utilisateurs.
          </li>
          <li>
            <strong>Mode de recherche :</strong> L'application possède 2 mode de
            recherche. Un qui permet de selectionner un endroit sur la carte et
            un autre qui permet de rechercher une adresse et d'afficher les rues
            adjacentes.
          </li>
        </ul>
        <p className="leading-relaxed text-gray-900 mb-4">
          <strong>Architecture et base de données :</strong>
        </p>
        <ul className="list-disc pl-5 text-gray-900 space-y-1">
          <li>
            <strong>Backend API :</strong> API REST développée en Python avec
            FastAPI pour caculer et envoyer les prédictions de mon algorithme.
          </li>
          <li>
            <strong>Base de données :</strong> Utilisation de Supabase pour le
            stockage des données géographiques (PostGIS), les profils
            utilisateurs et l'authentification sécurisée.
          </li>
          <li>
            <strong>Frontend Mobile :</strong> Application corss-platform
            développée avec React Native et Expo.s
          </li>
        </ul>
      </>
    ),
    techs: [
      { name: "React Native", icon: "devicon-react-original" },
      { name: "Expo", icon: "" },
      { name: "Supabase", icon: "devicon-supabase-plain" },
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
      { name: "Python", icon: "devicon-python-plain" },
    ],
  },
  ecom: {
    title: "Site E-commerce : Mecamot",
    subtitle: "Développement d'une site web e-commerce complet",
    svgs: [
      <CodingAppsWebsitesDatabase key="1" />,
      <ShoppingShippingCart key="2" />,
      <EcologyOrganicSunGrowth key="3" />,
    ],
    isMobileCarousel: false,
    images: [
      { src: "/images/projects/ecom/main_page.png", alt: "Aperçu du projet" },
      { src: "/images/projects/ecom/products.png", alt: "Aperçu du projet" },
      {
        src: "/images/projects/ecom/product_detail.png",
        alt: "Aperçu du projet",
      },
      { src: "/images/projects/ecom/cart.png", alt: "Aperçu du projet" },
      {
        src: "/images/projects/ecom/backoffice_product.png",
        alt: "Aperçu du projet",
      },
    ],
    description: (
      <>
        <p className="leading-relaxed text-gray-900 mb-4">
          J'ai conçu et développé une <strong>solution e-commerce</strong> pour
          l'entreprise <strong>Mecamot</strong>, spécialisée dans la réparation,
          l'entretien et la vente de <strong>machines de motoculture</strong>.
          Ce site a pour but <strong>d’informer</strong> mais aussi de{" "}
          <strong>mettre en vente</strong> des machines, produits ou pièces
          détachées.
        </p>
        <p className="text-gray-900 mb-4 font-bold">
          <strong>Fonctionnalités du frontend :</strong>
        </p>
        <ul className="mb-4 list-disc pl-5 text-gray-900 space-y-1">
          <li>
            Présentation détaillée de l'entreprise (informations générales,
            horaires d'ouverture, coordonnées).
          </li>
          <li>
            Mise en place d'un catalogue de produits dynamique avec des
            fonctionnalités de recherche et de filtrage.
          </li>
          <li>
            Intégration d'un système d'authentification et d'un panier d'achat.
          </li>
          <li>
            Intégration de Stripe pour un traitement des paiements fiable et
            conforme aux standards de sécurité.
          </li>
        </ul>
        <p className="leading-relaxed text-gray-900 mb-4">
          <strong>Architecture et backend :</strong>
        </p>
        <ul className="mb-4 list-disc pl-5 text-gray-900 space-y-1">
          <li>
            Développement d'un backend basé sur une architecture API REST,
            garantissant la modularité et la scalabilité.
          </li>
          <li>
            Implémentation de routes sécurisées (authentification, autorisation)
            et d'un système de filtration/validation systématique de toutes les
            données entrantes pour prévenir les vulnérabilités.
          </li>
        </ul>
        <p className="leading-relaxed text-gray-900 mb-4">
          <strong>Gestion de contenu (Back-Office) :</strong>
        </p>
        <ul className="list-disc pl-5 text-gray-900 space-y-1">
          <li>
            Création d'un back-office sur mesure pour Mecamot, visant à
            faciliter l'autonomie dans la gestion du site.
          </li>
          <li>
            Outils d'administration pour la gestion complète (Création, Lecture,
            Modification, Suppression) des produits, catégories, utilisateurs et
            commandes.
          </li>
        </ul>
      </>
    ),
    techs: [
      { name: "React.js", icon: "devicon-react-original" },
      { name: "MySQL", icon: "devicon-mysql-original" },
      { name: "Prisma", icon: "devicon-prisma-original" },
      { name: "Express.js", icon: "devicon-express-original" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
      { name: "Stripe", icon: "" },
    ],
  },
  mjustice: {
    title: "Stage 2ème année BUT : Ministère de la Justice",
    subtitle:
      "Développement de sites web internes pour le Ministère de la Justice.",
    svgs: [
      <ComputersDevicesElectronicsLaptop key="1" />,
      <InternetNetworkWww key="2" />,
      <BusinessProductScale key="3" />,
    ],
    isMobileCarousel: false,
    images: [
      {
        src: "/images/projects/mjustice/nouveau_menu.webp",
        alt: "Aperçu de la page de déploiement",
      },
      {
        src: "/images/projects/mjustice/deploiement_colvis.webp",
        alt: "Aperçu de la page de déploiement",
      },
      {
        src: "/images/projects/mjustice/nouveau_graphiques.webp",
        alt: "Aperçu de la page de statistiques",
      },
      {
        src: "/images/projects/mjustice/portail.webp",
        alt: "Portail des sites internes",
      },
      {
        src: "/images/projects/mjustice/scan_principale.webp",
        alt: "Site de gestion des entrées et sorties du matériel",
      },
    ],
    description: (
      <>
        <p className="leading-relaxed text-gray-900 mb-4">
          J'ai effectué un <strong>stage de 8 semaines</strong> au sein du{" "}
          <strong>Ministère de la Justice</strong>, dans le DIT (département
          informatique et télécommunications) durant ma seconde année de BUT.
          J'ai participé au développement d'un <strong>site web interne</strong>{" "}
          visant à améliorer la <strong>gestion des déploiements</strong>.
        </p>
        <p className="leading-relaxed text-gray-900 mb-4">
          J'ai contribué à <strong>optimiser le site</strong> en{" "}
          <strong>refactorisant du code</strong>, en corrigeant un problème
          majeur lié au <strong>chargement des données</strong> et en ajoutant
          de nouvelles fonctionnalités pour améliorer{" "}
          <strong>l'expérience utilisateur</strong>.
        </p>
        <p className="leading-relaxed text-gray-900">
          Par ailleurs, j'ai travaillé sur deux autres sites. Le premier est un{" "}
          <strong>portail</strong> qui regroupe les sites les plus utilisés par
          les membres du département informatique. J'ai ajouté la possibilité
          d'ajouter et de supprimer des raccourcis. Le second permet de{" "}
          <strong>gérer les entrées et sorties du matériel</strong> d'une salle
          de stockage.
        </p>
      </>
    ),
    techs: [
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "MySQL", icon: "devicon-mysql-original" },
      { name: "PHP", icon: "devicon-php-plain" },
      { name: "BootStrap", icon: "devicon-bootstrap-plain" },
    ],
  },
  netlor: {
    title: "Stage 3ème année BUT : Netlor",
    subtitle: "Développement d'une application mobile pour les maître nageurs",
    svgs: [
      <CodingAppsWebsitesMobile key="1" />,
      <MultipleUser key="2" />,
      <TravelWayfindingPoolLadder key="3" />,
    ],
    isMobileCarousel: true,
    images: [
      { src: "/images/projects/netlor/seance.png", alt: "Aperçu du projet" },
      { src: "/images/projects/netlor/abo.png", alt: "Aperçu du projet" },
    ],
    description: (
      <>
        <p className="leading-relaxed text-gray-900 mb-4">
          J'ai effectué un <strong>stage de 14 semaines</strong> au sein de
          l'entreprise <strong>Netlor</strong> durant ma troisième année de BUT.
          J'ai participé au développement d'une{" "}
          <strong>application mobile</strong> visant à aider les{" "}
          <strong>maîtres-nageurs</strong>.
        </p>
        <p className="leading-relaxed text-gray-900 mb-4">
          J'ai développé plusieurs <strong>fonctionnalités clés</strong> :
          l'intégration d'un <strong>calendrier de navigation</strong>, un{" "}
          <strong>système de filtrage des séances</strong>, ainsi qu'un{" "}
          <strong>module de réservation</strong>.
        </p>
        <p className="leading-relaxed text-gray-900">
          Enfin, j'ai <strong>migré l'application</strong> vers une nouvelle API
          plus récente et j'ai mis en place la{" "}
          <strong>synchronisation des données</strong> entre l'ancienne base de
          données <strong>MySQL</strong> (liée à l'API PHP) et la nouvelle base{" "}
          <strong>MongoDB</strong> (connectée à l'API Go).
        </p>
      </>
    ),
    techs: [
      { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "MySQL", icon: "devicon-mysql-original" },
      { name: "PHP", icon: "devicon-php-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Go", icon: "devicon-go-original-wordmark" },
    ],
  },
  projet_tutore: {
    title: "Projet tutoré : Maillage de caméras",
    subtitle:
      "Développement d'un système de maillage de caméras et d'une application mobile.",
    svgs: [
      <TechnologyRobotAiSignal1 key="1" />,
      <CodingAppsWebsitesMobile key="2" />,
      <ComputersDevicesElectronicsWebcam key="3" />,
    ],
    isMobileCarousel: true,
    images: [
      {
        src: "/images/projects/projet_tutore/notification.png",
        alt: "Aperçu du projet",
      },
      {
        src: "/images/projects/projet_tutore/img_notif.png",
        alt: "Aperçu du projet",
      },
      {
        src: "/images/projects/projet_tutore/timeline_map.png",
        alt: "Aperçu du projet",
      },
      {
        src: "/images/projects/projet_tutore/timeline.png",
        alt: "Aperçu du projet",
      },
      {
        src: "/images/projects/projet_tutore/profil.png",
        alt: "Aperçu du projet",
      },
      {
        src: "/images/projects/projet_tutore/cameras.png",
        alt: "Aperçu du projet",
      },
    ],
    description: (
      <>
        <p className="leading-relaxed text-gray-900 mb-4">
          Ce projet tutoré avait pour but de créer un{" "}
          <strong>maillage de caméras</strong> couplé à <strong>de l'IA</strong>{" "}
          afin de <strong>détecter des comportements suspects</strong> et
          envoyer une alerte sur une <strong>application mobile</strong>. L'IA
          serait ensuite entraînée grâce aux réponses des utilisateurs sur les
          situations suspectes.
        </p>
        <p className="leading-relaxed text-gray-900 mb-4">
          Nous étions quatre participants sur ce projet. Je me suis chargé du
          développement de <strong>l’application mobile</strong> ainsi que de la{" "}
          <strong>base de données</strong>. L’application a été réalisée avec{" "}
          <strong>Flutter</strong>, tandis que la base de données a été mise en
          place avec <strong>Supabase</strong>. J’ai également développé
          l’authentification des utilisateurs et la{" "}
          <strong>gestion des alertes</strong>.
        </p>
        <p className="leading-relaxed text-gray-900">
          L’application mobile permettait aux utilisateurs de visualiser les{" "}
          <strong>alertes en temps réel</strong> envoyées par les caméras, de{" "}
          <strong>confirmer ou d’infirmer</strong> les situations suspectes, et
          de consulter <strong>l’historique des alertes</strong> pour un suivi
          complet.
        </p>
      </>
    ),
    techs: [
      { name: "Flutter", icon: "devicon-flutter-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "SupaBase", icon: "devicon-supabase-plain" },
      { name: "Java", icon: "devicon-java-plain" },
    ],
  },
};

export default function ProjectDetail({ projectId, onBack }) {
  const splideRef = useRef(null);
  const detail = projectDetails[projectId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  useEffect(() => {
    if (splideRef.current && detail) {
      let splideOptions = {};

      if (detail.isMobileCarousel) {
        splideOptions = {
          type: "loop",
          perPage: 3,
          perMove: 1,
          gap: "1.5rem",
          padding: "2rem",
          arrows: true,
          pagination: true,
          trimSpace: false,
          focus: "center",
          breakpoints: {
            768: {
              perPage: 1,
              gap: "1rem",
              padding: { left: "5%", right: "5%" },
            },
          },
        };
      } else {
        splideOptions = {
          type: "loop",
          cover: true,
          heightRatio: 0.5,
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
        };
      }

      const splide = new Splide(splideRef.current, splideOptions);
      splide.mount();

      return () => {
        splide.destroy();
      };
    }
  }, [projectId, detail]);

  if (!detail) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-10 text-white">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-majorelle-blue-50 rounded-lg mb-10 cursor-pointer"
        >
          <span>←</span> Retour
        </button>
        <p>Projet non trouvé.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-majorelle-blue-50 rounded-lg mb-10 cursor-pointer border border-transparent hover:border-white/20 transition-all"
      >
        <span>←</span> Retour
      </button>

      <div className="h-[25vh] md:h-[30vh] mb-12 rounded-lg bg-majorelle-blue-50 flex flex-col justify-center items-center text-center px-10 relative overflow-hidden">
        <div
          className="absolute flex flex-row items-center justify-center gap-32 filter opacity-40"
          style={{ filter: "blur(6px)" }}
        >
          {detail.svgs}
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold mb-3 text-burnt-peach-700 relative z-10 text-shadow-custom leading-tight">
          {detail.title}
        </h1>
        <p className="text-lg md:text-xl text-burnt-peach-800 max-w-2xl relative z-10 text-shadow-custom">
          {detail.subtitle}
        </p>
      </div>

      <div className="mb-16 relative">
        <div className="pixelated-blur-left absolute top-0 bottom-0 left-0 z-10 pointer-events-none"></div>
        <div className="pixelated-blur-right absolute top-0 bottom-0 right-0 z-10 pointer-events-none"></div>
        <div ref={splideRef} className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {detail.images.map((img, i) => (
                <li className="splide__slide rounded-lg" key={i}>
                  {detail.isMobileCarousel ? (
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{
                        width: "auto",
                        height: "28rem",
                        objectFit: "contain",
                        margin: "0 auto",
                      }}
                    />
                  ) : (
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2 bg-burnt-peach-50 rounded-lg p-8 md:p-10 shadow-block">
          <h2 className="text-3xl font-semibold text-burnt-peach-700 mb-6 text-shadow-custom">
            Description du projet
          </h2>
          {detail.description}
        </div>

        <div className="bg-burnt-peach-50 rounded-lg p-8 md:p-10 shadow-block h-fit">
          <h2 className="text-3xl font-semibold text-burnt-peach-700 mb-6 text-shadow-custom">
            Stack technique
          </h2>
          <div className="flex flex-wrap gap-4">
            {detail.techs.map((tech) => (
              <div
                key={tech.name}
                className="px-6 py-3 bg-burnt-peach-100 text-burnt-peach-400 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {tech.icon && (
                  <span>
                    <i className={tech.icon}></i>
                  </span>
                )}
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
