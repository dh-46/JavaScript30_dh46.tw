---
title: 30 days JS--Day14_Javascript Reference VS Copy
date: 2019-01-30 10:47:30
tags:
    - notes
    - javascript
    - Reference
    - Copy
categories:
    - 30_days_JS
---
# Day14_Javascript Reference VS Copy

學習Javascript中基本型別、陣列、物件的引用(Reference)與複製(Copy)。

## 筆記

### 基本型態

> string, number, boolean, null, undefined

```javascript
// numbers
let age = 100;
let age2 = age;
console.log(age , age2);  // 100 100
age = 200;
console.log(age , age2);  // 200 100

// strings
let name = "DH46";
let name2 = name;
console.log(name, name2); // DH46 DH46
name = "DH45.tw";
console.log(name, name2); // DH45.tw DH46
```

#### 補充: Null, Undefined

1. null （空），屬於「object」型態的一種物件，用以明言表示無數值。
2. undefined （無定義），屬於「undefined」類型的一種物件，用以表示未初始化的值。

### 陣列複製

假設有一陣列:

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
```

若以基本型態的方式作複製，會有以下情況:

```javascript
const team = players;
team[3] = "Lux";
console.log(players, team);  // 兩個陣列都被修改了!?
```

事實上是修改同一個陣列，因為team不是一個陣列，而是一個指向players陣列的參考。  
所以不論指向給多少個變數，最終都會找回最原始的陣列物件去做修改。

#### `slice()`

> 利用splice方法切割後會回傳新陣列的特性。

```javascript
const team2 = players.slice();
team2[3] = "Taiwan"
console.log(team2);
console.log(players);
```

#### `concat()`

> 建立一個新陣列再concat舊陣列。concat() 方法被用來合併兩個或多個陣列。此方法不會改變現有的陣列，回傳一個包含呼叫者陣列本身的值，作為代替的是回傳一個新陣列。

```javascript
const team3 = [].concat(players);
team3[3] = "ThisIsTeam3";
console.log(team3); // 新陣列被修改
console.log(players); // 原陣列不變
```

#### ES6 Spread

> 利用ES6 Spread。

```javascript
const team4 = [...players];
team4[3] = "ThisIsTeam4";
console.log(team4);// 新陣列被修改
console.log(players); // 原陣列不變
```

#### `Array.from()` 

> Array.from() 方法。

```javascript
const team5 = Array.from(players);
team5[3] = "Team5";
console.log(team5);// 新陣列被修改
console.log(players); // 原陣列不變
```

### 物件複製

假設有一物件為:

```javascript
const person = {
  name: 'Wes Bos',
  age: 80
};
```

#### `Object.Assign()`

```javascript
// 引數1: 空物件; 2: 要複製的物件; 3: 要新增/修改的物件參數; 
const cap2 = Object.assign({}, person, {number: 99, age:20});
console.log(cap2);
console.log(person);
```

#### 利用 ES6 Spread 建立新物件

```javascript
const cap3 = {...person};
console.log(cap3);
console.log(person);
```

==注意! 以上的陣列與物件複製方法都是淺層複製==

### Object_Deep Clone

假設有一物件如下:

```javascript
const coolman = {
    name:'superman',
    age: 25,
    social: {
      facebook: '@testing1',
      instagram: '@testing2'
    }
}
console.log(coolman);

const coolman2 = Object.assign({},coolman, {name: 'ironMan'});
console.log(coolman2);
coolman2.social.facebook = 'helloWorld';
console.log(coolman, coolman2);
```

透過前述方法複製物件後，再修改裡面的屬性social物件，會發現新舊物件的屬性social都被修改!

#### Poor man's deep clone

> 透過JSON.stringify轉字串，再透過JSON.parse轉成物件。

==Wes Bos不推薦 (效能問題待確認)==

```javascript
const coolman3 = JSON.parse(JSON.stringify(coolman));
coolman3.social.facebook = 'Taiwan';
console.log(coolman3);
```
