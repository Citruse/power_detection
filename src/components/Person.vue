<template>
  <div class="container" id="person_container">
    <div id="person_box">
      <el-card class="box-card" id="personal_card" v-loading="loading">
        <div class="card-header">
          <span>用户信息<i class="el-icon-user"></i></span>
          <div>
            <el-button class="button" type="text" @click="changeUsername"
              >更改用户名</el-button
            >
            <span style="font-size: 14px; font-weight: normal">/</span>
            <el-button class="button" type="text" @click="changeUserpassword"
              >更改密码</el-button
            >
          </div>
        </div>
        <el-form
          ref="pushFormRef"
          :label-position="labelPosition"
          label-width="80px"
          :model="userMessage"
          :rules="pushFormRules"
        >
          <el-form-item prop="username" label="用户名称">
            <el-input
              v-model="userMessage.username"
              :disabled="formAble.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="用户密码">
            <el-input
              v-model="userMessage.password"
              :disabled="formAble.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: space-between">
          <div style="font-size: 14px; margin-top: 40px">
            <div>账号创建时间：</div>
            <div>{{ this.userMessage.created_at }}</div>
            <div>账号信息上次更新时间：</div>
            <div>{{ this.userMessage.updated_at }}</div>
          </div>
          <div>
            <el-button type="primary" :disabled="pushButton" @click="push"
              >提交更改</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //是否加载
      loading: true,
      // 获取用户信息， header携带token验证
      pushToken: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      labelPosition: "right",
      // 信息表单内的数据
      userMessage: {
        username: "",
        password: "******",
        created_at: "",
        updated_at: "",
      },
      // 表单内数据是否能够更改
      formAble: {
        username: true,
        password: true,
      },
      // 数据提交按钮
      pushButton: true,
      // 新修改的数据类型
      pushType: 0,
      //验证用户数据是否合法
      pushFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      // 提交的表单
      pushForm: {},
    };
  },
  created() {
    this.getUserMessage();
  },
  mounted() {},
  methods: {
    // 获取用户数据
    async getUserMessage() {
      const { data: res } = await this.$http.get("/me", {
        headers: this.pushToken,
      });
      this.userMessage.username = res.data.username;
      this.userMessage.created_at = res.data.created_at;
      this.userMessage.updated_at = res.data.updated_at;
      this.loading = false;
      // console.log(res);
    },
    // 允许更改用户名
    changeUsername() {
      this.formAble.password = true;
      this.pushButton = false;
      this.formAble.username = false;
      this.userMessage.password = "******";
      this.pushType = 1;
    },
    // 允许更改用户密码
    changeUserpassword() {
      this.formAble.username = true;
      this.pushButton = false;
      this.formAble.password = false;
      this.userMessage.password = "";
      this.pushType = 2;
    },
    // 提交更改
    push() {
      if (this.pushType === 1) {
        this.pushForm = {
          type: this.pushType,
          username: this.userMessage.username,
        };
      } else {
        this.pushForm = {
          type: this.pushType,
          password: this.userMessage.password,
        };
      }
      this.$refs.pushFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put("/me", this.pushForm, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (res.success !== true) {
          return this.$message.error("提交失败");
        }
        this.$message.success("提交成功!");
        this.formAble.username = true,
        this.formAble.password = true,
        this.pushButton = true,
        this.getUserMessage();
      });
    },
  },
};
</script>
<style scoped lang="less">
.text {
  font-size: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 80%;
}

#personal_card {
  padding: 20px;
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

#person_box {
  margin: 0 auto;
  margin-top: 4%;
  height: 60%;
}

#person_container{
  height: auto;
}
</style>
