<template>
  <div class="PersonReward">
    <!-- <table class="table-bordered">
      <thead align="center">
        <tr class="info">
          <th style="width:10%">序号</th>
          <th class="text-center">奖励名称</th>
          <th class="text-center" style="width:20%">奖项类型</th>
        </tr>
      </thead>
      <tbody class="content">
        <tr v-for="(item,i) in contentData" :key="i">
          <td id="indexNum"></td>
          <td>{{item.name?item.name:'未知'}}</td>
          <td>{{item.awardType?item.awardType:'未知'}}</td>
        </tr>
      </tbody>
    </table>-->
    <i-table border highlight-row :columns="columns3" :data="contentData"></i-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: [],
    columns3: [
      {
        type: "index",
        align: "center",
        width: 50
      },
      {
        title: "奖励名称",
        key: "name"
      },
      {
        title: "奖励类型",
        key: "awardClass",
        render: (h, params) => {
          if(params.row.awardType !== '其它' || params.row.awardClass !== '其它') {
            return h("span", params.row.awardType + "；" + params.row.awardClass);
          } else {
            return h('span', '');
          }
        }
      }
    ]
  }),
  props: ["data", "mark"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
    }
  },
  mounted() {
    this.contentData = this.data;
  },
  methods: {}
};
</script>
<style lang="scss">
// .PersonReward {
//   table {
//     border-spacing: 0;
//     border-collapse: collapse;
//     font-weight: 400;
//     tr {
//       td:nth-child(1) {
//         color: #515a6e;
//       }
//       td {
//         border: 1px solid #ddd;

//         padding: 5px;
//       }
//       th {
//         padding: 5px;
//         background-color: #d9edf7;
//         border: 1px solid #ddd;
//       }
//     }
//   }
// }

.ivu-table-border td,
.ivu-table-border th {
  border-bottom: 1px solid #ccc !important;
}
.ivu-table td,
.ivu-table th {
  border-right: 1px solid #ccc !important;
}
.ivu-table th {
  background-color: #d9edf7 !important;
}
</style>
