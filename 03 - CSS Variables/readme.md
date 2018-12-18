---
title: 30 days JS--Day3_CSS Variables
date: 2018-12-18 18:39:00
tags:
    - css
    - notes
    - "css variables"
    - js_querySelect
    - js_const
categories:
    - 30_days_JS
---

# Day 3_CSS Variables
## 練習目標
讓使用者透過range slider與color picker，變更圖片padding、blur、color。

## 主要步驟
將問題拆解成兩個部分:
- 了解CSS原生變數的使用方式
- 透過JS動態調整CSS
    + 取得所有inputs ``document.querySelectorAll();``
    + 設計handleUpdate 函式
    + addEventListener收取input變更時的事件
    + 透過自訂data-attribute解決JS取得的數值只有數字的問題(prefix & suffix)
    + 透過style.setProperty變更CSS

## 重點筆記

### CSS: variables
- 可以宣告在任一元素上 ``--變數名稱: 值``
- 在練習中宣告在:root上，類似宣告在HTML element上
- 也有類似CSS cascade的效果，愈近的蓋過愈遠的。
- 當兩個參數時``var(--變數名稱, red)``，第二個值為預設值(可同樣為變數或是一般值)。

```css
/* 宣告 */
:root {
    --my-color: #fff;
    --myFont: 'Times New Roman';
    --defaultColor: yellow;
}
/* 使用 */
h1 {
    color: var(--my-color);
    font-family: var(--myFont);
}

/* 帶入兩個參數，第二個參數為預設值。 */

.test1 {
    color: var(--my-color, var(--defaultColor));
    font-family: var(--myFont, '微軟正黑體');
}

h3 {
    color: var(--my-color, var(--defaultColor, red));
}
```

### JS: querySelectorAll(); 選取多個元素
- 會回傳一個靜態的 NodeList。
- 注意回傳的是NodeList而非Array!
    + 從dev tool的console中看nodelist的_proto_會發現只有幾個方法
    + 但Array很多方法。
- 透過forEach方法存取nodelist

```javascript
// 語法結構
elementList = parentNode.querySelectorAll(selectors);

// 回傳所有h1的元素 (可複習一下CSS selector)
var test2 = document.querySelectorAll('h1');
// 回傳class = note || alert 的元素
var matches = document.querySelectorAll("div.note, div.alert");

forEach(function useElement(match) {
    console.log(match);
});

// 複習: querySelector
var test1 = document.querySelector('.test1');
```

### JS: addEventListener
- 綁定事件傾聽器
- 參數一: [event](https://www.w3schools.com/jsref/dom_obj_event.asp)
    + change/mousemove/click/drag/focus...etc.
- 參數二: 事件觸發時要執行的function
- 參數三: (選填)指定事件觸發在capturing phase或bubbling phase。(預設為false => bubbling)
    + 先捕捉再冒泡
- 
```javascript
// 基本語法
element.addEventListener(event, function, useCapture);

var test1 = document.getElementById("test1");

test1.addEventListener('click', function(){
    // do something when event occured
}, false);

// remove
element.removeEventListener(event, function, useCapture);
```

### JS: forEach
- 尋訪該nodelist或array中的元素
- 陣列或NodeList都可使用
    - 雖然 NodeList 不是 Array，但仍可以使用 forEach() 方法來進行迭代。
- [NodeList.forEach();](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)

```javascript
// 陣列的forEach
array.forEach(function(currentValue, index, arr), thisValue);

// NodeList
var node = document.createElement("div");
var kid1 = document.createElement("p");
var kid2 = document.createTextNode("hey");
var kid3 = document.createElement("span");

node.appendChild(kid1);
node.appendChild(kid2);
node.appendChild(kid3);

var list = node.childNodes;

list.forEach( 
  function(currentValue, currentIndex, listObj) { 
    console.log(currentValue + ', ' + currentIndex + ', ' + this); 
  },
  'myThisArg'
);
```

### JS: Arrow Function (ES6)
>箭頭函式運算式（arrow function expression）
>擁有比函式運算式還簡短的語法。它沒有自己的 this、arguments、super、new.target 等語法。


### HTML: data-attribute 自訂屬性
- HTML裡的自定義資料屬性名稱開頭為data- 。
- 後面則只接受字母、數字。
- 還有以下的符號: dash (-), 點 (.), 冒號 (:), 底線(_) -- 
- 但不包含任何ASCII 大寫字母(A 到 Z)。

```html
<input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px" data-test1="test1value">
```

### JS: dataset object 自訂屬性物件
- 存取自訂的data屬性
- 所有data-開頭的屬性都會被放到這個物件
- 不用使用屬性選擇出來，本來就存在


```javascript
var test1 = document.querySelector('#spacing');
// 取得自訂data-屬性中的data-sizing值
var dataSizing = test1.dataset.sizing;
console.log(dataSizing);
```

### JS: document.documentElement
- 回傳目前文件（document）中的根元素（Element）=> HTML 文件中的 <html> 元素。
- 
```javascript
var rootElement = document.documentElement;
```

### JS: setProperty();
- 動態產生或設定該元素的CSS property
- 透過style取得style物件
- 第三個參數可有可無

```javascript
var test1 = document.querySelector('.test1');
test1.style.setProperty("color","red","important");
```

### 補充: JS變數的宣告方式

- [Closure](https://openhome.cc/Gossip/ECMAScript/Closure.html): 
    + Closure 是擁有閒置變數（Free variable）的運算式。
    + 支援 Closure 的程式語言通常具有一級函式（First-class function）。
    + 建立函式不等於建立 Closure 。
    + 如果函式的閒置變數與當時環境綁定，該函式才稱為 Closure。

```javascript
function doSome() {
    var x = 10;
    function f(y) {
        return x + y;
    }
    return f;
}

var foo = doSome();
console.log(foo(20));  // 30
console.log(foo(30));  // 40

// 函式 f 建立了一個 Closure
```
>Closure 是個捕捉了外部函式變數（或使之繼續存活）的函式。在上例中，函式 f 建立了 Closure，因為它將變數 x 關入（close）自己的範圍，這也是 Closure 這個名稱的由來。如果形成 Closure 的函式物件持續存活，被關閉的變數 x 也會繼續存活。就像是延續了變數 x 的生命週期。

[Closure by Openhome.cc](https://openhome.cc/Gossip/JavaScript/Closure.html)


#### 宣告的種類
- const (ES6) : 
    + 必須明確指定值。
    + 被指定值之後，就不可以再指定其他的值。
- let (ES6) : 
    + 存活在指定的區塊範圍內。
    + 不指定值的話，該變數會是 undefined。
    + 在全域範圍使用 let 宣告變數，變數並不會成為全域物件的特性。
    + 可以使用 {} 來定義區塊
- var (variable)

```javascript
// let 變數
if (true){
    let x = 10;
}
// 會編譯失敗，因為這裡的let只活在if{}中
console.log(x);

//-------------------

// const
const y = 10;
console.log(y);
const z;
// z => undefined 

//-------------------
var a = 109;
console.log(a+a);
```

#### 複習: 全域變數與區域變數
    - 全域變數可被所有的JS存取。
    - 區域變數僅能被該function所存取。
    - 全域變數與區域變數若名稱相同，仍代表不同變數。
 