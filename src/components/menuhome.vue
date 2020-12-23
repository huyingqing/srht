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
            :class="isSecond === item.title ? 'active' : ''"
            @click="menu(item.title)"
          >
            <p>{{ item.title }}</p>
          </li>
        </ul>
        <!-- END -->
      </div>
    </div>
    <div class="homefirst" v-show="homefirst">
      <homefirst></homefirst>
    </div>
    <div class="homefirst" v-show="homenews">
      <homenews></homenews>
    </div>
    <div class="homefirst" v-show="homeapp">
      <homeapp></homeapp>
    </div>
    <div class="homefirst" v-show="homefour">
      <homefour></homefour>
    </div>
    <div class="homefirst" v-show="homeinterview">
      <homeinterview></homeinterview>
    </div>
    <div class="homefirst" v-show="homebigone">
      <homebigone></homebigone>
    </div>
    <div class="homefirst" v-show="homebigtwo">
      <homebigtwo></homebigtwo>
    </div>
    <div class="homefirst" v-show="homebigthree">
      <homebigthree></homebigthree>
    </div>
     <div class="homefirst" v-show="homefooter">
      <homefooter></homefooter>
    </div>
     <div class="homefirst" v-show="homefooter">
      <ceshi></ceshi>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSecond: "轮播图", //切换标识
      nav: [
        { title: "轮播图" },
        { title: "滚动新闻" },
        { title: "APP下载图片" },
        { title: "四排图标" },
        { title: "访谈图片" },
        { title: "大图一" },
        { title: "大图二" },
        { title: "大图三" },
        { title: "大图四" }
      ],
      a: [],
      homefirst: false,
      homenews: false,
      homeapp: false,
      homefour: false,
      homeinterview: false,
      homebigone: false,
      homebigtwo: false,
      homebigthree:false,
      homefooter:false
    };
  },
  methods: {
    menu(title) {
      this.isSecond = title;
      sessionStorage.setItem("isSecond", this.isSecond);
      if (this.isSecond == "轮播图") {
        this.homefirst = true;
      } else {
        this.homefirst = false;
      }
      if (this.isSecond == "滚动新闻") {
        this.homenews = true;
      } else {
        this.homenews = false;
      }
      if (this.isSecond == "APP下载图片") {
        this.homeapp = true;
      } else {
        this.homeapp = false;
      }
      if (this.isSecond == "四排图标") {
        this.homefour = true;
      } else {
        this.homefour = false;
      }
      if (this.isSecond == "访谈图片") {
        this.homeinterview = true;
      } else {
        this.homeinterview = false;
      }
      if (this.isSecond == "大图一") {
        this.homebigone = true;
      } else {
        this.homebigone = false;
      }
      if (this.isSecond == "大图二") {
        this.homebigtwo = true;
      } else {
        this.homebigtwo = false;
      }
      if (this.isSecond == "大图三") {
        this.homebigthree = true;
      } else {
        this.homebigthree = false;
      }
       if (this.isSecond == "大图四") {
        this.homefooter = true;
      } else {
        this.homefooter = false;
      }
    },
    ceshi() {
      // this.axios.post("insert", { name: "121212" }).then(res => {
      //   console.log(res);
      // });
    }
  },
  mounted() {
    this.isSecond = sessionStorage.getItem("isSecond");
    this.ceshi();
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