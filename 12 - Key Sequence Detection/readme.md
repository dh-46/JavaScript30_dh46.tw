---
title: 30 days JS--Day12_Key Sequence Detection
date: 2019-01-24 20:37:30
tags:
    - notes
    - javascript
    - slice
    - includes
    - join
categories:
    - 30_days_JS
---
# Day12_Key Sequence Detection

使用者輸入特定順序的按鍵，會產生特殊效果。最有名的就是盛行於1980~1990年代的Konami Code。像是以前GameBoy掌機時代的上上下下左右左右AB。XD

## 步驟

1. 設定傾聽器取得使用者輸入的按鍵
2. 設計密語字串與蒐集使用者輸入的陣列
3. 利用splice並搭配密語字串長度，來取得使用者最後輸入的特定序列。
4. 比對輸入內容與密語，比對成功呼叫cornify_add();外部函式效果。

```javascript
  const pressed = [];
  const secretCode = "helloworld";

  window.addEventListener('keyup', (e) => {
    console.log(e.key);
    // 將每個輸入放到暫存中
    pressed.push(e.key);
    // 剪下特定的陣列段落，負數代表從陣列末端往前切。
    // 開始的位置會永遠是最後面的位置, 結束的位置從一開始陣列未達到密語的長度，到最後會變成恆1。
    var startIndex = -secretCode.length-1;
    var endIndex = pressed.length - secretCode.length;
    console.log(startIndex + ":" + endIndex);
    pressed.splice(startIndex, endIndex);

    // 判斷PRESSED陣列內容是否與密語相符
    if (pressed.join('').includes(secretCode)) {
      console.log("You Got It!");
      cornify_add();
    }
    console.log(pressed);
  })
```

## 筆記

### Array: `slice(startIndex, endIndex);`

> 會回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy）。而原本的陣列將不會被修改。

- startIndex: 從哪一個索引（起始為 0）開始。
  - 負數代表從陣列末端開始 (E.g. -2 代表從最後兩個元素開始)
  - 預設值為0
- endIndex: 到哪一個結束slice，但不包含索引位置的那一個。
  - 負數代表從陣列末端開始
  - E.g. slice(1,4) 提取了陣列中第二個元素至第四個元素前為止
  - slice(2,-1) 代表拷貝陣列中第三個元素至倒數第二個元素
  - 省略了 end，則 slice 會提取至陣列的最後一個元素（arr.length）。
  - 假如 end 大於陣列的長度，slice 會提取至陣列的最後一個元素（arr.length）。

```javascript

var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
console.log(fruits.slice(1, 3));
// ['Orange','Lemon']

console.log(fruits.slice(-1));
// ["Mango"]

console.log(fruits.slice(-5,4));
// ["Banana", "Orange", "Lemon", "Apple"]

console.log(fruits.slice(-5));
// ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
```

### Array: `join(separator);`

> 合併陣列成字串。

- separator: 分隔字元，預設為逗點。(optional)

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.join());
// Banana,Orange,Apple,Mango

console.log(fruits.join(""));
// BananaOrangeAppleMango
```

### String/ Array: `includes(searchvalue/element, startIndex);`

>查詢字串/陣列中是否有指定的字串/Element存在，並回傳boolean值。 

- searchValue/element: 要找的字串或元素。
- startIndex: 從哪個位置開始找。(optional)

```javascript
var a = "Hello World";
console.log(a.includes("Hello"));
// true

console.log(a.includes("Hello", 6));
// false

var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.includes("Mango"));
// true
```