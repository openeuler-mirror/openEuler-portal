<script lang="ts" setup>
defineProps({
  descList: {
    type: Object,
    default: function () {
      return [];
    },
  },
  darkImg: {
    type: Boolean,
    default: false,
  },
  frameworkImg: {
    type: String,
    default: '',
  },
  frameworkDarkImg: {
    type: String,
    default: '',
  },
  frameworkTitle: {
    type: String,
    default: '',
  },
  frameType: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <div class="framelist-wrapper">
    <div class="info" :class="frameType">
      <div class="desc">
        <p v-for="(item, index) in descList" :key="index">
          {{ item }}
        </p>
        <p v-if="frameworkTitle" class="desc-title">{{ frameworkTitle }}</p>
      </div>
      <img v-if="darkImg" :src="frameworkDarkImg" alt="" />
      <img v-else :src="frameworkImg" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.framelist-wrapper {
  .info {
    box-shadow: var(--e-shadow-l1);
    padding: var(--e-spacing-h2) 0;
    background-color: var(--e-color-bg2);
  }
  .desc {
    margin: 0 var(--e-spacing-h2) var(--e-spacing-h2) var(--e-spacing-h2);
    p {
      font-size: var(--e-font-size-text);
      color: var(--e-color-text1);
      line-height: var(--e-line-height-text);
    }
    &-title {
      margin-top: 24px;
    }
  }
  img {
    margin: 0 auto;
    display: block;
  }

  @media screen and (min-width: 1440px) {
    max-width: 1416px;
    img {
      width: 1016px;
    }
  }
  @media screen and (min-width: 1080px) and (max-width: 1439px) {
    img {
      width: 762px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1079px) {
    img {
      width: 542px;
    }
  }
  .iSulad {
    img {
      width: 710px;
    }
  }
  .isula-build {
    img {
      width: 550px;
    }
  }
  .isula-transform {
    img {
      width: 1030px;
    }
  }
  @media screen and (max-width: 767px) {
    .info {
      padding: var(--e-spacing-h5);
    }
    .desc {
      margin: 0;
      p {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        margin-bottom: var(--e-spacing-h8);
      }
    }
    img {
      margin-top: var(--e-spacing-h5);
      width: 100% !important;
    }
  }
}
</style>
