window.addEventListener('load', function() {
    // 固定导航栏到达小米秒杀时出现返回顶部模块
    var main = document.querySelector('.main');
    var goBack = document.querySelector('.goBack');
    var mainTop = main.offsetTop;
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= mainTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    // 点击返回顶部按钮时回到顶部
    goBack.addEventListener('click', function() {
        // 调用动画函数
        animate(window, 0);
    });
    // 回到顶部动画函数
    function animate(obj, target, callback) {

        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        // 定时器
        obj.timer = setInterval(function() {
            // 步长变化
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // 如果到达目标值停止动画
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
                callback && callback();
            };
            window.scroll(0, window.pageYOffset + step);
        }, 15);

    };


    // 轮播图制作开始
    var swiper_wrapper = document.querySelector('.swiper-wrapper');
    var allow_l = document.querySelector('.allow-l');
    var allow_r = document.querySelector('.allow-r');
    var swiperWidth = swiper_wrapper.offsetWidth;
    // 鼠标经过时停止动画
    swiper_wrapper.addEventListener('mouseenter', function() {
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    // 鼠标离开时手动调用动画
    swiper_wrapper.addEventListener('mouseleave', function() {
        // 自动播放轮播图
        timer = setInterval(function() {
            allow_r.click();
        }, 2000);
    });
    // 动态生成小圆圈
    var ul = swiper_wrapper.querySelector('ul');
    var ol = swiper_wrapper.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 给小圆圈添加点击事件 排他思想
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'circle-current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate1(ul, -index * swiperWidth);
        })
    };
    ol.children[0].className = 'circle-current';
    // 克隆第一张图片放在ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    // 点击右边按钮图片变换
    allow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            };
            num++;
            animate1(ul, -num * swiperWidth, function() {
                flag = true;
            });
            circle++;
            if (circle > ol.children.length - 1) {
                circle = 0;
            }
            circleChange();
        }

    });
    // 点击左边按钮图片变换
    allow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * swiperWidth + 'px';
            }
            num--;
            animate1(ul, -num * swiperWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }

    });
    // 圆圈变换
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'circle-current';
    }
    // 自动播放轮播图
    var timer = setInterval(function() {
        allow_r.click();
    }, 2000);
    // 轮播图制作结束


    // 倒计时效果开始
    var inputTime = +new Date('2020-2-29 21:00:00');
    var hour = document.querySelector('.hour');
    var min = document.querySelector('.min');
    var second = document.querySelector('.second');
    countDown();
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date();
        var times = (inputTime - nowTime) / 1000;
        var h = parseInt(times / 60 / 60 % 24);
        h = h < 10 ? '0' + h : h;
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        hour.innerHTML = h;
        min.innerHTML = m;
        second.innerHTML = s;
    }
    // 倒计时效果结束
});

$(function() {
    // 家电部分展示开始
    $('.electric-hd li').mouseenter(function() {
            $(this).addClass('electric-active').siblings().removeClass('electric-active');
            var index = $(this).index();
            $('.electric-bd .bd-tab').eq(index).show().siblings('.bd-tab').hide();
        })
        // 家电部分展示结束
});