<template>
  <div class="sc-query">
            <div class="hotatlas">
                        <div class="header">
                                <p>领域热点发展趋势</p>
                        </div>
                        <ul class="tab">
                            <li  @click="handleclicknav('name1')" :class="kind == 'name1'? 'selecting':''">国内热点趋势</li>
                            <li @click="handleclicknav('name2')" :class="kind == 'name2'? 'selecting':''">国际热点趋势</li>
                        </ul>
                       
                        <div v-show="kind =='name1'" class="top">
                            <div class="toptitle">
                                <h3 ><span>TOP-N研究热点发展趋势</span></h3>
                                  <div class="top">
                                    
                                       
                                        <div class="year">
                                            <span>年份范围</span> 
                                            <div class="slider">
                                            <el-slider v-model="yeardata1" range :min="min1" :max="max1" @change="handlehover1"></el-slider>
                                            </div>
                                        </div>
                                        <div class="years">
                                            <p>
                                                    <img src="../../../assets/img/kaishishijian.png" alt="" class="logo">
                                                当前选择开始年份：<span>{{JSON.stringify(yeardata1[0]) == JSON.stringify(NaN)? '': yeardata1[0]}}</span>
                                            </p>
                                            <p>
                                                <img src="../../../assets/img/jieshushijian.png" alt="" class="logo">
                                                当前选择结束年份：<span>{{JSON.stringify(yeardata1[1]) == JSON.stringify(NaN)? '': yeardata1[1]}}</span>
                                            </p>
                                        </div>
                                         <div class="results">
                                            
                                          
                                               
                                                <div class="filedlist">
                                                    <Input v-model="filed" placeholder="请输入学科领域" class="filedinput" @on-blur="handleblur"/>
                                                        <div class="select-list" v-show="selectfiled">
                                                            <div class="ivu-poptip-inner scrollbar">
                                                                <ul v-if="result1.length!==0" class="resultdata">
                                                                    <li
                                                                    class="ivu-poptip-body"
                                                                    v-for="(item,k) in result1"
                                                                    :key="k+'x'"
                                                                    @click="handleClickQuery(item)"
                                                                    >
                                                                    <span
                                                                        class="ivu-poptip-body-content-inner"
                                                                    >{{item.rankName}}</span>
                                                                    </li>
                                                                    
                                                                </ul>
                                                                <ul v-else>
                                                                    <span class="ivu-poptip-body-content-inner">暂无匹配数据</span>
                                                                </ul>
                                                            </div>
                                                    </div>
                                              
                                            </div>
                                            <div class="oper">
                                                    <Button type="primary" class="confim" @click="handleconfim">确定</Button>
                                                    <Button type="primary" class="reset" @click="handlereset('中文版')">重置</Button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div class="main">
                                    <div style="height:500px;width:100%;">
                                                <div class="demo-spin-col" v-show="loading">
                                                    
                                                    <Spin fix>
                                                            <Icon type="ios-loading" size=26 class="demo-spin-icon-load"></Icon>
                                                            <div>热点发展趋势分析中</div>
                                                        </Spin>
                                                </div>
                                                <div v-show="!loading" style="position:relative;">
                                                        <div id="atlas"></div>
                                                         <p class="promptTitle hint">双击节点跳转相关详情</p>
                                                </div>
                                                
                                    </div>
                                   
                            </div>
                            
                            <div class="footer" style="position:relative" >
                                <div style="height:40px;">
                                        <h3><span>TOP-N研究热点逐年变化趋势</span></h3>
                                        <ul>
                                            <li @click="handleshowaxis(item.value)" :class="item.value == xAxisnum ? 'acting' : ''" v-for="(item,index) in yeardata" :key="index">{{item.value}}</li>
                                        </ul>
                                </div>
                                <div id="trend"></div>
                                <p class="promptTitle hints">点击柱状图跳转相关详情</p>  
                            </div>
                        </div>
                    <!-- </TabPane>
                    <TabPane label="英文版" name="name2"> -->
                        <div v-show="kind == 'name2'">
                             <div class="toptitle">
                                    <h3 ><span>TOP-N研究热点发展趋势</span></h3>
                                    <div class="top">
                                            <div class="year">
                                                年份范围：
                                                <el-slider v-model="yeardata2" range :min="min2" :max="max2" class="slider" @change="handlehover2"></el-slider>
                                               
                                            </div>
                                           
                                            <div class="years">
                                                <p>
                                                        <img src="../../../assets/img/kaishishijian.png" alt="" class="logo">
                                                    开始年份：<span>{{JSON.stringify(yeardata2[0]) == JSON.stringify(NaN)? '': yeardata2[0]}}</span>
                                                </p>
                                                <p>
                                                        <img src="../../../assets/img/jieshushijian.png" alt="" class="logo">
                                                    结束年份：<span>{{JSON.stringify(yeardata2[1]) == JSON.stringify(NaN)? '': yeardata2[1]}}</span>
                                                </p>
                                            </div>
                                            <p class="oper_en">
                                                 <Button type="primary" class="reset" @click="handlereset('英文版')">重置</Button>
                                            </p>
                                    </div>
                             </div>
                            <div class="main">
                                 <div style="height:500px;width:100%;">
                                                <div class="demo-spin-col" v-show="loading">
                                                    
                                                    <Spin fix>
                                                            <Icon type="ios-loading" size=26 class="demo-spin-icon-load"></Icon>
                                                            <div>热点发展趋势分析中</div>
                                                        </Spin>
                                                </div>
                                                <div v-show="!loading" style="width:100%;position:relative;">
                                                        <div id="atlas1"></div>
                                                         <p class="promptTitle hint">双击节点跳转相关详情</p>
                                                </div>
                                                
                                    </div>
                            </div>
                            
                             <div class="footer" style="position:relative">
                                    <div style="height:40px;">
                                        <h3><span>TOP-N研究热点逐年变化趋势</span> </h3>
                                        <ul>
                                            <li @click="handleshowaxis1(item.value)" :class="item.value == xAxisnum1 ? 'acting' : ''" v-for="(item,index) in yeardata" :key="index">{{item.value}}</li>
                                        </ul>
                                     </div>
                                      <div id="trend1"></div>
                                       <p class="promptTitle hints">点击柱状图跳转相关详情</p>
                            </div>
                    <!-- </TabPane>
                   
                </Tabs> -->
                </div>
            </div>

  </div>
