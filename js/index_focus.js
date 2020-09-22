window.addEventListener('load', function () {
    // 1.获取元素
    var focus = document.querySelector('#focus_1');
    var ul = focus.querySelector('ul');
    var lis = focus.querySelector('ul').querySelectorAll('li');
    var ol = document.querySelector('.focus_dots');
    // 2.动态生成小圆点
    for (var i = 0; i < lis.length; i++) {
        var dot = document.createElement('li');
        // 自定义属性值  element.setAttribute('属性名', '属性值' 属性值是变量时不用加 ‘’ )
        dot.setAttribute('serial', i);
        ol.appendChild(dot);
        // 3.被点击的小圆圈改变样式
        dot.addEventListener('mouseover', function () {
            // 此处的 事件声明要写在 for 循环当中  循环结束后的 dot 是最后一个点
            for (var i = 0; i < lis.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'circle';
            // 4.点击小圆圈滚动图片
            // 核心算法  小圆圈的索引号 * 图片宽度 作为 ul 的移动距离
            var focusWidth = focus.offsetWidth;
            var serial = this.getAttribute('serial');
            animate(ul, -serial * focusWidth);
        })
        ol.children[0].className = 'circle';
    }
})