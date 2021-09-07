
<template>
  <div class="YearKeywords">
    <div class="MyYearKeywords" ref="MyYearKeywords"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    myEcharts: null,
    contentData: {},
    time: null,
    color: [
      "#C1232B",
      "#0f4471",
      "#00adb5",
      "#E87C25",
      "#5628b4",
      "#20BF55",
      "#118df0",
      "#F3A43B",
      "#d3327b",
      "#ae318a",
      "#993090",
      "#6f3071",
      "#9BCA63",
      "#AEB7F9",
      "#B5C334",
      "#89C3F8",
      "#FCC667",
      "#FE8463",
      "#D7504B",
      "#C6E579"
    ]
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
  },
  mounted() {
    this.$nextTick(() => {
      this.getGraph();
    });
  },
  methods: {
    getGraph() {
      this.myEcharts = this.$echarts.init(this.$refs.MyYearKeywords);
      this.myEcharts.showLoading();
      // if (this.contentData.series) {
      let timeArr = this.contentData.xAxis;
      let series = this.contentData.series;

      let options = [];
      if (timeArr) {
        timeArr.forEach((item, i) => {
          options.push({
            xAxis: [
              {
                type: "category",
                axisLabel: {
                  interval: 0
                },
                data: series[i].map(item => {
                  return item.name;
                }),
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                data: series[i].map((item, i) => {
                  return {
                    itemStyle: {
                      color: this.color[i]
                    },
                    value: item.frequency
                  };
                })
              }
            ]
          });
        });
      }

      let option = {
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: true,
            bottom: "0%",
            left: "5%",
            right: "10%",
            label: {
              color: "#aaa"
            },
            lineStyle: {
              color: "#aaa"
            },
            symbolSize: 4,
            controlStyle: {
              color: "#aaa",
              borderColor: "#aaa",
              itemGap: 15,
              itemSize: 12
            },
            playInterval: 3000,
            data: timeArr
          },
          tooltip: {},
          calculable: true,
          grid: {
            top: "10%",
            bottom: "30%",
            left: "5%",
            right: "8%"
          },
          xAxis: [
            {
              type: "category",
              name: "关键词",
              axisLine: {
                lineStyle: {
                  color: "#666",
                  fontSize: 12
                }
              },
              axisLabel: {
                interval: 0,
                rotate: 15,
                formatter: function(value) {
                  if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
                    if (value.length >= 6) {
                      return value.substring(0, 6);
                    } else if (value.length < 6) {
                      return value;
                    }
                  } else {
                    if (value.length >= 20) {
                      return value.substring(0, 20);
                    } else if (value.length < 20) {
                      return value;
                    }
                  }
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "次数",
              minInterval: 1,
              axisLine: {
                // symbol: ['none', 'arrow'],
                // symbolSize: [6, 12],
                // symbolOffset: [10, 18],
                lineStyle: {
                  color: "#666"
                  // type:'dashed'
                }
              },
              splitLine: {
                lineStyle: {
                  // color: '#fff',
                  type: "dashed"
                }
              }
            }
          ],
          series: [
            {
              name: "出现次数",
              type: "bar"
            }
          ]
        },

        options: options
      };

      this.myEcharts.setOption(option, true);
      this.myEcharts.hideLoading();
      // }
    }
  },
  beforeDestroy() {
    this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.YearKeywords {
  .MyYearKeywords {
    width: 100%;
    height: 300px;
  }
}
</style>