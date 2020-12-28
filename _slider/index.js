import { Slider } from './slider/Slider'

const slider = new Slider({
    selector: '.slider',
    animationName: 'easy-easy',
    animationDuration: 400,
    autoScroll: true,
    autoScrollDelay: 2400
})
window.s = slider