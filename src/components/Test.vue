<template>
  <div id="aaa">
    <div id="a"></div>
    <div id="myChart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      var option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            detail: {
              formatter: "{value}A",
              textStyle:{color:'red',fontSize:15},
            },
            data: [
              {
                value: 50,
                name: "电流",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },

    refreshData() {},
  },
};
</script>

<style lang="less" scoped>
#myChart {
  color: rgb(255, 255, 255);
  height: 100%;
  width: 50%;
  background-color: antiquewhite;
}

#a {
  width: 50%;
  height: 100%;
  background-color: aquamarine;
}

#aaa {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>