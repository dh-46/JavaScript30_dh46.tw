/* 取得所有要操作的元素 */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const btnFullScreen = player.querySelector('.fullScreen');
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

function updateButton() {
    // console.log(e);
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('Update Button!');
    // 這裡不用傳入event做判斷, 而是使用this
    // 這裡的this指的是video, 因為是eventListener綁定在它身上
}

function skip(){
    // data- 自訂屬性好用的地方
    // 在這裡使用自訂屬性，並讓querySelector去選擇擁有該屬性的元素
    // 使得在開發上的彈性增加，因為任何擁有data-skip屬性的元素都可以被當作是操作的元素
    console.log(this.dataset.skip);
    // 透過dataset拿到自訂屬性
    const skipTime = parseFloat(this.dataset.skip);
    video.currentTime += skipTime;
}

function handleRangeUpdate(){
    // 不用if判斷
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
}

function handleProgress(){
    // 進度條視覺上的調整改變是flex-basis
    // 計算影片長度與目前秒數來得到比例，並即時變動flex-basis
    const percent = (video.currentTime / video.duration) * 100;
    // console.log(percent+'%');
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    // 透過拿到滑鼠點擊位置的offsetX來計算進度條比例與影片播放位置比例
    // console.log(e.offsetX);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreen(){
    // 判斷是否當下為全螢幕
    if (document.fullscreen){
        closeFullscreen();
    } else {
        openFullscreen();
    }
}

// 呼叫player的全螢幕方法，而非video。 => 因為video會觸發原生的控制介面
function openFullscreen() {
    // 相容性處理為參考自w3school
    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.mozRequestFullScreen) { /* Firefox */
        player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) { /* IE/Edge */
        player.msRequestFullscreen();
    }
}

// 離開全螢幕是從document物件上執行
function closeFullscreen() {
    // 相容性處理為參考自w3school
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
  }

/* 綁定傾聽器 */

// Play/Pause
// 點畫面開始暫停
video.addEventListener('click', togglePlay);
// 點按鈕開始暫停
toggle.addEventListener('click', togglePlay);
// 按鈕變化 => 透過傾聽影片的播放狀態來改變圖案，而非綁定在togglePlay (因為影片有多種方式可以啟動播放)
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// skipButtons
skipButtons.forEach( skipButton => skipButton.addEventListener('click', skip));

// rangeSlider
ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));
// 滑動時的變化效果 (目前是經過都會觸發，參考canvas 用flag)
ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate));



// progressUpdate (event: timeupdate/progress 都可)
video.addEventListener('timeupdate', handleProgress);

// progressScrub
let progressMouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousedown', () => progressMouseDown = true);
progress.addEventListener('mouseup', () => progressMouseDown = false);
// 這裡運用&&判斷的特性，若pMD判斷為F，就不會執行scrub。
// 另外，因為scrub方法需要傳入event參數，所以這裡改寫成arrow fn時要帶入參數e
progress.addEventListener('mousemove',(e) => progressMouseDown && scrub(e));

// Homework: 全螢幕控制 (筆記: Firefox一定要綁定到事件觸發，才可測試全螢幕方法，不可直接從console中呼叫測試。)
btnFullScreen.addEventListener('click', fullScreen);

// 建議拆解成個單元一個單元製作
