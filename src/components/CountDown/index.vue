<template>
  <span @click='fn'>
  {{btn_text}}
  </span>
</template>

<script>
export default {
  name: "countDown",
  data () {
    return {
      time:0
    };
  },
  props:["deftext","second","fn"],
  methods:{
    run: function () {
      this.time = this.second;
      this.timer();
    },
    timer:function(){
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }
    }
  },
  computed:{
    btn_text:function() {
      return this.time > 0 ? this.time + "s后重发" : this.deftext;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
