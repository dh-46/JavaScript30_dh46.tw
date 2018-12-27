---
title: 30 days JS--Day9_Dev Tools Domination
date: 2018-12-27 17:00:30
tags:
    - notes
    - devTools
    - console
categories:
    - 30_days_JS
---
# Day9_Dev Tools Domination

## 目標

熟習開發者工具與Console的方法使用。

## 筆記

### 開發者工具: Break on

動畫/JS執行時呼叫debugger。

例: 練習網頁中點選文字會放大與變色，想知道實際執行的JS段落。

可右鍵點選該元素，選擇break on/attribute modification。

### REGULAR 一般用法

最一般的log顯示方式，就不多加解釋了。XD

``console.log();``

### INTERPOLATED 帶入文字或參數

1. 使用 %s

``console.log('Hello I\'m %s string!', 'Daniel');``

2. 使用ES6的Template String

```javascript
var var1 = 'Daniel';
console.log(`Hello! This is ${var1}!`);
```

### STYLED 加上CSS文字樣式

只要在文字前加上``%c``，並在第二個參數中輸入CSS字串，就可使Console文字有CSS效果。

```javascript
console.log('%c I am some great text', 'font-size:50px; color:red; background:blue; text-shadow: 10px 10px 0 white');
```

### WARNING 警告

會以黃色的方式呈現，且提供連結追蹤至警告的程式碼。

``console.warn('Oh Sh*t!');``

### ERROR 錯誤

會以紅色的方式呈現，且提供連結追蹤至錯誤的程式碼。

``console.error('Buuuuug!');``

### INFO 資訊

就真的只是顯示的log前面有個i的圖案而已。

``console.info('info啦');``

### TEST 測試

當前面的參數判斷為False時，後面的才會執行。

``console.assert(1 === 2 , 'Wrong!');``

### CLEAR 清除log

有些瀏覽器會預設阻擋clear方法呼叫，可從開發者工具中的設定解除。

``console.clear();``

### VIEW DOM ELEMENTS 查看DOM元素

原本的console.log只會以一般文字顯示，但使用``.dir();``則會顯示整個物件的方法與內容等資訊!

```javascript
const p = document.querySelector('p');
console.dir(p);
```

### GROUP 群組顯示log

只要在要被群組的log們前面加上``console.group(群組名稱);``，並在要結尾的段落加上``console.groupEnd(群組名稱);``。該圈起來的段落會以群組呈現，名稱為自訂的群組名稱。  

另外，換成``console.groupCollapsed(群組名稱);``開頭的話，則是會有預設收合群組的效果。

```javascript
dogs.forEach( dog => {
    console.groupCollapsed(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} year old`);
    console.log(`${dog.name} is ${dog.age * 7} dog year old`);
    console.groupEnd(`${dog.name}`);
});
```

### COUNT 計算出現次數

計算該文字/數字/DOM/Obj 使用的次數。

```javascript
console.count('Hello');
console.count('Hello');
console.count('Hello');
console.count('Noooo');
console.count(13);
console.count('Noooo');
console.count(13);
console.count('Hello');
```

### TIMING 計算該方法執行花了多少時間

用法類似GROUP，都需要開頭與結尾的指令。

```javascript
console.time('Timing Test');
console.groupCollapsed('Count to 100');
for (var i=0; i<=100; i++){
    console.log(i);
}
console.groupEnd('Count to 100');
console.timeEnd('Timing Test');
```

### TABLE 表格

讓陣列或nodeList等資料以表格方式呈現在log中。

``console.table(dogs);``