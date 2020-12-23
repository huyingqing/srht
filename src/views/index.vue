<template>
  <div class="outdiv">
    <!-- 第一排 -->
    <div class="Administrator">
      <div class="logo">
        <img class="logo-img" :src="logo.img" alt="" />
      </div>
      <div class="person">
        <div class="personage">
          <!-- 显示的画框 -->
          <div class="frame">
            <div class="frame-trigon"></div>
            <div class="frame-case">
              <div>{{ this.$store.state.account }}</div>
              <div>
                <img
                  class="frame-case-img"
                  src="../assets/head/administration.png"
                  alt=""
                />
                <span class="frame-case-span">进入企业管理中心</span>
              </div>
              <div>
                <img
                  class="frame-case-img"
                  src="../assets/head/member.png"
                  alt=""
                />
                <span>管理成员</span>
              </div>
              <div>
                <span @click="gologin">退出登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 横列 -->
    <div class="list">
      <div class="nav">
        <!-- 点击切换变色导航栏 -->
        <ul>
          <li
            v-for="(item, index) in nav"
            :key="index"
            :class="isSelect === item.title ? 'active' : ''"
            @click="selectNav(item.title)"
          >
            <p>{{ item.title }}</p>
          </li>
        </ul>
        <!-- END -->
      </div>
    </div>
    <!--判断 -->
    <div class="gongneng">
      <div>
        <transition class="homepage">
          <menuhome v-show="homepage"></menuhome>
        </transition>
      </div>
      <div>
        <transition class="homepage">
          <menucollege v-show="menucollege"></menucollege>
        </transition>
        <transition class="homepage">
          <menuapp v-show="menuapp"></menuapp>
        </transition>
        <transition class="homepage">
          <menuabout v-show="menuabout"></menuabout>
        </transition>
        <transition class="homepage">
          <menuenews v-show="menuenews"></menuenews>
        </transition>
      </div>
      <!-- <div class="homefirst">
        <homefirst></homefirst>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: { img: require("../assets/head/logo.png") },
      isSelect: "首页", //切换标识
      nav: [
        //导航栏数据
        { title: "首页" },
        { title: "金融学院" },
        { title: "硕尔APP" },
        { title: "新闻资讯" },
        { title: "关于我们" }
      ],
      homepage: false,
      menucollege: false,
      menuapp: false,
      menuabout: false,
      menuenews: false
    };
  },
  methods: {
    gologin() {
      this.$router.push("/login");
      this.$store.commit('logout_mutations');
    },
    selectNav(title) {
      this.isSelect = title;
      sessionStorage.setItem("isSelect", this.isSelect);
      if (this.isSelect === "首页") {
        this.homepage = true;
      } else {
        this.homepage = false;
      }
      if (this.isSelect === "金融学院") {
        this.menucollege = true;
      } else {
        this.menucollege = false;
      }
      if (this.isSelect === "硕尔APP") {
        this.menuapp = true;
      } else {
        this.menuapp = false;
      }
      if (this.isSelect === "关于我们") {
        this.menuabout = true;
      } else {
        this.menuabout = false;
      }
      if (this.isSelect === "新闻资讯") {
        this.menuenews = true;
      } else {
        this.menuenews = false;
      }
    },
    shopcart() {
      if (!this.$store.state.isLogin) {
        this.$router.push(`/login`);
      } else {
        this.$router.push(`/`);
      }
    }
  },
  mounted() {
    this.isSelect = sessionStorage.getItem("isSelect");
    this.shopcart();
  }
};
</script>


<style lang="scss" scoped>
.outdiv {
  width: 100%;
  height: 100%;
  min-width: 750px;
}
.Administrator {
  position: fixed;
  z-index: 1000;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #e8e8ee;
  background-color: #ffff;
}
.logo {
  width: 100%;
}
.logo-img {
  width: 200px;
}
.person {
  margin-right: 5%;
}
.personage {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  background-image: url("../assets/head/personage1.png");
  background-position: center;
  background-repeat: no-repeat;
}

.frame {
  position: absolute;
  top: 0;
  /* display: none; */
  animation: fade-in; /*动画名称*/
  animation-duration: 1s; /*动画持续时间*/
  -webkit-animation: fade-in 1s; /*针对webkit内核*/
  position: fixed;
  z-index: 1000;
  display: none;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.4;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes fade-in {
  /*针对webkit内核*/
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.4;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
.frame-trigon {
  width: 12px;
  height: 12px;
  background: #ffff;
  position: absolute;
  right: -52px;
  top: 84px;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(-45deg);
  box-sizing: border-box;
  box-shadow: inherit;
  border: 1px solid #e8e8e8;
}
.frame-case {
  position: absolute;
  right: -145px;
  top: 84px;
  width: 200px;
  height: 180px;
  background: #ffff;
  border: 1px solid #e8e8e8;
  padding: 5px 5px;
}
.frame-case > div {
  padding: 8px 5px;
  cursor: pointer;
}
.frame-case > div:nth-child(1),
.frame-case > div:nth-child(3) {
  border-bottom: 1px solid #e8e8e8;
}
.frame-case > div:last-child {
  text-align: center;
}
.frame-case > div:hover {
  background-color: #5ec1f3;
  color: #ffff;
  cursor: pointer;
}
.frame-case-img {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  padding-right: 6px;
}
.personage:hover {
  background-image: url("../assets/head/personage.png");
  background-position: center;
  background-repeat: no-repeat;
  .frame {
    display: inline;
  }
}
.list {
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  width: 167px;
  height: 100%;
  background-color: #1c1c1e;
  background-size: 100%;
  padding-left: 25px;
  padding-top: 100px;
}
.list > div > ul > li {
  width: 87%;
  list-style: none;
  float: left;
  // margin-right: 20px;
  font-size: 1rem;
  padding: 20px 10px;
  cursor: pointer;
  color: #ffff;
}
.active {
  background-color: #5874d8;
}
.gongneng {
  display: flex;
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.homefirst {
  width: 100%;
  margin: 0 auto;
  margin-top: 85px;
  margin-left: 50px;
  justify-content: center;
  text-align: center;
}
</style>