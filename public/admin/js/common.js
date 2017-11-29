$(function () {

// 关于进度条

// 配置进度条//取消右侧的进度环
NProgress.configure({	showSpinner: false});


// 1. ajax发送开始
$(document).ajaxStart(function () {
	NProgress.start();
})

// 2.ajax发送结束
$(document).ajaxStop(function () {
	// ajax请求发送完成的时间太快，看不出效果
	// 需要添加一个定时器（setTimeout）来延长时间
	setTimeout(function () {
		NProgress.done();
	}, 500);
})

// 菜单缩放--二级菜单显示与隐藏
// 给子菜单取复用形类名，注册事件时很优雅
$(".child").prev().on('click', function () {
	// 注册的时候prev()了，函数内就要next()
	$(this).next().slideToggle();//slideDown与slideUp
})

// 侧边栏显示与隐藏效果
$(".icon-menu").on('click', function () {
	// 使用show()和hide动画改变的是透明度
	// aside侧边栏的动画和main主体的动画不一致
	$(".lt-aside").toggleClass("now");
	$(".lt-main").toggleClass("now");
})

// 退出按钮
$(".btn-logout").on('click', function () {
	$.ajax({
		type: 'get',
		url: '/employee/employeeLogout',
		success: function (data) {
			// 退出成功，才跳转到登录页面
			if (data.success) {
				location.href = "login.html";
			}
		}
	})
})


})