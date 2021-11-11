import { isArray, isNumber } from 'methods-util'
export const padding_format = (padding) => {
    if (isArray(padding)) {
        if (padding.length == 1) {
            console.warn('padding params if number[] length = 1,place number type')
            return [padding[0], padding[0], padding[0], padding[0]]
        } else if (padding.length == 2) {
            return [padding[0], padding[1], padding[0], padding[1]]
        } else if (padding.length == 3) {
            return [padding[0], padding[1], padding[2], padding[1]]
        }else if (padding.length == 4){
            return padding
        }else{
            return console.error('padding params number[] length !> 4 and < 0')
        }
    } else if (isNumber(padding)) {
        return [padding, padding, padding, padding]
    } else {
        return console.error('padding params is a number or number[]')
    }
}