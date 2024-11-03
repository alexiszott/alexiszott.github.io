gsap.registerPlugin(EaselPlugin);
import SplitType from 'https://unpkg.com/split-type?module';


export function title_effect() {
    const split = new SplitType('#title');

    gsap.to('.char', {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.1,
    })
}
