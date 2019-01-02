---
title: 30 days JS--Day11_Custom Video Player
date: 2018-12-28 13:53:30
tags:
    - notes
    - javascript
    - video
    - player
    - fullScreen
categories:
    - 30_days_JS
---
# Day11_Custom Video Player

## 目標

製作一個自訂的影片播放器。

## 筆記

作者一開始將整個程式流程分成三大區塊:

1. 宣告變數以取得畫面上要操作的元素
2. 設計方法
3. 綁定事件

緊接著，作者根據各項功能依序得以上述三大區塊進行開發。為了開發上的方便，作者在宣告變數的地方，是直接將所有需要的元素一次宣告。

### 宣告變數

變數宣告大多都使用``querySelector``選擇class名稱，唯一不同的是``player.querySelectorAll('[data-skip]')``。  
這裡利用了data- 自訂屬性好用的地方。因為在這裡使用自訂屬性，並讓querySelector去選擇擁有該屬性的元素，可使得在開發上的彈性增加。因為任何擁有data-skip屬性的元素都可以被當作是操作的元素！  

作業_全螢幕按鈕:  
``const btnFullScreen = player.querySelector('.fullScreen');``

### 播放與暫停

>點選影片畫面或播放鍵，可使影片播放與暫停。

```javascript
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

// 點畫面開始暫停
video.addEventListener('click', togglePlay);
// 點按鈕開始暫停
toggle.addEventListener('click', togglePlay);
```

### 更新播放按鈕

> 當播放按鈕被點選或是影片播放暫停時，按鈕圖案被觸發並改變圖案。  

**透過傾聽影片的播放狀態來改變圖案，而非綁定在``togglePlay()``，是因為影片有多種方式可以啟動播放。**

```javascript

function updateButton() {
    // console.log(e);
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('Update Button!');
    // 這裡不用傳入event做判斷, 而是使用this
    // 這裡的this指的是video, 因為是eventListener綁定在它身上
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
```

### 快轉與後退

> 點選25s/10s按鈕，影片前進25秒或後退10秒。

透過自訂的``data-___``，可以直接取得屬性內的秒數值，且當HTML中的參數改變時，JS程式碼無須變動。  

```javascript

function skip(){

    console.log(this.dataset.skip);
    // 透過dataset拿到自訂屬性 & parseFloat轉換文字值為數字。
    const skipTime = parseFloat(this.dataset.skip);
    video.currentTime += skipTime;
}

// skipButtons
skipButtons.forEach( skipButton => skipButton.addEventListener('click', skip));
```

### 音量與速度拉桿

> 拖拉拉桿調整音量與播放速度

```javascript
function handleRangeUpdate(){
    // 不用if判斷
    // 使用 objectName["propertyName"] 存取該屬性
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
}

// rangeSlider
ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));
// 滑動時的變化效果 (目前是經過都會觸發，參考canvas 用flag)
ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate));
```

### 播放進度條更新

> 進度條會隨著影片播放而改變長度。

首先要知道進度條變化的CSS設定，是由``flex-basis``屬性設定百分比。所以這裡要透過JS動態算出目前秒數與影片總長的比例，並換算成百分比帶入。  
透過EventListener的``timeupdate``或``progress``，觸發``handleProgress()``，進而達到進度條更新效果。

```javascript
function handleProgress(){
    // 進度條視覺上的調整改變是flex-basis
    // 計算影片長度與目前秒數來得到比例，並即時變動flex-basis
    const percent = (video.currentTime / video.duration) * 100;
    // console.log(percent+'%');
    progressBar.style.flexBasis = `${percent}%`;
}

// progressUpdate (event: timeupdate/progress 都可)
video.addEventListener('timeupdate', handleProgress);
```

### 拖拉進度條

> 影片會隨著進度條拖拉而改變播放時間。

1. 換算影片播放時間。
  透過拿到滑鼠點擊位置的``offsetX``來計算進度條比例再乘與影片長度，來換算出影片的播放秒數。最後，再將播放秒數指定給影片的``currentTime``屬性。

```javascript
function scrub(e){
    // 透過拿到滑鼠點擊位置的offsetX來計算進度條比例與影片播放位置比例
    // console.log(e.offsetX);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
```

2. 綁定事件。
  這裡比較特別的是，進度條的拖拉必須是按下滑鼠後拖拉才有效果，若只是單純的加上``click``與``mousemove``，會造成只要有滑鼠經過便會被觸發。因此，透過flag的方式，區別滑鼠是否有點按著的狀態，避免前述情況發生。

```javascript
// progressScrub
let progressMouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousedown', () => progressMouseDown = true);
progress.addEventListener('mouseup', () => progressMouseDown = false);
// 這裡運用&&判斷的特性，若pMD判斷為F，就不會執行scrub。
// 另外，因為scrub方法需要傳入event參數，所以這裡改寫成arrow fn時要帶入參數e
progress.addEventListener('mousemove',(e) => progressMouseDown && scrub(e));
```

### 作業: 全螢幕縮放

> 作者在教學影片結尾出的作業。實現播放器全螢幕的縮放。

基本上全螢幕的方法呼叫，有區分物件與``document``。方法名稱分別為``requestFullscreen``與``exitFullscreen``。  
關於全螢幕方法的呼叫，要注意的有以下幾點:

1. 各家瀏覽器支援程度不同。(下方程式有參考自W3SCHOOL的[範例](https://www.w3schools.com/howto/howto_js_fullscreen.asp))
2. ``requestFullscreen``若由video物件直接呼叫，被呼叫的為原生播放器。
3. 進入全螢幕後，``exitFullscreen``是由``document``呼叫。
4. Firefox中，一定要綁定到事件觸發，才可測試全螢幕方法，不可直接從console中呼叫測試。

```javascript
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

// 綁定事件
btnFullScreen.addEventListener('click', fullScreen);
```