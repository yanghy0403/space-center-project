<template>
  <div class="sc-query">
    <div style="width:100%;">
      <div class="headerBg">
        <div class="top">
          <div class="sc-title">
            <p>人员机构合作网络</p>
          </div>
          <!-- <h2>请输入分析条件</h2> -->
          <div class="sc-section-warp">
            <div class="fl_left">
              <p>请输入要分析的科研人员姓名</p>
              <div class="drop-box">
                <input
                  type="text"
                  v-model="person_name"
                  @focus="handleFocus"
                  @blur="blurfns"
                  placeholder="输入格式：“人员姓名：机构名称”"
                />
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
              <p>合作紧密人员数量TOP值</p>
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
            <b>科研人员网络分析结果</b>
          </p>
          <div id="content" style="position: relative;">
            <div style="height: 610px; width: 100%; margin:0 auto">
              <div
                style="margin-top: 10px;height: 90px; width: 100%;top: 0px"
                id="textTitle"
                v-html="textTitle"
              ></div>
              <div id="cooNetwork" style="height: 480px; width: 100%; margin:0 auto"></div>
              <div style="height: 90px; width: 100%;bottom: 0px" id="textDesc" v-html="textDesc"></div>
            </div>
            <div
              class="demo-spin-col"
              style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;"
              v-if="!loading"
              span="8"
            >
              <Spin fix>
                <Icon type="ios-loading" size="40" class="demo-spin-icon-load"></Icon>
                <div style="font-size: 20px;">正在分析科研人员网络结果请耐心等待. . .</div>
              </Spin>
            </div>
            <div v-show="isCooperationList">
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

import project from "./modules/personTab/project";
import ConfPaper from "./modules/personTab/ConfPaper";
import Patent from "./modules/personTab/Patent";
import Criterion from "./modules/personTab/Criterion";
import Monography from "./modules/personTab/Monography";

