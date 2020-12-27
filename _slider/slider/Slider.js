const { ScrollAnimator } = require('./ScrollAnimator')

export class Slider {
    /**
     *
     * @param {object} settings
     */
    constructor(settings= {}) {
        this.$el = document.querySelector(settings.selector)

        this.$content = this.$el.querySelector('.slider-content')
        this.$contentElems = this.$content.querySelectorAll('.slider-content-li')

        this.$menu = this.$el.querySelector('.slider-menu')
        this.$menuElems = this.$menu.querySelectorAll('.slider-menu-elem')

        this.scrollAnimator = new ScrollAnimator(this.$content, {
            animationName: settings.animationName,
            animationDuration: settings.animationDuration
        })

        this.scrollImmediately = new ScrollAnimator(this.$content, {
            animationDuration: 0
        })

        this.index = 0
        this.index = settings.numberOfStartElement ?? 0

        this.#setup()
    }

    addScrollHandler() {
        this.$content.addEventListener('mousewheel', (event) => {
            // 1 - next, -1 - previous
            const shiftContentCoefficient = event.wheelDelta < 0 ? 1 : -1

            this.goToContentWithIndex(this.index + shiftContentCoefficient)
            return false;
        })
    }

    #setup() {
        this.addScrollHandler()
    }

    /**
     * go to element in <li> of <ul> in content.
     * @param {number} newIndex - index of element. Starts with 0
     */
    goToContentWithIndex(newIndex) {
        if(newIndex < 0 || newIndex >= this.$contentElems.length)
            return

        if(this.scrollAnimator.animated)
            return
        const currentContentElement = this.$contentElems[this.index]
        const leftOfCurrent = currentContentElement.getBoundingClientRect().left

        const newContentElement = this.$contentElems[newIndex]
        const leftOfNewElement = newContentElement.getBoundingClientRect().left

        const xShift = leftOfNewElement - leftOfCurrent

        this.scrollAnimator.scrollShift(xShift)

        this.index = newIndex
        this.updateMenuCurrentView()
    }

    updateMenuCurrentView() {
        this.$menuElems.forEach(($el) => {
            $el.classList.remove('active')
        })
        this.$menuElems[this.index].classList.add('active')
    }
}