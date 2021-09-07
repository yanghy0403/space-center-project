<template>
  <div class="sc-warp">
    <aside>
      <ol v-if="query">
        <li
          v-for="(item,index) in query"
          @click.stop="handleRouter(item.oneNavName,item.towNavName,item.path)"
          :key="index+'nav'"
          :class="{active:istrue==index}"
        >{{item.towNavName?item.towNavName:item}}</li>
      </ol>
      <!-- <Collapse v-model="values">
        <Panel key="1">
          <label>国家</label>
          <ul slot="content" v-if="place1Data.length !==0">
            <li
              v-for="(item,index) in place1Data"
              :key="index + 1"
              @click.stop="handleClick(item,'职称',false)"
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
              <p><Icon type="md-arrow-dropright" />暂无数据</p>
            </li>
          </ul>
        </Panel>
      </Collapse> -->
    </aside>
  </div>
</template>
<script>
export default {
  name: "sc-warp",
  data: () => ({
    istrue: 4,
    values: ["0"],
    newData: [],
    addData: {},
    place1Data: []
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
      this.place1Data = news[0]["place1"];
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
      this.$router.push({ path: "/periodical", query: { journalId } });
      this.$store.state.variable.backTop(); //后返回顶部
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
</style>