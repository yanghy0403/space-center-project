<template>
  <div>
    <!-- <div v-if="contentData.length === 0" class="sc-box-content no-data">暂无数据</div> -->
    <div class="sc-reward">
      <div>
        <h3>第24太阳活动周中纬度电离层低电离水平的观测研究</h3>
        <div class="sc-div">
          <p class="authorArr">
            作者：
            <span>于世美</span>
            <span>郝永强</span>
            <span>张东和</span>
            <span>肖佐</span>
          </p>
          <p>
            机构：
            <span>北京大学空间物理与应用技术研究所</span>
            <span>《中国科学》杂志社有限责任公司</span>
            <span>中国科学院空间天气学国家重点实验室</span>
          </p>
          <p>关键词：<span>电离层顶 环境探测 科学探测 空间中心 天鹰 儋州市 试验任务 探测致掘 空间环境 中国科学院 期刊:地球物理学报</span></p>
          <p class="abstract">
            摘要：
            <span>延续2008-2009年的太阳极低活动期，第24太阳活动周开始后太阳活动性上升级慢，即使在趋近峰年时太阳极紫外(EUV)辐射通量的水平仍显着低于前几个活动周.比较第23、24周的太阳辐射水平，及日本国分寺和子午工程武汉站的电离层测高仪观测，发现第24周的太阳CUV辐射、电离层F区临界频率(foF2)和峰值高度(hmF2)都显著低于第23周的同期水平，在较低高度上，偏低的EUV辐射带来的电</span>
          </p>
        </div>
      </div>
    </div>
    <div class="sc-reward">
      <div>
        <h3>第24太阳活动周中纬度电离层低电离水平的观测研究</h3>
        <div class="sc-div">
          <p class="authorArr">
            作者：
            <span>于世美</span>
            <span>郝永强</span>
            <span>张东和</span>
            <span>肖佐</span>
          </p>
          <p>
            机构：
            <span>北京大学空间物理与应用技术研究所</span>
            <span>《中国科学》杂志社有限责任公司</span>
            <span>中国科学院空间天气学国家重点实验室</span>
          </p>
          <p>关键词：<span>电离层顶 环境探测 科学探测 空间中心 天鹰 儋州市 试验任务 探测致掘 空间环境 中国科学院 期刊:地球物理学报</span></p>
          <p class="abstract">
            摘要：
            <span>延续2008-2009年的太阳极低活动期，第24太阳活动周开始后太阳活动性上升级慢，即使在趋近峰年时太阳极紫外(EUV)辐射通量的水平仍显着低于前几个活动周.比较第23、24周的太阳辐射水平，及日本国分寺和子午工程武汉站的电离层测高仪观测，发现第24周的太阳CUV辐射、电离层F区临界频率(foF2)和峰值高度(hmF2)都显著低于第23周的同期水平，在较低高度上，偏低的EUV辐射带来的电</span>
          </p>
        </div>
      </div>
    </div>
    <div class="sc-reward">
      <div>
        <h3>第24太阳活动周中纬度电离层低电离水平的观测研究</h3>
        <div class="sc-div">
          <p class="authorArr">
            作者：
            <span>于世美</span>
            <span>郝永强</span>
            <span>张东和</span>
            <span>肖佐</span>
          </p>
          <p>
            机构：
            <span>北京大学空间物理与应用技术研究所</span>
            <span>《中国科学》杂志社有限责任公司</span>
            <span>中国科学院空间天气学国家重点实验室</span>
          </p>
          <p>关键词：<span>电离层顶 环境探测 科学探测 空间中心 天鹰 儋州市 试验任务 探测致掘 空间环境 中国科学院 期刊:地球物理学报</span></p>
          <p class="abstract">
            摘要：
            <span>延续2008-2009年的太阳极低活动期，第24太阳活动周开始后太阳活动性上升级慢，即使在趋近峰年时太阳极紫外(EUV)辐射通量的水平仍显着低于前几个活动周.比较第23、24周的太阳辐射水平，及日本国分寺和子午工程武汉站的电离层测高仪观测，发现第24周的太阳CUV辐射、电离层F区临界频率(foF2)和峰值高度(hmF2)都显著低于第23周的同期水平，在较低高度上，偏低的EUV辐射带来的电</span>
          </p>
        </div>
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
    data(newVal, oldVal) {
      this.contentData = newVal;
    }
  },
  mounted() {
    this.contentData = this.data;
  },
  methods: {
    handleDetails(personId) {
      this.$emit("handle-details", personId);
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-reward {
  .sc-div {
    display: flex;
    flex-wrap: wrap;
    p {
      min-width: 360px;
      //   margin-top: 10px;
    }
  }
}
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.authorArr span {
  margin-right: 10px;
  cursor: pointer;
  color: #2d8cf0;
}
.abstract {
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 3; //第几行开始省略
  -webkit-box-orient: vertical;
  // width:130px;
}
</style>

