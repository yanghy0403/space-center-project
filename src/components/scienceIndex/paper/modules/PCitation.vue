<template>
  <div class="Citation">
    <div class="MyCitation" ref="MyCitation"></div>
  </div>
</template>
<script>
import { log } from "util";
// import { setInterval, clearInterval } from "timers";
export default {
  data: () => ({
    contentData: []
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
      // clearTimeout(this.time);
      let echarts = this.$echarts.init(this.$refs.MyCitation),
        _this = this;
      echarts.showLoading();
      let left = _this.contentData.left;
      let right = _this.contentData.right;

      function test() {
        if (left) {
          if (left[0].children != undefined) {
            left[0].children = left[0].children.map(item => {
              if (item.name.length >= 15) {
                item.label = item.name
                item.name = item.name.substring(0, 15) + "...";
              }
              return item;
            });
          }
        }
        if (right) {
          if (right[0].children != undefined) {
            right[0].children = right[0].children.map(item => {
              if (item.name.length >= 15) {
                item.label = item.name
                item.name = item.name.substring(0, 15) + "...";
              }
              return item;
            });
          }
        }
      }
      test();

      let data = [];
      if (this.contentData.length != 0) {
        if (left["0"].name == right["0"].name) {
          left["0"].name = "";
          right["0"].name = "本篇论文";
        }
      }

      let option = {
        tooltip: {
          // trigger: "item",
          formatter: function(params) {
            return params.data.label
          },
          triggerOn: "mousemove",
          // formatter: "{b0}"
        },
        series: [
          {
            type: "tree",
            data: _this.contentData.right,
            // height:'200px',
            // width: "30%",
            top: "1%",
            left: "30%",
            bottom: "1%",
            right: "50%",
            symbolSize: 10,
            orient: "RL",
            label: {
              position: "right",
              verticalAlign: "bottom",
              align: "right"
            },
            itemStyle: {
              // color: '#00FFFF',
              // borderColor: '#ed2424',
              borderWidth: "2"
            },
            leaves: {
              label: {
                position: "left",
                verticalAlign: "middle",
                align: "right"
              }
            },
            expandAndCollapse: false,
            animationDuration: 550,
            animationDurationUpdate: 750
          },
          {
            type: "tree",
            data: _this.contentData.left,
            top: "1%",
            left: "50%",
            bottom: "1%",
            right: "30%",
            symbolSize: 10,
            orient: "LR",
            label: {
              position: "right",
              verticalAlign: "bottom",
              align: "center"
            },
            itemStyle: {
              // color: '#00FFFF',
              // borderColor: '#ed2424',
              borderWidth: "2"
            },
            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left"
              }
            },
            expandAndCollapse: false,
            animationDuration: 550,
            animationDurationUpdate: 750
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
.Citation {
  .MyCitation {
    width: 100%;
    height: 300px;
  }
}
</style>