<template>
  <div class="sc-warp">
    <aside>
      <ol>
        <li
          v-for="(item,index) in query"
          @click.stop="handleRouter(item.oneNavName,item.towNavName,item.path)"
          :key="index+'nav'"
          :class="{active:istrue==index}"
        >{{item.towNavName?item.towNavName:item}}</li>
      </ol>
      <Collapse v-model="value1">
      <div class="prompt">
      <img src="../../../../assets/images/promptTitle.png" alt="">
      <span>点击检索栏下的重置按钮返回上级</span>
      </div>
        <!-- <Panel name="1">
          <label>研究领域</label>
          <ul slot="content" v-if="field">
            <li
              v-for="(item,index) in field"
              :key="index + 1"
              @click.stop="handleClick(item,'研究领域',false)"
            >
              <p>
                <Icon type="md-arrow-dropright" />
                {{item.name}}
              </p>
              <span>{{'['+item.value+']'}}</span>
            </li>
          </ul>
          <ul slot="content" v-else>
            <li>
              <p>暂无数据</p>
            </li>
          </ul>
        </Panel> -->
        <Panel name="2">
          <label>机构类型</label>
          <ul slot="content" v-if="organization">
            <li
              v-for="(item,index) in organization"
              :key="index+'title'"
              @click.stop="handleClick(item,'机构类型',false)"
            >
              <p>
                <Icon type="md-arrow-dropright" />
                {{item.name}}
              </p>
              <span>{{'['+item.value+']'}}</span>
            </li>
          </ul>
          <ul slot="content" v-else>
            <li>
              <p>暂无数据</p>
            </li>
          </ul>
        </Panel>
        <Panel name="3">
          <label>职称</label>
          <ul slot="content" v-if="currentTitle">
            <li v-for="(item,index) in currentTitle" :key="index + 1" @click.stop="handleClick(item,'职称',false)">
              <p>
                <Icon type="md-arrow-dropright" />
                {{item.name}}
              </p>
              <span>{{'['+item.value+']'}}</span>
            </li>
          </ul>
          <ul slot="content" v-else>
            <li>
              <p>暂无数据</p>
            </li>
          </ul>
        </Panel>

        <Panel key="4">
          <label>国内国际人才</label>
          <ul slot="content" v-if="languageData.length !==0">
            <li
                    v-for="(item,index) in languageData"
                    :key="index + 3"
                    @click.stop="handleClick(item,'国际国内',false)"
            >
              <p v-if="item.name == 'chinese'">
                <Icon type="md-arrow-dropright" />国内人才
              </p>
              <p v-else>
                <Icon type="md-arrow-dropright" />国际人才
              </p>
              <span>{{'['+item.value+']'}}</span>
            </li>
          </ul>
          <ul slot="content" v-else>
            <li>
              <Icon type="md-arrow-dropright" />
              <p>暂无数据</p>
            </li>
          </ul>
        </Panel>

      </Collapse>
    </aside>
  </div>
</template>
<script>
export default {
  name: "sc-warp",
  data() {
    return {
      value1:['1','2','3','4'],
      newData: [],
      addData: {},
      currentTitle: [], //职称
      organization: [], //机构
      field: [], //学科领域
      languageData: [],
      istrue: 0
    };
  },
  props: ["query", "data", "typeArr", "mark"],
  computed: {
    additional() {
      return this.$store.state.achieve.addData; //监听附加数据
    }
  },
  watch: {
    data(news, old) {
      this.newData = news;
      this.field = news[1]['subject.rankName'];
      this.organization = news[2]['currentOrganization.type'];
      this.currentTitle = news[0]["currentTitle.title"];
      this.languageData = news[3]["language"];
    },
    queryActive(news, old) {
      this.queryActiveMark = news;
    },
    additional(news, old) {
      this.addData = news;
    }
  },
  created() {
    this.addData = this.$store.state.achieve.addData;
  },
  methods: {
    selected(oneNavName) {
      this.active = oneNavName;
    },
    //路由跳转
    handleRouter(oneNavName, towNavName, path) {
      // this.style.backgroundColor= '#E9543F'
      // console.log(this)
      if (path) {
        let positionArr = [
          { pathName: oneNavName },
          { pathName: towNavName, routerName: path, mark: true }
        ];

        this.$store.commit("setPosition", positionArr);
        this.$router.push({ path });
        //this.$store.state.variable.backTop(); //请求成功后返回顶部
      }
    },
    handleClick(val, type, mark) {
      val.mark = false;
      this.$emit("calclick", { value: val, type, mark });
      let data = this.removeRepeat({ value: val, type, mark });
      this.$store.commit("setFilterArr", data);
    },
    handleClicks(val, type, mark) {
      //  console.log(val);
      //  console.log(type);

      val.mark = false;
      this.$emit("calclick", { value: val, type, mark });
      let data = this.removeRepeat({ value: val, type, mark });
      this.$store.commit("setFilterArr", data);
    },
    //其他分组跳转
    handleImgRouter(journalId) {
      let positionArr = this.$store.state.variable.position.slice(0, 3);
      positionArr.push({
        pathName: "期刊详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path: "/periodical", query: { journalId } });
      //this.$store.state.variable.backTop(); //后返回顶部
    },
    //数组去重处理
    removeRepeat(val) {
      let filterArr = this.$store.state.transit.filterArr;
      if (filterArr.length !== 0) {
        return [val];
      } else {
        filterArr.push(val);
      }
      return filterArr;
    }
  },
  mounted() {
    // console.log('=++++++++')
    // console.log(this.field);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/talentaside.scss";
.fa-times:hover {
  color: blue;
}
.sc-additional {
  img,
  h3 {
    cursor: pointer;
  }
  > h3:hover {
    color: #1abc9c;
  }
}
.prompt {
  margin-bottom: 10px;
  img {
    width: 15px;
  }
  span {
    line-height: 15px;
    margin-left: 8px;
  }
}
</style>