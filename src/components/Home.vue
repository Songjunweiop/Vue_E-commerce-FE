<template>
  <div>
    <el-container class="home-container">
      <el-header >
        <div class="aaa">
          <el-row style="width: 100%" type="flex" justify="center">
            <el-col :span="4">
              <div style="font-size: 25px">
                <i class="fab fa-accusoft "></i>
              </div>
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="12" style="font-size: 18px">
              电子商务平台
              <div style="margin-left: 10px"></div>
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="2"><div style="font-size: 16px">欢迎！ master</div> </el-col>
      
            <el-col :span="1" style="height: 60px;">
              <img class="touxiang" src="../assets/images/login_img.jpg" />
            </el-col>
            <el-col :span="0.5">
              <el-dropdown trigger="click" style="margin-left: 0">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--left"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="b">欢迎 master </el-dropdown-item>
                  <el-dropdown-item command="a" style="text-align: center"
                    >退出</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
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
          <el-menu-item index="shoppingcar">我的购物车</el-menu-item>
          <el-menu-item index="order">订单管理</el-menu-item>
        </el-menu>
      </el-main>
      <el-footer>
        <div style="top: 120px; position: relative">
          <router-view />
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 19px;
}
.el-header {
  z-index: 9999;
  position: fixed;
  font-size: 17px;
  overflow: hidden;
  width: 100%;
  .aaa {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    align-items: center;
    padding: 0px;
    padding-right: 50px;
    min-width: 200px;
    background-color: #fff;
    > div {
      display: flex;
      align-items: center;
      .el-input {
        width: 240px;
        margin-left: 30px;
      }
    }
  }

  .touxiang {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 10px;
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
  .el-menu-demo {
    top: 60px;
    padding: 0 200px;
    z-index: 898;
    // height: 120px;
    width: 100%;
    position: fixed;
  }
}
.home-container {
  height: 100%;
}
</style>
