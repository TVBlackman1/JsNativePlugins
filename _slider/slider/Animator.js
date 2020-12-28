/**
 *
 * Animator has following animation names:
 * -> easy-easy
 * -> quad
 * -> linear
 * -> mikhail-func
 * -> daniil-func
 * -> paral-func
 * -> first-func
 * -> lags-func
 * -> andrey-func
 * -> kiril-func
 *
 * @returns {{getAnimationFunction: (function(*=): function(*): *)}}
 * @constructor
 */
export const Animator = () => {

    /*

    after it will be: {
        func-name-1: {
            func: (x) => (x**2)
            maxFuncX: any number
        },
        func-name-2: {
            func: (x) => (x**3)
            maxFuncX: any number
        },
        ....
        etc
    }

    whats mean maxFuncX and func -> see comments of object structure below.

     */
    const mathFunctionObjects = {}


    function addMathFunction(mathFunctionObject) {
        const func = mathFunctionObject.func
        const maxFuncX = mathFunctionObject.maxFuncX
        mathFunctionObjects[mathFunctionObject.name] = {func, maxFuncX}
    }

    function getAnimationFunction(funcName) {
        try {
            return getDecoratedFunction(funcName)
        } catch (e) {
            // name not exist in animator
            console.log("Not correct name of animation.")
            return null
        }
    }
    getAnimationFunction = getAnimationFunction.bind(this)


    function getDecoratedFunction(funcName) {
        const currentFunctionObject = mathFunctionObjects[funcName]
        const func = currentFunctionObject.func
        const maxFuncX = currentFunctionObject.maxFuncX

        const maxFuncY = func(maxFuncX)

        return (piece) => {
            // piece - values from 0 to 1
            const x = piece * maxFuncX
            return func(x) / maxFuncY // values from 0 to 1
        }
    }

    /*

    Objects of math functions have structure:
     -> name - string name, unique id for every function. The can get function by its name.
     -> func - math function of 1 argument 'x'. It returns 'y'. Function must follow the next rule:
               f(x2) > f(0), x2 - rightmost value of the considered scope of the given function definition.
     -> maxFuncX - the rightmost value of the considered scope of the given function definition.

     */

    const easyEasy = {
        name: 'easy-easy',
        func: (x) => {
            return 1 / (1 + Math.pow(2.7, 5-x))
        },
        maxFuncX: 10
    }

    const quad = {
        name: 'quad',
        func: (x) => {
            return Math.pow(x, 5)
        },
        maxFuncX: 15
    }

    const linear = {
        name: 'linear',
        func: (x) => {
            return x
        },
        maxFuncX: 15
    }

    const mikhailFunc = {
        name: 'mikhail-func',
        func: (x) => {
            return Math.atan(x-2)*x**2/3*4
        },
        maxFuncX: 4
    }

    const daniilFunc = {
        name: 'daniil-func',
        func: (x) => {
            x -= 20
            return (2.7 + Math.sin(2.7*x)/x) * 2.7**2*(2.7/(2.7 + Math.pow(2.7, -x*2.7)))
        },
        maxFuncX: 35
    }

    const paral = {
        name: 'paral-func',
        func: (x) => {
            return Math.sin(2.7*x)*x+x
        },
        maxFuncX: 5
    }

    const first = {
        name: 'first-func',
        func: (x) => {
            x-=4
            return Math.pow(1+1/(Math.pow(2.17,x)), Math.pow(2.17, x)) - 1
        },
        maxFuncX: 8
    }

    const lags = {
        name: 'lags-func',
        func: (x) => {
            const a = Math.sin(x/12) + 0.99
            let b = 12 * a / Math.abs(a)
            b += 20*Math.log(x) + Math.sign(Math.sin(x))

            return b
        },
        maxFuncX: 300
    }

    const andrey = {
        name: 'andrey-func',
        func: (x) => {
            x+=0.1
            return 1/x/Math.cos(Math.round(x))+Math.sqrt(Math.abs(x))
        },
        maxFuncX: 100
    }

    const kiril = {
        name: 'kiril-func',
        func: (x) => {
            return -(Math.cos(Math.PI*x)-1)/2
        },
        maxFuncX: 1
    }


    addMathFunction(quad)
    addMathFunction(easyEasy)
    addMathFunction(linear)
    addMathFunction(mikhailFunc)
    addMathFunction(daniilFunc)
    addMathFunction(paral)
    addMathFunction(first)
    addMathFunction(lags)
    addMathFunction(andrey)
    addMathFunction(kiril)

    return {
        getAnimationFunction,
        addMathFunction
    }
}