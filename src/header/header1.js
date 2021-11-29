import { isObj } from 'methods-util'

import default_conf from "../conf/default_conf"
import { padding_format } from '../utils/padding_format'
import { verify_textAlign, verify_verticalAlign } from '../utils/param_verify'
import { px_width } from "../utils/px_width"
import { _text, _textStyle } from '../utils/_text'
import { _pathToInclinesGetshorterFade } from '../utils/_pathToclines'


const header1 = (dom, opt = {}) => {
    const vdom = document.querySelector(dom)

    let _opt = {
        width: opt.width || vdom.offsetWidth,
        height: opt.height || vdom.offsetHeight,
        padding: (opt.padding || opt.padding == 0) ? padding_format(opt.padding) : [20, 0, 10, 0],    // 间距
        color: opt.color || default_conf.color,
        backgroundColor: opt.backgroundColor || default_conf.backgroundColor
    }

    let title = (isObj(opt.title) ? opt.title.text : opt.title) || ''
    let textWidth = opt.title.width || Math.floor(_opt.width / 3)
    let textLeft_x = (_opt.width - textWidth) / 2 + _opt.padding[3]
    let textRight_x = _opt.width - ((_opt.width - textWidth) / 2) - _opt.padding[1]
    let fontSize = opt.title.fontSize || 28
    let letterSpacing = opt.title.letterSpacing || 0

    const _textX = function () {
        let textAlign = verify_textAlign(opt.title.textAlign || 'center')
        let titleWidth = px_width(title, `normal ${fontSize}px Microsoft YaHei`) + (title.length - 1) * letterSpacing
        let titleBoxWidth = textRight_x - textLeft_x
        let x = 0
        switch (textAlign) {
            case "left":
                x = textLeft_x
                break;
            case "center":
                x = textLeft_x + titleBoxWidth / 2 - titleWidth / 2
                break;
            case "right":
                x = textRight_x - titleWidth
                break;
        }
        return x
    }

    const _textY = function () {
        let verticalAlign = verify_verticalAlign(opt.title.verticalAlign || "middle")
        let titleHeight = parseInt((1.33 * fontSize).toFixed(2))
        let titleBoxHeight = _opt.height - (_opt.padding[0] + _opt.padding[2])
        let text_baseline = titleHeight / 2 - fontSize / 2
        let y = 0
        switch (verticalAlign) {
            case "top":
                y = _opt.padding[0] + titleHeight - text_baseline * 2
                break;
            case "middle":
                y = _opt.padding[0] + titleBoxHeight / 2 + titleHeight / 2 - text_baseline * 2
                break;
            case "bottom":
                y = _opt.height - (_opt.padding[2] + text_baseline)
                break;
        }
        return y
    }

    const text = _text({
        text: title,
        width: textWidth,
        x: opt.title.x || _textX(),
        y: opt.title.y || _textY(),
        color: opt.title.color ? opt.title.color : _opt.color,
        fontSize,
        letterSpacing,
    })

    const bilateral_decorator = () => {
        let pathSvg = ``
        let leftPath = [
            { x: _opt.padding[3], y: _opt.padding[0] },
            { x: _opt.padding[3] + Math.floor(_opt.width / 37), y: _opt.padding[0] },
            { x: _opt.padding[3] + Math.floor(_opt.width / 28.46), y: _opt.padding[0] + Math.floor(_opt.height / 4.5) },
            { x: _opt.padding[3] + Math.floor(_opt.width / 13.7), y: _opt.padding[0] + Math.floor(_opt.height / 4.5) },
            { x: _opt.padding[3] + Math.floor(_opt.width / 12.76), y: _opt.padding[0] + Math.floor(_opt.height / 3) },
            { x: _opt.padding[3] + Math.floor(_opt.width / 61.67), y: _opt.padding[0] + Math.floor(_opt.height / 3) }
        ]
        let rightPath = [
            { x: _opt.width - _opt.padding[1], y: _opt.padding[0] },
            { x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 37), y: _opt.padding[0] },
            { x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 28.46), y: _opt.padding[0] + Math.floor(_opt.height / 4.5) },
            { x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 13.7), y: _opt.padding[0] + Math.floor(_opt.height / 4.5) },
            { x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 12.76), y: _opt.padding[0] + Math.floor(_opt.height / 3) },
            { x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 61.67), y: _opt.padding[0] + Math.floor(_opt.height / 3) }
        ]

        let left_d = ``, right_d = ``;
        for (let i = 0; i < leftPath.length; i++) {
            if (i == 0) {
                left_d += `M${leftPath[i].x} ${leftPath[i].y}`
                right_d += `M${rightPath[i].x} ${rightPath[i].y}`
                continue
            }
            left_d += ` L${leftPath[i].x} ${leftPath[i].y}`
            right_d += ` L${rightPath[i].x} ${rightPath[i].y}`
        }
        left_d += ` Z`
        right_d += ` Z`

        pathSvg += `       
                    <path stroke="${_opt.color}" stroke-width="2" d="${left_d}"></path>
                    <path stroke="${_opt.color}" stroke-width="2" d="${right_d}"></path>
                   `

        return pathSvg
    }

    const center_decorator = () => {
        let right_angle = _opt.height - (_opt.padding[0] + _opt.padding[2]) - Math.floor(_opt.height / 6)  // 等腰直角边长
        let _centerPath = [
            { x: Math.floor(_opt.width / 28.46) + _opt.padding[3], y: _opt.padding[0] },
            { x: _opt.width - Math.floor(_opt.width / 28.46) - _opt.padding[1], y: _opt.padding[0] },
            { x: _opt.width - Math.floor(_opt.width / 24.67) - _opt.padding[1], y: Math.floor(_opt.height / 6) + _opt.padding[0] },
            { x: _opt.width - ((_opt.width - textWidth) / 2 - right_angle) - _opt.padding[1], y: Math.floor(_opt.height / 6) + _opt.padding[0] },
            { x: textRight_x, y: _opt.height - _opt.padding[2] },
            { x: textLeft_x, y: _opt.height - _opt.padding[2] },
            { x: (_opt.width - textWidth) / 2 - right_angle + _opt.padding[3], y: Math.floor(_opt.height / 6) + _opt.padding[0] },
            { x: Math.floor(_opt.width / 24.67) + _opt.padding[3], y: Math.floor(_opt.height / 6) + _opt.padding[0] }
        ]

        let d = ``
        for (let i = 0; i < _centerPath.length; i++) {
            if (i == 0) {
                d += `M${_centerPath[i].x} ${_centerPath[i].y}`
                continue
            }
            d += ` L${_centerPath[i].x} ${_centerPath[i].y}`
        }
        d += ` Z`

        return ` <path stroke="${_opt.color}" stroke-width="2" d="${d}"></path>`
    }

    const clines_decorator = () => {
        let right_angle = _opt.height - (_opt.padding[0] + _opt.padding[2]) - Math.floor(_opt.height / 6)  // 等腰直角边长
        let left_clines = {
            x1: Math.floor((_opt.width - textWidth) / 2 - right_angle + _opt.padding[3]),
            y1: Math.floor(_opt.padding[0] + _opt.height / 4.5),
            x2: Math.floor((_opt.width - textWidth) / 2 - right_angle + _opt.padding[3] + right_angle / 2),
            y2: Math.floor(_opt.padding[0] + _opt.height / 4.5 + right_angle / 2)
        }
        let right_clines = {
            x1: Math.floor(_opt.width - ((_opt.width - textWidth) / 2 - right_angle) - _opt.padding[1]),
            y1: Math.floor(_opt.height / 4.5 + _opt.padding[0]),
            x2: Math.floor(_opt.width - ((_opt.width - textWidth) / 2 - right_angle) - _opt.padding[1] - right_angle / 2),
            y2: Math.floor(_opt.height / 4.5 + _opt.padding[0] + right_angle / 2)
        }
        return _pathToInclinesGetshorterFade(left_clines.x1, left_clines.y1, left_clines.x2, left_clines.y2, _opt.color, 8, 5, 10, 10)
            + _pathToInclinesGetshorterFade(right_clines.x1, right_clines.y1, right_clines.x2, right_clines.y2, _opt.color, 8, 5, 10, 10, "right")
    }

    let dv = document.createElement('div')

    let svgtag = `<svg width="${_opt.width}" height="${_opt.height}" style="position: absolute;z-index:0;">`

    let svgtagClose = `</svg>`

    dv.innerHTML = svgtag + bilateral_decorator() + center_decorator() + clines_decorator() + text + svgtagClose

    if (!!vdom.children[0]) {
        vdom.children[0].style.position = "relative"
    }

    vdom.insertBefore(dv.firstChild, vdom.children[0])

}

export default header1