<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height: 60px">
      <div>
        <img src="../assets/img/cute.jpg" alt="picture" />
        <span style="font-size: 17px"
          >基于智慧教学大楼的电力大数据WEB远程监测</span
        >
      </div>
      <!-- 天气插件 -->
      <div id="he-plugin-simple"></div>
      <div>
        <el-button type="info" @click="test" size="mini"
          >test<i class="el-icon-message-solid el-icon--right"></i
        ></el-button>
        <el-button type="warning" @click="person" size="mini"
          >个人<i class="el-icon-user-solid el-icon--right"></i
        ></el-button>
        <el-button type="danger" @click="warning" size="mini"
          >警告<i class="el-icon-message-solid el-icon--right"></i
        ></el-button>
        <el-button type="primary" @click="welcome" size="mini"
          >首页<i class="el-icon-house el-icon--right"></i
        ></el-button>
        <el-button type="info" @click="logout" size="mini"
          >退出<i class="el-icon-switch-button el-icon--right"></i
        ></el-button>
      </div>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside style="width: auto">
        <!-- 侧边栏菜单区 -->
        <!-- :collapse="isCollapsef" -->
        <el-menu
          background-color="#000000"
          text-color="#fff"
          active-text-color="#409BFE"
          :unique-opened="true"
          :collapse="true"
          :collapse-transition="false"
          :router="true"
        >
          <!-- 实时数据 -->
          <el-menu-item index="a">整体</el-menu-item>
          <el-menu-item index="f1">1楼</el-menu-item>
          <el-menu-item index="f2">2楼</el-menu-item>
          <el-menu-item index="f3">3楼</el-menu-item>
          <el-menu-item index="f4">4楼</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-container>
        <el-main>
          <!-- 路由占位符 -->
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //   是否折叠
      isCollapse: false,
    };
  },
  created() {
    this.checkAlarm();
  },
  methods: {
    async checkAlarm() {
      const { data: res } = await this.$http.get("/data/alarm", {
        headers: this.pushToken,
      });
      let datas = res.data;
      var mesg = datas.building + datas.floor + "楼" + datas.classroom + "有报警信息：" + datas.info;
      console.log(datas)
      if (res) {
        this.$notify({
          title: "警告",
          message: mesg,
          duration: 0,
        });
      }
      setTimeout(() => {
        this.checkAlarm();
      }, 20000);
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    welcome() {
      this.$router.push("/welcome");
    },
    warning() {
      this.$router.push("/warning");
    },
    test() {
      this.$router.push("/test");
    },
    person() {
      this.$router.push("/person");
    },
    //点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  mounted() {
    //天气插件配置
    window.WIDGET = {
      CONFIG: {
        modules: "10234",
        background: "1",
        tmpColor: "FFFFFF",
        tmpSize: "16",
        cityColor: "FFFFFF",
        citySize: "16",
        aqiColor: "FFFFFF",
        aqiSize: "16",
        weatherIconSize: "24",
        alertIconSize: "18",
        padding: "10px 10px 10px 10px",
        shadow: "0",
        language: "auto",
        borderRadius: "5",
        fixed: "false",
        vertical: "top",
        horizontal: "left",
        key: "be553b26f791444a96e03977b1eeb291",
      },
    };
    //引入天气插件
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src =
      "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
    document.body.appendChild(s);
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  color: #fff;
}

.el-footer {
  // background-color: rgb(0, 0, 0);

  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 20px;
}

.el-header {
  // background-color: rgb(0, 0, 0);
  background-image: url("../assets/img/pageBg.png");
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
}

.el-aside {
  // background-color: #000000;
  background-image: url("../assets/img/pageBg.png");
  .el-menu {
    border-right: none;
  }
}

.el-main {
  // background-color: rgba(22, 20, 37, 0.678);
  background-image: url("../assets/img/pageBg.png");
}
</style>