<template>
  <div class="JournalRanking position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div v-if="change" class="MyJournalRanking" ref="MyJournalRanking"></div>
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
                <div class="MyJournalRanking" ref="MyJournalRanking"></div>
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
// import "echarts-JournalRanking";
export default {
  data: () => ({
    change: true,
    clientHeight: "",
    contentData: null
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
          this.$refs.MyJournalRanking.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyJournalRanking.style.height = 300 + "px";
        }
        this.getGraph();
        clearTimeout(time);
      }, 100);
    },
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyJournalRanking),
        _this = this;
      echarts.showLoading();
      var builderJson = _this.contentData;

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },

        grid: {
          top: "1%",
          left: "25%",
          right: "5%",
          bottom: "10%"
        },
        xAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
          // splitNumber: 10
        },
        yAxis: {
          type: "category",
          // inverse:true,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 30,
            margin: 15,
            padding: -60,
            textStyle: {
              align: "left"
            },
            formatter: function(value) {
              if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
                if (value.length >= 6) {
                  return value.substring(0, 6);
                } else {
                  return value;
                }
              } else {
                if (value.length > 12) {
                  return value.substring(0, 12);
                } else {
                  return value;
                }
              }
            }
          },
          data: Object.keys(builderJson.charts).reverse()
        },
        series: [
          {
            name: _this.contentData.name,
            type: "bar",
            data: Object.keys(builderJson.charts).reverse().map(function(key) {
              return builderJson.charts[key];
            })
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
.JournalRanking {
  .MyJournalRanking {
    width: 100%;
    height: 300px;
  }
}
</style>