</template>

<script>
const delay = (function() {  
	let timer = 0;  
	return function(callback, ms) {    
        clearTimeout(timer);  
       
		timer = setTimeout(callback, ms);  
	};
})();
import echarts from 'echarts';

export default {
  name:'hotatlas',
  data(){
      return {
           
           builderJson: {
            "all": 10887,
            "charts": {
                "map": 3237,
                "lines": 2164,
                "bar": 7561,
                "line": 7778,
                "pie": 7355,
                "scatter": 2405,
                "candlestick": 1842,
                "radar": 2090,
                "heatmap": 1762,
                "treemap": 1593,
                "graph": 2060,
                "boxplot": 1537,
                "parallel": 1908,
                "gauge": 2107,
                "funnel": 1692,
                "sankey": 1568
            }},
            yeardata1:[],
            min1:0,//最小年份
            max1:0,//最大年份
            yeardata2:[],
            min2:0,//最小年份
            max2:0,//最大年份
            filed:'',//学科领域
            kind:'name1',//导航默认显示中文版
            limit:20,//请求关键词个数
           startyear1:'',//开始年份
            endyear:'',//结束年份
            startyear1:'',//开始年份
            endyear1:'',//结束年份
            contentdata:{},//
            xAxisnum:10,//中文趋势图横坐标显示个数默认5条
            xAxisnum1:10,//英文趋势图横坐标显示个数默认5条
            yeardata:[
                {
                    value:5,
                    checked:true
                },
                {
                    value:10,
                    checked:false
                },
                {
                    value:15,
                    checked:false
                },
                {
                    value:20,
                    checked:false
                },
            ],
            loading:true,//加载状态
            mark:false,//控制选中下拉列表类容消失
            selectfiled:false,
            result1:[],//推荐的学科领域
      }
  },
   watch:{
      filed(){
            delay(()=>{
               if(!this.mark){
                   if(this.filed != ''){
                        this.selectfiled = true;
                        this.ferchData(this.filed);
                   }
               }
                 this.mark = false;
            },300);
           
      },
     
  },
  methods:{
         //实时根据输入推荐机构名称
    async ferchData(val) {
      this.$axios.get("/manage/filedName?name=" + val).then(res => {
          //console.log(res)
          this.result1 = res.data.data.content;
        
      });
    },
    //选择学科领域
    handleClickQuery(val){
         this.mark = true;
          this.filed = val.rankName;
          this.selectfiled = false;
    },
      //失去焦点下方搜索推荐列表消失
    handleblur(){
          var that = this;
        setTimeout(function(){
             that.selectfiled =false;
        },1000)
    },
      //中文版关系图
      getgraph(){

             var myChart = echarts.init(document.getElementById('atlas'));
             myChart.showLoading();
            var fontColor = '#696969';
           function getRandomColor(){
                var r = Math.floor(Math.random()*255);
                var g = Math.floor(Math.random()*255);
                var b = Math.floor(Math.random()*255);
                var color = 'rgba('+ r +','+ g +','+ b +',0.8)';
                return color;
           }
            //  console.log(this.contentdata);
            var titlelist = this.contentdata.titlelist;
            var xAxis = this.contentdata.list.xAxis;
            var data = this.contentdata.list.list;
              // console.log(data)
                var color = ['#CD853F','#FF6A6A','#B22222','#FF0000','#FF00FF','#FF4500','#00008B','#668B8B','#00F5FF','#FFDEAD','#54FF9F','#191970','#4EEE94','#8470FF','#00CD00','#00FFFF','#FFF68F','#7CFC00','#FFFF00','#8B658B',];
                // console.log(color);
                var series = data.map((item,index)=>{
                      return {
                            name:item.name,
                            type:'line',
                            smooth: false , //true 为平滑曲线，false为直线
                            itemStyle: {
                                normal: {
                                    color:color[index],
                                    lineStyle: {
                                        color: color[index],
                                        width:1
                                    },
                                    areaStyle: { 
                                        //color: '#94C9EC'
                                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: color[index]
                                        }, {
                                            offset: 1,
                                            color: color[index]
                                        }]),
                                    }
                                }
                            },
                            data:item.list
                        }
                })
      
           var option ={
                   
                    grid: {
                        
                        left:'14%',
                        top:'5%',
                        right:'3%',
                        bottom:'4%',
                        containLabel: true
                    },
                    tooltip : {
                        show: true,
                        trigger: 'item'
                    },
                    legend: {
                        show:true,
                        top:'4%',
                        left:'1%',
                        orient:'vertical',
                        icon: 'circle',
                        itemWidth:10,
                        itemHeight:10,
                        borderRadius:5,
                        textStyle:{
                            color:'#696969' ,
                            fontSize:12
                        },
                        nameTextStyle :{
                        color:'rgba(0,0,0,1)' 
                        },
                        data:data.map(item=>{
                              return item.name;
                        })
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            position:'bottom',
                            axisLabel:{
                                color: fontColor,
                                fontSize:12
                            },
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(221,221,221,0.4)' ,
                                }
                            },
                             axisPointer: {
                                type: 'line',
                                show:true,
                                lineStyle: {
                                   color:'rgba(221,221,221,0.7)',
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            axisTick:{
                                show:false,
                            },  
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(221,221,221,0.4)' ,
                                }
                            },
                            data :xAxis
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                show:true,
                                formatter: '{value}',
                                textStyle:{
                                    color:fontColor,
                                    fontSize:12
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'rgba(181,181,181,0.4)',
                                }
                            },
                            axisTick:{
                                show:true,
                            },
                            splitLine:{
                                show:false,
                                lineStyle:{
                                    color:'rgba(181,181,181,0.05)',
                                }
                            }
                        }
                        ],
                   
                    series:series
                };
                myChart.setOption(option,true);
                 myChart.hideLoading();
                 var that = this;
                  myChart.on('dblclick',function(params){
                      
                        that.$router.push({
                        path:'/Hotmap',
                        query:{
                            pathkeyword:params.seriesName
                        }
                        })
                    })
      },
     
       //英文版关系图
       getgraph1(val){
           
            var myChart = this.$echarts.init(document.getElementById('atlas1'));
             myChart.showLoading();
            var fontColor = '#696969';
           function getRandomColor(){
                var r = Math.floor(Math.random()*255);
                var g = Math.floor(Math.random()*255);
                var b = Math.floor(Math.random()*255);
                var color = 'rgba('+ r +','+ g +','+ b +',0.8)';
                return color;
           }
            //  console.log(this.contentdata);
          
            var xAxis = this.contentdata.list.xAxis;
            var data = this.contentdata.list.list;
              
                var color = ['#CD853F','#FF6A6A','#B22222','#FF0000','#FF00FF','#FF4500','#00008B','#668B8B','#00F5FF','#FFDEAD','#54FF9F','#191970','#4EEE94','#8470FF','#00CD00','#00FFFF','#FFF68F','#7CFC00','#FFFF00','#8B658B',];
                // console.log(color);
                var series = data.map((item,index)=>{
                      return {
                            name:item.name,
                            type:'line',
                            smooth: false , //true 为平滑曲线，false为直线
                            itemStyle: {
                                normal: {
                                    color:color[index],
                                    lineStyle: {
                                        color: color[index],
                                        width:1
                                    },
                                    areaStyle: { 
                                        //color: '#94C9EC'
                                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                            offset: 0,
                                            color: color[index]
                                        }, {
                                            offset: 1,
                                            color: color[index]
                                        }]),
                                    }
                                }
                            },
                            data:item.list
                        }
                })
      
           var option ={
                   
                   grid: {
                        
                        left:'14%',
                        top:'5%',
                        right:'3%',
                        bottom:'4%',
                        containLabel: true
                    },
                    tooltip : {
                        show: true,
                        trigger: 'item'
                    },
                    legend: {
                        show:true,
                        top:'4%',
                        left:'1%',
                        orient:'vertical',
                        icon: 'circle',
                        itemWidth:10,
                        itemHeight:10,
                        borderRadius:5,
                        textStyle:{
                            color:'#696969' ,
                            fontSize:12
                        },
                        nameTextStyle :{
                        color:'rgba(0,0,0,1)' 
                        },
                        data:data.map(item=>{
                              return item.name;
                        })
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            position:'bottom',
                            axisLabel:{
                                color: fontColor,
                                fontSize:12
                            },
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(221,221,221,0.4)' ,
                                }
                            },
                             axisPointer: {
                                type: 'line',
                                show:true,
                                lineStyle: {
                                   color:'rgba(221,221,221,0.7)',
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            axisTick:{
                                show:false,
                            },  
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(221,221,221,0.4)' ,
                                }
                            },
                            data :xAxis
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                show:true,
                                formatter: '{value}',
                                textStyle:{
                                    color:fontColor,
                                    fontSize:12
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'rgba(181,181,181,0.4)',
                                }
                            },
                            axisTick:{
                                show:true,
                            },
                            splitLine:{
                                show:false,
                                lineStyle:{
                                    color:'rgba(181,181,181,0.05)',
                                }
                            }
                        }
                        ],
                   
                    series:series
                };
                myChart.setOption(option,true);
                myChart.hideLoading();
                  var that = this;
                 myChart.on('dblclick',function(params){
                    
                        that.$router.push({
                        path:'/Hotmap',
                        query:{
                            pathkeyword:params.seriesName
                        }
                        })
                    })
      },
     
    
      //点击导航切换菜单
      handleclicknav(str){
         this.kind = str;
         this.getchinesedata('all');
          this.loading = true;
         if(this.kind =='name1'){
             this.startyear = 2010;
             this.$nextTick(function(){
                   this.gettrend();
               
             })
              
         }else if(this.kind =='name2'){
              this.startyear1 = 2010;
              this.$nextTick(function(){
                   this.gettrend1();
               
             })
         }
         
      },
      //中文版的时间轴选择
      handlehover1(){
           this.startyear = this.yeardata1[0];
           this.endyear = this.yeardata1[1];
           this.loading = true;
            this.getchinesedata('part');
      },
      //英文版的时间轴选择
      handlehover2(){
           this.startyear1 = this.yeardata2[0];
           this.endyear1 = this.yeardata2[1];
            this.loading = true;
            this.getchinesedata('part');
          
          
      },
  
      //点击确定进行学科领域刷选
      handleconfim(){
        this.loading = true;
          this.getchinesedata('all');
      },
      //重置刷选年份
      handlereset(val){
          if(val =='中文版'){
             this.yeardata1 = [this.min1,this.max1];
            //   this.startyear = this.yeardata1[0];
            //  this.endyear = this.yeardata1[1];
              this.startyear = '';
             this.endyear = '';
             this.filed= '';
             this.getchinesedata('part');
          }else if(val =='英文版'){
              this.yeardata2 = [this.min2,this.max2];
            //   this.startyear = this.yeardata2[0];
            //  this.endyear = this.yeardata2[1];
             this.startyear1 = '';
             this.endyear1 = '';
             this.getchinesedata('part');
          }
      },
      //获取中文版数据
      getchinesedata(str){
           
          var language ='';
          if(this.kind =='name1'){
              language ='chinese';
          }else if(this.kind =='name2'){
              language ='english';
          }
         var data={
             filed:this.filed,
             language:language,
             limitYear:this.limit,
             startYear:this.startyear,
             endYear:this.endyear
         }
        var data1={
             filed:'',
             language:language,
             limitYear:this.limit,
             startYear:this.startyear1,
             endYear:this.endyear1
         }
      
         if(this.kind =='name1'){

         
                this.$axios.post('/keyword/keywordResearchTendency',this.$qs.stringify(data)).then(res=>{
                    // console.log('中文版数据')
                    // console.log(res)
                    if(res.data.code =='200'){
                      
                        var data = res.data.data.content;
                       
                         this.contentdata = data;
                          this.loading = false;
                           this.$nextTick(function(){
                                    this.getgraph();
                            })
                         
                        if(str =='all'){
                        
                            var min1 = data.minYear*1;
                            var max1 = data.maxYear*1;
                            this.yeardata1 =[min1,max1];
                            this.min1 = min1;
                            this.max1 = max1;
                           
                           }
                            
                        }else if(str =='part'){
                              return ;
                        }
                })
                
            }
           if(this.kind =='name2'){
                  this.$axios.post('/keyword/keywordResearchTendency',this.$qs.stringify(data1)).then(res=>{
                    // console.log('英文版数据')
                    // console.log(res)
                    if(res.data.code =='200'){
                      
                        var data = res.data.data.content;
                       
                         this.contentdata = data;
                           this.loading = false;
                          this.$nextTick(function(){
                                    this.getgraph1();
                            })
                         if(str =='all'){
                        
                            var min2 = data.minYear*1;
                            var max2 = data.maxYear*1;
                            this.yeardata2 =[min2,max2];
                            this.min2 = min2;
                            this.max2 = max2;
                           
                           }
                            
                        }else if(str =='part'){
                              return ;
                        }
                  })
                 
                       
            }
            this.startyear ='';
            this.endyear ='';
            this.startyear1 ='';
            this.endyear1 ='';  
        
        
          
      },
      //中文版的趋势分析图
      gettrend(){
        //  
            var myChart = this.$echarts.init(document.getElementById('trend'));
            myChart.showLoading({
                  
                        text:'热点变化趋势分析中',
                        color:'#2d8cf0',
                        textColor:'#2d8cf0',
                        zlevel:0
                  
                }
            );
            var url =`/keyword/changeTrend`;
            if(this.kind =='name1'){
                 var language ='chinese';
            }else if(this.kind =='name2'){
                 var language ='english';
            }
            var data ={
                 language:language,
                 limit:this.xAxisnum
            }
            this.$axios.post(url,this.$qs.stringify(data)).then(res=>{
                //   console.log(res);
               
                   var data = res.data.data.content;
                    var year = data.yearList;
                    var everydata = data.result;
                    var axisdata = everydata[0].xData;
                    var options = everydata.map((item)=>{
                        return {
                            xAxis: [
                            {
                                type: "category",
                                axisLabel: {
                                  interval: 0,
                                  rotate:20
                                },
                                data: item.xData,
                                splitLine: {
                                show: false
                                }
                            }
                            ],
                        
                            series: [
                            {
                                data: item.resultData
                            }
                            ]
                        }
                    })
                    // console.log(options);
                    let option = {
                        baseOption: {
                        timeline: {
                            axisType: "category",
                            autoPlay: true,
                            bottom: "0%",
                            left: "5%",
                            right: "10%",
                            label: {
                            color: "#aaa"
                            },
                            lineStyle: {
                            color: "#aaa"
                            },
                            symbolSize: 4,
                            controlStyle: {
                            color: "#aaa",
                            borderColor: "#aaa",
                            itemGap: 15,
                            itemSize: 12
                            },

                            playInterval: 3000,
                            data:year
                        
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "cross",
                                crossStyle: {
                                    color: "#999"
                                },
                                label: {
                                    color: "#fff",
                                    fontFamily: "Arial"
                                }
                            },
                            formatter:function(params){
                               
                                 return params[0].name + ':'+params[0].value;
                            }
                        },
                        calculable: true,
                        grid: {
                            top: "10%",
                            bottom: "25%",
                            left: "5%",
                            right: "8%"
                        },
                        xAxis: [
                            {
                            type: "category",
                            name: "关键词",
                            axisLabel: {
                                interval: 0
                            },
                            data: axisdata,
                            axisLine: {
                                // symbol: ['none', 'arrow'],
                                // symbolSize: [6, 12],
                                // symbolOffset: [110, 8],
                                lineStyle: {
                                color: "#aaa"
                                }
                            }
                            }
                        ],
                        yAxis: [
                            {
                            type: "value",
                            name: "词频",
                            axisLine: {
                                // symbol: ['none', 'arrow'],
                                // symbolSize: [6, 12],
                                // symbolOffset: [10, 18],
                                lineStyle: {
                                color: "#aaa"
                                // type:'dashed'
                                }
                            },
                          
                            splitLine: {
                                 show: false,
                                lineStyle: {
                                // color: '#fff',
                                  type: "dashed"
                                }
                            }
                            }
                        ],
                        series: [
                            {
                            name: "金币1",
                            type: "bar"
                            },
                        
                        ]
                        },

                    
                    options:options
                    };

                    myChart.setOption(option, true);
                    myChart.hideLoading();
                      var that = this;
                    myChart.on('click',function(params){
                    
                        that.$router.push({
                        path:'/Hotmap',
                        query:{
                            pathkeyword:params.name
                        }
                        })
                    })
            })
      },
       //英文版的趋势分析图
      gettrend1(){
           
            var myChart = this.$echarts.init(document.getElementById('trend1'));
            myChart.showLoading({
                  
                        text:'热点变化趋势分析中',
                        color:'#2d8cf0',
                        textColor:'#2d8cf0',
                        zlevel:0
                  
                }
            );
            var url =`/keyword/changeTrend`;
            if(this.kind =='name1'){
                 var language ='chinese';
            }else if(this.kind =='name2'){
                 var language ='english';
            }
            var data ={
                 language:language,
                 limit:this.xAxisnum1
            }
            this.$axios.post(url,this.$qs.stringify(data)).then(res=>{
                //   console.log(res);
                
                   var data = res.data.data.content;
                    var year = data.yearList;
                    var everydata = data.result;
                    var axisdata = everydata[0].xData;
                    var options = everydata.map((item)=>{
                        return {
                            xAxis: [
                            {
                                type: "category",
                                axisLabel: {
                                    interval: 0,
                                     rotate:20
                                },
                                data: item.xData,
                                splitLine: {
                                   show: false
                                }
                            }
                            ],
                        
                            series: [
                            {
                                data: item.resultData
                            }
                            ]
                        }
                    })
                    // console.log(options);
                    let option = {
                        baseOption: {
                        timeline: {
                            axisType: "category",
                            autoPlay: true,
                            bottom: "0%",
                            left: "5%",
                            right: "10%",
                            label: {
                            color: "#aaa"
                            },
                            lineStyle: {
                            color: "#aaa"
                            },
                            symbolSize: 4,
                            controlStyle: {
                            color: "#aaa",
                            borderColor: "#aaa",
                            itemGap: 15,
                            itemSize: 12
                            },

                            playInterval: 3000,
                            data:year
                        
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                            type: "cross",
                            crossStyle: {
                                color: "#999"
                            },
                            label: {
                                color: "#fff",
                                fontFamily: "Arial"
                            }
                            },
                             formatter:function(params){
                               
                                 return params[0].name + ':'+params[0].value;
                            }
                        },
                        calculable: true,
                        grid: {
                            top: "10%",
                            bottom: "25%",
                            left: "5%",
                            right: "8%"
                        },
                        xAxis: [
                            {
                            type: "category",
                            name: "关键词",
                            axisLabel: {
                                interval: 0
                            },
                            data: axisdata,
                            axisLine: {
                                
                                lineStyle: {
                                color: "#aaa"
                                }
                            }
                            }
                        ],
                        yAxis: [
                            {
                            type: "value",
                            name: "词频",
                            axisLine: {
                               
                                lineStyle: {
                                color: "#aaa"
                                // type:'dashed'
                                }
                            },
                            splitLine: {
                                 show: false,
                                lineStyle: {
                               
                                   type: "dashed"
                                }
                            }
                            }
                        ],
                        series: [
                            {
                            name: "金币1",
                            type: "bar"
                            },
                        
                        ]
                        },

                    
                    options:options
                    };

                    myChart.setOption(option, true);
                    myChart.hideLoading();
                      var that = this;
                     myChart.on('click',function(params){
                    
                        that.$router.push({
                        path:'/Hotmap',
                        query:{
                            pathkeyword:params.name
                        }
                        })
                    })
                    

            })
      },
      //中文选择横坐标显示个数
      handleshowaxis(val){
         this.xAxisnum = val;
          this.$nextTick(function(){
              this.gettrend();
          })
      },
       //中文选择横坐标显示个数
      handleshowaxis1(val){
         this.xAxisnum1 = val;
          this.$nextTick(function(){
              this.gettrend1();
          })
      }

  },
  mounted(){
    
          this.handleclicknav('name1');
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
 
}
</script>
<style lang="scss" scoped>
 h3{
	padding-left: 22px;
	margin-bottom: 20px;
	color: #1d5fa5;
	display: flex;
	justify-content: space-between;
	align-items: center;
    font-size: 16px;
    padding-top: 15px;
   
	>span::before{
		width: 3px;
		height: 20px;
		display: inline-block;
		margin-right:7px;
		background: #1d5fa5;
		content: '',
		

	}
	>span{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	>div{
		margin-right: 17px;
	}
}
</style>
<style scoped lang="scss">
#atlas,#atlas1{
    width:100%;
    height: 500px;
}
.hotatlas{
    width: 100%;
   
    .top{
       
        .results{
            margin: 10px 0;
            margin-right: 15px;
            display: flex;
            padding-bottom: 20px;
            .input{
                margin-left: 26px;
                width: 50%;
            }
            .oper{
                width: 50%;
               
            }
             >span{
                    padding-left: 28px;
                    font-size: 12px;
                }
             .filedlist {
                 width:50%;
                 .filedinput{
                       width:100%;
                 }
                 .select-list{
                     width: 100%;
                 }
             }
            .confim{
                margin:0 5px;
                margin-right: 15px;
               margin-left: 210px;
            }
            .reset{
                margin: 0 5px;
            }
        }
        .year{
            width: 100%;
             display: flex;
             justify-content: flex-start;
             align-items: center;
             margin-top:10px;
             margin-left: 20px;
           
             .reset{
                 margin-left: 30px;
             }
            
        }
        .years{
            margin-left: 24px;
            
            display: flex;
            p{
               line-height: 30px;
                margin:10px 0;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 50%;
            }
            .logo{
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 10px;
            }
        }
    }
    .main{
        display: flex;
        border:1px solid #ddd;
        width: 100%;
        background: #fff;
       
    }
    .title{
        width: 20%;
        border-right:1px solid #ddd;
        overflow-y: auto;
        margin-top: 20px;
        li{
            margin-right: 8px;
            margin-left: 8px;
           display: flex;
           justify-content: space-between;
           align-items: center;
           cursor: pointer;
           height: 37px;
           margin: 5px 8px;
           &:first-child{
               margin-top: 0;
           }
           .bg{
                 display: inline-block;
                 width: 10px;
                 height: 10px;
                 border-radius: 50%;
                 background: red;
           }
        }
    }
    #graph,#graph1{
        width: 20%;
        height: 800px;
      
        border-right: 1px solid #ddd;
    }
}
.active{
    background: dimgray!important;
}
.slider{
    width: 80%;
    margin-left: 20px;
   
}

