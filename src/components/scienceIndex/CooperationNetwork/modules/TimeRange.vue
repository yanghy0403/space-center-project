 
<template>
  <!-- 开始 -->
  <div class="slider-container theme-green" style="width: 700px;margin-left: 80px;padding-top: 23px;">
    <div class="back-bar" ref="BackBar">
      <div
        class="selected-bar"
        ref="bar"
        :style="'width:'+barLeftWidth+'px; left:'+pointerLeft+'px;'"
      ></div>
      <div class="pointer low" @mousedown.stop="downAbleDummy" :style="'left:'+pointerLeft+'px;'"></div>
      <div class="pointer-label low" :style="'left:'+pointerLeft+'px;'">{{leftTip}}</div>
      <div
        class="pointer high last-active"
        @mousedown.stop="downAbleDummy"
        :style="'left: '+pointerRight+'px;'"
      ></div>
      <div class="pointer-label high" :style="'left:'+pointerRight+'px;'">{{rightTip}}</div>
      <div
        class="clickable-dummy"
        :class="[flag?'focused':'']"
        id="dummy"
        @mousedown.stop="downAbleDummy"
        @mousemove.stop="moveAbleDummy"
        @mouseup.stop="upAbleDummy"
        @mouseleave.stop="leaveAbleDummy"
        @click="clickAbleDummy"
      ></div>
    </div>
    <div class="scale">
      <span v-for="(item ,index) in array" :style="'left:'+insLeft*index+'px;'" :key="index+'23'">
        <ins style="margin-left: -13.5px;">{{item}}</ins>
      </span>
    </div>
  </div>
  <!-- 结束 -->
</template>
<script>
export default {
  data: () => ({
    array: [],
    flag: false,
    barWidth: 0,
    pointerLeft: 0,
    pointerRight: 0,
    barLeftWidth: 0,
    insLeft: 0,
    scaleLeft: 0,
    leftTip: "",
    rightTip: "",
    leftArray: [],
    startIndex: 0,
    endIndex: 0,
    dataArr: [
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019"
    ]
  }),

  mounted() {
    let data = this.dataArr;
    this.leftTip = data[0];
    this.rightTip = data[data.length - 1];
    let BackBar = this.$refs.BackBar;
    this.barLeftWidth = BackBar.offsetWidth; //宽度
    this.pointerRight = BackBar.offsetWidth; //宽度
    this.insLeft = BackBar.offsetWidth / (data.length - 1);
    // this.scaleLeft=this.insLeft-5;
    this.endIndex = data.length - 1;
    for (let index = 0; index < data.length; index++) {
      this.leftArray.push({
        time: data[index],
        left: this.insLeft * (index + 1)
      });
    }
    this.array = data;
  },
  methods: {
    downAbleDummy(e) {
      this.flag = true;
      // console.log(e.offsetX);
    },
    upAbleDummy(e) {
      this.flag = false;
    },
    leaveAbleDummy(e) {
      this.flag = false;
    },
    clickAbleDummy(e) {
      this.handleEvent(e.offsetX);
    },
    moveAbleDummy(e) {
      if (this.flag) {
        this.handleEvent(e.offsetX);
      }
    },
    handleEvent(value) {
      let bar = this.$refs.bar;
      this.barWidth = bar.offsetWidth; //宽度
      let len = value - this.pointerLeft;
      if (len > this.barWidth / 2) {
        if (value > this.pointerRight) {
          this.barLeftWidth = this.barLeftWidth + (value - this.pointerRight);
        } else {
          this.barLeftWidth = this.barLeftWidth - this.pointerRight + value;
        }
        this.pointerRight = this.pointerRight - this.pointerRight + value;
        for (let index = 0; index < this.leftArray.length; index++) {
          if (value < this.leftArray[index].left) {
            this.rightTip = this.leftArray[index].time;
            this.endIndex = index;
            break;
          }
        }
      } else {
        if (value > this.pointerLeft) {
          this.barLeftWidth = this.barLeftWidth - (value - this.pointerLeft);
        } else {
          this.barLeftWidth = this.barLeftWidth + this.pointerLeft - value;
        }
        this.pointerLeft = value;
        for (let index = 0; index < this.leftArray.length; index++) {
          if (value < this.leftArray[index].left) {
            this.leftTip = this.leftArray[index].time;
            this.startIndex = index;
            break;
          }
        }
      }
      // console.log(this.startIndex, this.endIndex);
      // console.log(this.dataArr[this.startIndex], this.dataArr[this.endIndex]);

      this.$emit("arrtime", {
        start: this.dataArr[this.startIndex],
        end: this.dataArr[this.endIndex]
      });
    }
  }
};
</script>
 <style lang="scss" scoped>
</style>
 