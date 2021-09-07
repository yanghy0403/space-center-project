<template>
  <div class="sc-details">
    <div class="con_div">
      <div class="title_div">
        <div class="tit_le_div">期刊详情</div>
      </div>
      <div class="content_div">
        <div class="cont_div">
          <div class="headerName">
            <h3>{{journalInfoData.name}}</h3>
          </div>
          <div class="dataInfo">
            <p class="br">详细信息</p>
            <div class="dataInfo_div">
              <div class="img_div">
                <img
                  :src="journalInfoData.titlePage ==''?'http://10.0.88.77/journal/中国法学.jpg':journalInfoData.titlePage"
                  alt
                />
              </div>
              <div class="list">
                <Row>
                  <i-col span="24">
                    <label>英文名称:</label>
                    <span>{{journalInfoData.englishName}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <label>主办机构:</label>
                    <span
                      class="organizationUrl"
                      v-for="(item,i) in journalInfoData.organization"
                      :key="i"
                      @click="setPathOrg(item.organizationName,'/organdetails',item.organizationId)"
                    >{{item.organizationName}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label class="sc-title-lbl">出版周期:</label>
                    <span class="sc-title-sp">{{journalInfoData.publishCycle}}</span>
                  </i-col>
                  <i-col span="12">
                    <label class="sc-title-lbl">科学领域:</label>
                    <span class="sc-title-sp"></span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label class="sc-title-lbl">CN:</label>
                    <span class="sc-title-sp">{{journalInfoData.cn}}</span>
                  </i-col>
                  <i-col span="12">
                    <label class="sc-title-lbl">ISSN:</label>
                    <span class="sc-title-sp">{{journalInfoData.issn}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label class="sc-title-lbl">语言:</label>
                    <span
                      class="sc-title-sp"
                    >{{journalInfoData.language == "chinese"?"中文":journalInfoData.language}}</span>
                  </i-col>
                  <i-col span="12">
                    <label class="sc-title-lbl">父刊:</label>
                    <span class="sc-title-sp">{{journalInfoData.parentJournal}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label class="sc-title-lbl">综合因子:</label>
                    <span class="sc-title-sp">{{fullImpact}}</span>
                  </i-col>
                  <i-col span="12">
                    <label class="sc-title-lbl">复合因子:</label>
                    <span class="sc-title-sp">{{complexImpact}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label class="sc-title-lbl">检索入口地址:</label>
                    <span class="sc-title-sp"></span>
                  </i-col>
                  <i-col span="12">
                    <label class="sc-title-lbl">期刊状态:</label>
                    <span class="sc-title-sp"></span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <label>网址:</label>
                    <span class="url" @click="jumpUrl(journalInfoData.url)">{{journalInfoData.url}}</span>
                  </i-col>
                </Row>
                <!-- <Row>
                  <i-col span="24">
                    <label>主编:</label>
                    <span></span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <label>副主编:</label>
                    <span></span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <label>高级主编:</label>
                    <span></span>
                  </i-col>
                </Row>-->
              </div>
            </div>
          </div>
          <div class="sc-box similarPaper">
            <p class="br">相关论文</p>
            <div class="sc-box-content">
              <RelatedPapers :loading="loading" :data="journalPaperData" />
            </div>
            <div class="sc-page" v-if="!loading">
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
</template>

<script>
// 相关论文
import RelatedPapers from "./modules/RelatedPapers";
export default {
  components: {
    RelatedPapers
  },
  data() {
    return {
      journalId: "",
      journalInfoData: [],
      limit: 10,
      skit: 0,
      total: 0,
      currentPage: 1,
      journalPaperData: [],
      fullImpact: "",
      complexImpact: "",
      loading: true
    };
  },
  created() {
    this.journalId = this.$route.query.journalId;
  },
  mounted() {
    this.getJournalInfo();
    this.getJournalPaperList();
  },
  methods: {
    // 期刊详细信息
    getJournalInfo() {
      var id = this.journalId;
      // var id = "af8ffa542a8746deab905e42ae0be50d";
      this.$axios
        .get("/basic/journal", { params: { journalId: id } })
        .then(res => {
          if (res.data.code == 200) {
            this.journalInfoData = res.data.data.content;
            this.fullImpact = this.journalInfoData.impactFactor.fullImpact;
            this.complexImpact = this.journalInfoData.impactFactor.complexImpact;
          }
        });
    },
    // 机构跳转
    setPathOrg(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      if (mark) {
        positionArr.push({
          pathName: "个人画像（" + name + "）",
          routerName: "/"
        });
      } else {
        positionArr.push({
          pathName: "机构画像（" + name + "）",
          routerName: "/"
        });
      }
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId: id } });
    },
    // 相关论文
    getJournalPaperList() {
      this.loading = true;
      var id = this.journalId;
      // var id = "af8ffa542a8746deab905e42ae0be50d";
      var data = {
        journalId: id,
        limit: this.limit,
        skit: this.skit
      };
      this.$axios
        .post("/journal/paperList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.journalPaperData = res.data.data.content;
            this.total = res.data.count;
          }
        });
    },
    // 分页
    changePage(event) {
      this.skit = event - 1;
      this.getJournalPaperList();
    },
    changeSizePage(event) {
      this.skit = event;
      this.getJournalPaperList();
    },
    // 网址跳转
    jumpUrl(e) {
      window.open(e);
    }
  }
};
</script>

<style lang="scss" scope>
// @import "../../../style/details.scss";
@import "../../../style/public.scss";
.con_div {
  width: 100%;
}
.similarPaper {
  margin-bottom: 50px;
}
.dataInfo_div {
  display: flex;
  .img_div {
    margin-left: 20px;
    img {
      width: 240px;
      height: 310px;
    }
  }
  .list {
    width: 100%;
    .url {
      color: #1843a3;
      cursor: pointer;
    }
    .organizationUrl {
      cursor: pointer;
    }
    .organizationUrl:hover {
      color: #1843a3;
      text-decoration: underline;
    }
  }
}
</style>