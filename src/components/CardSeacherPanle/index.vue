<template>
  <div class="cardSeacherPanle">
    <el-input :placeholder="placeholder"   @keyup.enter.native="handleSearch" @input="inputFocus" @focus="inputFocus" @blur="inputBlur" v-model="inputVal" :maxlength="max" class="input-with-select">
      <el-select v-if="isShowSelect" v-model="selectVal" @change="handleSelectChange" slot="prepend" :placeholder="placeholderSelect">
        <el-option v-for="(item,index) in optionList" :key="index" :label="item[label]" :value="item[value]"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
    </el-input>
    <ul class="card-seacher-panle" v-if="slideDown" :style="{ left: (isShowSelect ? '120px' : '') }">
      <li v-for="(item,index) in list" :key="index" @click="handlePanleChange(item.key)">按 <span style="font-weight:bold">{{item.value}}</span> 搜索"{{inputVal}}"</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    isShowSelect: {//是否展示Select
      type: Boolean,
      default: false
    },
    placeholderSelect: {
      type: String,
      default: "请选择"
    },
    value: {
      type: String,
      default: "value"
    },
    label: {
      type: String,
      default: "name"
    },
    optionList: Array,
    placeholder: {
      type: String,
      default: "请输入搜索的内容"
    },
    list: {
      type: Array,
      default: []
    },
    max: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      activeIndex: 0,
      slideDown: false,
      inputVal: "",
      selectVal: "",
    };
  },
  methods: {
    handleSelectChange(key) {
      this.$emit("changeSelect", key);
    },
    handlePanleChange(key) {
      this.$emit("change", { [key]: this.inputVal });

      let obj = {};
      this.list.forEach( val => {
        obj[val.key] = key == val.key ? this.inputVal : "";
      });

      this.getAllObj(obj);
    },
    inputBlur() {
      setTimeout(() => {
        this.slideDown = false;
      }, 200);
    },
    inputFocus() {
      if (this.inputVal) {
        this.slideDown = true;
      }
    },
    handleSearch() {
      let obj = {};
      this.list.forEach(val => {
        obj = Object.assign(obj, { [val.key]: this.inputVal });
      });
      this.$emit("change", obj);
      this.getAllObj(obj, true);
    },
    getAllObj(obj, isAll) {
      // 返回全部字段
      if (isAll) {
        // 全部字段值一样
        this.$emit("changeParams", obj);
      } else {
        // 只有一个字段有值
        this.$emit("changeParams", obj);
      }
    }
  },
  watch: {
    inputVal(val) {
      if (val == "") {
        this.slideDown = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.cardSeacherPanle{
  position: relative;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.card-seacher-panle {
  position: absolute;
  padding: 10px;
  border: 1px solid #ddd;
  border-top: none;
  background-color: #fff;
  z-index: 9999;
  li {
    padding: 5px 0;
    cursor: pointer;
  }
  li:hover {
    color: #409eff;
  }
}
</style>
