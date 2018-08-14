<template>
  <div class="app-container">
    <el-form :inline="true" :model="formSeacher" size="small" label-width="80px">
      <el-form-item label="公司名称">
        <el-input v-model="formSeacher.companyName" placeholder="请输入公司名称" label=""></el-input>
      </el-form-item>
      <el-form-item label="公司评级">
        <el-select v-model="formSeacher.companyRankCode" placeholder="请输入筛选条件">
          <el-option label="请输入筛选条件" value=""></el-option>
          <el-option label="A" value="1"></el-option>
          <el-option label="B" value="2"></el-option>
          <el-option label="C" value="3"></el-option>
          <el-option label="D" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formSeacher.contactName" placeholder="请输入联系人姓名" label=""></el-input>
      </el-form-item>
      <el-form-item label="对接人">
        <el-input v-model="formSeacher.adminName" placeholder="请输入对接人姓名" label=""></el-input>
      </el-form-item>
      <el-form-item size="small">
        <el-button type="primary" @click="handleseacher" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="clearfix">
      <!-- <el-button size="small" type="primary" style="float:right" @click="addRole()">新增角色</el-button> -->
      <el-button size="small" type="primary" style="float:right" @click="handleEdit()" icon="el-icon-circle-plus-outline">新增委托公司</el-button>
    </div>
    <el-table style="margin-top:15px;" :data="table.list" v-loading.body="table.listLoading" element-loading-text="Loading" fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="公司名称" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.companyName}}
        </template>
      </el-table-column>
      <el-table-column label="评级" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.companyRank}}
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.contactName}}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          {{scope.row.contactMobile}}
        </template>
      </el-table-column>
      <el-table-column label="法人" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.corporationName }}
        </template>
      </el-table-column>
      <el-table-column label="初次委托日期" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.firstTimeFormat }}
        </template>
      </el-table-column>
      <el-table-column label="公司地址" width="310" align="center">
        <template slot-scope="scope">
          {{scope.row.companyAddress }}
        </template>
      </el-table-column>
      <el-table-column label="对接人" width="210" align="center">
        <template slot-scope="scope">
          {{scope.row.adminName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top:20px;">
      <el-col :span="9">
        <el-pagination @size-change="handleSizeChange" @current-change="handleSizeChange" :page-count="pages.pageCount" :current-page.sync="pages.currentPage" :page-size="pages.pageSize" :total="pages.total" layout="total, prev, pager, next,jumper">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 添加公司 -->
    <el-dialog :title="id?'公司编辑':'公司新建'" :visible.sync="dialogFormVisible" width="500px" v-if="dialogFormVisible">
      <el-form :model="formSubmit" :rules="rules" ref="formSubmit" :inline="true" label-width="120px" size="small">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="formSubmit.companyName" auto-complete="off" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="评级" prop="companyRankCode">
          <el-select v-model="formSubmit.companyRankCode" placeholder="请选择评级">
            <el-option label="请选择评级" value=""></el-option>
            <el-option label="A" :value="1"></el-option>
            <el-option label="B" :value="2"></el-option>
            <el-option label="C" :value="3"></el-option>
            <el-option label="D" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="formSubmit.contactName" auto-complete="off" placeholder="请输入公司联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactMobile">
          <el-input v-model="formSubmit.contactMobile" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="法人" prop="corporationName">
          <el-input v-model="formSubmit.corporationName" auto-complete="off" placeholder="请输入法人"></el-input>
        </el-form-item>
        <el-form-item label="初次委托日期" prop="firstTimeFormat">
          <el-date-picker v-model="formSubmit.firstTimeFormat" value-format="yyyy-MM-dd" align="right" placeholder="请输入初次委托日期" type="date" >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="formSubmit.companyAddress" placeholder="请输入公司地址" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="对公账号户名" prop="accountName">
          <el-input v-model="formSubmit.accountName" auto-complete="off" placeholder="请输入对公账号户名"></el-input>
        </el-form-item>
        <el-form-item label="对公账号开户行" prop="bankName">
          <el-input v-model="formSubmit.bankName" auto-complete="off" placeholder="请输入对公账号开户行"></el-input>
        </el-form-item>
        <el-form-item label="对公账号" prop="account">
          <el-input v-model="formSubmit.account" auto-complete="off" placeholder="请输入对公账号"></el-input>
        </el-form-item>
        <el-form-item label="对接人" prop="adminId">
          <el-select v-model="formSubmit.adminId" placeholder="请选择对接人">
            <el-option v-for="item in dockPersonList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button type="primary" size="small" @click="saveCompanyInfo('formSubmit')">确 定</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { showCompanyList, entrustAdminList, getCompanyInfo, addCompany, editCompany } from "@/api/system";
import { tableMixin, pagesMixin } from "@/mixin/";
import { regular } from '@/utils/'

export default {
  mixins: [tableMixin, pagesMixin],
  data() {
    return {
      dialogFormVisible: false,
      formSubmit: {
        companyName: '',
        companyRankCode: '',
        contactName: '',
        contactMobile: '',
        corporationName: '',
        firstTimeFormat: '',
        companyAddress: '',
        bankName: '',
        accountName: '',
        account: '',
        adminId: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请填写公司名称', trigger: 'blur' }
        ],
        companyRankCode: [
          { required: true, message: '请选择评级', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: '请填写联系人', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, message: '请填写联系电话', trigger: 'blur' }, { pattern: regular.phone, message: '请填写正确的手机号码！', trigger: 'blur' }
        ],
        corporationName: [
          { required: true, message: '请填写法人', trigger: 'blur' }
        ],
        firstTimeFormat: [
          { required: true, message: '请填写初次委托日期', trigger: 'blur' }
        ],
        companyAddress: [
          { required: true, message: '请填写公司地址', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '请填写对公账号户名', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请填写对公账号开户行', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请填写对公账号', trigger: 'blur' }
        ],
        adminId: [
          { required: true, message: '请选择对接人', trigger: 'change' }
        ]
      },
      formSeacher: {
        companyName: "",
        companyRankCode: "",
        contactName: "",
        adminName: ""
      },
      dockPersonList: [{ id: "", name: " 请选择对接人" }],
      id: null
    };
  },
  filters: {
    tagFilter(status) {
      const statusMap = {
        0: "info",
        1: "success"
      };
      return statusMap[status];
    },
    textFilter(status) {
      const statusMap = {
        1: "启用",
        0: "禁用"
      };
      return statusMap[status];
    }
  },
  created() {
    this.getEntrustAdminList();
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.table.listLoading = true;
      console.log(this.formSeacher);
      
      let data = await showCompanyList(this.pages.currentPage, this.pages.pageSize, ...Object.values(this.formSeacher));
 
      if (data.code == 1) {
        data = data.data || {};
        this.table.list = data.list || [];
        this.pages.total = parseInt(data.total) || 0;
        this.pages.pageCount = data.page || 0;
        // console.log(data.data)
      } else {
        this.$message({
          message: data.errorMsg,
          type: "warning"
        });
      }
      this.table.listLoading = false;
    },
    async getEntrustAdminList() {
      let data = await entrustAdminList();
      data = [...this.dockPersonList, ...data.data];
      // data.forEach(element => {
      //     delete element.roleName
      //     delete element.sign
      // });
      this.dockPersonList = data;
      // console.log(data);
      
    },
    handleseacher() {
      let obj = this.formSeacher;
      // let isEmpt = obj.companyName || obj.companyRankCode || obj.contactName || obj.adminName;
      // console.log(isEmpt);

      // if (isEmpt == "") {
      //   this.$message({
      //     message: '请输入要查询的内容',
      //     type: 'warning'
      //   });
      // } else {
        this.fetchData();
      // }
    },
    async handleEdit(id) {
      this.dialogFormVisible = true;
      this.id = id;
      let form = this.formSubmit;
      if (id) {
        let data = await getCompanyInfo(id);
        console.log(form)
        if (data.code == 1) {
          data = data.data;
          // data.adminId = parseInt(data.adminId)
          for (let i in form) {
            form[i] = data[i]
          }
        } else {
          this.$message({
            message: data.errorMsg,
            type: 'warning'
          });
        }
      } else {
        for (let i in form) {
          form[i] = ""
        }
      }
      this.formSubmit = form;
    },
    saveCompanyInfo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let id = this.id;
          let val = Object.values(this.formSubmit);
          // console.log(val)
          let data = id ? await editCompany(id, ...val) : await addCompany(...val);
          if (data.code == 1) {
            this.$message({
              message: this.id ? '编辑成功' : '新建成功',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.fetchData();
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
    },
  }
};
</script>
<style scoped>
</style>