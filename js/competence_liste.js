import {projects} from "./projects.js";
import {pop_effect_} from "./projet_pop_effect.js";
import {project_appear} from "./appear_effect.js";

let allCompetences = document.getElementsByClassName("competence");

export function setOpenProjectsList() {
    //Pour toutes les compétences on ajoute un EVT click
    for (let i = 0; i < allCompetences.length; i++) {

        //On récupère les domaines de la compétences (tags)
        const domain = allCompetences[i].getAttribute('data-domain');

        //On filtre les projets et on recupère ceux qui correspondent à notre domaine
        const filteredProjects = projects.filter(projects => projects.domains.includes(domain));

        setNumberProjects(allCompetences[i], filteredProjects);

        allCompetences[i].addEventListener('click', function () {
            openModalList(allCompetences[i], filteredProjects);
        });

    }
}

function openModalList(allCompetences, filteredProjects) {
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
            <a class="text button-selection my-auto d-flex flex-row align-items-center justify-content-center"><i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    `;
    }

    //On affiche la liste des projets
    document.getElementById('modal-list-body').innerHTML = html;

    //On change le titre du modal
    document.getElementById('modal-list-lLabel').textContent = allCompetences.getAttribute('data-title');

    let modalElement = new bootstrap.Modal(document.getElementById('modal-list'));
    modalElement.show();
    pop_effect_();
}

function setNumberProjects(allCompetences, filteredProjects) {

    let paragraph = allCompetences.querySelector('.ontop p');

    if (filteredProjects.length > 1) {
        paragraph.innerHTML = filteredProjects.length + " projets";
    } else {
        paragraph.innerHTML = filteredProjects.length + " projet";
    }
}

