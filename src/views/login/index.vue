<template>
  <div :class="$style.login_wrapper">
    <div :class="$style.bg"></div>
    <div :class="$style.success">This should be red</div>
    <div :class="$style.success">{{time|timeAgo}}</div>
    <el-button type="primary">按钮</el-button>
    
  </div>
</template>

<script>
import { login } from "@/api/login";
import { basicUrl } from "@/utils/config";
// import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
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
      pwdType: "text",
      time: "2019-11-20 00:00:00",
      loginForm: {
        username: "",
        password: "",
        code: ""
      },
      codeUrl: `${basicUrl}/captcha`,
      timestamp: "",
      identifyCode: "",
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        code: [{ required: true, trigger: "blur", message: "验证码不能为空" }]
      },
      loading: false
      // pwdType: "password"
    };
  },
  created() {
    // alert(process.env.NODE_ENV);
    // this.time = dayjs(1565847585845).format("YYYY-MM-DD HH:mm:ss");
    // const date1 = dayjs("2019-01-25");
    // const date2 = dayjs("2019-06-01");
    // this.time = date1.diff(date2, "day"); // 233
  },
  methods: {
    changePwdType() {
      this.pwdType = "password";
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
              duration: 1000
            });
          } else {
            this.$message({
              message: data.errorMsg,
              type: "success",
              duration: 1000,
              onClose: () => {
                data = data.data;
                setUserInfo(data.currAdmins);
                setSideBar(data.rightJsonArray);
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
      this.timestamp = new Date().valueOf();
      // this.codeUrl = `${this.codeUrl}?${Math.floor(Math.random() * (10 - 1) + 1)}`
      // this.isShowCodeImg = false;
      // setTimeout(() => { this.isShowCodeImg = true }, 1000)
    }
    // makeCode(o, l) {
    //   for (let i = 0; i < l; i++) {
    //     this.identifyCode += this.identifyCodes[
    //       this.randomNum(0, this.identifyCodes.length)
    //     ];
    //   }
    //   console.log(this.identifyCode);
    // }
  }
  // mounted() {
  //   this.identifyCode = "";
  //   this.makeCode(this.identifyCodes, 4);
  // },
};
</script>

<style rel="stylesheet/scss" lang="scss" module>
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
  border: 1px solid #ccc !important;
}
.success {
  color: $success;
}
.bold {
  font-weight: bold;
}
.login_wrapper {
  display: flex; //flex布局
  justify-content: center; //使子项目水平居中
  align-items: center; //使子项目垂直居中
  width: 100%;
  height: 100%;
}
.login_wrapper {
  .bg {
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
}
// .login-wrapper .title {
//   position: relative;
//   margin: 0 0 1rem;
//   text-align: center;
//   z-index: 1;
//   font-size: 20px;
// }
// .login-wrapper form {
//   margin-bottom: 80px;
//   width: 15rem;
//   // margin: 0 auto;
//   // display: table-cell;
//   // vertical-align: middle;
// }
// .login-wrapper > form .el-input__inner {
//   color: #475669;
//   border-color: #99a9bf;
//   background-color: transparent;
// }
// .login-wrapper > form .el-input__inner:focus {
//   color: #1f2d3d;
//   border-color: #1f2d3d;
// }
// .login-wrapper .login-button {
//   width: 100%;
// }
// .login-wrapper .login-button.error {
//   animation: shake 0.5s;
// }
// .code {
//   // width: 114px;
//   height: 40px;
//   // border: 1px solid red;
//   position: absolute;
//   top: 0;
//   right: 0;
//   border-radius: 3px;
// }
</style>


