<template>
  <div id="main" :style="{width: '1150px', height: '400px'}"></div>
</template>
<script>
import echarts from "echarts";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "近一周订单数量",
      },
      tooltip: {},
      legend: {
        data: ["近一周订单数量"],
      },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "近一周订单数量",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>
<style scoped>
</style>