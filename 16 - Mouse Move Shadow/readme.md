---
title: 30 days JS--Day16_Mouse Move Shadow
date: 2019-02-04 22:47:30
tags:
    - notes
    - javascript
categories:
    - 30_days_JS
---
# Day16_Mouse Move Shadow

範例網站是一個有簡易的菜單的餐廳網頁，使用者可以  

1. 新增菜單項目並勾選。 => Event Delegation
2. 當畫面重整時，新增或勾選的項目將存在，不因畫面重整而消失。 => Local Storage

## 步驟

### 1. 變數宣告

```javascript
// 1. 取得表單(接收輸入)與條列元素(輸出)
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

// 2. 收集到的菜單項目，儲存於陣列中(物件陣列)
const items = [];
```

### 2. 替表單綁定事件傾聽器。

> 為甚麼聽submit而非click? 
> 當使用者Enter送出或是直接點選按鈕，submit都能全部捕捉，相對click事件較全面。

```javascript
addItems.addEventListener('submit', addItem);
```

### 3. `addItem()`: 新增項目的功能。

- 阻止送出時畫面重整。 `e.preventDefault();`
  - 表單default設定會發送到後端，所以有畫面重整。利用preventDefault來阻止畫面重整。
- 建立物件: 儲存單一項目的文字、勾選狀態。(ES6寫法)
- 取得輸入的文字內容。
  - 與其使用全域的document去select，不如使用this代表被加上傾聽器/發生事件的表單。(縮小搜尋範圍)
- 將完成的物件放入items陣列中儲存
- 重新render整個清單
  - 由於這個方法是重新render整個清單，若擔心效能問題，可再上網搜尋或是使用react/angular等框架
- 呼叫表單的reset()，清除表單欄位。

```javascript
function addItem(e){
    // 阻止送出時畫面重整
    e.preventDefault();

    // 取得輸入的文字內容
    const text = (this.querySelector('[name=item]')).value;

    // 建立物件
    const item = {
      text, // 這裡是ES6寫法: 省略傳統的 text: text
      done: false
    }

    // 將完成的物件放入items陣列中儲存
    items.push(item);

    // 產生清單 
    populateList(items, itemsList);

    // 呼叫表單的reset()，清除表單欄位。
    this.reset();

    // 儲存至LocalStorage: Key:Value 對應 (字串格式)
    localStorage.setItem('items', JSON.stringify(items));
  }

```

### 4. `populateList(plates = [], platesList)`: 產生清單HTML。

> 建立產生listHTML的function 

1. 引數 plates: 清單物件陣列，預設為空陣列，確保未傳入引數時不會出錯誤
2. 為什麼使用兩個引數而非直接存取上面兩個全域變數?
  => 增加程式的可維護性與擴充性，當未來要在增加一個清單可直接只用此方法。
3. `map()` 利用map方法將plates中的個別物件轉換成html tag後放入platesList中。
  呼叫匿名函式取出每個plate與其index。
4. 回傳html字串 (使用template string帶入資料)
5. HTML的checked attribute無論是否設為true/false，只要該屬性存在就會被視為勾選，因此使用三元運算式來決定是否設定該屬性。
6. `join()`: 因map回傳是新陣列，所以呼叫join()轉成一長字串，才能放入。


> 補充: Checkbox的taco圖案是利用CSS隱藏原生的元素，再置換成自訂的符號。

```javascript
function populateList(plates = [], platesList) {
    platesList.innerHTML  = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''}/>
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
}
```

利用map方法將plates中的個別物件轉換成html tag後放入platesList中

### 5. 儲存至LocalStorage。

```javascript
// 儲存至LocalStorage: Key:Value 對應 (字串格式)
// 使用JSON.stringify() 轉換
localStorage.setItem('items', JSON.stringify(items));
```

### 6. 畫面載入時讀取LS中的資料。

1. 修改items宣告。若LocalStorage中有資料則使用，反之則用空陣列。
2. 呼叫`populateList(plates = [], platesList)`方法Render畫面。

```javascript
const items = JSON.parse(localStorage.getItem('items')) || [];
populateList(items, itemsList);
```

### 7. 替Checkbox綁定事件傾聽器。Event Delegation

> 在這個例子，若直接針對checkbox加上listener，當程式執行時，checkbox本身可能尚未產生，因此無法接收該事件。  這樣的情況，當然可以透過調整程式順序，或是透過解除綁定在重綁的方式處理。  但更好的方式是利用**Event Delegation**。

```javascript
// 替Checkboxes的父元素itemList加上傾聽器。
itemsList.addEventListener('click', toggleDone);
```

### 8. `toggleDone(e)`

> Checkbox切換時動態變更物件陣列中的資料。

```javascript
function toggleDone(e) {
    // 單純點選會選到label與input，若點選選項中間甚至會選到li。(因為都是itemList下的子元素)
    if (!e.target.matches('input')) {
      // 利用matches('ELEMENT') API 跳過非input的元素
      return;
    }
    // 利用預先設計的data-index來對照物件陣列中的物件，並修改其done屬性
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done; // 像開關一樣的邏輯
    localStorage.setItem('items', JSON.stringify(items));  // 改完了記得放進LS
    // populateList(items, itemsList); // 重新渲染畫面
}
```

### Plus: 增加刪除功能

```javascript
// DH46_handle checkboxes and item delete
function handleItemClick(e) {
  const el = e.target;
  const index = el.dataset.index;
  
  if (el.matches('input')) {
    // switch the checked status
    items[index].done = !items[index].done;
  } else {
    if (el.matches('span')) {
      // remove the selected one
      items.splice(index, 1);
    } else {
      return;
    }
  }
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

// itemsList.addEventListener('click', toggleDone);
itemsList.addEventListener('click', handleItemClick);
```

[MDN: Array.splice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

## 筆記

### Local Storage

1. 原生物件，存在於本機端。
2. computer by computer/browser by browser/domain by domain。
3. key/value形式儲存。
4. 若直接儲存items會出現"[object Object],[object Object]"
  => 因為LS的value只能儲存string，它會自動呼叫toString()。

> 補充: 物件陣列如果直接toString() => 一樣會"[object Object],[object Object]"

[MDN: Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Event Delegation (解決事件重複綁定)

1. responsible parents and negeligent children
2. 找到該checkbox的父元素(在綁定階段就存在的元素)，為它加上傾聽器，讓他負責將該事件發生時要做的事情，傳遞給在它下面的子元素。
3. 利用`e.target`以及自己設計的data-*等技巧，可以更好掌握要觸發控制的元素。

[為什麼有時你應該優先考慮 event delegate 而不是 event binding](https://ithelp.ithome.com.tw/articles/10120565)

