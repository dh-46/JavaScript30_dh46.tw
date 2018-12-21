---
title: 30 days JS--Day5_Flex Panel Gallery
date: 2018-12-19 21:40:00
tags:
    - notes
    - CSS
    - flexbox
    - transition
categories:
    - 30_days_JS
---
# Day5_Flex Panel Gallery

## 練習目標

製作一個有畫面點擊互動的Gallery。
主要使用CSS flexbox、transition等技術。

## 重點筆記

### flex box 的應用

- 基本上flex是由flex container與flex item所組成。
- container 定義排列方式\方向
    - ``display: flex;``
    - ``flex-direction: row`` Item的排列方式與方向
        row / column / row-reverse / column-reverse
    - ``flex-wrap: wrap`` 要不要自動換列
        wrap / nowrap
    - ``flex-flow: row wrap;`` flex-direction & flex-wrap 的綜合
    - ``justify-content: center;`` 水平排列調整 (main axis主軸)
        center / flex-start / flex-end / space-around / space-between
    - ``align-items: center;`` 垂直排列調整 (cross axis切軸)
        center / flex-start / flex-end / stretch / baseline
    - ``align-content: center`` 垂直排列(如何分配item垂直的space)
        center / flex-start / flex-end / stretch / baseline
- flex item 排列的元素也可以是 flex container。
    - ``order: 1;`` 排列順序
    - ``flex-grow: 2;`` 該item相對其他的比例
    - ``flex-shrink: 0;`` 相對於其他的比例 (預設值為1,範圍在0~1?)
    - ``flex-basis: 200px;`` item的初始寬度
    - ``flex: 0 0 200px;`` flex-grow, flex-shrink, flex-basis 的綜合
    - ``align-self: center;`` 自訂該item的排列方式，會override父元素的align-items

[MDN Flexbox](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
[Flexbox.io](https://flexbox.io/)

練習裡的設定如下:

```css
.panels {
    /* 最外圍的flex container */
    /* panels is a flex container */
    display: flex;
}

.panel {
    /* 第二層 container 同時也是 item */
    /* panel is a flex item */
    /* its flex ratio is 1 */
    flex:1;

    /* item 也可以是 panel */
    display: flex;
    /* flex 方向調整 */
    flex-direction: column;
    /* 水平置中 */
    justify-content: center;
    /* 上下置中 */
    align-items: center;
}

/* Flex Children */
.panel > * {

    /* 上下水平展開 */
    flex: 1 0 auto;
    /* 讓它成為container */
    display: flex;
    /* 水平置中 */
    justify-content: center;
    /* 上下置中 */
    align-items: center;
}
```

### transform: translateY();

這邊的動畫效果是因為作者有事先寫好transition的動畫

### need to review CSS selector

### JS: addEventListener > transitionend

補充: js function 有加括號代表式啟動