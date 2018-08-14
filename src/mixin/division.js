import {
  phoneCollectionList,
  entrustCollectionList
} from "@/api/division";
import transferGroup from "@/views/division/components/transferGroup";
import removeQueueBtn from "@/views/division/components/removeQueueBtn";
import caseQueueFooter from "@/views/division/components/caseQueueFooter";
import { downloadPhoneCollectionList, downloadEntrustCollectionList } from '@/api/division'
let divisionListMixin = {
  data() {
    return {
      amount: 0.0,
      seacherData: {
        value: null,
        timeTypeOptions: [{
          value: "",
          label: "请选择日期条件",
          name: "name"
        },
        {
          value: "1",
          label: "日期",
          name: "loanTime"
        },
        {
          value: "2",
          label: "放款日期",
          name: "loanTime"
        },
        {
          value: "3",
          label: "应还日期",
          name: "repaymentTime"
        }
        ]
      },
    }
  },
  computed: {
    seacherVal() {
      return this.seacherData.value
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.table.listLoading = true;
      let val = {
        status: this.status,
        page: this.pages.currentPage,
        size: this.pages.pageSize,
        ...this.seacherData.value
      };
      // val = Object.assign(val, this.seacherData.value);

      // console.log(...Object.values(val);
      let data = val.status.indexOf("ENTRUST") > -1 ? await entrustCollectionList(...Object.values(val)) : await phoneCollectionList(...Object.values(val))
      if (data.code == 1) {
        data = data.data;
        this.table.list = data.list;
        this.pages.total = parseInt(data.total); //总个数
        this.pages.pageCount = data.pageCount; //总页数
        this.amount = data.amount || 0;
        this.table.listLoading = false;
      } else {
        this.$message({
          message: data.errorMsg,
          type: 'warning'
        });
        this.table.listLoading = false;
        return false
      }
      if (data.list == null) {
        this.$message({
          message: "没有查到相关内容",
          type: "warning",
          duration: 1500
        });
      } else {
        if (this.isDown) {
          let data1 = val.status.indexOf("ENTRUST") > -1 ? await downloadEntrustCollectionList(...Object.values(val)) : await downloadPhoneCollectionList(...Object.values(val))
          if (data1.code == 1) {
            if (data1.code == 1) {
              let aTag = document.createElement('a');
              aTag.download = '';　　　　　　// 下载的文件名
              aTag.href = data1.data;
              aTag.click();
              this.$message({
                message: "下载成功！",
                type: 'success'
              });
            } else {
              this.$message({
                message: data1.errorMsg,
                type: 'warning'
              });
            }
            this.isDown = false;
          }
        }
      }
      this.table.listLoading = false;
    },
    handseacher(msg) {
      this.seacherData.value = msg;
      this.resetData();
    },
    resetData() {
      this.pages.currentPage = 1;
      this.fetchData();
    },
    handTabSwitch() {
      let hide = {
        ENTRUST_COLLECTION: false,
        WAIT_ALLOT_ENTRUST: true,
        MOBILE_COLLECTION: false,
        WAIT_ALLOT_MOBILE: true,
        DOOR_COLLECTION: true
      };
      let bool = this.status.indexOf("ENTRUST");
      let arr = bool > -1 ? [5, 6] : [5];
      arr.forEach((val) => {
        this.seacherData.contentTypeOptions[val].hidden = hide[this.status];
      });
      this.seacherData.value = null;
      this.resetData();
    },
    handelDown(msg) {
      this.isDown = msg;
    }
    // handleSelectionChange(data) {
    //   this.table.selectedData = data.selectedData;
    //   this.table.multipleId = data.multipleId;
    // }
  },
}
let divisionQueueMixin = {
  components: {
    transferGroup,
    removeQueueBtn,
    caseQueueFooter
  },
  data() {
    return {
      titlesKey: "QUEUE",
      titles: {
        QUEUE: "队列",
        PREVIEW: "预览",
        RESULT: "结果"
      },
      acountNum: "0",
      totalAmount: "0",
      transferVal: '',
    };
  },
  computed: {
    selectedData() {
      return this.table.selectedData
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取列表数据
    async fetchData() {
      this.table.listLoading = true;
      let val = [
        this.status,
        this.pages.currentPage,
        this.pages.pageSize,
      ]
      let data = val[0].indexOf("ENTRUST") > -1 ? await entrustCollectionList(...val) : await phoneCollectionList(...val)
      if (data.code == 1) {
        data = data.data;
        this.rendTable(data);
      } else {
        this.$message({
          message: data.errorMsg,
          type: 'warning'
        });
      }
    },
    rendTable(d) {
      this.table.list = d.list;
      this.pages.total = parseInt(d.total); //总个数
      this.pages.pageCount = d.pageCount; //总页数
      if (this.table.list == null) {
        this.$message({
          message: "没有查到相关内容",
          type: "warning",
          duration: 1500
        });
      }
      this.table.listLoading = false;
    },
    updataTransferVal(data) {
      this.transferVal = data.join(",");
    },
    handPreview(d) {
      this.rendTable(d);
      this.titlesKey = "PREVIEW";
    },
    handDefine(d) {
      d.total = d.length;
      d.pageCount = 1;
      this.rendTable(d);
      this.titlesKey = "RESULT";
    },
    handCancel() {
      this.titlesKey = "QUEUE";
      this.fetchData();
    },
    // handleSizeChange(val) {
    //     this.pages.currentPage = val;
    //     this.fetchData();
    // }
  },
  watch: {
    selectedData(val) {
      let sum = 0;
      val.forEach(function (item, index, array) {
        sum += item.overdueAmount;
        // ids.push(item.id);
      });
      // console.log(val);
      this.acountNum = val.length;
      // this.table.multipleId = ids;
      this.totalAmount = sum.toFixed(2);
    }
  }
}

export {
  divisionListMixin,
  divisionQueueMixin
}



// let
