<template>
  <div class="sc-warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;个机构</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native ="sortFieldClick('')" id="不传值">相关度</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('influence')" id="impactFactor.fullImpact">影响力</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('referenceNum')" id="impactFactor.complexImpact">被引频次</DropdownItem>
          </DropdownMenu>
        </Dropdown> -->
         <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('','0')" id="不传值">相关度</li>
              <li :class="{activeColor:cur == 1}" @click="sortFieldClick('influence','1')" id="impactFactor.fullImpact">影响力</li>
              <li :class="{activeColor:cur == 2}"
                @click="sortFieldClick('referenceNum','2')"
                id="impactFactor.complexImpact"
              >被引频次</li>
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number?number:0}}&nbsp;个机构</span>
          </div>
        </div>
        <!-- <div class="sc-tab">
          <p
            v-for="(item,index) in filterArr"
            :key="index+'m'"
            @click.stop="handleDown(item,index)"
            :class="[mark===index?'active':'']"
          >
            {{item.value.name}}
            <Icon type="md-close" @click.stop="handleRemove(index)" />
          </p>
        </div> -->
       
      </div>
      <transition name="show">
        <ul class="sc-loading-ul" v-if="!loading">
          <li v-for="(item) in data" :key="item.organizationId">
            <div class="flex">
              <div class="sc-left" @click.stop="handleRouter('/organdetails',item.organizationId)">
                <!-- <img :src="item.picture" v-on:error.once="moveErrorImg($event)" /> -->
                <img :src="item.picture" alt="">
              </div>
              <div class="sc-right">
                <h3>
                  <a style="color: #1843A3;"
                    v-html="item.name"
                    href="javascript:void(0);"
                    @click.stop="setPath(item.name?item.name:'未知','/organdetails',item.organizationId)"
                  ></a>
                </h3>
                <div class="sc-box">
                  <div class="sc-div">
                    <p>
                      <label>通讯地址：</label>
                      <span>{{item.address}}</span>
                    </p>
                  </div>
                  <div class="sc-div sc-fl">
                    <p>
                      <label>项目数：</label>
                      <span>{{item.projectNum}}</span>
                    </p>
                    <p>
                      <label>影响力：</label>
                      <span>{{item.influence}}</span>
                    </p>
                    <p>
                      <label>发文量：</label>
                      <span>{{item.total}}</span>
                    </p>
                    <p>
                      <label>被引量：</label>
                      <span>{{item.referenceNum}}</span>
                    </p>
                    <p>
                      <label>学者数：</label>
                      <span>{{item.personNum}}</span>
                    </p>
                  </div>
                  <div class="sc-div">
                    <label>关键词：</label>
                    <span v-for="(subItem,i) in item.keyWordData" :key="i">{{subItem.value + "；"}}</span>
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
export default {
  name: "or-warp1",
  data() {
    return {
      mark: 0,
      state: true,
      cur:null
    };
  },
  props: ["data", "total", "loading" , "number","curVal"],

  computed: {
    filterArr() {
      this.mark = this.$store.state.transit.filterArr.length - 1;
      return this.$store.state.transit.filterArr;
    }
  },
  watch: {
    data(news, old) {
      this.handleData(news);
    },
    curVal(news) {
      this.cur = news;
    },
    // total(val,oldVal) {
    //   console.log(val)
    //   this.total = val;
    // },
    loading(newVal, oldVal) {
      this.loading = newVal;
    }
  },
  created() {
    //返回重置导航坐标
    let PositionArr = this.$store.state.variable.position.slice(0, 2);
    this.$store.commit("setPosition", PositionArr);
  },
  mounted() {
    this.handleData(this.data);
  },
  methods: {
    moveErrorImg(event) {
      event.currentTarget.src = "http://10.0.87.40/org/moren.jpg";
    },
    // 数据处理
    handleData(news) {
      this.data = news;
      for (let i = 0; i < this.data.length; i++) {
        let keyWordData = [];
        let keywords = this.data[i].keywords;
        for (let j = 0; j < keywords.length; j++) {
          let temp = {};
          temp = {
            value: keywords[j]
          };
          keyWordData.push(temp);
        }
        this.data[i].keyWordData = keyWordData;
      }
    },
    //排序
    sortFieldClick(val,cur){
      if(val == '') {
        this.cur = 0;
      }else if(val == 'influence') {
        this.cur = 1;
      }else if(val == 'referenceNum') {
        this.cur = 2;
      }
        this.$emit("sortclick",{value:val,num:cur});
    },
    //导航坐标
    setPath(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      if (mark) {
        positionArr.push({
          pathName: "个人画像（" + name + "）",
          routerName: "/"
        });
      } else {
        positionArr.push({
          pathName: "机构画像（" + name + "）",
          routerName: "/"
        });
      }
      this.$store.commit("setPosition", positionArr);
      this.handleRouter(path, id, mark);
    },
    //路由跳转
    handleRouter(path, id, mark) {
      this.$router.push({ path, query: { orgId: id } });

      // this.$store.state.variable.backTop(); //请求成功后返回顶部
    },

    handleRemove(val, index) {
      this.$store.commit("updateFilterArr", index);
      this.$emit("deldata", val);
    },
    handleDown(val, index) {
      this.mark = index;
      let filterArr = this.$store.state.transit.filterArr;
      this.$emit("update", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/organlist.scss";
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
.sc-sort ul li {
  padding: 0 !important;
}
.sc-warp {
  background: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    margin-top: 10px;
}
.sc-div {
  width: 100%;
  font-size: 13px;
  color: #666;
  p {
    line-height: 30px;
  }
}
.sc-fl {
  width: 100%;
  overflow: hidden;
  p {
    float: left;
    margin-right: 10px;
    span {
      background: #f3f3f3;
      border-radius: 3px;
      padding: 0px 10px;
    }
  }
}
</style>