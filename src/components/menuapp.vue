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
    <div class="homefirst" v-show="applarge">
      <applarge></applarge>
    </div>
    <div class="homefirst" v-show="applunbo">
      <applunbo></applunbo>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isThirdly: "四张大图", //切换标识
      nav: [{ title: "四张大图" }, { title: "底部轮播" }],
      a: [],
      applarge: false,
      applunbo: false
    };
  },
  methods: {
    menu(title) {
      this.isThirdly = title;
      sessionStorage.setItem("isThirdly", this.isThirdly);
      if (this.isThirdly == "四张大图") {
        this.applarge = true;
      } else {
        this.applarge = false;
      }
      if (this.isThirdly == "底部轮播") {
        this.applunbo = true;
      } else {
        this.applunbo = false;
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