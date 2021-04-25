<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <!-- <div class="avatar_box">
        <img src="../assets/images/login_img.jpg" alt />
      </div> -->
      <!-- 表单登录 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        class="demo-ruleForm"
        title="注册"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="user_email">
          <el-input v-model="addForm.user_email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="user_tel">
          <el-input v-model="addForm.user_tel"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="user_sex">
          <el-input v-model="addForm.user_sex"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="user_xueli">
          <el-input v-model="addForm.user_xueli"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="user_qq">
          <el-input v-model="addForm.user_qq"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round type="primary" @click="addUser">确 定</el-button>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    //验证电话的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1\d{10}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      form_login: {
        username: '小蜜蜂',
        password: '135978',
      },
      addForm: {
        username: '',
        password: '',
        user_email: '',
        user_tel: '',
        user_qq: '',
        user_sex: '',
        user_xueli: '',
      },
      addFormRules: {
        username: [
          { required: true, message: '别忘了输入账号哦', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        user_email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        user_tel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    zhuce() {
      this.$router.push('/zhuce')
    },
    addUser() {
      //先进行校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return

        //正确则可以发起添加请求
        const { data: res } = await this.$http.post('vips', this.addForm)
        console.log(res)
        if (res.meta.status !== 201) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success('添加用户成功')
        // this.$router.push('/login')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  // background-color: rgb(43, 95, 173);
  height: 100%;
  background-image: url('../assets/images/shan.jpg');
  background-size: cover;
  background-position: 0 60%;
}
.login_box {
  background: rgba(255, 255, 255, 0.8);
  width: 460px;
  border: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  padding-bottom: 10px;
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
.el-button + .el-button {
  margin-left: 30px;
}
</style>
