<template>
  <div class="sc-query">
    <div style="width:100%">
      <div class="hotmap">
        <div class="header">
          <p>关键词热度查询</p>
        </div>
        <div class="top">
          <label for="userval" style="font-size:16px;">热点词：</label>
          <input type="text" class="user-val" id="userval" v-model="search" placeholder="请输入查询热点词" />
          <p>
            <Button type="primary" @click.native="handlesearch">查询</Button>
            <Button @click="handlereset">重置</Button>
          </p>
        </div>
        <div class="menu">
          <p>
            <img src="../../../../assets/img/logo1.png" alt class="logo" />
            热点词最早出现的时间：
            <span>{{ paperinfo.firstYear ?(paperinfo.firstYear) + '年':"暂无数据"}}</span>
          </p>
          <p v-if="paperinfo.earliestPaper != undefined">
            <img src="../../../../assets/img/fabiaolunwen.png" countalt class="logo" />热点最早出现的论文：
            <span @click="handlepath(paperinfo.earliestPaper.paperId)">{{paperinfo.earliestPaper.paperName}}</span>
          </p>
          <p v-if="paperinfo.earliestPaper != undefined">
            <img src="../../../../assets/img/newImg.png" countalt class="logo" />热点最新论文年份：
            <span @click="handlepath(paperinfo.latestPaper.paperId)">{{paperinfo.latestPaper.paperName}}</span>
            <span style="margin-left:15px;">{{paperinfo.latestPaper.paperYear + '年'}}</span>
          </p>
          
          <p>
            <img src="../../../../assets/img/num.png" countalt class="logo" />热点近三年的文章数量：
            <span>{{paperinfo.count}}</span>
          </p>
        </div>
      </div>
      <div class="hot-content">
        <div class="hot-content1">
          <div>
            <div>
              <h3>
                <span>热点发文趋势</span>
                <div>
                  <span
                    class="time"
                    @click="handleyear('',0)"
                    :class="yearindex== 0 ? 'active':''"
                  >全部</span>
                  <span
                    class="time"
                    @click="handleyear(5,1)"
                    :class="yearindex== 1 ? 'active':''"
                  >5年</span>
                  <span
                    class="time"
                    @click="handleyear(10,2)"
                    :class="yearindex== 2 ? 'active':''"
                  >10年</span>
                </div>
              </h3>
              <div id="Hottrend" v-show="isHottrend"></div>
            </div>
            <!-- <div class="nodata" v-show="!isHottrend">暂无数据</div> -->
          </div>
          <div>
            <h3>
              <span>相关词</span>
              <div class="num">
                <span>关键词个数</span>
                <p>
                  <span
                    class="time"
                    @click="hanglechangenum(10,0)"
                    :class="keywordindex == 0 ? 'active':''"
                  >10</span>
                  <span
                    class="time"
                    @click="hanglechangenum(20,1)"
                    :class="keywordindex == 1 ? 'active':''"
                  >20</span>
                  <span
                    class="time"
                    @click="hanglechangenum(30,2)"
                    :class="keywordindex == 2 ? 'active':''"
                  >30</span>
                  <span
                    class="time"
                    @click="hanglechangenum(50,3)"
                    :class="keywordindex == 3 ? 'active':''"
                  >50</span>
                </p>
              </div>
            </h3>

            <div id="hotcurrent" v-show="ishotcurrent"></div>
            <!-- <div class="nodata" v-show="!ishotcurrent">暂无数据</div> -->
          </div>
        </div>
        <div class="hot-content2">
          <div style="position:relative">
            <h3>
              <span>热点研究机构分布</span>
            </h3>
            <div id="heightinstitutions" v-show="isheightinstitutions"></div>
            <!-- <div class="nodata" v-show="!isheightinstitutions">暂无数据</div> -->
            <p class="promptTitle hints">点击柱状图跳转相关详情</p>
          </div>
          <div style="position:relative">
            <h3>
              <span>热点研究人员分布</span>
            </h3>
            <div id="heightresearch" v-show="isheightresearch"></div>
            <p class="promptTitle hints">点击柱状图跳转相关详情</p>
            <!-- <div class="nodata" v-show="!isheightresearch">暂无数据</div> -->
          </div>
        </div>
      </div>
      <div class="foot foot-table">
        <Tabs type="card" :animated="false">
          <TabPane label="最近研究论文">
            <Table :columns="columns1" :data="latest">
              <template slot-scope="{ row }" slot="name">
                <span @click="handletodetails(row)" class="author title">{{ row.name }}</span>
              </template>
              <template slot-scope="{ row }" slot="author" >
                <span
                  v-for="(item,index) in row.author"
                  :key="index"
                  @click="handletodetail(item.personId)"
                  class="author"
                >{{ item.personName }}</span>
              </template>
              <template slot-scope="{ row }" slot="source" v-if="row.source != undefined">
                <span
                  @click="handletosource(row.source.journalId)"
                  class="author"
                >{{ row.source.journalName==''?'未知':row.source.journalName }}</span>
              </template>
              <template slot-scope="{ row }" slot="year">
                <span
                  @click="handletosource(row.source.journalId)"
                  class="author"
                >{{ row.year}} / {{row.issue}}</span>
              </template>
            </Table>
          </TabPane>
          <TabPane label="高被引论文">
            <Table :columns="columns2" :data="reference">
              <template slot-scope="{ row }" slot="name">
                <span @click="handletodetails(row)" class="author title">{{ row.name }}</span>
              </template>
              <template slot-scope="{ row }" slot="author">
                <span
                  v-for="(item,index) in row.author"
                  :key="index"
                  @click="handletodetail(item.personId)"
                  class="author"
                >{{ item.personName }}</span>
              </template>
              <template slot-scope="{ row }" slot="source">
                <span
                  @click="handletosource(row.source.journalId)"
                  class="author"
                >{{ row.source.journalName}}</span>
              </template>
              <template slot-scope="{ row }" slot="citation">
                <span>{{ row.citation}}</span>
              </template>
              <template slot-scope="{ row }" slot="year">
                <span>{{ row.year}} / {{row.issue}}</span>
              </template>
            </Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import Relation from "../../person/modules/Relation"; //人员关联网络
