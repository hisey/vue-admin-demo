let pagesMixin = {
  data() {
    return {
      pages: {
        pageCount: 0, //总页数
        pageSize: 20, //一页最多显示个数
        currentPage: 1, //当前页
        total: 0 //总个数
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pages.currentPage = val;
      this.fetchData();
    }
  }
};
let tableMixin = {
  data() {
    return {
      table: {
        list: [],
        listLoading: false,
        selectedData: [],
        multipleId: "" //已选id集合
      },
      num: 1,
      isDown: false
    };
  },
  methods: {
    handleSelectionChange(data) {
      // console.log(data);
      // this.num=2
      this.table.selectedData = data;
      this.table.multipleId = data
        .map(function(value) {
          return value.id;
        })
        .join(",");
      // this.table.multipleId = data.multipleId;
      // console.log(this.table.multipleId);
    }
  }
};
export { pagesMixin, tableMixin };
