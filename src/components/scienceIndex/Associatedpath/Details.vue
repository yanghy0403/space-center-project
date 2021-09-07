<template>
  <div class="sc-query">
    <div class="associatedpathdetail">
      <div class="top">
        <div class="header">
          <p>机构关联路径</p>
        </div>
        <!-- <h2>请输入分析条件</h2> -->
        <ul>
          <li>
            <p>科研机构名称</p>
            <div class="personname">
              <input type="text" placeholder="输入格式:机构名称" v-model.trim="org1" @blur="handleblur" />
              <div class="select-list" v-show="selectorg1">
                <div class="ivu-poptip-inner scrollbar">
                  <ul v-if="result1.length!==0" class="resultdata">
                    <li
                      class="ivu-poptip-body"
                      v-for="(item,k) in result1"
                      :key="k+'x'"
                      @click="handleClickQuery(item,'one')"
                    >
                      <span class="ivu-poptip-body-content-inner">{{item.name}}</span>
                    </li>
                  </ul>
                  <ul v-else>
                    <span class="ivu-poptip-body-content-inner">暂无匹配数据</span>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p>科研机构名称</p>
            <div class="personname">
              <input type="text" placeholder="输入格式:机构名称" v-model.trim="org2" @blur="handleblur" />
              <div class="select-list" v-show="selectorg2">
                <div class="ivu-poptip-inner scrollbar">
                  <ul v-if="result2.length!==0" class="resultdata">
                    <li
                      class="ivu-poptip-body"
                      v-for="(item,k) in result2"
                      :key="k+'x'"
                      @click="handleClickQuery(item,'two')"
                    >
                      <span class="ivu-poptip-body-content-inner">{{item.name}}</span>
                    </li>
                  </ul>
                  <ul v-else>
                    <span class="ivu-poptip-body-content-inner">暂无匹配数据</span>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p class="relationheight">最大关系深度</p>
        <ol>
          <li @click="handledepth(2)">
            <label for="legth2">
              <input type="radio" name="radio" id="legth2" />2
            </label>
          </li>
          <li @click="handledepth(3)">
            <label for="legth3">
              <input type="radio" name="radio" id="legth3" />3
            </label>
          </li>
          <li @click="handledepth(4)">
            <label for="legth4">
              <input type="radio" name="radio" id="legth4" checked />4
            </label>
          </li>
        </ol>
        <div class="operation">
          <span @click="handlesample">示例数据</span>
          <button class="clear" @click="handleclear">重置</button>
          <!-- <button class="all" @click="handleall">查看全部</button> -->
          <button class="result" @click="handlesearch">按输入条件分析</button>
        </div>
      </div>
      <div class="pathresult">
        <!-- <p>科研机构关联路径分析结果</p> -->
        <div class="graphtitle">
          <p>
            <span>科研机构关联路径分析结果</span>
          </p>
          <img
            src="../../../assets/img/all.png"
            alt="返回展示全部路径"
            class="logo"
            @click="handleall"
            title="返回展示全部路径"
          />
        </div>
        <div class="path">
          <div class="oper">
            <p>路径条数:</p>
            <ul>
              <li @click="handleselectpath(5,0)" :class="tabindex == 0 ? 'active':''">5</li>
              <li @click="handleselectpath(10,1)" :class="tabindex == 1 ? 'active':''">10</li>
              <li @click="handleselectpath(15,2)" :class="tabindex == 2 ? 'active':''">15</li>
              <li @click="handleselectpath(20,3)" :class="tabindex == 3 ? 'active':''">20</li>
              <li @click="handleselectpath('all',4)" :class="tabindex == 4 ? 'active':''">全部</li>
            </ul>
            <div>
              <input type="text" placeholder="请输入你想要的条数" v-model="pathnum" />
              <i-button type="primary" @click="handleconfim">确定</i-button>
              <span>共有{{total}}条</span>
            </div>
          </div>
          <p class="promptTitle layout_info">双击节点跳转相关详情</p>
        </div>
        <div class="map">
          <CheckboxGroup v-model="fruit" style="margin:10px 0;" @on-change="handlechange">
            <Checkbox :label="item.group" v-for="(item,index) in legend" :key="index">
              <span class="icon">
                <img :src="item.url" alt class="legend" :class="item.classname" />
                <!-- <span class="legend" :class="item.classname"></span> -->
                <span>{{item.name}}</span>
              </span>
            </Checkbox>
          </CheckboxGroup>
          <div style="height:600px">
            <div class="demo-spin-col" v-show="load">
              <Spin fix>
                <Icon type="ios-loading" size="26" class="demo-spin-icon-load"></Icon>
                <div style="font-weight:bolder">科研机构关联路径分析中</div>
              </Spin>
            </div>
            <div v-show="!load">
              <div id="guanlian"></div>
            </div>
          </div>
        </div>
        <!-- <div class="nodata" v-show="!iscontent">暂无数据</div> -->
      </div>
      <div class="datadetail">
        <h4>数据详情</h4>
        <div class="tab">
          <Table
            highlight-row
            ref="currentRowTable"
            :columns="columns"
            :data="list"
            v-if="list.length !==0"
          >
            <template slot-scope="{ row }" slot="data">
              <span
                v-if="row.data.path1"
                @click="handletosource(row.data.path1.id,row.data.path1.node)"
                class="pathinfo"
              >{{row.data.path1.name}}</span>
              <span
                v-if="row.data.path2"
                @click="handletosource(row.data.path2.id,row.data.path2.node)"
                class="pathinfo"
              >--{{row.data.path2.name}}</span>
              <span
                v-if="row.data.path3"
                @click="handletosource(row.data.path3.id,row.data.path3.node)"
                class="pathinfo"
              >--{{row.data.path3.name}}</span>
              <span
                v-if="row.data.path4"
                @click="handletosource(row.data.path4.id,row.data.path3.node)"
                class="pathinfo"
              >--{{row.data.path4.name}}</span>
              <span
                v-if="row.data.path5"
                @click="handletosource(row.data.path5.id,row.data.path5.node)"
                class="pathinfo"
              >--{{row.data.path5.name}}</span>
            </template>
            <template slot-scope="{ row }" slot="action">
              <div>
                <img
                  src="../../../assets/img/eye.png"
                  alt
                  title="返回展示全部路径"
                  @click="handleview(row.params)"
                  class="eye"
                />
              </div>
            </template>
          </Table>
          <div class="nodata" v-else>暂无数据</div>
          <div>
            <ul class="fenye">
              <li>共{{this.data1.length}}条</li>
              <li>
                <button type="button" class="prev" @click="preve">
                  <i class="el-icon el-icon-arrow-left"></i>
                </button>
              </li>
              <li>{{this.page}}</li>
              <li>
                <button type="button" class="next" @click="next">
                  <i class="el-icon el-icon-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);

    timer = setTimeout(callback, ms);
  };
})();
import Vis from "vis";
var person = require("../../../assets/img/path/person1.png");
var org = require("../../../assets/img/path/org1.png");
var org1 = require("../../../assets/img/path/org2.png");
var project = require("../../../assets/img/path/project1.png");
var paper = require("../../../assets/img/path/paper.png");
var achievement = require("../../../assets/img/path/biaozhun.png");
var zhuanli = require("../../../assets/img/path/zhuanli.png");
var zhuanzhu = require("../../../assets/img/path/zhuanzhu.png");
export default {
  name: "associatedpathdetail",
  data() {
    return {
      org1: "", //科研人员1
      org2: "", //科研人员2
      depth: 4, //最大关系深度
      columns: [
        {
          type: "index",
          title: "序号",
          width: 60,
          align: "center"
        },
        {
          title: "路径条目",
          slot: "data"
        },
        {
          title: "路径深度",
          key: "depth",
          width: 100,
          align: "center"
        },
        {
          title: "查看路径",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data1: [], //路径信息
      result1: [], //第一个检索框的人员名字数据
      result2: [], //第二个检索框的人员名字数据
      user1: {
        //第一个人员相关信息
        name: "中国科学院国家空间科学中心",
        orgId: "c55cc72d2bde45d7afa25997ea97e54a"
      },
      user2: {
        //第二个人员相关信息
        name: "中国科学院大学",
        orgId: "fc2a1b934b41403b855465dd22527f86"
      },
      pathcount: 5, //路径数量
      arr: [],
      selectorg1: false, //选中人名后人员列表消失
      selectorg2: false, //选中人名后人员列表消失
      iscontent: true, //控制图形的展示
      mark1: false, //第一个搜索框控制数据变化后是否再请求数据
      mark2: false, //第二个搜索框控制数据变化后是否再请求数据
      tabindex: 0, //路径导航下标
      total: 0, //路径总条数
      pathnum: "", //用户输入的条数
      page: 1, //分页
      pagesize: 5, //每页个数
      list: [], //每页显示的描述信息
      legend: [], //图例
      fruit: [], //取消的图例
      ismark: false, //选中的示例发生了变化
      nodes: [], //关系图节点
      links: [], //关系图的关系结合
      datalist: [], //下方表格路径信息
      load: false //加载状态
    };
  },
  watch: {
    org1() {
      delay(() => {
        if (!this.mark1) {
          if (this.org1 !== "") {
            this.selectorg1 = true;
            this.ferchData(this.org1, "org1");
          }
        }
        this.mark1 = false;
      }, 300);
    },
    org2() {
      delay(() => {
        if (!this.mark2) {
          if (this.org2 !== "") {
            this.selectorg2 = true;
            this.ferchData(this.org2, "org2");
          }
        }
        this.mark2 = false;
      }, 300);
    }
  },
  methods: {
    //点击输入条件进行搜索
    handlesearch() {
      if (this.org1 != "" && this.org2 != "") {
        this.load = true;
        this.getpathall();
      } else {
        this.$Message.warning({
          background: true,
          content: "请输入科研结构名称"
        });
      }
    },
    //点击清空按钮清楚示例数据
    handleclear() {
      this.pathcount = 5;
      this.tabindex = 0;
      this.pathnum = "";
      this.depth = 4;
      this.org1 = "";
      this.org2 = "";
      document.getElementById("legth4").checked = true;
      this.getpathall();
    },
    //点击查看全部
    handleall() {
      if (this.username1 != "" && this.username2 != "") {
        this.getpathall();
      }
    },
    //点击示例数据
    handlesample() {
      this.org1 = this.user1.name;
      this.org2 = this.user2.name;
      this.mark1 = true;
      this.mark2 = true;
    },
    //失去焦点下方搜索推荐列表消失
    handleblur() {
      var that = this;
      setTimeout(function() {
        that.selectorg1 = false;
        that.selectorg2 = false;
      }, 1000);
    },

    //关联路径图
    Associatedpath() {
      var node = this.nodes;

      var links = this.links;
      if (this.ismark == false) {
        node = node;
      } else if (this.ismark == true) {
        var newnode = [];
        for (var i = 0; i < node.length; i++) {
          for (var j = 0; j < this.fruit.length; j++) {
            if (node[i].category * 1 == this.fruit[j]) {
              newnode.push(node[i]);
            }
          }
        }
        node = newnode;
      }

      var legend = node.map(item => {
        return item.category * 1;
      });
      legend = Array.from(new Set(legend));

      for (var i = 0; i < legend.length; i++) {
        if (legend[i] == 0) {
          if (
            JSON.stringify(this.legend).indexOf(
              JSON.stringify({
                name: "人员",
                classname: "person",
                url: person,
                group: 0
              })
            ) == -1
          ) {
            this.legend.push({
              name: "人员",
              classname: "person",
              url: person,
              group: 0
            });
          }
          if (this.fruit.indexOf(0) == -1) {
            this.fruit.push(0);
          }
        } else if (legend[i] == 1) {
          if (
            JSON.stringify(this.legend).indexOf(
              JSON.stringify({
                name: "机构",
                classname: "org",
                url: org,
                group: 1
              })
            ) == -1
          ) {
            this.legend.push({
              name: "机构",
              classname: "org",
              url: org,
              group: 1
            });
          }
          if (this.fruit.indexOf(1) == -1) {
            this.fruit.push(1);
          }
        } else if (legend[i] == 2) {
          if (
            JSON.stringify(this.legend).indexOf(
              JSON.stringify({
                name: "项目",
                classname: "project",
                url: project,
                group: 2
              })
            ) == -1
          ) {
            this.legend.push({
              name: "项目",
              classname: "project",
              url: project,
              group: 2
            });
          }
          if (this.fruit.indexOf(2) == -1) {
            this.fruit.push(2);
          }
        } else if (legend[i] == 3) {
          if (
            JSON.stringify(this.legend).indexOf(
              JSON.stringify({
                name: "成果论文",
                classname: "paper",
                url: paper,
                group: 3
              })
            ) == -1
          ) {
            this.legend.push({
              name: "成果论文",
              classname: "paper",
              url: paper,
              group: 3
            });
          }
          if (this.fruit.indexOf(3) == -1) {
            this.fruit.push(3);
          }
        } else if (legend[i] == 4) {
          if (
            JSON.stringify(this.legend).indexOf(
              JSON.stringify({
                name: "成果标准",
                classname: "achievement",
                url: achievement,
                group: 4
              })
            ) == -1
          ) {
            this.legend.push({
              name: "成果标准",
              classname: "achievement",
              url: achievement,
              group: 4
            });
          }
          if (this.fruit.indexOf(4) == -1) {
            this.fruit.push(4);
          }
        } else if (legend[i] == 5) {
          if (
            JSON.stringify(this.legend).indexOf(
              JSON.stringify({
                name: "成果专利",
                classname: "zhuanli",
                url: zhuanli,
                group: 5
              })
            ) == -1
          ) {
            this.legend.push({
              name: "成果专利",
              classname: "zhuanli",
              url: zhuanli,
              group: 5
            });
          }
          if (this.fruit.indexOf(5) == -1) {
            this.fruit.push(5);
          }
        } else if (legend[i] == 6) {
          if (
            JSON.stringify(this.legend).indexOf(
              JSON.stringify({
                name: "成果专著",
                classname: "zhuanzhu",
                url: zhuanzhu,
                group: 6
              })
            ) == -1
          ) {
            this.legend.push({
              name: "成果专著",
              classname: "zhuanzhu",
              url: zhuanzhu,
              group: 6
            });
          }
          if (this.fruit.indexOf(6) == -1) {
            this.fruit.push(6);
          }
        }
      }
      node = node.map(item => {
        if (item.category == "1") {
          if (item.x == 50 || item.x == 960) {
            return {
              id: item.id,
              label: item.label,
              category: item.category * 1,
              x: item.x,
              y: item.y,
              size: 30,
              borderWidth: 5,
              borderWidthSelected: 5,
              resultId: item.resultId,
              //    shape:'dot',
              shape: "circularImage", //将背景图设置成圆形
              image: org,
              color: {
                border: "#fca276",
                background: "#fff"
              },
              font: {
                background: "#fff"
              }
            };
          } else {
            return {
              id: item.id,
              label: item.label,
              category: item.category * 1,
              padding: 5,
              shape: "circularImage", //将背景图设置成圆形
              image: org1,
              borderWidth: 5,
              x: item.x,
              y: item.y,
              borderWidthSelected: 5,
              resultId: item.resultId,
              color: {
                border: "#fca276",
                background: "#fff"
              },
              size: 20,
              font: {
                background: "#fff"
              }
            };
          }
        } else if (item.category == "0") {
          return {
            id: item.id,
            label: item.label,
            category: item.category * 1,
            shape: "circularImage",
            image: person,
            borderWidth: 5,
            x: item.x,
            y: item.y,
            borderWidthSelected: 5,
            resultId: item.resultId,
            color: {
              border: "#ce68be",
              background: "#fff"
            },
            size: 20,
            font: {
              background: "#fff"
            }
          };
        } else if (item.category == "2") {
          return {
            id: item.id,
            label: item.label,
            category: item.category * 1,
            shape: "circularImage",
            image: project,
            borderWidth: 5,
            x: item.x,
            y: item.y,
            borderWidthSelected: 5,
            resultId: item.resultId,
            // color:'#ce3c3c',
            color: {
              border: "#ce3c3c",
              background: "#fff"
            },
            size: 20,
            font: {
              background: "#fff"
            }
          };
        } else if (item.category == "3") {
          return {
            id: item.id,
            label: item.label,
            category: item.category * 1,
            shape: "circularImage",
            image: paper,
            borderWidth: 5,
            x: item.x,
            y: item.y,
            borderWidthSelected: 5,
            resultId: item.resultId,
            //     color:'#b494f6',
            color: {
              border: "#b494f6",
              background: "#fff"
            },
            size: 20,
            font: {
              background: "#fff"
            }
          };
        } else if (item.category == "4") {
          return {
            id: item.id,
            label: item.label,
            category: item.category * 1,
            shape: "circularImage",
            image: achievement,
            borderWidth: 5,
            x: item.x,
            y: item.y,
            borderWidthSelected: 5,
            resultId: item.resultId,
            //     color:'#5bcc5e',
            color: {
              border: "#5bcc5e",
              background: "#fff"
            },
            size: 20,
            font: {
              background: "#fff"
            }
          };
        } else if (item.category == "5") {
          return {
            id: item.id,
            label: item.label,
            category: item.category * 1,
            shape: "circularImage",
            image: zhuanli,
            borderWidth: 5,
            x: item.x,
            y: item.y,
            borderWidthSelected: 5,
            resultId: item.resultId,
            //     color:'#ccc869',
            color: {
              border: "#ccc869",
              background: "#fff"
            },
            size: 20,
            font: {
              background: "#fff"
            }
          };
        } else if (item.category == "6") {
          return {
            id: item.id,
            label: item.label,
            category: item.category * 1,
            shape: "circularImage",
            image: zhuanzhu,
            borderWidth: 5,
            x: item.x,
            y: item.y,
            borderWidthSelected: 5,
            resultId: item.resultId,
            //     color:'#80d7ff',
            color: {
              border: "#80d7ff",
              background: "#fff"
            },
            size: 20,
            font: {
              background: "#fff"
            }
          };
        } else {
          return {
            id: item.id,
            label: item.label,
            category: item.category * 1,
            shape: "dot",
            image: zhuanzhu,
            borderWidth: 5,
            x: item.x,
            y: item.y,
            borderWidthSelected: 5,
            resultId: item.resultId,
            //     color:'#80d7ff',
            color: {
              border: "#80d7ff",
              background: "#fff"
            },
            size: 20,
            font: {
              background: "#fff"
            }
          };
        }
      });

      //   var nodes = new Vis.DataSet(node);
      // var edges = new Vis.DataSet(links);
      this.load =false;
      var nodes = node;
      var edges = links;
      //  console.log(nodes)
      var container = document.getElementById("guanlian");

      var data = {
        nodes: nodes,
        edges: edges
      };

      var options = {
        autoResize: false,
        groups: {
          useDefaultGroups: false,
          myGroupId: {
            /*node options*/
          }
        },

        nodes: {
          shape: "dot",
          size: 20,

          font: {
            size: 12
          },

          fixed: {
            x: false,
            y: false
          },
          borderWidth: 2,

          shapeProperties: {
            useBorderWithImage: true
          }
        },

        edges: {
          width: 2,
          smooth: {
            enabled: false //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
          },
          color: "#ddd"
        },
        layout: {
          randomSeed: 300 //配置每次生成的节点位置都一样，参数为数字1、2等
          // hierarchical: {
          // direction: 'LR',//UD:上下 DU:下上 LR:左右 RL:右左
          //   sortMethod: 'directed'
          // },
        },
        physics: {
          minVelocity: 0.75,
          //计算节点之前斥力，进行自动排列的属性
          enabled: false, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
          barnesHut: {
            gravitationalConstant: -3000,
            centralGravity: 0.7,
            springLength: 200,
            springConstant: 0.02,
            damping: 0.09,
            avoidOverlap: 0
          }
        },

        interaction: {
          hover: true, //鼠标移过后加粗该节点和连接线
          dragNodes: true, //是否能拖动节点
          dragView: false, //是否能拖动画布
          hover: true, //鼠标移过后加粗该节点和连接线
          multiselect: true, //按 ctrl 多选
          selectable: true, //是否可以点击选择
          selectConnectedEdges: true, //选择节点后是否显示连接线
          hoverConnectedEdges: true, //鼠标滑动节点后是否显示连接线
          zoomView: true //是否能缩放画布
        },
        // hierarchicalRepulsion: {//调整节点之间的距离
        //     nodeDistance: 200
        //   },
        manipulation: {
          //该属性表示可以编辑，出现编辑操作按钮
          enabled: false
        }
      };

      var network = new Vis.Network(container, data, options);
      var that = this;

      network.on("doubleClick", function(params) {
        var id = params.nodes[0];

        var ids = nodes.map(item => {
          return item.id;
        });

        var index = ids.indexOf(id);
        if (nodes[index].category == 0) {
          that.$router.push({
            path: "persondetails",
            query: {
              personId: nodes[index].resultId
            }
          });
        } else if (nodes[index].category == 1) {
          that.$router.push({
            path: "organdetails",
            query: {
              orgId: nodes[index].resultId
            }
          });
        } else if (nodes[index].category == 2) {
          that.$router.push({
            path: "projectdetails",
            query: {
              projectId: nodes[index].resultId
            }
          });
        } else if (nodes[index].category == 3) {
          that.$router.push({
            path: "paperdetails",
            query: {
              paperId: nodes[index].resultId
            }
          });
        } else if (nodes[index].category == 4) {
          that.$router.push({
            path: "criteriondetails",
            query: {
              criterionId: nodes[index].resultId
            }
          });
        } else if (nodes[index].category == 5) {
          that.$router.push({
            path: "patentdetails",
            query: {
              patentId: nodes[index].resultId
            }
          });
        } else if (nodes[index].category == 6) {
          that.$router.push({
            path: "monographdetails",
            query: {
              monographId: nodes[index].resultId
            }
          });
        }
      });
    },
    //查看全部线路数据
    getpathall() {
      var pathLimit = this.pathcount;
      var depth = this.depth;
      var orgId1 = this.user1.orgId;
      var orgId2 = this.user2.orgId;
      var url = `/path/org`;
      var data = {
        pathLimit: pathLimit,
        depth: depth,
        organizationId1: orgId1,
        organizationId2: orgId2,
        startX: 50,
        endX: 960,
        y: 300
      };
      this.$axios.post(url, this.$qs.stringify(data)).then(res => {
        // console.log(res)
        if (res.data.code == "200") {
          // this.$Message.success({
          //   background: true,
          //   content: "数据请求成功"
          // });
          this.load = false;
          this.total = res.data.data.content.total;
          this.nodes = res.data.data.content.nodes;
          this.links = res.data.data.content.links;
          if (this.nodes.length == 0) {
            this.$Notice.warning({
              title: "提示！",
              desc: "指定领域机构之间无关联路径"
            });
          }

          var datalist = res.data.data.content.dataList;
          this.legend = [];
          this.fruit = [];
          this.ismark = false;

          this.datalist = datalist;
          this.data1 = this.datalist;

          this.pageDataFn(this.page, this.pagesize, this.data1);

          this.$nextTick(function() {
            this.Associatedpath();
          });
        } else if (res.data.code == "500") {
          this.$Message.error({
            background: true,
            content: res.data.message
          });
        }
      });
    },
    //查看单条路径信息
    handleview(val) {
      var depth = this.depth;
      var path = val;
      var url = `/path/oneOrgPath`;
      var data = {
        depth: depth,
        path: path,
        startX: 50,
        endX: 960,
        y: 300
      };
      this.$axios.post(url, this.$qs.stringify(data)).then(res => {
        // console.log(res);
        this.total = res.data.data.content.total;
        var nodes = res.data.data.content.nodes;

        nodes = nodes.map((item, i) => {
          if (item.category === "1") {
            if (item.x == undefined && item.y == undefined) {
              return {
                category: item.category,
                id: item.id,
                label: item.label,
                resultId: item.resultId,
                x: i * 200,
                y: 300
              };
            } else {
              return {
                category: item.category,
                id: item.id,
                label: item.label,
                resultId: item.resultId,
                x: item.x,
                y: item.y
              };
            }
          } else if (item.category != "1") {
            return {
              category: item.category,
              id: item.id,
              label: item.label,
              resultId: item.resultId,
              x: i * 220,
              y: 300
            };
          }
        });
        this.nodes = nodes;
        this.links = res.data.data.content.links;
        this.legend = [];
        this.fruit = [];
        this.ismark = false;
        this.Associatedpath();
      });
    },
    //实时根据输入推荐机构名称
    async ferchData(val, str) {
      this.$axios.get("/manage/orgName?name=" + val).then(res => {
        // console.log("机构");
        // console.log(res);
        if (str == "org1") {
          this.result1 = res.data.data.content;
        } else if (str == "org2") {
          this.result2 = res.data.data.content;
        }
      });
    },
    handleClickQuery(val, str) {
      if (str == "one") {
        this.mark1 = true;
        this.org1 = val.name;
        this.selectorg1 = false;
        this.user1.name = val.name;
        this.user1.orgId = val.organizationId;
      } else if (str == "two") {
        this.mark2 = true;
        this.org2 = val.name;
        this.selectorg2 = false;
        this.user2.name = val.name;
        this.user2.orgId = val.organizationId;
      }
    },
    //选择展示路径条数
    handleselectpath(val, index) {
      if (val !== "all") {
        this.pathcount = val;
      } else {
        this.pathcount = this.total;
      }
      this.load =true;
      this.ismark = false;
      this.tabindex = index;
      this.getpathall();
    },
    //点击确定按钮执行用户输入的条数
    handleconfim() {
      this.pathcount = this.pathnum;

      this.getpathall();
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
      this.pageDataFn(this.page, this.pagesize, this.data1);
    },
    //下一页
    next() {
      this.page++;
      var pagecount = Math.ceil(this.data1.length / this.pagesize);
      if (this.page >= pagecount) {
        this.page = pagecount;
      }
      this.pageDataFn(this.page, this.pagesize, this.data1);
    },
    //选中某个示例
    handlechange() {
      this.ismark = true;

      this.Associatedpath();
    },
    //深度选择
    handledepth(val) {
      this.depth = val;
      this.getpathall();
    },
    //点击路径详情里面相关数据跳转相关详情
    handletosource(id, nodetype) {
      if (nodetype == "org") {
        this.$router.push({
          path: "organdetails",
          query: {
            orgId: id
          }
        });
      } else if (nodetype == "person") {
        this.$router.push({
          path: "persondetails",
          query: {
            personId: id
          }
        });
      } else if (nodetype == "project") {
        this.$router.push({
          path: "projectdetails",
          query: {
            projectId: id
          }
        });
      } else if (nodetype == "paper") {
        this.$router.push({
          path: "paperdetails",
          query: {
            paperId: id
          }
        });
      } else if (nodetype == "criterion") {
        this.$router.push({
          path: "criteriondetails",
          query: {
            criterionId: id
          }
        });
      } else if (nodetype == "patent") {
        this.$router.push({
          path: "patentdetails",
          query: {
            patentId: id
          }
        });
      } else if (nodetype == "monograph") {
        this.$router.push({
          path: "monographdetails",
          query: {
            monographId: id
          }
        });
      }
    }
  },
  mounted() {
    //   this.getpathall();
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

<style scoped lang="scss">
.header {
  background: #fff;
  border-bottom: 1px solid #ddd;
  p {
    line-height: 40px;
    padding-bottom: 10px;
    font-size: 18px;
  }
}
.associatedpathdetail {
  width: 100%;
}
.top {
  width: 100%;
  background: #fff;
  padding: 15px;
}
.top h2 {
  border: none;
  padding: 10px 0;
}
.top > ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.sc-query ul li {
  width: 50%;
}
.sc-query ul li p {
  height: 40px;
  line-height: 40px;
}
.sc-query ul li input {
  width: 90%;
  height: 36px;
  padding-left: 10px;
}
.relationheight {
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
}
.top ol {
  display: flex;
  justify-content: flex-start;
}
.top ol li {
  margin-right: 5px;
  cursor: pointer;
}
.top ol li input {
  margin-right: 5px;
}
.operation {
  display: flex;
  justify-content: flex-end;
}
.operation span {
  line-height: 36px;
  color: #0099da;
  cursor: pointer;
}
.operation button {
  padding: 5px 15px;
  border: 1px solid #ddd;
  margin: 0 10px;
  cursor: pointer;
}
.operation .clear {
  display: block;
  border-radius: 0;
  width: 120px !important;
  height: 36px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.result {
  background-color: #5cb85c;
  color: white;
  border-color: #5cb85c;
  display: block;
  border-radius: 0;
  width: 200px;
  height: 36px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  /* color: #555; */
  /* background-color: #fff; */
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.all {
  display: block;
  border-radius: 0;
  width: 120px;
  height: 36px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.pathresult {
  margin-top: 20px;
  background: #fff;
  padding: 15px;
}
.pathresult > p {
  height: 40px;
  line-height: 40px;
  background: #bce8f1;
  padding-left: 24px;
}
#guanlian {
  width: 100%;
  height: 600px;
}
.sc-query .top ul li {
  width: 100%;
}
.resultdata {
  height: 200px;
  overflow-y: auto;
  li {
    cursor: pointer;
  }
}
.nodata {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
}
.personname {
  position: relative;
  .select-list {
    width: 90%;
    display: block;
    visibility: visible;
    font-size: 12px;
    line-height: 1.5;
    position: absolute;
    left: 0;
    top: 36px;
  }
}
.path {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .oper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
  }
  ul {
    display: flex;
    li {
      width: 50px;
      border: 1px solid #ddd;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
    .active {
      background: #0099da;
      color: #fff;
    }
  }
  p {
    margin-right: 15px;
  }
  div {
    margin-left: 35px;
    input {
      line-height: 30px;
      padding-left: 5px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-right: 10px;
    }
    button {
      margin-right: 15px;
    }
  }
}
.fenye {
  width: 200px;
  margin: 0 auto;
  display: flex;
  li {
    width: 60px;
    text-align: center;
    line-height: 30px;
    .prev {
      background-color: #fff;
      cursor: pointer;
      margin: 0;
      color: #303133;
      border: none;
    }
    .next {
      background-color: #fff;
      cursor: pointer;
      margin: 0;
      color: #303133;
      border: none;
    }
  }
}
.legend {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 2px;
  border-radius: 50%;
  margin: 3px;
}
.person {
  border: 2px solid #fd7862;
}
.org {
  border: 2px solid #fca276;
}

.project {
  // background: #ce3c3c;
  border: 3px solid #a78ae5;
}
.paper {
  //background: #b494f6;
  border: 3px solid #fd7862;
}
.achievement {
  //background: #5bcc5e;
  border: 3px solid #fd7862;
}
.zhuanli {
  //background: #ccc869;
  border: 3px solid #fd7862;
}
.zhuanzhu {
  // background: #80d7ff;
  border: 3px solid #fd7862;
}

.icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.eye {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
}
li {
  list-style: none;
}
.datadetail {
  margin-top: 20px;
  background: #fff;
  padding: 15px;
}
.pathinfo {
  cursor: pointer;
}
.pathinfo:hover {
  color: #0099da;
  text-decoration: underline;
}
</style>