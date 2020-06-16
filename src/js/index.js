var nowIndex = 0; // 记录当前索引
var len; // 用于记录数据的长度
var DataList; // 用于记录数据，方便后续使用
var root = window.player;
var audio = root.audioManager;
var timer = null;
//  获取数据
function getdata(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data)
            len = data.length;
            DataList = data;
            root.render(data[0]);
            audio.getAudio(data[0].audio) // 加载当前音频
            bindEvent();
            $("body").trigger("play-change", 0);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

// 点击按钮切换
function bindEvent() {
    // 提取公共代码,在body身上添加自定义事件;
    $("body").on("play-change", function (e, index) {
        root.render(DataList[index]);
        audio.getAudio(DataList[index].audio)
        if (audio.status == "play") { //判断当前音频状态
            audio.play();

            rotated(0);
        } else {
            audio.pause(); // 暂停
            clearInterval(timer);
            timer = null;
        }
        $(".img-wrapper").attr("data-deg", 0);
        $(".img-wrapper").css({
            transform: 'rotateZ(' + 0 + 'deg)',
            transition: "none"
        });

        // 获取歌曲的总时长
        root.pro.renderAllTime(DataList[index].duration);
    })

    $(".prev-btn").on("click", function (e) {
        if (nowIndex == 0) {
            nowIndex = len - 1;
        } else {
            nowIndex--;
        }
        $("body").trigger("play-change", nowIndex);
        root.pro.start(0);

        if (audio.status == "pause") { //判断当前音频状态
            audio.pause();
            root.pro.stop();
        }
    })

    $(".next-btn").on("click", function (e) {
        if (nowIndex == len - 1) {
            nowIndex = 0;
        } else {
            nowIndex++;
        }
        $("body").trigger("play-change", nowIndex);
        root.pro.start(0);

        if (audio.status == "pause") { //判断当前音频状态
            audio.pause();
            root.pro.stop();
        }
    })

    $(".play-btn").on("click", function () {
        if (audio.status == "pause") { // 判断当前音频状态
            audio.play(); // 播放
            root.pro.start();
            var deg = $(".img-wrapper").attr("data-deg") || 0;
            rotated(deg) // 图片旋转
        } else {
            audio.pause(); // 暂停
            clearInterval(timer);
            timer = null;
            root.pro.stop();
        }
        $(".play-btn").toggleClass("playing"); // 点击播放按钮切换类名更换图标样式
    })


    // 实现歌曲列表切换    以下代码属实粗糙了。。。
    $(".list-btn").on("click", function () {

        $(".song-list").css({
            display: "block"
        });
        $(".song0").on("click", function () {
            $("body").trigger("play-change", 0);
            $(".song-list").css({
                display: "none"
            });

            root.pro.start(0);
            if (audio.status == "pause") { //判断当前音频状态
                audio.pause();
                root.pro.stop();
            }
        })
        $(".song1").on("click", function () {
            $("body").trigger("play-change", 1);
            $(".song-list").css({
                display: "none"
            });

            root.pro.start(0);
            if (audio.status == "pause") { //判断当前音频状态
                audio.pause();
                root.pro.stop();
            }
        })
        $(".song2").on("click", function () {
            $("body").trigger("play-change", 2);
            $(".song-list").css({
                display: "none"
            });

            root.pro.start(0);
            if (audio.status == "pause") { //判断当前音频状态
                audio.pause();
                root.pro.stop();
            }
        })
    })
    renderSong(DataList);
}


// 图片旋转
function rotated(deg) {
    clearInterval(timer);
    deg = parseInt(deg);
    timer = setInterval(function () {
        deg += 2;
        $(".img-wrapper").attr("data-deg", deg); //用于记录是当前的角度值 
        $(".img-wrapper").css({
            transform: 'rotateZ(' + deg + 'deg)',
            transition: "transform 0.2s linear"
        })
    }, 200);
}

// 获取歌曲列表信息
function renderSong(data) {
    for (let i = 0; i < data.length; i++) {
        $("<div class='song'></div").text(data[i].song).addClass("song" + i).appendTo(".song-list");
    }
}

getdata("../mock/data.json");