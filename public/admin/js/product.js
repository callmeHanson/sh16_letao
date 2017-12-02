$(function () {

var page = 1,
		pageSize = 5;

render ();
function render () {

	$.ajax({
		type: 'get',
		url: '/product/queryProductDetailList',
		data: {
			page: page,
			pageSize: pageSize
		},
		success: function (data) {
			console.log(data);
			// 1.渲染主体列表
			$("tbody").html(template("tpl_product", data));
			// 2.分页 (3+1)
			$("#paginator").bootstrapPaginator({
				bootstrapMajorVersion: 3,
				currentPage: page,
				totalPages: Math.ceil(data.total/data.size),

				onPageClicked: function (a,b,c,d) {
					console.log(d);
					page = d;
					render ();
				},


				/*
					*关于分页：我们可以做更多
					* 
				 */
				// 关于参数;
				// page: 表示当前鼠标浮动的页码
				// current: 表示当前所在的页码
				itemTexts: function (type, page, current) {
					switch (type) {
						case 'first':
							return '首页';
						case 'last':
							return '尾页';
						case 'prev':
							return '上一页';
						case 'next':
							return '下一页';
						case 'page':
							return page;
					}
					
				},

				tooltipTitles: function (type, page, current) {

            switch (type) {
            case "first":
                return "首页";
            case "prev":
                return "上一页";
            case "next":
                return "下一页";
            case "last":
                return "尾页";
            case "page":
                return (page === current) ? "当前页是 " + page : "跳转到 " + page;
            }
        },
        // 是否使用bootstrap内置的tooltip--背景是黑色的
        // 默认是false：不使用
        useBootstrapTooltip: true,

			})
		}
	})

}

//	添加分类按钮
$(".btn-add").on('click', function () {
	$('#productModal').modal('show');
	$.ajax({
		type: 'get',
		url: '/category/querySecondCategoryPaging',
		data: {
			page: 1,
			pageSize: 100,
		},
		success: function (data) {
			console.log(data);
			$('.dropdown-menu').html(template('tpl_add', data));
		}
	})
})
// 选择二级分类
$(".dropdown").on('click','a',  function () {
	$(".dropdown-text").text($(this).text());
	// 将id准备好
	$("[name='brandId']").val($(this).data('id'));
	$("form").data('bootstrapValidator').updateStatus('brandId', 'VALID');
})

// 准备一个放图片的数组
// 作用1：根据数组长度来校验表单
// 作用2: 后面表单提交的时候方便传入参数

var imgs = [];
// 文件上传
$("#fileupload").fileupload({
	dataType: 'json',
	done: function (e, data) {
		// 得限制预览的图片数目
		if(imgs.length >= 3) {
			return false;
		}
		console.log(data.result);
		//picName
		//picAddr
		//根据后台传来的图片路径，将图片全部预览显示
		$('#productModal .img-box').append("<img src="+data.result.picAddr+" alt='' width='100' height='100'>");
		imgs.push(data.result);

		if (imgs.length === 3) {
			$("form").data('bootstrapValidator').updateStatus("productLogo", 'VALID');
		}


	}
})


// 表单校验
$("#form").bootstrapValidator({

	excluded: [],

	feedbackIcons: {
		valid: "glyphicon glyphicon-ok",
		invalid: "glyphicon glyphicon-remove",
		validating: "glyphicon glyphicon-refresh"
	},

	fields: {
		brandId: {
			validators: {
				notEmpty: {
					message: '请输入归属品牌'
				}
			}
		},
		proName: {
			validators: {
				notEmpty: {
					message: '请输入商品名称'
				}
			}
		},
		proDesc: {
			validators: {
				notEmpty: {
					message: '请输入商品描述'
				}
			}
		},
		num: {
			validators: {
				notEmpty: {
					message: '请输入商品库存'
				},
				regexp: {
					regexp: /^[1-9]\d+$/,
					message: '请输入一个正数'
				}
			}
		},
		size: {
			validators: {
				notEmpty: {
					message: '请输入商品尺码'
				},
				regexp: {
					regexp: /^\d{2}-\d{2}$/,
					message: '请输入正确的尺码，例如（32-46）'
				}
			}
		},
		oldPrice: {
			validators: {
				notEmpty: {
					message: '请输入商品的原价'
				},
				regexp: {
					regexp: /^\d+$/,
					message: '请输入数字'
				}
			}
		},
		price: {
			validators: {
				notEmpty: {
					message: '请输入商品的价格'
				},
				regexp: {
					regexp: /^\d+$/,
					message: '请输入数字'
				}
			}
		},
		// 先让图片上传区域默认报错
		productLogo: {
			validators: {
				notEmpty: {
					message: '请传入3张图片'
				}
			}
		}
	}

})

// 表单提交
$("#form").on('success.form.bv', function (e) {
	e.preventDefault();

	var param = $('form').serialize();
	console.log(param);
	param += '&picName1='+imgs[0].picName+'&picAddr1='+imgs[0].picAddr,
	param += '&picName2='+imgs[1].picName+'&picAddr2='+imgs[1].picAddr,
	param += '&picName3='+imgs[2].picName+'&picAddr3='+imgs[2].picAddr;
	console.log(param);

	$.ajax({
		type: 'post',
		url: '/product/addProduct',
		data: param,
		success: function () {
			// 模态框隐藏
			$('#productModal').modal('hide');
			// 重新渲染列表
			page = 1;
			render();
			// 重置表单本身以及表单验证插件的样式（类名）
			$('form').data('bootstrapValidator').resetForm();
			$('form')[0].reset();

			// 重置button的文本
			$('.dropdown-text').text('请选择二级分类');
			// 重置隐藏域的值，让下次进入的时候恢复报错
			$("[name='brandId']").val("");
			// 清除图片预览中的图片
			$('#productModal .img-box img').remove();
			// 清空图片数组，保证下次仍然可以传入图片
			imgs = [];
		}
	})

})




})

