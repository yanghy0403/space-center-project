
<template>
  <div class="experience">
    <div class="MyExperience" ref="MyExperience"></div>
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
      let echarts = this.$echarts.init(this.$refs.MyExperience),
        _this = this;
    //   echarts.showLoading();

    // var nodes = _this.contentData.nodes;
    // var links =  _this.contentData.links;
    // nodes.forEach(item => {
    //   console.log(item[0].personId)
    // })
    // links.forEach(item => {
    //   console.log(item.source)
    // })

      let option = {
        tooltip: {
          show: false
        },
        legend: {
          x: "center",
          data: ["现任机构", "社会任职机构", "曾任职机构", "高校"]
        },
        animation: false,
        series: [
          {
            categories: [
              {
                name: "现任机构",

                itemStyle: {
                  normal: {
                    color: "#0027ff"
                  }
                }
              },
              {
                name: "社会任职机构",

                itemStyle: {
                  normal: {
                    color: "	#228B22"
                  }
                }
              },
              {
                name: "曾任职机构",

                itemStyle: {
                  normal: {
                    color: "#00BFFF"
                  }
                }
              },
              {
                name: "高校",

                itemStyle: {
                  normal: {
                    color: "#ed2424"
                  }
                }
              }
            ],
            type: "graph",
            layout: "force",
            symbol: "circle",
            symbolSize: 50,
            roam: true, //禁止用鼠标滚轮缩小放大效果
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [0, 10],
            // 连接线上的文字
            focusNodeAdjacency: true, //划过只显示对应关系
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 20
                },
                formatter: "{c}"
              }
            },
            lineStyle: {
              normal: {
                opacity: 1,
                width: 2,
                curveness: 0
              }
            },
            // 圆圈内的文字
            label: {
              normal: {
                show: true
              }
            },
            force: {
              repulsion: 5000
            },
            data: _this.contentData.nodes,
            
            links: _this.contentData.links
          }
        ]
      };

      echarts.setOption(option, true);
      echarts.hideLoading();
    }
  }
};
</script>
<style lang="scss" scoped>
.experience {
  .MyExperience {
    width: 100%;
    height: 300px;
  }
}
</style>