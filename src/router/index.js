import Vue from 'vue';
import Router from 'vue-router';
// 主页
import Main from '../components/index/Main';
import Index from '../components/index/Index';



import scienceMain from '../components/scienceIndex/Main';
import scienceIndex from '../components/scienceIndex/Index';
// 科研人员画像
import personIndex from '../components/scienceIndex/person/Index';
import personDetails from '../components/scienceIndex/person/Details';
// 科研机构画像
import organIndex from '../components/scienceIndex/organ/Index';
import organDetails from '../components/scienceIndex/organ/Details';
//关联路径
import AssociatedpathIndex from '../components/scienceIndex/Associatedpath/Index';
import AssociatedpathDetails from '../components/scienceIndex/Associatedpath/Details';

// 重大科研机构
import TaskDetails from "../components/scienceIndex/task/Details";
// 项目查询
import ProjectIndex from "../components/scienceIndex/project/Index";
import Projectdetails from "../components/scienceIndex/project/Details";

// 会议查询
import ConferenceIndex from "../components/scienceIndex/conference/Index"
import Conferencedetails from "../components/scienceIndex/conference/Details"
// 设备甘丽
import DeviceIndex from "../components/scienceIndex/device/Index.vue"
// 期刊查询
import JournalIndex from "../components/scienceIndex/journal/Index";
import Journaldetails from "../components/scienceIndex/journal/Details";

// 论文查询
import PaperIndex from '../components/scienceIndex/paper/Index';
import PaperDetails from '../components/scienceIndex/paper/details';

// 专利查询x
import patentIndex from '../components/scienceIndex/patent/index';
import PatentDetails from '../components/scienceIndex/patent/details';

// 标准查询
import criterionIndex from '../components/scienceIndex/criterion/index';
import CriterionDetails from '../components/scienceIndex/criterion/details';

// 专著查询
import monographIndex from '../components/scienceIndex/monograph/index';
import MonographDetails from '../components/scienceIndex/monograph/details';

//合作网络
import CooperationNetworkIndex from '../components/scienceIndex/CooperationNetwork/Index';
import CooOrgRelationIndex from '../components/scienceIndex/CooperationNetwork/CooOrgRelationIndex';
import CooOrgNetworkIndex from '../components/scienceIndex/CooperationNetwork/CooOrgNetworkIndex';

//热点查询
import hotmap from '../components/scienceIndex/hotspot/hotmap/Hotmap';
import hottrend from '../components/scienceIndex/hotspot/hottrend/hottrend';
import hotcluster from '../components/scienceIndex/hotspot/hotcluster';
import hotatlas from '../components/scienceIndex/hotspot/hotatlas';


//科研社区
import collaborate from '../components/scienceIndex/community/collaborate';
import similar from '../components/scienceIndex/community/similar';



//个人管理页面
import Manage from '../components/manage/Manage.vue'

