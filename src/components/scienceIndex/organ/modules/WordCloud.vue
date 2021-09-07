
<template>
  <div class="wordCloud position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div v-if="change" class="MyWordCloud" ref="MyWordCloud"></div>
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
                <div class="MyWordCloud" ref="MyWordCloud"></div>
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
import "echarts-wordcloud";
export default {
  data: () => ({
    change: true,
    clientHeight: "",
    contentData: null
  }),
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
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
          this.$refs.MyWordCloud.style.height = this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyWordCloud.style.height = 300 + "px";
        }
        this.getGraph();
        clearTimeout(time);
      }, 100);
    },
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyWordCloud),_this=this;
      echarts.hideLoading();
      let option = {
        backgroundColor: "transparent",
        title: {
          x: "center",
          textStyle: {
            fontSize: 23
          }
        },
        tooltip: {
          show: true
        },
        series: [
          {
            name: "高频词",
            type: "wordCloud",
            shape: "ellipse",
            gridSize: 0,
            sizeRange: [12, 40],
            textRotation: [0, 90, -45, 45],
            rotationRange: [-45, 90],
            shape: 'circle',
            shape: 'pentagon',
            shape:'smooth',  //平滑
            // drawOutOfBound: true,
            textPadding: 0,
            autoSize: true,
            //   gridSize: 1,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: _this.contentData
          }
        ]
      };

      echarts.setOption(option);
      //myChart.setOption(option);
      echarts.on("click", function(params) {
        //alert((params.name));
        // window.open(
        //   "https://www.baidu.com/s?wd=" + encodeURIComponent(params.name)
        // );
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wordCloud {
  .MyWordCloud {
    width: 100%;
    height: 300px;
  }
}
</style>