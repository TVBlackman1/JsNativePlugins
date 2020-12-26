export class ScrollAnimator {
    /**
     *
     * @param $scrollableElement
     */
    constructor($scrollableElement) {
        console.log("Created scroll animator")
        this.$scrollableElement = $scrollableElement
        this.animatedInMoment = false
        this.funcsOnScrollEnd = []
    }

    get animated() {
        return this.animatedInMoment
    }

    subscribeOnScrollEnd(func) {
        this.funcsOnScrollEnd.add(func)
    }

    #notifyOnScrollEnd() {
        this.funcsOnScrollEnd.forEach( (func) => {
            func()
        })
    }


    scrollShift(difference) {
        if(difference === 0)
            return
        // time in ms
        const duration = 400
        const intervalDelay = 15
        const times = duration / intervalDelay
        this.animatedInMoment = true

        const start = this.$scrollableElement.scrollLeft
        const end = start + difference
        const dx = difference / times

        const interval = setInterval(()=> {
            this.$scrollableElement.scrollLeft += dx
        }, intervalDelay)

        new Promise(() => {
            setTimeout(()=> {
                clearInterval(interval)
                this.$scrollableElement.scrollLeft = end
                this.animatedInMoment = false
            }, duration)
        }).then(() => {
            this.#notifyOnScrollEnd()
        })
    }
}