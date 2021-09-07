<template>
  <div class="sc-query">
    <div class="hottrend">
      <div class="header">
        <p>高频热词共现图谱</p>
      </div>
      <div>
        <ul class="tab">
          <li @click="handlenav('one')" :class="navindex == 'one'? 'selecting':''">国内热点共词图谱</li>
          <li @click="handlenav('two')" :class="navindex == 'two'? 'selecting':''">国际热点共词图谱</li>
        </ul>
      </div>

      <div class="menu">
        <div class="years">
          <p>
            <img src="../../../../assets/img/kaishishijian.png" alt class="logo" />
            开始年份：
            <row>
              <i-col span="12">
                <Date-picker
                  type="year"
                  @on-change="handleStartTime"
                  :value="startyear"
                  format="yyyy"
                  placeholder="请选择开始年份"
                  style="width: 90%"
                ></Date-picker>
              </i-col>
            </row>
          </p>
          <p>
            <img src="../../../../assets/img/jieshushijian.png" alt class="logo" />
            结束年份：
            <row>
              <i-col span="12">
                <Date-picker
                  type="year"
                  @on-change="handleEndTime"
                  :value="endyear"
                  format="yyyy"
                  placeholder="请选择结束年份"
                  style="width: 90%"
                ></Date-picker>
              </i-col>
            </row>
          </p>
        </div>
        <div class="results" style="padding-bottom:10px;">
          <span>学科领域：</span>
          <div class="filedlist">
            <Input v-model="filed" placeholder="请输入学科领域" class="filedinput" @on-blur="handleblur" />
            <div class="select-list" v-show="selectfiled">
              <div class="ivu-poptip-inner scrollbar">
                <ul v-if="result1.length!==0" class="resultdata">
                  <li
                    class="ivu-poptip-body"
                    v-for="(item,k) in result1"
                    :key="k+'x'"
                    @click="handleClickQuery(item)"
                  >
                    <span class="ivu-poptip-body-content-inner">{{item.rankName}}</span>
                  </li>
                </ul>
                <ul v-else>
                  <span class="ivu-poptip-body-content-inner">暂无匹配数据</span>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p>
          <span class="exam" @click="handleexample">示例数据</span>
          <Button type="primary" class="confim" @click="handleconfim">确定</Button>
          <Button type="primary" class="confim" @click="handlereset">重置</Button>
        </p>
      </div>
      <div class="top">
        <div class="graphtitle">
          <p>
            <span>高频热词共现图谱分析</span>
          </p>
          <!-- <img src="../../../../assets/img/all.png" alt="" class="logo" @click="handleviewall" title="返回展示全部路径"> -->
        </div>
        <div style="height:700px;">
          <div class="demo-spin-col" v-show="loadings">
            <Spin fix>
              <Icon type="ios-loading" size="26" class="demo-spin-icon-load"></Icon>
              <div style="font-weight:bolder">热词共现关系图谱分析中</div>
            </Spin>
          </div>
          <div v-show="!loadings" style="position:relative">
            <div class="top1" id="top1"></div>
            <div class="hint">
              <p class="promptTitle">双击节点跳转相关详情</p>
              <p class="promptTitle">不同节点颜色表示不同热点词热度值范围</p>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <Table border :columns="columns1" :data="tablelist">
          <template slot-scope="{ index }" slot="index">
            <span class="bgr" v-if="index+1 ==1">top{{index+1}}</span>
            <span class="bgo" v-if="index+1<=3 && index+1>1">top{{index+1}}</span>
            <span class="bgd" v-if="index+1>3">{{index+1}}</span>
          </template>
          <template slot-scope="{ row }" slot="keyword">
            <span
              class="author"
              @click="handletodetail(row)"
              style="color:#2d8cf0;font-weight:bolder;"
            >{{row.keyword}}</span>
          </template>
          <template slot-scope="{ row }" slot="paper">
            <span class="author" @click="handletopaer(row.paperId)">{{row.paper}}</span>
          </template>
        </Table>
        <div class="more" v-show="nomore">
          <span @click="handlemore" v-show="ismore">查看更多>></span>
          <span @click="handleshrink" v-show="!ismore">收起>></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);

    timer = setTimeout(callback, ms);
  };
})();
export default {
  name: "hottrend",
  data() {
    return {
      num: 30, //要展示的数据个数
      filed: "", //关键词
      startyear: "", //起始年份
      endyear: "", //结束年份
      yeardata1: [2000, 2019],
      min1: 2000, //最小年份
      max1: 2019, //最大年份
      language: "cn", //语言种类
      navindex: "one", //导航默认下标
      columns1: [
        {
          title: "热度排序",
          slot: "index",
          width: 120,
          align: "center"
        },
        {
          title: "热点词",
          slot: "keyword",
          align: "center",
          width: 200
        },
        {
          title: "词频",
          key: "frequency",
          align: "center",
          width: 100
        },
        {
          title: "代表论文",
          slot: "paper",
          align: "center"
        },
        {
          title: "发表年度",
          key: "year",
          width: 100
        }
      ],
      table: [], //下方信息列表
      language: "cn", //默认语言中文
      limit: 150, //关键词个数
      nodes: [], //节点
      edges: [], //关系
      group: "", //社区分组号
      loadings: false, //加载状态
      nodata: true,
      mark: false, //控制选中下拉列表类容消失
      selectfiled: false,
      result1: [], //推荐的学科领域
      tablelist: [], //默认展示的列表
      ismore: false, //控制查看更多显示
      nomore: true //控制更多和收起显示
    };
  },
  watch: {
    filed() {
      delay(() => {
        if (!this.mark) {
          if (this.filed != "") {
            this.selectfiled = true;
            this.ferchData(this.filed);
          }
        }
        this.mark = false;
      }, 300);
    }
  },
  methods: {
    //实时根据输入推荐机构名称
    async ferchData(val) {
      this.$axios.get("/manage/filedName?name=" + val).then(res => {
        //console.log(res)
        this.result1 = res.data.data.content;
      });
    },
    //选择学科领域
    handleClickQuery(val) {
      this.mark = true;
      this.filed = val.rankName;
      this.selectfiled = false;
    },
    //失去焦点下方搜索推荐列表消失
    handleblur() {
      var that = this;
      setTimeout(function() {
        that.selectfiled = false;
      }, 1000);
    },
    //热点共现图
    frequency() {
      var myChart = this.$echarts.init(document.getElementById("top1"));

      myChart.showLoading();

      var nodes = this.nodes;
      var links = this.edges;

      var sizearr = nodes.map(item => {
        if (item.size != 0) {
          return (Math.log(item.size) / Math.log(10)).toFixed(2) * 1;
        }else {
            return 0
        }
      });
      sizearr = sizearr.sort(function(a, b) {
        return a - b;
      });

      // console.log(sizearr);
      var grad = (sizearr[sizearr.length - 1] - sizearr[0]) / 10;
      nodes = nodes.map(item => {
        // console.log(item);
        if (item.size != 0) {
          return {
            id: item.id,
            name: item.label,
            size: (Math.log(item.size) / Math.log(10)).toFixed(2) * 1
            // x:item.x,
            // y:item.y,
          };
        } else {
          return {
            id: item.id,
            name: item.label,
            size: 0
            // x:item.x,
            // y:item.y,
          };
        }
      });
      var firstsize = sizearr[0];

      var newnodes = nodes.map(function(node) {
        //   console.log(node)
        if (node.size <= firstsize + grad * 1) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 16,
            // x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#00F5FF"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: false,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 1 &&
          node.size <= firstsize + grad * 2
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 16,
            // x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#54FF9F"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: false,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 2 &&
          node.size <= firstsize + grad * 3
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 16,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#6A5ACD"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: false,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 3 &&
          node.size <= firstsize + grad * 4
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 20,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#00FF00"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 4 &&
          node.size <= firstsize + grad * 5
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 24,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#00FFFF"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 5 &&
          node.size <= firstsize + grad * 6
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 28,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#8B658B"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 6 &&
          node.size <= firstsize + grad * 7
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 32,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#B22222"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 7 &&
          node.size <= firstsize + grad * 8
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 36,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#FFA500"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 8 &&
          node.size <= firstsize + grad * 9
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 40,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#FF1493"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (
          node.size > firstsize + grad * 9 &&
          node.size <= firstsize + grad * 10
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 44,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#FF4500"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        } else if (node.size > firstsize + grad * 10) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 48,
            //  x:node.x,
            // y:node.y,
            itemStyle: {
              normal: {
                color: "#561222"
              }
            },
            label: {
              emphasis: {
                position: "bottom",
                show: true
              },
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "#696969",
                borderColor: "#000",
                backgroundColor: "#fff"
              }
            }
          };
        }
      });
      //   console.log(newnodes)
      var newlinks = links.map(function(edge) {
        if (edge.weight <= 10) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              normal: {
                width: 0.5,
                curveness: 0
              }
            }
          };
        } else if (edge.weight > 10 && edge.weight <= 20) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              normal: {
                width: 0.5,
                curveness: 0
              }
            }
          };
        } else if (edge.weight > 20 && edge.weight <= 30) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              normal: {
                width: 1,
                curveness: 0
              }
            }
          };
        } else if (edge.weight > 30 && edge.weight <= 40) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              normal: {
                width: 1.5,
                curveness: 0
              }
            }
          };
        } else if (edge.weight > 40 && edge.weight <= 50) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              normal: {
                width: 1.5,
                curveness: 0
              }
            }
          };
        } else if (edge.weight > 50 && edge.weight <= 60) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              normal: {
                width: 2,
                curveness: 0
              }
            }
          };
        } else if (edge.weight > 60) {
          return {
            source: edge.source,
            target: edge.target,
            lineStyle: {
              normal: {
                width: 2,
                curveness: 0
              }
            }
          };
        }
      });
      var option = {
        animationDelay: 300,
        animationDurationUpdate: 300,
        animationEasingUpdate: "quinticInOut",
        grid: {
          top: "20%",
          left: "20%",
          right: "20%",
          bottom: "20%"
        },
        series: [
          {
            type: "graph",
            layout: "force",
            zoom: 0.3,
            // progressiveThreshold: 700,
            data: newnodes,
            force: {
              edgeLength: [20, 50],
              repulsion: [600, 900],
              gravity: 0.3
            },
            label: {
              normal: {
                show: true,
                position: "bottom",
                formatter: "{b}",
                // backgroundColor:'#fff',
                textBorderColor: "white",
                textBorderWidth: 1
              },
              emphasis: {
                show: false
              }
            },
            edges: newlinks,
            emphasis: {
              lineStyle: {
                color: "red"
              }
            },
            roam: true,
            focusNodeAdjacency: true,
            lineStyle: {
              normal: {
                show: false,
                width: 0.3,
                curveness: 0,
                opacity: 1,
                color: "#abc7c9"
              },
              emphasis: {
                show: false,
                color: "#ddd", //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
                shadowColor: "#ddd", //阴影颜色
                shadowOffsetX: 0, //阴影水平方向上的偏移距离。
                shadowOffsetY: 0, //阴影垂直方向上的偏移距离
                shadowBlur: 1, //图形阴影的模糊大小。
                type: "solid", //坐标轴线线的类型，solid，dashed，dotted
                width: 2, //坐标轴线线宽
                opacity: 0.3 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
              }
            }
          }
        ]
        // series:series
      };

      myChart.setOption(option);

      myChart.hideLoading();
      var that = this;
      myChart.on("dblclick", function(params) {
        that.$router.push({
          path: "/Hotmap",
          query: {
            pathkeyword: params.name
          }
        });
      });
      //    })
    },
    //选择时间轴删选数据
    handlehover1() {
      this.startyear = this.yeardata1[0];
      this.endyear = this.yeardata1[1];
      this.$nextTick(function() {
        this.frequency();
      });
    },
    //示例数据
    handleexample() {
      this.startyear = "2010";
      this.endyear = "2020";
      this.filed = "空间物理学";
      this.mark = true;
      this.selectfiled = false;
    },
    //点击确定查询相关学术部领域
    handleconfim() {
      this.loadings = true;
      this.tablelist = [];
      this.getlist();
    },
    //重置相关筛选条件
    handlereset() {
      this.startyear = "";
      this.endyear = "";
      this.filed = "";
    },
    //导航切换
    handlenav(val) {
      this.navindex = val;
      if (val == "one") {
        this.language = "cn";
      } else if (val == "two") {
        this.language = "en";
      }

      this.filed = "";
      this.startyear = "";
      this.endyear = "";
      this.group = "";
      this.loadings = true;
      this.tablelist = [];
      this.getlist();
      //  this.handleexample();
    },
    //信息列表
    getlist() {
      var language = this.language;
      var filed = this.filed;
      var startyear = this.startyear;
      var endyear = this.endyear;
      var limit = this.limit;
      var data = {
        language: language,
        field: filed,
        limit: limit,
        yearStart: startyear,
        yearEnd: endyear
      };
      this.$axios
        .post(`/keyword/collinear`, this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == "200") {
            this.loadings = false;
            // this.$Message.success({
            //   background: true,
            //   content: "数据加载完成"
            // });
            this.nodes = res.data.data.content.nodes;
            this.edges = res.data.data.content.links;
            this.table = res.data.data.content.messageList;

            if (this.nodes.length == 0) {
              this.nodata = false;
              this.$Notice.warning({
                title: "提示！",
                desc: "指定分析条件下无高频热词共现图谱发现"
              });
            }
            if (this.nodes.length > 0) {
              this.nodata = true;
            }
            if (this.table.length > 10) {
              this.ismore = true;
              this.nomore = true;
              this.tablelist = this.table.slice(0, 10);
            } else if (this.table.length <= 10) {
              this.nomore = false;
              this.tablelist = this.table;
            }

            this.$nextTick(function() {
              this.frequency();
            });
          } else if (res.data.code == "500") {
            this.$Message.error({
              background: true,
              content: res.data.message
            });
          }
        });
    },
    //跳转相关论文页面
    handletopaer(id) {
      this.$router.push({
        path: "/paperdetails",
        query: {
          paperId: id
        }
      });
    },
    //开始年份选择
    handleStartTime(val) {
      this.startyear = val;
      // this.getlist();
    },
    //结束年份选择
    handleEndTime(val) {
      this.endyear = val;
      // this.getlist();
    },
    //查看全部数据
    handleviewall() {
      this.group = "";
      this.frequency();
    },
    //点击热点词跳转相关详情
    handletodetail(row) {
      this.$router.push({
        path: "/Hotmap",
        query: {
          pathkeyword: row.keyword
        }
      });
    },
    //查看更多数据
    handlemore() {
      this.ismore = false;
      this.tablelist = this.table;
    },
    //点击收起查看更多
    handleshrink() {
      this.ismore = true;
      this.tablelist = this.table.slice(0, 10);
    }
  },
  mounted() {
    this.getlist();
  },
  created() {
    this.loading = true;
    // this.getData();
    //返回重置导航坐标
    let PositionArr = this.$store.state.variable.position.slice(0, 2);
    this.$store.commit("setPosition", PositionArr);
    this.$store.commit("setPositionIsShow", true);
    this.$store.commit("emptyFilterArr");
  }
};
</script>

