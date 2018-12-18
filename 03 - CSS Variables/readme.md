---
title: 30 days JS--Day3_CSS Variables
date: 2018-12-18 12:28:00
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
- 可以宣告在任一元素上
- 在練習中宣告在:root上，類似宣告在HTML element上
- 也有類似CSS cascade的效果，愈近的大於愈遠的。

### JS: querySelectorAll();
- 回傳的是NodeList而非Array!
    + 從dev tool的console中看nodelist的_proto_會發現只有幾個方法
    + 但Array很多方法。

### JS: addEventListener

### JS: forEach

### JS: Lambda

### HTML: data-attribute 自訂屬性

### JS: dataset object 自訂屬性物件
- 所有data-開頭的屬性都會被放到這個物件
- 不用使用屬性選擇出來，本來就存在

### JS: document.documentElement.style.setProperty

### 補充: JS變數的宣告方式

## 延伸閱讀

[]()    