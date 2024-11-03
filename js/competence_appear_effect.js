gsap.registerPlugin(EaselPlugin);
import SplitType from 'https://unpkg.com/split-type?module';

export function comp_appear() {

    gsap.from(".competence-container", 1.8, {
        scrollTrigger: {
            trigger: '.competence-container',
            toggleActions: "play none none none",
        },
        delay: 0.15,
        duration: 1.5,
        ease: "bounce.out",
        stagger: {
            amount: 0.4
        },
        opacity: 0,
        scale: 0
    })

}