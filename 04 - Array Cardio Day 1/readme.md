---
title: 30 days JS--Day4_Array Cardio
date: 2018-12-21 17:12:00
tags:
    - notes
categories:
    - 30_days_JS
---
# Day 4_Array Cardio
## 練習目標
JS陣列方法與操作練習。
作者總共提供了八題的練習題目，以及三個預設的陣列資料。而練習題將分別使用到陣列的操作方法。

### 資料

```javascript
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

```

### 題目

1. 篩選出16世紀出生的發明家。
2. 印出一個發明家姓名的陣列。
3. 將發明家陣列從老到年輕排序。
4. 算出全部發明家的年齡加總。
5. 以年紀排序發明家陣列。
6. 建立一個陣列，裡面有所有巴黎的街道且名稱包含'de'。
7. 將people陣列以姓氏的A~Z排序。
8. 計算data資料中各項目出現的次數。

## 重點筆記

### 1. filter(callback func, thisArg)

> filter 會持續的loop出這個陣列內的內容，並將該內容以參數方式傳入呼叫的匿名函式。最終回傳被匿名函式處理過的陣列。

- callback func (執行的匿名函式): 用來測試/處理陣列中的每個元素，回傳true代表保留到新陣列，false則不保留。
- 匿名函式參數:
    - element: 原陣列目前所處理的元素。
    - index(optional): 目前的index值。
    - array(optional): 呼叫filter方法的陣列。
- thisArg(optional): 執行 callback 回呼函式的 this 值。 

題目: 篩選出16世紀出生的發明家。
解法: 

```javascript
const fifteen = inventors.filter(function (inventor){
    if (inventor.year >= 1500 && inventor.year < 1600 {
        return true; // 條件通過，留著!
    }
});
```

ES6 Arrow function寫法

```javascript
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
```

### 2. map(callback func, thisArg);

> 是會處理該陣列並回傳出一個與被處理陣列相同長度的新陣列
> 像是一個機器將原料處理後，產出等量的商品

- callback Func: 產生新陣列之元素的回呼函式，可傳入三個參數
    - currentValue: 原陣列目前所迭代處理中的元素。
    - index (optional): 原陣列目前所迭代處理中的元素之索引。
    - array (optional): 呼叫 map 方法的陣列。
- thisArg (optional): 執行 callback 回呼函式的 this 值。
- return: 一個所有元素皆為回呼函式運算結果的新陣列。

題目: 印出一個發明家姓名的陣列。
解法:

```javascript
// 使用ES6的arrow function寫法
const firstNames = inventors.map(inventor => `${inventor.first} ${inventor.last}` );
    console.log(firstNames);
```

註: 姓名中間空格的字串組合有兩種寫法
1. ``inventor.first + ' ' + inventor.last``
2. `` `${inventor.first} ${inventor.last}` ``

### 3. sort(compareFunction);

> 取出陣列兩個比較，透過bubble sort的方式排序，符合條件的回傳1，反之回傳-1;
> 會原地（in place）對一個陣列的所有元素進行排序，並回傳此陣列。

- compareFunction (optional): 排序的條件函式。 若沒有指定，預設是將內容轉為字串並以unicode編碼來排序。
    - compareFunction(a, b) 回傳值小於 0，a 排在 b 前面。
    - compareFunction(a, b) 回傳值大於 0，b 排在 a 前面。
    - 如果是排序數字，可以使用a-b(升冪)或b-a(降冪)。
    - compareFunction(a, b) 在給予一組特定元素 a 及 b 為此函數之兩引數時必須總是回傳相同的值。若回傳值不一致，排序順序則為 undefined。

題目: 將發明家陣列從老到年輕排序。
解法:

```javascript
const ordered = inventors.sort(function (firstPerson, secondPerson) {
    if (firstPerson.year > secondPerson.year) {
    	// f 比 s 年輕 => s 排前面
    	return 1;
    } else {
    	return -1;
    }
});
```

```javascript
// arrow function + ternary operator(三元運算式) 寫法
const orderedArrow = inventors.sort((a,b) => a.year > b.year ? 1 : -1);
```

### 4. reduce(reducer Func, initValue);

