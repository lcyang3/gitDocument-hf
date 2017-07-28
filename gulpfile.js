var gulp = require('gulp'),
    compass = require('gulp-compass'), // compass编译Sass, 生成雪碧图　　　　　　　　　　　　　
    sass = require('gulp-sass'), // sass编译
    rename = require('gulp-rename'), // 重命名文件
    cssver = require('gulp-make-css-url-version'), // css文件引用URL加版本号
    uglify = require('gulp-uglify'), // JS优化
    concat = require('gulp-concat'), // JS拼接
    cache = require('gulp-cache'), // 缓存通知
    imagemin = require('gulp-imagemin'), // 图片压缩
    minifycss = require('gulp-minify-css'), // 压缩CSS
    browserSync = require('browser-sync'), // 浏览器同步
    reload = browserSync.reload, // 自动刷新
    tmodjs = require('gulp-tmod'); // arttemplate 编译

// 路径变量
var path = {
    // 开发环境
    dev: {
        js: './dev/js',
        sass: './dev/sass',
        image: './dev/images',
        tpl: './tpl'
    },
    // 发布环境
    dist: {
        js: './dist/js',
        css: './dist/css',
        image: './dist/images',
        tpl: './dist'
    }
};

// 创建Compass任务，编译Sass生成雪碧图
gulp.task('compass', function() {
    gulp.src(path.dev.sass + '/dist.scss')
        .pipe(sass())
        .pipe(cssver()) // CSS文件引用URl加版本号
        .pipe(minifycss()) // 压缩CSS
        .pipe(rename('dist.min.css')) // 重命名
        .pipe(gulp.dest(path.dist.css)) // 发布到线上版本
        .pipe(reload({ stream: true }));
});

// 图片压缩
gulp.task('image', function() {
    gulp.src(path.dev.image + '/**/*.*')
        .pipe(cache(imagemin()))
        .pipe(reload({ stream: true }))
        .pipe(gulp.dest(path.dist.image));
});

// 合并压缩JS文件
gulp.task('script', function() {
    gulp.src(['./dev/js/base.js', './dev/js/tools.js', './dev/js/artTemplate.js', './dev/js/animate.js', './dev/js/index.js'])
        .pipe(concat('dist.js')) // 合并
        .pipe(rename('dist.min.js')) // 重命名
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({ stream: true }));
});

// 合并压缩JS文件 ---  ---  helpers
gulp.task('helpers', function() {
    gulp.src(['./dev/js/helpers.js'])
        .pipe(concat('helpers.js')) // 合并
        .pipe(rename('helpers.min.js')) // 重命名
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest("./dist/"))
        .pipe(reload({ stream: true }));
});

// 合并压缩JS文件
gulp.task('pagejs', function() {
    gulp.src("./dev/pagejs/**/*.js")
        .pipe(rename({ suffix: '.min' })) // 重命名
        .pipe(uglify()) // 压缩
        .pipe(gulp.dest('./dist/pagejs/'))
        .pipe(reload({ stream: true }));
});

//任务监听
gulp.task("watch", function() {
    // 检测文件发送变化 - 分开监听为了执行对应的命令
    gulp.watch(path.dev.sass + '/**/**', ['compass']);
    gulp.watch(path.dev.image + '/**/**', ['image']);
    gulp.watch(path.dev.js + '/**/**', ['script']);
    gulp.watch("./dev/pagejs/**/**", ['pagejs']);
    gulp.watch("./dev/js/helpers.js", ['helpers']);
});

// 默认任务
gulp.task("default", ['compass', 'script', 'helpers', 'image', 'pagejs', 'watch']);