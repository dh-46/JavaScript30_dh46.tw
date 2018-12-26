---
title: 30 days JS--Day8_Fun with HTML5 Canvas
date: 2018-12-25 15:00:30
tags:
    - notes
    - javascript
    - canvas
categories:
    - 30_days_JS
---
# Day8_Fun with HTML5 Canvas

## 目標

利用HTML5 Canvas製作一個簡易的畫圖網頁。

## 設計步驟

1. HTML中新增``<canvas></canvas>``
2. 取得canvas物件(畫布)、canvas context(畫筆)
3. 設定canvas & ctx(畫筆) & 需要的變數。
4. 綁定滑鼠的傾聽器
5. 設計繪圖function。
6. 加上畫筆顏色變化與粗細。

## 筆記

### Canvas

Canvas是HTML5新增的元素，可以讓我們利用JS在該元素上繪製圖片。
首先HTML的部分要有``<canvas></canvas>``，接下來則是由JS的程式來繪製。

[MDN Canvas](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial)

1. 取得Canvas物件(畫布)
2. 取得Canvas Context (畫筆)
3. 設計畫布/繪圖元件與其他操作。

#### 如何取得 Canvas物件(畫布)

- 可透過``querySelector()``等方式取得。
- ``.width``、``.height`` 取得或修改畫布大小
- 將Canvas的畫布大小設定為視窗的大小。

  ```javascript
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ```

#### 如何取得 Canvas繪圖物件 (畫筆)

- 2D: ``getContext('2d')``
- 3D: ``getContext('3d')``

#### 調整Canvas繪圖物件的參數

- ``.strokeStyle = '#BADA55';`` 設定畫筆顏色

- ``.lineJoin = 'round'``每次繪圖的線段交會的形狀
  MDN定義: determines the shape used to join two line segments where they meet.  
  參數: "bevel" 切平? || "round" 圓角 || "miter" 銳角

- ``.lineCap = 'round'`` 每線段繪圖的結尾形狀
  MDN定義: determines the shape used to draw the end points of lines.
  參數: "butt" (預設值，直角) || "round" 圓角 || "square" 在端點加上等寬但半高的正方形

- ``lineWidth = '12'`` 畫筆粗細
  單位為pixel

#### 畫圖

- ``.beginPath();`` 開始畫圖
- ``.moveTo(lastX,lastY);`` 線段起點
- ``.lineTo(e.offsetX,e.offsetY);`` 線段結束
- ``.stroke();`` 下stroke()之後才會真正畫出!!

### EventListener

由於繪圖的事件觸發條件，為滑鼠點按住且移動的時候。因此在設計傾聽器時，必須針對``mousemove``、``mounsedown``、``mounseup``、``mounseout`，四種狀態來設計。

1. ``mousemove`` : 滑鼠移動
2. ``mousedown``: 按下滑鼠
3. ``mouseup`` : 放開滑鼠
4. ``mouseout``: 滑鼠離開

### Custom Flag

```javascript
// 設定一個flag作為滑鼠點擊著狀態的識別
let isDrawing = false;
// 3. 畫筆遞增或遞減的判斷
let direction = true;
```

#### 用來判斷滑鼠的點擊狀態。

  當滑鼠並未點擊的時候為false，自訂的繪圖Function將直接return。

  ```javascript
  function draw(e){
    // 當狀態非滑鼠按著的時候，不畫圖，return!
    if (!isDrawing){ return;}
  }
  ```

#### 畫筆遞增或遞減的判斷

  當畫筆值達到設定值時，透過boolean值來決定遞增或遞減。

  ```javascript
  // 調整畫筆粗細
  // 當畫筆粗度100就遞減，反之遞增
  if (ctx.lineWidth >= 40 || ctx.lineWidth <= 2) {
      direction = !direction;
  }
  
  if (direction) {
      ctx.lineWidth++;
  } else {
      ctx.lineWidth--;
  }
  ```

### hsl();

- 畫筆顏色動態變色 => ``hsl(hue, saturation, lightness)``
- hue 為 0~360 整個色譜一圈 超過360就像度數一樣會直接回到紅色重新開始

```javascript
// 2. 畫筆顏色
let hue = 0;
function draw(e){
    // ...
    ctx.strokeStyle = `hsl(${hue}, 100% , 50%)`;
    // ...
    // 讓畫筆顏色隨點按變化
    hue++;
}
```

### 問題_1: 線段起始點相同的問題。

因為預設的起點值0,0，導致線段起點都相同。  

解法: 在``mousedown``事件觸發時，將該點設為該線段的起點。

```javascript
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
```

### 問題_2: 線段都一直是同一條線，沒有斷開。

在繪圖Function中，當``.stroke()``畫出後，修改起點為滑鼠的offset值。

_這裡使用到 ES6: destructoring an array_

```javascript
[lastX, lastY] = [e.offsetX, e.offsetY];
```
