---
title: 30 days JS--Day13_Slide in on Scroll
date: 2019-01-25 14:24:30
tags:
    - notes
    - javascript
    - debounce
    - scroll
categories:
    - 30_days_JS
---
# Day13_Slide in on Scroll

設計頁面捲動時，圖片由水平向中滑入的動畫效果。

## 步驟

1. 取得目標圖片
  圖片預設被設定為hidden且套用transform屬性。事件觸發時，將會修改圖片Class，以達到動態滑入的效果。
2. 設計`checkSlide()`方法，當使用者滑動頁面時觸發。
3. `window`物件註冊`scroll`的事件傾聽器。
  測試後發現捲動效果觸發次數過於頻繁，套用`debounce()`減少觸發次數。
4. 偵測哪一張圖片要顯示動畫?
5. 條件判斷並透過`classList.add();` & `classList.remove();` 動態加上預先寫好的動畫class。

## 筆記

### 如何偵測哪一張圖片要顯示動畫

> 設計在該圖片露出其一半高度時觸發。=> 要知道的是視窗底部目前滑到哪一個位置

1. 計算滑動的高度量
  `window.scrollY`: 向下滑動了多少px。
  `window.innerHeight`: 目前視窗範圍的高度px。
2. 計算視窗底部目前滑動到畫面的哪個高度位置
  `window.scrollY + window.innerHeight`
3. 計算圖片在視窗範圍中露出一半時的高度位置
  ==(目前視窗底部) - (圖片一半的高度)==
  `(window.scrollY + window.innerHeight) - sliderImage.height / 2;`

> 滑離圖片時移除動畫 => 目前圖片底部的位置

1. 圖片上緣與畫面頂端的距離 `sliderImage.offsetTop`
2. 圖片高度 `sliderImage.height`
3. 兩者相加就是目前圖片底部的位置。

### 將條件判斷獨立寫成boolean

> 將條件獨立寫出來成一個boolean值，方便後續維護時，較易了解當初判斷條件的設定想法。

```javascript
// 判斷是否要顯示圖片
const isHalfShown = slideInAt > sliderImage.offsetTop;
const isNotScrolledPast = window.scrollY < imageBottom;
```

### `debounce()`方法避免頻繁觸發事件

> 視窗的捲動效果觸發次數過於頻繁，套用作者預先寫好的`debounce()`減少觸發次數。

```javascript
// default: wait for 20 milliseconds
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}
```

參考資料: [網頁 DOM 事件的效能優化：Debounce 和 Throttle](http://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html)