import { Slider } from './slider/Slider'

const slider = new Slider({
    selector: '.slider',
    // numberOfStartElement: 0,
    animationName: 'easy-easy',
    animationDuration: 400,
    autoScroll: true,
    autoScrollDelay: 2400
})
window.s = slider