<template>
  <div class="sc-position">
    <div>
      <Icon type="ios-pin-outline"/>当前位置：
      <p v-for="(item,index) in posArr" :key="index+'x'">
        <span :class="[index===1?'active':'']" @click="goToPath(item)" v-html="item.pathName"></span>
        <i v-if="index!==(posArr.length-1)">/</i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "position",
  data() {
    return {
      posArr: []
    };
  },
  computed: {
    position() {
      return this.$store.state.variable.position;
    }
  },
  watch: {
    position(newVal, oldVal) {
      this.posArr = newVal;
    }
  },
  created() {
    this.posArr = this.$store.state.variable.position;
  },
  methods:{
    goToPath(val){
      if (val.mark) {
       this.$router.push({ path: val.routerName});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-position {
  width: 1200px;
  margin: auto;
  margin-top: 10px;
  font-size: 14px;
  color: #999;
  // margin-bottom: 20px;
  background-color: #ebeef5;
 
  > div { 
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    margin-bottom: 3px;
    span {
      margin: 0px 5px;
    }
    span.active{
      cursor: pointer;
    }
    .active:hover{
       color: #2d8cf0;
    }
    >p {
      display: inline-block;
    }
  }
}
</style>
