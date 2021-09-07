<template>
  <div class="PersonReward">
    <table class="table-bordered" style="width:100%;">
      <thead align="center">
        <tr class="info">
          <th style="width:20%;font-weight: 400;">序号</th>
          <th class="text-center" style="font-weight:400;">获奖名称</th>
          <th class="text-center" style="width:40%;font-weight: 400;">奖项类别</th>
          <!-- <th class="text-center" style="width:20%;font-weight: 400;">奖励等级</th> -->
          <!-- <th class="text-center" style="width:20%">获奖排序</th> -->
        </tr>
      </thead>
      <tbody class="content" v-if="contentData">
        <tr v-for="(item,i) in contentData" :key="i+'s'">
          <td style="text-align: center"> {{(i++)+1}} </td>
          <td>{{item.name?item.name:'未知'}}</td>
          <td>{{item.awardType?item.awardType:'未知'}} &nbsp; {{item.awardDate}} &nbsp; {{item.awardClass}} </td>
          <!-- <td style="text-align: center">{{item.awardClass == ''?'未知':item.awardClass}}</td> -->
          <!-- <td>{{item.sort}}</td> -->
        </tr>
      </tbody>
      <tbody class="content" v-else>
        <div style="text-align: center;font-weight: bold;">
          暂无数据
        </div>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: []
  }),
  props: ["data", "change"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
    }
  },
  mounted() {
    this.contentData = this.data;

  },
  methods: {

  }

};
</script>
<style lang="scss" scoped>
.PersonReward {
  table {
    border-spacing: 0;
    border-collapse: collapse;
    font-weight: 400;
    tr {
      td:nth-child(1) {
        color: #515a6e;
      }
      td {
        border: 1px solid #ddd;
        padding: 5px;
      }
      th {
        padding: 5px;
        background-color: #d9edf7;
        border: 1px solid #ddd;
        font-size: 12px;
      }
    }
  }
}
</style>
