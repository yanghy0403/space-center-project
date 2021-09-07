<template>
  <div class="paperNumAndRef">
    <div class="MypaperNumAndRef" ref="MypaperNumAndRef"></div>
  </div>
</template>
<script>
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
    this.$nextTick(() => {
    this.getGraph();
    });
  },

  methods: {
    getGraph() {
      let myEcharts = this.$echarts;
      let echarts = this.$echarts.init(this.$refs.MypaperNumAndRef),
        _this = this;
      echarts.showLoading();

      let option = {
        legend: {
          data: ["论文引用量", "发文量"],
          x: "200px", // 对齐方式
          itemGap: 100 // item之间的距离
        },
        tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            label: {
                show: false,
            }
        }
    },
        grid: {
        top: "10%",
        bottom: "8%",
        left: "5%",
        right: "2%"
        },
        xAxis: {
          type: "category",
          data: this.contentData.yearList
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.contentData.paperNum,
            type: "bar",
            name: "发文量",
          },
          {
            data: this.contentData.paperRefNum,
            type: "line",
            name: "论文引用量",
            symbolSize: 10 // 控制线条上 点 的大小
          }
        ]
      };

      echarts.setOption(option, true);
      echarts.hideLoading();
    }
    // }
  }
};
</script>
<style lang="scss" scoped>
.paperNumAndRef {
  .MypaperNumAndRef {
    width: 100%;
    height: 300px;
  }
}
</style>