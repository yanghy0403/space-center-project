<template>
  <div class="sc-query">
    <div class="hotcluster">
      <div class="header">
        <p>热点主题聚类图谱</p>
      </div>
      <div>
        <ul class="tab">
          <li @click="handlenav('one')" :class="navindex == 'one'? 'selecting':''">国内热点聚类图谱</li>
          <li @click="handlenav('two')" :class="navindex == 'two'? 'selecting':''">国际热点聚类图谱</li>
        </ul>
      </div>

      <div class="menu">
        <div class="years">
          <p>
            <img src="../../../assets/img/kaishishijian.png" alt class="logo" />
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
            <img src="../../../assets/img/jieshushijian.png" alt class="logo" />
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
      <div class="main">
        <div class="graphtitle">
          <p>
            <span>热点主题聚类图谱分析</span>
          </p>
          <img
            src="../../../assets/img/all.png"
            alt
            class="logo"
            @click="handleviewall"
            title="返回展示全部聚类"
          />
        </div>
        <div style="height:600px;">
          <div class="demo-spin-col" v-show="loadings">
            <Spin fix>
              <Icon type="ios-loading" size="26" class="demo-spin-icon-load"></Icon>
              <div style="font-weight:bolder">热点主题聚类分析中</div>
            </Spin>
          </div>
          <div v-show="!loadings" style="position:relative">
            <div id="cluster"></div>
            <div class="hint">
              <p class="promptTitle">双击节点跳转相关详情</p>
              <p class="promptTitle">不同节点颜色表示不同的热点主题聚类</p>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <p
          style="padding-left:20px;line-height:30px;font-size:18px;font-weight:bolder;"
        >共发现{{typenum}}个热点主题聚类</p>
        <Table border :columns="columns1" :data="tablelist">
          <template slot-scope="{ index }" slot="index">
            <span class="bgr" v-if="index+1 ==1">top{{index+1}}</span>
            <span class="bgo" v-if="index+1<=3 && index+1>1">top{{index+1}}</span>
            <span class="bgd" v-if="index+1>3">{{index+1}}</span>
          </template>
          <template slot-scope="{ row }" slot="centerForPeople">
            <span
              class="name top"
              @click="handletodetail(row.centerForPeople.label)"
            >{{row.centerForPeople.label}}</span>
          </template>
          <template slot-scope="{ row }" slot="dataMap">
            <span
              class="name"
              @click="handletodetail(row.dataMap.top1.label)"
            >{{row.dataMap.top1.label}}</span>
            <span
              class="name"
              @click="handletodetail(row.dataMap.top2.label)"
            >{{row.dataMap.top2.label}}</span>
            <span
              class="name"
              @click="handletodetail(row.dataMap.top3.label)"
            >{{row.dataMap.top3.label}}</span>
            <span
              class="name"
              @click="handletodetail(row.dataMap.top4.label)"
            >{{row.dataMap.top4.label}}</span>
            <span
              class="name"
              @click="handletodetail(row.dataMap.top5.label)"
            >{{row.dataMap.top5.label}}</span>
          </template>

          <template slot-scope="{ row }" slot="oper">
            <div>
              <img
                src="../../../assets/img/eye.png"
                alt
                @click="handleviewdetail(row.group)"
                class="eye"
              />
            </div>
          </template>
        </Table>
      </div>
      <div class="more" v-show="nomore">
        <span @click="handlemore" v-show="ismore == true">查看更多>></span>
        <span @click="handleshrink" v-show="!ismore == true">收起>></span>
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
//引入vis
import vis from "vis";
// import echarts from 'echarts';
// import jquery from 'jquery';

