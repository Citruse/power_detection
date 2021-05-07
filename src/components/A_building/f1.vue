<template>
  <div class="container">
    <div class="box_all">
      <div class="box">
        <dv-border-box-3 class="room_box">
          <div class="body_1">
            <el-row class="btn_row" v-for="item in west_rooms" :key="item.id">
              <el-button
                class="floor_btn"
                type="primary"
                plain
                size="mini"
                :disabled="west_able[item - 1]"
                @click="gerCurRoom(['西', 100 + item]), draws()"
                >西{{ 100 + item }}</el-button
              >
              <el-button
                class="floor_btn"
                type="primary"
                plain
                size="mini"
                :disabled="west_able[item]"
                @click="gerCurRoom(['西', 101 + item]), draws()"
                >西{{ 101 + item }}</el-button
              >
            </el-row>
          </div>
          <div class="body_2">
            <div>当前楼层：1楼</div>
            <div class="body_2_inner">
              <el-row class="btn_row" v-for="item in mid_rooms" :key="item.id">
                <el-button
                  class="floor_btn"
                  type="primary"
                  plain
                  size="mini"
                  :disabled="mid_able[item - 1]"
                  @click="gerCurRoom(['中', 100 + item]), draws()"
                  >中{{ 100 + item }}</el-button
                >
                <el-button
                  class="floor_btn"
                  type="primary"
                  plain
                  size="mini"
                  :disabled="mid_able[item]"
                  @click="gerCurRoom(['中', 101 + item]), draws()"
                  >中{{ 101 + item }}</el-button
                >
                <el-button
                  class="floor_btn"
                  type="primary"
                  plain
                  size="mini"
                  :disabled="mid_able[item + 1]"
                  @click="gerCurRoom(['中', 102 + item]), draws()"
                  >中{{ 102 + item }}</el-button
                >
                <el-button
                  class="floor_btn"
                  type="primary"
                  plain
                  size="mini"
                  :disabled="mid_able[item + 2]"
                  @click="gerCurRoom(['中', 103 + item]), draws()"
                  >中{{ 103 + item }}</el-button
                >
              </el-row>
            </div>
          </div>
          <div class="body_3">
            <el-row class="btn_row" v-for="item in east_rooms" :key="item.id">
              <el-button
                class="floor_btn"
                type="primary"
                plain
                size="mini"
                :disabled="east_able[item - 1]"
                @click="gerCurRoom(['东', 100 + item]), draws()"
                >东{{ 100 + item }}</el-button
              >
              <el-button
                class="floor_btn"
                type="primary"
                plain
                size="mini"
                :disabled="east_able[item]"
                @click="gerCurRoom(['东', 101 + item]), draws()"
                >东{{ 101 + item }}</el-button
              >
            </el-row>
          </div>
        </dv-border-box-3>
      </div>
      <div class="box_data">
        <dv-border-box-8 class="room_box">
          <div class="datas">
            <span style="font-size: 15px">当前：{{ this.cur_room }}</span>
            <div class="gauge_box">
              <div class="gauge" id="gauge_i"></div>
              <div class="gauge" id="gauge_v"></div>
            </div>
            <div class="data_charts" id="chartIVt"></div>
            <span style="font-size: 10px">历史数据</span>
            <div class="data_charts" id="chartHistory"></div>
            <span style="font-size: 10px">单位：电流-A， 电压-V， 功率-KW</span>
          </div>
        </dv-border-box-8>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前显示教室
      cur_room: "1楼",
      // 教室列表
      west_rooms: [1, 3, 5, 7, 9, 11, 13],
      east_rooms: [1, 3, 5, 7, 9, 11, 13],
      mid_rooms: [1, 5],
      // 获取电力数据，header携带token获取认证
      pushToken: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      // 电力总数据
      power_data: {},
      // 存储可用与否的列表
      east_able: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
      mid_able: [true, true, true, true, true, true, true, true],
      west_able: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    };
  },

  mounted() {
    this.getStatus();
    this.getValue();
    this.drawGaugeI();
    this.drawGaugeV();
    this.drawIVt();
    this.drawHistory();
  },

  methods: {
    draws() {
      this.getValue();
      this.drawHistory();
    },

    // 绘制仪表盘-I
    drawGaugeI() {
      let myChart = this.$echarts.init(document.getElementById("gauge_i"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}A",
        },
        series: [
          {
            name: "",
            type: "gauge",
            progress: {
              show: true,
              overlap: true,
              width: 3,
            },
            detail: {
              formatter: "{value}A",
              textStyle: { fontSize: 13, color: "white" },
            },
            splitLine: {
              show: true,
              length: "14%",
            },
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [
                    1,
                    new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 1, color: "#956FD4" },
                      { offset: 0, color: "#3EACE5" },
                    ]),
                  ],
                ],
              },
            },
            axisLabel: {
              show: true,
              color: "rgba(191, 183, 183, 1)",
              distance: 1,
            },
            title: {
              show: true,
              offsetCenter: ["0", "60%"],
              color: "rgba(180, 176, 176, 1)",
            },
            pointer: {
              show: true,
              length: "60%",
              width: 2,
            },
            data: [
              {
                value: 0,
                name: "电流",
              },
            ],
            radius: "95%",
            min: 0,
            max: 20,
            splitNumber: 4,
          },
        ],
      };
      setInterval(() => {
        option.series[0].data[0].value = this.power_data.a_a;
        myChart.setOption(option);
      }, 100);
      myChart.setOption(option);
    },

    // 绘制仪表板-V
    drawGaugeV() {
      let myChart = this.$echarts.init(document.getElementById("gauge_v"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}V",
        },
        series: [
          {
            name: "",
            type: "gauge",
            progress: {
              show: true,
              overlap: true,
              width: 3,
            },
            detail: {
              formatter: "{value}V",
              textStyle: { fontSize: 13, color: "white" },
            },
            splitLine: {
              show: true,
              length: "14%",
            },
            axisLabel: {
              show: true,
              color: "rgba(191, 183, 183, 1)",
              distance: -1,
            },
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [
                    1,
                    new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 1, color: "#956FD4" },
                      { offset: 0, color: "#3EACE5" },
                    ]),
                  ],
                ],
              },
            },
            title: {
              show: true,
              offsetCenter: ["0", "60%"],
              color: "rgba(180, 176, 176, 1)",
            },
            pointer: {
              show: true,
              length: "80%",
              width: 2,
            },
            data: [
              {
                value: 0,
                name: "电压",
              },
            ],
            radius: "95%",
            min: 100,
            max: 300,
            splitNumber: 4,
          },
        ],
      };
      setInterval(() => {
        option.series[0].data[0].value = this.power_data.a_v;
        myChart.setOption(option);
      }, 100);
      myChart.setOption(option);
    },

    // 绘制图表 I/U_t
    drawIVt() {
      let myChart = this.$echarts.init(document.getElementById("chartIVt"));
      let option = {
        title: {
          text: "",
          x: "right",
          y: 150,
          textStyle: {
            color: "#B4B4B4",
            fontSize: 10,
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        legend: {
          data: ["电流", "电压", "功率"],
          textStyle: {
            color: "#B4B4B4",
          },
          bottom: "20",
        },
        grid: {
          top: "9",
          color: "#fff",
        },
        xAxis: [
          {
            data: (function () {
              var now = new Date();
              var res = [];
              var len = 7;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 2000);
              }
              return res;
            })(),
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            data: (function () {
              var res = [];
              var len = 7;
              while (len--) {
                res.push(7 - len - 1);
              }
              return res;
            })(),
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value} ",
            },
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "电流",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#ffffff",
              },
            },
            data: (function () {
              var res = [];
              var len = 0;
              while (len < 7) {
                res.push(0);
                len++;
              }
              return res;
            })(),
          },

          {
            name: "电压",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            data: (function () {
              var res = [];
              var len = 7;
              while (len--) {
                res.push(0);
              }
              return res;
            })(),
          },

          {
            name: "功率",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2",
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#956FD4", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#3EACE5", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: (function () {
              var res = [];
              var len = 0;
              while (len < 7) {
                res.push(0);
                len++;
              }
              return res;
            })(),
          },
        ],
      };
      setInterval(() => {
        var axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

        var data0 = option.series[0].data; //电流
        var data1 = option.series[1].data; //电压
        var data2 = option.series[2].data; //功率
        data0.shift();
        data0.push(this.power_data.a_a);
        data1.shift();
        data1.push(this.power_data.a_v);
        data2.shift();
        data2.push(this.power_data.a_wp);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        option.xAxis[1].data.shift();
        option.xAxis[1].data.push(app.count++);

        myChart.setOption(option);
      }, 2100);
      myChart.setOption(option);
    },

    // 绘制 历史数据
    async drawHistory() {
      var hours, day, month;
      if (this.cur_room === "1楼") {
        // 获取hours
        const { data: res1 } = await this.$http.get("/data/history", {
          params: {
            type: 1,
            building: "南一楼",
            floor: 1,
            time: "HOURS",
          },
          headers: this.pushToken,
        });
        if (!res1.success) {
          return this.$message.error("获取历史数据(hours)失败！");
        }
        hours = res1.data;

        // 获取day
        const { data: res2 } = await this.$http.get("/data/history", {
          params: {
            type: 1,
            building: "南一楼",
            time: "DAY",
            floor: 1,
          },
          headers: this.pushToken,
        });
        if (!res2.success) {
          return this.$message.error("获取历史数据(day)失败！");
        }
        day = res2.data;

        // 获取月
        const { data: res3 } = await this.$http.get("/data/history", {
          params: {
            type: 1,
            building: "南一楼",
            time: "MONTH",
            floor: 1,
          },
          headers: this.pushToken,
        });
        if (!res3.success) {
          return this.$message.error("获取历史数据(month)失败！");
        }
        month = res3.data;
      } else {
        // 获取hours
        const { data: res1 } = await this.$http.get("/data/history", {
          params: {
            type: 1,
            building: "南一楼",
            floor: 1,
            time: "HOURS",
            classroom: this.cur_room,
          },
          headers: this.pushToken,
        });
        if (!res1.success) {
          return this.$message.error("获取历史数据(hours)失败！");
        }
        hours = res1.data;

        // 获取day
        const { data: res2 } = await this.$http.get("/data/history", {
          params: {
            type: 1,
            building: "南一楼",
            time: "DAY",
            floor: 1,
            classroom: this.cur_room,
          },
          headers: this.pushToken,
        });
        if (!res2.success) {
          return this.$message.error("获取历史数据(day)失败！");
        }
        day = res2.data;

        // 获取月
        const { data: res3 } = await this.$http.get("/data/history", {
          params: {
            type: 1,
            building: "南一楼",
            time: "MONTH",
            floor: 1,
            classroom: this.cur_room,
          },
          headers: this.pushToken,
        });
        if (!res3.success) {
          return this.$message.error("获取历史数据(month)失败！");
        }
        month = res3.data;
      }

      let myChart = this.$echarts.init(document.getElementById("chartHistory"));
      let option = {
        color: ["#3EACE5", "#956FD4", "#6118d9"],
        grid: {
          top: "0px",
          color: "#fff",
        },
        title: {
          text: "历史数据",
          show: false,
          offset: [0, -20], //标题位置偏移
          style: {
            //标题默认样式
            fill: "#fff",
            fontSize: 17,
            fontWeight: "400",
            textAlign: "center",
            textBaseline: "bottom",
          },
        },
        legend: {
          data: ["时", "日", "月"],
          textStyle: {
            color: "rgba(255, 255, 255, 1)",
          },
          bottom: 0,
        },
        label: {
          style: {
            show: true,
            color: "#fff",
            fontSize: 20,
          },
        },
        tooltip: {},
        xAxis: {
          fontSize: 20,
          data: ["", "", "", "", "", "", ""],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          splitLine: { show: false },
          fontSize: 20,
          name: "功率",
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "时",
            data: hours,
            type: "bar",
          },
          {
            name: "日",
            data: day,
            type: "bar",
          },
          {
            name: "月",
            data: month,
            type: "bar",
          },
        ],
      };
      myChart.setOption(option);
    },

    // 获取电力数据
    async getValue() {
      var res;
      if (this.cur_room === "1楼") {
        const { data: res1 } = await this.$http.get("/data/now", {
          params: {
            building: "南一楼",
            floor: 1,
          },
          headers: this.pushToken,
        });
        res = res1
      } else {
        const { data: res1 } = await this.$http.get("/data/now", {
          params: {
            building: "南一楼",
            floor: 1,
            classroom: this.cur_room,
          },
          headers: this.pushToken,
        });
        res = res1
      }
      if (!res.success) {
        return this.$message.error("获取电力数据失败！");
      }
      // 总路数据赋值
      this.power_data = res.data.rt_data[0];
      setTimeout(() => {
        this.getValue();
      }, 2000);
    },

    // 获取当前房间的id
    gerCurRoom(id) {
      this.cur_room = id[0] + id[1];
      this.$message("教室切换");
    },
    // 查看是否能获取到值
    async getStatus() {
      const { data: res } = await this.$http.get("/data/status", {
        params: {
          building: "南一楼",
          floor: 1,
        },
        headers: this.pushToken,
      });
      let datas = res.data;
      for (var i = 0; i < datas.length; i++) {
        var num = datas[i].replace(/[^0-9]/gi, "");
        num -= 101;
        var ch = datas[i].match(/[\u4e00-\u9fa5]/g).join("");
        if (ch === "东") {
          this.$set(this.east_able, num, false);
        } else if (ch === "中") {
          this.$set(this.mid_able, num, false);
        } else if (ch === "西") {
          this.$set(this.west_able, num, false);
        }
      }
    },
  },
};
</script>


<style lang="less" scoped>
.item {
  color: white;
  text-align: center;
  padding-top: 10px;
  margin: 10px;
}

#myChart {
  color: rgb(255, 255, 255);
  height: 80%;
  width: 100%;
}
</style>