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
        - ``const now = new Date();``
    2. ``setInterval(mySetTime,1000)``要每秒固定更新時間
    3. 先從秒針下手 
        - ``now.getSeconds()`` 取得現在的秒數
        - 透過算式換算每秒走幾度
        - 取得指針物件，改變目前指針的角度
            + 呼叫``style.transform = `rotate(${secondsDegrees}deg)`;``
            + 呼叫``style.transform = setRotateDeg(deg)`` & 呼叫自訂方法
    4. 時針分針與秒針步驟相同，但有三點要注意
        - 因為指針起始點的度數為90度，在動態增加度數時要在加上預設值90度。
        - 當指針走一圈時會彈回去
            - 因為預設角度為90度，當秒針走完一圈時(448->90)，對畫面而言是逆時針回90度，而非繞一圈回到起點，因此transition的動畫執行時會是閃一下的情況。
            - 解法: 讓指針不歸零
                ```css
                /* 動畫變形間隔 (配合JS將預設transition關閉) */
                /* transition: all 0.05s; */
                ```
                ```javascript
                function setRotateDeg(deg){
                    if (deg === 90) {
                      document.querySelector('.hand').style.transition = 'all 0s';
                    } else {
                      document.querySelector('.hand').style.transition = 'all 0.05s';
                    }
                    return `rotate(${deg}deg)`;
                  }
                ```
        - 原本教學影片中的時針與分針並無隨著秒針逐秒移動，透過下列公式調整可模仿一般時鐘走動。
            ```javascript
            // 修改公式
            const secondsDeg = 90 + ((seconds / 60) * 360);
            // 原本分針角度再加上每次秒針移動時所增加的角度 (每一分間隔為6度)
            const minsDeg = 90 + ((mins / 60) * 360) + ((seconds / 60) * 6);
            // 原時針角度再加上每次分針移動時所增加的角度 (每一時間隔為30度)
            const hoursDeg = 90 + ((hours / 12) * 360) + ((mins/60) * 30);
            ```
    5. 額外補充
        - 修改指針長度、顏色、位置
    
## 重點筆記: CSS

### transform 變形效果
- 能使元素產生 2D 或 3D 的變形效果。
- 基本的變形效果有 rotate, scale, translate, skew...等。

#### 旋轉 ``rotate(90deg)``
- 帶入相對應的角度就可使元素旋轉。
- 元素的九點鐘位置是預設的零度，預設是順時針旋轉。
- 旋轉預設的基準點是左上角。(X-axis = 0, Y-axis = 0);
- 通常搭配transform-origin使用。

| rotate(90deg)          | 2D旋轉         |
| rotate3d( x,y,z,angle) | 3D旋轉         |
| rotateX(angle)         | 3D旋轉/沿著X軸 |
| rotateY(angle)         | 3D旋轉/沿著Y軸 |
| rotateZ(angle)         | 3D旋轉/沿著Z軸 |


#### 縮放 ``scale(x,y)``
- 帶入的參數值是縮放倍數

| scale(x,y)     | 2D縮放         |
| scale3d(x,y,z) | 3D縮放         |
| scaleX(x)         | 3D縮放/沿著X軸 |
| scaleY(y)         | 3D縮放/沿著Y軸 |
| scaleZ(z)         | 3D縮放/沿著Z軸 |

#### 移動 ``translate``

| translate(x,y)     | 2D移動         |
| translate3d(x,y,z) | 3D移動         |
| translateX(x)         | 3D移動/沿著X軸 |
| translateY(y)         | 3D移動/沿著Y軸 |
| translateZ(z)         | 3D移動/沿著Z軸 |

#### 歪斜 ``skew``

- 元素歪斜變形
|skew(x-angle,y-angle)| 2D歪斜 | 
|skewX(angle)| 2D歪斜/沿著X軸 |
|skewY(angle)| 2D歪斜/沿著Y軸 |

### transform-origin(x,y,z) 變形起點
- 物件transform的起始點
- 記得網頁計算的基準點都是左上角
- 畫面旋轉的度數，9點鐘是0度/12點鐘是90度(順時針累加)
- transform-origin的預設值是50% 50% (分別代表X軸與Y軸上的位置)

|參數|可能值|
|---|---|
|x|left/center/right/length/%|
|y|top/center/bottom/length/%|
|z|length|

### transition 轉場動畫
- 設定轉場動畫的時間方式
- 底下還有這幾個子屬性
    - transition-property (定義哪些 CSS properties 會被轉場效果影響)
    - transition-duration (定義轉場所花費的時間)
    - transition-timing-function (轉場動畫發生的時間曲線)
    - transition-delay (多久之後開始發生轉場。)
- 預設值 ``transition: all 0s ease 0s;``

#### transition-timing-function 漸變函式
- 漸變函式可用來定義轉場發生的時間曲線。其規範方式是以四個參數的貝茲曲線代表。
- 可利用Chrome/開發人員工具，以拖拉方式調整變化。
- 預先定義好的參數
    + ease, 等同於 cubic-bezier(0.25, 0.1, 0.25, 1.0)
    + linear, 等同於 cubic-bezier(0.0, 0.0, 1.0, 1.0)
    + ease-in, 等同於 cubic-bezier(0.42, 0, 1.0, 1.0)
    + ease-out, 等同於 cubic-bezier(0, 0, 0.58, 1.0)
    + ease-in-out, 等同於 cubic-bezier(0.42, 0, 0.58, 1.0)

## 重點筆記: JavaScript

### setInterval(function, milliseconds)
- 週期性的執行指定的任務。

#### 如何執行
- 直接呼叫``setInterval(function, 1000);``
- 參數一: 任務可為匿名function或是呼叫定義好的function
- 參數二: 指定任務執行的間隔時間，以千分之一秒為單位。
- 預設會回傳一個Number，也就是該interval的ID。

#### 如何中止/結束
- 呼叫``clearInterval(intervalID);``
- 傳入的參數就是要被中斷的interval的預設回傳值

```javascript
// 啟動setInterval，同時拿到回傳值，並指定給變數myVar。
var myVar = setInterval(myTask, 1000);

function myTask() {
    // 每次要做的事
}

function myStopFunction() {
    // 結束interval
    clearInterval(myVar);
}
```

### Date() object 時間物件

#### getSecond/getMinutes
### JS: template string (ES6 樣板字串)

#### rotate

## 延伸閱讀

[W3SCHOOL](https://www.w3schools.com/csSref/css3_pr_transition.asp)
https://www.w3schools.com/csSref/css3_pr_transform.asp 
https://www.w3schools.com/csSref/css3_pr_transform-origin.asp 
https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions 