---
title: 30 days JS--Day2_CSS+JS Clock
date: 2018-12-14 20:45:00
tags:
    - javascript
    - css
    - notes
categories:
    - 30_days_JS
---

# Day 2_CSS+JS Clock
## 練習目標
製作一個動態時鐘, 指針會隨著電腦時間走動。

## 主要步驟
將問題拆解成兩個部分:
- 指針在畫面上的移動CSS 動畫: transform & transition 屬性
    1. 試著讓秒針旋轉 ``transform: rotate(20deg)`` , 但是旋轉的基準點與正常指針不同
    2. 利用 ``transform-origin: 100%`` 調整指針旋轉基準點
    3. 調整指針至零點零分 ``transform: rotate(90deg)``
    4. 模擬指針移動的動畫, 而不是平滑的移動。
        ``transition-timing-function: cubic-bezier(0, 0.79, 0.91, 1.41);`` 
    5. 加上``transition: all 0.05s;``屬性，設定動畫間隔時間?

- 將Javascript所抓取的時間與CSS配合
    ==提醒: 記得每個階段都要適時利用``console.log("test1")``測試新建的function是否有正確被呼叫與執行哦!==
    1. 建立function負責取得現在時間
        - ``const now = new Date();
    2. ``setInterval()``要每秒固定更新時間
    3. 先從秒針下手 
        - ``now.getSeconds()`` 取得現在的秒數
        - 透過算式換算每秒走幾度
        - 取得指針物件，呼叫``style.transform = `rotate(${secondsDegrees}deg)`;``改變目前指針的角度
    4. 時針分針與秒針步驟相同，但有兩點要注意
        - 因為指針起始點的度數為90度，在動態增加度數時要在加上預設值90度。
        - 當指針走一圈時會閃一下?

## 重點筆記: CSS

### transform
- The transform property applies a 2D or 3D transformation to an element. 
- This property allows you to rotate, scale, move, skew, etc., elements.
- 這個練習使用的是rotate參數

### CSS: transform-origin
- 物件transform的起始點
- 記得網頁計算的基準點都是左上角
- 畫面旋轉的度數，9點鐘是0度/12點鐘是90度(順時針累加)
- transform-origin的預設值是50% 50% (分別代表X軸與Y軸上的位置)

### CSS: transition
### CSS: transition-timing-function

## 重點筆記: JavaScript
### JS: setInterval()
### JS: Date() object
#### getSecond/getMinutes
### JS: template string (ES6 樣板字串)

#### rotate

## 延伸閱讀