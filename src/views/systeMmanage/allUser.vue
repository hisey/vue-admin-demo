<template>
  <div class="app-container">
    <el-form :inline="true" :model="formSeacher.form" ref="formSeacher" :rules="formSeacher.rules" size="small" label-width="20px">
      <el-form-item label="" prop="roleId">
        <el-select v-model="formSeacher.form.roleId" placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="groupId">
        <el-select v-model="formSeacher.form.groupId" placeholder="请选择所属组别">
          <el-option v-for="item in roleGroupList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="searchType">
        <el-select v-model="formSeacher.form.searchType" placeholder="请选择查询条件">
          <el-option key="" value="" label="请选择查询条件"></el-option>
          <el-option key="1" value="1" label="员工姓名"></el-option>
          <el-option key="2" value="2" label="手机号"></el-option>
          <el-option key="3" value="3" label="地区"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="searchWord">
        <el-input v-model="formSeacher.form.searchWord" @keyup.enter.native="handleSearch('formSeacher')" placeholder="请输入查询内容" :min="1" :max="10" label=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="isWork">
        <el-select v-model="formSeacher.form.isWork" placeholder="是否在职">
          <el-option key="" value="" label="是否在职"></el-option>
          <el-option key="0" value="0" label="在职"></el-option>
          <el-option key="1" value="1" label="离职"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small">
        <el-button type="primary" @click="handleSearch('formSeacher')" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="clearfix">
      <el-button size="small" type="primary" style="float:right" @click="handelEdit()" icon="el-icon-circle-plus-outline">新增用户</el-button>
    </div>
    <el-table height="650" :data="table.list" v-loading.body="table.listLoading" element-loading-text="Loading" fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="210">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column label="员工编号" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.number}}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="所属组别" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.groupName}}
        </template>
      </el-table-column>
      <el-table-column label="地区" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.area}}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status|tagFilter">{{scope.row.statusStr}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handelEdit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" @click="handelResetPwd(scope.row.id)" icon="el-icon-setting">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top:20px;">
      <el-col :span="9">
        <el-pagination @size-change="handleSizeChange" @current-change="handleSizeChange" :page-count="pages.pageCount" :current-page.sync="pages.currentPage" :page-size="pages.pageSize" :total="pages.total" layout="total, prev, pager, next,jumper">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 添加用户 -->
    <el-dialog :title="editUserForm.id?'人员编辑':'人员新建'" :visible.sync="editUserForm.dialogFormVisible" v-if="editUserForm.dialogFormVisible" width="40%">
      <el-form :model="editUserForm.form" :rules="editUserForm.rules" ref="editUserForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editUserForm.form.name" auto-complete="off" @keyup.enter.native="saveEdit" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserForm.form.mobile" :disabled="disabled" auto-complete="off" @keyup.enter.native="saveEdit" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editUserForm.form.password" :disabled="disabled" auto-complete="off" type="password" @keyup.enter.native="saveEdit" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-input v-model="editUserForm.form.area" auto-complete="off" @keyup.enter.native="saveEdit" placeholder="请输入地区"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="doorArea" v-if="editUserForm.form.roleId==12">
          <!-- 当角色id等于12（即账号角色为门店的时候，显示区域字段） -->
          <el-select v-model="editUserForm.form.doorArea" placeholder="">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="roleId">
          <el-select v-model="editUserForm.form.roleId" placeholder="">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属组别" prop="groupId" v-if="editUserForm.form.roleId==3||editUserForm.form.roleId==4">
          <!-- 当角色id等于3或4的时候（即账号角色为催收专员与催收主管的时候显示该字段） -->
          <el-select v-model="editUserForm.form.groupId" placeholder="">
            <el-option v-for="item in roleGroupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editUserForm.form.status" placeholder="请选择在职状态">
            <!-- <el-option label="" value=""></el-option> -->
            <el-option label="在职" :value="0"></el-option>
            <el-option label="离职" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button type="primary" @click="saveEdit()" size="small">确 定</el-button>
        <el-button @click="editUserForm.dialogFormVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="resetPwd.dialogFormVisible" width="100px">
      <el-form :model="resetPwd.form" ref="resetPwdForm" :rules="resetPwd.rules" label-width="80px">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="resetPwd.form.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="resetPwd.form.confirmPassword" placeholder="请再次输入密码" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetPwd.dialogFormVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveResetPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getAdminsList,
  addAdmins,
  getAdminInfo,
  getRoleGroupList,
  editAdmins,
  getAreaList,
  resetPassword
} from "@/api/system";
import { tableMixin, pagesMixin } from "@/mixin/";
import { regular } from "@/utils/";
import { getUserInfo, removeUserInfo, removeSideBar } from '@/utils/auth' // 验权


