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
        <!-- <Panel key="1">
          <label>领域</label>
          <ul slot="content" v-if="areaData.length !== 0">
            <li
              v-for="(item,index) in areaData"
              :key="index + 1"
              @click.stop="handleClick(item,'领域',false)"
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
        </Panel> -->
        <Panel key="1">
          <label>作者&nbsp;Top10</label>
          <ul slot="content" v-if="author_personName.length !== 0">
            <li
              v-for="(item,index) in author_personName"
              :key="index + 1"
              @click.stop="handleClick(item,'作者',false)"
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
        <!-- <Panel key="3">
          <label>出版社</label>
          <ul slot="content" v-if="publisher_organizationName.length !== 0">
            <li
              v-for="(item,index) in publisher_organizationName"
              :key="index + 1"
              @click.stop="handleClick(item,'出版社',false)"
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
        </Panel> -->
        <!-- <Panel key="4">
          <label>学会</label>
          <ul slot="content" v-if="learnName.length !== 0">
            <li
              v-for="(item,index) in learnName"
              :key="index + 1"
              @click.stop="handleClick(item,'学会',false)"
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
        </Panel> -->
        <!-- <Panel key="5">
          <label>会议</label>
          <ul slot="content" v-if="conferenceName.length !== 0">
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
        </Panel> -->

        <Panel key="2">
          <label>年度</label>
          <div slot="content">
            <Collapse accordion v-model="yearValues">
              <Panel name="6-1">
                <label>范围筛选</label>
                <ul slot="content" class="yearUl">
                <li @click.stop="handleYearClick(1)">
                  <p><Icon type="md-arrow-dropright" />一年以上</p>
                </li>
                  <li @click.stop="handleYearClick(2)">
                    <p><Icon type="md-arrow-dropright" />二年以上</p>

                  </li>
                  <li @click.stop="handleYearClick(3)">
                    <p><Icon type="md-arrow-dropright" />三年以上</p>
                  </li>
                </ul>
              </Panel>
              <Panel name="6-2">
                <label> 精确筛选</label>
                <ul slot="content" v-if="year.length !== 0">
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
    values: ['0','1'],
    yearValues : ['6-1','6-2'],
    istrue: 8,
    newData: [],
    addData: {},
    areaData: [],
    author_personName: [],
    publisher_organizationName: [],
    learnName: [],
    conferenceName: [],
    year:[]
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
      this.areaData = news[0]["area"];
      this.author_personName = news[1]["author.personName"];
      this.publisher_organizationName = news[2]["publisher.organizationName"];
      this.learnName = news[3]["learn.name"];
      this.conferenceName = news[4]["conference.conferenceName"];
      this.year = news[5]["year"];
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

    handleYearClick(val){
        this.$emit("ran",{value:val});
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
.sc-warp {
  /deep/ .ivu-collapse {
    border: 0px solid #fff  !important;
    background-color: #fff !important;
  }
  .yearUl {
    li {
      padding-left: 30px ;
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