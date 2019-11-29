<template>
  <div>
    <h4>后端要的小页面</h4>
    <el-form
      :inline="true"
      :model="formInline"
      ref="form"
    >
      <el-form-item
        label="社区ID"
        prop="comtyId"
        :rules="[
      { required: true, message: '请填写社区ID', trigger: 'blur' },
    ]"
      >
        <el-input
          v-model="formInline.comtyId"
          placeholder="请填写社区ID"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >进入第三方平台</el-button>
      </el-form-item>
    </el-form>
    <iframe
      style="width: 100%;height: 100vh;"
      v-if="iframeSrc"
      :src="iframeSrc"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
import { thirdJoin } from "@/api/login";
export default {
  data() {
    return {
      iframeSrc: "",
      formInline: {
        comtyId: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      let comtyId = this.formInline.comtyId;
      this.$store.commit("SET_COMTYID", comtyId);
      let valid = await new Promise(resolve =>
        this.$refs.form.validate(resolve)
      );
      if (valid) {
        // 返回处理后的参数
        let res = await thirdJoin({ comtyId: comtyId });
        if (res.status == 200) {
          let data = res.data;
          this.iframeSrc = `http://b1.991kang.com/dentist?token=${data.token}&comtyId=${data.comtyId}`;
          console.log(data);
        }
      } else {
        //返回假值
        return valid;
      }
    }
  }
};
</script>