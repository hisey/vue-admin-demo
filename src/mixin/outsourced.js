import { entrustManageList, waitApprovalList, approvalCheck, downloadEntrustManageList, downloadWaitApprovalList } from '@/api/outsourced'
import { regular } from '@/utils/'

const outsourcedListMixin = {
  data() {
    return {
      seacherData: {
        value: '',
        contentTypeOptions: [{ value: '', label: '请输入筛选条件', name: 'name', hidden: false }, { value: '1', label: "按客户姓名", name: "name", hidden: false }, { value: "2", label: "按手机号", name: "mobile", hidden: false }, { value: "3", label: "按订单号", name: "orderNumber", hidden: false }, { value: "4", label: "按客户区域", name: "", hidden: false }],
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.table.listLoading = true
      const val = {
        page: this.pages.currentPage,
        size: this.pages.pageSize,
        ...this.seacherData.value
      }
      let data = await entrustManageList(...Object.values(val))
      if (data.code < 0) {
        this.$message.error(data.errorMsg)
        this.table.listLoading = false
        return
      }
      if (data.data.list == null) {
        this.$message({
          message: '没有查到相关内容',
          type: 'warning',
          duration: 1500
        })
      } else {
        if (this.isDown) {
          let data1 = await downloadEntrustManageList(...Object.values(val))
          if (data1.code === 1) {
            let aTag = document.createElement('a')
            aTag.download = ''　　　　 // 下载的文件名
            aTag.href = data1.data
            aTag.click()
            this.$message({
              message: "下载成功！",
              type: 'success'
            })
          } else {
            this.$message({
              message: data1.errorMsg,
              type: 'warning'
            })
          }
          this.isDown = false
        }
      }
      data = data.data
      this.table.list = data.list
      this.pages.total = parseInt(data.total) // 总个数
      this.pages.pageCount = data.pageCount // 总页数
      this.amount = data.amount || 0
      this.table.listLoading = false
    },
    handleSizeChange(val) {
      this.pages.currentPage = val
      this.fetchData()
    },
    handseacher(msg) {
      this.seacherData.value = msg
      this.resetData()
    },
    handelDown(msg) {
      // this.isDown = msg
      // downloadEntrustManageList
      this.isDown = msg
    },
    resetData() {
      this.pages.currentPage = 1
      this.fetchData()
    }
  }
}
const outsourcedMixin = {
  data() {
    let validate = (value, callback, data, msg) => {
      data = data || ""
      value = value || ""
      //  console.log(value)
      //  console.log(data)
      //  console.log(value == "" && data != "");
      if (value == "" && data != "") {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    let validateSeacher1 = (rule, value, callback) => {
      let data = this.formSeacher.contentData;
      validate(value, callback, data, "请选择筛选条件");
    };
    let validateSeacher2 = (rule, value, callback) => {
      let data = this.formSeacher.contentType;
      if (data == 2 && value != "") {
        let myreg = regular.phone;
        if (!myreg.test(value)) {
          callback(new Error("请填写正确的手机号码"));
        }
      }
      validate(value, callback, data, "请输入筛选的内容");
    };
    let validateSeacher3 = (rule, value, callback) => {
      let data = this.formSeacher.status;
      validate(value, callback, data, "请选择案件状态");
    };
    return {
      formSeacher: {
        contentType: '',
        contentData: '',
        status: ''
      },
      options: {
        conditionOptions: [{ value: '', label: '请选择筛选条件' },{ value: '1', label: '按客户姓名' }, { value: '2', label: '按手机号' }, { value: '3', label: '按订单号' }, { value: '4', label: '客户区域' }],
        overdueOptions: [{ value: '', label: '请选择审核条件' },{ value: '0', label: '待审核' }, { value: '1', label: '已通过' }, { value: '2', label: '已拒绝' }]
      },
      seacherRules: {
        contentType: [{ validator: validateSeacher1, trigger: "blur" }],
        contentData: [{ validator: validateSeacher2, trigger: "blur" }],
        status: [{ validator: validateSeacher3, trigger: "blur" }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.table.listLoading = true
      const val = {
        page: this.pages.currentPage,
        size: this.pages.pageSize,
        ...this.formSeacher
      }
      let data = await waitApprovalList(...Object.values(val))
      this.table.listLoading = false
      if (data.code < 0) {
        this.$message.error(data.errorMsg)
        return
      }
      if (data.data.list == null) {
        this.$message({
          message: '没有查到相关内容',
          type: 'warning',
          duration: 1500
        })
      }
      data = data.data
      this.table.list = data.list
      this.pages.total = parseInt(data.total) // 总个数
      this.pages.pageCount = data.pageCount // 总页数
      this.amount = data.amount || 0
    },
    handleSizeChange(val) {
      this.pages.currentPage = val
      this.fetchData()
    },
    handseacher(msg) {
      this.$refs.seacherForm.validate( async valid => {
        let tpMsg = { message: "", type: "error" }
        let formSeacher = this.formSeacher
        if (valid) {
          if (!formSeacher.contentData && !formSeacher.status&&msg) {
            tpMsg.message = "请选择要查询的内容";
            this.$message(tpMsg);
          } else {
            if (msg) {
              const val = {
                page: this.pages.currentPage,
                size: this.pages.pageSize,
                ...this.formSeacher
              }
              let data = await downloadWaitApprovalList(...Object.values(val))
              let aTag = document.createElement('a');
              aTag.download = '';　　　　　　// 下载的文件名
              aTag.href = data.data;
              aTag.click();
              this.$message({
                message: "下载成功！",
                type: 'success'
              })
            } else {
              this.fetchData()
            }
          }
        } else {
          console.log("error seacher!");
          return false;
        }
      });
    },
    resetData() {
      this.pages.currentPage = 1
      this.fetchData()
    },
    submit(data, type) {
      if (data.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择审批案件'
        })
      }else{
        for (let i = 0; i < data.length; i++) {
          console.log(data[i])
          if (data[i].status != 0) {
            this.$message({
              message: '所选择的案件中存在已经审批过的案件，请重新选择',
              type: 'warning'
            });
            return false
          };
        }
        let ids = data
          .map(function (value) {
            return value.collectionApplyId;
          })
          .join(",")
        let msg = ''
        if (type === 1) {
          msg = '是否批量通过？'
        } else if (type === 2) {
          msg = '是否批量拒绝？'
        }
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const data = await approvalCheck(ids, type)
          if (data.code === 1) {
            this.$message({
              type: 'success',
              message: '批量操作成功'
            })
            this.resetData()
          } else {
            this.$message({
              type: 'error',
              message: data.errorMsg
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    }
  }
}

export {
  outsourcedListMixin,
  outsourcedMixin
}
