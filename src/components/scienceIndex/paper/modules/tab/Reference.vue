<template>
  <div class="reference">
    <ul v-if="contentData.length === 0" class="noData">
      <li>暂无数据</li>
    </ul>
    <ul v-else>
      <li v-for="(item,index) in contentData" :key="index">
        <span class="num">[{{index + 1}}]</span>
        <span
          class="author"
          v-for="subItem in item.author"
          :key="subItem.personId"
          @click.stop="setPathPerson(item.personName?item.personName:'未知','/persondetails',item.personId)"
        >{{subItem.personName}}</span>
        <span
          class="paperName"
          @click.stop="handleDetails(item.name,item.paperId)"
        >{{item.name == 'null' || ''?'':item.name}}</span>
        <span
          class="journalName"
          v-for="subItem in item.journal"
          :key="subItem.journalId"
        >{{subItem.journalName == 'null' || ''?'':subItem.Name}}</span>
        <span>{{item.year == 'null'|| ''?'':item.year}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Reference",
  data() {
    return {
      contentData: []
    };
  },
  props: ["data"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
      console.log(this.contentData);
    }
  },
  created() {
    this.contentData = this.data;
    console.log(this.contentData);
  },
  mounted() {
    this.contentData = this.data;
  },
  methods: {
    // 作者跳转
    setPathPerson(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "个人画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 论文跳转
    handleDetails(id) {
      this.$emit("handle-details", "this.paperId");
    }
  }
};
</script>

<style lang="scss" scope>
.reference {
  width: 100%;
  ul li {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    margin-left: 10px;
    .author,
    .paperName,
    .journalName {
      margin-right: 5px;
      cursor: pointer;
      color: #2d8cf0;
    }
    .author:hover,
    .paperName:hover,
    .journalName:hover {
      text-decoration: underline;
      color: #333;
    }
    .paperName {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      width: 650px;
      display: inline-block;
      float: left;
    }
    .num {
      margin-right: 5px;
      float: left;
    text-align: center;
    }
  }
  .noData {
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
}
</style>