.interval{
    height: 40px;
    background: #ebeef5;
}
.footer{
    margin-top: 20px;
     background: #fff;
   >div:first-child{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
         padding-top: 15px;
   }
    #trend,#trend1{
        width: 100%;
        height: 400px;
    }
    ul{
        width: 200px;
        float: right;
        margin-right: 30px;
        li{
           float: left;
            margin-right: 10px;
            border: 1px solid #ddd;
           cursor: pointer;
            width: 40px;
            list-style: none;
            text-align: center;
            line-height: 30px;
        }
        .acting{
            background: #409EFF; 
            color: #fff; 
        }
    }
}
h3{
    padding-left: 20px;
     line-height: 40px;
    
}
.toptitle{
    margin-top: 15px;
    background: #fff;
    padding-bottom: 1px;
    padding-top: 10px;
}
.tab{
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    cursor: pointer;
    background: #fff;
    li{
       width: 50%;
       text-align: center;
       line-height: 40px;
       &:first-child{
           border-right: 1px solid #ddd;
       }
    }
    .selecting{
        background: #409EFF;
        color: #fff;
    }

}
.header{
	background: #fff;
	p{
		line-height: 40px;
		padding:10px 30px;
		font-size: 18px;
	}
}
.filedlist{
   .filedinput{
     width:80%;
   }
   .select-list{
      width:80%;
   }
}
.oper_en{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 110px;
    margin-bottom: 20px;
}
.hints{
    right:35px!important;
}
</style>