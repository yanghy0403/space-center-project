
<template>
  <div class="sc-query">
    <div class="sc-aside">
      <Aside :query="query" />
    </div>
    <div class="sc-section">
      <iframe
        src="http://nssc-yqj.aicas.cn/component/componentGroup/front/newWebview"
        frameborder="0" scrolling="no"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Aside from "./modules/Aside";

export default {
  data: () => ({
    query: [
      {
        oneNavName: "基础知识查询",
        towNavName: "科研人员画像",
        path: "/person"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "科研机构画像",
        path: "/organ"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "项目查询",
        path: "/project"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "期刊查询",
        path: "/journal"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "会议查询",
        path: "/conference"
      },
      // {
      //   oneNavName: "基础知识查询",
      //   towNavName: "重大科研任务",
      //   path: "/taskdetails"
      // },
      { oneNavName: "基础知识查询", towNavName: "论文查询", path: "/paper" },
      { oneNavName: "基础知识查询", towNavName: "专利查询", path: "/patent" },
      {
        oneNavName: "基础知识查询",
        towNavName: "标准查询",
        path: "/criterion"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "专著查询",
        path: "/monograph"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "仪器设备推荐",
        path: "/device"
      }
    ]
  }),
  components: {
    Aside
  },
  watch: {},
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
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../../style/details.scss";
.sc-section iframe {
    width: 860px;
    height: 2000px;
    .headTop {
        margin-top: 0 !important;
    }
}

</style>