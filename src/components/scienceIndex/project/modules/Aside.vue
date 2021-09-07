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
          <img src="../../../../assets/images/promptTitle.png" alt />
          <span>点击检索栏下的重置按钮返回上级</span>
        </div>
        <!-- <Panel key="1">
          <label>项目来源</label>
          <ul slot="content" v-if="sourceData.length!==0">
            <li v-for="(item,index) in sourceData" :key="index + 1" @click.stop="handleClick(item,'项目来源',false)">
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
        </Panel>-->
        <Panel key="2">
          <label>项目类别&nbsp;Top10</label>
          <ul slot="content" v-if="projectType !== 0">
            <li
              v-for="(item,index) in projectType"
              :key="index + 1"
              @click.stop="handleClick(item,'项目类别',false)"
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
        <Panel key="3">
          <label>学科领域&nbsp;Top10</label>
          <ul slot="content" v-if="projectNatureData.length!==0">
            <li
              v-for="(item,index) in projectNatureData"
              :key="index + 1"
              @click.stop="handleClick(item,'学科领域',false)"
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
        <Panel key="4">
          <label>年份&nbsp;（近五年）</label>
          <ul slot="content">
            <li
              v-for="(item,idx) in yearDataList"
              :key="idx"
              @click.stop="handleClick(item,'年份',false)"
            >
              <p>
                <Icon type="md-arrow-dropright" />
                {{item.name}}
              </p>
              <span>{{'['+item.value+']'}}</span>
            </li>
            <div class="more" v-show="nomore">
              <span @click="handlemore" v-show="ismore">查看更多>></span>
              <span @click="handleshrink" v-show="!ismore">收起>></span>
            </div>
          </ul>
          <!-- <ul slot="content" v-else>
            <li>
              <Icon type="md-arrow-dropright" />
              <p>暂无数据</p>
            </li>
          </ul>-->
        </Panel>
      </Collapse>
    </aside>
  </div>
</template>
<script>
export default {
  name: "sc-warp",
  data: () => ({
    values: ["0", "1", "2", "3"],
    istrue: 2,
    newData: [],
    addData: {},
    sourceData: [],
    projectType: [],
    projectNatureData: [],
    yearData: [],
    yearDataList: [],
    ismore: false, //控制查看更多显示
    nomore: true //控制更多和收起显示
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
      this.sourceData = news[0]["source"];
      this.projectType = news[1]["type"];
      this.projectNatureData = news[2]["projectNature"];
      this.yearData = news[3]["year"];
      if (this.yearData.length > 5) {
        this.ismore = true;
        this.nomore = true;
        this.yearDataList = this.yearData.slice(0, 5);
      } else if (this.yearData.length <= 20) {
        this.nomore = false;
        this.yearDataList = this.yearData;
      }
    },
    additional(news) {
      this.addData = news;
    }
  },
  created() {
    this.addData = this.$store.state.achieve.addData;
  },
  mounted() {
    // this.handleYearData();
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
    },
    //查看更多数据
    handlemore() {
      this.ismore = false;
      this.yearDataList = this.yearData;
    },
    //点击收起查看更多
    handleshrink() {
      this.ismore = true;
      this.yearDataList = this.yearData.slice(0, 5);
    }
    // handleYearData() {
    //   if (this.table.length > 5) {
    //     this.ismore = true;
    //     this.nomore = true;
    //     this.yearDataList = this.yearData.slice(0, 15);
    //   } else if (this.table.length <= 20) {
    //     this.nomore = false;
    //     this.yearDataList = this.yearData;
    //   }
    // }
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
.active {
  overflow: hidden;
}
</style>