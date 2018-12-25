---
title: 30 days JS--Day7_Array Cardio Day 2
date: 2018-12-24 17:00:30
tags:
    - notes
    - javascript
    - array
categories:
    - 30_days_JS
---
# Day7_Array Cardio Day 2

## 練習目標

在這次的練習中，作者有提供兩個JSON陣列讓我們做練習。

```javascript
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];
```

## 筆記

### some() & every()

#### ``.some()``

- 陣列中只要有一個元素符合你要的條件，就會是true。

題目: 是否至少有一個人的年齡大於等於19歲?

```javascript

// 解法
const isAdult = people.some(function(person){
  // 傳入的這個函式: 檢查是否陣列中的每個項目都符合其條件
  const currentYear = (new Date()).getFullYear();
  if (currentYear - person.year >= 19 ) {
    return true
    };
});

// 改寫_2
const isAdult2 = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);

console.log({isAdult2});
```

> 補充: 變數兩邊加上{}，console.log會以物件方式呈現，可以看到變數名稱與值。

#### ``.every()``

- 陣列中必須每個元素都符合條件，才會是true。

題目: 是否每一個人的年齡都是大於等於19歲?

```javascript
const allAdult = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);

```

### find()

- 類似filter的作用，但是只會回傳第一個符合你查詢的item。

題目: 請找出ID為823423的留言。

```javascript
// 原寫法
const findId = comments.find(function(comment){
  if (comment.id === 823423) {
    return true;
  }
});

// 改寫
const findId2 = comments.find(comment => comment.id === 823423);

```

### findIndex()

- 找到符合該條件的陣列元素的index值。

題目: 請找出留言ID為823423的index，並刪除該筆資料。

1. 找出留言的index

    ```javascript
    // 取得index
    const index = comments.findIndex(comment => (comment.id === 823423));
    ```

2. 刪除該筆資料。(有兩招)

    - ``splice();`` changes the contents of an array by removing or replacing existing elements and/or adding new elements.
        - splice(開始切的index,結束切的index);
        ```javascript
        comments.splice(index,1);
        ```
    - ``slice();`` a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
        - [0|1|2|3|4] => slice(0,2) => 切出來的是 [0|1] => 從第一條線開始算啦
        - 要記得spread 因為slice回傳的也是陣列，沒有展開的話會是二維
        ```javascript
        const newComments = [...comments.slice(0, index),...comments.slice(index + 1)];
        ```