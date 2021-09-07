<template>
  <div class="sc-details">
    <div class="con_div">
      <div class="title_div">
        <div class="tit_le_div">专著详情</div>
      </div>
      <div class="content_div">
        <div class="cont_div">
          <div class="headerName">
            <h3>{{monographData.name}}</h3>
          </div>
          <div class="dataInfo">
            <p class="br">详细信息</p>
            <div class="dataInfo_div">
              <!-- <div class="img_div">
                <img src="../../../assets/images/getimg.jpg" alt />
              </div>-->
              <div class="list">
                <Row>
                  <i-col span="24">
                    <label>作者</label>
                    <span
                      class="authorName"
                      v-for="(item,index) in monographData.author"
                      :key="index"
                      @click="authorSetPath(item.personName,'/persondetails',item.personId)"
                    >{{item.personName}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <label>作者机构</label>
                    <span
                      class="organizationAuthor"
                      v-for="(item,index) in monographData.organizationAuthor"
                      :key="index + 1"
                      @click="organSetpath(item.organizationName,'/organdetails',item.organizationId)"
                    >{{item.organizationName}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="8">
                    <label class="sc-title-lbl3">语言</label>
                    <span
                      class="sc-title-sp3"
                    >{{monographData.language == "chinese"?"中文":monographData.language}}</span>
                  </i-col>
                  <i-col span="8">
                    <label class="sc-title-lbl3">DOI</label>
                    <span class="sc-title-sp3">{{monographData.doi}}</span>
                  </i-col>

                  <i-col span="8">
                    <label class="sc-title-lbl3">领域</label>
                    <span class="sc-title-sp3">{{monographData.area}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="8">
                    <label class="sc-title-lbl3">编辑</label>
                    <span class="sc-title-sp3">{{monographData.editor}}</span>
                  </i-col>
                  <i-col span="8">
                    <label class="sc-title-lbl3">ISBN</label>
                    <span class="sc-title-sp3">{{monographData.isbn}}</span>
                  </i-col>
                  <i-col span="8">
                    <label class="sc-title-lbl3">字数</label>
                    <span class="sc-title-sp3">{{monographData.wordCount}}</span>
                  </i-col>
                </Row>

                <Row>
                  <i-col span="8">
                    <label class="sc-title-lbl3">出版时间</label>
                    <span class="sc-title-sp3">{{monographData.year}}</span>
                  </i-col>
                  <i-col span="8">
                    <label class="sc-title-lbl3">出版社</label>
                    <span class="sc-title-sp3">{{monographData.publisher}}</span>
                  </i-col>

                  <i-col span="8">
                    <label>发表刊物会议</label>
                    <span class="sc-title-sp3">{{monographData.conference}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="8">
                    <label>发表刊物学会</label>
                    <span class="sc-title-sp3">{{monographData.learn}}</span>
                  </i-col>
                  <i-col span="8">
                    <label class="sc-title-lbl3">出版社URL</label>
                    <span class="sc-title-sp3">{{monographData.publisherHref}}</span>
                  </i-col>
                  <i-col span="8">
                    <label class="sc-title-lbl3">页数范围</label>
                    <span class="sc-title-sp3">{{monographData.wordCount}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <label class="sc-title-lbl3">资助项目</label>
                    <span class="fundProject" v-for="(item,i) in monographData.fundProject" @click="handleFundProject(item.projectName,'/projectdetails',item.projectId)">{{item.projectName}}</span>
                  </i-col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      monographId: "",
      monographData: []
    };
  },
  created() {
    this.monographId = this.$route.query.monographId;
    this.handleMonograph();
  },
  methods: {
    handleMonograph() {
      this.$axios
        .get("/basic/monograph", { params: { monographId: this.monographId } })
        .then(res => {
          if (res.data.code == 200) {
            this.monographData = res.data.data.content;
          }
        });
    },
    // 作者跳转
    authorSetPath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 机构跳转
    organSetpath(name, path, orgId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研机构（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId } });
    },
    // 项目跳转
    handleFundProject(name, path, projectId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "项目（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { projectId } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/public.scss";

.list {
  width: 100%;
  margin-bottom: 20px;
  .ivu-col-span-8 {
    height: 32px;
  }
  .authorName,
  .organizationAuthor,.fundProject {
    cursor: pointer;
    margin-right: 8px;
  }
  .authorName:hover,
  .organizationAuthor:hover,.fundProject:hover {
    color: #1843a3;
    text-decoration: underline;
  }
}
</style>