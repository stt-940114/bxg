/**
 * Created by Administrator on 2017/3/19 0019.
 */
// 讲师管理
// overlay设置在这里是因为，要保证在发送ajax请求前执行overlay，要不然无法检测到ajaxStart和ajaxStop事件。
define(["jquery", "template","util","bootstrap","overlay"], function ($,template,util) {
   // 设置菜单选中功能
   //  var pathname=location.pathname;
    // alert(pathname);
   util.setMenu(location.pathname);
    
    // 实现教师数据列表的加载
    $.ajax({
        type: "get",
        url: "/api/teacher",//接口地址
        dataType: "json",
        success: function (data) {
            // 解析数据，渲染页面
            // 模板引擎的作用
            if (data.code == 200) {
                var html = template("teacherTpl", {list: data.result});//数据传递给模板
                $("#teacherList").html(html);
                // 查看讲师功能
                $(".teacherModals").find("a:eq(0)").click(function () {
                    var tc_id = $(this).parent("td").attr("data-tcid");
                    // alert(11);
                    $.ajax({
                        type: "get",
                        url: "/api/teacher/view",
                        data: {tc_id: tc_id},
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 200) {
                                // data.result.tc_hometown = data.result.tc_hometown.split("|").join(" ");
                                data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g, " ");
                                var html = template("teacherInfoTpl", data.result);
                                $("#teacherInfo").html(html);
                                $("#teacherModal").modal();
                            }
                        }
                    })
                });
                $(".teacherModals").find("a:eq(2)").click(function () {
                    // 获取按钮所在的父元素的id和status状态
                    var tc_id = $(this).parent("td").attr("data-tcid");
                    var tc_status = $(this).parent("td").attr("data-status");
                    var that = this;
                    $.ajax({
                        type: "post",
                        url: "/api/teacher/handle",
                        dataType: "json",
                        data: {tc_id: tc_id, tc_status: tc_status},
                        success: function (data) {
                            if (data.code == 200) {
                                console.log(data.result.tc_status);
                                if (data.result.tc_status == 0) {
                                    $(that).text("注销");
                                    // data.result.tc_status == 0
                                } else {
                                 $(that).text("启用");
                                    // data.result.tc_status == 1
                                }
                                // tc_status=data.result.tc_status;
                                // 设置td的data_status状态
                            $(that).parent("td").attr("data-status",data.result.tc_status);
                            }
                        }
                    })


                });
            }
        }
    })
});