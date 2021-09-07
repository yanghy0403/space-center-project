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
          <label>出版周期</label>
          <ul slot="content" v-if="publishCycleData.length!==0">
            <li v-for="(item,index) in publishCycleData" :key="index + 1" @click.stop="handleClick(item,'出版周期',false)">
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
        <!-- <Panel key="2">
          <label>出版状态</label>
          <ul slot="content" v-if="statusData.length!==0">
            <li v-for="(item,index) in statusData" :key="index + 1" @click.stop="handleClick(item,'出版状态',false)">
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
        <Panel key="3">
          <label>综合因子</label>
          <ul slot="content" v-if="impactFactor.length!==0">
            <li v-for="(item,index) in impactFactor" :key="index + 1" @click.stop="handleClick(item,'综合因子',false)">
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
    </Collapse>
    </aside>
  </div>
</template>
<script>
export default {
  name: "sc-warp",
  data: () => ({
    istrue:3,
    newData: [],
    addData: {},
    publishCycleData: [],
    statusData: [],
    impactFactor: [],
    values: ['0','1','2'],
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
      this.publishCycleData = news[0]['publishCycle'];
      this.statusData = news[1]['status'];
      this.impactFactor = news[2]['impactFactor'];
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/talentaside.scss";
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