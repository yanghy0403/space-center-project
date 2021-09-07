<template>
  <div class="StudyRelationship position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div v-if="change" class="MyStudyRelationship" ref="MyStudyRelationship"></div>
    <transition name="modal">
      <div v-if="!change">
        <div class="ivu-modal-wrap">
          <div class="ease-transition ivu-modal">
            <div class="ivu-modal-content">
              <a class="ivu-modal-close">
                <i class="ivu-icon ivu-icon-ios-close-empty"></i>
              </a>
              <div class="ivu-modal-header">
                <div class="ivu-modal-header-inner">{{title}}</div>
              </div>
              <div class="ivu-modal-body">
                <i class="full-icon-big" @click="handleChange"></i>
                <div class="MyStudyRelationship" ref="MyStudyRelationship"></div>
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
// import "echarts-StudyRelationship";
export default {
  data: () => ({
    change: true,
    clientHeight: "",
    contentData:{}
  }),
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      this.contentData = newVal;
      this.getGraph();
    }
    // links(newVal, oldVal) {
    //   this.newLinks = newVal;
    //   this.getGraph();
    // }
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
      // let time = setTimeout(() => {
        if (!this.change) {
          this.$refs.MyStudyRelationship.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyStudyRelationship.style.height = 300 + "px";
        }
        this.getGraph();
        // clearTimeout(time);
      // }, 100);
    },
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyStudyRelationship),
        _this = this;
      echarts.hideLoading();
      console.log(this.contentData);
   
      let option = {
        tooltip: {},
        legend: {
          show: true,
          data: _this.contentData.categories,
          itemWidth: 15, //图例的宽度
        itemHeight: 15, //图例的高度
        },

        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 35,
            roam: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            draggable: true,
            top:'20%',
            force: {
              repulsion: 600
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#666"
              }
            },
            edgeSymbolSize: [4, 50],
            categories: _this.contentData.categories,
            data: _this.contentData.data,
            links:this.contentData.links,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0
              }
            }
          }
        ],
        // color: ['','','']
        color: ["#EE4000", "#00FFFF", "#32CD32"]
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
.StudyRelationship {
  .MyStudyRelationship {
    width: 100%;
    height: 300px;
  }
}
</style>