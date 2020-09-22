// 动画封装函数
// 封装函数三要素 功能 参数 返回值
// obj  target _time均为形参
function animate(obj, target, _time, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, _time)
}