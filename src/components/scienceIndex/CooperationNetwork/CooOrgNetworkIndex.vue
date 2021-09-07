<template>
  <div class="sc-query">
    <div style="width:100%;">
      <div class="headerBg">
        <div class="top">
          <div class="sc-title">
            <p>科研机构合作网络</p>
          </div>
          <!-- <h2>请输入分析条件</h2> -->
          <div class="sc-section-warp">
            <div class="fl_left">
              <p>请输入要分析的科研机构名称</p>
              <div class="drop-box">
                <input type="text" v-model="organ_name" @focus="handleFocus" placeholder="请输入机构名称" />
                <div class="poptip-warp" v-if="isShow">
                  <div class="mask" @click.stop="handleClickQuery('close')"></div>
                  <div class="poptip-box">
                    <div class="border">
                      <div class="poptip-popper scrollbar">
                        <ul v-if="dropDownList.length!==0">
                          <li
                            v-for="(item,i) in dropDownList"
                            :key="i+'xc'"
                            @click.stop="handleClickQuery(item)"
                          >{{item.name}}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="fr_right">
              <p>合作紧密机构数量TOP值</p>
              <Select v-model="model2" style="width:90%;" @on-change="handleSelectData">
                <Option value="10">前10</Option>
                <Option value="20">前20</Option>
                <Option value="30">前30</Option>
                <Option value="100">全部</Option>
              </Select>
            </div>
          </div>
        </div>
        <div class="sc-time">
          <p>时间范围</p>
          <row>
            <i-col span="12">
              <Date-picker
                type="year"
                @on-change="handleStartTime"
                :value="startDate"
                format="yyyy"
                placeholder="请选择开始年份"
                style="width: 90%"
                :start-date="new Date(2010,1,0)"
              ></Date-picker>
            </i-col>
            <i-col span="12">
              <Date-picker
                type="year"
                @on-change="handleEndTime"
                :value="endDate"
                format="yyyy"
                placeholder="请选择结束年份"
                style="width: 90%"
                :start-date="new Date(2010,1,0)"
              ></Date-picker>
            </i-col>
          </row>
        </div>
        <div class="cooperationType">
          <span class="cooperationTitle">合作类型:</span>
          <Checkbox-group v-model="checkAllGroup" @on-change="handleChangeData">
            <!-- @on-change="change" -->
            <Checkbox label="项目"></Checkbox>
            <Checkbox label="论文"></Checkbox>
            <Checkbox label="专利"></Checkbox>
            <Checkbox label="标准"></Checkbox>
            <Checkbox label="专著"></Checkbox>
            <!-- <Checkbox label="任务"></Checkbox> -->
          </Checkbox-group>
        </div>

        <div class="operation">
          <p class="Example" @click="ExampleBtn">示例数据</p>
          <button class="clear" @click="clearData">重置</button>
          <button class="result" @click="executeQuery">按输入条件分析</button>
        </div>
      </div>

      <div class="footerBg">
        <div class="cooperationNetworkPerson">
          <p class="networkTitle">
            <b>科研机构网络分析结果</b>
          </p>
          <div id="content" style="position: relative;">
            <div style="height: 710px; width: 100%; margin:0 auto">
              <div
                style="margin-top: 10px;height: 90px; width: 100%;top: 0px"
                id="textTitle"
                v-html="textTitle"
              ></div>
              <div id="cooNetwork" style="height: 560px; width: 100%; margin:0 auto"></div>
              <div style="height: 50px; width: 100%;bottom: 0px" id="textDesc" v-html="textDesc"></div>
            </div>
            <div
              class="demo-spin-col"
              style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;"
              v-if="!loading"
              span="8"
            >
              <Spin fix>
                <Icon type="ios-loading" size="40" class="demo-spin-icon-load"></Icon>
                <div style="font-size: 20px;">正在分析科研机构网络结果请耐心等待. . .</div>
              </Spin>
            </div>
            <div v-show="model1">
              <Tabs
                type="card"
                :animated="false"
                @on-click="handleTabChange"
                style="position: relative;"
              >
                <Tab-pane label="论文">
                  <ConfPaper :loading="listLoading" :data="paperData" />
                </Tab-pane>
                <Tab-pane label="专利">
                  <Patent :loading="listLoading" :data="patentData" />
                </Tab-pane>
                <Tab-pane label="标准">
                  <Criterion :loading="listLoading" :data="criterionData" />
                </Tab-pane>
                <Tab-pane label="专著">
                  <Monography :loading="listLoading" :data="monographData" />
                </Tab-pane>
                <Tab-pane label="项目">
                  <project :loading="listLoading" :data="projectData" />
                </Tab-pane>
              </Tabs>
              <div class="sc-page" v-if="!listLoading">
                <span>检索到{{total}}篇</span>
                <Page
                  :current.sync="currentPage"
                  :total="total"
                  @on-change="changePage"
                  @on-page-size-change="changeSizePage"
                  show-elevator
                  show-sizer
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeRange from "./modules/TimeRange"; // 时间选择组件
import DropDown from "./modules/DropDown"; // input筛选框

