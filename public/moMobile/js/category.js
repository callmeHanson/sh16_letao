$(function () {

firstList ();
function firstList () {

	$.ajax({
		type: 'get',
		url: '/category/queryTopCategory',
		success: function (data) {
			console.log(data);

			$(".left_list").html(template("tpl", data));
			// 右侧列表初始化的显示
			secondList(data.rows[0].id);
		}
	})
}

// 给左侧列表绑定点击事件
$('.lt_category_l .left_list').on('click', 'li', function () {
	var id = $(this).data('id');
	// li的样式跟着变化
	$(this).addClass('now').siblings().removeClass('now');
	// 右侧列表跟着变化
	secondList (id);
	// 重置右侧列表的初始位置
	// mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
	console.log(mui('.mui-scroll-wrapper').scroll());//这是一个class对象的数组
	mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);
})




function secondList (id) {

	$.ajax({
		type: 'get',
		url: '/category/querySecondCategory',
		data: {
			id: id||0
		},
		success: function (data) {
			console.log(data);

			$('.right_list').html(template('tpl2', data));
		}
	})



}
















})