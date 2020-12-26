import {Animator} from "./Animator";


export class ScrollAnimator {
    /**
     *
     * @param $scrollableElement - DOM object like div, ul, etc.
     * @param {Object} settings - settings of animator.
     */
    constructor($scrollableElement, settings = {}) {
        console.log("Created scroll animator")
        this.$scrollableElement = $scrollableElement
        this.animatedInMoment = false
        this.funcsOnScrollEnd = []
        this.subscribeOnScrollEnd(()=>{
            console.log("end")
        })

        const animationName = settings.animationName ?? "linear"
        this.animationFunction = Animator().getAnimationFunction(animationName)

        this.animationDuration = settings.animationDuration ?? 600

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
            let piece = currentOffset / difference
            this.$scrollableElement.scrollLeft = start + this.animationFunction(piece) * difference
        }, intervalDelay)

        setTimeout(()=> {
            clearInterval(interval)
            this.$scrollableElement.scrollLeft = end
            this.animatedInMoment = false
            this.#notifyOnScrollEnd()
        }, duration)

    }


}