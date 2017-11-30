$(function () {



// 基于准备好的dom，初始化echarts实例
var chartBar = echarts.init(document.getElementById('echarts-bar'));
function fn () {

}
// 指定图表的配置项和数据
var option = {
    title: {
        text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
        data:['人数']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [1000, 2000, 3000, 2500, 1888, 2322]
    }]
};

// 使用刚指定的配置项和数据显示图表。
chartBar.setOption(option);


var chartPie = echarts.init(document.getElementById('echarts-pie'));

option2 = {
  title : {
      text: '热门品牌销售',
      subtext: '2017年11月29日',
      // 标题们水平方向居中
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      // 算的百分比
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','彪马','特步']
  },
  series : [
      {
          name: '销售情况',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'新百伦'},
              {value:135, name:'彪马'},
              {value:1548, name:'特步'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};
chartPie.setOption(option2);


})