---
title: 30 days JS--Day10_Hold Shift to Check Multiple Checkboxes
date: 2018-12-27 18:00:30
tags:
    - notes
    - javascript
    - checkboxes
categories:
    - 30_days_JS
---
# Day10_Hold Shift to Check Multiple Checkboxes

## 目標

點選Checkbox並按下shift鍵，能夠全選指定的範圍。

## 步驟

這次的練習整體來說並不困難，因為並沒有使用到什麼新的技巧，需要注意的是一開始的設計邏輯需要思考清楚。  
若真的對於整個做法不太熟悉，建議可以先看完作者的教學影片後，再自己實作一遍哦！

### 1. 取得Checkbox的NodeList & addEventListener

取得要操作的checkbox元素群組後，利用``forEach``為每個選項加上``click``事件傾聽器，並指定事件觸發時呼叫自訂函式``handleChange``。  
這裡作者有說明為何不使用``change``事件，主要原因是使用``click``的話，不論使用滑鼠或鍵盤都可以接收到觸發事件。

```javascript
const checkboxes = querySelectorAll('.inbox input[type="checkbox"]');

// 同樣有使用ES6 Arrow Function
checkboxes.forEach( checkbox => {
    checkbox.addEventListener('click', handleCheck);
});
```

### 2. 設計自訂函式 ``handleCheck()``

``handleCheck()``是整個練習的核心，因此了解整個流程邏輯非常重要。  
整個函式的運作邏輯如下:

1. 設定外部變數 ``lastChecked``
  => 負責儲存沒有按著shift前的最後一個被選的選項
  => 它也就是接下來shift按下後的第一個選項。

  ```javascript
    let lastChecked;
    function handleCheck(e){
        //...
        lastChecked = this;
        //...
    }
  ```

2. 函式引入事件參數e，判斷shiftKey按下的T/F。

3. 判斷是否為shift按著 / checked的狀態
  ``if (e.shiftKey && this.checked)``
  T: 代表要執行多選，跑forEach() => 4.
  F: 代表不是shift按著的狀態，而且是uncheck觸發的事件。
  => 這一次被選的選項，都要被放入外部變數``lastChecked``中記著。

4. forEach與設定inBetween的boolean變數。
  利用forEach去尋訪每一個checkboxes，然後當判斷inBetween是true，在loop所有選項的時候，那些在中間的選項就要check。
  檢查到last/this就改成inBetween是true，在檢查到一次就改為false => 頭跟尾
  > 怎麼知道是在中間的? 
  > => 用index? 反向的選會很麻煩 
  > ==> 用boolean判斷 (inBetween)