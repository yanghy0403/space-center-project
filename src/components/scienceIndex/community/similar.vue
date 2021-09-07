<template>
  <div class="sc-query">
    <div class="similar">
      <div class="menu">
        <div class="header">
          <p>研究兴趣相似社区</p>
        </div>

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
                  :start-date="new Date(2010,1,0)"
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
                  :start-date="new Date(2010,1,0)"
                  style="width: 90%"
                ></Date-picker>
              </i-col>
            </row>
          </p>
        </div>

        <div class="results">
          <div class="filed">
            学科领域：
            <div class="filedlist">
              <Input v-model="filed" placeholder="请输入学科领域" @on-blur="handleblur" />
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
        </div>
        <!-- <div class="cooperationtype">
                          合作类型：
                         <el-checkbox-group v-model="fruit" @change="handlechange">
                                <el-checkbox v-for="(item,index) in cooperationtype" :label="item" :key="index">{{item}}</el-checkbox>
                             </el-checkbox-group>
        </div>-->
        <div class="oper">
          <div>
            <span class="exam" @click="handleexample">示例数据</span>
            <Button type="primary" class="confim" @click="handleconfim">确定</Button>
            <Button type="primary" class="confim" @click="handlereset">重置</Button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="graphtitle">
          <p>
            <span>研究兴趣相似社区</span>
          </p>
          <img
            src="../../../assets/img/all.png"
            alt
            class="logo"
            @click="handleviewall"
            title="返回展示全部社区"
          />
        </div>
        <div style="height:600px;">
          <div class="demo-spin-col" v-show="loadings">
            <Spin fix>
              <Icon type="ios-loading" size="26" class="demo-spin-icon-load"></Icon>
              <div style="font-weight:bolder">科研相似社区分析中</div>
            </Spin>
          </div>
          <div v-show="!loadings" style="position:relative">
            <div id="silmar"></div>
            <div class="hint">
              <p class="promptTitle">双击节点跳转相关详情</p>
              <p class="promptTitle">不同节点颜色表示不同相似网络社区</p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer" v-show="table.length>0">
        <p style="padding-left:20px;">共发现{{total==0 ? 0:total}}个社区</p>
        <p class="nodata" v-show="total == 0">暂无数据</p>
        <div class="detailinfo" v-for="(item,index) in table" :key="index">
          <div class="img">
            <img src="../../../assets/img/shequ.png" alt class="person" />
          </div>
          <ul>
            <li>
              <p>
                <span class="apply_1">影响力最大人员</span>：
                <span class="core" @click="handletodetail(item.impactMax)">{{item.impactMax.label}}</span>
                <span class="org">{{item.impactMax.org}}</span>
                <!-- <span>影响力:{{item.impactMax.size}}</span> -->
              </p>
              <p>
                <span class="apply_2">研究主题</span>：
                <span v-for="(list,index) in item.keyword" :key="index" class="apply_keyword">
                  <span
                    class="keyword relevant"
                    @click="handletosource(list.keyword)"
                  >{{list.keyword}}</span>
                  <span>({{list.count}})</span>
                </span>
              </p>

              <div class="personnum">
                <p class="info">
                  <span class="apply_3">社区人员</span>
                  <span>: {{item.personNumber}} 人</span>
                  <span class="view" @click="handlecommunity(item.group)">查看该社区</span>
                </p>
              </div>

              <div class="personlist1">
                <p v-if="item.person.length<18">
                  <span
                    v-for="(list,index) in item.person"
                    :key="index"
                    class="relevant"
                    @click="handletodetail(list)"
                  >{{list.label}}</span>
                </p>
                <p v-if="item.person.length>=18">
                  <span
                    v-for="(list,index) in item.person.slice(0,18)"
                    :key="index"
                    class="relevant"
                    @click="handletodetail(list)"
                  >{{list.label}}</span>...
                </p>
              </div>
            </li>
          </ul>
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
  name: "similar",
  data() {
    return {
      filed: "", //关键词
      startyear: "", //起始年份
      endyear: "", //结束年份
      yeardata1: [2000, 2019],
      min1: 2000, //最小年份
      max1: 2019, //最大年份
      cooperationtype: ["项目", "成果-论文", "成果标准", "成果专利"],
      fruit: [], //选中的合作种类
      columns: [
        {
          type: "index",
          title: "序号",
          align: "center",
          width: 60
        },
        {
          title: "研究主题",
          slot: "keyword",
          align: "center",
          width: 200
        },
        {
          title: "最高影响力人",
          slot: "impactMax",
          align: "center",
          width: 150
        },
        {
          title: "人员信息",
          slot: "person",
          align: "center"
        },
        {
          title: "人员数量",
          key: "personNumber",
          align: "center",
          width: 120
        }
      ],
      table: [], //人员列表信息
      page: 1, //页码
      pagesize: 5, //每页个数
      total: 0, //总条数
      list: [], //每页展示的数据列表
      loadings: false, //加载状态
      limit: 150, //关键词个数
      nodes: [], //节点集合
      links: [], //关系集合
      group: "", //默认显示全部社区，如果有值其为选中的社区
      nodata: true,
      mark: false, //控制选中下拉列表类容消失
      selectfiled: false,
      result1: [] //推荐的学科领域
    };
  },
  created() {
    this.loading = true;
    // this.getData();
    //返回重置导航坐标
    let PositionArr = this.$store.state.variable.position.slice(0, 2);
    this.$store.commit("setPosition", PositionArr);
    this.$store.commit("setPositionIsShow", true);
    this.$store.commit("emptyFilterArr");
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
        if (this.result1[0].rankName == "暂未收录该数据") {
          this.$Message.warning({
            background: true,
            content: "请输入正确的学科领域！",
            duration: 3
          });
        }
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
    //选择时间轴删选数据
    handlehover1() {
      this.startyear = this.yeardata1[0];
      this.endyear = this.yeardata1[1];
      this.clustering();
    },
    //示例数据
    handleexample() {
      this.startyear = "2010";
      this.endyear = "2020";
      this.filed = "航空、航天科学技术";
      this.mark = true;
      this.selectfiled = false;
    },
    //点击确定查询相关学术部领域
    handleconfim() {
        this.loadings = true;
        this.table = [];
        this.group = "";
        this.getlist();
    },
    handlereset() {
      this.filed = "";
      this.startyear = "";
      this.endyear = "";
      this.fruit = [];
    },
    //选中
    handlechange() {
      console.log(this.fruit);
    },
    //科研社区图、
    getgraph() {
      var myChart = this.$echarts.init(document.getElementById("silmar"));
      myChart.showLoading();

      var nodes = this.nodes;
      var edges = this.links;

      var categories = [];
      nodes.forEach(item => {
        if (item.group) {
          categories.push(item.group);
        }
      });

      var linksarr = edges.map(item => {
        return (Math.log(item.weight) / Math.log(10)).toFixed(2) * 1;
      });
      linksarr = linksarr.sort(function(a, b) {
        return a - b;
      });
      var links = edges.map(item => {
        return {
          weight: (Math.log(item.weight) / Math.log(10)).toFixed(2) * 1,
          source: item.source,
          target: item.target,
          intimacy: item.weight
        };
      });
      var grads = (linksarr[linksarr.length - 1] - linksarr[0]) / 5;
      var firstlink = linksarr[0];
      links = links.map(item => {
        if (item.weight <= firstlink + grads * 1) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            lineStyle: {
              normal: {
                width: 0.5
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
            lineStyle: {
              normal: {
                width: 1
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
            lineStyle: {
              normal: {
                width: 1.5
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
            lineStyle: {
              normal: {
                width: 2
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
            lineStyle: {
              normal: {
                width: 2.5
              }
            }
          };
        } else if (item.weight >= firstlink + grads * 5) {
          return {
            source: item.source,
            target: item.target,
            intimacy: item.weight,
            lineStyle: {
              normal: {
                width: 3
              }
            }
          };
        }
      });

      categories = Array.from(new Set(categories));

      var sizearr = nodes.map(item => {
        return (Math.log(item.size) / Math.log(10)).toFixed(2) * 1;
      });
      sizearr = sizearr.sort(function(a, b) {
        return a - b;
      });

      // console.log(sizearr);
      var grad = (sizearr[sizearr.length - 1] - sizearr[0]) / 10;
      //console.log(grad);
      nodes = nodes.map(item => {
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
          draggable: true,
          x: item.x,
          y: item.y,
          fixed: item.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
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
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
          };
        } else if (node.size > firstsize + grad * 10) {
          return {
            id: node.id,
            name: node.name,
            symbolSize: 48,
            group: node.group,
            itemStyle: node.itemStyle,
            x: node.x,
            y: node.y,
            fixed: node.fixed
          };
        }
      });

      if (this.group == "") {
        nodes = nodes.map(item => {
          return item;
        });
      } else {
        nodes = nodes.filter(item => {
          return item.group == this.group * 1;
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
            zoom: 0.5,
            draggable: false,
            data: nodes,
            roam: true,
            focusNodeAdjacency: true,
            categories: categories,
            force: {
              layoutAnimation: true,
              repulsion: [500, 1000],
              edgeLength: [30, 30],
              gravity: 0.7
            },
            links: links,
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
          path: "/persondetails",
          query: {
            personId: params.data.id
          }
        });
      });
    },
    //获取人员社区列表信息
    getlist() {
      var data = {
        file: this.filed,
        limit: this.limit,
        // type:'paper',
        yearEnd: this.endyear,
        yearStart: this.startyear
      };
      this.$axios
        .post("/community/similar", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == "200") {
            // this.$Message.success({
            //   background: true,
            //   content: "数据加载完成"
            // });
            var data = res.data.data.content;
            this.table = data.result;

            this.total = data.count;
            this.nodes = data.nodes;
            this.links = data.links;

            if (this.nodes.length == 0) {
              // this.$Notice.warning({
              //   title: "提示！",
              //   desc: "指定分析条件下无研究兴趣相似社区发现"
              // });
              this.$Message.info({
                duration: 8,
                closable: true,
                background: true,
                content: "指定分析条件下无人才紧密合作社区发现"
              });
            }

            this.loadings = false;
            this.$nextTick(function() {
              this.getgraph();
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
    //点击人员姓名跳转相关详情页
    handletodetail(val) {
      this.$router.push({
        path: "/persondetails",
        query: {
          personId: val.id
        }
      });
    },
    //点击研究主题跳转关键词详情
    handletosource(val) {
      this.$router.push({
        path: "/Hotmap",
        query: {
          pathkeyword: val
        }
      });
    },
    //开始时间
    handleStartTime(val) {
      this.startyear = val;
    },
    //结束时间
    handleEndTime(val) {
      this.endyear = val;
    },
    //查看相关具体社区
    handlecommunity(val) {
      this.group = val;

      this.getgraph();
    },
    //查看全部社区
    handleviewall() {
      this.group = "";
      this.getgraph();
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style scoped lang="scss">
.similar {
  width: 100%;
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
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  background: #fff;
}
.results {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .filed {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    padding-left: 23px;
  }
  .oper {
    margin-right: 50px;
    .confim {
      margin-right: 25px;
    }
  }
}
.cooperationtype {
  padding-left: 30px;
  padding-bottom: 20px;
  display: flex;
  .el-checkbox__label {
    padding-left: 7px;
  }
  .el-checkbox {
    margin-right: 20px;
  }
  .el-checkbox-group {
    padding-left: 24px;
  }
}
#silmar {
  width: 100%;
  height: 600px;
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
.personlist:hover {
  cursor: pointer;
  color: #3366cc;

  font-weight: bold;
}
.content {
  width: 100%;
  background: #fff;
  margin-top: 20px;
}
.footer {
  background: #fff;
  margin-top: 20px;
  padding-top: 10px;
  overflow: auto;
  > p {
    border-bottom: 1px solid #ddd;
  }
  ul {
    display: flex;

    float: left;
    width: 50%;

    li {
      padding: 15px 10px;
      .person {
        display: block;
        width: 100px;
        height: 100px;
        margin-left: 10px;
      }
      p,
      div {
        line-height: 26px;
        > span {
          padding-right: 10px;
        }
        .logo {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
        .title {
          padding-right: 0px;
        }

        .core {
          color: #2d8cf0;
          //  font-size: 14px;
          cursor: pointer;
        }

        .core:hover {
          text-decoration: underline;
        }
      }
      .relevant:hover {
        color: #29abe2;
        cursor: pointer;
        text-decoration: underline;
      }
      p:first-child {
        margin-top: 2px;
      }
      .personlist {
        height: 52px;
        overflow: hidden;
      }
      .psersonnum {
        display: flex;
        .info {
          width: 60px;
          white-space: nowrap;
        }
      }
    }
  }
}
.header {
  background: #fff;
  border-bottom: 1px solid #ddd;
  p {
    line-height: 40px;
    padding: 10px 30px;
    font-size: 18px;
  }
}
.results {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  .filed {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    padding-left: 30px;
  }
}
.oper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20px;
  > div {
    margin-right: 40px;
    float: right;
    .exam {
      line-height: 36px;
      color: #0099da;
      cursor: pointer;
      padding-right: 15px;
    }
  }
  .confim {
    margin-right: 25px;
  }
}
.detailinfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  float: left;
  width: 50%;
  height: 191px;
  border-bottom: 1px solid #ddd;
  .img {
    width: 20%;
  }
  ul {
    width: 80%;
  }
}
.person {
  display: block;
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
.view {
  color: #2d8cf0;
  cursor: pointer;
  text-decoration: underline;
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
  width: 74%;
  .select-list {
    width: 100%;
  }
}
</style>
<style>
.apply_keyword {
  border: 1px solid #666;
  padding: 4px;
  border-radius: 5px;
  margin-right: 10px;
  padding-right: 4px !important;
  color: #666;
}
.apply_1 {
  color: #666;
  padding-right: 0 !important;
  font-weight: bolder;
}
.apply_2 {
  color: #666;
  padding-right: 0 !important;
  font-weight: bolder;
}
.apply_3 {
  color: #666;
  padding-right: 0 !important;
  font-weight: bolder;
}
.exam {
  line-height: 36px;
  color: #0099da;
  cursor: pointer;
  padding-right: 15px;
}
.apply_keyword{
  padding: 5px 8px;
  border:2px solid #5FD1BB;
  border-radius:5px;
}
</style>