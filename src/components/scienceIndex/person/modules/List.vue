<template>
  <div class="sc-warp">
    <section>
      <div class="sc-top-box" v-if="topshow">
        <!-- <div class="sc-title">检索到&nbsp;{{number}}&nbsp;个人</div> -->
        <!-- <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native ="sortFieldClick('')" id="不传值">相关度</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('influence')" id="impactFactor.fullImpact">影响力</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('referenceNum')" id="impactFactor.complexImpact">被引频次</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('','0')" id="不传值">相关度</li>
              <li :class="{activeColor:cur == 1}" @click="sortFieldClick('influence','1')" id="impactFactor.fullImpact">影响力</li>
              <li :class="{activeColor:cur == 2}" @click="sortFieldClick('referenceNum','2')" id="impactFactor.complexImpact">被引频次</li>
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number}}&nbsp;个人</span>
          </div>
        </div>
        <!-- <div class="sc-tab">
          <p
            v-for="(item,index) in filterArr"
            :key="index+'c'"
            @click.stop="handleDown(item,index)"
            :class="[mark===index?'active':'']"
          >
            {{item.value.name}}
            <Icon type="md-close" @click.stop="handleRemove(item,index)" />
          </p>
        </div>-->
      </div>
      <transition name="show">
        <ul class="sc-loading-ul sc-list" v-if="!loading">
          <li v-for="(item ,index) in data" :key="index+'v'">
            <div class="flex">
              <div class="sc-left" @click.stop="handleRouter('/persondetails',item.personId)">
              <img :src="item.picture" alt="">
                <!-- <img v-else src="../../../../assets/images/001.png" :alt="item.chineseName" class="img" /> -->
              </div>
              <div class="sc-right">
                <h3>
                  <a
                    style="color:#1843A3;"
                    href="javascript:void(0);"
                    v-html="item.name"
                    @click.stop="setPath(item.name?item.name:'未知','/persondetails',item.personId)"
                  ></a>
                  <div v-if="item.outstanding">
                    <span
                      v-for="(subitem,k) in item.outstanding"
                      :key="k+'b'"
                    >{{subitem.name?subitem.name:'未知'}}</span>
                  </div>
                </h3>
                <div class="sc-box">
                  <div class="sc-bottom">
                    <p>
                      <label>单位：</label>
                      <span
                        class="personOrg"
                        @click.stop="setPathOrg(item['currentOrganization'].organizationName?item['currentOrganization'].organizationName:'未知','/organdetails',item['currentOrganization'].organizationId)"
                      >{{item['currentOrganization'].organizationName?item['currentOrganization'].organizationName:'未知'}}</span>
                    </p>
                    <!-- <p>
                      <label>职称：</label>
                      <span v-if="item.currentTitle !== 'null'"
                        v-for="(list,index) in item.currentTitle"
                        :key="index + 'i'"
                      >{{list.title?list.title:'未知'}}</span>
                    </p> -->
                  </div>
                  <div class="sc-top">
                    <div>
                      <label>影响力：</label>
                      <span>{{item.influence}}</span>
                    </div>
                    <div>
                      <label>论文数：</label>
                      <span>{{item.total}}</span>
                    </div>
                    <div>
                      <label>被引数：</label>
                      <span>{{item.referenceNum}}</span>
                    </div>
                    <div>
                      <label>专著：</label>
                      <span>{{item.monographNum}}</span>
                    </div>
                    <div>
                      <label>专利：</label>
                      <span>{{item.patentNum}}</span>
                    </div>
                  </div>
                  <div class="sc-tag">
                    <label>研究领域：</label>
                    <span v-for="(subItem,k) in item.subject" :key="k+'n'">{{subItem.rankName+ '；'}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </transition>
      <div class="loading-height" v-if="loading">
        <Spin fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
        <div v-if="!loading&&data.length===0" class="sc-box-content no-data border-bottom">暂无数据</div>
      </div>
    </section>
  </div>
</template>

<script>
import API from "../../../../api/index.js";
import Radar from "./Radar";
export default {
  name: "ts-list",
  components: {
    Radar
  },
  data() {
    return {
      mark: 0,
      state: true,
      cur:null
    };
  },
  props: ["data", "total", "loading", "topshow", "number","curVal"],
  computed: {
    filterArr() {
      // this.mark = this.$store.state.transit.filterArr.length - 1;
      // return this.$store.state.transit.filterArr;
    }
  },
  watch: {
    data(news, old) {
      // console.log(news,old);
      // this.handleData(news);
    },
    curVal(news) {
      this.cur = news;
    }
    // loading(newVal, oldVal) {
    //   this.loading = newVal;
    // }
  },
  created() {
    this.handleData(this.data);
  },
  mounted() {
    //  console.log(props.data);
    //  console.log(f)
  },
  methods: {
    handleData(news) {},

    // 判断是否为null
    isNull(tmp) {},
    //排序
    sortFieldClick(val,cur) {
      if(val == '') {
        this.cur = 0;
      }else if(val == 'influence') {
        this.cur = 1;
      }else if(val == 'referenceNum') {
        this.cur = 2;
      }
      this.$emit("sortclick", { value: val,num:cur });
    },
    //导航坐标
    setPath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "个人画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.handleRouter(path, personId);
    },
    // //路由跳转
    handleRouter(path, personId) {
      this.$router.push({ path, query: { personId } });
      //this.$store.state.variable.backTop(); //后返回顶部
    },
    // 机构跳转
    setPathOrg(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "机构画像（" + name + "）",
        routerName: "/"
      });

      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId: id } });
      // this.handleRouter(path, id, mark);
    },
    //从工作经历表中选择startDate最大的日期
    getMax(arr) {},
    handleRemove(val, index) {},
    handleDown(val, index) {},
    //去重
    uniq(array) {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/talentlist.scss";
.sc-top-box {
  position: relative;
  /deep/ .ivu-dropdown {
    bottom: 10px;
    right: 20px;
    .ivu-dropdown-rel {
      a {
        font-size: 15px;
        color: #1843a3;
      }
    }
  }
}
.sc-warp {
  background: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  margin-top: 10px;
}
.img {
  width: 100px;
  height: 120px;
  cursor: pointer;
}
.personOrg {
  color: #666;
  cursor: pointer;
}
.personOrg:hover {
  color: #1843a3;
  text-decoration: underline;
}
.sc-tag {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>