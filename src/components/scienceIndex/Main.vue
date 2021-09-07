<template>
  <div class="main">
    <Header />
    <MapPosition v-if="isShow"/>
    <transition name="show">
      <router-view></router-view>
    </transition>
   
    <Footer />
   
  </div>
</template>

<script>
import Header from "./public/Header";
import Footer from "./public/Footer";
import MapPosition from "./public/MapPosition";

export default {
  name: "k_main",
  components: {
    Header,
    Footer,
    MapPosition
  },
  data: () => ({
    isShow: false
    // isLoading: true
  }),
  computed: {
    positionIsShow() {
      return this.$store.state.variable.positionIsShow;
    }
  },
  watch: {
    positionIsShow(val){
     // console.log(val);
      
       this.isShow = val;
    }
  },
  mounted() {
   
  }
};
</script>
<style lang="scss">
.fixed_edit {
  background: url("../../assets/images/edit_btn.png") center center no-repeat
    #1843a3;
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
.sc-box-top {
  background: url("../../assets/images/title_bg.jpg") top left repeat-x;
}
</style>

