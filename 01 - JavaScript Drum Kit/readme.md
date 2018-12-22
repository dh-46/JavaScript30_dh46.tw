---
title: 30 days JS--Day1_Drum Kit
date: 2018-12-14 20:45:00
tags:
    - javascript
    - notes
    - css
    - eventListener
categories:
    - 30_days_JS
---

# Day 1_Drum Kit

## 練習目標

按下特定按鍵，對應的畫面方塊會有動畫與音效。

## 筆記

### 1. 取得keyCode ('keydown' event)

- 鍵盤上的每個按鍵都有對應的KeyCode，透過``keydown``事件傾聽，我們可以從回傳的物件中取得。
- 事件的觸發者為視窗，所以是在window加上傾聽器。

```javascript
window.addEventListener('keydown', function(e){
    // 這裡負責處理接收到對應的鍵盤輸入後，該做哪些事情。
    const keyCode = e.keyCode; // 被輸入的按鍵值
});
```

### 2. 取得並操作特定的audio element (querySelector & ES6 template string)

- `` `audio[data-key="${e.keyCode}"]` `` 使用ES6 Template String & CSS Selector，直接將接收到的keyCode值帶入。
- 運用if判斷是否有該audio元素。
- ``audio.currentTime = 0;``  解決重複點選音效時的遲滯，不需等音效播完，而是直接重新播放。

```javascript
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

if (!audio) return;
audio.currentTime = 0;
audio.play();
```

> 補充: 這裡有使用到 HTML data- (自訂屬性) 存放對應的KeyCode。

### 3. 取得畫面上要操作的元素並加上CSS class (querySelector & classList)

```javascript
const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
key.classList.add('playing');
```

> 補充其他CSS function函數
> ``key.classList.remove('playing');``
> ``key.classList.toggle('playing');``

### 4. 動畫執行的秒數控制 (如何讓動畫效果點按後消失?) (transitionend event)

- 透過transition事件結束，觸發移除'playing' class。

```javascript
  // 加上傾聽器傾聽每個key div動畫結束的事件
  const keys = document.querySelectorAll('.key');
  
  function removeTransition(e){
    // e 代表event
    //console.log(e);
    this.classList.remove('playing');
  }

  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
```

> 原本的動畫是由CSS transition所控制，若這裡使用JS進行控制，當CSS有修改時JS也必須同步修改，否則會不同步。
