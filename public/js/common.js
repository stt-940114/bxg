define(["jquery","echarts","template","cookie"],function ($,echarts,template) {//有参数，返回值的写到前面
    console.log($.cookie);
	// NProgress.start();
    //
	// NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	  // 验证登录功能
	var pathname=location.pathname;
	var flag=$.cookie("PHPSESSID");
	if(!flag&&pathname.indexOf("login")==-1){
		location.href="/login";
	}
// 实现登录功能
	$("#loginForm").submit(function () {
//            alert(1);//这样提交页面会刷新，因为form本身就有提交事件，所有要取消

//           获取表单中所有的提交项
		var formdata=$(this).serialize();
		$.ajax({
			type:"post",
			url:"/api/login",
			data:formdata,
			datatype:"json",
			success:function (data) {
				if(data.code==200){
//               在result这个属性中有这个对象
			   console.log(data.result);
//   Object {tc_name: "admin", tc_avatar: "http://static.botue.com/images/avatar/58ad2b9c0fcd5.jpg"}

//                头像，用户名可以通过这个页面获取，通过cookie的跨页面的功能，传递给主页面，设置上头像和名字
//                是对象的形式，转换为字符串传递
					var logInfo=JSON.stringify(data.result);
//              设置cookie
					$.cookie("logInfo",logInfo,{path : "/"})
					location.href="index/index";
				}
			},
			error:function () {
				console.log(data.responseText);
			}

		})
		return false;
	})



	// 转为json

	var obj=JSON.parse($.cookie("logInfo"));
//            console.log(obj);//对象
// 	$(".aside .profile img").attr("src",obj.tc_avatar);
// 	$(".aside .profile h4").html(obj.tc_name);
	  var tpl='<div class="avatar img-circle" >'+
		'<img src="{{tc_avatar}}">'+
		'</div>'+
		'<h4>{{tc_name}}</h4>'
	var render=template.compile(tpl);//返回渲染函数
	var html=render(obj);
	$(".aside .profile").html(html);
})