<style scoped lang='scss'>
.top,
.hottrend {
  width: 100%;
  // background: #fff;
}
.menu {
  // margin-top: 20px;
  background: #fff;
  padding-top: 25px;
  padding-bottom: 1px;
  margin-top: 20px;
}
#top1 {
  width: 100%;
  height: 700px;
}
#top2 {
  width: 100%;
  height: 800px;
  background: #fff;
}

.top {
  margin-top: 20px;
  background: #fff;
  h3 {
    margin-bottom: 0;
    padding-left: 0;
    background: #bce8f1;
  }
}

.results {
  margin: 10px 0;
  margin-right: 15px;
  display: flex;
}
.confim {
  margin: 0 5px;
  margin-right: 15px;
}
.reset {
  margin: 0 5px;
}
.menu {
  .results {
    > span {
      padding-left: 30px;
      font-size: 12px;
    }
  }
  p {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 0;
    margin-right: 38px;
  }
}

.year {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px;
  margin-right: 0px;
  .reset {
    margin-left: 30px;
  }
}
.years {
  margin-left: 24px;
  margin-bottom: 15px;
  display: flex;
  p {
    line-height: 30px;
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
  }
  .logo {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
.slider {
  width: 80%;
  margin-left: 20px;
}
.nav {
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    border-bottom: 2px solid #ddd;
    li {
      list-style: none;
      margin-right: 10px;
      width: 80px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
    .selectnav {
      border-bottom: 2px solid #3366cc;
      color: #3366cc;
    }
  }
}
.tab {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  background: #fff;
  li {
    width: 50%;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    &:first-child {
      border-right: 1px solid #ddd;
    }
  }
  .selecting {
    background: #409eff;
    color: #fff;
  }
}
.header {
  background: #fff;
  p {
    line-height: 40px;
    padding: 10px 30px;
    font-size: 18px;
  }
}
h3 {
  padding-left: 22px;
  margin-bottom: 20px;
  color: #1d5fa5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  > span::before {
    width: 3px;
    height: 20px;
    display: inline-block;
    margin-right: 7px;
    background: #1d5fa5;
    content: "";
  }
  > span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  > div {
    margin-right: 17px;
  }
}
.interval {
  height: 40px;
  background: #ebeef5;
}
.foot {
  margin-top: 20px;
}
</style>
<style lang="scss">
.graphtitle {
  height: 40px;
  padding-left: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #bce8f1;

  .logo {
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    cursor: pointer;
  }
}
.author {
  font-size: 12px;
  cursor: pointer;
}
.author:hover {
  color: #2d8cf0;
  text-decoration: underline;
}
.foot {
  .ivu-table-row {
    td:nth-child(1) {
      span {
        // font-size: 16px;
        // font-weight: bolder;
        display: inline-block;
        color: #ffff;
        width: 60px;
        border-radius: 15px;
      }
      .bgr {
        background: #df3e3e;
      }
      .bgd {
        background: #afb5c6;
      }
      .bgo {
        background: #fa7d3c;
      }
    }
  }
}
.filedlist {
  width: 79%;
  margin-left: 25px;
  position: relative;
  .filedinput {
    width: 45%;
  }
  .select-list {
    position: absolute;
    top: 30px;
    left: 0;
    width: 45%;
    border: 1px solid #ddd;
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
    li {
      cursor: pointer;
    }
  }
}
.more {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  span {
    padding-right: 30px;
    color: #2d8cf2;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>