import project from "./modules/organTab/project";
import ConfPaper from "./modules/organTab/ConfPaper";
import Patent from "./modules/organTab/Patent";
import Criterion from "./modules/organTab/Criterion";
import Monography from "./modules/organTab/Monography";

import center from "../../../assets/icon/organ1.png";
import organimg from "../../../assets/icon/organ2.png";

export default {
  components: {
    TimeRange,
    DropDown,
    project,
    ConfPaper,
    Patent,
    Criterion,
    Monography
  },
  data() {
    return {
      currentPage: 1,
      model2: "10",
      skip: 0,
      orgLimit: "",
      orgId: "",
      dropDownList: [],
      refuseLoading: true,
      checkAllGroup: ["项目", "论文", "专利", "标准", "专著"],
      organ_name: "",
      startDate: "", //开始年份
      endDate: "", //	结束年份
      cooperationMode: "", // 合作形式
      model1: false, // 弹框默认关闭
      textDesc: "",
      markTab: 0,
      listLoading: true,
      isShow: false,
      mark: 1,
      marks: true,
      total: 0,
      limit: 10,
      organizationId2: "",
      projectData: [], // 项目
      paperData: [], // 论文
      patentData: [], // 专利
      criterionData: [], // 标准
      monographData: [], // 专著
      taskData: [], // 任务
      loading: true, // 加载动画
      zoom: null,
      textTitle: null,
      normalWidth: null,
      // 示例数据
      organizationId1: "898adfeeef094633bf6fe3f7ab3e7a6b",
      organ_name1: "西北工业大学",
      model3: "20"
    };
  },
  watch: {
    organ_name(news) {
      this.organ_name = news;
      this.handleChange();
    }
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
  mounted() {},
  methods: {
    // 获取开始时间
    handleStartTime(val) {
      this.startDate = val;
    },
    // 获取结束时间
    handleEndTime(val) {
      this.endDate = val;
    },
    //   科研人员查询
    handleChange(val) {
      this.$axios
        .get("/manage/orgName", { params: { name: this.organ_name } })
        .then(res => {
          this.dropDownList = res.data.data.content.map(item => {
            item.name = item.name;
            // console.log(item.name)
            return item;
          });
        });
    },
    handleClickQuery(item) {
      this.isShow = false;
      if (item !== "close") {
        this.organ_name = item.name;
        this.orgId = item.organizationId;
      }
    },
    handleFocus() {
      this.isShow = true;
    },
    blurfns() {},
    // 选项框获取值
    handleSelectData(e) {
      this.model2 = e;
    },
    // 示例数据
    ExampleBtn() {
      this.orgId = this.organizationId1;
      this.organ_name = this.organ_name1;
      this.model2 = this.model3;
      this.model2 = "20";
    },
    // 重置
    clearData() {
      this.model2 = "10";
      this.orgId = "";
      this.organ_name = "";
      this.startDate = "";
      this.endDate = "";
      this.checkAllGroup = ["项目", "论文", "专利", "标准", "专著"];
      //   this.executeQuery();
      // this.myChart = this.$echarts.clear(chart);
    },

    // 按输入条件分析
    executeQuery() {
      if (this.queryName == "") {
        this.$Notice.warning({
          title: "提示！",
          desc: "请输入要分析的科研机构名称！"
        });
      } else {
        this.loading = false;
        this.model1 = false;
        if (this.model2 == 100) {
          this.zoom = 0.6;
        } else if (
          this.model2 == "10" ||
          this.model2 == "20" ||
          this.model2 == "30"
        ) {
          this.zoom = 1.1;
        }
        var data = {
          limit: this.model2,
          organizationId: this.orgId,
          yearStart: this.startDate,
          yearEnd: this.endDate,
          types: this.cooperationMode
        };
        this.$axios
          .post("/coop/netAnalysis", this.$qs.stringify(data))
          .then(res => {
            let myChart = null;
            if (res.data.code == 200) {
              this.loading = true;
              // this.$Message.success({
              //       background: true,
              //       content: '数据请求成功'
              //   });
              let personNetworkData = res.data.data.content;
              if (personNetworkData.length !== 0) {
                let links = res.data.data.content.links;

                let chart = document.getElementById("cooNetwork");
                chart.removeAttribute("_echarts_instance_");
                myChart = this.$echarts.init(chart);

                let centralPersonName = "";
                let categories = [
                  {
                    name: "检索机构",
                    icon: "image://" + organimg
                  },
                  {
                    name: "合作机构",
                    icon: "image://" + center
                  }
                ];
                var nodesData = [];
                let perName = "";
                personNetworkData.nodes.forEach(item => {
                  // console.log(item);
                  if (item.group === "0") {
                    perName = item.name;
                    nodesData.push({
                      category: "检索机构",
                      name: item.name,
                      organ: item.organizationId,
                      symbol: "image://" + organimg
                    });
                  } else {
                    nodesData.push({
                      category: "合作机构",
                      name: item.name,
                      organ: item.organizationId,
                      value: item.count,
                      symbol: "image://" + center
                    });
                  }
                });
                let linksList = [];
                let temp = {};
                for (let i = 1; i < nodesData.length; i++) {
                  temp.source = 0;
                  temp.target = i;
                  temp.value = nodesData[i].value;
                  if(temp.value <=100) {
                    this.normalWidth = 1
                  }
                  if(temp.value >=100 && temp.value <=150) {
                    this.normalWidth = 2
                  }
                  if(temp.value >=150 && temp.value <=200) {
                    this.normalWidth = 2.5
                  }
                  if(temp.value >=200 && temp.value <=250) {
                    this.normalWidth = 3
                  }
                  if(temp.value >=250 && temp.value <=300) {
                    this.normalWidth = 3.5
                  }
                  if(temp.value >=300 && temp.value <=350) {
                    this.normalWidth = 4
                  }
                  if(temp.value >=350 && temp.value <=400) {
                    this.normalWidth = 5
                  }
                  temp.lineStyle = {
                    normal: {
                      width: this.normalWidth
                    }
                  };
                  linksList.push(temp);
                  temp = {};
                }
                //   console.log(nodesData)
                var titleData = ``;
                titleData =
                  `<div><p class="FirstTitle">` +
                  `<span>` +
                  perName +
                  `</span>` +
                  `总合作机构的数量为：<span>` +
                  personNetworkData.total +
                  `</span>` +
                  `</p><p class="promptTitle">最多可显示前100个机构的合作关系</p>` +
                  `<p class="promptTitle">点击关联边可以显示连接的两个机构的合作情况</p></div>`;
                this.textTitle = titleData;
                let option = {
                  tooltip: {
                    formatter: function(params) {
                      if (params.dataType == "edge") {
                        return "合作关系数量：" + params.value;
                      }
                      if (params.dataType == "node") {
                        return params.data.organizationName;
                      }
                    }
                  },
                  legend: {
                    show: true,
                    top: "1%",
                    data: categories,
                    itemWidth: 18,
                    itemHeight: 18
                  },
                  series: [
                    {
                      type: "graph",
                      layout: "force",
                      roam: true,
                      hoverAnimation: true,
                      focusNodeAdjacency: true,
                      draggable: true,
                      symbolSize: 33,
                      zoom: this.zoom,
                      force: {
                        repulsion: 400,
                        edgeLength: 80,
                        layoutAnimation: false
                      },
                      itemStyle: {
                        normal: {
                          borderColor: "#fff",
                          borderWidth: 1,
                          shadowBlur: 10,
                          shadowColor: "rgba(0, 0, 0, 0.3)"
                        }
                      },
                      lineStyle: {
                        width: 0.5,
                        curveness: 0,
                        opacity: 1
                      },
                      label: {
                        normal: {
                          show: true,
                          position: "bottom",
                          backgroundColor: "#fff",
                          formatter: function(params) {
                            return params.data.name;
                          }
                        },
                        emphasis: {
                          show: true,
                          position: "bottom",
                          backgroundColor: "#fff",
                          formatter: function(params) {
                            return params.data.name;
                          }
                        }
                      },
                      emphasis: {
                        itemStyle: {
                          borderWidth: 3
                        },
                        lineStyle: {
                          color: "gray",
                          width: 1
                        }
                      },
                      data: nodesData,
                      links: linksList,
                      categories: categories
                    }
                  ]
                };
                //显示结果描述
                let resultContent = "";
                if (nodesData.length === 1) {
                  resultContent +=
                    '<p><span style="font-size: larger; color: #2e6da4">' +
                    perName +
                    "</span>&nbsp; 和任何科研人员都没有过合作。</p>";
                } else {
                  let cooNum = nodesData.length;
                  let maxPersonName = "";
                  let maxPersonNum = 0;
                  for (let i = 1; i < cooNum; i++) {
                    if (nodesData[i].value >= maxPersonNum) {
                      maxPersonNum = nodesData[i].value;
                      maxPersonName = nodesData[i].name;
                    }
                  }
                  resultContent +=
                    '<p class="FirstTitle"><span>' +
                    perName +
                    "</span>与<span>" +
                    (cooNum - 1) +
                    "</span>个科研机构有合作关系；";
                  resultContent +=
                    "与<span>" +
                    maxPersonName +
                    "</span>关系最为紧密，合作关系数量为<span>" +
                    maxPersonNum +
                    "</span>；</p>";
                  resultContent +=
                    '<p class="promptTitle">鼠标放在节点上可查看科研机构的合作次数，点击连线可查看合作明细，点击专家节点可进入详情页。</p>';
                }
                this.textDesc = resultContent;

                myChart.on("click", params => {
                  if (params.dataType === "edge") {
                    this.model1 = true;
                    this.organizationId2 = nodesData[params.data.target].organ;
                    this.markTabChange();
                    // this.handleProjectList();
                  }
                  // 点击节点跳转到详情
                  if(params.dataType === "node") {
                    this.$router.push({
                      path: "/organdetails",
                      query: {
                        orgId: params.data.organ
                      }
                    });
                  }
                });

                myChart.setOption(option);
              } 
              if(nodesData.length <= 1) {
                this.$Message.info({
                    background: true,
                    content: '该指定领域机构无合作网络'
                });
              }
            }else if(res.data.code == 500) {
              this.$Message.error({
                    background: true,
                    content: res.data.message
                });
            }
          });
      }
    },

    // 合作类型
    handleChangeData() {
      let cooperationMode = "";
      this.checkAllGroup.forEach(item => {
        let m = null;
        switch (item) {
          case "项目":
            m = "project";
            break;
          case "论文":
            m = "paper";
            break;
          case "专利":
            m = "patent";
            break;
          case "标准":
            m = "criterion";
            break;
          case "专著":
            m = "monograph";
            break;
          default:
            break;
        }
        cooperationMode = cooperationMode + m + ",";
      });
      console.log(cooperationMode);
      this.cooperationMode = cooperationMode.slice(
        0,
        cooperationMode.length - 1
      );
      // this.getPersonCoopnet();
    },
    // tab切换
    markTabChange(key) {
      let mark = key ? key : this.markTab;
      switch (mark) {
        case 0: // 论文
          this.handlePaperList();
          break;
        case 1: // 专利
          this.handlePatentList();
          break;
        case 2: // 标准
          this.handleCriterionList();
          break;
        case 3: // 专著
          this.handleMonographList();
          break;
        case 4: // 项目
          this.handleProjectList();
          break;
        default:
          break;
      }
    },
    // tab 点击时触发
    handleTabChange(key) {
      this.markTab = key;
      this.skip = 0;
      this.limit = 10;
      this.current = 0;
      this.markTabChange(key);
    },
    // tab切换页数
    changePage(event) {
      this.skip = event - 1;
      this.markTabChange();
    },
    changeSizePage(event) {
      this.limit = event;
      this.markTabChange();
    },
    // 项目
    handleProjectList() {
      this.listLoading = true;
      var data = {
        organizationId: this.orgId,
        organizationId2: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "project"
      };
      this.$axios.post("/coop/orgLine", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.listLoading = false;
          this.projectData = res.data.data.content.result;
          this.total = res.data.data.content.total * 1;
        }
      });
    },
    // 论文
    handlePaperList() {
      this.listLoading = true;
      var data = {
        organizationId: this.orgId,
        organizationId2: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "paper"
      };
      this.$axios.post("/coop/orgLine", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.listLoading = false;
          this.paperData = res.data.data.content.result;
          this.total = res.data.data.content.total * 1;
        }
      });
    },
    // 专利
    handlePatentList() {
      this.listLoading = true;
      var data = {
        organizationId: this.orgId,
        organizationId2: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "patent"
      };
      this.$axios.post("/coop/orgLine", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.listLoading = false;
          this.patentData = res.data.data.content.result;
          this.total = res.data.data.content.total * 1;
        }
      });
    },
    // 标准
    handleCriterionList() {
      this.listLoading = true;
      var data = {
        organizationId: this.orgId,
        organizationId2: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "criterion"
      };
      this.$axios.post("/coop/orgLine", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.listLoading = false;
          this.criterionData = res.data.data.content.result;
          this.total = res.data.data.content.total * 1;
        }
      });
    },
    // 专著
    handleMonographList() {
      this.listLoading = true;
      var data = {
        organizationId: this.orgId,
        organizationId2: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "monograph"
      };
      this.$axios.post("/coop/orgLine", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.listLoading = false;
          this.monographData = res.data.data.content.result;
          this.total = res.data.data.content.total * 1;
        }
      });
    },
    // 任务
    handleTaskList() {
      var data = {
        organizationId: this.orgId,
        organizationId2: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "task"
      };
      this.$axios.post("/coop/orgLine", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.taskData = res.data.data.content.result;
          this.total = res.data.data.content.total * 1;
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>
@import "../../../style/details.scss";
.sc-title {
  border-bottom: 1px solid #ddd;
  p {
    line-height: 40px;
    padding-bottom: 10px;
    font-size: 18px;
  }
}
.headerBg,
.footerBg {
  width: 100%;
  background: #fff;
  padding: 15px;
}
.footerBg {
  margin-top: 20px;
}
.top {
  h2 {
    border-bottom: 0px solid #ddd;
  }
  width: 100%;
  .sc-section-warp {
    margin-top: 15px;
    .fl_left,
    .fr_right {
      width: 50%;
      float: left;
    }
    #orgLimit {
      width: 90%;
      line-height: 1.5;
      font-size: 12px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      color: #515a6e;
      padding: 5px 8px;
    }
  }
}
.sc-time {
  /deep/ span {
    line-height: 0 !important;
    float: none !important;
  }
}
.cooperationType {
  margin-top: 30px;
  width: 100%;
  .cooperationTitle {
    float: left;
    margin-right: 10px;
  }
}
.operation {
  display: flex;
  justify-content: flex-end;
}

.operation span {
  line-height: 36px;
  color: #2d8cf0;
}

.operation {
  padding: 5px 15px;
  margin: 0 10px;
  .clear {
    display: block;
    border: none;
    width: 150px;
    height: 36px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
}
.result {
  margin-left: 15px;
  background-color: #2d8cf0;
  color: white;
  // border-color: #5cb85c;
  display: block;
  border-radius: 0;
  width: 200px;
  height: 36px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.cooperationNetworkPerson {
  margin-top: 10px;
  border: 1px solid #1843a3;
  .networkTitle {
    border-bottom: 1px solid #1843a3;
    background: #d8e8f7;
    color: #3276b1;
    font-size: 16px;
    line-height: 40px;
    padding-left: 10px;
  }
}

.FirstTitle {
  font-size: 16px;
  font-weight: bold;
  color: #666;
  span {
    font-size: 18px;
    color: #ed2424;
    margin: 0 8px;
  }
}
.promptTitle {
  font-size: 14px;
  margin-left: 15px;
}
.promptTitle::before {
  content: " ";
  display: block;
  height: 15px;
  width: 15px;
  margin-top: 3px;
  float: left;
  margin-right: 8px;
  background: url("../../../assets/images/promptTitle.png") no-repeat;
  background-size: 100%;
}

.scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #dfdfdf;
}

.scrollbar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: rgb(247, 247, 247);
}

.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}

.drop-box {
  input {
    line-height: 1.5;
    padding: 8px 8px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    width: 90%;
    height: 100%;
  }
  .border {
    padding: 3px 0;
  }
  .poptip-popper {
    //  margin: 10px 0;
    overflow-y: auto;
    max-height: 250px;
    > div {
      margin: 3px 0px;
    }
    ul {
      li {
        cursor: pointer;
        margin: 5px 8px;
        border-bottom: 1px solid #eee;
        white-space: normal nowrap;
        padding: 0 8px;
      }
      li:hover {
        color: #2d65bf;
      }
    }
  }
  .poptip-box {
    position: absolute;
    top: 11px;
    background-color: #fff;
    padding: 5px 0px;
    border: 1px solid #eee;
    border-radius: 4px;
    z-index: 1000;
  }
  .poptip-warp {
    position: relative;
    color: #333;
    font-weight: 400;
    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  .poptip-warp:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    top: 5px;
    left: 20px;
    z-index: 1000;
    border-width: 1px 0 0 1px;
    border-style: solid;
    border-color: #e5e5e5;
    background: #fff;
    transform: rotate(45deg);
    transition: opacity 0.3s ease-in;
  }
}
.zanwu {
  padding: 0 15px;
}
</style>