import center from "../../../assets/icon/person1.png";
import person2 from "../../../assets/icon/person2.png";
import person3 from "../../../assets/icon/person3.png";

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
      personLimit: "",
      perId: "",
      dropDownList: [],
      refuseLoading: true,
      checkAllGroup: ["项目", "论文", "专利", "标准", "专著"],
      person_name: "",
      startDate: "", //开始年份
      endDate: "", //	结束年份
      cooperationMode: "", // 合作形式
      isCooperationList: false,
      isShow: false,
      textDesc: "",
      markTab: 0,
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
      textTitle: null,
      listLoading: true,
      legendData: [],
      // 示例数据
      perId1: "57e386e08b524dbc928b3620bcc91682",
      person_name1: "周军：西北工业大学",
      model3: "20"
    };
  },
  watch: {
    person_name(newVal) {
      this.person_name = newVal;
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
    handleChange() {
      this.$axios
        .get("/manage/personName", { params: { name: this.person_name } })
        .then(res => {
          this.dropDownList = res.data.data.content.map(item => {
            item.name = item.name + "：" + item.organization;
            // console.log(item.name)
            return item;
          });
        });
    },
    handleClickQuery(item) {
      this.isShow = false;
      if (item !== "close") {
        this.person_name = item.name;
        this.perId = item.personId;
      }
    },
    handleFocus() {
      this.isShow = true;
    },
    blurfns() {},
    // 示例数据
    ExampleBtn() {
      this.perId = this.perId1;
      this.person_name = this.person_name1;
      this.model2 = this.model3;
      this.model2 = "20";
    },
    // 重置
    clearData() {
      this.model2 = "10";
      this.perId = "";
      this.$refs.dropDown.setName("");
      this.startDate = "";
      this.endDate = "";
      this.checkAllGroup = ["项目", "论文", "专利", "标准", "专著"];
    },
    // 选项框获取值
    handleSelectData(e) {
      this.model2 = e;
    },
    // 按输入条件分析
    executeQuery() {
      if (this.queryName == "" || this.model2 == "") {
        this.$Notice.warning({
          title: "提示！",
          desc: "请输入要分析的科研人员姓名或TOP值"
        });
      } else {
        this.loading = false;
        this.isCooperationList = false;
        var data = {
          limit: this.model2,
          personId: this.perId,
          yearStart: this.startDate,
          yearEnd: this.endDate,
          types: this.cooperationMode
        };
        this.$axios
          .post("/coop/orgNetwork", this.$qs.stringify(data))
          .then(res => {
            let myChart = null;
            if (res.data.code == 200) {
              this.loading = true;
              // this.$Message.success({
              //   background: true,
              //   content: "数据请求成功"
              // });
              let personNetworkData = res.data.data.content;
              if (personNetworkData.length !== 0) {
                var dataMap = [];
                personNetworkData.dataList.forEach(item => {
                  dataMap.push({
                    value: item.count,
                    name: item.name,
                    organizationId: item.organizationId,
                    employer: item.employer
                  });
                });

                let chart = document.getElementById("cooNetwork");
                chart.removeAttribute("_echarts_instance_");
                myChart = this.$echarts.init(chart);
                var nameVal = this.person_name;
                var name = nameVal.substr(0, nameVal.indexOf("："));

                var titleData = ``;
                titleData =
                  `<div><p class="FirstTitle">` +
                  `<span>` +
                  name +
                  `</span>` +
                  `与科研机构合作总频次为：<span>` +
                  personNetworkData.total +
                  `</span>` +
                  `</p><p class="promptTitle">最多可显示前100个机构的合作关系</p>` +
                  `<p class="promptTitle">点击关联边可以显示连接的两人的合作情况</p></div>`;
                this.textTitle = titleData;
                let option = {
                  tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                    orient: "vertical",
                    left: "left",
                    formatter: function(name) {
                      return name;
                    }
                  },
                  series: [
                    {
                      name: "合作机构",
                      type: "pie",
                      radius: "55%",
                      center: ["65%", "45%"],
                      data: dataMap,
                      label: {
                        formatter: function(params) {
                          if (params.data.employer == true) {
                            return params.data.name + "（本人所在机构）";
                          } else {
                            return params.data.name;
                          }
                        }
                      },
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                      }
                    }
                  ]
                };
                let maxOrg = "";
                let maxCooValue = 0;

                let categories = [];
                let data = [];
                personNetworkData.dataList.forEach(x => {
                  let row = new Object();
                  row.value = x.count;
                  row.name = x.name;
                  row.organizationId = x.organizationId;
                  data.push(row);
                  categories.push(row.name);
                  if (x.count > maxCooValue) {
                    maxCooValue = x.count;
                    maxOrg = x.name;
                  }
                });
                this.textDesc =
                  '<p class="FirstTitle"><span>' +
                  name +
                  "</span> 与 " +
                  "<span>" +
                  personNetworkData.dataList.length +
                  "</span> 个机构有合作关系。和机构 <span>" +
                  maxOrg +
                  "</span> 合作最为紧密，合作关系数量值为 <span>" +
                  maxCooValue +
                  "</span></p>";

                myChart.on("click", params => {
                  this.isCooperationList = true;
                  this.organizationId2 = params.data.organizationId;
                  this.markTabChange();
                });

                myChart.setOption(option);
              }
              if (personNetworkData.length <= 1) {
                this.$Message.info({
                    background: true,
                    content: '该指定科研人员无合作网络'
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
        personId: this.perId,
        organizationId: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "project"
      };
      this.$axios
        .post("/coop/personOrgDetail", this.$qs.stringify(data))
        .then(res => {
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
        personId: this.perId,
        organizationId: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "paper"
      };
      this.$axios
        .post("/coop/personOrgDetail", this.$qs.stringify(data))
        .then(res => {
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
        personId: this.perId,
        organizationId: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "patent"
      };
      this.$axios
        .post("/coop/personOrgDetail", this.$qs.stringify(data))
        .then(res => {
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
        personId: this.perId,
        organizationId: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "criterion"
      };
      this.$axios
        .post("/coop/personOrgDetail", this.$qs.stringify(data))
        .then(res => {
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
        personId: this.perId,
        organizationId: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "monograph"
      };
      this.$axios
        .post("/coop/personOrgDetail", this.$qs.stringify(data))
        .then(res => {
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
        personId: this.perId,
        organizationId: this.organizationId2,
        yearEnd: this.startDate,
        yearStart: this.endDate,
        limit: this.limit,
        skip: this.skip,
        type: "task"
      };
      this.$axios
        .post("/coop/personOrgDetail", this.$qs.stringify(data))
        .then(res => {
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
    #personLimit {
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
  margin-top: 80px;
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
  background-color: #39f;
  color: white;
  border-color: #39f;
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
.Example {
  line-height: 38px;
  font-size: 14px;
  margin-right: 30px;
  width: 100px;
  text-align: center;
  cursor: pointer;
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