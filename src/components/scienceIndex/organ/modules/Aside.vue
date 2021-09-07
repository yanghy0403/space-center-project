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

      <Collapse v-model="values">
      <div class="prompt">
      <img src="../../../../assets/images/promptTitle.png" alt="">
      <span>点击检索栏下的重置按钮返回上级</span>
      </div>
        <Panel key="1">
          <label>机构类型&nbsp;Top10</label>
          <ul slot="content" v-if="organType.length !== 0">
            <li
              v-for="(item,index) in organType"
              :key="index + 1"
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
              <p>
                <Icon type="md-arrow-dropright" />暂无数据
              </p>
            </li>
          </ul>
        </Panel>
        <Panel key="2">
          <label>地区（省）&nbsp;Top10</label>
          <ul slot="content" v-if="regionData.length !== 0">
            <li
              v-for="(item,index) in regionData"
              :key="index + 1"
              @click.stop="handleClick(item,'地区（省）',false)"
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
              <p>
                <Icon type="md-arrow-dropright" />暂无数据
              </p>
            </li>
          </ul>
        </Panel>
        <Panel key="3">
          <label>国内国际机构</label>
          <ul slot="content" v-if="languageData.length !== 0">
            <li
              v-for="(item,index) in languageData"
              :key="index + 1"
              @click.stop="handleClick(item,'国内国际机构',false)"
            >
              <p v-if="item.name == 'chinese'">
                <Icon type="md-arrow-dropright" />国内
              </p>
              <p v-else>
                <Icon type="md-arrow-dropright" />国际
              </p>
              <span>{{'['+item.value+']'}}</span>
            </li>
          </ul>
          <ul slot="content" v-else>
            <li>
              <p>
                <Icon type="md-arrow-dropright" />暂无数据
              </p>
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
  data: () => ({
    values: ["0", "1", "2"],
    istrue: 1,
    newData: [],
    addData: {},
    organType: [], // 机构名称
    regionData: [], // 地区
    languageData: [] // 国内国际
  }),
  props: ["query", "data", "typeArr", "mark"],
  computed: {
    additional() {
      return this.$store.state.achieve.addData; //监听附加数据
    }
  },
  watch: {
    data(news) {
      this.newData = news;
      this.organType = news[0]["type"];
      this.regionData = news[1]["province"];
      this.languageData = news[2]["language"];
    },
    additional(news) {
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
      console.log(mark);
      val.mark = false;
      this.$emit("calclick", { value: val, type, mark });
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