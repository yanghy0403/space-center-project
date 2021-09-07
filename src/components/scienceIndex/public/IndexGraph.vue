
<template>
  <div class="indexGraph">
    <div id="MyIndexGraph" ref="MyIndexGraph"></div>
  </div>
</template>
<script>
import jsonApi from "../../../api/graph_json.js";

export default {
  data: () => ({
    graphdata: {}
  }),
  props: ["data"],
  watch: {
    data(news) {
      this.graphdata = news;
      //console.log(this.graphdata);
      this.$nextTick(() => {
        this.getGraph();
      });
    }
  },
  mounted() {
    this.graphdata = this.data;
    // this.$nextTick(() => {
    //   this.getGraph();
    // });
  },
  methods: {
    getGraph() {
      let id = this.$refs.MyIndexGraph.id;
      let echarts = this.$echarts.init(document.getElementById(id));
      echarts.showLoading();
      let mylineStyle = {
        show: true,
        color: "white", //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
        shadowColor: "red", //阴影颜色
        shadowOffsetX: 0, //阴影水平方向上的偏移距离。
        shadowOffsetY: 0, //阴影垂直方向上的偏移距离
        shadowBlur: 5, //图形阴影的模糊大小。
        type: "solid", //坐标轴线线的类型，solid，dashed，dotted
        width: 3, //坐标轴线线宽
        opacity: 1 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
      };

      //var data = require('../../../assets/json/person.json');
      // console.log(this.graphdata);
      var data = this.graphdata;
      // console.log(data)
      var json = data.content;
      var legend = data.categories;

      var nodes = data.nodes;
      // console.log(nodes)
      var links = data.links;
      var colorlist = [
        "#fca276",
        "#438EFE",
        "#5bcc5e",
        "#ce68be",
        "#ce3c3c",
        "#ccc869",
        "#80d7ff",
        "#ccc869",
        "#80d7ff",
        "#CD5555",
        "#66d8fe",
        "#0a78ff",
        "#c962e4",
        "#fb695e",
        "#668B8B",
        "#00F5FF",
        "#FFDEAD",
        "#54FF9F",
        "#191970",
        "#4EEE94",
        "#8470FF",
        "#00CD00"
      ];
      var bordercolor = [
        "#ffbc90",
        "#eb8ecd",
        "#f76c76",
        "#d1b6ff",
        "#b1e5a2",
        "#e1e574",
        "#a3eaff"
      ];

      nodes = nodes.map(item => {
        if (item.category == "人才") {
          if(item.influence>0){
               return {
                  name: item.name,
                  id: item.id,
                  category: item.category,
                  center: item.center,
                  influence: (Math.log(item.influence) / Math.log(10)).toFixed(2) * 1,
                  label: {
                    show: true,
                    position: "inside",
                    color: "#fff",
                    align: "center"
                  }
                };
          }else{
            return {
                  name: item.name,
                  id: item.id,
                  category: item.category,
                  center: item.center,
                  influence: 0,
                  label: {
                    show: true,
                    position: "inside",
                    color: "#fff",
                    align: "center"
                  }
                };
          }
        } else {
          return {
            name: item.name,
            id: item.id,
            category: item.category,
            center: item.center,
            label: {
              show: false,
              position: "inside",
              color: "auto",
              align: "center"
            }
          };
        }
      });

      var newnodes = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < legend.length; j++) {
          if (nodes[i].category == legend[j]) {
            if (nodes[i].category == "人才") {
              newnodes.push({
                name: nodes[i].name,
                id: nodes[i].id,
                category: nodes[i].category,
                center: nodes[i].center,
                influence: nodes[i].influence,
                itemStyle: {
                  normal: {
                    color: colorlist[j],
                    borderWidth: 2,
                    borderColor: "#ddd"
                  }
                },
                label: nodes[i].label
              });
            } else {
              newnodes.push({
                name: nodes[i].name,
                id: nodes[i].id,
                category: nodes[i].category,
                center: nodes[i].center,
                itemStyle: {
                  normal: {
                    color: colorlist[j],
                    borderWidth: 2,
                    borderColor: "#ddd"
                  }
                },
                label: nodes[i].label
              });
            }
          }
        }
      }
      nodes = newnodes;
       
      var nodearr = [];
      nodes.forEach(item => {
        if (item.category == "人才") {
          nodearr.push(item.influence);
        }
      });
      
      nodearr = nodearr.sort(function(a, b) {
        return a - b;
      });
        
      var grads = (nodearr[nodearr.length - 1] - nodearr[0]) / 10;

      var firstlink = nodearr[0];
    //  console.log(grads)
    //  console.log(firstlink)
      nodes = nodes.map(item => {
        if (item.category == "人才") {
          if (item.influence <= firstlink + grads * 1) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 24,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 2 &&
            item.influence > firstlink + grads * 1
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 10,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 3 &&
            item.influence > firstlink + grads * 2
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 16,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 4 &&
            item.influence > firstlink + grads * 3
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 22,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 5 &&
            item.influence > firstlink + grads * 4
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 28,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 6 &&
            item.influence > firstlink + grads * 5
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 34,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 7 &&
            item.influence > firstlink + grads * 6
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 40,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 8 &&
            item.influence > firstlink + grads * 7
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 46,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 9 &&
            item.influence > firstlink + grads * 8
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 52,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          } else if (
            item.influence <= firstlink + grads * 10 &&
            item.influence > firstlink + grads * 9
          ) {
            return {
              name: item.name,
              id: item.id,
              category: item.category,
              center: item.center,
              influence: item.influence,
              symbolSize: 58,
              itemStyle: item.itemStyle,
              label: {
                show: item.label.show,
                position: item.label.position,
                color: item.label.color,
                align: item.label.align,
                fontSize: 12
              }
            };
          }
        } else {
          return {
            name: item.name,
            id: item.id,
            category: item.category,
            center: item.center,
            symbolSize: 15,
            itemStyle: item.itemStyle,
            label: {
              show: item.label.show,
              position: item.label.position,
              color: item.label.color,
              align: item.label.align,
              fontSize: 12
            }
          };
        }
      });

      // console.log(links);
      // console.log(legend)
      var categories = legend.map(item => {
        return {
          name: item
        };
      });
      //   var arrids = nodes.map(item=>{
      //      return item.id;
      //   })
      //  var arr =[];
      //  var arr1 =[];
      //  for(var i=0;i<arrids.length;i++){
      //     if(arr.indexOf(arrids[i]) ==-1){
      //         arr.push(arrids[i])
      //     }else{
      //         arr1.push(arrids[i])
      //     }
      //  }
      //console.log(arr)
      //  console.log(arr.indexOf('394889d7dd844102b8cefe62bf5cef50'))
      //console.log(arr1)
      //  console.log(nodes);
      //  console.log(links)
      //  console.log(categories)
      let option = {
        tooltip: {
          position: "inside",
          formatter: function(params) {
            if (params.dataType == "node") {
              if (params.data.category !== "人才") {
                return params.name;
              }
            } else if (params.dataType == "edge") {
              return "";
            }
          }
        },
        animationDurationUpdate: 300,
        animationEasingUpdate: "quinticInOut",
        legend: {
          //增加图例，echarts标准图例，靠右、纵向排列，可点选
          orient: "vertical",
          left: "right",
          bottom: "34",
          textStyle: {
            color: "#66d8fe", //颜色你自己看着改一下
            fontSize: 10
          },
          data: legend
        },
        color: colorlist, //图例颜色用，和图上节点保持一致

        series: [
          {
            itemStyle: {
              borderType: "solid",
              borderColor: "rgba(255,215,0,0.4)",
              borderWidth: 2,
              opacity: 1
            },
            width: 844.5, //此处为根据图实际宽度设置
            height: 600,
            type: "graph",
            layout: "force",
            focusNodeAdjacency: true,
            categories: categories,
            // progressiveThreshold: 700,
            data: nodes,
            edges: links,
            roam: true,
            zoom: 0.4,
            force: {
              repulsion: 200,
              edgeLength: 50
            },
            lineStyle: {
              normal: {
                show: false,
                width: 0.3,
                curveness: 0,
                opacity: 0.9,
                color: "#ddd"
              },
              emphasis: mylineStyle
            },
            label: {
              normal: {
                formatter: function(value) {
                  if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
                    if (value.name.length > 3) {
                      return value.name.substring(0, 3);
                    } else {
                      return value.name;
                    }
                  } else {
                    if (value.name.length > 3) {
                      return value.name.substring(0, 3);
                    } else {
                      return value.name;
                    }
                  }
                }
              },
              emphasis: {
                formatter: function(value) {
                  return value.name;
                }
              }
            }
          }
        ]
      };
      echarts.setOption(option, true);

      echarts.hideLoading();
      var that = this;
      echarts.on("click", function(params) {
        if (params.data.category == "人才") {
          var id = params.data.id;
          that.persondetailinfo(id);
        }
        // console.log(params)
      });
      echarts.on("dblclick", function(params) {
        console.log(params);
        if (params.data.category == "人才") {
          that.$router.push({
            path: "/persondetails",
            query: {
              personId: params.data.id
            }
          });
        } else if (params.data.category == "论文") {
          that.$router.push({
            path: "/paperdetails",
            query: {
              paperId: params.data.id
            }
          });
        } else if (params.data.category == "专利") {
          that.$router.push({
            path: "patentdetails",
            query: {
              patentId: id
            }
          });
        } else if (params.data.category == "项目") {
          that.$router.push({
            path: "projectdetails",
            query: {
              projectId: id
            }
          });
        } else if (params.data.category == "标准") {
          that.$router.push({
            path: "criteriondetails",
            query: {
              criterionId: id
            }
          });
        } else if (params.data.category == "专著") {
          that.$router.push({
            path: "monographdetails",
            query: {
              monographId: id
            }
          });
        }
      });
    },
    //相符组件爱能发送id
    persondetailinfo(id) {
      this.$emit("sendpersonId", id);
    }
  }
};
</script>
<style lang="scss" scoped>
.indexGraph {
  #MyIndexGraph {
    padding: 20px;
    width: 100%;
    height: 650px;
    // background: rgba(0,0,0,0.5);
    // opacity: 0.4;
  }
}
</style>