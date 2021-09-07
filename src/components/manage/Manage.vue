<template>
   <div class="main">
   <Header />
     <MapPosition v-if="isShow"/>
      <div class="sc-query">
        <div class="manage">
          
                <div class="menu">
                        <Menu active-name="1-1" :open-names="['1']" :theme="theme2" accordion>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                关键词管理
                            </template>
                            <MenuItem name="1-1" >  
                                <router-link tag="a" to="/hitlist">黑名单管理</router-link>
                            </MenuItem>
                            
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                权限管理
                            </template>
                             <MenuItem name="2-1" >  
                                <router-link tag="a" to="/authority">权限管理</router-link>
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </div>
                <div class="column">
                    <router-view></router-view>
                </div>
        </div>
   </div>
   <Footer />
   
  </div>
</template>

<script>

import Header from "../scienceIndex/public/Header";
import Footer from "../scienceIndex/public/Footer";
import MapPosition from "../scienceIndex/public/MapPosition";
export default {
 name:'Manage',
 data(){
     return {
           theme2: 'light',
            isShow: false
     }
 },
  components: {
    Header,
    Footer,
    MapPosition
  },

}
</script>

<style scoped lang='scss'>
.manage{
      display: flex;
      justify-content: flex-start;
      align-items:flex-start;
      width: 100%;
     
      padding:10px;
      .menu{
           width: 21%;
           margin-right: 20px;
            background: #fff;
            a{
                display: block;
            }
      }
      .column{
           width: 78%;
           background: #fff;
           padding: 10px;
      }
}
</style>