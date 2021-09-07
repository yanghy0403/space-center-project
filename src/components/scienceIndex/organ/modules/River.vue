<template>
  <div class="river">
    <div class="MyRiver" ref="MyRiver"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: {},
    time: null
  }),
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      this.contentData = newVal;
      this.getGraph();
    }
  },
  created() {
    this.contentData = this.data;
    console.log(this.contentData);
  },
  mounted() {
    this.contentData = this.data;
    console.log(this.contentData);
    this.$nextTick(() => {
      this.getGraph();
    });
  },
  methods: {
    getGraph() {
      let myYRChart = this.$echarts.init(this.$refs.MyRiver);
      let _this = this;
      // myYRChart.showLoading();

      if (_this.contentData.data) {
        _this.contentData.data.sort((a, b) => {
          return a[0] * 1 - b[0] * 1;
        });
        let timeArr = [],
          dataArr = [];
        _this.contentData.data.forEach((item, i) => {
          timeArr.push(item[0]);
          dataArr.push([item[0], item[1], item[2]]);
        });

        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line",
              lineStyle: {
                color: "rgba(0,0,0,0.2)",
                width: 1,
                type: "solid"
              }
            },
            formatter: function(params) {
              var html = "",
                axisValue = "";
              params.forEach(function(item, index) {
                axisValue = item.axisValue;
                //  console.log(axisValue)
                html =
                  html +
                  `<li><i style="background: ${item.color}"></i>${
                    item.value[2]
                  }：<span>${item.value[1]}</span></li>`;
              });
              return `
                <div class="tip-box">
                    <span>
                      年份：${params[0].value[0]}
                    </span>
                    <ul>
                        ${html}
                    </ul>
                </div>
                `;
            }
          },

          legend: {
            // data: ["DQ", "TY", "SS", "QG", "SY", "DD"],
            data: _this.contentData.types,
            icon: "circle", //? 这个字段控制形状? 类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
            itemWidth: 15, // 设置宽度
            itemHeight: 15, // 设置高度
            itemGap: 10 // 设置间距
          },
          dataZoom: [
            {
              show: true,
              height: 20,
              bottom: "0%",
              handleSize: "110%",
              handleStyle: {
                color: "#d3dee5",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              labelPrecision: 0,
              textStyle: {
                color: "#000"
              },
              borderColor: "#eee",
              labelFormatter: function(value) {
                var date = new Date(value);

                return date.getFullYear();
              }
            },
            {
              type: "inside",
              show: true,
              height: 15,
              start: "",
              end: ""
            }
          ],

          singleAxis: {
            top: 50,
            bottom: 50,
            axisTick: {},
            axisLabel: {
              formatter: function(value, index) {
                var date = new Date(value);

                return date.getFullYear();
              }
            },
            type: "time",
            axisPointer: {
              animation: true,
              label: {
                show: false
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                opacity: 0.2
              }
            }
          },

          series: [
            {
              type: "themeRiver",
              itemStyle: {
                emphasis: {
                  shadowBlur: 20,
                  shadowColor: "rgba(0, 0, 0, 0.8)"
                }
              },
              label: {
                show: false
              },
              formatter: function(value, index) {
                // 格式化成月/日，只在第一个刻度显示年份
                return index;
              },
              data: dataArr
            }
          ]
        };
        myYRChart.setOption(option, true);
        myYRChart.hideLoading();
      }

      // };
    }
  }
};
</script>
<style lang="scss" scoped>
.river {
  .MyRiver {
    width: 100%;
    height: 300px;
  }
}
</style>