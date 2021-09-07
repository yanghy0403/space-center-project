<template>
  <div class="columnar">
    <div class="MyColumnar" ref="MyColumnar"></div>
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
    }
  },
  created() {
    this.contentData = this.data;
    
    // this.getGraph();
  },
  mounted() {
    // this.$nextTick(() => {
    this.getGraph();
    // });
  },

  methods: {
    getGraph() {
      //   let myEcharts = this.$echarts;
      let echarts = this.$echarts.init(this.$refs.MyColumnar),
        _this = this;
      echarts.showLoading();


      var titleArr = [],
        seriesArr = [];
      let colors = [
        ["#389af4", "#87CEFA"],
        ["#ff8c37", "#ffdcc3"],
        ["#ffc257", "#F5DEB3"],
        ["#fd6f97", "#F08080"],
        ["#a181fc", "#e3d9fe"]
      ];
      this.contentData.forEach(function(item, index) {
        titleArr.push({
          text: item.name + '('+item.count+')',
          left: index * 20 + 10 + "%",
          top: "0%",
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: "16",
            color: colors[index][0],
            textAlign: "center"
          }
        });
        seriesArr.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: [35, 45],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: [index * 20 + 10 + "%", "50%"],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function(params) {
                    return params.value + "%";
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "20",
                    fontWeight: "bold",
                    color: colors[index][0]
                  }
                }
              }
            },
            {
              value: 100 - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: colors[index][1]
                },
                emphasis: {
                  color: colors[index][1]
                }
              }
            }
          ]
        });
      });

      let option = {
        // backgroundColor: "#fff",
        title: titleArr,
        series: seriesArr
      };

      echarts.setOption(option, true);
      echarts.hideLoading();
    }
  }
};
</script>
<style lang="scss" scoped>
.columnar {
  .MyColumnar {
    width: 100%;
    height: 150px;
  }
}
</style>