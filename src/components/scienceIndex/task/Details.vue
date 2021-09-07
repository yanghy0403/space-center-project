<template>
  <div class="sc-details">
    <div class="task_container">
      <!-- 1.详细信息 -->
      <div class="taskInfo">
        <div class="left">
          <img src="../../../assets/images/journalBg_img.png" alt />
        </div>
        <div class="right">
          <Row class="info">
            <i-col span="8">
              <label>中文名称:</label>
              <span>中国月球探测工程</span>
            </i-col>
            <i-col span="8">
              <label>首席科学家:</label>
              <span>欧阳自远</span>
            </i-col>
            <i-col span="8">
              <label>别称:</label>
              <span>嫦娥工程</span>
            </i-col>
          </Row>
          <Row class="info">
            <i-col>
              <i-col span="8">
                <label>英文名称:</label>
                <span>Chang e project</span>
              </i-col>
              <i-col span="8">
                <label>牵头单位:</label>
                <span>国家航天局</span>
              </i-col>
            </i-col>
          </Row>
          <Row class="info sc_color">
            <i-col span="24">
              <label>参与研制单位:</label>
              <span>中国科学院国家空间科学中心</span>
              <span>中国科学院国家天文台</span>
              <span>中国运载火箭技术研究院</span>
            </i-col>
          </Row>
          <Row class="info sc_color">
            <i-col span="24">
              <label>任务组成:</label>
              <span>嫦娥一号</span>
              <span>嫦娥二号</span>
              <span>嫦娥三号</span>
              <span>嫦娥四号</span>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="sc-ri-box">
        <div class="sc-box-top">
          <span class="active">工程知识网络图</span>
        </div>
        <div class="sc-box-content">
          <ProjectKnowledge />
        </div>
      </div>
      <!-- 工程介绍 -->
      <div class="sc-ri-box">
        <div class="sc-box-top">
          <span class="active">工程介绍</span>
        </div>
        <div class="sc-box-content">
          <p
            class="projectIntroduction"
          >发射人造地球卫星、载人航天和深空探测是人类航天活动的三大领域。重返月球，开发月球资源，建立月球基地已成为世界航天活动的必然趋势和竞争热点。开展月球探测工作是我国迈出航天深空探测第一步的重大举措。实现月球探测将是我国航天深空探测零的突破。月球已成为未来航天大国争夺战略资源的焦点。月球具有可供人类开发和利用的各种独特资源，月球上特有的矿产和能源，是对地球资源的重要补充和储备，将对人类社会的可持续发展产生深远影响。中国探月是我国自主对月球的探索和观察，又叫做嫦娥工程。国务院正式批准统月探测工程立项后，绕月探测工程领导小组将工程命名为’娥工程、将第一颗绕月卫星命名为“嫦娥一号。嫦娥一号”卫星由中国空间技术研究院承担研制，主要用于获取月球表面三维影像、分析月球表面有关物质元素的布特点、探测月壤厚度、探测地月空间环境等。[1] 嫦娥四号是嫦娥三号的备份星。而根据中国探月工程绕、“落、回"三步走战略。并计划在月球建立研究基地。</p>
        </div>
      </div>
      <!-- 科学目标与任务 -->
      <div class="sc-ri-box">
        <div class="sc-box-top">
          <span class="active">科学目标与任务</span>
        </div>
        <div class="sc-box-content">
          <div class="aimTask">
            <p>1、获取月球表面三维影像。划分月球表面的基本地貌构造单元，初步编制月球地质与构造纲要图，为后续优选软着陆提供参考依据。</p>
            <p>2、分析月球表面有用元素含量和物质类型的分布特点。对月球表面有用元素进行探测，初步编制各元索的月面分布图。</p>
            <p>3、探测月壤特性。探测并评估月球表面月壤层的厚度、月壤中-3的资源量。</p>
            <p>4、探测地月空间环境。记录原始太阳风数据，研究太阳活动对地月空间环境的影响。</p>
          </div>
        </div>
      </div>
      <!-- 领军人物 -->
      <div class="sc-ri-box">
        <div class="sc-box-top">
          <span class="active">领军人物</span>
        </div>
        <div class="sc-box-content">
          <Leader />
        </div>
      </div>
      <!-- 工程影响力 -->
      <div class="sc-ri-box">
        <div class="sc-box-top">
          <span class="active">工程影响力</span>
        </div>
        <div class="sc-box-content">
          <ProjectInfluence />
        </div>
      </div>
      <Tabs type="card" :animated="false">
        <Tab-pane label="论文">
            <Paper />
        </Tab-pane>
        <Tab-pane label="专利">标签二的内容</Tab-pane>
        <Tab-pane label="专著">标签三的内容</Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import ProjectKnowledge from "./modules/ProjectKnowledge";  // 工程知识
import Leader from "./modules/Leader"; // 领军任务
import ProjectInfluence from "./modules/ProjectInfluence";  // 工程影响力

import Paper from "./modules/tab/Paper";
export default {
  name: "taskdetails",
  components: {
    Leader,
    ProjectInfluence,
    Paper,
    ProjectKnowledge
  }
};
</script>

<style lang="scss" scope>
.task_container {
  width: 80%;
  height: 100%;
  margin: auto;
  .taskInfo {
    width: 100%;
    overflow: hidden;
    .left {
      float: left;
      width: 22%;

      img {
        width: 180px;
        height: 230px;
      }
    }
    .right {
      width: 75%;
      overflow: hidden;
      margin-top: 10px;
      .info {
        border-bottom: 1px dashed #ccc;
        line-height: 50px;
        label {
          font-size: 13px;
          margin-right: 10px;
        }
        span {
          font-size: 13px;
          margin-right: 10px;
        }
      }
      .sc_color span {
        color: #257bd1;
      }
    }
  }
}
</style>