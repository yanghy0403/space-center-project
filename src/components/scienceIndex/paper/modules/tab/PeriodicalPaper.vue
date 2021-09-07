<template>
  <div>
    <div v-if="contentData.length === 0" class="sc-box-content no-data border-bottom">暂无数据</div>
    <div v-else class="sc-reward" v-for="item in contentData">
      <h3>{{item.title?item.title:'未知'}}</h3>
      <div class="sc-div">
        <p>作者：{{item.author?item.author:'未知'}}</p>
        <!-- <p>作者机构：{{item.org?item.org:'未知'}}</p> -->
        <p>期刊：{{item.journal?item.journal:'未知'}}</p>
        <p>年：{{item.year?item.year:'未知'}}</p>
        <p>期：{{item.stage?item.stage:'未知'}}</p>
        <!-- <p>关键字：{{item.key?item.key:'未知'}}</p> -->
      </div>
    </div>
  
    <!-- <div class="sc-reward">
      <h3>Alfven波在任意流场,磁场位形中的传播 </h3>
      <div class="sc-div">
        <p>作者：魏奉思</p>
        <p>期刊：空间科学学报</p>
        <p>年：1989</p>
        <p>期：04</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>太阳活动低年附近等离子体质量、动量和能量全日面输出流量的速度分析</h3>
      <div class="sc-div">
        <p>作者：魏奉思,蔡红昌</p>
        <p>期刊： 科学通报</p>
        <p>年：1992</p>
        <p>期：22</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>太阳风中的动力论Alfven波激</h3>
      <div class="sc-div">
        <p>作者：卢先和,宋礼庭,魏奉思</p>
        <p>期刊：空间科学学报</p>
        <p>年：1997</p>
        <p>期：01</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>关于我国空间天气保障能力发展战略的一些思考</h3>
      <div class="sc-div">
        <p>作者：魏奉思</p>
        <p>期刊：气象科技进展</p>
        <p>年：2011</p>
        <p>期：04</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>中国空间天气研究进展</h3>
      <div class="sc-div">
        <p>作者：王水,魏奉思</p>
        <p>期刊：地球物理学进展</p>
        <p>年：2007</p>
        <p>期：04</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>Data-driven Modeling of the Solar Corona by a New Three-dimensional Path-conservative Osher-Solomon MHD Model</h3>
      <div class="sc-div">
        <p>作者：Feng, Xueshang， Li, Caixia， Xiang, Changqing </p>
        <p>期刊：《Astrophysical Journal Supplement》</p>
        <p>年：2017</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>Direct evidence for kinetic effects associated with solar wind reconnection</h3>
      <div class="sc-div">
        <p>作者：Xiaojun Xu，Yi Wang，Fengsi Wei</p>
        <p>期刊：《Scientific Reports》</p>
        <p>年：2015 </p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>Characteristics of Reconnection Diffusion Region in the Solar Wind</h3>
      <div class="sc-div">
        <p>作者：XU Xiaojun，WEI Fengsi，FENG Xueshang</p>
        <p>期刊：《Chinese Journal of Space Science》</p>
        <p>年：2012</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>Study on Langmuir Wave Activities Within the Magnetic Cloud Boundary Layers</h3>
      <div class="sc-div">
        <p>作者：Pingbing Zuo，Chunming Zhu，Fengsi Wei</p>
        <p>期刊：《Chinese Journal of Space Science》</p>
        <p>年：2009</p>
      </div>
    </div>
    <div class="sc-reward">
      <h3>The Relationship between the Magnetic Cloud Boundary Layer and the Substorm Expansion Phase</h3>
      <div class="sc-div">
        <p>作者：X. S. Feng，F. S. Wei，F. Yang</p>
        <p>期刊：《Solar Physics》</p>
        <p>年：2007</p>
      </div>
    </div>
   -->
  
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
      console.log(this.contentData);
      
    }
  },
  mounted() {
    this.contentData = this.data;
    console.log(this.contentData);
      
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
</style>

