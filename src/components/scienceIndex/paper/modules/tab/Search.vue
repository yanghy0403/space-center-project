<template>
  <div class="search">
    <span>排序条件：</span>
    <Dropdown v-if="show?show[0]:true" placement="bottom-start" @on-visible-change="visibleChange1">
      <span>{{selectTime}}</span>
      <i class="fa" :class="[isShow1?'fa-sort-desc':'fa-sort-up']"></i>
      <Dropdown-menu slot="list">
        <Dropdown-item @click.native="handleClick('按时间降序','a',1)" :selected="selected1==='a'">按时间降序</Dropdown-item>
        <Dropdown-item @click.native="handleClick('按时间升序','b',1)" :selected="selected1==='b'">按时间升序</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
    <Dropdown v-if="show?show[1]:true" placement="bottom-start" @on-visible-change="visibleChange2">
      <span>{{selectLead}}</span>
      <i class="fa" :class="[isShow2?'fa-sort-desc':'fa-sort-up']"></i>
      <Dropdown-menu slot="list">
        <Dropdown-item @click.native="handleClick('按被引降序','a',2)" :selected="selected2==='a'">按被引降序</Dropdown-item>
        <Dropdown-item @click.native="handleClick('按被引升序','b',2)" :selected="selected2==='b'">按被引升序</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
  </div>
</template>

<script>
import { fail } from "assert";
export default {
  name: "foot",
  data() {
    return {
      contentData: [],

      selectTime: "按时间降序",
      selected1: "a",
      isShow1: false,

      selectLead: "按被引降序",
      selected2: "a",
      isShow2: false
    };
  },
  props: ["show"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
    }
  },
  mounted() {
    this.contentData = this.data;
  },
  methods: {
    visibleChange1(val) {
      this.isShow1 = val;
    },
    visibleChange2(val) {
      this.isShow2 = val;
    },
    handleClick(val, mark, group) {
      switch (group) {
        case 1:
          this.selected1 = mark;
          this.selectTime = val;
          break;
        case 2:
          this.selected2 = mark;
          this.selectLead = val;
          break;
        default:
          break;
      };
      this.$emit("selectObj", {
        key: mark,
        value: val,
        group: group
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  margin: 0px 10px;
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
  > span {
    margin-right: 5px;
  }
  > div {
    cursor: pointer;
    margin-right: 25px;
    color: #2d8cf0;
    i {
      margin-left: 5px;
    }
  }
}
</style>

