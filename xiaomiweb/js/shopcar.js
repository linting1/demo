window.onload = function() {
    var user = this.document.querySelector('.user');
    var ul = this.document.querySelector('.userInfo').querySelector('ul');
    user.addEventListener('mouseenter', function() {
        ul.style.display = 'block';
    });
    user.addEventListener('mouseleave', function() {
        ul.style.display = 'none';
    })
};
$(function() {
    // 全选按钮
    $('#check-all').click(function() {
        $(this).toggleClass('check-icon-select');
        $('.check-icon ').toggleClass('check-icon-select');
        getSum();
    });
    // 商品按钮全部选中之后全选按钮跟着选中
    $('.check-icon').click(function() {
        $(this).toggleClass('check-icon-select');
        if ($('.check-icon-select').length == $('.item-box').length) {
            $('#check-all').toggleClass('check-icon-select');
        };
        getSum();
    });
    // 增减数量按钮
    getSum();
    // 加
    $('.add').click(function() {
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);
        // 计算小计
        var p = $(this).parents('.car-num').siblings('.car-price').html();
        p = p.substr(0, p.length - 1);
        $(this).parents('.car-num').siblings('.car-total').html(p * n + '元');
        getSum()
    });
    // 减
    $('.reduce').click(function() {
        var n = $(this).siblings('.itxt').val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        // 计算小计
        var p = $(this).parents('.car-num').siblings('.car-price').html();
        p = p.substr(0, p.length - 1);
        $(this).parents('.car-num').siblings('.car-total').html(p * n + '元');
        getSum();
    });
    // 修改文本框时也需修改
    $('.itxt').change(function() {
        var n = Math.ceil($(this).val());
        if (n <= 0) {
            n = 1;
        }
        $(this).val(n);
        // 计算小计
        var p = $(this).parents('.car-num').siblings('.car-price').html();
        p = p.substr(0, p.length - 1);
        $(this).parents('.car-num').siblings('.car-total').html(p * n + '元');
        getSum()
    });
    // 删除操作
    $('.delete').click(function() {
        $(this).parents('.item-box').remove();
        getSum();
    })

    function getSum() {
        // totalNum是计算共多少件商品，chooseNum是计算已选择了多少商品，accountNum是计算选中的总价钱
        var totalNum = 0;
        var chooseNum = 0;
        var accountNum = 0;
        $('.itxt').each(function(i, ele) {
                totalNum += parseInt($(ele).val());
            })
            // 共多少件商品
        $('#section-total').html(totalNum);
        // 循环每个商品
        $('.item-box').each(function(i, ele) {
            $(this).find('.check-icon').each(function(i, ele) {
                // 找出带有select类名的进行操作
                if ($(this).is('.check-icon-select')) {
                    var total = parseInt($(this).parents('.item-box').find('.car-total').html());
                    var num = parseInt($(this).parents('.item-box').find('.itxt').val());
                    chooseNum += num;
                    accountNum += total;
                };
            });
        })
        $('#section-num').html(chooseNum);
        $('#section-account').html(accountNum);
    };

})