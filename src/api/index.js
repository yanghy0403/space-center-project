
import axios from 'axios'
import qs from 'qs'
const URL = 'http://10.0.88.161/api/'//本项目地址
const IMGURL = 'http://10.0.88.161/api/'//期刊图片地址
const DETAURL = 'http://10.0.88.161/api/'//详情地址

//内部方法 
const _post = (url, parameter, callback) => {
    let data = {};
    axios
        .post(url, qs.stringify(parameter))
        .then(function (response) {
            if (response.data && response.data.code === "200") {
                data.data = response.data;
                data.isOk = 'ok';
            } else {
                data.data = response.data;
                data.isOk = 'no';
            }
            callback(data);
        })
        .catch(function (error) {
            data.isOk = 'error'
            data.error = error
            callback(data);
        });
}
const _get = (url, val, callback) => {
    let data = {};
    axios
        .get(url, { params: val })
        .then(function (response) {
            if (response.data && response.data.code === "200") {
                data.data = response.data;
                data.isOk = 'ok';
            } else {
                data.data = response.data;
                data.isOk = 'no';
            };
            callback(data);
        })
        .catch(function (error) {
            data.isOk = 'error'
            data.error = error
            callback(data);
        });
}

//获取人员列表数据
const getTalentListData = (parameter, callback) => {
    _get(URL + "/portal/es/person/", parameter, callback);
}
//获取人员基本信息数据
const getTalentDetailsData = (id, callback) => {
    let data = { personId: id }
    _get(URL + "/portal/es/person/details", data, callback);
}
//获取个人所有论文数据
const getTalentPaperData = (data, callback) => {
    _get(URL + "/portal/es/person/paper", data, callback);
}
//获取学术成果图谱
const getAchievementsData = (data, callback) => {
    _get(URL + "/portal/graph/person/achievement/statistics", data, callback);
}
//获取人员关联网络数据
const getPersonnelAssociationData = (id, callback) => {
    let data = { personId: id }
    _get(URL + "/portal/graph/person/relationship", data, callback);
}
//获取人研究兴趣图谱数据
const getPersonnelStatisticsData = (data, callback) => {
    _get(URL + "/portal/graph/person/achievement/interests/statistics", data, callback);
}
//获取人员与成果、项目、奖励、事件等的关联网络数据
const getPersonownData = (id, callback) => {
    let data = { personId: id }
    _get(URL + "/portal/graph/person/achievement/personown", data, callback);
}
// 人才画像下面 人才获得的奖励
const getPersonRewardData = (id, callback) => {
    let data = { personId: id }
    _get(URL + "/portal/graph/person/reward", data, callback);
}
//获取机构查询列表
const getOrgListData = (parameter, callback) => {
    _get(URL + "/portal/es/org/", parameter, callback);
}
//获取机构详情
const getDetailsData = (id, callback) => {
    let data = { orgId: id }
    _get(URL + "/portal/es/org/details", data, callback);
}
//获取人员组成统计
// const getOrgStatisticsData = (data, callback) => {
//     _get(URL + "/portal/graph/org/person/statistic", data, callback);
// }
//获取机构学术成果图谱
const getOrgAchievementsData = (data, callback) => {
    _get(URL + "/portal/graph/org/achievement/statistic", data, callback);
}
//获取机构学术活动图谱
const getActivityAchievementsData = (data, callback) => {
    _get(URL + "/portal/graph/org/achievement/interests", data, callback);
}
//机构合作网络
const getCoopOrgsData = (id, callback) => {
    let data = { orgId: id }
    _get(URL + "/portal/graph/org/coopOrgs", data, callback);
}
//机构内人才研究方向
const getResearchDirectionData = (id, callback) => {
    let data = { orgId: id }
    _get(URL + "/portal/graph/org/researchArear", data, callback);
}
//机构与学会关系网络
const getClubOrgsData = (id, callback) => {
    let data = { orgId: id }
    _get(URL + "/portal/graph/org/coopOrgs", data, callback);
}
//机构下的人员
const getPersonOrgData = (data, callback) => {
    _get(URL + "/portal/es/org/orgPersons", data, callback);
}
//机构下的论文
const getPaperOrgData = (data, callback) => {
    _get(URL + "/portal/graph/org/orgPapers", data, callback);
}
//机构下的奖励
const getRewardOrgData = (data, callback) => {
    _get(URL + "/portal/graph/org/rewards", data, callback);
}

//成果查询 国内期刊查询
const getPeriodicalData = (data, callback) => {
    _get(URL + "/portal/es/achievement/", data, callback);
}
//成果查询 国内期刊详情
const getPeriodicalDetailsData = (id, callback) => {
    let data = { journalId: id }
    _get(URL + "/portal/es/achievement/journal/detail", data, callback);
}
//成果查询 国内期刊详情年份
const getPeriodicalDetailsYearData = (data, callback) => {
    _get(URL + "/portal/es/achievement/publishDate", data, callback);
}

//成果查询 国内论文
const getDomesticData = (data, callback) => {
    _get(URL + "/portal/es/achievement/domestic", data, callback);
}
//国内国际论文详情
const getDomAndPerData = (id, callback) => {
    let data = { achievementId : id }
    _get(URL + "/portal/es/achievement/paper/detail", data, callback);
}
//国内国际论文详情
const getInteDetailsData = (data, callback) => {
    _get(URL + "/portal/es/achievement/foreign", data, callback);
}
// 
export default {
    IMGURL,
    getTalentListData, //获取人员列表
    getTalentDetailsData,//获取人员详情
    getAchievementsData, //获取学术成果图谱
    getPersonnelAssociationData,//获取人员关联网络数据
    getPersonnelStatisticsData,//获取人研究兴趣图谱数据
    getPersonownData,//获取人员与成果、项目、奖励、事件等的关联网络数据
    getTalentPaperData, //人才画像 人才获得的论文
    getPersonRewardData ,// 人才画像 人才获得的奖励


    getOrgListData,//获取机构查询列表
    getDetailsData,//获取机构详情
    //getOrgStatisticsData,//获取人员组成统计
    getOrgAchievementsData,//获取机构学术成果图谱
    getActivityAchievementsData,//获取机构学术活动图谱
    getCoopOrgsData,//机构合作网络
    getResearchDirectionData,//机构内人才研究方向
    // getClubOrgsData,//机构与学会关系网络
    getPersonOrgData,//机构下的人员
    getPaperOrgData,//机构下的论文
    getRewardOrgData,//机构下的奖励

    getPeriodicalData,//成果查询 国内期刊查询
    getPeriodicalDetailsData,//成果查询 国内期刊详情
    getPeriodicalDetailsYearData,//成果查询 国内期刊详情年份
    getDomesticData,//成果查询 国内论文
    getDomAndPerData,//国内国际论文详情
    getInteDetailsData,//国内国际论文详情

}
