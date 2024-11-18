import {projects} from "./projects.js";
import {project_appear} from "./appear_effect.js";

let allTiles = document.getElementsByClassName("tile-face-projet");

export function setOpenProjectsListV2() {

    //Pour toutes les compétences on ajoute un EVT click
    for (let i = 0; i < allTiles.length; i++) {

        //On récupère les domaines de la compétences (tags)
        const domain = allTiles[i].getAttribute('data-domain');

        //On filtre les projets et on recupère ceux qui correspondent à notre domaine
        const filteredProjects = projects.filter(projects => projects.domains.includes(domain));
        
        allTiles[i].addEventListener('click', function () {
            openModalList(allTiles[i], filteredProjects);
        });

    }
}

function openModalList(allTiles, filteredProjects) {
    let html = "";

    //On recupère les informations pour afficher la liste des projets
    for (let i = 0; i < filteredProjects.length; i++) {
        const title = filteredProjects[i].title;
        const desc = filteredProjects[i].description;
        const link = filteredProjects[i].link;

        html += `
      <div class="card mb-3 round-corner card-style pop_effect" onclick="window.location.href='${link}'">
        <div class="card-body d-flex flex-row justify-content-between">
            <div class="d-flex flex-column w-75">
                <h5 class="card-title text fs-4">${title}</h5>
                <p class="card-text text">${desc}</p>
            </div>
        </div>
      </div>
    `;
    }

    //On affiche la liste des projets
    document.getElementById('modal-list-body').innerHTML = html;

    let modalElement = new bootstrap.Modal(document.getElementById('modal-list'));
    project_appear()
    modalElement.show();
}