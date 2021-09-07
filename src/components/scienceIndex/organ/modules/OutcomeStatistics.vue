<template>
  <div class="outcomeStatistics">
    <ul>
      <li>
        <div class="MyOutcomeStatistics" ref="MyOutcomeStatistics"></div>
      </li>
      <li>
        <div class="MyOutcomeStatistics_s" ref="MyOutcomeStatistics_s"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: {}
  }),
  props: ["data"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
      this.getGraph();
      this.getGraphs();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.contentData = this.data;

      this.getGraph();
      this.getGraphs();
    });
  },
  methods: {
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyOutcomeStatistics),
        _this = this;
      var fruitData = _this.contentData.fruitData
      var sum = 0;
      var fruit = fruitData.map(item => {
        return (sum = sum + item.value);
      });
      let option = {
        tooltip: {
          formatter: function(params) {
            return (
              params.data.name +
              ":" +
              (params.data.value / sum).toFixed(3) +
              "%"
            );
          }
        },
        // legend: {
        //   orient: "horizontal",
        //   data: _this.contentData.fruitNames
        // },
        series: [
          {
            name: "",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            color: [
              "#5fd27b",
              "#6173d6",
              "#47dfae",
              "#4ac7f5",
              "#f36f8a",
              "#42a4eb",
              "#426eeb",
              "#5f71d2",
              "#f36f8a"
            ],
            label: {
              normal: {
                fontSize: 12,
                // formatter: "{b|{b}：}{c}  {per|{d}%}  ",
                formatter: function(params) {
                  return params.data.name
                },
                rich: {
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: _this.contentData.fruitData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      echarts.hideLoading();

      echarts.setOption(option);
    },
    getGraphs() {
      let echarts = this.$echarts.init(this.$refs.MyOutcomeStatistics_s),
        _this = this;
      var includeData = _this.contentData.includeData;
      var sum = 0;
      var include = includeData.map(item => {
        return (sum = sum + item.value);
      });
      let option = {
        tooltip: {
          formatter: function(params) {
            return (
              params.data.name +
              ":" +
              (params.data.value / sum).toFixed(3) +
              "%"
            );
          }
        },
        // legend: {
        //   orient: "horizontal",
        //   data: _this.contentData.includeNames
        // },
        series: [
          {
            name: "",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            color: [
              "#5fd27b",
              "#6173d6",
              "#47dfae",
              "#4ac7f5",
              "#f36f8a",
              "#42a4eb",
              "#426eeb",
              "#5f71d2",
              "#f36f8a"
            ],
            label: {
              normal: {
                fontSize: 12,
                // formatter: "{b|{b}：}{c}  {per|{d}%}  ",
                formatter: function(params) {
                  return (
                    params.data.name
                  );
                },
                rich: {
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: _this.contentData.includeData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      echarts.hideLoading();

      echarts.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.outcomeStatistics {
  ul {
    width: 100%;
    height: 300px;
    li {
      width: 50%;
      height: 100%;
      float: left;
      .MyOutcomeStatistics,
      .MyOutcomeStatistics_s {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>