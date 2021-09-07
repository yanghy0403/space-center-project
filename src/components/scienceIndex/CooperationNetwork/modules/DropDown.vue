<template>
  <div class="drop-box">
    <input type="text" v-model="val" @focus="focusfns" @blur="blurfns" placeholder="输入格式：“人员姓名：机构名称”" />
    <div class="poptip-warp" v-if="show">
      <div class="mask" @click.stop="handleClick('close')"></div>
      <div class="poptip-box">
        <div class="border">
          <div class="poptip-popper scrollbar">
            <ul v-if="dataList.length!==0">
              <li
                v-for="(item,i) in dataList"
                :key="i+'xc'"
                @click.stop="handleClick(item)"
              >{{item.name}}</li>
            </ul>
            <!-- class="loading" -->
            <!-- <div v-else class="zanwu">
              <span>暂无内容</span>
            </div> -->
            <div v-if="loadingState" class="loading-box">
              <Icon type="ios-loading" size="26" class="demo-spin-icon-load"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "drop",
  data() {
    return {
      val: "",
      show: false,
      loadingState: false,
      dataList: []
    };
  },
  watch: {
    loading(value) {
      this.loadingState = value;
      // console.log(value);
    },
    val(value) {
      this.val = value;
      this.handleChange(value);
    },
    // name(value) {
    //   this.val = value;
    //   // this.handleChange(value);
    // },
    value(val) {
      if (val) {
        this.dataList = val;
      }
    }
  },
  props: ["value", "loading", "name"],
  mounted() {
    this.loadingState = this.loading;
    this.val = this.name;
    if (this.value) {
      this.dataList = this.value;
    }
  },
  methods: {
    getData() {},
    handleChange(val) {
      if (this.show) {
        this.$emit("on-change", val);
      }
    },
    handleClick(val) {
      this.show = false;
      if (val !== "close") {
        this.val = val.name;
        this.$emit("on-click", val);
      }
    },
    setName(value) {
     this.val = value?value:'';
    },
    focusfns() {
      this.show = true;
    },
    blurfns() {}
  }
};
</script>
<style lang="scss" scoped>
.loading-box {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #57a3f3;
  background-color: rgba(255, 255, 255, 0.4);
}
.scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #dfdfdf;
}

.scrollbar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: rgb(247, 247, 247);
}

.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}

.drop-box {
  input {
    line-height: 1.5;
    padding: 8px 8px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    width: 90%;
    height: 100%;
  }
  .border {
    padding: 3px 0;
  }
  .poptip-popper {
    //  margin: 10px 0;
    overflow-y: auto;
    max-height: 250px;
    > div {
      margin: 3px 0px;
    }
    ul {
      li {
        cursor: pointer;
        margin: 5px 8px;
        border-bottom: 1px solid #eee;
        white-space: normal nowrap;
        padding: 0 8px;
      }
      li:hover {
        color: #2d65bf;
      }
    }
  }
  .poptip-box {
    position: absolute;
    top: 11px;
    background-color: #fff;
    padding: 5px 0px;
    border: 1px solid #eee;
    border-radius: 4px;
    z-index: 1000;
  }
  .poptip-warp {
    position: relative;
    color: #333;
    font-weight: 400;
    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  .poptip-warp:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    top: 5px;
    left: 20px;
    z-index: 1000;
    border-width: 1px 0 0 1px;
    border-style: solid;
    border-color: #e5e5e5;
    background: #fff;
    transform: rotate(45deg);
    transition: opacity 0.3s ease-in;
  }
}
.zanwu {
  padding: 0 15px;
}
</style>

