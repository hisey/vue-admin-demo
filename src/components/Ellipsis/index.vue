<template>
  <div class="mu-wrapper">
    <div class="mulitLineText" ref="dom">
      {{text}}
    </div>
    <span class="sunfix" v-if="more&&!display_btn">{{subfix}}</span>
    <i @click='showMore()' v-if='more&&display_btn' class="icon-arrow_up"></i>
  </div>
</template>

<script>
/**
* @desc 多行文本溢出显示省略号组件
* @props
    text  要显示在此组件中的文本
    line  要显示的行数
    subfix  要显示在文字末尾的字符 默认是 ...
    display_btn  是否显示展开更多按钮 默认是 true
* @ep
    <ellipsis
    :text="instroText"
    :line="3"
    subfix="..."
    :display_btn="true"
    ></ellipsis>
**/
export default {
  name: "ellipsis",
  props:{
    text:{
      default:"",
      type:String
    },
    line:{
      default:2,
      type:Number
    },
    subfix:{
      default:"...",
      type:String
    },
    display_btn:{
      default:true,
      type:Boolean
    }
  },
  data () {
    return {
      showing:false,
      more:false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    showMore(){
      $(this.$refs.dom).css("overflow","auto");
      $(this.$refs.dom).css("height","auto");
      this.more=false;
    },
    init(){
      let rows=this.line;
      let str=this.text;
      var dom = this.$refs.dom;
      var lineHeight = $(dom).css("line-height");
      var at = rows*parseInt(lineHeight);

      if(str==undefined||str==""){
        dom.innerHTML = "";
        return;
      }

      var tempstr = str;
      dom.innerHTML = tempstr;
      // var len = tempstr.length;
      // var i = 0;
      if(dom.offsetHeight <= at){
        dom.innerHTML = tempstr;
      }else {
        dom.style.height=at+"px";
        dom.style.overflow="hidden";
        $(dom).addClass("more");
        this.more=true;
      }
    }
  },
  watch:{
    "text"(text){
      this.init();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import '../../assets/css/fix.less';
.mu-wrapper{
  position: relative;
  line-height: 20px;
}
.mulitLineText{}
.mu-wrapper {
  .display{
    // position: absolute;
    text-align: center;
    right: 0px;
    bottom: 0px;
    left: 0px;
    text-align: center;
    background-color: rgba(255,255,255,.8);
    color: #7bcac5;
    padding: 5px 0;
  }
  .sunfix{
    position: absolute;
    right: 0px;
    bottom: 0px;
    content: '...';
    display: inline-block;
    padding: 1px 3px;
    background-color: rgba(255,255,255,1);
  }
  .icon-arrow_up{
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #fff;
    color: #129B83;
  }
}

</style>
