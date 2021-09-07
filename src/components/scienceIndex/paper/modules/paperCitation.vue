
<template>
  <div class="Citation">
    <div class="MyCitation" ref="MyCitation"></div>
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
      // clearTimeout(this.time);
      let echarts = this.$echarts.init(this.$refs.MyCitation),
        _this = this;
      // var date = new Date().getFullYear();
      // echarts.showLoading();
      // if (this.data.content) {
      var data1 = {
            "name": "参考文献",
            "children": [
                {
                    "name": "data",
                },
                {
                    "name": "display",
                },
                {
                    "name": "flex",
                },
                {
                    "name": "query",
                },
                {
                    "name": "scale",
                },
                {
                    "name": "data",
                },
                {
                    "name": "display",
                },
                {
                    "name": "flex",
                },
                {
                    "name": "query",
                },
                {
                    "name": "scale",
                }
            ]
        };

        var data2 = {
            "name": "引证文献",
            "children": [
                {
                    "name": "flex"
                },
                {
                    "name": "scale",
                },
                {
                    "name": "display",
                },
                {
                    "name": "flex"
                },
                {
                    "name": "scale",
                },
                {
                    "name": "display",
                }
            ]
        };

        let option = {

            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            legend: {
                x: 'left',
                orient: 'vertical',
                data: [ '参考文献','引证文献',]
            },
            series: [
                {
                    name: '参考文献',
                    type: 'tree',
                    data: [data1],

                    top: '1%',
                    left: '25%',
                    bottom: '1%',
                    right: '60%',

                    symbolSize: 10, //控制圆圈的大小

                    orient: 'RL',   // 控制左右

                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left',
                        fontSize: 14
                    },
                    itemStyle: {
                        color: '#00FFFF',
                        borderColor: '#00FFFF',
                        borderWidth: '10'
                    },
                    leaves: {
                        label: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right'
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                },
                {
                    name: '引证文献',
                    type: 'tree',
                    data: [data2],

                    top: '1%',
                    left: '60%',
                    bottom: '1%',
                    right: '25%',

                    symbolSize: 10,

                    label: {
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 14
                        }
                    },
                    itemStyle: {
                        color: '#FF69B4',
                        borderColor: '#FF69B4',
                        borderWidth: '10'
                    },
                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        }

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