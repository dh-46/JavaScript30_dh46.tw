---
title: 30 days JS--Day5_Flex Panel Gallery
date: 2018-12-20 11:16:00
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

``translateY()``沿著Y軸移動。

```css
.panel > *:first-child {
    /* panel底下的第一個子元素 */
    /* 隱藏第一個 => 擠到最上面 */
    transform: translateY(-100%);
}

.panel.open-active > *:first-child {
    /* panel底下的第一個子元素 */
    /* 顯示第一個 => 調回來 */
    transform: translateY(0%);
}
```

> BTW 這邊的動畫效果是因為作者有事先寫好transition的設定。  
> CSS selector 要多複習

### JS: addEventListener & classList.toggle()

1. ``querySelectorAll()``取得要操作的父元素。(NodeList)
    ```javascript
    const panels = document.querySelectorAll('.panel');
    ```
2. 利用``forEach()``取得要操作的元素，並加上Listener。
    ```javascript
    panels.forEach(panel => {
        panel.addEventListener('click', toggleOpen);
        panel.addEventListener('transitionend', toggleActive);
    });
    ```
3. Create Function for flexbox animation
    ```javascript
    function toggleOpen() {
        this.classList.toggle('open');
    }
    ```
4. Create Function for text animation (Slide-in)
    > 這裡要注意的是，字體是在flex結束後觸發的動畫，所以透過傳入引數e，取得e.propertyName來判斷是哪一個transitionend。另外，在不同瀏覽器的propertyName不同(Chrome是flex-grow/Safari是flex)，所以在條件上使用includes('flex')。
    ```javascript
    function toggleActive(e) {
        // console.log(e.propertyName);
        if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
        }
    }
    ```

> 補充: js function 有加括號表示執行