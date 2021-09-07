<template>
  <div class="sc-details">
    <div class="con_div">
      <div class="title_div">
        <div class="tit_le_div">专利详情</div>
      </div>
      <div class="content_div">
        <div class="cont_div">
          <div class="headerName">
            <h3>{{patentInfoData.chineseTitle}}</h3>
          </div>
          <div class="dataInfo">
            <p class="br">详细信息</p>
            <div class="dataInfo_div">
              <div class="img_div">
                <img src="../../../assets/images/getimg.jpg" alt />
              </div>
              <div class="list">
                <row>
                  <i-col span="24">
                    <label>专利发明人</label>
                    <label class="authorsArr" style="font-weight: 400; margin-left: 10px;"
                            v-for="(list,index) in patentInfoData.authors"
                            :key="index + 'c'"
                            @click="authorsSetpath(list.personName,'/persondetails',list.personId)"
                    >{{list.personName?list.personName:'未知'}}</label>
                  </i-col>
                </row>
                <Row>
                  <i-col span="12">
                    <label>专利类别</label>
                    <span>{{patentInfoData.patentType}}</span>
                  </i-col>
                  <i-col span="12">
                    <label>专利申请号</label>
                    <span>{{patentInfoData.patentNo}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label>专利领域</label>
                    <span v-for="(item,i) in patentInfoData.areasData" :key="i">{{item.value}}</span>
                  </i-col>
                  <i-col span="12">
                    <label>语言</label>
                    <span>{{patentInfoData.language == "cn"?'中文':patentInfoData.language}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12" v-if="patentInfoData.organization != undefined">
                    <label>专利申请人</label>
                    <span>{{patentInfoData.organization.organizationName}}</span>
                  </i-col>
                  <i-col span="12">
                    <label>申请人地址</label>
                    <span>{{patentInfoData.applicantAddress}}</span>
                  </i-col>
                </Row>

                <Row>
                  <i-col span="12">
                    <label>申请日</label>
                    <span>{{patentInfoData.applyDate}}</span>
                  </i-col>

                  <i-col span="12">
                    <label>公开号</label>
                    <span>{{patentInfoData.publish_num}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label>主分类号</label>
                    <span>{{patentInfoData.mainClassNum}}</span>
                  </i-col>
                  <i-col span="12">
                    <label>公开日期</label>
                    <span>{{patentInfoData.publishDate}}</span>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="24">
                    <label>分类号</label>
                    <label style="font-weight: 400;margin-left: 10px;" v-for="(item,i) in patentInfoData.classNumData">{{item.value}}</label>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="12">
                    <label>授权公告号</label>
                    <span>{{patentInfoData.noticeNum}}</span>
                  </i-col>
                  <i-col span="12">
                    <label>授权公告日</label>
                    <span>{{patentInfoData.noticeDate}}</span>
                  </i-col>
                </Row>
              </div>
            </div>
          </div>
          <div class="sc-box">
            <p class="br">摘要</p>
            <div class="sc-box-content">
              <p class="abstract">{{patentInfoData.abstract == ''?'暂无数据':patentInfoData.abstract}}</p>
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
    patentId: "", // 专利id
    patentInfoData: [] //获取专利详情
  }),
  created() {},
  mounted() {
    this.patentId = this.$route.query.patentId;
    this.getpatentInfo();
  },
  methods: {
    // 获取专利详情
    getpatentInfo() {
      var id = this.patentId;
      this.$axios
        .get("/basic/patent", { params: { patentId: id } })
        .then(res => {
          if (res.data.code == 200) {
            this.patentInfoData = res.data.data.content;
            var areasData = [];
            for (var i = 0; i < this.patentInfoData.areas.length; i++) {
              var temp = {};
              temp = {
                value: this.patentInfoData.areas[i]
              };
              areasData.push(temp);
              this.patentInfoData.areasData = areasData;
            }

            var classNum = this.patentInfoData.classNum;
            var classNumData = [];
            for(var j = 0;j < classNum.length;j++) {
                var temp = {};
                temp = {
                    value: classNum[j]
                }
                classNumData.push(temp);
                this.patentInfoData.classNumData = classNumData
            }
            console.log(this.patentInfoData)
          }
        });
    },
          // 作者跳转
    authorsSetpath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/public.scss";
.dataInfo_div {
  width: 100%;
  display: flex;
  .img_div {
    margin-top: 0px;
    img {
      width: 200px;
      height: 230px;
    }
  }
  .list {
    width: 100%;
    span {
      display: inline-block;
      width: 320px;
    }
  }
 
}
 .abstract {
    text-indent:2em;
    line-height: 24px;
    font-size: 13px;
  }
.sc-box-content {
  height: 200px;
  margin-left: 30px;
}
.authorsArr {
  cursor: pointer;
}
.authorsArr:hover {
  color: #1843A3;
  text-decoration: underline;
}
</style>