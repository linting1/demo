$(function() {
    // 标题部分上下滑动
    $('.hotwords-nav>li').hover(function() {
        $(this).children('.hotwords-item').stop().slideToggle();
    });
    // 侧边栏导航具体显示
    $('.categoryList>ul li').hover(function() {
        $(this).children('.categoryList-item').stop().toggle();
    });
});
window.onload = function() {
    var search = document.querySelector('.search-text');
    document.addEventListener('keyup', function(e) {
        if (e.keyCode == 83) {
            search.focus();
        }
    })
}