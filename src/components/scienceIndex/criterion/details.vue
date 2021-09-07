<template>
  <div class="sc-details">
    <div class="con_div">
      <div class="title_div">
        <div class="tit_le_div">标准详情</div>
      </div>
      <div class="content_div">
        <div class="cont_div">
          <div class="headerName">
            <h3>{{criterionInfoData.name}}</h3>
          </div>
          <div class="dataInfo">
            <p class="br">详细信息</p>
            <div class="list">
              <Row>
                <i-col span="24">
                  <label class="sc-title-lbl3">英文标准名称:</label>
                  <span>{{criterionInfoData.englishTitle}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <label>学科领域:</label>
                  <span>{{criterionInfoData.subject}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <label class="sc-title-lbl3">标准状态:</label>
                  <span>{{criterionInfoData.state}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label class="sc-title-lbl3">标准类型:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.criterionType}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">标准号:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.criterionNo}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">实施日期:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.implementDate}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label class="sc-title-lbl3">发布日期:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.publishDate}}</span>
                </i-col>
                <i-col span="8">
                  <label>中国标准分类号:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.chineseCode}}</span>
                </i-col>
                <i-col span="8">
                  <label>国际标准分类号:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.internationalCode}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label class="sc-title-lbl3">国军标分类号:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.militaryCode}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">语种:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.language == "chinese||cn"?'中文':criterionInfoData.language}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">主管部门:</label>
                  <span class="sc-title-sp3">{{chargeOrg}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8" v-if="criterionInfoData.centralizedOrg != undefined">
                  <label class="sc-title-lbl3">归口单位:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.centralizedOrg.organizationName}}</span>
                </i-col>
                <i-col span="8" v-if="criterionInfoData.publishOrg!= undefined">
                  <label class="sc-title-lbl3">发布机构:</label>
                  <span class="sc-title-sp3">{{criterionInfoData.publishOrg.organizationName}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <label>起草人:</label>
                  <span class="author">{{criterionInfoData.author}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <label>起草单位:</label>
                  <span
                    class="draftOrg"
                    v-for="item in criterionInfoData.draftOrg"
                    :key="item.organizationId"
                  >{{item.organizationName}}</span>
                </i-col>
              </Row>
            </div>
          </div>
          <div class="sc-box">
            <p class="br">摘要</p>
            <div class="sc-box-content">
              <p>{{criterionInfoData.abstracts == ''?'暂无数据':criterionInfoData.abstracts}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "patentDetails",
  data: () => ({
    criterionId: "", // 专利id
    criterionInfoData: [], //获取专利详情
    centralizedOrg: [],
    publishOrg: [],
    chargeOrg: ""
  }),
  created() {},
  mounted() {
    this.criterionId = this.$route.query.criterionId;
    this.getpatentInfo();
  },
  methods: {
    // 获取专利详情
    getpatentInfo() {
      var id = this.criterionId;
      this.$axios
        .get("/basic/criterion", { params: { criterionId: id } })
        .then(res => {
          this.criterionInfoData = res.data.data.content;
          this.chargeOrg = this.criterionInfoData.chargeOrg.organizationName;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/public.scss";
.list {
  width: 100%;
}

.author,
.draftOrg {
  color: #1843a3;
  cursor: pointer;
}

.sc-box-content {
  height: 200px;
  margin-left: 30px;
}
</style>