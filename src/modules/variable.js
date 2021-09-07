const state = {
  positionIsShow:false,
  position:[],
  backTop:null
}
const mutations = {
  setPositionIsShow(state, data) {
    state.positionIsShow = data;
   // console.log(state.positionIsShow)
  },
  setPosition(state, data) {
    state.position = data;
  },
  setBackTop(state, event) {
    state.backTop = event;
  }
}
const actions = {
  setArtile(context, data) {
    context.commit('setArtile', data);
  }
}
const getters = {
  //获文章取条获件分页列表
  getArticleReplyPage(state) {
    return function (pageNo, pageSize) {
      let start = pageNo, end = pageSize;
      if (pageNo > 0) {
        start = (pageNo - 1) * pageSize;
        end = start + pageSize;
      }
      let list = state.articleReplyData;
      return list.slice(start, end);
    }
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
