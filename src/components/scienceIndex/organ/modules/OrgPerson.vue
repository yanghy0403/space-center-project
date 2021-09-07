<template>
  <div class="orgPerson">
      <table class="table-bordered" style="width:100%">
        <thead align="center">
          <tr class="info">
            <th style="font-weight:400;width: 50%;">姓名</th>
            <th style="font-weight:400;" class="text-center">院士类型</th>
          </tr>
        </thead>
        <tbody class="content" v-if="contentData">
          <tr v-for="(item,i) in contentData" :key="i">
            <td>{{item.person?item.person: '未知'}}</td>
            <td>{{item.academician?item.academician:'未知'}}</td>
          </tr>
        </tbody>
        <tbody class="content" v-else>
        <tr>
          暂无内容
        </tr>
      </tbody>
      </table>
  </div>
</template>
<script>
export default {
  data: () => ({
    configure: {},
    marks :'',
    contentData: [],
    dataList:[]
  }),
  props: ["data","change","mark"],
   watch: {
    mark(newVal) {
      this.marks = newVal;
    },
    data(newVal) {
      this.contentData = newVal;
      
    }
  },
  mounted() {
    this.marks = this.mark;
    this.contentData = this.data;

  },
  methods: {  

}
};
</script>
<style lang="scss" scoped>
.orgPerson {
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
      }
    }
  }
}
</style>
