---
title: 30 days JS--Day6_Type Ahead
date: 2018-12-24 16:31:30
tags:
    - notes
    - javascript
    - fetch
    - promise
    - regularExpression
    - spreadOperator
categories:
    - 30_days_JS
---
# Day6_Type Ahead

## 練習目標

將遠端JSON資料撈取回來整理成List，讓使用者可以透過搜尋框搜尋資料。

### 流程

1. 取得外部資料、搜尋框輸入的內容、要操作的元素。
2. 查詢的Function、顯示的Function
3. 組合完成。

## 筆記

### 取得外部資料 fetch();

- 瀏覽器內建API
- 會回傳一個 Promise物件
- 使用 then() => [MDN Promise.then()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

1. 這裡fetch回傳的是Promise物件，透過then方法回傳一個Response的原始資料(raw data)，而這個原始資料可以是image/music/json/...etc.
2. 那這邊我們知道遠端回來的是JSON，不過不能直接使用JSON.parse來解析，因為回傳回來的並不是真正我們要的JSON raw data。
3. 而是要再使用Response._prototye_.json()，並且該方法會再回傳一個Promise，之後再使用then()讓其callback參數，回傳真正的陣列data。

```javascript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
// 這裡的blob只是wes bos定的參數名稱，但是一般的 Blob（Binary Large Object）物件代表了一個相當於檔案（原始資料）的不可變物件。
```

> 補充: 如何把data的資料放進cities陣列?
> 1. 因為宣告為const所以不能直接 cities = data，要改cities宣告為let。
> 2. 使用cities.push? => 會變成二維陣列 cities = [[data],1,2,3,4];
>    因為push方法是將該參數放入陣列中。  
>    解: 使用ES6 Spread ... => cities.push(...data)  
>    [展開運算子 Spread Operator](http://eddychang.me/blog/16-javascript/45-spread-operator-rest-parameters.html) ... => "把一個陣列展開(expand)成個別數值"的速寫語法

### 搜尋框輸入的內容、要操作的元素

針對輸入框加上兩個事件傾聽器``change``、``keyup``。

```javascript
// 輸入框
const searchInput = document.querySelector('.search');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

// 清單顯示
const suggestions = document.querySelector('.suggestions');
```

### 查詢的Function

```javascript
// 篩選資料的方法
// 傳入要篩選的單字與原始資料
function findMatches(wordToMatch, cities) {
    // 回傳cities的子集合(搜尋結果?)
    return cities.filter(place => {
      // 處理是否有相符合的城市或州
      // 使用正規表示法(要過濾的字, 規則)
      // g => global; 
      const regX = new RegExp(wordToMatch, 'gi');

      // 其中為真便為真
      return place.city.match(regX) || place.state.match(regX);
    });
}
```

### 顯示的Function

當傾聽器的事件被觸發，會呼叫自訂的``displayMatches()``。

```javascript
function displayMatches(){
    // 拿到搜尋結果
    const matchesArray = findMatches(this.value, cities);
    // 改變畫面
    const htmlTags = matchesArray.map(place => {
      // highlight the search word
      // 這裡的this.value => 使用者輸入的字串
      // 找到使用者輸入的字串，然後換成有效果的span
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numWithComma(place.population)}</span>
        </li>
        `;
    }).join('');
    console.log(htmlTags);
    suggestions.innerHTML = htmlTags;
}
```

### 使用正規表示法為數字加上逗號

```javascript
function numWithComma(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```

- 參考資料 
    [MDN 正規表示法](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions)
    [程式人雜誌 (這篇講得比較清楚)](http://programmermagazine.github.io/201307/htm/article2.html)