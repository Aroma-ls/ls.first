window.addEventListener('load', function () {
    // 1.获取元素
    var focus = document.querySelector('#focus_1');
    var ul = focus.querySelector('ul');
    var lis = focus.querySelector('ul').querySelectorAll('li');
    var ol = document.querySelector('.focus_dots');
    var focusWidth = focus.offsetWidth;
    var num = 0;
    var focus_1_l = document.querySelector('.focus_1_l');
    var focus_1_r = document.querySelector('.focus_1_r');
    var circle = 0;
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
            var serial = this.getAttribute('serial');
            num = serial;
            circle = serial;
            animate(ul, -serial * focusWidth);
        })

    }
    ol.children[0].className = 'circle';
    // 5.克隆第一张图片
    // 克隆 ul 的第一个 li 
    // cloneNode()   小括号里面如果是 ture 则为深克隆  不写或者 false 为浅克隆
    // 深克隆复制他本身和其里面的所有节点，浅克隆只复制其本身
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6.点击右侧按钮图片向后播放一张
    focus_1_r.addEventListener('click', function () {
        // 如果走到了最后一张复制的图片 此时我们的 ul 要快速复原 left 值改为 0
        if (num == lis.length) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth, 15);
        // 7.点击右侧按钮，小圆圈跟随变化
        // 再声明一个变量 circle ,每次点击自增 1 （ 因为左侧按钮也需要这个变量，所以声明为全局变量 ）
        circle++;
        // 我们有 n 张图片，但是只有 n-1 个小圆圈，所以要加一个判断条件
        // 如果 circle == ol.children.length 说明走到了最后这张我们克隆的图片 我们就复原
        if (circle == ol.children.length) {
            circle = 0;
        }
        circlChange();
    })
    // 8.左侧按钮
    focus_1_l.addEventListener('click', function () {
        // 如果走到了最后一张复制的图片 此时我们的 ul 要快速复原 left 值改为 0
        if (num == 0) {
            num = lis.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth, 15);
        // 点击左侧按钮，小圆圈跟随变化
        // 再声明一个变量 circle ,每次点击自增 1 （ 因为左侧按钮也需要这个变量，所以声明为全局变量 ）
        circle--;
        // 我们有 n 张图片，但是只有 n-1 个小圆圈，所以要加一个判断条件
        // 如果 circle < 0 说明走到了第一张图片 则改成最后一个小圆圈（ ol.children.length-1 ）
        // if (circle < 0) {
        //     circle = ol.children.length - 1;
        //     circlChange();
        // }
        // 优化可以用三元表达式
        circle = circle < 0 ? circle = ol.children.length - 1 : circle;
    })
    // 因为左右按钮都需要小圆圈的排他函数，因此单独封装一个函数，调用即可
    function circlChange() {
        // 先清除其他小圆圈的 circle 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 再留下当前小圆圈的 circl 类名
        ol.children[circle].className = 'circle';
    }
    // 9.自动播放模块
    // 添加一个定时器
    var timer = setInterval(function () {
        // 手动调用点击事件
        focus_1_r.click();
    }, 2000);
    // 鼠标经过 focus 停止定时器
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer); // 清除定时器变量
    })
    // 鼠标离开 focus 启动定时器
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            // 手动调用点击事件
            focus_1_r.click();
        }, 3000);
    })
})