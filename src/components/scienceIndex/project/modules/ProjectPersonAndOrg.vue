<template>
  <div class="projectPersonAndOrg">
    <div class="MyProjectPersonAndOrg" ref="MyProjectPersonAndOrg"></div>
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
    console.log(this.contentData)
      // this.getGraph();
  },
  mounted() {
    this.$nextTick(() => {
      this.getGraph();
    });
  },

  methods: {
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyProjectPersonAndOrg),
        _this = this;
      echarts.showLoading();
      let option = {
        tooltip: {},
        legend: {
          show: true,
          data: _this.contentData.categories
        },

        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 28,
            roam: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            draggable: true,
            force: {
              repulsion: 1000
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            edgeSymbolSize: [0, 50],
            categories: _this.contentData.categories,
            data: _this.contentData.data,
            links:this.contentData.links,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0
              }
            }
          }
        ],
        color: ['#ed2424', '#ff69b4', '#6dadd1', '#91c7ae','#ffa500']
      };

      echarts.setOption(option, true);
      echarts.hideLoading();
    }
  }
  // }
};
</script>
<style lang="scss" scoped>
.projectPersonAndOrg {
  .MyProjectPersonAndOrg {
    width: 100%;
    height: 300px;
  }
}
</style>