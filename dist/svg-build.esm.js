/**
 * svg-build
 * v1.0.0
 * by Wei Zhixiang
 * https://github.com/lang1427/svg-build
 */

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/** 正则匹配相关信息  */


var isNumber = function isNumber(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number';
}; // 是否Boolean


var isObj = function isObj(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}; // 是否数组


var isArray = function isArray(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array';
}; // 是否时间

var default_conf = {
  color: "#2862b7",
  backgroundColor: "#000725"
};

var _textStyle = {
  fontSize: 16,
  letterSpacing: 0 // 字与字之间的间隔

};
var _text = function _text(title) {
  var style = "";

  if (title.fontSize !== _textStyle.fontSize) {
    style += "font-size:".concat(title.fontSize, "px;");
  }

  if (title.letterSpacing !== _textStyle.letterSpacing) {
    style += "letter-spacing:".concat(title.letterSpacing, "px;");
  }

  return "<text x=\"".concat(title.x, "\" y=\"").concat(title.y, "\" fill=\"").concat(title.color, "\" style=\"").concat(style, "\">").concat(title.text, "</text>");
};

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
var _circles = function _circles(cx, cy, r, color) {
  var cNum = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var interval = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 6;
  var circleEl = "<circle cx=\"".concat(cx, "\" cy=\"").concat(cy, "\" r=\"").concat(r, "\" stroke-width=\"2\" fill=\"").concat(color, "\"/>");

  if (cNum === 1) {
    return circleEl;
  } else {
    for (var i = 1; i < cNum; i++) {
      circleEl += "<circle cx=\"".concat(cx + i * interval + 2 * r * i, "\" cy=\"").concat(cy, "\" r=\"").concat(r, "\" stroke-width=\"2\" fill=\"").concat(color, "\"/>");
    }

    return circleEl;
  }
};

var border1 = function border1(dom) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var vdom = document.querySelector(dom);
  var _opt = {
    width: opt.width || vdom.offsetWidth,
    height: opt.height || vdom.offsetHeight,
    interval: opt.interval || 20,
    // 间距
    color: opt.color || default_conf.color,
    backgroundColor: opt.backgroundColor || default_conf.backgroundColor
  };
  var dv = document.createElement('div');
  var svgtag = "<svg width=\"".concat(_opt.width, "\" height=\"").concat(_opt.height, "\" style=\"position: absolute;\">");
  var box = "            \n                <polyline points=\"".concat(_opt.interval * 2, " 0,").concat(_opt.interval, " 0,0 ").concat(_opt.interval, ",0 ").concat(_opt.height - _opt.interval, ",").concat(_opt.interval, " ").concat(_opt.height, ",").concat(_opt.interval * 2, " ").concat(_opt.height, "\" style=\"fill:none;stroke:").concat(_opt.color, ";stroke-width:2\" />\n                <polyline points=\"").concat(_opt.width - _opt.interval * 2, " 0,").concat(_opt.width - _opt.interval, " 0,").concat(_opt.width, " ").concat(_opt.interval, ",").concat(_opt.width, " ").concat(_opt.height - _opt.interval, ",").concat(_opt.width - _opt.interval, " ").concat(_opt.height, ",").concat(_opt.width - _opt.interval * 2, " ").concat(_opt.height, "\" style=\"fill:none;stroke:").concat(_opt.color, ";stroke-width:2\" />\n                <polyline points=\"").concat(_opt.interval * 2, " 4,").concat(_opt.interval, " 4,4 ").concat(_opt.interval, ",4 ").concat(_opt.height - _opt.interval, ",").concat(_opt.interval, " ").concat(_opt.height - 4, ",").concat(_opt.interval * 2, " ").concat(_opt.height - 4, ",").concat(_opt.width - _opt.interval, " ").concat(_opt.height - 4, ",").concat(_opt.width - 4, " ").concat(_opt.height - _opt.interval, ",").concat(_opt.width - 4, " ").concat(_opt.interval, ",").concat(_opt.width - _opt.interval, " 4,").concat(_opt.width - _opt.interval * 2, " 4\n                 \"style=\"fill:").concat(_opt.backgroundColor, ";stroke:").concat(_opt.color, ";stroke-width:1;opacity:0.8;\" />         \n                ");
  var svgtagClose = "</svg>";

  var text = _text({
    text: (isObj(opt.title) ? opt.title.text : opt.title) || '',
    x: opt.title.x || 94,
    y: opt.title.y || opt.title.fontSize ? opt.title.fontSize - 3 : 13,
    color: opt.title.color ? opt.title.color : _opt.color,
    fontSize: opt.title.fontSize,
    letterSpacing: opt.title.letterSpacing
  });

  var circles = _circles(_opt.interval * 2 + 20, 5, 3, _opt.color, 3);

  dv.innerHTML = svgtag + box + text + circles + svgtagClose;

  if (!!vdom.children[0]) {
    vdom.children[0].style.position = "absolute";
    vdom.children[0].style.padding = _opt.interval + "px";
  }

  vdom.insertBefore(dv.firstChild, vdom.children[0]);
};

