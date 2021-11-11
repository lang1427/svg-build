export const verify_textAlign = (align) => {
    if (align === "left" || align === "center" || align === "right") {
        return align
    }
    return console.error("The textAlign parameter can only be one of [left,center,right]")
}

export const verify_verticalAlign = (align) => {
    if (align === "top" || align === "middle" || align === "bottom") {
        return align
    }
    return console.error("The verticalAlign parameter can only be one of [top,middle,bottom]")
}