$(function () {


// 添加分类的模态框控制
$('.lt-main .btn-add').on('click', function () {
  // 模态框显示
  $('#first_addModal').modal('show');


})

// 表单提交之前得进行表单校验
// 表单验证插件会找寻表单中存在的提交按钮，在校验失败的时候，让按钮禁用
$('#form').bootstrapValidator({

  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  fields: {
    categoryName: {

      validators: {

        notEmpty: {
          message: '请输入一级菜单'
        },
        // stringLength: {
        //   min: 3,
        //   max: 6,
        //   message: '一级菜单长度必须3-6'
        // }

      }
     
    }
  }
})




// 表单提交
$('#form').on('success.form.bv', function (e) {
  // 阻止提交按钮的提交表单
  e.preventDefault();

  console.log($('#form').serialize());
  // 给模态框内的添加按钮绑定事件，给后台发送ajax请求
  $.ajax({
    type: 'post',
    url: '/category/addTopCategory',
    data: $('#form').serialize(),
    success: function (data) {
      if (data.success) {
        // 隐藏模态框
        $('#first_addModal').modal('hide');
        // 渲染页面
        renderFirst ();

        // 重置表单中插件的样式
        $('#form').data('bootstrapValidator').resetForm();
        // 重置表单的值
        $('#form')[0].reset();

      }
    }
  })

})

// 表单提交之后，得



// 发送ajax所要准备的数据
var page = 1,
    pageSize = 5;

renderFirst ();

function renderFirst () {

  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
      page: page,
      pageSize: pageSize,
    },
    success: function (data) {
      console.log(data);
      
      $("tbody").html(template("tpl_first", data));
     
     // 页面主体的表格数据渲染成功之后，凭借着后台给的表格数据，开始着手分页
     $("#paginator").bootstrapPaginator({
      bootstrapMajorVersion: 3,
      currentPage: page,
      totalPages: Math.ceil(data.total/data.size),
      onPageClicked: function (event, originEvent, type, page111) {
        page = page111;
        renderFirst ();
      }
     })
    }
  })

}

})