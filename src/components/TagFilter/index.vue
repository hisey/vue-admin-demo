<template>
  <div
    ref="text"
    class="filter-box"
    :class="{ 'public-time-wrapper clearfix': time }"
  >
    <span
      class="name"
      v-if="name != ''"
      :style="{ width: em + 'em' }"
    >{{ name }}</span><span v-if="name != ''"> ：</span>
    <ul :class="['tag-list',overFlow]">
      <li
        v-show="!(index==0&&!isHasAll)"
        v-for="(item, index) in tagList"
        :class="{ 'active': activeIndex == index }"
        :key="index"
        @click="handleClick(item, index)"
      >
        {{ item[lable] }}
      </li>
    </ul>

    <div
      v-show="isShowMore"
      @click="handleClickArrow(direction)"
      class="arrow-box"
    >
      <span> {{direction=='down'?'更多':'收起'}}</span>
      <i :class="direction=='down'?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
    </div>

    <!--时间选择-->
    <el-date-picker
      v-if="time"
      class="select-time"
      v-model="timeSelect"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="timeChange"
    ></el-date-picker>

    <!--插槽 - 用于扩展-->
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      // 筛选名称
      type: String,
      default: ""
    },
    /*
     * 注：选择defaultTime时，传 [] 空数组即可
     * 标签数组[{ name: "全部", id: "" },{ name: "已上线", id: 0 }...]
     * */
    list: {
      type: Array,
      default: [],
      required: true
    },
    lable: {
      // 标签显示
      type: String,
      default: "name"
    },
    attr: {
      // 获取的值
      type: String,
      default: "id"
    },
    time: {
      // 是否显示时间选择器
      type: Boolean,
      default: false
    },
    defaultTime: {
      // 使用默认时间选择
      type: Boolean,
      default: false
    },
    defaultIndex: {
      type: [Number, Object],
      default: 0
    },
    isHasAll: {
      type: Boolean,
      default: true
    },
    type: String, // 标识
    em: {
      type: Number,
      default: 4
    },
    timeFormat: {
      type: String,
      default: "yyyy-MM-dd hh:mm:ss"
    }
  },
  data() {
    return {
      tagList: [],
      activeIndex: 0,
      timeSelect: "",
      direction: "up",
      isShowMore: false
    };
  },
  computed: {
    overFlow() {
      return this.direction == "down" ? "over-flow" : "";
    }
  },
  watch: {
    activeIndex(val) {
      if (val != -1) {
        // 重置时间选择
        this.timeSelect = "";
      }
    },
    list(val) {
      this.init();
      if (!this.time) {
        this.$nextTick(() => {
          this.isShowMore = this.$refs.text.offsetHeight > 60 ? true : false;

          if (this.isShowMore) {
            this.direction = "down";
          } else {
            this.direction = "up";
          }
        });
      }
    },
    defaultIndex(val) {
      this.activeIndex = val;
    }
  },
  created() {
    this.init();
    this.activeIndex = this.defaultIndex;
    // 默认绑定第一个
    // this.$emit("input", this.tagList[this.activeIndex][this.attr]);
  },
  methods: {
    init() {
      if (this.defaultTime) {
        this.tagList = this.getDay();
      } else {
        this.tagList = this.list;
      }
    },
    handleClick(item, index) {
      this.activeIndex = index;
      this.$emit("input", item[this.attr]);
      this.$emit("change", item, this.type);
    },
    timeChange() {
      this.activeIndex = -1;
      this.$emit("input", this.timeSelect || []);
      this.$emit("change", { [this.attr]: this.timeSelect || [] }, this.type);
    },
    toReset() {
      if (this.tagList[0] && this.tagList[0].id == "") {
        this.activeIndex = 0;
      }
      this.$emit("input", "");
    },
    getDay() {
      // 获取时间
      let vm = this;
      let day = {
        timeList() {
          return [
            { name: "全部", id: "" },
            { name: "今日", id: this.today() },
            { name: "昨日", id: this.yesterday() },
            { name: "本周", id: this.week() },
            { name: "本月", id: this.month() }
          ];
        },
        today() {
          let day = new Date();
          return this.setTime(day);
        },
        yesterday() {
          let day = new Date();
          day.setDate(day.getDate() - 1);
          return this.setTime(day);
        },
        week() {
          let day = new Date();
          let num = day.getDay() - 1;
          let arr = [];
          arr[0] = day.setDate(day.getDate() - num); //本周第一天
          arr[1] = day.setDate(day.getDate() + 6); //本周最后一天

          return this.setTime(arr);
        },
        month() {
          let day = new Date();
          let arr = [];
          arr[0] = day.setDate(1); //本月第一天
          day.setMonth(day.getMonth() + 1); //下个月
          arr[1] = day.setDate(day.getDate() - 1); //下个月第一天减1得到本月最后一天

          return this.setTime(arr);
        },
        setTime(day) {
          // 设置时间00:00:00 - 23:59:59，返回数组
          let start, end;

          if (Array.isArray(day)) {
            start = new Date(day[0]).setHours(0, 0, 0);
            end = new Date(day[1]).setHours(23, 59, 59);
          } else {
            start = day.setHours(0, 0, 0);
            end = day.setHours(23, 59, 59);
          }

          start = new Date(start);
          end = new Date(end);

          // return [start.format(vm.timeFormat), end.format(vm.timeFormat)];
          return [
            this.format(start, vm.timeFormat),
            this.format(end, vm.timeFormat)
          ];
        },
        format(time, fmt) {
          let o = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            S: time.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              (time.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                  ? o[k]
                  : ("00" + o[k]).substr(("" + o[k]).length)
              );
          return fmt;
        }
      };

      return day.timeList();
    },
    handleClickArrow(d) {
      this.direction = d == "down" ? "up" : "down";
    }
  }
};
</script>

<style lang="less" scoped>
.filter-box {
  display: flex;
  align-items: baseline;
  position: relative;
  padding-right: 50px;
}
.name {
  display: inline-block;
  white-space: nowrap;
  text-align: justify;
  text-align-last: justify;
}
.tag-list {
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 10px;
  li {
    display: inline-block;
    margin-right: 15px;
    color: #a5b4c7;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 2px;
    cursor: pointer;
  }
  .active {
    background: #eff5fd;
    border: 1px solid #ebeef5;
    color: #333;
  }
}
.arrow-box {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  padding: 5px 8px;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  cursor: pointer;
  span,
  i {
    color: #999;
  }
  i {
    margin-left: 5px;
    font-size: 16px;
  }
  &:hover {
    span,
    i {
      transition: all 0.33s;
      color: #666;
    }
  }
}
.over-flow {
  overflow: hidden;
  height: 30px;
}
</style>


<!--
// 点击查询按钮，重置筛选
this.$refs.tagFilter.forEach( item => { item.toReset(); }); // 重置筛选
-->

