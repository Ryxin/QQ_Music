// 四个常用API   gulp.scr() ;  gulp.dest() ;   gulp.task() 创建任务  ;    gulp.watch() 开启监听;

const {task,src,dest,watch,parallel} = require('gulp');
const htmlClean =  require("gulp-htmlclean");   // 压缩html文件插件
const imageMin = require("gulp-imagemin");      // 压缩图片插件
const uglify = require("gulp-uglify");          // 压缩js文件插件
const stripDebug = require("gulp-strip-debug"); // 去除js文件中在开发阶段的调试语句
const less = require("gulp-less");              // 将书写的less代码转换为css代码
const cleanCss =  require("gulp-clean-css")     // 压缩css文件插件
//  postcss   autoprefixer  cssnano  添加前缀 -webkit
const postCss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require("gulp-babel");
const connect = require("gulp-connect");    // 开启服务器

const folder = {
  src :"src/",
  dist : "dist/"
}

// export NODE_ENV=development  在命令行可以设置环境变量(开发环境/生产环境)
// const devMod  =  process.env.NODE_ENV == "development";  // 判断当前环境是否是开发环境  返回 true 或false
// console.log(devMod)



function html() {
  return src(`${folder.src}html/*`)
    .pipe(connect.reload())  //当文件发生变化就调用reload重新刷新
    .pipe(htmlClean()) 
    .pipe(dest(`${folder.dist}html/`)) 
}

function images() {
  return src(`${folder.src}images/*`)
    .pipe(imageMin())
    .pipe(dest(`${folder.dist}images/`)) 
}

function css() {
  const plugins = [
    autoprefixer(),
    cssnano()
  ];
  return src(`${folder.src}css/*`)
    .pipe(connect.reload())  //当文件发生变化就调用reload重新刷新
    .pipe(less())
    .pipe(postCss(plugins))
    .pipe(cleanCss())
    .pipe(dest(`${folder.dist}css/`))
}

function js() {
  return src(`${folder.src}js/*`, { sourcemaps: true })
 // .pipe(concat('app.min.js'))
    .pipe(connect.reload())  //当文件发生变化就调用reload重新刷新
    // .pipe(stripDebug())   //去除js文件中在开发阶段的调试语句
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(`${folder.dist}js/`, { sourcemaps: true }))
}

function server() {   // 开启服务器
  connect.server({
    port :"8888" ,   // 修改默认端口号
    livereload : true  // 自动刷新页面
  })
}

// 监听 文件变化,并执行后续任务
watch([`${folder.src}html/*`,`${folder.src}css/*`,`${folder.src}js/*`], function(cb) {
  html();
  css();
  js();
  cb();
});


exports.default = parallel(html,css,js,images,server);



  
