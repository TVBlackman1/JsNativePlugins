import { Slider } from './slider/Slider'

const slider = new Slider({
    selector: '.slider',
    animationName: 'easy-easy',
    animationDuration: 300,
    autoScroll: true,
    autoScrollDelay: 2400,
})
window.s = slider

const $effected = document.querySelector('.effected')

slider.subscribeOnScrollEnd((index) => {
    $effected.style.backgroundImage = slider.$contentElems[slider.index].style.backgroundImage

})

slider.forcedNotify()