<template>
  <section :class="$style.app_main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
};
</script>
<style lang="scss" module>
.app_main {
  min-height: 100%;
  padding: 20px;
}
</style>