export default {
  name: "hotcluster",
  data() {
    return {
      num: 80, //要展示的数据个数
      filed: "", //关键词
      startyear: "", //起始年份
      endyear: "", //结束年份
      yeardata1: [2000, 2019],
      min1: 2000, //最小年份
      max1: 2019, //最大年份
      language: "cn", //语言
      navindex: "one", //导航默认下标
      columns1: [
        {
          // type: 'index',
          title: "热点聚类序号",
          slot: "index",
          width: 120,
          align: "center"
        },
        {
          title: "热点聚类主题词",
          slot: "centerForPeople",
          align: "center",
          width: 200
        },
        {
          title: "热点聚类主题域",
          slot: "dataMap",
          align: "center"
        },

        {
          title: "查看热点聚类",
          slot: "oper",
          align: "center",
          width: 200
        }
      ],
      table: [], //列表信息
      typenum: 0, //社区个数
      group: "", //具体哪个社区
      page: 1, //分页
      pagesize: 5, //每页个数
      total: 0, //总条数
      list: [], //每页显示的描述信息
      limit: 150, //关键词个数
      nodes: [], //节点
      links: [], //关系
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
    //聚类图谱
    clustering() {
      var myChart = this.$echarts.init(document.getElementById("cluster"));

      var nodes = this.nodes;
      var edges = this.links;

      //console.log(nodes)
      var categories = [];
      categories = Array.from(new Set(categories));

      var nodeid = [];
      var sizearr = nodes.map(item => {
        if (item.size == 0) {
          return 0;
        } else {
          return (Math.log(item.size) / Math.log(10)).toFixed(2) * 1;
        }
      });
      sizearr = sizearr.sort(function(a, b) {
        return a - b;
      });

      // console.log(sizearr);
      var grad = (sizearr[sizearr.length - 1] - sizearr[0]) / 10;

      nodes = nodes.map(item => {
        if (item.group == 0) {
          nodeid.push(item.id);
        }
        // if(item.label =='航天器'){
        //    console.log(item.group)
        // }
        return {
          id: item.id,
          name: item.label,
          size: (Math.log(item.size) / Math.log(10)).toFixed(2) * 1,
          itemStyle: {
            normal: {
              color: item.rgb
            }
          },
          group: item.group,
          draggable: true
        };
      });

      var firstsize = sizearr[0];

      nodes = nodes.map(function(node) {
        if (node.size <= firstsize + grad * 1) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 8,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 1 &&
          node.size <= firstsize + grad * 2
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 12,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 2 &&
          node.size <= firstsize + grad * 3
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 16,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 3 &&
          node.size <= firstsize + grad * 4
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 20,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 4 &&
          node.size <= firstsize + grad * 5
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 24,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 5 &&
          node.size <= firstsize + grad * 6
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 28,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 6 &&
          node.size <= firstsize + grad * 7
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 32,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 7 &&
          node.size <= firstsize + grad * 8
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 36,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 8 &&
          node.size <= firstsize + grad * 9
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 40,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (
          node.size > firstsize + grad * 9 &&
          node.size <= firstsize + grad * 10
        ) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 44,
            group: node.group,
            itemStyle: node.itemStyle
          };
        } else if (node.size > firstsize + grad * 10) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 48,
            group: node.group,
            itemStyle: node.itemStyle
          };
        }
      });

      var linksarr = edges.map(item => {
        return (Math.log(item.weight) / Math.log(10)).toFixed(2) * 1;
      });
      linksarr = linksarr.sort(function(a, b) {
        return a - b;
      });
      var links = edges.map((item, i) => {
        return {
          weight: (Math.log(item.weight) / Math.log(10)).toFixed(2) * 1,
          source: item.source,
          target: item.target,
          intimacy: item.weight,
          value: i * 10
        };
      });
      var grads = (linksarr[linksarr.length - 1] - linksarr[0]) / 5;
      var firstlink = linksarr[0];
      //console.log(nodeid)
      links = links.map(item => {
        // if(nodeid.indexOf(item.source) !=-1 && (nodeid.indexOf(item.target) !=-1)){
        //      item.value = 100;
        // }else{
        //     item.value = 1000;
        // }
        if (item.weight <= firstlink + grads * 1) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            value: item.value,
            lineStyle: {
              normal: {
                width: 0.5
                // color:'#40E0D0'
              }
            }
          };
        } else if (
          item.weight <= firstlink + grads * 2 &&
          item.weight >= firstlink + grads * 1
        ) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            value: item.value,
            lineStyle: {
              normal: {
                width: 1
                // color:'#40E0D0'
              }
            }
          };
        } else if (
          item.weight <= firstlink + grads * 3 &&
          item.weight >= firstlink + grads * 2
        ) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            value: item.value,
            lineStyle: {
              normal: {
                width: 1.5
                // color:'#40E0D0'
              }
            }
          };
        } else if (
          item.weight <= firstlink + grads * 4 &&
          item.weight >= firstlink + grads * 3
        ) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            value: item.value,
            lineStyle: {
              normal: {
                width: 2
                //  color:'#40E0D0'
              }
            }
          };
        } else if (
          item.weight <= firstlink + grads * 5 &&
          item.weight >= firstlink + grads * 4
        ) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            value: item.value,
            lineStyle: {
              normal: {
                width: 2.5
                // color:'#40E0D0'
              }
            }
          };
        } else if (item.weight >= firstlink + grads * 5) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            value: item.value,
            lineStyle: {
              normal: {
                width: 3
                //  color:'#40E0D0'
              }
            }
          };
        }
      });
      //console.log(links)
      if (this.group == "") {
        nodes = nodes.map(item => {
          return item;
        });
      } else {
        nodes = nodes.filter(item => {
          return item.group == this.group;
        });
      }

      var option = {
        legend: {
          // data: categories
        },

        textStyle: {
          fontSize: 10
        },
        animation: true,
        // animationDuration:5000,
        // animationDurationUpdate:3000,//数据更新动画的时长。
        // animationEasingUpdate: 'quinticInOut',//数据更新动画的缓动效果
        // animationThreshold:200,
        series: [
          {
            type: "graph",
            layout: "force",

            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
                // backgroundColor:'#fff',
                textBorderColor: "white",
                textBorderWidth: 1
              }
            },
            zoom: 0.3,
            draggable: false,
            data: nodes,
            roam: true,
            focusNodeAdjacency: true,
            categories: categories,
            force: {
              layoutAnimation: true,
              repulsion: [500, 900],
              edgeLength: [60, 120],
              //edgeLength:300,
              gravity: 0.3
            },
            links: links,
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
            },
            lineStyle: {
              normal: {
                show: false,
                width: 0.3,
                curveness: 0,
                opacity: 1,
                color: "#abc7c9"
              },
              emphasis: {
                show: true,
                color: "white", //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
                shadowColor: "red", //阴影颜色
                shadowOffsetX: 0, //阴影水平方向上的偏移距离。
                shadowOffsetY: 0, //阴影垂直方向上的偏移距离
                shadowBlur: 5, //图形阴影的模糊大小。
                type: "solid", //坐标轴线线的类型，solid，dashed，dotted
                width: 3, //坐标轴线线宽
                opacity: 1 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
              }
            }
          }
        ]
      };

      myChart.setOption(option, true);
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
    },
    //选择时间轴删选数据
    handlehover1() {
      this.startyear = this.yeardata1[0];
      this.endyear = this.yeardata1[1];
      this.getlist();
    },
    //示例数据
    handleexample() {
      this.startyear = "2010";
      this.endyear = "2020";
      //  this.filed = '空间物理学';
      if (this.navindex == "one") {
        this.filed = "空间物理学";
      } else if (this.navindex == "two") {
        this.filed = "Accelerator physics";
      }
      this.mark = true;
      this.selectfiled = false;
    },
    //点击确定查询相关学术部领域
    handleconfim() {
      if (this.filed != "") {
        this.loadings = true;
        this.tablelist = [];
        this.typenum = 0;
        this.group = "";
        this.getlist();
      } else {
        this.$Message.warning({
          background: true,
          content: "请输入学科领域"
        });
      }
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
      this.getlist();
    },
    //下方列表相关信息
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
        .post(`/keyword/clustering`, this.$qs.stringify(data))
        .then(res => {
          // console.log(res)
          if (res.data.code == "200") {
            // this.$Message.success({
            //   background: true,
            //   content: "数据加载完成"
            // });
            this.nodes = res.data.data.content.nodes;
            this.links = res.data.data.content.links;
            this.table = res.data.data.content.result;
            this.typenum = res.data.data.content.count;

            if (this.nodes.length == 0) {
              this.nodata = false;

              // this.$Notice.warning({
              //   title: "提示！",
              //   desc: "指定分析条件下无热点主题聚类图谱发现"
              // });
              // Abstract Wiener space
              this.$Message.warning({
                background: true,
                content: "指定分析条件下无热点主题聚类图谱发现",
                duration: 5
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

            this.loadings = false;

            this.$nextTick(function() {
              this.clustering();
            });
          } else if (res.data.code == "500") {
            this.$Message.error({
              background: true,
              content: res.data.message,
              duration: 5
            });
          }
        });
    },
    //查看具体某个社区
    handleviewdetail(val) {
      this.group = val;
      this.clustering();
    },
    //查看全部数据
    handleviewall() {
      this.group = "";
      this.clustering();
    },
    //跳转具体详情
    handletodetail(name) {
      this.$router.push({
        path: "/Hotmap",
        query: {
          pathkeyword: name
        }
      });
    },
    //分页函数
    pageDataFn(number, pageSize, data) {
      //处于第几页 number
      //保存每页数据的数组
      // console.log('fenye')
      var pagedata = [];
      //pageSize 每页条数
      //设置开始
      let start = pageSize * number - pageSize;
      // 设置结束长度
      let end = pageSize * number;
      end = end > data.length ? data.length : end;
      for (let i = start; i < end; i++) {
        //所有分页数据 data
        pagedata.push(data[i]);
      }

      this.list = pagedata;
      //console.log(this.list);
    },
    //上一页
    preve() {
      this.page--;
      if (this.page <= 1) {
        this.page = 1;
      }
      this.pageDataFn(this.page, this.pagesize, this.table);
    },
    //下一页
    next() {
      this.page++;
      var pagecount = Math.ceil(this.table.length / this.pagesize);
      if (this.page >= pagecount) {
        this.page = pagecount;
      }
      this.pageDataFn(this.page, this.pagesize, this.table);
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

<style lang="scss" scope>
.vis-configuration-wrapper {
  display: none;
}
.years .ivu-row {
  width: 80%;
}
.years .ivu-col-span-12 {
  width: 100%;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.main .demo-spin-col {
  height: 100%;
  position: relative;
  border: 1px solid #eee;
}
// .main .ivu-spin{
//      color:red;
// }
.main .ivu-icon {
  font-weight: bolder;
}
</style>
<style scoped lang="scss">
.hotcluster {
  width: 100%;
}
#cluster {
  width: 100%;
  height: 600px;
}
#mynetwork {
  width: 800px;
  height: 800px;
  border: 1px solid lightgray;
}
#optionsContainer {
  height: 280px;
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
.menu {
  padding-top: 20px;
  background: #fff;
  margin-top: 20px;
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
.name {
  float: left;
  padding-right: 15px;
  cursor: pointer;
}
.top {
  color: #2d8cf0;
  font-weight: bolder;
}
.name:hover {
  color: #2d8cf0;
  text-decoration: underline;
}
.sc-query {
  .fenye {
    width: 200px;
    margin: 0 auto;
    display: flex;
    li {
      width: 60px;
      text-align: center;
      line-height: 30px;
      &:first-child {
        width: 80px;
      }
      .prev {
        background-color: #ebeef5;
        cursor: pointer;
        margin: 0;
        color: #303133;
        border: none;
      }
      .next {
        background-color: #ebeef5;
        cursor: pointer;
        margin: 0;
        color: #303133;
        border: none;
      }
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

.eye {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
}
.foot {
  background: #fff;
  margin-top: 20px;
  padding-top: 10px;
}
.results {
  margin: 10px 0;
  margin-right: 15px;
  display: flex;
}
.menu {
  .confim {
    margin: 0 5px;
    margin-right: 15px;
  }
  .reset {
    margin: 0 5px;
  }
  .results {
    > span {
      padding-left: 44px;
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

.main {
  background: #fff;
  margin-top: 20px;
  h3 {
    background: #bce8f1;
    padding-left: 0;
    margin-bottom: 0;
  }
}
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
.filedlist {
  .filedinput {
    width: 42%;
  }
  .select-list {
    width: 42%;
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