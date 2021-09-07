<template>
  <div class="sc-warp">
    <aside>
      <ol v-if="query">
        <li
          v-for="(item,index) in query"
          @click.stop="handleRouter(item.oneNavName,item.towNavName,item.path)"
          :key="index+'nav'"
        >{{item.towNavName?item.towNavName:item}}</li>
      </ol>
      <div v-for="(itemTitle,index) in typeArr" :key="index+'title'">
        <h4>{{itemTitle}}</h4>
        <ul v-if="mark!==itemTitle">
          <li v-for="(item,i) in newData[index]" @click.stop="handleClick(item,itemTitle,false)" :key="i+'title'">
            <p>
              <Icon type="md-arrow-dropright"/>
              {{item.name}}
            </p>
            <span>{{'['+item.value+']'}}</span>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item,j) in newData[index]" :key="j+'n'">
            <p>
              <!-- <Icon type="md-arrow-dropright"/> -->
              {{item.name}}
            </p>
            <span @click.stop="handleClick(item,itemTitle,true)">
              <i class="fa fa-times fa-lg"></i>
            </span>
          </li>
        </ul>
      </div>
    </aside>
    <!-- 附加内容 -->
    <!-- <div class="sc-additional" v-if="typeArr&&typeArr[0]==='基本信息'">
      <img
        :src="addData.url"
        :alt="addData.chineseTitle"
        @click.stop="handleImgRouter(addData.journalId)"
      >
      <h3 @click.stop="handleImgRouter(addData.journalId)">{{addData.chineseTitle}}</h3>
      <h4>{{addData.englishTitle?addData.englishTitle:'未知'}}</h4>
      <p>ISSN：{{addData.issue}}</p>
      <p>
        收录情况：
        <span v-for="(item,m) in addData.include" :key="m+'s'">{{item.name+'；'}}</span>
      </p>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "sc-warp",
  data: () => ({
    newData: [],
    addData: {}
  }),
  props: ["query", "data", "typeArr", "mark"],
  computed: {
    additional() {
      return this.$store.state.achieve.addData; //监听附加数据
    }
  },
  watch: {
    data(news, old) {
      this.newData = news;
    },
    additional(news, old) {
      this.addData = news;
    }
  },
  created() {
    this.addData = this.$store.state.achieve.addData;
  },
  methods: {
    //路由跳转
    handleRouter(oneNavName, towNavName, path) {
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
    //其他分组跳转
    handleImgRouter(journalId) {
      let positionArr = this.$store.state.variable.position.slice(0, 3);
      positionArr.push({
        pathName: "期刊详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path:'/periodical', query: { journalId } });
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/talentaside.scss";
.fa-times:hover {
  color: blue;
}
.sc-additional{
  img,h3{
    cursor: pointer;
  }
  >h3:hover{
      color: #1ABC9C;
  }
}
</style>