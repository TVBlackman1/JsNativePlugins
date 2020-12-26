/**
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
        return getDecoratedFunction(funcName)
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
        name: 'paral',
        func: (x) => {
            return Math.sin(2.7*x)*x+x
        },
        maxFuncX: 5
    }

    addMathFunction(quad)
    addMathFunction(easyEasy)
    addMathFunction(linear)
    addMathFunction(mikhailFunc)
    addMathFunction(daniilFunc)
    addMathFunction(paral)

    return {
        getAnimationFunction,
        addMathFunction
    }
}