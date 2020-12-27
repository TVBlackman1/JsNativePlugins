import {Animator} from "./Animator";

const defaultAnimationName = 'linear'
const defaultAnimationDuration = 600

export class ScrollAnimator {
    /**
     *
     * @param $scrollableElement - DOM object like div, ul, etc.
     * @param {Object} settings - settings of animator.
     */
    constructor($scrollableElement, settings = {}) {
        this.$scrollableElement = $scrollableElement
        this.animatedInMoment = false
        this.funcsOnScrollEnd = []
        this.subscribeOnScrollEnd(()=>{
            console.log("end")
        })

        const animationName = settings.animationName ?? defaultAnimationName
        this.animationFunction = Animator().getAnimationFunction(animationName)
        if (!this.animationFunction) {
            // name not exist in animator
            this.animationFunction = Animator().getAnimationFunction(defaultAnimationName)
        }

        this.animationDuration = settings.animationDuration ?? defaultAnimationDuration

    }

    get animated() {
        return this.animatedInMoment
    }

    subscribeOnScrollEnd(func) {
        this.funcsOnScrollEnd.push(func)
    }

    #notifyOnScrollEnd() {
        this.funcsOnScrollEnd.forEach( (func) => {
            func()
        })
    }


    scrollShift(difference) {
        if(this.animated || difference === 0)
            return
        this.animateShift(difference)
    }

    animateShift(difference) {
        const duration = this.animationDuration
        const intervalDelay = 10
        const times = duration / intervalDelay
        this.animatedInMoment = true

        const start = this.$scrollableElement.scrollLeft
        const end = start + difference
        const linearDx = difference / times
        let currentOffset = 0

        const interval = setInterval(()=> {
            currentOffset += linearDx
            let piece = currentOffset / difference // values from 0 to 1
            let relativePosCoefficient = this.animationFunction(piece) // values from 0 to 1
            this.$scrollableElement.scrollLeft = start + relativePosCoefficient * difference
        }, intervalDelay)

        setTimeout(()=> {
            clearInterval(interval)
            this.$scrollableElement.scrollLeft = end
            this.animatedInMoment = false
            this.#notifyOnScrollEnd()
        }, duration)

    }


}