<template>
  <div class="PersonReward">
    <table class="table-bordered" style="width:100%;">
      <thead align="center">
        <tr class="info">
          <th >姓名</th>
          <th>职务</th>
          <th>职称</th>
          <th>单位</th>
          <!-- <th class="text-center" style="width:20%">获奖排序</th> -->
        </tr>
      </thead>
      <tbody class="content">
        <tr>
            <td>郝希凡</td>
            <td>副主任</td>
            <td>中国科学院院士</td>
            <td>月球探测工程中心</td>
        </tr>
        <tr>
            <td>叶培建</td>
            <td>卫星系统总指挥</td>
            <td>中国科学院院士</td>
            <td>中国空间技术研究院</td>
        </tr>
        <tr>
            <td>李春</td>
            <td>地面应用系统总设计师</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>李春来</td>
            <td>绕月探测工程地面应用系统总设计师</td>
            <td>二级研究员</td>
            <td>国家天文台</td>
        </tr>
        <tr>
            <td>张洪波</td>
            <td>绕月探测工程地面应用系统总设计师</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>孙辉先</td>
            <td>"嫦娥一号"卫星 副总设计师 有效载荷 总设计师</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>吴季</td>
            <td>"嫦娥一号"卫星有效载荷总指挥</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>董光亮</td>
            <td>中国绕月探测工程测控系统副总设计师</td>
            <td>中科院研究员</td>
            <td>中国科学院空间科学与应用研究中心</td>
        </tr>
      </tbody>
      <!-- <tbody class="content">
        <div style="text-align: center;font-weight: bold;">
          暂无数据
        </div>
      </tbody> -->
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
