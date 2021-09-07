<template>
  <div class="cooperationList">
      <ul>
          <li v-for="(item,i) in contentData" :key="i+'v'">
              <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg" alt="">
              <div>
                  <!-- <h3 @click.stop="setPath(item.name?item.name:'未知','/persondetails',item.personId)">{{item.name}}</h3> -->
                  <h3 @click.stop="handleDetails(item.personId)">{{item.name}}</h3>                  
                  <p>机构：<span @click.stop="setPath(item.org?item.org:'未知','/organdetails',item.orgId)">{{item.org}}</span></p>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: null
  }),
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      this.contentData = newVal;
      // this.getGraph();
    },
  },
  created() {
    this.contentData = this.data;

  },
  mounted() {
    this.contentData = this.data;

    
  },
  methods:{
     setPath(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
        positionArr.push({
          pathName: "机构画像（" + name + "）",
          routerName: "/"
        });
      
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId: id } });
    },
    handleDetails(personId){
        this.$emit('handle-details',personId);
     },
  },
  
};
</script>
<style lang="scss" scoped>
.cooperationList {
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            width: 49%;
            display: flex;
            padding: 8px 0px;
            margin-right: 1px;
            border-bottom: 1px dashed #ccc;
            img{
                display: inline-block;
                width: 25px;
                height: 25px;
                border-radius: 100%;
                margin-right: 10px;
            }
            >div{
                h3{
                    color:#5086C9;
                    cursor: pointer;
                    font-size: 13px;
                }
               p{
                   font-size: 12px;
                   font-weight: normal;
                   span {
                     cursor: pointer;
                   }
               }
            }
        }
    }
}
</style>