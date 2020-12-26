export const Animator = ()=> {
    function quad(piece) {
        const func = (x) => {
            return Math.pow(x, 5)
        }
        const maxFuncX = 15
        const maxFuncY = func(maxFuncX)
        const x = piece * maxFuncX
        return func(x) / maxFuncY // 0 -- 1
    }

    function decorate() {

    }
}