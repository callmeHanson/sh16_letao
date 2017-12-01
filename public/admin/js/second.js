$(function () {

// 添加分类的模态框
$('.lt-main .btn-add').on('click', function () {
	$('#secondModal').modal('show');

	// 模态框显示之后，我们开始写模态框里面的ajax请求
	$.ajax({
		type: 'get',
		url: '/category/queryTopCategoryPaging',
		data: {
			page: 1,
			pageSize: 100,
		},
		success: function (data) {
			console.log(data);
			// 渲染模态框中的一级分类列表
			$('#secondModal .dropdown-menu').html(template("tpl_add", data));

		}
	})

})
// 给模态框中一级菜单的点击注册点击事件
$('#secondModal .dropdown').on('click', 'a', function () {
	// console.log(1);
	// 获取当前超链接的文本，赋值给选项框
	$('#secondModal button.dropdown-text').text($(this).text());
	// 将categoryId传给对应的隐藏域
	// 因为是超链接传，所以超链接a本身得有categoryId的值，这是在模板渲染的时候放的
	$("[name='categoryId']").val($(this).data('id'));

	// 手动将表单校验打钩
	$("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
	
})
// 关于文件上传
$("#fileupload").fileupload({

	// 后台给你响应的数据类型
	dataType: 'json',
	// 文件上传之后的回调监控
	done: function (e, data) {
		// console.log(e);
		// console.log(data.result.picAddr);

	$('.img-box img').attr('src', data.result.picAddr);
	// 把模态框提交后台需要的brandLogo准备好
	$("[name='brandLogo']").val(data.result.picAddr);
	// 文件上传成功之后，将表单校验强行打钩
	$("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
	}
})

// 模态框的表单校验
$('#form').bootstrapValidator({

	// 没有除外的，都需要校验
	excluded: [],

	feedbackIcons: {
		valid: "glyphicon glyphicon-ok",
		invalid: "glyphicon glyphicon-remove",
		validating: "glyphicon glyphicon-refresh"
	},

	fields: {
		categoryId: {
			validators: {
				notEmpty: {
					message: '请选择一级分类'
				}
			}
		},

		brandName: {
			validators: {
				notEmpty: {
					message: '请输入二级分类名称'
				}


			}
		},

		brandLogo: {
			validators: {
				notEmpty: {
					message: '请上传一张品牌的图片'
				}
			}
		}
		
	}

})

// 表单校验成功之后，提交给后台
$('#form').on('success.form.bv', function (e) {
	e.preventDefault();

	$.ajax({
		type: 'post',
		url: '/category/addSecondCategory',
		data: {
			brandName: $("[name='brandName']").val(),
			categoryId: $("[name='categoryId']").val(),
			brandLogo: $("[name='brandLogo']").val(),
			hot: $("[name='hot']").val(),
		},
		success: function (data) {
			console.log(data);
			// 表单提交成功之后，隐藏模态框
			$("#secondModal").modal('hide');
			// 重新渲染页面
			secondRender ();
			// 重置模态框，供下一次的添加
			$("form").data("bootstrapValidator").resetForm();//只重置了图标啊
			$("form")[0].reset();//只重置了能显示的表单元素的value，不包括隐藏域的value
			$("#secondModal .dropdown-text").text("请选择一级分类");
			$("#secondModal .img-box img").attr("src", "images/none.png");
			// 清空上一次隐藏域存储的值
			$("[type='hidden']").val("");//只有这样，下次点提交的时候，才会有错误信息提示
		}
	})
})

var page = 1,
		pageSize = 5;
secondRender ();

function secondRender () {


	$.ajax({
		type: 'get',
		url: '/category/querySecondCategoryPaging',
		data: {
			page: page,
			pageSize: pageSize,
		},
		success: function (data) {
			console.log(data);
			// 页面渲染完成
			$('tbody').html(template("tpl_second", data));

			// 结合后台数据完成分页
			$('#paginator').bootstrapPaginator({

				bootstrapMajorVersion: 3,
				currentPage: data.page,
				totalPages: Math.ceil(data.total/data.size),
				onPageClicked: function (event, originalEvent, type, page111) {
					// 为分页二次渲染做准备
					page = page111;
					// 分页点击的二次渲染
					secondRender ();
				}

			});

		}



	})
}












})