<template>
  <div class="homepage">
    <!-- 侧边 -->
    <div class="homepage-left">
      <div class="nav">
        <!-- 点击切换变色导航栏 -->
        <ul>
          <li
            v-for="(item, index) in nav"
            :key="index"
            :class="isThirdly === item.title ? 'active' : ''"
            @click="menu(item.title)"
          >
            <p>{{ item.title }}</p>
          </li>
        </ul>
        <!-- END -->
      </div>
    </div>
    <div class="homefirst" v-show="aboutbanner">
      <aboutbanner></aboutbanner>
    </div>
    <div class="homefirst" v-show="aboutlunbo">
      <aboutlunbo></aboutlunbo>
    </div>
    <div class="homefirst" v-show="aboutsr">
      <aboutsr></aboutsr>
    </div>
    <div class="homefirst" v-show="aboutwenhua">
      <aboutwenhua></aboutwenhua>
    </div>
    <div class="homefirst" v-show="aboutinfo">
      <aboutinfo></aboutinfo>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isThirdly: "顶部图片", //切换标识
      nav: [
          { title: "顶部图片" }, 
          { title: "形象轮播" },
          { title: "关于硕尔" },
          { title: "企业文化" },
          { title: "企业信息" }
          ],
      a: [],
      aboutbanner: false,
      aboutlunbo: false,
      aboutsr:false,
aboutwenhua:false,
aboutinfo:false

    };
  },
  methods: {
    menu(title) {
      this.isThirdly = title;
      sessionStorage.setItem("isThirdly", this.isThirdly);
      if (this.isThirdly == "顶部图片") {
        this.aboutbanner = true;
      } else {
        this.aboutbanner = false;
      }
      if (this.isThirdly == "形象轮播") {
        this.aboutlunbo = true;
      } else {
        this.aboutlunbo = false;
      }
      if (this.isThirdly == "关于硕尔") {
        this.aboutsr = true;
      } else {
        this.aboutsr = false;
      }
      if (this.isThirdly == "企业文化") {
        this.aboutwenhua = true;
      } else {
        this.aboutwenhua = false;
      }
      if (this.isThirdly == "企业信息") {
        this.aboutinfo = true;
      } else {
        this.aboutinfo = false;
      }
    }
  },
  mounted() {
    this.isThirdly = sessionStorage.getItem("isThirdly");
  }
};
</script>

<style scoped>
.homepage {
  width: 100%;
  height: 100%;
  margin-left: 150px;
  display: flex;
  flex-wrap: nowrap;
}
.homepage-left {
  width: 100px;
  overflow: hidden;
  border-right: 1px solid #e8e8e8;
  padding: 20px 10px;
  overflow: hidden;
}
.nav {
  position: absolute;
  width: 150px;
  height: 100%;
  top: 20px;
  background-color: #e8e8ee;
  background-size: 100%;
  margin-top: -20px;
  margin-left: -11px;
  padding-top: 15px;
  animation: lToR 0.1s;
  -moz-animation: lToR 0.1s; /* Firefox */
  -webkit-animation: lToR 0.1s; /* Safari and Chrome */
  -o-animation: lToR 0.1s; /* Opera */
}

.nav > ul {
  overflow: hidden;
  margin-top: 85px;
}
.nav > ul > li {
  width: 87%;
  list-style: none;
  float: left;
  font-size: 1rem;
  padding: 20px 10px;
  cursor: pointer;
  color: #1c1c1e;
}
@keyframes lToR {
  from {
    width: 0px;
  }
}

@-moz-keyframes lToR /* Firefox */ {
  from {
    width: 0px;
  }
}

@-webkit-keyframes lToR /* Safari and Chrome */ {
  from {
    width: 0px;
  }
}

@-o-keyframes lToR /* Opera */ {
  from {
    width: 0px;
  }
}
.active {
  background-color: #5874d8;
}
.homefirst {
  position: absolute;
  width: 70%;
  margin: 0 auto;
  margin-top: 85px;
  margin-left: 156px;
  justify-content: center;
  text-align: center;
}
</style>