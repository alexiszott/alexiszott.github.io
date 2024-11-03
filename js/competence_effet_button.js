gsap.registerPlugin(EaselPlugin);

export function setAnimCompetence(){
    let allCompetences = document.getElementsByClassName("competence");

    for (let i = 0; i < allCompetences.length; i++) {
        let colorSelect = allCompetences[i].querySelector(".color-select");

        allCompetences[i].addEventListener('mouseover', function () {
            isSelected(allCompetences[i], 1.1, colorSelect);
        });
        allCompetences[i].addEventListener('mouseout', function () {
            unSelected(allCompetences[i], colorSelect);
        });
    }
}

function isSelected(elem, scale, color) {
    gsap.to(
        color, {
            scale: 10,
            duration: 0.75,
            ease: "power4.out",
            overwrite: "auto"
        }
    );
}

function unSelected(elem, color) {
    gsap.to(
        color, {
            scale: 1,
            duration: 0.5,
            ease: "power4.in",
            overwrite: "auto"
        }
    );
}