<script lang="ts" setup>
import IconArrowRight from '~icons/app/icon-arrow-right';
</script>

<template>
  <div class="banner">
    <div class="wrapper">
      <h2 class="title">openEuler开源实习</h2>
      <div class="action">
        <a href="https://gitcode.com/openeuler/opensource-intern/issues" target="_blank">
          <OButton size="large" type="primary">
            <span>领取任务</span>
            <OIcon><IconArrowRight /></OIcon
          ></OButton>
        </a>
      </div>
    </div>
    <div class="mo">
      <h2 class="title">openEuler 开源实习</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  background: url(@/assets/category/internship/banner.jpg) no-repeat top
    center/cover;
  height: 380px;
  .wrapper {
    position: relative;
    height: 100%;
  }
  .mo {
    display: none;
  }
  .title {
    max-width: 1504px;
    padding: 70px 44px 24px;
    margin: 0 auto;
    font-size: 56px;
    font-weight: 400;
    color: #000000;
    line-height: 84px;
    @media (max-width: 1000px) {
      padding: 70px 16px 24px;
    }
  }
  .action {
    display: flex;
    max-width: 1504px;
    margin: 0 auto;
    padding: 0 44px;
    gap: 22px;
    @media (max-width: 1000px) {
      padding: 0 16px;
    }
    a {
      .o-button {
        > span {
          color: #fff;
        }
      }
      .o-icon {
        font-size: 12px;
        margin-left: 8px;
        transition: all 0.3s;
      }
      &:hover .o-icon {
        transform: translateX(3px);
      }
    }
  }
  @media (max-width: 760px) {
    height: 100%;
    background: none;
    .mo {
      display: block;
      position: relative;
      width: 100%;
      height: 300px;
      background: url(@/assets/category/internship/banner-mo.png) no-repeat;
      background-size: 100% 100%;
      h2 {
        font-size: 20px;
        line-height: 28px;
        font-weight: 400;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 84px;
      }
    }
    .wrapper {
      display: none;
    }
  }
}
</style>
