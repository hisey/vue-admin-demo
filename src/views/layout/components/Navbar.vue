<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>上次登录时间：{{lastLoginTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{groupName}}&nbsp;&nbsp;{{roleName}} &nbsp;&nbsp;{{name}}</span>
          <!-- <img class="user-avatar" src="src/assets/404_images/404_cloud.png"> -->
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <!-- <router-link class="inlineBlock" to="/"> -->
          <el-dropdown-item>
            <span @click="pwd.dialogFormVisible=true">
              修改密码
            </span>
          </el-dropdown-item>
          <!-- </router-link> -->
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">安全退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <el-dialog title="修改密码" :visible.sync="pwd.dialogFormVisible" width="100px">
      <el-form :model="pwd.form" ref="modifyPwdForm" :rules="pwd.rules" label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="pwd.form.oldPassword" auto-complete="off" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="pwd.form.password" auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="pwd.form.confirmPassword" auto-complete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="pwd.dialogFormVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveModifyPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { loginout, updatePassword } from '@/api/login'
import { getUserInfo, removeUserInfo, removeSideBar } from '@/utils/auth' // 验权
// let store = require('store')
// import { removeToken } from '@/utils/auth' // 验权
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     if (this.pwd.form.password !== '') {
    //       this.$refs.modifyPwdForm('password');
    //     }
    //     callback();
    //   }
    // };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pwd.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      pwd: {
        dialogFormVisible: false,
        form: {
          oldPassword: "",
          password: "",
          confirmPassword: ""
        },
        rules: {
          oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
          password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
          confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }]
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    name() {
      return getUserInfo().name
    },
    roleName() {
      return getUserInfo().roleName
    },
    groupName() {
      return getUserInfo().groupName
    },
    lastLoginTime() {
      return getUserInfo().lastLoginTime
    }

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    async logout() {
      let data = await loginout();
      if (data.code == 1) {
        this.$message({
          message: "您已安全退出",
          type: "success",
          duration: 1000,
          onClose: () => {
            removeUserInfo()
            removeSideBar();
            this.$router.push({ path: "/login" });
          }
        });
      } else {
        this.$message({
          message: "安全退出失败，请联系管理员",
          type: "warning",
        })
      }
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
    },
    async handleModifyPwd() {

    },
    async saveModifyPwd() {
      this.$refs.modifyPwdForm.validate(async (valid) => {
        if (valid) {
          let data = await updatePassword(...Object.values(this.pwd.form))
          if (data.code == 1) {
            this.$message({
              message: '修改密码成功',
              type: 'success'
            });
            this.pwd.dialogFormVisible = false;
          } else {
            this.$message({
              message: data.errorMsg,
              type: 'warning'
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

