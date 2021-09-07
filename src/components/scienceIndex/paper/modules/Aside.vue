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
      <Collapse v-model="values">
      <div class="prompt">
      <img src="../../../../assets/images/promptTitle.png" alt="">
      <span>点击检索栏下的重置按钮返回上级</span>
      </div>
       <Panel key="1">
          <label>国内国际发表</label>
          <ul slot="content" v-if="languageData.length !==0">
            <li
              v-for="(item,index) in languageData"
              :key="index + 3"
              @click.stop="handleClick(item,'国内国际发表',false)"
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
              <Icon type="md-arrow-dropright" />
              <p>暂无数据</p>
            </li>
          </ul>
        </Panel>
        <Panel key="2" v-if="markTab == 0">
          <label>期刊&nbsp;Top10</label>
          <ul slot="content" v-if="journalName.length!==0">
            <li
              v-for="(item,index) in journalName"
              :key="index + 1"
              @click.stop="handleClick(item,'期刊',false)"
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
        <Panel key="2" v-else-if="markTab == 1">
          <label>会议&nbsp;Top10</label>
          <ul slot="content" v-if="conferenceName.length!==0">
            <li
              v-for="(item,index) in conferenceName"
              :key="index + 1"
              @click.stop="handleClick(item,'会议',false)"
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
          <label>收录范围</label>
          <ul slot="content" v-if="includeData.length !==0">
            <li
              v-for="(item,index) in includeData"
              :key="index + 2"
              @click.stop="handleClick(item,'收录范围',false)"
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
        <Panel key="4">
          <label>学科领域&nbsp;Top10</label>
          <ul slot="content" v-if="subjectData.length !==0">
            <li
              v-for="(item,index) in subjectData"
              :key="index + 3"
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
              <Icon type="md-arrow-dropright" />
              <p>暂无数据</p>
            </li>
          </ul>
        </Panel>

        <Panel key="5">
          <label>年度</label>
          <div slot="content">
            <Collapse accordion v-model="yearValues">
              <Panel name="5-1">
                <label>范围筛选</label>
                <ul slot="content" class="yearUl">
                  <li @click.stop="handleYearClick(1,'a')">
                    <p>
                      <Icon type="md-arrow-dropright" />近一年
                    </p>
                  </li>
                  <li @click.stop="handleYearClick(2,'a')">
                    <p>
                      <Icon type="md-arrow-dropright" />近二年
                    </p>
                  </li>
                  <li @click.stop="handleYearClick(3,'a')">
                    <p>
                      <Icon type="md-arrow-dropright" />近三年
                    </p>
                  </li>
                  <li @click.stop="handleYearClick(3,'b')">
                    <p>
                      <Icon type="md-arrow-dropright" />三年以上
                    </p>
                  </li>
                </ul>
              </Panel>
              <Panel name="5-2">
                <label>精确筛选</label>
                <ul slot="content" v-if="year.length !==0">
                  <li
                    v-for="(item,index) in year"
                    :key="index + 1"
                    @click.stop="handleClick(item,'精确年份',false)"
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
            </Collapse>
          </div>
        </Panel>
      </Collapse>
    </aside>
  </div>
</template>
<script>
export default {
  name: "sc-warp",
  data: () => ({
    istrue: 5,
    newData: [],
    addData: {},
    journalName: [],
    subjectData:[],
    includeData: [],
    languageData: [],
    year: [],
    conferenceName: [],
    values: ["0", "1", "2", "3","4"],
    yearValues: ["5-1", "5-2"]
  }),
  props: ["query", "data", "typeArr", "mark", "markTab"],
  computed: {
    additional() {
      return this.$store.state.achieve.addData; //监听附加数据
    }
  },
  watch: {
    data(news, old) {
      this.newData = news;
      if (this.markTab == 0) {
        this.journalName = news[0]["journal.journalName"]; // 期刊
      }
      if (this.markTab == 1) {
        this.conferenceName = news[0]["conference.conferenceName"]; // 会议
      }
      this.includeData = news[1]["include"]; // 收录范围
      this.subjectData = news[2]['subject.rankName']; // 学科领域
      this.languageData = news[3]["language"]; // 国际国内
      this.year = news[4]["year"];
    },
    markTab(val) {
      this.markTab = val;
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
    //数组去重处理
    removeRepeat(val) {
      let filterArr = this.$store.state.transit.filterArr;
      if (filterArr.length !== 0) {
        return [val];
      } else {
        filterArr.push(val);
      }
      return filterArr;
    },
    //年份
    handleYearClick(val, type) {
      this.$emit("rangYear", { value: val, type });
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
.sc-warp {
  /deep/ .ivu-collapse {
    border: 0px solid #fff !important;
    background-color: #fff !important;
  }
  .yearUl {
    li {
      padding-left: 30px;
    }
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