> 可以跟前一個選項進行運算，要呼叫自訂的函式reducer。
> MDN: 將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值。 

- reducer Func 
    1. accumulator: 前一個參數，如果是第一個陣列的話，值是以另外傳入或初始化的值 (用來累積回呼函式回傳值的累加器（accumulator）或 initialValue)
    2. currentValue: 當前變數
    3. currentIndex: 當前索引
    4. array: 全部陣列
- initValue: 初始值 (若沒有提供初始值，則原陣列的第一個元素將會被當作初始的累加器)

P.S. reduce/filter/sort 基本上都是loop每一個陣列選項交給自訂的函式處理

題目: 算出全部發明家的年齡加總。
解法: 

```javascript
const totalYears = inventors.reduce((total, inventor) => {
      return total + (inventor.passed - inventor.year);
      // 第一次執行出現: [object Object]7859843780508967907681
      // => 因為第一次跑的時候沒有total，會是undefined+數字
    }, 0);
```

### 5. sort();

題目: 以年紀排序發明家陣列。
解法:
取得陣列中的前後物件後，分別算出該物件年齡再進行比較。

```javascript
const oldest = inventors.sort((a, b) => {
    // 前一個的年紀
    const lastOne = a.passed - a.year;
    // 後一個的年紀
    const nextOne = b.passed - b.year;
    return lastOne > nextOne ? -1 : 1;
    // if (lastOne > nextOne) {
    //   // 不調
    //   return -1;
    // } else {
    //   // last比較小 => 對調
    //   return 1;
    // }
});
```

### 6. querySelector & filter & map & includes

題目: 建立一個陣列，裡面有所有巴黎的街道且名稱包含'de'。
解法:
這題要在維基的網頁上執行。

1. 透過``querySelector()``拿到要操作的父元素。
2. 透過``querySelectorAll()``取得要操作的元素NodeList。
    註: querySelector 可以尋訪任何element下的子element
3. 呼叫``Array.from();``將NodeList轉成ArrayList。
    轉換還有另一個方法: ``[...category.querySelectorAll('a')];``
4. 拿到Array後，在透過``map()``轉成listName的陣列。(.textContent)
5. 最後，利用``filter() & includes()``篩選出含有'de'的陣列。

```javascript
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));

const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.includes('de'));
```

### 7. sort();

題目: 將people陣列以姓氏的A~Z排序。
解法:

1. sort的callback func擁有的引數其實就是``'Beck, Glenn'``
2. 利用``split()``解構``'Beck, Glenn'``，但會回傳陣列 ``["Becker", "Carl"]``。
3. 修改變數名稱``[last, first]``承接回傳的陣列。
4. 資料部分OK，就可以開始進行比較。
5. 取得要比較的兩個值的姓與名
6. 回傳三元運算式

```javascript
const alpha = people.sort(function (lastOne, nextOne){
    // 取得要比較的兩個值的姓與名
    const [aLast,aFirst] = lastOne.split(', ');
    const [bLast,bFirst] = nextOne.split(', ');
    return aLast > bLast ? 1 : -1;
});

// ES6版本
const alpha2 = people.sort((lastOne, nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ');
    const [bLast, bFirst] = nextOne.split(', ');
    return aLast > bLast ? 1 : -1;
});
```

### 8. reduce();

題目: 計算data資料中各項目出現的次數。
解法:

1. 讓reduce()的callback Func回傳一個物件，物件內有屬性item，其value就是該item的出現次數。
2. 每loop一次就是obj[item]++; => 代表該item出現一次。

```javascript
// a. 如果知道該陣列內有哪些類別的資料，可以在初始值的物件中先寫好 {car:0, van: 0}
const transportation2 = data.reduce((obj,item) => {
    obj[item]++;
    return obj;
}, {
    car:0,
    truck:0,
    bike:0,
    walk:0,
    van:0
});

// b. 反之，寫條件判斷
const transportation = data.reduce(function (obj, item){
    if (!obj[item]) {
        // 若該項不存在就初始化
        obj[item] = 0;
        // console.log(item);
    }
    obj[item]++;
    // console.log(obj[item]);
    return obj;
}, {});
```
