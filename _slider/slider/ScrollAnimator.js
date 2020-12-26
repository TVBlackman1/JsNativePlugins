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
        if(this.animated || difference === 0)
            return
        this.animate(difference)
        // time in ms
        // const duration = 400
        // const intervalDelay = 15
        // const times = duration / intervalDelay
        // this.animatedInMoment = true
        //
        // const start = this.$scrollableElement.scrollLeft
        // const end = start + difference
        // const dx = difference / times
        //
        // const interval = setInterval(()=> {
        //     this.$scrollableElement.scrollLeft += dx
        // }, intervalDelay)
        //
        // new Promise(() => {
        //     setTimeout(()=> {
        //         clearInterval(interval)
        //         this.$scrollableElement.scrollLeft = end
        //         this.animatedInMoment = false
        //     }, duration)
        // }).then(() => {
        //     this.#notifyOnScrollEnd()
        // })
    }

    animate(difference) {
        const duration = 2400
        const intervalDelay = 15
        const times = duration / intervalDelay
        this.animatedInMoment = true

        const start = this.$scrollableElement.scrollLeft
        const end = start + difference
        const linearDx = difference / times
        let currentOffset = 0

        const interval = setInterval(()=> {
            currentOffset += linearDx
            let piece = currentOffset / difference
            this.$scrollableElement.scrollLeft = start + this.quad(piece) * difference
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

    /**
     *
     * @param {number} piece values: [0, 1], float
     * @returns {number}
     */
    quad(piece) {
        const func = (x) => {
            return Math.pow(x, 5)
        }
        const maxFuncX = 15
        const maxFuncY = func(maxFuncX)
        const x = piece * maxFuncX
        return func(x) / maxFuncY // 0 -- 1
    }


}