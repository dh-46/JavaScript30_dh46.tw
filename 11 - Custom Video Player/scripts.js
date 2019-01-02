/* 取得所有要操作的元素 */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* 設計fn */
function togglePlay() {
    // 邏輯寫法一
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    // 寫法二
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
    // 寫法三
    video[video.paused ? 'play' : 'pause']();
}

/* 綁定傾聽器 */
// Play/Pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);


// 建議拆解成個單元一個單元製作
