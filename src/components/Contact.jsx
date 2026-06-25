import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }
    // Simulate API request
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="flex flex-col mb-24 max-w-6xl mx-auto px-4 md:px-6 w-full relative z-10 mt-16 md:mt-24">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-burnt-peach-400 mb-12 md:mb-16">
        Me contacter
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
        {/* Info Column */}
        <div className="lg:col-span-5 bg-burnt-peach-50 p-8 md:p-10 rounded-2xl flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-burnt-peach-700 mb-4">
              Mes coordonnées
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Une opportunité de stage à proposer, un projet à discuter ou
              simplement envie d'échanger ? N'hésitez pas à me contacter. Je
              vous répondrai dans les plus brefs délais.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:alexzott54@gmail.com"
                className="flex items-center gap-4 text-burnt-peach-600 hover:text-burnt-peach-855 transition-colors group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <i className="fa-solid fa-envelope text-lg"></i>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-base font-bold break-all">
                    alexzott54@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-burnt-peach-600">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md shrink-0">
                  <i className="fa-solid fa-location-dot text-lg"></i>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Localisation
                  </p>
                  <p className="text-base font-bold text-gray-800">
                    Troyes / Nancy, France
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-8 border-t border-burnt-peach-200/50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 text-left">
              Retrouvez-moi sur
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/alexiszott/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-burnt-peach-100 rounded-xl flex items-center justify-center shadow-md text-burnt-peach-600 transition-colors"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>
              <a
                href="https://github.com/alexiszott"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-burnt-peach-100 rounded-xl flex items-center justify-center shadow-md text-burnt-peach-600 transition-colors"
                title="GitHub"
              >
                <i className="fa-brands fa-github text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-neutral-900 border border-burnt-peach-400/20 p-8 md:p-10 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-burnt-peach-400/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-majorelle-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10 w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-left">
                <label className="block text-xs font-semibold text-burnt-peach-300 uppercase tracking-wider mb-2 whitespace-nowrap">
                  Nom et prénom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nom et prénom"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-burnt-peach-400 text-white rounded-xl p-3 text-sm focus:outline-none transition-colors"
                />
              </div>
              <div className="text-left">
                <label className="block text-xs font-semibold text-burnt-peach-300 uppercase tracking-wider mb-2 whitespace-nowrap">
                  Adresse email
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-burnt-peach-400 text-white rounded-xl p-3 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-burnt-peach-300 uppercase tracking-wider mb-2 whitespace-nowrap">
                Votre message
              </label>
              <textarea
                required
                rows="5"
                placeholder="Votre message ici ..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-burnt-peach-400 text-white rounded-xl p-3 text-sm focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-burnt-peach-400 hover:bg-burnt-peach-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-md border-0"
            >
              {status === "sending" ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Envoi en cours...
                </>
              ) : status === "success" ? (
                <>
                  <i className="fa-solid fa-check"></i>
                  Message envoyé !
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>
                  Envoyer le message
                </>
              )}
            </button>

            {status === "success" && (
              <p className="text-xs text-green-400 mt-2 text-center font-medium">
                Merci ! Votre message a bien été envoyé.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400 mt-2 text-center font-medium">
                Veuillez remplir tous les champs du formulaire.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
