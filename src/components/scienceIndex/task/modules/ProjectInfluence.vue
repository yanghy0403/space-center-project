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
    console.log(this.contentData);
    this.getGraph();
  },
  mounted() {
    // this.$nextTick(() => {
    this.getGraph();

    // });
  },

  methods: {
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyActivity),
        _this = this;
      echarts.showLoading();

      let option = {
        tooltip: {},
        legend: {
          data: ["工程影响力"],
          x: 'left'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "论文（paper）", max: 6500 },
            { name: "SCIP（SCIP paper）", max: 16000 },
            { name: "被引频次 Cited", max: 30000 },
            { name: "专利数量（patent）", max: 38000 },
            { name: "专著数量（Monographs）", max: 52000 },
            { name: "国际合作（International Cooperation）", max: 25000 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）"
              }
            ]
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
.activity {
  .MyActivity {
    width: 100%;
    height: 300px;
  }
}
</style>