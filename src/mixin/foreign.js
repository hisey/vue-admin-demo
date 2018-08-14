import { outApproveList, downloadOutApprove, outBoundList, downloadOutBound } from "@/api/foreign";
// import { outApproveList, downloadOutApprove } from "@/api/foreign";
import { tableMixin, pagesMixin } from "@/mixin/"
let foreignListMixin = {
    mixins: [tableMixin, pagesMixin],
    data() {
        return {
            isDown: false,
        }
    },
    created() {
        // this.feedbackForm.form.outboundPerson = getUserInfo().name
        this.fetchData()
    },
    methods: {
        async fetchData() {
            this.table.listLoading = true;
            let val = {
                currPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                ...this.seacher.form
            };
            let data = this.name == 'outBound' ? await outBoundList(...Object.values(val)) : await outApproveList(...Object.values(val))
            if (data.code == 1) {
                data = data.data;
                // if (data == null) {
                //     this.$message({
                //         message: "没有查到相关内容",
                //         type: "warning",
                //         duration: 1500
                //     });
                //     return false
                // }
                this.table.list = data ? data.list : [];
                this.pages.total = data ? parseInt(data.total) : 0; //总个数
                this.pages.pageCount = data ? data.pageCount : 0; //总页数
                if (this.seacher.isDown) {
                    let data1 = this.name == 'outBound' ? await downloadOutBound(...Object.values(val)) : await downloadOutApprove(...Object.values(val));
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
            } else {
                this.$message({
                    message: data.errorMsg,
                    type: 'warning'
                });
                return false
            }
            // console.log(data.data)

            this.table.listLoading = false;
        },
        handseacher(isDown) {
            this.$refs.seacherForm.validate(valid => {
                let seacherForm = this.seacher.form;
                if (valid) {
                    let isEpty = true;
                    for (let i in seacherForm) {
                        if (seacherForm[i] != "") {
                            isEpty = false
                        }
                    }
                    if (isEpty && isDown) {
                        this.$message({
                            message: '请选择要查询的内容',
                            type: 'warning'
                        });
                    } else {
                        // this.seacher.form = seacher.form;
                        this.seacher.isDown = isDown;
                        this.fetchData();
                    }
                } else {
                    console.log("error seacher!");
                    return false;
                }
            });
        },
    }

}

export {
    foreignListMixin
}