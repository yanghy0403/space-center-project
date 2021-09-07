<template>
  
       <div class="hitlist">
         
           
               <div class="oper">
                        <div class="search">
                            <Input v-model="search" placeholder="请输入关键词" style="width: 360px" />
                            <Button type="primary" class="alter" @click="handlesearch">查询</Button>

                        </div>
                       <ul class="opertion">
                           <li @click="handleadd">添加</li>
                           <li @click="handledelete">批量删除</li>
                           
                       </ul>
                       <Modal
                            v-model="modal1"
                            title="添加关键词"
                            @on-ok="handleconfim"
                            @on-cancel="handlecancel">
                               <Input v-model.trim="keyword" placeholder="输入格式:a;b;c" />
                        </Modal>
               </div>
                <div class="table">
                        <Table border :columns="columns" :data="data" @on-selection-change='handleselect' @on-select-all="handleselectall" no-data-text="该关键词未添加至黑名单">
                                <template slot-scope="{ row,index}" slot="oper">
                                        <!-- <i-button type="warning" class="alter">修改</i-button> -->
                                        <i-button type="error" @click="handledelslect(row,index)">删除</i-button>
                                </template> 
                               
                        </Table>
                        <Page :total="total" show-sizer show-elevator show-total @on-change="changepage" @on-page-size-change="changepagesize" style="margin-top:10px;"></Page>
               </div>
         
       </div>
 
</template>

<script>
export default {
  name:'hitlist',
  data(){
      return {
          columns:[
              {
                  type:'selection',
                  width:60,
                  align:'center'
              },
              {
                title: '用户',
                key: 'operator',
                align:'center'
             },
             {
                title: '关键词',
                key: 'name',
                align:'center'
             },
             {
                title: '添加时间',
                key: 'createDate',
                align:'center'
             },
             {
                title: '更新时间',
                key: 'updateDate',
                align:'center'
             },
             {
                title: '操作',
                slot: 'oper',
                align:'center'
             },
          ],
          data:[
              {
                  name:'张三',
                  keyword:'喝酒',
                  year:2000,
              },
              {
                  name:'李四',
                  keyword:'赌博',
                  year:2001,
              },
              {
                  name:'王五',
                  keyword:'打架',
                  year:2002,
              }
          ],
          search:'',//搜索框添加的内容
          keyword:'',//添加的关键词
          modal1:false,//控制添加弹框的出现
          page:1,//页码
          pagesize:10,//每页个数
          total:100,//总条数
          keywordarr:[],//选中的数据
      }
  },
     created() {
    this.loading = true;
    // this.getData();
    //返回重置导航坐标
    let PositionArr = this.$store.state.variable.position.slice(0, 2);
    this.$store.commit("setPosition", PositionArr);
    this.$store.commit("setPositionIsShow", true);
    this.$store.commit("emptyFilterArr");
  },
  methods:{
       //点击添加弹框中的确定按钮添加关键词
       handleconfim(){
            var keyword= this.keyword;
            var operator= 123456;
            var url=`/manage/addKeyword`;
            var data={
                keyword:keyword,
                operator:operator
            }
            this.$axios.post(url,this.$qs.stringify(data)).then(res=>{
                // console.log(res)
                if(res.data.data.content ==true){
                    this.$Message.info('添加成功');
                    this.gethistlist();
                }
                if(res.data.code =='500'){
                     this.$Modal.warning({
                            title: '信息提醒',
                            content:res.data.data.message
                    });
                }
            })
       },
       //点击添加弹框中的取消按钮取消添加
       handlecancel(){
            this.modal1 = false;
       },
       //点击添加按钮弹出弹框
       handleadd(){
         
           this.modal1 = true;
          
       },
       //删除单条数据
       handledelslect(val,i){
             console.log(val);
          this.keywordarr.push(val);
         
          this.handledelete();
       },
       //删除
       handledelete(){
         
          var keywordId = this.keywordarr.map(item=>{
               return item.keywordId;
          });
          var url=`/manage/deleteKeyword`;
          let data = {keywordId:JSON.stringify(keywordId)}
        
          this.$axios.post(url,this.$qs.stringify(data),{
             headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} ,
            
         }).then(res=>{
                console.log(res)
                if(res.data.data.content ==true){
                    this.$Message.info('删除成功');
                    this.gethistlist();
                }
          })
       },
       
       changepage(index){
           
           this.page = index;
           this.gethistlist();
       },
       changepagesize(size){
          this.pagesize = size;
           this.gethistlist();
       },
       //获取黑名单列表
       gethistlist(){
          
          var url=`/manage/queryBlack?page=${this.page}&size=${this.pagesize}&keyword=${this.search}`;
          this.$axios.get(url).then(res=>{
              //console.log(res);
              this.data = res.data.data.resultList;
              this.total = res.data.count*1;
          })
       },
       //单个选择
       handleselect(selection){
          
             this.keywordarr = selection;
           
       },

       //全选
       handleselectall(selection){

             this.keywordarr = selection;
           
       },
       //点击确定查询相关关键字数据
       handlesearch(){
            this.gethistlist();
       }
  },
  mounted(){
     this.gethistlist();
  }
}
</script>

<style scoped lang="scss">
.hitlist{
    width: 100%;
}
.alter{
    margin-right: 10px;
}
.oper{
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 15px;
    .search{
         border: none;
         button{
             margin-left: 15px;
         }
    }
    .opertion{
        display: flex;
       
        li{
            color: #3366cc;
            
            line-height: 30px;
            margin-right: 15px;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
}
</style>