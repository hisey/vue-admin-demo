<template>
  <!-- <div class="wrapper "></div> -->
  <div class="login-wrapper">
    <img src="../../assets/images/newLogo.png" style="position:absolute;z-index:1;top:10px;left:10px;width:200px;" alt="">
    <div class="bg"></div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h4 class="title">贷后管理后台</h4>
      <el-form-item prop="username">
        <!-- <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input type="text" v-model="loginForm.username" @keyup.enter.native="handleLogin" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span> -->
        <el-input :type="pwdType" @focus="changePwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码"></el-input>
        <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span> -->
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="loginForm.code" @keyup.enter.native="handleLogin" placeholder="请输入验证码" style="width: 135px;"></el-input>
        <div class="code" @click="refreshCode">
          <!-- <s-identify :identifyCode="identifyCode"></s-identify> -->
          <img style="width: 90px;" :src="codeUrl+'?'+timestamp" alt="">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" class="login-button" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: root</span>
        <span> password: root</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { setUserInfo, setSideBar } from '@/utils/auth' // 验权
import { login } from "@/api/login";
import { basicUrl } from '@/utils/env'
// import { searchCaseOfBelong } from "@/api/login";
// import SIdentify from './components/identify'

// let  store = require('store')
export default {
  name: "login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码不能小于4位"));
      } else {
        callback();
      }
    };
    return {
      pwdType: 'text',
      loginForm: {
        username: "",
        password: "",
        code: ""
      },
      // isShowCodeImg: true,
      codeUrl: `${basicUrl}/captcha`,
      timestamp: "",
      identifyCode: "",
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }],
        code: [{ required: true, trigger: "blur", message: "验证码不能为空" }]
      },
      loading: false,
      pwdType: "password"
    };
  },
  methods: {
    changePwdType() {
      this.pwdType = "password"
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          this.loginForm.username = this.loginForm.username.trim();
          let data = await login(...Object.values(this.loginForm));
          this.loading = false;
          if (data.code != 1) {
            this.$message({
              message: data.errorMsg,
              type: "warning",
              duration: 1000,
            });
          } else {
            this.$message({
              message: data.errorMsg,
              type: "success",
              duration: 1000,
              onClose: () => {
                data = data.data;
                setUserInfo(data.currAdmins)
                setSideBar(data.rightJsonArray)
                this.$router.push({ path: "/" });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // randomNum(min, max) {
    //   return Math.floor(Math.random() * (max - min) + min);
    // },
    refreshCode() {
      // this.timestamp = Math.floor(Math.random() * (100 - 1) + 1);
      this.timestamp = (new Date()).valueOf();
      // this.codeUrl = `${this.codeUrl}?${Math.floor(Math.random() * (10 - 1) + 1)}`
      // this.isShowCodeImg = false;
      // setTimeout(() => { this.isShowCodeImg = true }, 1000)
    },
    // makeCode(o, l) {
    //   for (let i = 0; i < l; i++) {
    //     this.identifyCode += this.identifyCodes[
    //       this.randomNum(0, this.identifyCodes.length)
    //     ];
    //   }
    //   console.log(this.identifyCode);
    // }
  },
  // mounted() {
  //   this.identifyCode = "";
  //   this.makeCode(this.identifyCodes, 4);
  // },
};
</script>

<style rel="stylesheet/scss" lang="scss">
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
  border: 1px solid #ccc !important;
}
.login-wrapper {
  display: flex; //flex布局
  justify-content: center; //使子项目水平居中
  align-items: center; //使子项目垂直居中
  width: 100%;
  height: 100%;
  /*.lang
    position fixed
    right 1.5rem
    bottom @right
    width 5rem
    .el-input__icon
      display none
    input
      height 1.75rem
      border none
      padding-right 10px
      text-align center
      color $color-white-dark
      background-color rgba(255,255,255,.4)
      &:hover
        color $color-white
        background-color rgba(255,255,255,.25)*/
}
.login-wrapper .bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 100%;
  background-image: url("../../assets/images/login-bg.jpg");
}
.login-wrapper .title {
  position: relative;
  margin: 0 0 1rem;
  text-align: center;
  z-index: 1;
  font-size: 20px;
}
.login-wrapper form {
  margin-bottom: 80px;
  width: 15rem;
  // margin: 0 auto;
  // display: table-cell;
  // vertical-align: middle;
}
.login-wrapper > form .el-input__inner {
  color: #475669;
  border-color: #99a9bf;
  background-color: transparent;
}
.login-wrapper > form .el-input__inner:focus {
  color: #1f2d3d;
  border-color: #1f2d3d;
}
.login-wrapper .login-button {
  width: 100%;
}
.login-wrapper .login-button.error {
  animation: shake 0.5s;
}
.code {
  // width: 114px;
  height: 40px;
  // border: 1px solid red;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 3px;
}
</style>


