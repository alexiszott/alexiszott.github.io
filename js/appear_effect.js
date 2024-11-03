import {pop_effect_} from "./projet_pop_effect.js";

gsap.registerPlugin(EaselPlugin);

export function text_appear() {
    gsap.from(".bar", 1.8, {
        scrollTrigger: {
            trigger: '.bar',
            toggleActions: "play none none none",
        },
        delay: 0.25,
        x: 400,
        duration: 5,
        ease: "power4.out",
        stagger: {
            amount: 0.4
        },
        opacity: 0
    })

}

export function project_appear() {
    gsap.killTweensOf(".pop_effect")
    gsap.from(".pop_effect", {
        x: 400,
        duration: 0.75,
        ease: "power4.out",
        stagger: {
            amount: 0.4
        },
        opacity: 0,
        onComplete: pop_effect_
    });
}