<template>
  <div class="menu-wrapper">
    <el-menu-item index="">
      <div slot="title" style="text-align:center;
    font-size: 18px;
    color: #fff;">demo管理</div>
    </el-menu-item>
    <template v-for="item in routes">
      <router-link v-if="!item.children" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.title" slot="title">{{item.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.title" slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.children">
          <!-- <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item> -->

          <router-link :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child.title" slot="title">{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // hasOneShowingChildren(children) {
    //   const showingChildren = children.filter(item => {
    //     return !item.hidden
    //   })
    //   if (showingChildren.length === 1) {
    //     return true
    //   }
    //   return false
    // }
  }
}
</script>
