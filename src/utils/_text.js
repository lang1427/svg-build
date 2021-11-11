export const _textStyle = {
    fontSize: 16,
    letterSpacing: 0,  // 字与字之间的间隔
}
export const _text = (title) => {
    let style = ``
    if (title.fontSize !== _textStyle.fontSize) {
        style += `font-size:${title.fontSize}px;`
    }
    if (title.letterSpacing !== _textStyle.letterSpacing) {
        style += `letter-spacing:${title.letterSpacing}px;`
    }
    return `<text x="${title.x}" y="${title.y}" fill="${title.color}" style="${style}">${title.text}</text>`

}

