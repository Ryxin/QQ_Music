(function ($, root) {
    // play   pause  getAudio

    function AudioManager() {
        //创建一个音频对象
        this.audio = new Audio();
        //标记音频的默认状态
        this.status = "pause";
    };
    AudioManager.prototype = {
        play: function () {
            // this.audio.play();
            // 以下操作为了防止报错
            // 从Chrome50开始，对<video>或<audio>元素的play()调用返回一个Promise。
            //一个异步返回单个结果的函数。如果回放成功，Promise就会实现，而play事件也会同时触发，对应执行.then。
            //如果回放失败，Promise将被拒绝，同时会有一个错误消息解释失败，对应执行.catch。
            let playPromise = this.audio.play()
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.audio.play()
                }).catch(() => {
                })
            }
            this.status = "play";
        },
        pause: function () {
            this.audio.pause();
            this.status = "pause";
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load(); //加载音频
        },

    }
    root.audioManager = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))