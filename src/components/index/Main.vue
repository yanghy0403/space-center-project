<template>
  <div class="main">
    <Header/>
    <!--  <MapPosition v-if="isShow"/> -->
    <div class="content-box">
      <!-- 组件渲染 -->
      <transition name="show">
        <router-view></router-view>
      </transition>
    </div>
    <!-- 返回顶部 -->
    <!-- <BackTop ref="backTop"></BackTop> -->
    <Footer/>
    <!--<a href="#" class="fixed_edit"></a>-->
  </div>
</template>

<script>
// import MapPosition from "./public/MapPosition";
import Header from "./public/Header";
import Footer from "./public/Footer";
export default {
  name: 'k_main',
   components: {
    Header,
    Footer,
    // MapPosition
  },
  data: () => ({
    isShow: false,
    // isLoading: true
  }),
  computed: {
    positionIsShow() {
      return this.$store.state.variable.positionIsShow;
    }
  },
  watch: {
    positionIsShow(newVal, oldVal) {
      this.isShow = newVal;
    }
  },
  mounted() {
    this.isShow = this.$store.state.variable.positionIsShow;
    // this.$store.commit("setBackTop", this.$refs.backTop.back);
  }
}
</script>
<style lang="scss">
.fixed_edit {
    background: url('../../assets/images/edit_btn.png') center center no-repeat #1843a3;
    width: 56px;
    height: 56px;
    position: fixed;
    right: 50%;
    margin-right: -656px;
    top: 296px;
    z-index: 9999;
    display: block;
    transition: all 300ms ease;
}
.sc-box-top{
    background: url("../../assets/images/title_bg.jpg") top left repeat-x;
}
</style>

