<template>
  <div>
    <!-- <div v-if="contentData.length === 0" class="sc-box-content no-data border-bottom">暂无数据</div> -->
    <!-- <div v-else class="sc-reward" v-for="item in contentData">
      <h3>{{item.title?item.title:'未知'}}</h3>
      <div class="sc-div">
        <p>项目来源：{{item.rewardType?item.rewardType:'未知'}}</p>
        <p>开始时间：{{item.rewardRank?item.rewardRank:'未知'}}</p>
        <p>截止时间：{{item.issuedBy?item.issuedBy:'未知'}}</p>
        <p>角色：{{item.country?item.country:'未知'}}</p>
      </div>
    </div> -->
    <div class="sc-reward">
      <h3>L1422040,空间天气预报前沿学科发展战略研究</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金专项基金项目</p>
        <p>角色：主持</p>
        <p>开始时间：2014-7</p>
        <p>截止时间：2016-6</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>41231068,行星际磁云动力学研究</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重点项目</p>
        <p>角色：主持</p>
        <p>开始时间：2013-1</p>
        <p>截止时间：2017-12</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>L0922119,我国空间科学学科发展战略研究</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金专项基金项目</p>
        <p>角色：主持</p>
        <p>开始时间：2019-6</p>
        <p>截止时间：2011-5</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>40890160,空间天气能量传输过程研究</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重大项目</p>
        <p>角色：主持</p>
        <p>开始时间：2009-1</p>
        <p>截止时间：2012-12</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>40890162,L1点行星际太阳风多时空尺度结构研究</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重大项目</p>
        <p>角色：主持</p>
        <p>开始时间：2009-1</p>
        <p>截止时间：2012-12</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>40874078,空间天气预报中的“共性”与“个性”</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重大项目</p>
        <p>角色：主持</p>
        <p>开始时间：2019-1</p>
        <p>截止时间：2011-12</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>40674084,磁云边界层电子、离子基本行为的诊断研究</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重大项目</p>
        <p>角色：主持</p>
        <p>开始时间：2007-1</p>
        <p>截止时间：2009-12</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>40336053,日冕物质抛射的行星际表现</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重大项目</p>
        <p>角色：主持</p>
        <p>开始时间：2004-1</p>
        <p>截止时间：2007-12</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>40274052,行星际扰动与日球电流片的相互作用过程的研究</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重大项目</p>
        <p>角色：主持</p>
        <p>开始时间：2003-1</p>
        <p>截止时间：2005-12</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>49990450,日地空间灾害性扰动过程及其对人类活动的影响</h3>
      <div class="sc-div">
        <p>项目来源：国家自然科学基金重大项目</p>
        <p>角色：主持</p>
        <p>开始时间：1999-2</p>
        <p>截止时间：2003-12</p>
      </div>
    </div>
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

<style lang="scss" scoped>
.sc-reward {
  .sc-div {
    display: flex;
    flex-wrap: wrap;
    p {
      min-width: 330px;
      
        margin-right: 20px;
    }
  }
}
</style>

