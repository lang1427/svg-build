import { isObj } from 'methods-util'
import { verify_borderChildren } from '../utils/verify_border'
import default_conf from "../conf/default_conf"
import { _text, _textStyle } from '../utils/_text'
import { _circles } from '../utils/_circles'

const border1 = function (dom, opt = {}) {
    const vdom = document.querySelector(dom)

    verify_borderChildren(vdom)

    let _opt = {
        width: opt.width || vdom.offsetWidth,
        height: opt.height || vdom.offsetHeight,
        interval: opt.interval || 20,    // 间距
        color: opt.color || default_conf.color,
        backgroundColor: opt.backgroundColor || default_conf.backgroundColor,
        auto: opt.auto || true
    }

    let dv = document.createElement('div')

    let svgtag = `<svg width="${_opt.width}" height="${_opt.height}" style="position: absolute;z-index:0;">`
    let box = `            
                <polyline points="${_opt.interval * 2} 0,${_opt.interval} 0,0 ${_opt.interval},0 ${_opt.height - _opt.interval},${_opt.interval} ${_opt.height},${_opt.interval * 2} ${_opt.height}" style="fill:none;stroke:${_opt.color};stroke-width:2" />
                <polyline points="${_opt.width - _opt.interval * 2} 0,${_opt.width - _opt.interval} 0,${_opt.width} ${_opt.interval},${_opt.width} ${_opt.height - _opt.interval},${_opt.width - _opt.interval} ${_opt.height},${_opt.width - _opt.interval * 2} ${_opt.height}" style="fill:none;stroke:${_opt.color};stroke-width:2" />
                <polyline points="${_opt.interval * 2} 4,${_opt.interval} 4,4 ${_opt.interval},4 ${_opt.height - _opt.interval},${_opt.interval} ${_opt.height - 4},${_opt.interval * 2} ${_opt.height - 4},${_opt.width - _opt.interval} ${_opt.height - 4},${_opt.width - 4} ${_opt.height - _opt.interval},${_opt.width - 4} ${_opt.interval},${_opt.width - _opt.interval} 4,${_opt.width - _opt.interval * 2} 4
                 "style="fill:${_opt.backgroundColor};stroke:${_opt.color};stroke-width:1;opacity:0.8;" />         
                `
    let svgtagClose = `</svg>`

    const circles = _circles(_opt.interval * 2 + 20, 5, 3, _opt.color, 3)

    const _textX = () => {
        if (!!opt.title.x) return Number(opt.title.x)
        let cx_last = _opt.interval * 2 + 20 + ((3 - 1) * 6) + (2 * 3 * (3 - 1))
        let paddingLeft = 10
        return cx_last + paddingLeft
    }

    const _textY = () => {
        if (!!opt.title.y) return Number(opt.title.y)
        let y = 0
        let fontSize = opt.title.fontSize || _textStyle.fontSize
        let textHeight = parseInt((1.33 * fontSize).toFixed(2))
        let text_baseline = textHeight / 2 - fontSize / 2
        return y = textHeight - text_baseline * 3
    }

    const text = _text({
        text: (isObj(opt.title) ? opt.title.text : opt.title) || '',
        x: _textX(),
        y: _textY(),
        color: opt.title.color ? opt.title.color : _opt.color,
        fontSize: opt.title.fontSize,
        letterSpacing: opt.title.letterSpacing || 0
    })

    dv.innerHTML = svgtag + box + text + circles + svgtagClose

    if (!!vdom.children[0]) {
        vdom.children[0].style.position = "relative"
        if (_opt.auto) {
            vdom.children[0].style.padding = _opt.interval + "px"
            if (_textY() > _opt.interval) {
                vdom.children[0].style.paddingTop = (_textY() + 5) + "px"
            }
        }
    }

    vdom.insertBefore(dv.firstChild, vdom.children[0])

}

export default border1