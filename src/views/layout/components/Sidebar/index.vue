<template>
<div style="height:100%;">
    <!-- <div style="height: 50px;text-align:center;
    background: #F56C6C;
    font-size: 18px;
    color: #fff;
    line-height: 50px;top:0;width:180px">
      管理
    </div> -->
    <el-scrollbar wrapClass="scrollbar-wrapper" style="height:100%;">
      <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse"  background-color="#587AF4" text-color="#ffffff" active-text-color="#f56c6c">
      <!-- <div>提sad</div> -->
        <sidebar-item :routes="routes" ></sidebar-item>
      </el-menu>
    </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { getSideBar } from '@/utils/auth' // 验权

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // return this.$router.options.routes
      // return this.$router.options.routes
      return getSideBar()
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created () {
    // console.log(getSideBar());
    // console.log(this.$router.options.routes);
    
  }
}
</script>
