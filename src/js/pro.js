// 负责进度条模块
(function ($, root) {
    var dur; //记录歌曲总时长(秒)
    var startTime = 0; //记录进度条开始时间
    var frameId;
    var lastPer = 0; // 记录播放的百分比

    function renderAllTime(time) { // 获取歌曲的总时长
        dur = time;
        time = formatTime(time);
        $(".all-time").html(time);
        console.log(dur);
    }

    // 工具方法，用于转换时间
    function formatTime(time) {
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time % 60;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        return m + ":" + s;
    }



    //开始进度条
    function start(p) {
        lastPer = p===undefined ? lastPer : 0;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime(); //进度条开始时间
        function frame() {
            var curTime = new Date().getTime(); // 进度条暂停时间
            var per = lastPer + (curTime - startTime) / (dur * 1000); // 获取进度百分比
            if (per <= 1) {
                upData(per);
            } else {
                cancelAnimationFrame(frameId); // cancelAnimationFrame 取消关键帧动画
            }
            // console.log(per);
            frameId = requestAnimationFrame(frame); //关键帧动画requestAnimationFrame
        }
        frame();
    }

    // 更新进度条
    function upData(per) {
        // 更新开始时间
        var time = formatTime(per * dur);
        $(".cur-time").html(time); // 

        //更新进度条的位置
        var perX = per * 100;
        $(".pro-top").css({
            width: perX + "%"
        });
    }
    // 停止进度条
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (dur * 1000); // 记录进度条百分比
    }


    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        upData: upData,
        stop: stop,

    }

})(window.Zepto, window.player || (window.player = {}))