var border = {
  border1: border1
};

var padding_format = function padding_format(padding) {
  if (isArray(padding)) {
    if (padding.length == 1) {
      console.warn('padding params if number[] length = 1,place number type');
      return [padding[0], padding[0], padding[0], padding[0]];
    } else if (padding.length == 2) {
      return [padding[0], padding[1], padding[0], padding[1]];
    } else if (padding.length == 3) {
      return [padding[0], padding[1], padding[2], padding[1]];
    } else if (padding.length == 4) {
      return padding;
    } else {
      return console.error('padding params number[] length !> 4 and < 0');
    }
  } else if (isNumber(padding)) {
    return [padding, padding, padding, padding];
  } else {
    return console.error('padding params is a number or number[]');
  }
};

var verify_textAlign = function verify_textAlign(align) {
  if (align === "left" || align === "center" || align === "right") {
    return align;
  }

  return console.error("The textAlign parameter can only be one of [left,center,right]");
};
var verify_verticalAlign = function verify_verticalAlign(align) {
  if (align === "top" || align === "middle" || align === "bottom") {
    return align;
  }

  return console.error("The verticalAlign parameter can only be one of [top,middle,bottom]");
};

var px_width = function px_width(str, font) {
  var canvas = document.createElement("canvas"),
      context = canvas.getContext("2d");
  font && (context.font = font);
  var metrics = context.measureText(str);
  return metrics.width;
};

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
var _pathToInclinesGetshorterFade = function _pathToInclinesGetshorterFade(x1, y1, x2, y2, color, lineNum, shrinkValue) {
  var lineWidth = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 2;
  var interval = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 10;
  var direction = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "left";
  if (direction !== "left" && direction !== "right") return console.error("_pathToInclinesGetshorterFade methods direction params is left or right");
  var pathEl = "";

  if (direction == "right") {
    pathEl = "<path d=\"M".concat(x1, " ").concat(y1, " L").concat(x1 + lineWidth, " ").concat(y1, " L").concat(x2 + lineWidth, " ").concat(y2, " L").concat(x2, " ").concat(y2, " Z\"  fill=\"").concat(color, "\"/>");
  } else {
    pathEl = "<path d=\"M".concat(x1, " ").concat(y1, " L").concat(x1 - lineWidth, " ").concat(y1, " L").concat(x2 - lineWidth, " ").concat(y2, " L").concat(x2, " ").concat(y2, " Z\"  fill=\"").concat(color, "\"/>");
  }

  for (var i = 1; i < lineNum; i++) {
    if (direction == "right") {
      pathEl += "<path d=\"M".concat(x1 + i * interval + i * lineWidth, " ").concat(y1, " L").concat(x1 + i * interval + i * lineWidth + lineWidth, " ").concat(y1, " L").concat(x2 + i * interval + i * lineWidth + lineWidth + shrinkValue * i, " ").concat(y2 - shrinkValue * i, " L").concat(x2 + i * interval + i * lineWidth + shrinkValue * i, " ").concat(y2 - shrinkValue * i, " Z\"  fill=\"").concat(color, "\" style=\"opacity:").concat((1 - 0.1 * i).toFixed(2), "\"/>");
    } else {
      pathEl += "<path d=\"M".concat(x1 - i * interval - i * lineWidth, " ").concat(y1, " L").concat(x1 - i * interval - i * lineWidth - lineWidth, " ").concat(y1, " L").concat(x2 - i * interval - i * lineWidth - lineWidth - shrinkValue * i, " ").concat(y2 - shrinkValue * i, " L").concat(x2 - i * interval - i * lineWidth - shrinkValue * i, " ").concat(y2 - shrinkValue * i, " Z\"  fill=\"").concat(color, "\" style=\"opacity:").concat((1 - 0.1 * i).toFixed(2), "\"/>");
    }
  }

  return pathEl;
};

