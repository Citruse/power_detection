<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/img/tuanzi.jpg" alt="">
            </div>
            <!-- 登陆表单区 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="80px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" label="密码">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type = "password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <!-- 按钮区域-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login_font">
            <p>基于智慧教学大楼的电力大数据WEB远程监测</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //这是登录表单的数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            //这是表单的验证规则对象
            loginFormRules: {
                //验证用户名是否合法
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                //验证密码是否合法
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //点击重置按钮，重置登录表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                const {data:res} = await this.$http.post('/login', this.loginForm);
                if(res.success !== true) {
                    if (res.error == "user not exist") return this.$message.error('用户不存在');
                    if (res.error == "wrong password") return this.$message.error('密码错误！');
                }
                this.$message.success('登陆成功!')
                // 1.将登陆成功之后的token保存到客户端的sessionStorage中
                //  1.1项目中除了登陆之外的其他API接口，必须在登陆之后才能生效
                //  1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
                // console.log(res)
                window.sessionStorage.setItem('token', res.data.token);
                // console.log(res.data.token)
                //  2. 通过编程式导航跳转到后台主页，路由地址为 /home
                this.$router.push("/home");
            });
        }
    }
}
</script>

<style lang="less" scoped> 
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);

    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid rgba(224, 215, 215, 0.925);
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px rgb(122, 122, 122);
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;


        img {
            height: 130px;
            width: 130px;
            border-radius: 50%;
            background-color: rgba(224, 215, 215, 0.925);
        }
    }
    
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.login_font {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 50px;
        color: white;
    }
}

</style>