export const px_width = (str,font) => {

        var canvas = document.createElement("canvas"),
            context = canvas.getContext("2d");

        font && (context.font = font);
        var metrics = context.measureText(str);

        return metrics.width;
    
}