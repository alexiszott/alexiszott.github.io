import {setAnimCompetence} from "./competence_effet_button.js";
import {pop_effect_} from "./projet_pop_effect.js";
import {title_effect} from "./split_title_effect.js";
import {text_appear} from "./appear_effect.js";
import {comp_appear} from "./competence_appear_effect.js";
import {initTileMain} from "./tile_main.js";
import {initTileProjet} from "./tile_projet.js";
import {setOpenProjectsListV2} from "./competence_liste_v2.js";

document.addEventListener("DOMContentLoaded", function () {
    setAnimCompetence();
    pop_effect_();
    title_effect();
    text_appear();
    comp_appear();
    initTileMain().then(r =>
        "");
    initTileProjet().then(r => "");
    setOpenProjectsListV2();
});
