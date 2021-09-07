<template>
  <div class="sc-details">
    <div class="con_div">
      <div class="title_div">
        <div class="tit_le_div">会议详情</div>
      </div>
      <div class="content_div">
        <div class="cont_div">
          <div class="headerName">
            <h3>{{conferenceInfoData.name}}</h3>
          </div>
          <div class="Introduction">{{conferenceInfoData.abbreviation}}</div>
          <div class="dataInfo">
            <p class="br">详细信息</p>
            <div class="list">
              <Row>
                <i-col span="8">
                  <label>会议开始时间</label>
                  <span>{{conferenceInfoData.date}}</span>
                </i-col>
                <i-col span="8">
                  <label>会议结束时间</label>
                  <span></span>
                </i-col>
                <i-col span="8">
                  <label>会议地点</label>
                  <span>{{conferenceInfoData.place1}}{{conferenceInfoData.place2}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label>是否连续会议</label>
                  <span>{{conferenceInfoData.isContinuousConference}}</span>
                </i-col>
                <i-col span="8">
                  <label>会议语言</label>
                  <span>{{conferenceInfoData.language}}</span>
                </i-col>
                <i-col span="8">
                  <label>会议届次</label>
                  <span>{{conferenceInfoData.session}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label>会议领域</label>
                  <span>{{conferenceInfoData.area}}</span>
                </i-col>
                <i-col span="8">
                  <label>会议主题</label>
                  <span>{{conferenceInfoData.subject}}</span>
                </i-col>
                <i-col span="8">
                  <label>主办单位</label>
                  <span>{{conferenceInfoData.organizer}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label>承办单位</label>
                  <span>{{conferenceInfoData.undertaker}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <label>合作单位</label>
                  <span>{{conferenceInfoData.coOrganizer}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <label>会议网址</label>
                  <span>{{conferenceInfoData.url}}</span>
                </i-col>
              </Row>
            </div>
          </div>
          <div class="sc-box">
            <p class="br">相关会议</p>
            <div class="sc-box-content">
                <RelatedPapers :data="conferencePaperData" />
            </div>
            <div class="sc-page">
              <span>检索到{{total}}篇</span>
              <Page
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
import RelatedPapers from "./modules/RelatedPapers";
export default {
  name: "conferencedetails",
  components: {
    RelatedPapers
  },
  data() {
    return {
      conferenceId: "",
      limit: 10,
      akit: 0,
      total:0,
      conferenceInfoData: [],
      conferencePaperData: []
    };
  },
  created() {
    this.conferenceId = this.$route.query.conferenceId;
  },
  mounted() {
    this.getconferenceInfo();
    this.getConferencePaper();
  },
  methods: {
    // 获取详细信息
    getconferenceInfo() {
      var id = this.conferenceId;
      this.$axios
        .get("/basic/conference", { params: { conferenceId: id } })
        .then(res => {
          if (res.data.code == 200) {
            this.conferenceInfoData = res.data.data.content;
          }
        });
    },
    getConferencePaper() {
      var id = this.conferenceId;
      var data = {
        conferenceId: id,
        limit: this.limit,
        skit: this.skit
      };
      this.$axios
        .post("/conference/paperList", this.$qs.stringify(data))
        .then(res => {
          this.conferencePaperData = res.data.data.content;
          this.total = res.data.count;
        });
    },
        // tab切换页数
    changePage(event) {
      this.offset = event - 1;
      this.getConferencePaper();
    },
    changeSizePage(event) {
      this.limit = event;
      this.getConferencePaper();
    },
  }
};
</script>

<style lang="scss" scope>
@import "../../../style/public.scss";
.Introduction {
    margin-left: 10px;
    text-indent: 2em;
    margin-bottom: 15px;
    font-size: 12px;
}

</style>