<template>
  <div class="TakeOffice">
    <div class="TakeOfficeBox" v-if="contentData">
      <p v-for="(item,i) in contentData" :key="i+'s'">
      <span>{{item.startDate == "00000000"?'未知时间':item.startDate}}</span>
      <span>{{item.endDate == "00000000"?'未知时间':item.endDate}}</span>
      <span>{{item.organization == 'null'?'':item.organization}}</span>
      <span>{{item.title == 'null'?'':item.title}}</span>
    </p>
    </div>
      <div v-else><p>暂无数据</p></div>
  </div>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {
      contentData: [],
    };
  },
  props: ["data"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
    }
  },
  mounted() {
    this.contentData = this.data;
  }
};
</script>

<style lang="scss">
.TakeOffice {
  font-weight: 400;
  .TakeOfficeBox span {
    margin-right: 20PX;
    // font-weight: bold;
  }
}

</style>

