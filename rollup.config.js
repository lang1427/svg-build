
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import banner from 'rollup-plugin-banner';
import  {uglify}  from "rollup-plugin-uglify";

export default {
    input: 'src/main.js',
    output: [{ // 打包出口
        file: 'dist/svg-build.js',
        name: 'svgBuild',
        format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    }, {
        file: 'dist/svg-build.esm.js',
        name: 'svgBuild',
        format: 'esm',
    }, {
        file: 'dist/svg-build.min.js',
        name: 'svgBuild',
        format: 'umd',
        plugins:[uglify()]
    }],
    plugins: [ // 打包插件
        banner('svg-build\nv<%= pkg.version %>\nby <%= pkg.author %>\nhttps://github.com/lang1427/svg-build'),
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        babel({ babelHelpers: 'bundled' })
    ]
};