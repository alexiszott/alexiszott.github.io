import React, { useState } from "react";

export default function Footer() {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <footer className="w-full bg-neutral-950 py-8 px-4 border-t border-neutral-900 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
        <div>
          <p>© {new Date().getFullYear()} Alexis ZOTT. Tous droits réservés.</p>
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => setShowLegal(true)}
            className="hover:text-burnt-peach-400 transition-colors cursor-pointer border-0 bg-transparent p-0 font-medium text-xs text-gray-500"
          >
            Mentions légales
          </button>
          <a
            href="https://github.com/alexiszott/alexiszott.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-burnt-peach-400 transition-colors"
          >
            Code source
          </a>
        </div>
      </div>

      {/* Simple Legal Modal */}
      {showLegal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setShowLegal(false)}
          />
          <div className="relative bg-neutral-900 border border-burnt-peach-400/20 text-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full z-10 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-burnt-peach-400">
                Mentions Légales
              </h3>
              <button
                onClick={() => setShowLegal(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-1 rounded-full hover:bg-neutral-800"
              >
                <i className="fa-solid fa-xmark text-lg leading-none"></i>
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed text-left font-sans">
              <div>
                <h4 className="font-bold text-white mb-1">Éditeur du site</h4>
                <p>Alexis ZOTT, Étudiant ingénieur en informatique.</p>
                <p>Email : alexzott54@gmail.com</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Hébergement</h4>
                <p>Ce site est hébergé par GitHub Pages (GitHub Inc.).</p>
                <p>Adresse : GitHub, Inc. 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Propriété intellectuelle</h4>
                <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Données personnelles</h4>
                <p>Ce site ne collecte aucune donnée personnelle autre que celle envoyée volontairement par le biais du formulaire de contact.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
