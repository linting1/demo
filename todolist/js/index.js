$(function() {
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() == '') {
                alert("请输入内容");
            } else {
                var data = getData();
                data.push({
                    title: $(this).val(),
                    done: false
                });
                saveData(data);
                load();
                $(this).val("");
            }
        }
    });
    // 删除事件
    $("ol,ul").on("click", "a", function() {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();

    });
    // 已完成和未完成
    $("ol,ul").on("click", "input", function() {
            var data = getData();
            var index = $(this).siblings("a").attr("id");
            data[index].done = $(this).prop("checked");
            saveData(data);
            load();
        })
        // 获取数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    // 保存数据
    function saveData(dat) {
        localStorage.setItem("todolist", JSON.stringify(dat));
    };
    // 渲染页面
    function load() {
        var data = getData();
        $("ol,ul").empty();
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
            }
        })
    };
})