export default {
  mixins: [tableMixin, pagesMixin],
  data() {
    let validate = (value, callback, data, msg) => {
      data = data || "";
      value = value || "";
      if (value == "" && data != "") {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    let validateSeacher1 = (rule, value, callback) => {
      let data = this.formSeacher.searchWord;
      validate(value, callback, data, "请选择筛选条件");
    };
    let validateSeacher2 = (rule, value, callback) => {
      let data = this.formSeacher.searchType;
      if (data == 2 && value != "") {
        let myreg = regular.phone;
        if (!myreg.test(value)) {
          callback(new Error("请填写正确的手机号码"));
        }
      }
      validate(value, callback, data, "请输入筛选的内容");
    };
    return {
      disabled: false,
      formSeacher: {
        form: {
          roleId: "",
          groupId: "",
          searchType: "",
          searchWord: "",
          isWork: ""
        },
        rules: {
          searchType: [{ validator: validateSeacher1, trigger: "blur" }],
          searchWord: [{ validator: validateSeacher2, trigger: "blur" }]
        }
      },
      roleList: [{ id: "", name: " 请选择角色" }],
      roleGroupList: [{ id: "", name: " 请选择所属组别" }],
      areaList: [{ id: "", name: "请选择区域" }],
      resetPwd: {
        dialogFormVisible: false,
        form: {
          adminId: "",
          password: "",
          confirmPassword: ""
        },
        rules: {
          password: [
            { required: true, message: "请输入密码", trigger: "blur" }
          ],
          confirmPassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }]
        }
      },
      editUserForm: {
        id: null,
        dialogFormVisible: false,
        // passwordBak: "",
        form: {
          name: "",
          mobile: "",
          password: "",
          area: "",
          roleId: "",
          groupId: "",
          status: 0,
          doorArea: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入用户姓名", trigger: "blur" }
          ],
          mobile: [
            { required: true, message: "请输入手机号码", trigger: "blur" },
            { pattern: regular.phone, message: '请填写正确的手机号码！', trigger: 'blur' }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" }
          ],
          area: [{ required: true, message: "请输入地区", trigger: "blur" }],
          roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
          groupId: [{ required: true, message: "请选择组别", trigger: "blur" }],
          status: [{ required: true, message: "请选择状态", trigger: "blur" }],
          doorArea: [{ required: true, message: "请选择区域", trigger: "blur" }]
        }
      }
    };
  },
  filters: {
    tagFilter(status) {
      const statusMap = {
        0: "success",
        1: "info"
      };
      return statusMap[status];
    },
    textFilter(status) {
      const statusMap = {
        0: "在职",
        1: "离职"
      };
      return statusMap[status];
    }
  },
  created() {
    this.getRoleListData();
    this.getRoleGroupData();
    this.getAreaList();
    this.fetchData();
  },
  methods: {
    async getRoleListData() {
      let data = await getRoleList();
      data = [...this.roleList, ...data.data,];
      this.roleList = data;
    },
    async getRoleGroupData() {
      let data = await getRoleGroupList();
      data = [...this.roleGroupList, ...data.data];
      this.roleGroupList = data;
    },
    async getAreaList() {
      let data = await getAreaList();
      data = [...this.areaList, ...data.data];
      this.areaList = data;
    },
    async fetchData() {
      this.table.listLoading = true;
      let data = await getAdminsList(this.pages.currentPage, this.pages.pageSize, ...Object.values(this.formSeacher.form));
      if (data.code == 1) {
        data = data.data;
        this.table.list = data ? data.list : [];
        this.pages.total = data ? parseInt(data.total) : 0;
        this.pages.pageCount = data ? data.page : 0;
        // console.log(data.data)
      } else {
        this.$message({
          message: data.errorMsg,
          type: "warning"
        });
      }
      this.table.listLoading = false;
    },
    handleSearch(formName) {
      this.$refs[formName].validate(valid => {
        let obj = this.formSeacher.form;
        if (valid) {
          this.fetchData()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async handelEdit(id) {
      this.editUserForm.dialogFormVisible = true;
      let form = this.editUserForm.form;
      if (id) {
        let data = await getAdminInfo(id);
        if (data.code == 1) {
          data = data.data;
          data.groupId = data.groupId == 0 ? "" : data.groupId   //催收经理与总监的角色组id是为'0'，转化为空字符串，java后台的坑，请知晓！
          for (let i in form) {
            form[i] = data[i]
          }
        } else {
          this.$message({
            message: data.errorMsg,
            type: 'warning'
          });
        }
        this.disabled = true;
      } else {
        for (let i in form) {
          form[i] = ""
        }
        this.disabled = false;
      }
      this.editUserForm.id = id;
      this.editUserForm.form = form;
    },
    async saveEdit() {
      this.$refs.editUserForm.validate(async (valid) => {
        if (valid) {
          let editUserForm = this.editUserForm;
          let id = editUserForm.id;
          let val = Object.values(editUserForm.form)
          let data = id ? await editAdmins(...val, id) : await addAdmins(...val);
          if (data.code == 1) {
            this.$message({
              message: id ? '编辑成功' : '新建成功',
              type: 'success'
            });
            this.editUserForm.dialogFormVisible = false
            this.fetchData();
            if (id == getUserInfo().id) {
              this.$message({
                message: '您修改了本人的用户信息，需要重新登录',
                type: 'warning',
                duration: 2000,
                onClose: () => {
                  removeUserInfo();
                  removeSideBar();
                  location.reload();
                }
              });
            }
          } else {
            this.$message({
              message: data.errorMsg,
              type: 'warning'
            });
          }        }      })

    },
    handelResetPwd(id) {
      this.resetPwd.form.adminId = id;
      this.resetPwd.dialogFormVisible = true;
    },
    async saveResetPwd() {
      this.$refs.resetPwdForm.validate(async (valid) => {
        if (valid) {
          let data = await resetPassword(...Object.values(this.resetPwd.form));
          if (data.code == 1) {
            this.$message({
              message: '修改密码成功！',
              type: 'success'
            });
            this.resetPwd.dialogFormVisible = false;

          } else {
            this.$message({
              message: data.errorMsg,
              type: 'warning'
            });
          }
        }
        // if()
      })
    }
  }
};
</script>
<style scoped>
</style>