/* 写一个JQ的入口函数 */
$(function () {

// 使用表单校验插件
$("form").bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [':disabled', ':hidden', ':not(:visible)'],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  // 3中类型的配置一个都不可以省略
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //正则校验
        regexp: {
          regexp: /(^[A-Za-z0-9]{4,16}$)|(^[\u4E00-\u9FA5]{2,8}$)/,
          message: '用户名由6-16位的英文或者2-8位的汉字组成'
        },
        //后台验证之后的
        callback: {
        	message: '用户名错误'
        }
      }
    },
    password: {
    	validators: {
    		// 不能为空
    		notEmpty: {
    			message: '密码不能为空'
    		},
    		// 限制密码长度
    		stringLength: {
    			min: 6,
    			max: 12,
    			message: "密码长度在6-12位"
    		},
    		callback: {
    			message: '密码错误'
    		}
    	}
    }
  }

});

// 表单注册校验成功事件
// 相当于点击登录提交按钮
$("form").on("success.form.bv", function (e) {
	e.preventDefault();//阻止表单提交时候，浏览器会默认跳转页面的行为

	console.log("不让你浏览器跳转");
	console.log($("form").serialize());
	$.ajax({
		type: 'post',
		url: '/employee/employeeLogin',
		data: $("form").serialize(),

		success: function (data) {
			console.log(data.success);
			// 数据请求，响应成功回来之后的判断
			if (data.success) {
				location.href = "index.html";
			}
			if (data.error === 1000) {
				// alert(data.message);
				$("form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');

			}
			if (data.error === 1001) {
				// alert(data.message);
				$("form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
			}
		},
		error: function (err) {
			console.log(err.error);
		}
	})

})

// 重置按钮模块
$("[type='reset']").on('click', function () {
	var validator = $("form").data('bootstrapValidator');
	validator.resetForm();
})


})