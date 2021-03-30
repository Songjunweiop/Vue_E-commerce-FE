<template>
  <div>
    <el-container class="home-container">
      <el-header >
        <el-row style="width: 100%" type="flex" justify="center">
          <el-col :span="4">
            <div style="font-size: 20px">
              <i class="fab fa-accusoft "></i>
            </div>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="12">
            电子商务平台
            <div style="margin-left: 10px"></div>
          </el-col>
          <el-col :span="4"></el-col>
          <el-col :span="2"
            ><div>欢迎！ master   </div>
          </el-col>
          <el-col :span="1">
            <img class="touxiang" src="../assets/images/login_img.jpg" />
          </el-col>
          <el-col :span="0.5">
            <el-dropdown
              trigger="click"
              @command="handleCommand"
              style="margin-left: 0"
            >
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--left"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="b"
                  >欢迎  master </el-dropdown-item
                >
                <el-dropdown-item command="a" style="text-align: center"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          @select="handleSelect"
        >
          <el-menu-item index="index">首页</el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu> -->
          <el-menu-item index="shoppingcar">我的购物车</el-menu-item>
          <el-menu-item index="order">订单管理</el-menu-item>
          <!-- <el-menu-item index="4"><a href="">订单管理</a></el-menu-item> -->
        </el-menu>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 19px;
}
.el-header {
  .tog_button {
    margin-left: 100px;
    // width: 20px;
    // height: 20px;
    background-color: #2b333e;
    font-size: 19px;
    line-height: 24px;
    color: white;
    text-align: center;
    cursor: pointer;
  }
  // background-color: rgba(255, 255, 255, 0.445);
  font-size: 17px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  padding-right: 50px;
  min-width: 500px;
  .el-button.is-round {
    border-radius: 50%;
    padding: 10px;
    line-height: 18px;
    margin-left: 2px;
  }
  > div {
    display: flex;
    align-items: center;
    .el-input {
      width: 240px;
      margin-left: 30px;
    }
  }

  .touxiang {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  img {
    width: 130px;
    height: 40px;
    // margin: 10px 20px;
  }
}
.el-main {
  background-color: #f6f5fa;
  padding: 0;
}
.home-container {
  height: 100%;
}
</style>
