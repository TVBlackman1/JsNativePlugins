const { ScrollAnimator } = require('./ScrollAnimator')

const defaultAutoScrollDelay = 2400
const defaultAutoScroll = false

export class Slider {
    /**
     *
     * @param {object} settings
     * settings can have following parameters:
     * -> {String} selector - required parameter. It is html selector for slider.
     * -> {String} animationName - name of animations. List of available in comments at Animator.js
     * -> {number} animationDuration - duration of animation. Gets time in ms.
     * -> {boolean} autoScroll - true, if auto scroll is on.
     * -> {number} autoScrollDelay - delay before auto scroll.
     */
    constructor(settings= {}) {
        this.$el = document.querySelector(settings.selector)

        this.$content = this.$el.querySelector('.slider-content')
        this.$contentElems = this.$content.querySelectorAll('.slider-content-li')

        this.$nav = this.$el.querySelector('.slider-nav')
        this.$navElems = this.$nav.querySelectorAll('.slider-nav-elem')

        this.scrollAnimator = new ScrollAnimator(this.$content, {
            animationName: settings.animationName,
            animationDuration: settings.animationDuration
        })

        this.scrollImmediately = new ScrollAnimator(this.$content, {
            animationDuration: 0
        })

        this.autoScrollDelay = settings.autoScrollDelay ?? defaultAutoScrollDelay
        this.autoScroll = settings.autoScroll ?? defaultAutoScroll

        this.index = 0

        this.#setup()
    }

    #addScrollHandler() {
        this.$content.addEventListener('mousewheel', (event) => {
            // 1 - next, -1 - previous
            const shiftContentCoefficient = event.wheelDelta < 0 ? 1 : -1

            this.goToContentWithIndex(this.index + shiftContentCoefficient)
            return false;
        })
    }

    #addClickHandler() {
        this.$navElems.forEach(($el, index) => {
            $el.addEventListener('click', (event) => {
                this.goToContentWithIndex(index)
                return false;
            })
        })
    }

    #addAutoScroll() {
        this.autoScrollInterval = setInterval(()=>{
            this.goToContentWithIndex(this.index+1)
        }, this.autoScrollDelay)
    }

    /**
     * Some setup for slider. It adds listener handlers and auto scroll.
     */

    #setup() {
        // this.goToContentWithIndex = this.goToContentWithIndex.bind(this)
        this.#addScrollHandler()
        this.#addClickHandler()
        if (this.autoScroll) {
            this.#addAutoScroll()
        }
    }

    /**
     * slider will shows element <li> of <ul> with new index.
     *
     * @param {number} newIndex - index of element. Starts with 0.
     */
    goToContentWithIndex(newIndex) {

        if(newIndex < 0) {
            newIndex =  this.$contentElems.length - 1
        } else if (newIndex >= this.$contentElems.length) {
            newIndex = 0
        }

        if(this.scrollAnimator.animated)
            return

        const currentContentElement = this.$contentElems[this.index]
        const leftOfCurrent = currentContentElement.getBoundingClientRect().left

        const newContentElement = this.$contentElems[newIndex]
        const leftOfNewElement = newContentElement.getBoundingClientRect().left

        const xShift = leftOfNewElement - leftOfCurrent

        this.scrollAnimator.scrollShift(xShift)

        this.index = newIndex
        this.#updateNavigationCurrentView()
    }

    #updateNavigationCurrentView() {
        this.$navElems.forEach(($el) => {
            $el.classList.remove('active')
        })
        this.$navElems[this.index].classList.add('active')
    }
}