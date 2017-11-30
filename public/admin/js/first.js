$(function () {

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