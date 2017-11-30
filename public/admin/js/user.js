$(function () {

/**
 * 1. 用户加载进来之后就发送ajax请求，渲染整个用户列表
 * 2.	渲染分页
 */

var currentPage = 1,//定制 传过来的后台数据的页码
		pageSize = 5;//定制 传过来的页码的尺寸


// 1.渲染用户列表
$.ajax({
	type: 'get',
	url: '/user/queryUser',
	data: {
		page: currentPage,
		pageSize: pageSize,
	},
	success: function (data) {
		console.log(data);

		// 将模板字符串追加到DOM结构上
		$('tbody').html(template("tpl_users", data));
	}
})















})