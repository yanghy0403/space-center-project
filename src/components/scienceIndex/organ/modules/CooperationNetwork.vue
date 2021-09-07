<template>
  <div class="cooperationNetwork position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div v-if="change" class="MyCooperationNetwork" ref="MyCooperationNetwork"></div>
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
                <div class="MyCooperationNetwork" ref="MyCooperationNetwork"></div>
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
import jg0 from "../../../../assets/icon/organ1.png";
import jg from "../../../../assets/icon/organ2.png";
export default {
  data: () => ({
    contentData: [],
    change: true,
    clientHeight: ""
  }),
  props: ["data", "title"],
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
          this.$refs.MyCooperationNetwork.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyCooperationNetwork.style.height = 300 + "px";
        }
        this.getGraph();
        clearTimeout(time);
      }, 100);
    },
    getGraph() {
      this.myEcharts = this.$echarts.init(this.$refs.MyCooperationNetwork);
      this.myEcharts.showLoading();
      let repulsion = 700;
      if (!this.change) {
        repulsion = 800;
      }
      var nodes = this.contentData.nodes;
      var nodesData = [];
      if (nodes) {
        nodes.forEach(item => {
          console.log(item);
          if (item.group == "0") {
            nodesData.push({
              organizationId: item.organizationId,
              name: item.name,
              symbol: "image://" + jg,
              symbolSize: 25
            });
          } else if (item.group == "1") {
            nodesData.push({
              organizationId: item.organizationId,
              name: item.name,
              value: item.count,
              symbol: "image://" + jg0,
              symbolSize: 25
            });
          }
        });
      }

      let linksList = [];
      let temp = {};
      for (let i = 1; i < nodesData.length; i++) {
        temp.source = 0;
        temp.target = i;
        temp.value = nodesData[i].value;
        temp.attributes = {};
        temp.lineStyle = {
          normal: {
            width: 1
          }
        };
        linksList.push(temp);
        temp = {};
      }

      let option = {
        tooltip: {
          formatter: function(params) {
            console.log(params);
            if (params.dataType == "node") {
              return params.data.name;
            } else if (params.dataType == "edge") {
              return "合作频次为：" + params.value;
            }
          }
        },

        series: [
          {
            type: "graph",
            layout: "force",
            data: nodesData,
            cursor: "pointer",
            links: linksList,
            emphasis: {
              label: {
                show: true
              }
            },

            label: {
              normal: {
                show: false,
                position: "inside",
                textStyle: {
                  color: "#666",
                  fontWeight: "normal",
                  fontSize: "12" //字体大小
                }
              },
              emphasis: {
                position: "top",
                show: true,
                backgroundColor: "#fff"
              }
            },
            // emphasis: {
            //   itemStyle: {
            //     borderWidth: 2
            //   },
            //   lineStyle: {
            //     color: "#D53A35",
            //     width: 3
            //   }
            // },
            roam: true,
            draggable: true,
            focusNodeAdjacency: true,
            force: {
              // edgeLength: 70,
              gravity: 0.3, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              repulsion: repulsion //值越大则斥力越大
              // edgeLength: 80
            }
          }
        ]
      };

      // this.myEcharts.off("click");
      // this.myEcharts.on("click", param => {
      //   this.$emit("on-callback", param.data.id);
      //   history.pushState("", "", "/#/orgdetails?orgId=" + param.data.id);
      // });
      this.myEcharts.setOption(option, true);
      this.myEcharts.hideLoading();
      // }
    },
    // 获取随机颜色
    getRandomColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(
          -6
        )
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.cooperationNetwork {
  .MyCooperationNetwork {
    width: 100%;
    height: 300px;
  }
}
</style>