export default {
  name: "hotmap",
  data() {
    return {
      search: "航天器", //检索关键词
      year: 5, //用户想查看的年份
      yearindex: 1, //年份下标默认展示全部数据
      limit: 10, //默认展示10条数据
      limit1: 20, //热点共现图展示10条数据
      columns1: [
        {
          type: "index",
          title: "序号",
          align: "center",
          width: 60
        },
        {
          title: "题名",
          slot: "name",
          align: "left",
          width: 400
        },
        {
          title: "作者",
          slot: "author",
          align: "center"
        },
        {
          title: "来源",
          slot: "source",
          align: "center"
        },
        {
          title: "年/期",
          slot: "year",
          width: 130,
          align: "center"
        }
      ],
      columns2: [
        {
          type: "index",
          title: "序号",
          align: "center",
          width: 60
        },
        {
          title: "题名",
          slot: "name",
          align: "left",
          width: 400
        },
        {
          title: "作者",
          slot: "author",
          align: "center"
        },
        {
          title: "来源",
          slot: "source",
          align: "center"
        },
        {
          title: "被引频次",
          slot: "citation",
          align: "center",
          width: 110
        },
        {
          title: "年/期",
          slot: "year",
          width: 130,
          align: "center"
        }
      ],
      latest: [], //最新论文
      reference: [], //引用论文
      paperinfo: [], //论文出现的相关信息
      relationship: [], //热点共现关系图数据
      marks: true,
      ishotcurrent: true, //热点共现图是否有数据
      isHottrend: true, //热点趋势是否有数据
      isheightinstitutions: true, //高产机构图是否有数据
      isheightresearch: true, //高产人才图是否有数据
      keywordindex: 1, //关键词下标默认选中10个
      isexit: false //判断关键词是否在黑名单里面
    };
  },
  //   components:{Relation},
  methods: {
    //热点趋势图
    Hottrend() {
      // let keyword= this.search;
      let keyword = this.search;
      let poorYear = this.year;

      let url = `/keyword/keywordTendency`;
      var that = this;
      let myChart = that.$echarts.init(document.getElementById("Hottrend"));
      myChart.showLoading();
      that.$axios
        .post(url, this.$qs.stringify({ keyword: keyword, poorYear: poorYear }))
        .then(res => {
          console.log(res);
          let proportionData = res.data.data.content.proportionData;
          let valueData = res.data.data.content.valueData;
          let yearData = res.data.data.content.yearData;
          let refdata = res.data.data.content.refValueData;
          if (yearData.length == 0) {
            this.isHottrend = false;
          } else {
            this.isHottrend = true;
          }
          var uploadedDataURL =
            "https://gallerybox.echartsjs.com/asset/get/s/data-1547533200844-7eBMgp66l.png";
          let option = {
            // backgroundColor: '#FFF',
            grid: {
              top: "10%",
              bottom: "5%",
              left: "8%",
              right: "4%"
            },
            legend: {
              show: true,
              type: "scroll",
              data: ["发文量", "引文量"]
            },
            tooltip: {
              //  trigger: 'axis',
              formatter: function(params) {
                if (params.componentIndex == 0) {
                  return (
                    "<ul><li>" +
                    params.name +
                    "年</li>" +
                    "<li>当年量：" +
                    params.value +
                    "</li>" +
                    "<li>当年量所占总数据比率" +
                    proportionData[params.dataIndex] +
                    "</li>" +
                    "</ul>"
                  );
                } else if (params.componentIndex == 1) {
                  return (
                    "<ul><li>" +
                    params.name +
                    "年</li>" +
                    "<li>当年量：" +
                    params.value +
                    "</li>" +
                    "</ul>"
                  );
                }
              }
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: true, //默认，坐标轴留白策略
                axisLine: {
                  show: true
                },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false,
                  alignWithLabel: true
                },
                axisLabel: {
                  show: true
                },
                axisPointer: {
                  show: true
                },
                data: yearData
              },
              {
                type: "category",
                boundaryGap: true, //默认，坐标轴留白策略
                axisLine: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false,
                  alignWithLabel: true
                },
                axisLabel: {
                  show: false
                },
                axisPointer: {
                  show: false
                },
                data: yearData
              }
            ],
            yAxis: {
              type: "value",
              // axisLine: {
              // 	show: false
              // },
              splitLine: {
                show: false,
                lineStyle: {
                  type: "dashed",
                  color: "rgba(33,148,246,0.2)"
                }
              }
              // axisTick: {
              // 	show: false
              // },
              // splitArea: {
              // 	show: true,
              // 	areaStyle: {
              // 		color: 'rgb(245,250,254)'
              // 	}
              // }
            },
            series: [
              {
                type: "line",
                name: "发文量",
                symbol: "circle",
                //  xAxisIndex: 1,
                symbolSize: 7,
                lineStyle: {
                  color: "rgb(33,148,246)",
                  shadowBlur: 12,
                  shadowColor: "rgb(33,148,246,0.9)",
                  shadowOffsetX: 1,
                  shadowOffsetY: 1
                },
                itemStyle: {
                  color: "rgb(33,148,246)",
                  borderWidth: 1,
                  borderColor: "#FFF"
                },

                data: valueData
              },
              {
                type: "line",
                name: "引文量",
                symbol: "circle",
                symbolSize: 7,
                lineStyle: {
                  color: "orange",
                  shadowBlur: 12,
                  shadowColor: "rgb(33,148,246,0.9)",
                  shadowOffsetX: 1,
                  shadowOffsetY: 1
                },
                itemStyle: {
                  color: "orange",
                  borderWidth: 1,
                  borderColor: "#FFF"
                },

                data: refdata
              }
            ]
          };
          myChart.setOption(option, true);
          myChart.hideLoading();
        });
    },
    //热点共现关系图
    hotcurrent() {
      var myChart = this.$echarts.init(document.getElementById("hotcurrent"));
      myChart.showLoading();
      var keyword = this.search;
      var limit = this.limit1;
      var url = `/keyword/keywordCoCurrence`;
      this.$axios
        .post(url, this.$qs.stringify({ keyword: keyword, limit: limit }))
        .then(res => {
          var json = res.data.data.content;

          var nodes = json.nodes;
          var links = json.links;
          // console.log(nodes);
          if (nodes.length == 0) {
            this.ishotcurrent = false;
          } else {
            this.ishotcurrent = true;
          }

          var texts = [];
          // for (var i = 0; i < legend.length; i++) {
          // 	texts.push({
          // 		"name": legend[i]
          // 	})
          var nodes = nodes.map((item, index) => {
            if (index == 0) {
              return {
                draggable: true,
                name: item.name,
                symbolSize: 25,
                id: item.personId,
                itemStyle: {
                  normal: {
                    color: "#FFA500"
                  }
                }
              };
            } else {
              return {
                draggable: true,
                name: item.name,
                symbolSize: 25,
                id: item.personId,
                itemStyle: {
                  normal: {
                    color: "#2194F6"
                  }
                }
              };
            }
          });

          var links = links.map((item, index) => {
            if (item.intimacy >= 50) {
              return {
                source: item.source,
                target: item.target,
                value: 50,
                lineStyle: {
                  normal: {
                    width: 1,
                    color: "#2194F6"
                  }
                }
              };
            } else {
              return {
                source: item.source,
                target: item.target,
                value: item.intimacy,
                lineStyle: {
                  normal: {
                    width: 1,
                    color: "#2194F6"
                  }
                }
              };
            }
          });
          var option = {
            tooltip: {
              formatter: function(params) {
                if (params.dataType == "node") {
                  return params.name;
                } else if (params.dataType == "edge") {
                  return params.value;
                }
              }
            },

            legend: {
              // data: legend,
              textStyle: {
                color: "#000000"
              },
              show: false,
              icon: "circle",
              type: "scroll",
              orient: "vertical",
              left: 10,
              top: 20,
              bottom: 20,
              itemWidth: 10,
              itemHeight: 10
            },
            // animationDuration: 1000,
            // animationEasingUpdate: 'quinticInOut',
            animation: false,
            series: [
              {
                name: "知识图谱",
                type: "graph",
                layout: "force",
                data: nodes,
                links: links,
                // categories: texts,
                roam: true,
                zoom: 0.8,
                nodeScaleRatio: 0, //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
                focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                lineStyle: {
                  normal: {
                    opacity: 0.5,
                    width: 1.5,
                    curveness: 0
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: "inside",
                    textStyle: {
                      //标签的字体样式
                      color: "#515a6e", //字体颜色
                      fontWeight: "normal", //'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                      fontSize: "12" //字体大小
                    },
                    // formatter: function(params) {
                    // 	return params.data.showName //此处为label转换 并转换颜色
                    // },
                    fontSize: 18,
                    fontStyle: "600"
                  }
                },
                edgeLabel: {
                  normal: {
                    show: false,
                    textStyle: {
                      fontSize: 12
                    }
                    // formatter: "{c}"
                  }
                },
                force: {
                  repulsion: [50, 200],
                  edgeLength: [20, 180],
                  gravity: 0,
                  layoutAnimation: true
                }
              }
            ],
            color: [
              "#ff7f50",
              "#6dadd1",
              "#9765a8",
              "#91c7ae",
              "#772cdc",
              "#ff69b4",
              "#ba55d3",
              "#cd5c5c",
              "#ffa500",
              "#40e0d0",
              "#1e90ff",
              "#ff6347",
              "#7b68ee",
              "#00fa9a",
              "#ffd700",
              "#6b8e23",
              "#ff00ff",
              "#3cb371",
              "#b8860b",
              "#30e0e0"
            ] //自定义调色板
          };
          myChart.setOption(option, true);
          myChart.hideLoading();
        });
    },
    //高产机构图
    heightinstitutions() {
      var keyword = this.search;
      var limit = this.limit;
      var url = `/keyword/keywordProduceOrg`;
      var myChart = this.$echarts.init(
        document.getElementById("heightinstitutions")
      );
      myChart.showLoading();
      this.$axios
        .post(url, this.$qs.stringify({ keyword: keyword, limit: limit }))
        .then(res => {
          //   console.log('高产机构图')
          //console.log(res);
          var builderJson = res.data.data.content;
          var list = builderJson.charts;
          if (builderJson.charts.length == 0) {
            this.isheightinstitutions = false;
          } else {
            this.isheightinstitutions = true;
          }

          var keys = builderJson.charts.map(item => {
            return item.key;
          });
          var values = builderJson.charts.map(item => {
            return item.value;
          });

          var waterMarkText = "ECHARTS";

          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = canvas.height = 100;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.globalAlpha = 0.08;
          ctx.font = "20px Microsoft Yahei";
          ctx.translate(50, 50);
          ctx.rotate(-Math.PI / 4);
          ctx.fillText(waterMarkText, 0, 0);

          var option = {
            tooltip: {},

            grid: [
              {
                top: 40,
                // width: '100%',
                bottom: 20,
                left: 10,
                right: 20,
                containLabel: true
              }
            ],
            xAxis: [
              {
                type: "value",
                max: builderJson.all,
                splitLine: {
                  show: false
                }
              }
            ],
            yAxis: [
              {
                type: "category",
                inverse: true,
                data: keys,
                axisLabel: {
                  interval: 0,
                  rotate: 60
                },
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                type: "bar",
                stack: "chart",
                z: 3,
                label: {
                  normal: {
                    position: "inside",
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#3398DB"
                  }
                },
                data: values
              }
            ]
          };

          myChart.setOption(option);
          myChart.hideLoading();
          var that = this;
          myChart.on("click", function(params) {
            var index = params.dataIndex;

            var id = list[index].id;
            that.$router.push({
              path: "/organdetails",
              query: {
                orgId: id
              }
            });
          });
        });
    },
    //高产人才图
    heightresearch() {
      var keyword = this.search;
      var limit = this.limit;
      var url = `/keyword/keywordProducePerson`;
      var myChart = this.$echarts.init(
        document.getElementById("heightresearch")
      );
      myChart.showLoading();
      this.$axios
        .post(url, this.$qs.stringify({ keyword: keyword, limit: limit }))
        .then(res => {
          // console.log('rencai');

          //   console.log(res);
          var builderJson = res.data.data.content;
          if (builderJson.charts.length == 0) {
            this.isheightinstitutions = false;
          } else {
            this.isheightinstitutions = true;
          }
          var list = builderJson.charts;
          var keys = builderJson.charts.map(item => {
            return item.key;
          });
          var values = builderJson.charts.map(item => {
            return item.value;
          });

          var waterMarkText = "ECHARTS";

          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = canvas.height = 100;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.globalAlpha = 0.08;
          ctx.font = "20px Microsoft Yahei";
          ctx.translate(50, 50);
          ctx.rotate(-Math.PI / 4);
          ctx.fillText(waterMarkText, 0, 0);

          var option = {
            // title:{
            // 	text:'热点研究人员分布',
            // 	left:30,
            // 	top:0
            // },
            tooltip: {},

            grid: [
              {
                top: 40,
                width: "100%",
                bottom: 20,
                left: 10,
                containLabel: true
              }
            ],
            xAxis: [
              {
                type: "value",
                max: builderJson.all,
                splitLine: {
                  show: false
                }
              }
            ],
            yAxis: [
              {
                type: "category",
                inverse: true,
                data: keys,
                axisLabel: {
                  interval: 0,
                  rotate: 0
                },
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                type: "bar",
                stack: "chart",
                z: 3,
                label: {
                  normal: {
                    position: "right",
                    show: true
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: "inside"
                  }
                },
                data: values
              }
            ]
          };

          myChart.setOption(option);
          myChart.hideLoading();
          var that = this;
          myChart.on("click", function(params) {
            var index = params.dataIndex;

            var id = list[index].id;
            that.$router.push({
              path: "/persondetails",
              query: {
                personId: id
              }
            });
          });
        });
    },
    //点击查询
    handlesearch() {
      var url = `/keyword/isExisting?keyword=${this.search}`;
      this.$axios.get(url).then(res => {
        if (res.data.code == "200") {
          this.isexit = res.data.data.content;

          if (this.isexit == false) {
            this.handleyear(5, 1);
            this.heightinstitutions();
            this.heightresearch();
            this.relevantpapers();
            this.lastpaperinfo();
            this.hotcurrent();
          } else {
            this.$Modal.warning({
              title: "信息提醒",
              content: "<p>您搜索的关键词属于敏感词汇,无该词的相关数据</p>"
            });
          }
        }
      });
    },
    //重置功能
    handlereset() {
      this.search = "";
    },
    //选择年份查看相关数据默认显示全部
    handleyear(val, index) {
      this.yearindex = index;
      if (val == "") {
        this.year = "";
      } else if (val == 5) {
        this.year = 5;
      } else if (val == 10) {
        this.year = 10;
      }
      this.Hottrend();
    },
    //相关论文
    relevantpapers() {
      var keyword = this.search;
      var url = `/keyword/keywordPaper`;
      this.$axios
        .post(url, this.$qs.stringify({ keyword: keyword }))
        .then(res => {
          //    console.log('先关论文')
          // 	 console.log(res)
          var reference = res.data.data.content.reference;
          var latest = res.data.data.content.latest;

          //console.log(reference)
          this.reference = reference;
          this.latest = latest;
        });
    },
    //论文最早出现相关信息
    lastpaperinfo() {
      let keyword = this.search;
      let url = `/keyword/keywordFirstDiscovery`;
      this.$axios
        .post(url, this.$qs.stringify({ keyword: keyword }))
        .then(res => {
          //    console.log(res);
          if (res.data.code == 200) {
            this.paperinfo = res.data.data.content;
          }
        });
    },
    //点击论文跳转相关论文详情页
    handlepath(id) {
      this.$router.push({ path: "/paperdetails", query: { paperId: id } });
    },
    //点击表格中的人名跳转人员详情页
    handletodetail(id) {
      console.log(id);
      this.$router.push({
        path: "/persondetails",
        query: { personId: id }
      });
    },
    //点击表格中的人名跳转人员详情页
    handletodetails(row) {
      this.$router.push({
        path: "/paperdetails",
        query: { paperId: row.paperId }
      });
    },
    //跳转来源
    handletosource(id) {
      this.$router.push({
        path: "/journaldetails",
        query: {
          journalId: id
        }
      });
    },
    //选择显示关键词个数
    hanglechangenum(val, index) {
      this.keywordindex = index;
      this.limit1 = val;
      this.hotcurrent();
    }
  },
  mounted() {
    if (this.$route.query.pathkeyword) {
      this.search = this.$route.query.pathkeyword;
    } else {
      this.search = "航天器";
    }

    this.handlesearch();
    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
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
<style lang="scss" >
#hotcurrent {
  .MyRelation {
    height: 500px;
  }
}
.foot-table .ivu-table-row td:nth-child(1) span {
  color: #515a6e !important;
  display: inline !important;
}
.hints {
  position: absolute;
  top: 54px;
  right: 10px;
  color: #bbc3bf;
}
</style>
<style scoped lang="scss">
.hotmap {
  width: 100%;
  background: #fff;
}
.top {
  height: 100px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  .user-val {
    margin-right: 120px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 415px;
    height: 36px;
    padding-left: 10px;
  }
  p {
    button {
      margin-right: 20px;
    }
  }
}
.menu {
  height: 135px;
  p {
    color: #1d5fa5;
    height: 30px;
    line-height: 30px;
    margin: 5px 0;

    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  span {
    text-decoration: underline;
    color: #5e5ebd;
    cursor: pointer;
  }
}
.hot-content {
  margin-top: 20px;

  .hot-content1 {
    display: flex;
    justify-content: space-between;
    > div {
      width: 49%;
      background: #fff;
      padding-top: 10px;
      h3 {
        border-bottom: 1px solid #ddd;
      }
    }
    #Hottrend {
      width: 100%;
      height: 500px;
      margin-top: 20px;
    }
    #hotcurrent {
      width: 100%;
      height: 500px;
      margin-top: 20px;
      .MyRelation {
        height: 500px;
      }
    }
    .time {
      border: 1px solid #728ca8;
      padding: 0px 5px;
      border-radius: 5px;
      margin: 0 5px;
      display: inline-block;
      cursor: pointer;
      font-size: 12px;
    }
    .first {
      padding-left: 5px;
    }
    .active {
      background: #2d8cf0;
      color: #fff;
    }
  }
  .hot-content2 {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    > div {
      width: 49%;
      background: #fff;
      padding-top: 10px;
      h3 {
        border-bottom: 1px solid #ddd;
      }
    }
    #heightinstitutions {
      width: 100%;
      height: 500px;
    }
    #heightresearch {
      width: 100%;
      height: 500px;
    }
  }
}
.foot {
  margin-top: 20px;
  background: #fff;
  width: 100%;
}
.nodata {
  height: 200px;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: 1px solid #ddd;
}
h3 {
  padding-left: 22px;
  padding-bottom: 15px;
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
.logo {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.num {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  p {
    margin-left: 9px;
  }
}
.header {
  border-bottom: 2px solid #ddd;
  p {
    line-height: 40px;
    padding: 10px 30px;
    font-size: 18px;
  }
}
h3 {
  padding-bottom: 10px;
}
.author {
  padding-right: 5px;
  cursor: pointer;
}
.title {
  color: #2d8cf0;
}
.author:hover {
  color: #2d8cf0;
  text-decoration: underline;
}
</style>