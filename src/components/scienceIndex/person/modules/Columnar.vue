<template>
  <div class="columnar">
    <div class="MyColumnar" ref="MyColumnar"></div>
  </div>
</template>
<script>
// import { setTimeout, clearTimeout } from "timers";
// import { setInterval, clearInterval } from "timers";
export default {
  data: () => ({
    contentData: []
  }),
  props: ["data"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
      this.getGraph();
    }
  },
  created() {
    this.contentData = this.data;
  },
  mounted() {
    // this.$nextTick(() => {
      this.getGraph();
    // });
  },

  methods: {
    getGraph() {
      let myEcharts = this.$echarts;
      let echarts = this.$echarts.init(this.$refs.MyColumnar),
        _this = this;
      echarts.showLoading();
      let charts = {
        unit: "",
        names: _this.contentData.names,
        lineX: _this.contentData.lineX,
        value: _this.contentData.value
      };
      let color = [
        "rgba(35, 122, 224",
        "rgba(7, 70, 143",
        "rgba(157, 128, 216",
        "rgba(264, 96, 259",
        "rgba(165, 245, 209",
        "rgba(241, 181, 245",
        "rgba(153, 293, 160",
        "rgba(287, 232, 83",
        "rgba(255, 69, 0",
        "rgba(255, 222, 173"
      ];
      let lineY = [];
      for (var i in charts.names) {
        var x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        let data = {
          name: charts.names[i],
          type: "line",
          color: color[x] + ")",
          smooth: true,
          areaStyle: {  //配置渐变颜色
            normal: {
              color: new myEcharts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[x] + ", 0.5)"
                  },
                  {
                    offset: 0.8,
                    color: color[x] + ", 0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          symbol: "circle",
          symbolSize: 5,
          data: charts.value[i]
        };
        lineY.push(data);
      }

      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: 12,
            color: "#000"
          },
          right: "4%"
        },
        grid: {
          top: "20%",
          left: "%",
          right: "2%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: charts.lineX,
          axisLabel: {
            textStyle: {
              color: "#000"
            },
            formatter: function(params) {
              return params;
            }
          }
        },
        yAxis: {
          name: charts.unit,
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#000"
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: "#ccc"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          }
        },
        series: lineY
      };
      echarts.setOption(option, true);
      echarts.hideLoading();
    }
  }
};
</script>
<style lang="scss" scoped>
.columnar {
  .MyColumnar {
    width: 100%;
    height: 300px;
  }
}
</style>