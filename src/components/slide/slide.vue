<template>
  <div class="bannerBox" v-if="banners.length > 0">
    <swiper
      :options="swiperOption"
      ref="swiperWrapper"
      class="swiper-container"
    >
      <!-- slides -->
      <swiper-slide
        v-for="(banner, index) in banners"
        :key="index"
        class="swiper-item"
      >
        <a :href="banner.redirection">
          <img :src="banner.imgUrl" width="100%" />
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        width: window.innerWidth,
        // direction: "vertical",
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: "auto",
        spaceBetween: 10, // 在slide之间设置距离（单位px）。
        centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
        loopAdditionaSlider: 0, // loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数。
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          slideChangeTransitionStart: function() {
            // console.log("dd");
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
