gsap.registerPlugin(EaselPlugin);

export function pop_effect_() {
    let allPop = document.getElementsByClassName("pop_effect");

    for (let i = 0; i < allPop.length; i++) {

        allPop[i].addEventListener('mouseover', function () {
            isSelected(allPop[i], 1.1);
        });

        allPop[i].addEventListener('mouseout', function () {
            unSelected(allPop[i]);
        });
    }
}

function isSelected(elem, scale) {
    gsap.killTweensOf(elem)
    gsap.to(
        elem, {
            scale: scale,
            duration: 0.5,
            ease: "power4.out",
        }
    );
}

function unSelected(elem) {
    gsap.killTweensOf(elem)
    gsap.to(
        elem, {
            scale: 1,
            duration: 0.25,
            ease: "power4.in",
        }
    );
}

