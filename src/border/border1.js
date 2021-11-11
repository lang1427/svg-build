import { isObj } from 'methods-util'

import default_conf from "../conf/default_conf"
import { _text } from '../utils/_text'
import { _circles } from '../utils/_circles'

// transparent
const border1 = function (dom, opt = {}) {
    const vdom = document.querySelector(dom)

    let _opt = {
        width: opt.width || vdom.offsetWidth,
        height: opt.height || vdom.offsetHeight,
        interval: opt.interval || 20,    // 间距
        color: opt.color || default_conf.color,
        backgroundColor: opt.backgroundColor || default_conf.backgroundColor
    }

    let dv = document.createElement('div')

    let svgtag = `<svg width="${_opt.width}" height="${_opt.height}" style="position: absolute;">`
    let box = `            
                <polyline points="${_opt.interval * 2} 0,${_opt.interval} 0,0 ${_opt.interval},0 ${_opt.height - _opt.interval},${_opt.interval} ${_opt.height},${_opt.interval * 2} ${_opt.height}" style="fill:none;stroke:${_opt.color};stroke-width:2" />
                <polyline points="${_opt.width - _opt.interval * 2} 0,${_opt.width - _opt.interval} 0,${_opt.width} ${_opt.interval},${_opt.width} ${_opt.height - _opt.interval},${_opt.width - _opt.interval} ${_opt.height},${_opt.width - _opt.interval * 2} ${_opt.height}" style="fill:none;stroke:${_opt.color};stroke-width:2" />
                <polyline points="${_opt.interval * 2} 4,${_opt.interval} 4,4 ${_opt.interval},4 ${_opt.height - _opt.interval},${_opt.interval} ${_opt.height - 4},${_opt.interval * 2} ${_opt.height - 4},${_opt.width - _opt.interval} ${_opt.height - 4},${_opt.width - 4} ${_opt.height - _opt.interval},${_opt.width - 4} ${_opt.interval},${_opt.width - _opt.interval} 4,${_opt.width - _opt.interval * 2} 4
                 "style="fill:${_opt.backgroundColor};stroke:${_opt.color};stroke-width:1;opacity:0.8;" />         
                `
    let svgtagClose = `</svg>`

    const text = _text({
        text: (isObj(opt.title) ? opt.title.text : opt.title) || '',
        x: opt.title.x || 94,
        y: opt.title.y || opt.title.fontSize ? opt.title.fontSize - 3 : 13,
        color: opt.title.color ? opt.title.color : _opt.color,
        fontSize: opt.title.fontSize,
        letterSpacing: opt.title.letterSpacing
    })

    const circles = _circles(_opt.interval * 2 + 20, 5, 3, _opt.color, 3)

    dv.innerHTML = svgtag + box + text + circles + svgtagClose

    if (!!vdom.children[0]) {
        vdom.children[0].style.position = "absolute"
        vdom.children[0].style.padding = _opt.interval + "px"
    }

    vdom.insertBefore(dv.firstChild, vdom.children[0])

}

export default border1