'use strict';

// Vue.js 3.x をグローバルに利用するため、import は不要







const app = Vue.createApp({
  data: () => ({ 
    showSlideIn: false, 
    showSlideIn2: false,
    showSlideIn3: false,
    activeAccordion: null, // アコーディオンの状態を管理するデータ
    closingAccordion: null // アコーディオンが閉じる際の状態を管理
  }),


  methods: {
    handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const headerHeight = document.querySelector('header').offsetHeight;

      // 最初のアニメーションのトリガーポイント
      this.showSlideIn = scrollTop >= headerHeight;

      // 2つ目のアニメーションのトリガーポイント
      const triggerElement = document.querySelector('#navdre');
      if (triggerElement) {
        const triggerTop = triggerElement.getBoundingClientRect().top + scrollTop;
        this.showSlideIn2 = scrollTop + window.innerHeight >= triggerTop;
      }

      // 3つ目のアニメーションのトリガーポイント
      const triggerElement3 = document.querySelector('h2');
      if (triggerElement3) {
        const triggerTop3 = triggerElement3.getBoundingClientRect().top + scrollTop;
        this.showSlideIn3 = scrollTop + window.innerHeight >= triggerTop3;
      }

      // 最初の画像表示制御
      const image = document.querySelector('img.stuimg');
      if (image) {
        image.style.opacity = this.showSlideIn ? 1 : 0;
        image.style.transition = 'opacity 1s ease-in-out'; // ゆっくりと表示
      }

      // 2つ目の画像表示制御
      const secondImage = document.querySelector('img[src="protein.jpg"]');
      if (secondImage) {
        secondImage.style.opacity = this.showSlideIn2 ? 1 : 0;
        secondImage.style.transition = 'opacity 1s ease-in-out'; // ゆっくりと表示
      }

      // 3つ目の画像表示制御
      const thirdImage = document.querySelector('img[src="sea.jpg"]');
      if (thirdImage) {
        thirdImage.style.opacity = this.showSlideIn3 ? 1 : 0;
        thirdImage.style.transition = 'opacity 1s ease-in-out'; // ゆっくりと表示
      }
    },


  toggleAccordion(index) {
    this.activeAccordion = this.activeAccordion === index ? null : index;
  }
},


  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // 初期表示チェック
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
});









app.component('js-accordion', {
  template: `
    <div class="js-accordion">
      <button class="js-accordion--trigger" type="button" :class="{ '_state-open': isActive }" @click="toggle">
        <slot name="title"></slot>
      </button>
      <div class="js-accordion--target" 
           :class="{ '_state-open': isActive, '_state-closing': isClosing }" 
           @animationend="handleAnimationEnd">
        <slot name="body"></slot>
      </div>
    </div>
  `,
  props: ['index'],
  computed: {
    isActive() {
      return this.$parent.activeAccordion === this.index;
    },
    isClosing() {
      return this.$parent.closingAccordion === this.index;
    }
  },
  methods: {
    toggle() {
      if (this.isActive) {
        this.$parent.closingAccordion = this.index;
        this.$parent.activeAccordion = null;
      } else {
        this.$parent.activeAccordion = this.index;
        this.$parent.closingAccordion = null;
      }
    },
    handleAnimationEnd() {
      if (this.isClosing) {
        this.$parent.closingAccordion = null;
      }
    }
  }
});



app.mount('#app');
