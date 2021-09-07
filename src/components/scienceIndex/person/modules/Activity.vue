<template>
  <div class="activity">
    <div class="MyActivity" ref="MyActivity"></div>
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
    // this.$nextTick(() => {
      // this.getGraph();

    // });
  },

  methods: {
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyActivity),
        _this = this;
      echarts.showLoading();
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: _this.contentData.legend,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: _this.contentData.xAxis,
        yAxis: [
          {
            type: "value"
          }
        ],
        series: _this.contentData.series
      };

      echarts.setOption(option, true);
      echarts.hideLoading();
    }
  }
  // }
};
</script>
<style lang="scss" scoped>
.activity {
  .MyActivity {
    width: 100%;
    height: 300px;
  }
}
</style>