<template>
  <el-card>
    <my-bread level1="数据统计" level2="数据报表" class="myBread"></my-bread>
    <div id="main" style="width: 100%;height:400px;"></div>
  </el-card>
</template>

<script>
let echarts = require("echarts");
export default {
   name: "reports",
  data () {
     return {
       activeName: 'second',
       option: {},
       option1: {
         title: {
           text: '用户来源'
         },
         tooltip : {
           trigger: 'axis',
           axisPointer: {
             type: 'cross',
             label: {
               backgroundColor: '#6a7985'
             }
           }
         },
         toolbox: {
           feature: {
             saveAsImage: {}
           }
         },
         grid: {
           left: '3%',
           right: '4%',
           bottom: '3%',
           containLabel: true
         }
       },
       option2: {},
       option3: {
        title : {
          text: '用户访问站点',
          subtext: '纯属虚构',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series : [
          {
            name: '访问位置',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:1335, name:'首页'},
              {value:2310, name:'分类'},
              {value:3234, name:'商品列表'},
              {value:4135, name:'商品详情'},
              {value:2548, name:'其他'}
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
       }

     }
  },
  mounted() {
    this.useEchart()
  },
  methods: {
    async useEchart() {
      let myChart = echarts.init(document.getElementById("main"));
      const {data: res} = await this.$http.get(`reports/type/1`)
      this.option2 = res.data
      this.option = {...this.option1, ...this.option2}
      myChart.setOption(this.option);
      // 获取数据
      // 基于类型统计 请求路径：reports/:type  请求方法：get

    }
  }
 }
</script>

<style>
.myBread {
  margin-bottom: 20px;
}

</style>
