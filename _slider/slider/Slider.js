const scrollTo = require('scroll-to')
const { ScrollAnimator } = require('./ScrollAnimator')

export class Slider {
    constructor() {
        console.log('OnCreate')
        this.$el = document.querySelector('.slider')
        this.$content = this.$el.querySelector('.slider-content')
        this.$contentElems = this.$content.querySelectorAll('.slider-content-li')
        this.scrollAnimator = new ScrollAnimator(this.$content)
        // console.log(this.$el)
        this.index = 0
        this.addScrollHandler()

    }

    addScrollHandler() {
        this.$content.addEventListener('mousewheel', (event) => {
            // if (this.$content.doScroll)
            //     this.$content.doScroll(event.wheelDelta>0?"left":"right");
            // else if ((event.wheelDelta || event.detail) > 0)
            //     this.$content.scrollLeft -= 10;
            // else
            //     this.$content.scrollLeft += 10;

            // 1 - next, -1 - previous
            const shiftContentCoefficient = event.wheelDelta < 0 ? 1 : -1
            console.log(shiftContentCoefficient)
            return false;
        })
    }

    /**
     * go to element in <li> of <ul> in content.
     * @param {number} newIndex - index of element. Starts with 0
     */
    goToContentWithIndex(newIndex) {
        const currentContentElement = this.$contentElems[this.index]
        const leftOfCurrent = currentContentElement.getBoundingClientRect().left

        const newContentElement = this.$contentElems[newIndex]
        const leftOfNewElement = newContentElement.getBoundingClientRect().left

        const xShift = leftOfNewElement - leftOfCurrent
        console.log(xShift)
        this.scrollAnimator.scrollShift(xShift)

        this.index = newIndex
    }
}