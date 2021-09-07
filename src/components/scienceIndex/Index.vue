<template>
  <div class="sc-index">
    <div class="sc-index-top">
      <div class="sc-warp">
        <div class="sc-left">
          <div class="sc-input">
            <Input search placeholder="请您输入要查找人才姓名..." v-model="searchperson" />
            <div class="select-list" v-show="selectname">
              <div class="ivu-poptip-inner scrollbar">
                <ul v-if="result.length!==0" class="resultdata">
                  <li
                    class="ivu-poptip-body"
                    v-for="(item,k) in result"
                    :key="k+'x'"
                    @click="handleClickQuery(item)"
                  >
                    <p
                      class="ivu-poptip-body-content-inner searchname"
                    >{{item.name}}--{{item.organization}}</p>
                  </li>
                </ul>
                <ul v-else>
                  <span class="ivu-poptip-body-content-inner">暂无匹配数据</span>
                </ul>
              </div>
            </div>
          </div>
          <h3>人才信息</h3>
          <div class="sc-left-content">
            <ul>
              <li>
                <i></i>
                <p>
                  姓名：
                  <span
                    class="name"
                    @click="handletodetail(personinfo.personId)"
                    style="cursor: pointer;"
                  >{{personinfo.name}}</span>
                </p>
              </li>
              <li style="display:flex;just-content:space-between;align-item:flex-start">
                <i></i>
                <p>
                  <span>机构：</span>
                  <span
                    v-for="(item,i) in personinfo.org"
                    :key="i"
                    @click="handleorgdetail(item.organizationId)"
                    style="cursor: pointer;"
                  >{{item.organizationName}}</span>
                </p>
              </li>
              <li>
                <i></i>
                <p>
                  <span>影响力：{{personinfo.influence}}</span>
                </p>
              </li>
              <li v-show="personinfo.project">
                <span class="span_title">项目与成果列表</span>
                <ol>
                  <li v-for="(item,i) in personinfo.project" :key="i+'p'">
                    <span
                      @click="handledetail(item.projectId,'project')"
                    >{{item.name.substring(0,12)}}...【项目】</span>
                  </li>
                  <li v-for="(item,i) in personinfo.paper" :key="i+'a'" v-show="i<7">
                    <!-- <span v-if="item.name.length<12">{{item.name}}【论文】</span> -->
                    <span
                      @click="handledetail(item.paperId,'paper')"
                    >{{item.name.substring(0,12)}}...【论文】</span>
                  </li>
                  <li v-for="(item,i) in personinfo.monograph" :key="i+'m'">
                    <span
                      v-if="item.name.length<12"
                      @click="handledetail(item.monographId,'monograph')"
                    >{{item.name}}【专著】</span>
                    <span
                      v-if="item.name.length>=12"
                      @click="handledetail(item.monographId,'monograph')"
                    >{{item.name.substring(0,12)}}【专著】</span>
                  </li>
                  <li v-for="(item,i) in personinfo.patent" :key="i+'t'">
                    <span
                      v-if="item.name.length<12"
                      @click="handledetail(item.patentId,'patent')"
                    >{{item.name}}【专利】</span>
                    <span
                      v-if="item.name.length>=12"
                      @click="handledetail(item.patentId,'patent')"
                    >{{item.name.substring(0,12)}}...【专利】</span>
                  </li>
                </ol>
              </li>
              <!-- <li>
                    <span class="span_title">成果列表</span>
              <div>-->
              <!-- 论文 -->

              <!-- 标准 -->
              <!-- <ol>
                           <li v-for="(item,i) in personinfo.criterion" :key="i">
                              <span v-if="item.name.length<12" @click="handledetail(item.criterionId,'criterion')">{{item.name}}【标准】</span>
                              <span v-if="item.name.length>=12" @click="handledetail(item.criterionId,'criterion')">{{item.name.substring(0,12)}}...【标准】</span>
                            </li>
                    </ol>
                     </div>
              </li>-->
            </ul>
          </div>
        </div>
        <div class="sc-right" style="height: 650px;">
          <div v-show="!loading">
            <IndexGraph :data="graphdata" @sendpersonId="getpersonId" />
          </div>
          <div class="demo-spin-col" v-show="loading">
            <Spin fix>
              <Icon type="ios-loading" size="26" class="demo-spin-icon-load"></Icon>
              <div>加载中</div>
            </Spin>
          </div>
        </div>
      </div>
      <div class="sc-warp-bottom">
        <ol>
          <li>
            <!-- <i></i> -->
            <img style="width: 60px;height: 60px;" src="../../assets/images/领域人才.png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.person}}</span>
              </p>
              <span>领域人才</span>
            </div>
          </li>
          <li>
            <img src="../../assets/img/icon1/jigou.png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.org}}</span>
              </p>
              <span>领域机构</span>
            </div>
          </li>
          <li>
            <img src="../../assets/img/icon1/xiangmu.png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.project}}</span>
              </p>
              <span>科研项目</span>
            </div>
          </li>
          <li>
            <img src="../../assets/images/科研项目.png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.paperCn}}</span>
              </p>
              <span>国内发表论文</span>
            </div>
          </li>
          <li>
            <img src="../../assets/img/icon1/lunwentimu.png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.paperEn}}</span>
              </p>
              <span>国际发表论文</span>
            </div>
          </li>
          <li>
            <img src="../../assets/img/icon1/zhuanli_1.png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.patent}}</span>
              </p>
              <span>发明专利</span>
            </div>
          </li>
          <li>
            <img src="../../assets/img/icon1/biaozhun.png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.criterion}}</span>
              </p>
              <span>国内标准</span>
            </div>
          </li>
          <li>
            <img src="../../assets/images/专著 (2).png" alt class="logo" />
            <div>
              <p>
                <span>{{arr.monograph}}</span>
              </p>
              <span>专著</span>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <div class="sc-warp-bottom-list">
      <ul>
        <li>
          <div class="sc-top">
            <img src="../../assets/img/icon/wangluo.png" alt="合作网络" class="icon" />
            <h2>合作网络</h2>
          </div>
          <div class="sc-bottom">
            <p>基于人才、成果、项目等数据的关系进行人员和机构之间的合作网络</p>
            <div>
              <!-- <a href='cooperationNetworkIndex'>人员合作网络</a> -->
              <router-link tag="a" to="cooperationNetworkIndex">科研人员合作网络</router-link>
              <router-link tag="a" to="cooOrgNetworkIndex">领域机构合作网络</router-link>
              <router-link tag="a" to="cooOrgRelationIndex">人员机构合作网络</router-link>
            </div>
          </div>
        </li>
        <li>
          <div class="sc-top">
            <img src="../../assets/img/icon/lujingfenxi.png" alt="关联路径" class="icon" />
            <h2>关联路径</h2>
          </div>
          <div class="sc-bottom">
            <p>基于指定人才或者机构之间的项目、成果等进行路径的发现和关联</p>
            <div>
              <router-link tag="a" to="associatedpathIndex">人员关联路径</router-link>
              <router-link tag="a" to="AssociatedpathDetails">机构关联路径</router-link>
            </div>
          </div>
        </li>
        <li>
          <div class="sc-top">
            <img src="../../assets/img/icon/shequ.png" alt="科研社区" class="icon" />
            <h2>科研社区</h2>
          </div>
          <div class="sc-bottom">
            <p>基于合作关系紧密程度发现典型合作社区，基于研究方向相似性发现典型相似社区</p>
            <div>
              <router-link tag="a" to="collaborate">人才紧密合作社区</router-link>
              <router-link tag="a" to="similar">研究兴趣相似社区</router-link>
            </div>
          </div>
        </li>
        <li>
          <div class="sc-top">
            <img src="../../assets/img/icon/redian.png" alt="研究热点" class="icon" />
            <h2>研究热点</h2>
          </div>
          <div class="sc-bottom">
            <p>对热词概况及发展趋势进行分析，并对领域内研究热点做出预测</p>
            <div>
              <router-link tag="a" to="Hotmap">关键词热度查询</router-link>
              <router-link tag="a" to="hottrend">高频热词共现图谱</router-link>
              <router-link tag="a" to="hotcluster">热点主题趋势图谱</router-link>
              <router-link tag="a" to="hotatlas">领域热点发展趋势</router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="sc-h">
      <h2>高影响力人员</h2>

      <router-link tag="a" to="person">--更多--</router-link>
    </div>
    <div class="sc-type-warp">
      <div class="sc-type-inner">
        <div class="sc-inner-list" v-for="(item,index) in highimpact" :key="index">
          <div class="sc-bottom">
            <img :src="item.picture" alt />
            <div>
              <p>
                <a @click.stop="handletodetail(item.id)">{{item.name}}</a>
                <span>影响力:{{Math.round(item.influence)}}</span>
              </p>
              <div style="display:flex;">
                <p style="width:42px;">
                  <span style="white-space: nowrap;">机构：</span>
                </p>
                <p
                  v-for="(list,index) in item.currentOrganization"
                  :key="index"
                >{{list.organizationName}}</p>
              </div>
              <p>
                职称：
                <span v-for="(list,i) in item.currentTitle" :key="i">{{list.title}}</span>
              </p>
              <p>
                <span>论文数量：{{item.total}}</span>
              </p>
              <!-- <span> <span>影响力:{{item.influence}}</span></p> -->
              <p style="height:48px;overflow:hidden;">
                研究方向:
                <span v-for="(list,i) in item.subject" :key="i">{{list.rankName}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sc-h">
      <h2>高影响力机构</h2>
      <router-link tag="a" to="organ">--更多--</router-link>
    </div>
    <div class="sc-type-warp">
      <div class="sc-type-inner sc-org">
        <div class="row" v-for="(item,index) in heightorg" :key="index">
          <img :src="item.picture" alt />
          <div class="col-xs">
            <p>
              <a @click.stop="handleorgdetail(item.id)">{{item.name}}</a>
            </p>
            <p>
              <span>影响力分数：{{Math.round(item.influence)}}</span>
              <span>发文数：{{item.total}}</span>
              <span>被引数：{{item.referenceNum}}</span>
              <!-- <span>专利数：{{item.patentNum}}</span> -->
            </p>
            <p>
              <i class="fa fa-map-marker"></i>
              &nbsp;&nbsp;{{item.address}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="sc-h">
      <h2>重大空间科学任务</h2>
    </div>
    <div class="sc-team-warp sc-Influence-warp">
      <div class="sc-team-inner sc-Influence-inner">
        <div>
          <span style="display: block; font-size: 16px;font-weight: bold">空间科学战略性先导科技专项（一期）</span>
          <p>
            <span style="display: block;">首席科学家:常进,胡文瑞,潘建伟,李惕碚</span>
            <span style="display: block;">承担单位:中国科学院国家空间科学中心</span>
          </p>
        </div>
        <div style="margin-left:120px;">
          <span style="display: block; font-size: 16px;font-weight: bold">空间科学战略性先导科技专项（二期）</span>
          <p>
            <span style="display: block;">首席科学家:袁为民,甘为群,王赤</span>
            <span style="display: block;">承担单位:中国科学院国家空间科学中心</span>
          </p>
        </div>

        <div>
          <span style="display: block; font-size: 16px;font-weight: bold">中国月球探测工程（探月工程）</span>
          <p>
            <span style="display: block;">首席科学家:欧阳自远</span>
            <span style="display: block;">承担单位:国家航天局</span>
          </p>
        </div>
        <div style="margin-left:120px;">
          <span style="display: block; font-size: 16px;font-weight: bold">东半球空间环境地基综合监测子午链（一期）</span>
          <p>
            <span style="display: block;">首席科学家:吴季</span>
            <span style="display: block;">承担单位:中国科学院</span>
          </p>
        </div>

        <div>
          <span style="display: block; font-size: 16px;font-weight: bold">东半球空间环境地基综合监测子午链（二期）</span>
          <p>
            <span style="display: block;">首席科学家:吴季</span>
            <span style="display: block;">承担单位:中国科学院</span>
          </p>
        </div>
        <div style="margin-left:120px;">
          <span style="display: block; font-size: 16px;font-weight: bold">国际子午圈大科学计划</span>
          <p>
            <span style="display: block;">首席科学家:王赤</span>
            <span style="display: block;">承担单位:中国科学院国家空间科学中心</span>
          </p>
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
import IndexGraph from "./public/IndexGraph";

export default {
  name: "sc-index",
  data() {
    return {
      arr: {}, //各种数据的综合
      highimpact: [], //高影响力
      limit: 6, //默认展示10个高影响力人员
      limit1: 10, //默认展示10个高影响力机构
      heightorg: [], //高影响力机构
      limit2: 10, //重大科研任务展示个数
      researchtask: [], //重大科研任务
      searchperson: "", //搜索的人名
      mark: false, //控制搜索框内容变化后再请求数据
      result: [], //实时检索出来的人员名单
      graphdata: [], //关系图数据
      user: {}, //查询的人的相关信息
      selectname: false, //控制推荐人员列表的显示与隐藏
      loading: true, //记载状态
      personinfo: {}, //大图左侧的相关人员信息
      detailId: "" //左侧大图点击的的人的id
    };
  },
  components: {
    IndexGraph
  },
  created() {
    this.$store.commit("setPositionIsShow", false);
  },
  mounted() {
    this.getmaplist();
    this.getheightimpact();
    this.getheightorg();
    this.getresearchtask();
    this.getrandomdata();
    this.getpersoninfo();
  },
  watch: {
    searchperson() {
      delay(() => {
        if (!this.mark) {
          if (this.searchperson != "") {
            this.selectname = true;
            this.ferchData(this.searchperson);
          }
        }
        this.mark = false;
      }, 300);
    }
  },
  methods: {
    //实时根据输入推荐机构名称
    async ferchData(val, str) {
      this.$axios.get("/manage/personName?name=" + val).then(res => {
        this.result = res.data.data.content;
      });
    },
    //点击人员列表
    handleClickQuery(val) {
      this.mark = true;
      this.user = val;
      this.searchperson = val.name;
      this.selectname = false;
      this.loading = true;
      this.detailId = val.personId;
      var that = this;

      setTimeout(function() {
        that.getpersoninfo();
        that.getgraphdata();
      }, 1000);
    },
    //路由跳转
    handleRouter(path) {
      this.$router.push({
        path,
        query: { personId: "af1132a293254addb6ef58adb36c68fa" }
      });
    },
    //获取各种数据数量
    getmaplist() {
      this.$axios.get("/home/fourCount").then(res => {
        this.arr = res.data.data.content;
      });
    },
    //获取高影响力人员
    getheightimpact() {
      var limit = this.limit;
      var url = `/home/topPerson?limit=${limit}`;
      this.$axios.get(url).then(res => {
        this.highimpact = res.data.data.content;
      });
    },
    //获取高影响力机构
    getheightorg() {
      var limit = this.limit1;
      var url = `/home/topOrg?limit=${limit}`;
      this.$axios.get(url).then(res => {
        this.heightorg = res.data.data.content;
      });
    },
    //重大科研任务
    getresearchtask() {
      var limit = this.limit2;
      var url = `/home/topTask?limit=${limit}`;
      this.$axios.get(url).then(res => {
        // console.log(res);
        this.researchtask = res.data.data.content;
      });
    },
    //获取首页大图数据
    getgraphdata() {
      var personId = this.user.personId;
      var url = `/home/staffLevel?personId=${personId}`;
      this.$axios.get(url).then(res => {
        if (res.data.code == "200") {
          // this.$Message.success({
          //   background: true,
          //   content: "数据加载完成",
          //   duration: 3
          // });
          this.loading = false;
          this.graphdata = res.data.data.content;
        } else if (res.data.code == "500") {
          this.$Message.error({
            background: true,
            content: res.data.message
          });
        }
      });
    },
    //随机获取默认静态数据
    getrandomdata() {
      this.$axios.get("/home/peopleDig").then(res => {
        if (res.data.code == "200") {
          this.loading = false;
          this.graphdata = res.data.data.content;
        }
      });
    },
    //获取首页大图左侧的相关人员信息
    getpersoninfo() {
      var id = this.detailId;
      var url = `/home/personDetails?personId=${id}`;
      this.$axios.get(url).then(res => {
        if (res.data.code == "200") {
          // this.$Message.success({
          //   background: true,
          //   content: "数据请求成功"
          // });
          this.personinfo = res.data.data.content;
        }
        if(res.data.code == 500) {
          this.$Message.success({
            background: true,
            content: res.data.message
          });
        }
      });
    },
    //接受子组件传过来的id
    getpersonId(id) {
      this.detailId = id;

      this.getpersoninfo();
    },
    //点击高影响力人员跳转人员详情
    handletodetail(id) {
      this.$router.push({
        path: "persondetails",
        query: {
          personId: id
        }
      });
    },
    //点击高影响力机构跳转机构详情
    handleorgdetail(id) {
      console.log(id);
      this.$router.push({
        path: "organdetails",
        query: {
          orgId: id
        }
      });
    },
    //点击相关数据跳转详情
    handledetail(id, str) {
      if (str == "project") {
        this.$router.push({
          path: "projectdetails",
          query: {
            projectId: id
          }
        });
      } else if (str == "paper") {
        this.$router.push({
          path: "paperdetails",
          query: {
            paperId: id
          }
        });
      } else if (str == "patent") {
        this.$router.push({
          path: "patentdetails",
          query: {
            patentId: id
          }
        });
      } else if (str == "criterion") {
        this.$router.push({
          path: "criteriondetails",
          query: {
            criterionId: id
          }
        });
      } else if (str == "monograph") {
        this.$router.push({
          path: "monographdetails",
          query: {
            monographId: id
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
ol {
  margin-left: 36px;
  li {
    p {
      padding-left: 4px;
      color: #ddd;
    }
  }
}
.logo {
  display: inline-block;
  width: 42px;
  height: 42px;
}
.minilogo {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.icon {
  display: inline-block;
  width: 60px;
  height: 60px;
}
.searchname {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sc-input {
  position: relative;
}
.select-list {
  position: absolute;
  top: 32px;
  left: 0;
  width: 300px;
  height: 240px;
  overflow-y: auto;
  z-index: 100;
  li {
    cursor: pointer;
  }
}
.indexGraph #MyIndexGraph {
  background: rgba(255, 255, 255, 0.5) !important;
}
.sc-right .ivu-spin-fix {
  background: rgba(0, 0, 0, 0.2);
}
@import "../../style/seconIndex.scss";
</style>

