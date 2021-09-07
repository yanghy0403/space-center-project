
<template>
  <div class="radar">
    <div ref="MyRadar" class="MyRadar"></div>
    <p
      v-for="(item,index) in radarData"
      :key="index+'m'"
      :style="'transform: rotate('+item.rotate+'deg)'"
    >{{item.name}}</p>
  </div>
</template>
<script>
export default {
  data: () => ({ radarData: [] }),
  props: {
    // items: {
    //   // 必须提供字段
    //   required: true
    // },
    radius: {
      // 可选字段，有默认值   
       default: 90
    },
    id: {
       default: 'radars'
    
    },
    position:{
      default: 'right'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getGraph();
    });
  },
  methods: {
    getColor(idx) {
      var palette = [
        "#2ec7c9",
        "#b6a2de",
        "#5ab1ef",
        "#ffb980",
        "#d87a80",
        "#8d98b3",
        "#e5cf0d",
        "#97b552",
        "#95706d",
        "#dc69aa",
        "#07a2a4",
        "#9a7fd1",
        "#588dd5",
        "#f5994e",
        "#c05050",
        "#59678c",
        "#c9ab00",
        "#7eb00a",
        "#6f5553",
        "#c14089"
      ];
      return palette[idx % palette.length];
    },
    getGraph() {
      let _this = this;
      this.radarData = [
        {
          name: "论文数",
          rotate: 80,
          color: "#fff"
        },
        {
          name: "英文论文",
          rotate: 40,
          color: "#fff"
        },
        {
          name: "被引数",
          rotate: 20,
          color: "#fff"
        },
        {
          name: "SCI论文",
          rotate: 40,
          color: "#fff"
        },
        {
          name: "专利数",
          rotate: 30,
          color: "#fff"
        },
        {
          name: "标准数",
          rotate: 40,
          color: "#fff"
        },

        {
          name: "项目数",
          rotate: 20,
          color: "#fff"
        }
      ];
      const length = this.radarData.length;
      for (let index = 0; index < length; index++) {
        let rotate = 360 / length;
        this.radarData[index].rotate = 90 + rotate * index;
      };
      let echarts = this.$echarts.init(this.$refs.MyRadar);
      let option = {
        // title: {
        //   text: "自定义雷达图"
        // },
        // legend: {
        //   data: ["图一", "图二", "张三", "李四"]
        // },
        tooltip: {
          trigger: "axis",
          position: _this.position
        },
        radar:{
            indicator: [
              { text: "科研", color: "#fff" },
              { text: "论文", color: "#fff" },
              { text: "专利", color: "#fff" },
              { text: "成果", color: "#fff" },
              { text: "社会影响", color: "#fff" },
              { text: "奖励", color: "#fff" },
              { text: "标准", color: "#fff" }
            ],
            center: ["50%", "50%"],
            radius: _this.radius,
            startAngle: 90,
            splitNumber: 5,
            shape: "circle",
            name: {
             show: false,
            },
            splitArea: {
              areaStyle: {
                color: ["#EBEBA9", "#EBEBA6", "#EFEFB9", "#F4F4CE", "#F9F9E5"],
                shadowColor: "rgba(0, 0, 0, 0)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#ccc"
              }
            }
          }
        ,
        series: [
          {
            name: "雷达图",
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 4
                }
              }
            },
            data: [
              {
                value: [10, 3, 20, 10, 20, -8, 40],
                name: "图一",
                symbol: "none",
                symbolSize: 7,
                areaStyle: {
                  normal: {
                    color: "#78BE54"
                  }
                },
                lineStyle: {
                  normal: {
                    type: "solid",
                    color: "#78BE54"
                  }
                }
              }
              // {
              //   value: [60, 5, 0.3, -140, 1500],
              //   name: "图二",
              //   areaStyle: {
              //     normal: {
              //       color: "rgba(255, 255, 255, 0.5)"
              //     }
              //   }
              // }
            ]
          }
        ]
      };
      echarts.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.radar {
  position: relative;
  width: 100%;
  height: 100%;
  .MyRadar {
    width: 100%;
    height: 100%;
  }
  > p {
    position: absolute;
    bottom: 50%;
    font-size: 12px;
    width: 50%;
    padding-left: 8px;
    transform-origin: bottom right;
    transform: rotate(90deg);
  }
}
</style>