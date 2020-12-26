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
        this.subscribeOnScrollEnd(()=>{
            console.log("end")
        })
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
        this.animate(difference)
    }

    animate(difference) {
        const duration = 600
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
            this.$scrollableElement.scrollLeft = start + this.easyEasy(piece) * difference
            // console.log(this.$scrollableElement.scrollLeft)
        }, intervalDelay)

        setTimeout(()=> {
            clearInterval(interval)
            this.$scrollableElement.scrollLeft = end
            this.animatedInMoment = false
            this.#notifyOnScrollEnd()
        }, duration)

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

    /**
     *
     * @param {number} piece values: [0, 1], float
     * @returns {number}
     */
    easyEasy(piece) {
        const func = (x) => {
            return 1 / (1 + Math.pow(2.7, 5-x))
        }
        const maxFuncX = 10
        const maxFuncY = func(maxFuncX)
        const x = piece * maxFuncX
        return func(x) / maxFuncY // 0 -- 1
    }


}