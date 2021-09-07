<template>
  <div class="header">
    <div class="topbar">
      <div class="mainbox flex-bet">
        <div class="topbar_l">
          <a href="#">
            <img src="../../../assets/images/tb1.png" />
          </a>
          <a href="#">
            <img src="../../../assets/images/tb2.png" />
          </a>
          <a href="#">
            <img src="../../../assets/images/tb3.png" />
          </a>
          <a href="#">
            <img src="../../../assets/images/tb4.png" />
          </a>
        </div>
        <div class="topbar_r">
          <a href="javascript:;" class="info" v-show="username!=''">
            <img src="../../../assets/img/tou.png" alt="头像" class="touxiang" />
            <span style="color:#fff">{{username}}</span>
          </a>
          <router-link
            class="oper"
            to="/Manage"
            v-show="username!=''"
            @click.native="setPath('管理','关键词管理','/Manage')"
          >管理</router-link>
          <!-- <a href="http://10.0.88.161/api/login?way=ump" class="btn1" v-show="username ==''">登录/注册</a> -->
           <router-link class="btn1"  v-show="username==''" tag="a" to="/login">登录 / 注册</router-link>
          <a href="http://10.0.88.161/api/logout" class="btn2" v-show="username!=''">注销</a>
          <a href="#" class="btn2">English</a>
        </div>
      </div>
    </div>

    <div class="mainbox">
      <div class="logo">
        <img @click="handlePathIndex" src="../../../assets/images/logo1.png" />
        <h1>空间科学领域知识图谱与决策支持</h1>
      </div>
      <div class="topnav">
        <ul class="flex-bet">
          <li @click="bandleClick(1)">
            <router-link :class="[mark===1?'on':'']" to="/science">首 页</router-link>
          </li>
          <li @click="bandleClick(2)">
            <a :class="[mark==2?'on':'']" href="#">基础知识</a>
            <ol class="nav-2">
              <li>
                <router-link
                  @click.native="setPath('基础知识查询','科研人员画像','/person')"
                  to="/person"
                >科研人员画像</router-link>
              </li>
              <li>
                <router-link @click.native="setPath('基础知识查询','科研机构画像','/organ')" to="/organ">科研机构画像</router-link>
              </li>
              <li>
                <router-link @click.native="setPath('基础知识查询','项目查询','/project')" to="/project">项目查询</router-link>
              </li>
              <li>
                <router-link to="/">
                  成果查询
                  <i class="fa fa-chevron-right"></i>
                </router-link>
                <ol class="nav-2-5">
                  <li>
                    <router-link
                      @click.native="setPath('基础数据查询','成果查询'+ ' / ' + '论文查询','./paper')"
                      to="/paper"
                    >论文查询</router-link>
                  </li>
                  <li>
                    <router-link
                      @click.native="setPath('基础数据查询','成果查询'+ ' / ' + '专利查询','./patent')"
                      to="/patent"
                    >专利查询</router-link>
                  </li>
                  <li>
                    <router-link
                      @click.native="setPath('基础数据查询','成果查询'+ ' / ' + '标准查询','./criterion')"
                      to="/criterion"
                    >标准查询</router-link>
                  </li>
                  <li>
                    <router-link
                      @click.native="setPath('基础数据查询','成果查询'+ ' / ' + '专著查询','./monograph')"
                      to="/monograph"
                    >专著查询</router-link>
                  </li>
                </ol>
              </li>

              <li>
                <router-link
                  @click.native="setPath('基础数据查询','成果查询'+ ' / ' + '期刊查询','./journal')"
                  to="/journal"
                >期刊查询</router-link>
              </li>
              <li>
                <router-link
                  @click.native="setPath('基础数据查询','成果查询'+ ' / ' + '会议查询','./conference')"
                  to="/conference"
                >会议查询</router-link>
              </li>
              <li>
                <router-link
                  @click.native="setPath('基础数据查询','成果查询'+ ' / ' + '仪器设备推荐','./device')"
                  to="/device"
                >仪器设备推荐</router-link>
              </li>
              <!-- <li>
                <router-link
                  @click.native="setPath('基础知识查询','重大科学空间任务','/taskdetails')"
                  to="/taskdetails"
                >重大空间科学任务</router-link>
              </li>-->
            </ol>
          </li>
          <li @click="bandleClick(3)">
            <a :class="[mark==3?'on':'']" href="#">合作网络</a>
            <ol class="nav-3">
              <li>
                <router-link
                  @click.native="setPath('合作网络','科研人员合作网络','/cooperationNetworkIndex')"
                  to="/cooperationNetworkIndex"
                >科研人员合作网络</router-link>
              </li>
              <li>
                <router-link
                  @click.native="setPath('合作网络','领域机构合作网络','/cooOrgNetworkIndex')"
                  to="/cooOrgNetworkIndex"
                >领域机构合作网络</router-link>
              </li>
              <li>
                <router-link
                  @click.native="setPath('合作网络','人员机构合作网络','/cooOrgRelationIndex')"
                  to="/cooOrgRelationIndex"
                >人员机构合作网络</router-link>
              </li>
            </ol>
          </li>
          <li @click="bandleClick(4)">
            <a :class="[mark==4?'on':'']" href="#">关联路径</a>
            <ol class="nav-4">
              <!-- <li>
                <router-link
                  @click.native="setPath('关联路径','人员关联路径','/associatedpathIndex')"
                  to="/associatedpathIndex"
                >人员关联路径</router-link>
              </li>
              <li>
                <router-link @click.native="setPath('关联路径','机构关联路径','/AssociatedpathDetails')" to="/AssociatedpathDetails">机构关联路径</router-link>
              </li>-->
              <li>
                <router-link
                  to="/associatedpathIndex"
                  @click.native="setPath('关联路径','人员关联路径','/associatedpathIndex')"
                >人员关联路径</router-link>
              </li>
              <li>
                <router-link
                  to="/AssociatedpathDetails"
                  @click.native="setPath('关联路径','机构关联路径','/AssociatedpathDetails')"
                >机构关联路径</router-link>
              </li>
            </ol>
          </li>
          <li @click="bandleClick(5)">
            <a :class="[mark==5?'on':'']" href="#">科研社区</a>
            <ol class="nav-5">
              <li>
                <router-link
                  to="/collaborate"
                  @click.native="setPath('科研社区','人才紧密合作社区','/collaborate')"
                >人才紧密合作社区</router-link>
              </li>
              <li>
                <router-link
                  to="/similar"
                  @click.native="setPath('科研社区','研究兴趣相似社区','/similar')"
                >研究兴趣相似社区</router-link>
              </li>
            </ol>
          </li>
          <li @click="bandleClick(6)">
            <a :class="[mark==6?'on':'']" href="#">研究热点</a>
            <ol class="nav-6">
              <li>
                <router-link
                  to="/Hotmap"
                  @click.native="setPath('研究热点','关键词热度查询','/hotmap')"
                >关键词热度查询</router-link>
              </li>
              <li>
                <router-link
                  to="/hotatlas"
                  @click.native="setPath('研究热点','领域热点发展趋势','/hotatlas')"
                >领域热点发展趋势</router-link>
              </li>
              <li>
                <router-link
                  to="/hottrend"
                  @click.native="setPath('研究热点','高频热词共现图谱','/hottrend')"
                >高频热词共现图谱</router-link>
              </li>
              <li>
                <router-link
                  to="/hotcluster"
                  @click.native="setPath('研究热点','热点主题聚类图谱','/hotcluster')"
                >热点主题聚类图谱</router-link>
              </li>
            </ol>
          </li>
          <li @click="bandleClick(7)" class="clear">
            <!-- <a :class="[mark===7?'on':'']" href="hitlist">用户指南 </a> -->
            <!-- <a href="hitlist" :class="[mark===7?'on':'']">黑名单</a> -->
            <a href="http://10.0.88.149:8080/person" target="_blank">态势感知</a>
          </li>
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
      loginUrl: "javascript:void(0);", //登录地址
      username: "" //用户信息也是token信息
    };
  },
  created() {},
  methods: {
    handlePathIndex () {
      this.$router.push({path: "/"})
    },
    //路由跳转
    handleRouter(path) {
      this.$router.push({ path: "/second" });
    },
    bandleClick(val) {
      this.mark = val;
      window.sessionStorage.setItem("active", val);
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
    //点击登录
    // handlelogin(){
    //      this.$axios.get('http://159.226.22.222/cas/login?service=http://10.0.88.161:81/').then(res=>{
    //          console.log(res);
    //      })
    // }
  },
  mounted() {
    //   var url = window.location.href;
    // var startindex = url.indexOf('CURRENTCASUSER=');
    //  if(startindex !== -1){
    //     var endindex = url.indexOf('&ticket');
    //     var token = url.substring(startindex,endindex);
    //     sessionStorage.setItem('token',JSON.stringify(token));
    // }else{
    //      window.location.href =' http://159.226.22.222/cas/login?service=http://localhost:81/science';
    // }
    // console.log(document.cookie)

    var cookie = document.cookie;
    console.log(cookie);
    if (cookie.indexOf('nssc-user') == 0) {
      // let regex = /\=(.+?)\&/g;
      // this.username = cookie.match(regex);
     this.username = cookie.split('=')[1].split('&')[0]
    }

    // if (sessionStorage.getItem("active")) {
    //   let active = window.sessionStorage.getItem("active");
    //   this.mark = active;
    // } else {
    //   this.mark = 1;
    // }

    // if (sessionStorage.getItem("token")) {
    //   var token = JSON.parse(sessionStorage.getItem("token"));
    //   this.username = token.substring(token.indexOf("=") + 1);
    // } else {
    //   this.username = "";
    // }
  }
};
</script>
<style >
</style>
<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .touxiang {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
.on {
  background-color: #e9543f;
}

@import "../../../style/hearder.scss";
</style>

