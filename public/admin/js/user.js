$(function () {

/**
 * 1. 用户加载进来之后就发送ajax请求，渲染整个用户列表
 * 2.	渲染分页
 * 3. 将分页的点击与重新渲染页面关联起来
 */

var currentPage = 1,//定制 传过来的后台数据的页码
		pageSize = 5;//定制 传过来的页码的尺寸

// 首次进入页面得渲染一次用户列表
renderUsers ();

// 封装页面渲染的函数
function renderUsers () {

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

			// 数据渲染成功之后，就应该着手分页渲染了
			$("#paginator").bootstrapPaginator({
				// 默认该插件支持bootstrap2的版本，若是依赖的其他版本，
				// 你得修改你所使用的bootstrap的版本
				bootstrapMajorVersion: 3,
				// 分页完成之后，当前默认在第几页
				currentPage: currentPage,
				// 总共分页多少页
				totalPages: Math.ceil(data.total/pageSize),

				// 自行设置显示多少页
				numberOfPages: 10,//？？不知道为什么没有生效？？

				// 分页的尺寸
				size: 'normal',
				// 每点击一次分页按钮，发送一次ajax请求，渲染列表，出现进度条
				onPageClicked: function (event, originalEvent, type, page) {
					console.log(page);
					// 每次点击分页的按钮，得将当前页码传到ajax的上传数据中
					currentPage = page;

					renderUsers ();
				}
			});
		}
	})

}

// 开启用户列表上的禁用功能
/**
 * 1. 首先用户列表是发送ajax请求异步加载出来的，所有的DOM都无法直接获取，这时候我们需要使用委托
 * 2. 委托对象我们使用模板元素的包裹层
 * 3. 用on注册委托事件，甲方得用选择器才可以改变this的指向
 * 
 */

$('tbody').on('click', ".btn", function () {
	// console.log('I click it!');

	// 1. 点击禁用/开启的切换按钮之后，得出现一个模态框
	// 2. JS写完之后得修改模态框的样式
	// 3. 写模态框的取消和确定的逻辑
	$('#usersModal').modal('show');


	// 弹出一个模态框，让用户选择是否禁用
	$(".btn-confirm").on('click', function () {

		
		// 准备后台需要的数据，发送ajax请求
		var id = $(this).parent().data("id");
		var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
		// console.log(id);
		// console.log(isDelete);

		$.ajax({
			type: 'post',
			url: '/user/updateUser',
			data: {
				id: id,
				isDelete: isDelete
			},
			success: function (data) {
				// 后台数据禁用、开启切换成功
				// console.log(data.success);
				if (data.success) {
					
					// 为了页面的友好，得等到数据传到后台成功之后，再进行页面的重新渲染
					$("#usersModal").modal('hide');
					// 重新获取后台数据，进行前台渲染
					renderUsers ();
				}
			}
		})


	})

})












})