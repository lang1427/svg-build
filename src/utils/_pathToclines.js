/** 使用 路径(path) 生成 斜线
 * 
 * @param {number} x1 起始点x的坐标
 * @param {number} y1 起始点y的坐标
 * @param {number} x2 终点x的坐标
 * @param {number} y2 终点y的坐标
 * @param {number} lineNum 斜线的数量()
 * @param {number} lineWidth 线的宽度()
 * @param {number} interval 线与线之间的间隔(default value = 10)
 * @returns 
 */
export const _pathToInclines = function (x1, y1, x2, y2, color, lineNum = 1, lineWidth = 2, interval = 10) {
    let pathEl = `<path d="M${x1} ${y1} L${x1 + lineWidth} ${y1} L${x2 + lineWidth} ${y2} L${x2} ${y2} Z"  fill="${color}"/>`
    if (lineNum === 1) {
        return pathEl
    } else {
        for (let i = 1; i < lineNum; i++) {
            pathEl += `<path d="M${x1 + (i * interval) + (i * lineWidth)} ${y1} L${x1 + (i * interval) + (i * lineWidth) + lineWidth} ${y1} L${x2 + (i * interval) + (i * lineWidth) + lineWidth} ${y2} L${x2 + (i * interval) + (i * lineWidth)} ${y2} Z"  fill="${color}"/>`
        }
        return pathEl
    }
}

export const _pathToInclinesGetshorterFade = function (x1, y1, x2, y2, color, lineNum, shrinkValue, lineWidth = 2, interval = 10, direction = "left") {
    if (direction !== "left" && direction !== "right") return console.error("_pathToInclinesGetshorterFade methods direction params is left or right")
    let pathEl = ``
    if (direction == "right") {
        pathEl = `<path d="M${x1} ${y1} L${x1 + lineWidth} ${y1} L${x2 + lineWidth} ${y2} L${x2} ${y2} Z"  fill="${color}"/>`
    } else {
        pathEl = `<path d="M${x1} ${y1} L${x1 - lineWidth} ${y1} L${x2 - lineWidth} ${y2} L${x2} ${y2} Z"  fill="${color}"/>`
    }
    for (let i = 1; i < lineNum; i++) {
        if (direction == "right") {
            pathEl += `<path d="M${x1 + (i * interval) + (i * lineWidth)} ${y1} L${x1 + (i * interval) + (i * lineWidth) + lineWidth} ${y1} L${(x2 + (i * interval) + (i * lineWidth) + lineWidth) + shrinkValue * i} ${y2 - shrinkValue * i} L${(x2 + (i * interval) + (i * lineWidth)) + shrinkValue * i} ${y2 - shrinkValue * i} Z"  fill="${color}" style="opacity:${(1 - 0.1 * i).toFixed(2)}"/>`
        } else {
            pathEl += `<path d="M${x1 - (i * interval) - (i * lineWidth)} ${y1} L${x1 - (i * interval) - (i * lineWidth) - lineWidth} ${y1} L${(x2 - (i * interval) - (i * lineWidth) - lineWidth) - shrinkValue * i} ${y2 - shrinkValue * i} L${(x2 - (i * interval) - (i * lineWidth)) - shrinkValue * i} ${y2 - shrinkValue * i} Z"  fill="${color}" style="opacity:${(1 - 0.1 * i).toFixed(2)}"/>`
        }
    }
    return pathEl

}