//个人管理页面权限管理
import authority from '../components/manage/authority/authority.vue'
//黑名单
import hitlist from '../components/manage/hitlist/hitlist';
//登录
import login from '../components/login';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/',//设置默认指向的路径
            children: [ //这里就是二级路由的配置
                {
                    path: '/',
                    name: 'Index',
                    component: Index
                }
            ]
        },
        {
            path: '/science',
            name: 'scienceMain',
            component: scienceMain,
            redirect: '/',//设置默认指向的路径
            children: [ //这里就是二级路由的配置
                {
                    path: '/',
                    name: 'scienceIndex',
                    component: scienceIndex
                },
                // 科研人员画像
                {
                    path: '/person',
                    name: 'personIndex',
                    component: personIndex
                },
                {
                    path: '/persondetails',
                    name: 'personDetails',
                    component: personDetails
                },
                // 科研机构画像
                {
                    path: '/organ',
                    name: 'organIndex',
                    component: organIndex
                },
                {
                    path: '/organdetails',
                    name: 'organDetails',
                    component: organDetails
                },
                //关联路径
                {
                    path: '/associatedpathIndex',
                    name: 'AssociatedpathIndex',
                    component: AssociatedpathIndex
                },
                {
                    path: '/AssociatedpathDetails',
                    name: 'AssociatedpathDetails',
                    component: AssociatedpathDetails
                },
                // 重大科研任务
                {
                    path: '/taskdetails',
                    name: 'TaskDetails',
                    component: TaskDetails
                },
                // 项目查询
                {
                    path: '/project',
                    name: 'ProjectIndex',
                    component: ProjectIndex
                },
                {
                    path: '/projectdetails',
                    name: 'Projectdetails',
                    component: Projectdetails
                },
                // 会议查询
                {
                    path: '/conference',
                    name: 'ConferenceIndex',
                    component: ConferenceIndex
                },
                {
                    path: '/conferencedetails',
                    name: 'Conferencedetails',
                    component: Conferencedetails
                },
                // 仪器设备推荐
                {
                    path: '/device',
                    name: 'DeviceIndex',
                    component: DeviceIndex
                },
                // 期刊查询
                {
                    path: '/journal',
                    name: 'JournalIndex',
                    component: JournalIndex
                },
                {
                    path: '/journaldetails',
                    name: 'Journaldetails',
                    component: Journaldetails
                },
                // 论文查询
                {
                  path: '/paper',
                  name: 'PaperIndex',
                  component: PaperIndex
                },
                {
                  path: '/paperdetails',
                  name: 'PaperDetails',
                  component: PaperDetails
                },
                // 专利查询
                {
                    path: '/patent',
                    name: 'patentIndex',
                    component: patentIndex
                },
                {
                    path: '/patentdetails',
                    name: 'PatentDetails',
                    component: PatentDetails
                },
                // 标准查询
                {
                    path: '/criterion',
                    name: 'criterionIndex',
                    component: criterionIndex
                },
                {
                    path: '/criteriondetails',
                    name: 'CriterionDetails',
                    component: CriterionDetails
                },
                // 专著查询
                {
                    path: '/monograph',
                    name: 'monographIndex',
                    component: monographIndex
                },
                {
                    path: '/monographdetails',
                    name: 'MonographDetails',
                    component: MonographDetails
                },
                //合作网络-人员
                {
                    path: '/cooperationNetworkIndex',
                    name: 'CooperationNetworkIndex',
                    component: CooperationNetworkIndex
                },
                //合作网络--人和机构
                {
                    path: '/cooOrgRelationIndex',
                    name: 'CooOrgRelationIndex',
                    component: CooOrgRelationIndex
                },
                //合作网络--机构
                {
                    path: '/cooOrgNetworkIndex',
                    name: 'CooOrgNetworkIndex',
                    component: CooOrgNetworkIndex
                },
                  //热点查询
                {
                    path: '/Hotmap',
                    name: 'hotmap',
                    component: hotmap
                },
                //研究热点--热点共现图谱
                {
                    path: '/hottrend',
                    name: 'hottrend',
                    component: hottrend
                },
                 //研究热点--热点聚类图谱
                 {
                    path: '/hotcluster',
                    name: 'hotcluster',
                    component: hotcluster
                },
                //研究热点--热点趋势
                {
                    path: '/hotatlas',
                    name: 'hotatlas',
                    component: hotatlas
                },
                 //科研社区--科研合作社区
                 {
                    path: '/collaborate',
                    name: 'collaborate',
                    component: collaborate
                },
                 //科研社区--相似人员社区
                 {
                    path: '/similar',
                    name: 'similar',
                    component: similar
                },
               
               
            ]
        },
         //管理页面吧
         {
            path: '/Manage',
            name: 'Manage',
            component: Manage,
            redirect:'hitlist',
            children:[
                 //黑名单
                 {
                    path: '/hitlist',
                    name: 'hitlist',
                    component: hitlist
                },
                //权限管理
                {
                    path: '/authority',
                    name: 'authority',
                    component: authority
                },
            ]
          },
          //登录页面
          {
              path:'/login',
              name:'login',
              component:login
          }
        // {
        //   path: '/second',
        //   name: 'secondscienceIndex',
        //   component: secondIndex,
        //   redirect: '/Index',//设置默认指向的路径
        //   children: [ //这里就是二级路由的配置
        //     {
        //       path: '/Index',
        //       name: 'Index',
        //       component: Index
        //     },
        //     {
        //       path: '/org',
        //       name: 'OrganMain',
        //       component: OrganMain
        //     },
        //     {
        //       path: '/talentdet',
        //       name: 'TalentDetails',
        //       component: TalentDetails
        //     },
        //     {
        //       path: '/orgdet',
        //       name: 'OrganDetails',
        //       component: OrganDetails
        //     },
        //     {
        //       path: '/talent',
        //       name: 'TalentMain',
        //       component: TalentMain
        //     }]
        // },
    ]
})
