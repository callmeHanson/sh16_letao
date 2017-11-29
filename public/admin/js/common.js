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

})