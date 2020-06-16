// 渲染数据, img  info like

(function ($, root) {

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $(".img-wrapper img").attr("src", src);
            root.blurImg(img, $("body")); // 处理背景的高斯模糊
        }

    }

    function renderInfo(data) {
        var str = `<div class="song-name">${data.song}</div>
                    <div class="singer-name">${data.singer}</div>
                    <div class="album-name">${data.album}</div>`;
        $(".song-info").html(str);
    }

    function renderIsLike(isLike) {
        isLike ? $(".like-btn").addClass("liking") : $(".like-btn").removeClass("liking");
    }

    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);     
    }

})(window.Zepto, window.player || (window.player = {}))