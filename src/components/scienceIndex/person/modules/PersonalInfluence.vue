<template>
  <div class="PersonalInfluence position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div v-if="change" class="MyPersonalInfluence" ref="MyPersonalInfluence"></div>
    <transition name="modal">
      <div v-if="!change">
        <div class="ivu-modal-wrap">
          <div class="ease-transition ivu-modal">
            <div class="ivu-modal-content">
              <a class="ivu-modal-close">
                <i class="ivu-icon ivu-icon-ios-close-empty"></i>
              </a>
              <div class="ivu-modal-header">
                <div class="ivu-modal-header-inner"></div>
              </div>
              <div class="ivu-modal-body">
                <i class="full-icon-big" @click="handleChange"></i>
                <div class="MyPersonalInfluence" ref="MyPersonalInfluence"></div>
              </div>
              <div class="ivu-modal-footer">
                <!-- <button class="ivu-btn ivu-btn-text ivu-btn-large" type="button">
              <span>取消</span>
                </button>-->
                <button class="ivu-btn ivu-btn-large" type="button">
                  <span @click="handleChange">关闭</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// import "echarts-PersonalInfluence";
export default {
  data: () => ({
    change: true,
    clientHeight: "",
    contentData: []
  }),
  props: ["data"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
      this.getGraph();
    }
  },
  mounted() {
    this.contentData = this.data;
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    let that = this;
    window.onresize = function() {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.$nextTick(() => {
      this.getGraph();
    });
  },
  methods: {
    handleChange() {
      this.change = !this.change;
      let time = setTimeout(() => {
        if (!this.change) {
          this.$refs.MyPersonalInfluence.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyPersonalInfluence.style.height = 300 + "px";
        }
        this.getGraph();
        clearTimeout(time);
      }, 100);
    },
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyPersonalInfluence),
        _this = this;
      echarts.showLoading();
      if(_this.contentData.indicator) {
        var indicator = _this.contentData.indicator;
      }
      
      var value = _this.contentData.data;
      let option = {
        tooltip: {},
        radar: [
          {
            indicator: indicator,
            center: ["50%", "50%"],
            radius: 90,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            name: {
              formatter: "【{value}】",
              textStyle: {
                color: "#72ACD1"
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(114, 172, 209, 0.2)",
                  "rgba(114, 172, 209, 0.4)",
                  "rgba(114, 172, 209, 0.6)",
                  "rgba(114, 172, 209, 0.8)",
                  "rgba(114, 172, 209, 1)"
                ],
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            }
          }
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
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
                value: value,
                name: "个人影响力",
                areaStyle: {
                  normal: {
                    color: "rgba(216,211,122,1)"
                  }
                }
              }
            ]
          }
        ]
      };

      echarts.setOption(option);
      echarts.hideLoading();
    }
  }
};
</script>
<style lang="scss" scoped>
.PersonalInfluence {
  .MyPersonalInfluence {
    width: 100%;
    height: 300px;
  }
}
</style>