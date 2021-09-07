<template>
  <div class="header">
    <div class="topbar">
      <div class="mainbox flex-bet">
        <div class="topbar_l">
          <a href="#">
            <img src="../../../assets/images/tb1.png">
          </a>
          <a href="#">
            <img src="../../../assets/images/tb2.png">
          </a>
          <a href="#">
            <img src="../../../assets/images/tb3.png">
          </a>
          <a href="#">
            <img src="../../../assets/images/tb4.png">
          </a>
        </div>
        <div class="topbar_r">
         <div class="topbar_r">
            <a href="javascript:;" class="info" v-show="username!=''">
                  <img src="../../../assets/img/tou.png" alt="头像" class="touxiang">
                  <span style="color:#fff">{{username}}</span>
              </a>
             
              <router-link class="oper" to="/Manage" v-show="username!=''" @click.native="setPath('管理','关键词管理','/Manage')">管理</router-link>
              <!-- <a href="http://159.226.22.227/cas/login?service=http://http://10.0.88.161:81/" class="btn1" v-show="username ==''">登录/注册</a> -->
               <router-link class="oper"  v-show="username==''" tag = "a" to="/login">登录 / 注册</router-link>
              <a href="http://159.226.22.227/cas/logout?service=http://http://10.0.88.161:81/" class="btn2" v-show="username!=''">注销</a>
              <a href="#" class="btn2">English</a>
        </div>
        </div>
      </div>
    </div>
    <div class="mainbox">
      <div class="logo">
        <a href="index.html">
          <!-- <img src="../../../assets/images/logo.png"> -->
        </a>
      </div>
      <div class="topnav">
        <ul class="flex-bet">
          <li @click="bandleClick(1)">
            <router-link :class="[mark===1?'on':'']" to="/">首 页</router-link>
          </li>
          <li @click="bandleClick(2)">
            <a :class="[mark===2?'on':'']" href="#">关于我们</a>
          </li>
          <li @click="bandleClick(3)">
            <a :class="[mark===3?'on':'']" href="#">标准规范</a>
          </li>
          <li @click="bandleClick(4)">
            <a :class="[mark===4?'on':'']" href="#">数据目录</a>
          </li>
          <li @click="bandleClick(5)">
            <a :class="[mark===5?'on':'']" href="#">数据汇交</a>
          </li>
          <li @click="bandleClick(6)" class="clear" >
            <a :class="[mark===6?'on':'']" href="#">用户指南</a>
          </li>
          <!-- <li @click="bandleClick(7)">
            <a :class="[mark===7?'on':'']" href="#">用户指南</a>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "k_header",
  data() {
    return {
      mark: 1,
      username:'',//用户名
    };
  },
  methods: {
    bandleClick(val){
      this.mark = val;
    },
    setPath(oneNavName, towNavName, towPath, mark) {
      let PositionArr = null;
      if (mark) {
        PositionArr = [
          { pathName: towNavName, routerName: towPath, mark: true }
        ];
      } else {
        PositionArr = [
          { pathName: oneNavName },
          { pathName: towNavName, routerName: towPath, mark: true }
        ];
      }
      this.$store.commit("setPosition", PositionArr);
    }
  },
   mounted(){
            var url = window.location.href;
          var startindex = url.indexOf('CURRENTCASUSER=');
           if(startindex !== -1){
              var endindex = url.indexOf('&ticket');
              var token = url.substring(startindex,endindex);
              sessionStorage.setItem('token',JSON.stringify(token));
          }else{
              //  window.location.href ='http://159.226.22.227/cas/login?service=http://10.0.88.161:81/';
          }
     
      
      if(sessionStorage.getItem('token')){
          token = JSON.parse(sessionStorage.getItem('token'));
          this.username = token.substring(token.indexOf('=')+1);
      }else{
          this.username = '';
      }
     
  }
};
</script>
<style lang="scss" scoped>
.info{
  display: flex;
  justify-content: flex-start;
  align-items: center;
   .touxiang{
     display: inline-block;
     width: 20px;
     height: 20px;
     margin-right: 5px;
   }
}
@import "../../../style/mainHearder.scss";
</style>

