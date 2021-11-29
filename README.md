# svg-build

> 开发环境中建议使用`svg-build.js`,生产环境中建议使用`svg-build.min.js`

**`svg-build.js`向window暴露出一个全局变量`svgBuild`**


> <font color="yellow">参数选择器中请不要随意带样式 以避免出现样式继承导致 `svg` 渲染时错位等情况，您可以在该元素上添加其他方式如：`class` 进行设置该元素的样式
</font>


## border 边框

> <font color="red">border系列使用时，请确保该元素是否只有一个子元素 或 无子元素，这样的初衷是为了您内部的元素不会导致可能出现的样式影响</font>

> <font color="orange">由于`svg`生成的border不确定性的添加边框角度，无法衡量内部元素是否可以融合此插件的一些自适应配置，您可以通过`auto`选项设置为`false`进行关闭，在通过您自己想要的布局进行设置</font>



## base opt

> title  `string | object`
 
- text : `string`
- x : `number` (The system automatically calculates,<font color="red">Unless you know the required displacement distance, please do not fill in and change it at will</font>)
- y : `number` (The system automatically calculates,<font color="red">Unless you know the required displacement distance, please do not fill in and change it at will</font>)
- color : `string` (default value inherited from color attribute)
- fontSize : `number` (default value = 14)
- letterSpacing : `number` (default value = 0)

> width
- `number` (default value : select element offsetWidth)

> height 
- `number` (default value : select element offsetHeight)

> color 
- `string` (default value = #2862b7)

> backgroundColor
- `string` (default value = transparent)


### border series opt

> auto 
- `boolean` (default value = true)

> interval
- `number` (间距)



### header series opt

> title
- width : `number` (default value: `Math.floor(width/3)`)
- textAlign : `string` (default value = center , optional params : [left,center,right])
- verticalAlign : `string` (default value = middle , optional params : [top,middle,bottom])

> padding 
- `number number[]` (边距 [上 右 下 左])