<template>
  <div class="relation">
    <div class="MyRelation" ref="MyRelation"></div>
  </div>
</template>
<script>
// import { setInterval, clearInterval } from "timers";
export default {
  data: () => ({
    contentData: {}
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
    // this.getGraph();
  },
  mounted() {
    this.$nextTick(() => {
      this.getGraph();
    });
  },

  methods: {
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyRelation),
        _this = this;
      echarts.showLoading();

      let option = {
        tooltip: {
          formatter: function(params) {
            console.log(params);
            if (params.dataType == "node") {
              return params.data.label + "：" + params.data.organizationName;
            } else if (params.dataType == 'edge') {
              return "合作频次为：" + params.value;
            }
          }
        },
        animationDurationUpdate: 1000,
        animationEasingUpdate: "quinticInOut",
        legend: {
          show: true,
          data: _this.contentData.categories,
          itemWidth: 16,
          itemHeight: 16
        },
        series: [
          {
            type: "graph",
            layout: "force",
            roam: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            draggable: true,
            center: [160, 125],
            force: {
              repulsion: 400,
              edgeLength: 60
              // gravity: 1
            },
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.3)"
              }
            },
            lineStyle: {
              width: 0.5,
              curveness: 0,
              opacity: 1
            },
            label: {
              emphasis: {
                position: "right",
                show: true,
              },
              normal: {
                show: true,
                position: "top",
                backgroundColor: "#fff",
                formatter: function(params) {
                  return params.data.label;
                },
                textStyle: {
                  backgroundColor: "#fff",
                  color: "#666",
                  fontWeight: "normal",
                  fontSize: "10" //字体大小
                }
              }
            },
            emphasis: {
              itemStyle: {
                borderWidth: 2
              },
              lineStyle: {
                color: "gray",
                width: 2
              }
            },
            data: _this.contentData.data,
            links: _this.contentData.links,
            categories: _this.contentData.categories
          }
        ]
      };

      echarts.setOption(option, true);
      echarts.hideLoading();
    }
  }
  // }
};
</script>
<style lang="scss" scoped>
.relation {
  .MyRelation {
    width: 100%;
    height: 300px;
  }
}
</style>