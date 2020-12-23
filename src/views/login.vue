<template>
  <div class="login-out">
    <div class="title-sr">成都硕尔教育网站后台管理系统</div>
    <div class="login">
      
      <div class="login-in">  
        <div class="username">
        <span class="userimg"><img src="../assets/user.png" alt=""/></span>
        <input type="text" v-model="loginForm.account" placeholder="用户名" />
      </div>
      <div class="userpassword">
        <span class="userimg"> <img src="../assets/password.png" alt=""/></span>
        <input type="password" v-model="loginForm.pwd" placeholder="密码" />
      </div>
      <!-- <div class=" verification">
        <input
          class=" verification"
          type="text"
          v-model="loginForm.verify"
          placeholder="验证码"
        />
        <button class="getyanz" @click="yanz()" v-show="yanzm">
          获取验证码
        </button>
        <span class="yanzheng"
          ><img @click="yanzimg" class="yanz-img" :src="verification" alt=""
        /></span>
      </div> -->
      <button class="button-login" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        account: "",
        pwd: "",
        // verify: ""
      },
      verification: {},
      yanzm: true
    };
  },

  methods: {
    ...mapMutations(["changeLogin"]),
    login() {
      let _this = this;
      if (_this.loginForm.account === "") {
        alert("用户名不能为空");
      } else if (_this.loginForm.pwd === "") {
        alert("密码不能为空");
      } 
      else {
        this.axios({
          method: "post",
          url: this.Globle.yanbaseURLs + "/admin/login",
          data: _this.loginForm
        })
          .then(res => {
            console.log(res.data.datas);
            let username=res.data.datas.account
            console.log(username)
            // 将用户登录状态储存到webStorage中
            this.$store.commit("login_mutation", res.data.datas);
            //  之所以要将用户的登录状态保存为true，是因为以防用户在登录之后刷新页面又出现登录的情况
            localStorage.setItem("isLogin", true);
            localStorage.setItem("username", res.data.datas.account);
            if (res.data.code === 200) {
              _this.$router.push("/");
              // alert("登陆成功");
            }
            // if (res.data.code == 201) {
            //   alert("验证码不正确");
            //   return;
            // }
            if (res.data.code === 202) {
              alert(res.data.msg);
              return;
            }
            if (res.data.code === 203) {
              alert(res.data.msg);
              return;
            }
          })
          .catch(error => {
            console.log(error);

            console.log(error);
          });
      }
    },
    yanz() {
      this.axios
        .get(this.Globle.yanbaseURLs + "/admin/cap", {
          responseType: "arraybuffer"
        })
        .then(res => {
          console.log(res);
          this.verification =
            "data:image/jpg;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
          this.yanzm = false;
        });
    },
    yanzimg() {
      this.yanz();
    }
  }
};
</script>

<style scoped>
.login-out {
  /* position: absolute; */
  width: 100%;
  height: 100vh;
  background-image: url("../assets/bg-logo.jpg");
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: 100%; */
  background-size: 100% 100%;
  height: 100%;
  position: absolute;
  width: 100%;
}
.title-sr{
  width: 50%;
  color: #ffffff;
  padding-top: 150px;
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  letter-spacing:8px;
  font-family: "仿宋";
  text-shadow: #ffffff 0px 0px 0px;
   /* background: linear-gradient(to right, rgb(255 255 255), rgb(95 100 115)); */
        -webkit-background-clip: text;
        /* color: transparent; */
}
.login {
  width: 38%;
  /* position: absolute; */
  margin: 0 auto;
  margin-top: 115px;
 
}
.login-in{
  width: 270px;
  margin: 0 auto;
   /* border: 0.5px solid #ffffff; */
  height: 300px;
  margin-top: 50%;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  box-shadow: 0px 0px 30px #0092dc;
  position: relative;
}
.login > div {
  padding: 10px;
}
.login div> div > input {
  width: 100%;
  height: 30px;
  padding-left: 10px;
  margin-bottom: 14px;
}
.userimg {
  position: absolute;
  left: 231px;
  width: 10px;
  margin-top: 5px;
}
.userimg > img {
  width: 21px;
}
.username {
  margin-top: 35px;
}
.userpassword {
  margin-top: 5px;
}
.verification {
  width: 100%;
  padding-left: 8% !important;
  display: flex;
  flex-wrap: nowrap;
  /* color:#ffffff;    */
}
.verification > input {
  width: 100px !important;
}
.yanzheng {
  margin-left: 30px;
  color: #ffffff;
  padding-bottom: 5px;
  align-self: center;
  font-size: 18px;
  margin-bottom: 0px;
  cursor: pointer;
  background-image: -webkit-linear-gradient(bottom, red, #c06161, #f0c41b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* border-bottom: 3px solid #6d4a4a; */
}
.button-login {
  width: 250px;
  margin-top: 35px;
  padding: 5px 40px;
  background-color: #0092dc;
  border: 0;
  height: 30px;
  border-radius: 3px;
  color: #ffffff;
  border: none;
}
.yanz-img {
  width: 116px;
}
</style>