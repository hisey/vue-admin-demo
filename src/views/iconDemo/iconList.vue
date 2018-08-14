<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <svg-icon icon-class="table"></svg-icon>
        <span class="icon-text">表格</span>
      </el-col>
      <el-col :span="4">
        <svg-icon icon-class="example"></svg-icon>
        <span class="icon-text">例子</span>
      </el-col>
      <el-col :span="4">
        <svg-icon icon-class="eye"></svg-icon>
        <span class="icon-text">眼睛</span>
      </el-col>
      <el-col :span="4">
        <svg-icon icon-class="form"></svg-icon>
        <span class="icon-text">表单</span>
      </el-col>
      <el-col :span="4">
        <svg-icon icon-class="password"></svg-icon>
        <span class="icon-text">密码</span>
      </el-col>
      <el-col :span="4">
        <svg-icon icon-class="tree"></svg-icon>
        <span class="icon-text">树状</span>
      </el-col>
    </el-row>
        <el-row>
      <el-col :span="4">
        <svg-icon icon-class="users"></svg-icon>
        <span class="icon-text">用户组</span>
      </el-col>
       <el-col :span="4">
        <svg-icon icon-class="role"></svg-icon>
        <span class="icon-text">角色</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getAdminRoleList, changeAdminRoleStatus, delAdminUserRole, addAdminUserRole } from "@/api/user";

export default {
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" scoped>
.el-col {
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
}
.icon-text {
  display: block;
  padding: 5px 0;
  font-size: 14px;
}
</style>


