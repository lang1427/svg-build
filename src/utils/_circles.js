/** 画小圆点
 * 
 * @param {number} cx 圆心x的坐标
 * @param {number} cy 圆心y的坐标
 * @param {number} r 圆半径
 * @param {string} color 圆的颜色
 * @param {number} cNum 圆的数量
 * @param {number} interval 圆于圆之间的间隔
 * @returns 
 */
export const _circles = (cx, cy, r, color, cNum = 1, interval = 6) => {
    let circleEl = `<circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="2" fill="${color}"/>`
    if (cNum === 1) {
        return circleEl
    }
    else {
        for (let i = 1; i < cNum; i++) {
            circleEl += `<circle cx="${cx + (i * interval) + (2 * r * i)}" cy="${cy}" r="${r}" stroke-width="2" fill="${color}"/>`
        }
        return circleEl
    }
}