<template>
  <div>
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,i) in contentData" :key="i+'j'">
        <h3
          class="paperName"
          @click="projectSetpath(item.name,'/projectdetails',item.projectId)"
        >{{item.name?item.name:'未知'}}</h3>
        <div class="sc-div">
          <Row>
            <i-col span="12">
              <label>项目开始时间：</label>
              <span>{{item.startTime?item.startTime:'未知'}}</span>
            </i-col>
            <i-col span="12">
              <label>项目结束时间：</label>
              <span>{{item.endTime?item.endTime:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <label>项目负责人：</label>
              <span
                class="charge"
                @click.stop="handleDetails(item.charge.personName,'/persondetails',item.charge.personId)"
              >{{item.charge.personName?item.charge.personName:'未知'}}</span>
            </i-col>
            <i-col span="12">
              <label>项目牵头单位：</label>
              <span
                class="leadUnit"
                @click="OrganSetpath(subItem.organizationId)"
                v-for="(subItem,i) in item.leadUnit"
              >{{subItem.organizationName == 'null'?'未知':subItem.organizationName}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="24">
              <label>合作完成单位：</label>
              <span>{{item.coOrganization == 'null'?'未知':item.coOrganization}}</span>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
    <div class="loading-height" v-if="loading">
      <Spin fix>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>正在加载中. . .</div>
      </Spin>
    </div>
    <div v-if="!loading&&contentData.length==0" class="sc-box-content no-data border-bottom">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {
      contentData: []
    };
  },
  props: ["data", "loading"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
    },
    loading(news) {
      this.loading = news;
    }
  },
  mounted() {
    this.contentData = this.data;
    console.log(this.contentData);
  },
  methods: {
    handleDetails(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 项目跳转
    projectSetpath(name, path, projectId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "项目" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { projectId } });
    },
    // 机构跳转
    OrganSetpath(organizationId) {
      this.$emit("handle-details", organizationId);
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-reward {
  .sc-div {
    width: 100%;
    label,
    span {
      font-size: 12px;
    }
  }
}
.paperName {
  cursor: pointer;
  width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1843a3;
}
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.charge,
.leadUnit {
  cursor: pointer;
}
.charge:hover,
.leadUnit:hover {
  color: #1843a3;
  text-decoration: underline;
}
</style>

