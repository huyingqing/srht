import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
 
  state: {
    // 存储token
   //标识用户是否登录
    // 如果用户已登录，islogin的值为sessionStorage中的islogin的值，即为true
    isLogin:localStorage.getItem('isLogin') || false,
    isLogin:localStorage.getItem('username') || "",
  },
 
  mutations: {
   // 用户登录后，将用户名存到缓存
   login_mutation(state,payload){
    state.isLogin=true;
    state.username=payload.username;
  },
  // 退出登录时清除缓存
  logout_mutations:(state)=>{
    state.isLogin=false;
    localStorage.clear();
  },
  }
});
 
export default store;