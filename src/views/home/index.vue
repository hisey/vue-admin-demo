<template>
  <div class="app-container">
    <el-row :gutter='40' class="home-exp-row" >
      <el-col :span="4" v-for="(item, index) in items" :key="index">
        <transition name="el-zoom-in-center">
          <div class="blue home-exp-block" v-show="show" :class="item.className">
            <span>{{item.value}}</span>
            <span style="color:#ddd;font-size:14px">{{item.name}}</span>
          </div>
        </transition>
      </el-col>
    </el-row>
    <el-row :gutter='40' class="home-exp-row">
      <el-col :span="12">
        <div style="height:500px;" id="barChart"></div>
      </el-col>
      <el-col :span="12">
        <div style="height:500px;" id="pieChart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//全部引入
import { getCaseCount } from '@/api/'
var echarts = require('echarts');
export default {
  name: 'dashboard',
  data() {
    return {
      show: false,
      // $el:"#eacht",
      barChart: null,
      pieChart: null,
      items: [
        { key: "collectionPreDivideCount", name: "", value: "0", className: "blue" }],
      dataCount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted() {
    // this.initBarCharts();
    // this.initPieCharts();
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let data = await getCaseCount();
      let array = this.items;
      let dataCount = this.dataCount;
      if (data.code == 1) {
        data = data.data;
        for (let i = 0; i < array.length; i++) {
          dataCount[i] = array[i].value = data[array[i].key]
        }
        this.items = array;
        this.dataCount = dataCount;
        this.initBarCharts();
        this.initPieCharts();
        this.show = true;
      } else {
        this.$message({
          message: data.errorMsg,
          type: 'warning'
        });
      }
    },
    initBarCharts() {
      let dataCount = this.dataCount;
      this.barChart = echarts.init(document.getElementById('barChart'));
      this.barChart.setOption({
        title: {
          text: '案件柱状统计'
        },
        tooltip: {},
        xAxis: {
          data: ["电催待"]
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          data: dataCount,
          color: function (params) {
            var colorList = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C'];
            return colorList[params.dataIndex];
          }
        }]
      })
      // console.log(this.chart);
      // this.setOptions();
    },
    initPieCharts() {
      this.pieChart = echarts.init(document.getElementById('pieChart'));
      let data = this.items;
      this.pieChart.setOption({
        title: {
          text: '案件饼状统计'
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          color: function (params) {
            var colorList = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C'];
            return colorList[params.dataIndex];
          }
        }]
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.el-col {
  margin-bottom: 40px;
}
.home-exp-block {
  // height: 100px;
  padding: 20px 0;
  color: #fff;
  text-align: center;
  // font-size: 14px;
   border-radius: 4px;
  line-height: 25px;
  span {
    display: block;
  }
}
.blue {
  background-color: $blue;
}
.success {
  background-color: $success;
}
.warning {
  background-color: $warning;
}
.danger {
  background-color: $danger;
}
</style>
