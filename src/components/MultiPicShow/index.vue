<template>
  <swiper :options="swiperOption" class="swiper-box" :style="{height}" v-if="data.length>0">
    <swiper-slide v-for="slide in data" :key="slide.url">
      <img
        v-img:group
        class="swiper-img"
        :style="{height:height,width:width}"
        :src="slide[urlKey]"
        alt
      />
    </swiper-slide>
    <div
      v-show="data.length>slidesPerView"
      class="swiper-button-prev swiper-buttom-arrow-box swiper-button-white"
      slot="button-prev"
    ></div>
    <div
      v-show="data.length>slidesPerView"
      class="swiper-button-next swiper-buttom-arrow-box swiper-button-white"
      slot="button-next"
    ></div>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    slidesPerView: {
      type: Number,
      default: 6
    },
    spaceBetween: {
      type: Number,
      default: 15
    },
    height: {
      type: String,
      default: "75px"
    },
    width: {
      type: String,
      default: "120px"
    },
    urlKey: {
      type: String,
      default: "url"
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    swiperOption() {
      return {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        }
      };
    }
  }
};
</script>
<style lang="less" scoped>
// .swiper-img {
//   width: 120px;
// }
.swiper-box {
  border: 1px solid #efefef;
}
.swiper-buttom-arrow-box {
  background-color: #000;
  background-size: 30%;
  width: 24px;
  height: 24px;
  top: 60%;
  opacity: 0.5;
}
.swiper-button-prev {
  left: 0;
}
.swiper-button-next {
  right: 0;
}
.swiper-pagination-fraction {
  bottom: 10px;
  left: 50%;
  /* right: -50%; */
  width: 40px;
  /* display: inline-block; */
  left: calc(50% - 15px);
  background-color: #333;
  color: #fff;
  opacity: 0.5;
  border-radius: 10px;
  padding: 2px 5px;
}
.swiper-button-next.swiper-button-disabled {
  display: none;
}
.swiper-button-prev.swiper-button-disabled {
  display: none;
}
</style>