var header1 = function header1(dom) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var vdom = document.querySelector(dom);
  var _opt = {
    width: opt.width || vdom.offsetWidth,
    height: opt.height || vdom.offsetHeight,
    padding: opt.padding || opt.padding == 0 ? padding_format(opt.padding) : [20, 0, 10, 0],
    // 间距
    color: opt.color || default_conf.color,
    backgroundColor: opt.backgroundColor || default_conf.backgroundColor
  };
  var title = (isObj(opt.title) ? opt.title.text : opt.title) || '';
  var textWidth = opt.title.width || Math.floor(_opt.width / 3);
  var textLeft_x = (_opt.width - textWidth) / 2 + _opt.padding[3];
  var textRight_x = _opt.width - (_opt.width - textWidth) / 2 - _opt.padding[1];
  var fontSize = opt.title.fontSize || 28;
  var letterSpacing = opt.title.letterSpacing || 0;

  var _textX = function _textX() {
    var textAlign = verify_textAlign(opt.title.textAlign || 'center');
    var titleWidth = px_width(title, "normal ".concat(fontSize, "px Microsoft YaHei")) + (title.length - 1) * letterSpacing;
    var titleBoxWidth = textRight_x - textLeft_x;
    var x = 0;

    switch (textAlign) {
      case "left":
        x = textLeft_x;
        break;

      case "center":
        x = textLeft_x + titleBoxWidth / 2 - titleWidth / 2;
        break;

      case "right":
        x = textRight_x - titleWidth;
        break;
    }

    return x;
  };

  var _textY = function _textY() {
    var verticalAlign = verify_verticalAlign(opt.title.verticalAlign || "middle");
    var titleHeight = parseInt((1.33 * fontSize).toFixed(2));
    var titleBoxHeight = _opt.height - (_opt.padding[0] + _opt.padding[2]);
    var text_baseline = titleHeight / 2 - fontSize / 2;
    var y = 0;

    switch (verticalAlign) {
      case "top":
        y = _opt.padding[0] + titleHeight - text_baseline * 2;
        break;

      case "middle":
        y = _opt.padding[0] + titleBoxHeight / 2 + titleHeight / 2 - text_baseline * 2;
        break;

      case "bottom":
        y = _opt.height - (_opt.padding[2] + text_baseline);
        break;
    }

    return y;
  };

  var text = _text({
    text: title,
    width: textWidth,
    x: opt.title.x || _textX(),
    y: opt.title.y || _textY(),
    color: opt.title.color ? opt.title.color : _opt.color,
    fontSize: fontSize,
    letterSpacing: letterSpacing
  });

  var bilateral_decorator = function bilateral_decorator() {
    var pathSvg = "";
    var leftPath = [{
      x: _opt.padding[3],
      y: _opt.padding[0]
    }, {
      x: _opt.padding[3] + Math.floor(_opt.width / 37),
      y: _opt.padding[0]
    }, {
      x: _opt.padding[3] + Math.floor(_opt.width / 28.46),
      y: _opt.padding[0] + Math.floor(_opt.height / 4.5)
    }, {
      x: _opt.padding[3] + Math.floor(_opt.width / 13.7),
      y: _opt.padding[0] + Math.floor(_opt.height / 4.5)
    }, {
      x: _opt.padding[3] + Math.floor(_opt.width / 12.76),
      y: _opt.padding[0] + Math.floor(_opt.height / 3)
    }, {
      x: _opt.padding[3] + Math.floor(_opt.width / 61.67),
      y: _opt.padding[0] + Math.floor(_opt.height / 3)
    }];
    var rightPath = [{
      x: _opt.width - _opt.padding[1],
      y: _opt.padding[0]
    }, {
      x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 37),
      y: _opt.padding[0]
    }, {
      x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 28.46),
      y: _opt.padding[0] + Math.floor(_opt.height / 4.5)
    }, {
      x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 13.7),
      y: _opt.padding[0] + Math.floor(_opt.height / 4.5)
    }, {
      x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 12.76),
      y: _opt.padding[0] + Math.floor(_opt.height / 3)
    }, {
      x: _opt.width - _opt.padding[1] - Math.floor(_opt.width / 61.67),
      y: _opt.padding[0] + Math.floor(_opt.height / 3)
    }];
    var left_d = "",
        right_d = "";

    for (var i = 0; i < leftPath.length; i++) {
      if (i == 0) {
        left_d += "M".concat(leftPath[i].x, " ").concat(leftPath[i].y);
        right_d += "M".concat(rightPath[i].x, " ").concat(rightPath[i].y);
        continue;
      }

      left_d += " L".concat(leftPath[i].x, " ").concat(leftPath[i].y);
      right_d += " L".concat(rightPath[i].x, " ").concat(rightPath[i].y);
    }

    left_d += " Z";
    right_d += " Z";
    pathSvg += "       \n                    <path stroke=\"".concat(_opt.color, "\" stroke-width=\"2\" d=\"").concat(left_d, "\"></path>\n                    <path stroke=\"").concat(_opt.color, "\" stroke-width=\"2\" d=\"").concat(right_d, "\"></path>\n                   ");
    return pathSvg;
  };

  var center_decorator = function center_decorator() {
    var right_angle = _opt.height - (_opt.padding[0] + _opt.padding[2]) - Math.floor(_opt.height / 6); // 等腰直角边长

    var _centerPath = [{
      x: Math.floor(_opt.width / 28.46) + _opt.padding[3],
      y: _opt.padding[0]
    }, {
      x: _opt.width - Math.floor(_opt.width / 28.46) - _opt.padding[1],
      y: _opt.padding[0]
    }, {
      x: _opt.width - Math.floor(_opt.width / 24.67) - _opt.padding[1],
      y: Math.floor(_opt.height / 6) + _opt.padding[0]
    }, {
      x: _opt.width - ((_opt.width - textWidth) / 2 - right_angle) - _opt.padding[1],
      y: Math.floor(_opt.height / 6) + _opt.padding[0]
    }, {
      x: textRight_x,
      y: _opt.height - _opt.padding[2]
    }, {
      x: textLeft_x,
      y: _opt.height - _opt.padding[2]
    }, {
      x: (_opt.width - textWidth) / 2 - right_angle + _opt.padding[3],
      y: Math.floor(_opt.height / 6) + _opt.padding[0]
    }, {
      x: Math.floor(_opt.width / 24.67) + _opt.padding[3],
      y: Math.floor(_opt.height / 6) + _opt.padding[0]
    }];
    var d = "";

    for (var i = 0; i < _centerPath.length; i++) {
      if (i == 0) {
        d += "M".concat(_centerPath[i].x, " ").concat(_centerPath[i].y);
        continue;
      }

      d += " L".concat(_centerPath[i].x, " ").concat(_centerPath[i].y);
    }

    d += " Z";
    return " <path stroke=\"".concat(_opt.color, "\" stroke-width=\"2\" d=\"").concat(d, "\"></path>");
  };

  var clines_decorator = function clines_decorator() {
    var right_angle = _opt.height - (_opt.padding[0] + _opt.padding[2]) - Math.floor(_opt.height / 6); // 等腰直角边长

    var left_clines = {
      x1: Math.floor((_opt.width - textWidth) / 2 - right_angle + _opt.padding[3]),
      y1: Math.floor(_opt.padding[0] + _opt.height / 4.5),
      x2: Math.floor((_opt.width - textWidth) / 2 - right_angle + _opt.padding[3] + right_angle / 2),
      y2: Math.floor(_opt.padding[0] + _opt.height / 4.5 + right_angle / 2)
    };
    var right_clines = {
      x1: Math.floor(_opt.width - ((_opt.width - textWidth) / 2 - right_angle) - _opt.padding[1]),
      y1: Math.floor(_opt.height / 4.5 + _opt.padding[0]),
      x2: Math.floor(_opt.width - ((_opt.width - textWidth) / 2 - right_angle) - _opt.padding[1] - right_angle / 2),
      y2: Math.floor(_opt.height / 4.5 + _opt.padding[0] + right_angle / 2)
    };
    return _pathToInclinesGetshorterFade(left_clines.x1, left_clines.y1, left_clines.x2, left_clines.y2, _opt.color, 8, 5, 10, 10) + _pathToInclinesGetshorterFade(right_clines.x1, right_clines.y1, right_clines.x2, right_clines.y2, _opt.color, 8, 5, 10, 10, "right");
  };

  var dv = document.createElement('div');
  var svgtag = "<svg width=\"".concat(_opt.width, "\" height=\"").concat(_opt.height, "\" style=\"position: absolute;\">");
  var svgtagClose = "</svg>";
  dv.innerHTML = svgtag + bilateral_decorator() + center_decorator() + clines_decorator() + text + svgtagClose;

  if (!!vdom.children[0]) {
    vdom.children[0].style.position = "absolute";
    vdom.children[0].style.padding = _opt.interval + "px";
  }

  vdom.insertBefore(dv.firstChild, vdom.children[0]);
};

var header = {
  header1: header1
};

var main = _objectSpread2(_objectSpread2({}, border), header);

export { main as default };
