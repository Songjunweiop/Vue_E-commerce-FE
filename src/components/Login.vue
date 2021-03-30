<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/images/login_img.jpg" alt />
      </div>
      <!-- 表单登录 -->
      <el-form
        ref="LoginRef"
        label-width="0px"
        class="login_from"
        :model="form_login"
        :rules="loginFormRules"
      >
        <el-form-item prop="username">
          <el-input placeholder="用户名或邮箱" prefix-icon="el-icon-user" v-model="form_login.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="form_login.password"
            type="password"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login" round>登录</el-button>
          <el-button type="info" @click="rest" round>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form_login: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "别忘了输入账号哦", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击重置
    rest() {
      console.log("this");
      this.$refs.LoginRef.resetFields(); //element中的resetFields方法
    },
    login() {
        this.$router.push("/home")
      // this.$refs.LoginRef.validate(async valid => {
      //   if (!valid) return;
      //   const { data: res } = await this.$http.post("login", this.form_login);
      //   console.log(res);
      //   if (res.meta.status !== 200)
      //     return this.$notify({
      //       title: "错误",
      //       message: "登录失败",
      //       type: "error"
      //     });
      //   this.$notify.success({
      //     title: "登录成功",
      //     message: `欢迎回来~ 亲爱的${res.data.username}`
      //   });
      //   window.sessionStorage.setItem("token",res.data.token);
      //   window.sessionStorage.setItem("username",res.data.username);
      //   window.sessionStorage.setItem("roleId",res.data.rid);
      //   this.$router.push("/home")
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  // background-color: rgb(43, 95, 173);
  height: 100%;
  background-image: url('../assets/images/shan.jpg');
  background-size: cover;
  background-position:0 60%;
}
.login_box {
  // background-color: white;
  background: rgba(255, 255, 255, 0.8);
  height: 350px;
  width: 460px;
  // border-radius: 7px;
  border: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    border: 2px solid white;
    // box-shadow: white;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      // transform: scale(1);
    }
  }
}

.login_from {
  position: absolute;
  bottom: 30px;
  width: 80%;
  left: 50%;
  transform: translate(-50%);
}
.btns {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.el-button.is-round {
    border-radius: 20px;
    padding: 12px 50px;
}
.el-button+.el-button {
    margin-left: 30px;
}
</style>