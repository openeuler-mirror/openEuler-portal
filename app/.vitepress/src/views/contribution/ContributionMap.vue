<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();
const router = useRouter();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
const goLink = (url: string, isBlank: boolean) => {
  if (isBlank) {
    window.open(url, '_blank');
    return;
  }
  router.go(url);
};
</script>
<template>
  <div class="content-map">
    <div :class="lang === 'zh' ? 'content-map-img' : 'content-map-img-en'">
      <img v-show="!isDark" :src="i18n.contribution.BACKGROUND_IMG" />
      <img v-show="isDark" :src="i18n.contribution.BACKGROUND_IMG_DARK" />
      <img
        v-show="!isDark && lang === 'en'"
        :src="i18n.contribution.BACKGROUND_IMG_H5"
        class="map-mo-en"
      />
      <img
        v-show="isDark && lang === 'en'"
        :src="i18n.contribution.BACKGROUND_IMG_H5_DARK"
        class="map-mo-en"
      />
      <!-- 定位的空标签 -->

      <div
        v-for="(item, index) in i18n.contribution.LINK_LIST"
        :key="index"
        :class="lang === 'zh' ? 'link' : 'link-en'"
        @click="goLink(item.URL, item.BLANK)"
      ></div>
      <a
        class="content-map-print"
        download="trail-chess.pdf"
        :href="i18n.contribution.DOWLOAD_PDF_URL"
        >{{ i18n.contribution.PRINT_MAP }}</a
      >
    </div>
    <div
      class="content-map-mobile-img"
      :class="lang === 'zh' ? '' : 'content-map-mobile-img-en'"
    >
      <img v-show="!isDark" :src="i18n.contribution.BACKGROUND_IMG_H5" />
      <img v-show="isDark" :src="i18n.contribution.BACKGROUND_IMG_H5_DARK" />
      <div
        v-for="(item, index) in i18n.contribution.LINK_LIST"
        :key="index"
        class="mobile-link"
        @click="goLink(item.URL, item.BLANK)"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-map {
  background-color: var(--o-color-bg1);
  width: 100%;
  padding-bottom: var(--o-spacing-h1);
  .content-map-img {
    width: 1416px;
    min-height: 650px;
    position: relative;
    display: block;
    margin: 0 auto;
    background-color: var(--o-color-bg4);
    img {
      width: 1034px;
      display: block;
      margin: 0 auto;
      padding: var(--o-spacing-h1) 0;
      @media screen and (min-width: 768px) and (max-width: 1079px) {
        width: 560px;
      }
      @media screen and (min-width: 1080px) and (max-width: 1279px) {
        width: 788px;
      }
      @media screen and (min-width: 1280px) and (max-width: 1439px) {
        width: 934px;
      }
    }
    .link {
      position: absolute;
      display: block;
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
    @media screen and (min-width: 1440px) {
      width: 1416px;
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 755px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 1058px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 1254px;
    }
  }
  .content-map-img-en {
    position: relative;
    width: 1416px;
    min-height: 650px;
    margin: 0 auto;
    text-align: center;
    @media screen and (max-width: 1264px) {
      .content-map-print {
        display: none;
      }
      width: 375px;
    }
    img {
      width: 1034px;
      padding: var(--o-spacing-h1) 0;
      @media screen and (max-width: 1264px) {
        display: none;
      }
    }
    .map-mo-en {
      position: relative;
      display: none;
      margin: 0 auto;
      padding-top: 0;
      margin-top: var(--o-spacing-h2);
      width: 317px;
      @media screen and (max-width: 1264px) {
        display: block;
      }
    }
  }
  .content-map-print {
    position: absolute;
    cursor: pointer;
    width: 100px;
    height: 30px;
    top: 22px;
    right: 22px;
    background-color: var(--o-color-bg2);
    color: var(--o-color-brand1);
    border: 1px solid var(--o-color-brand1);
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-h6);
    text-align: center;
    border-radius: 1px;
    text-decoration: none;
  }

  .link:nth-of-type(1) {
    width: 288px;
    height: 108px;
    top: 214px;
    left: 312px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 156px;
      height: 59px;
      top: 145px;
      left: 164px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 218px;
      height: 83px;
      top: 178px;
      left: 228px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 260px;
      height: 98px;
      top: 200px;
      left: 270px;
    }
  }
  .link:nth-of-type(2) {
    width: 42px;
    height: 18px;
    top: 361px;
    left: 524px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 26px;
      height: 12px;
      top: 224px;
      left: 277px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 34px;
      height: 16px;
      top: 289px;
      left: 388px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 40px;
      height: 16px;
      top: 333px;
      left: 460px;
    }
  }
  .link:nth-of-type(3) {
    width: 150px;
    height: 48px;
    top: 386px;
    left: 322px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 79px;
      height: 26px;
      top: 238px;
      left: 169px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 112px;
      height: 35px;
      top: 310px;
      left: 236px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 135px;
      height: 41px;
      top: 356px;
      left: 278px;
    }
  }
  .link:nth-of-type(4) {
    width: 109px;
    height: 49px;
    top: 385px;
    left: 480px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 60px;
      height: 26px;
      top: 238px;
      left: 254px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 82px;
      height: 36px;
      top: 310px;
      left: 356px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 97px;
      height: 42px;
      top: 356px;
      left: 422px;
    }
  }
  .link:nth-of-type(5) {
    width: 149px;
    height: 35px;
    top: 442px;
    left: 322px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 79px;
      height: 18px;
      top: 269px;
      left: 170px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 112px;
      height: 25px;
      top: 353px;
      left: 236px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 135px;
      height: 31px;
      top: 406px;
      left: 278px;
    }
  }
  .link:nth-of-type(6) {
    width: 108px;
    height: 35px;
    top: 442px;
    left: 480px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 59px;
      height: 19px;
      top: 269px;
      left: 253px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 82px;
      height: 25px;
      top: 353px;
      left: 356px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 97px;
      height: 31px;
      top: 406px;
      left: 422px;
    }
  }
  .link:nth-of-type(7) {
    width: 200px;
    height: 51px;
    top: 487px;
    left: 388px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 108px;
      height: 28px;
      top: 293px;
      left: 205px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 152px;
      height: 39px;
      top: 386px;
      left: 286px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 181px;
      height: 47px;
      top: 446px;
      left: 338px;
    }
  }
  .link:nth-of-type(8) {
    width: 199px;
    height: 51px;
    top: 549px;
    left: 323px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 107px;
      height: 27px;
      top: 327px;
      left: 169px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 152px;
      height: 40px;
      top: 433px;
      left: 236px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 180px;
      height: 48px;
      top: 501px;
      left: 279px;
    }
  }
  .link:nth-of-type(9) {
    width: 265px;
    height: 49px;
    top: 610px;
    left: 323px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 143px;
      height: 27px;
      top: 359px;
      left: 169px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 204px;
      height: 38px;
      top: 480px;
      left: 235px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 240px;
      height: 45px;
      top: 557px;
      left: 279px;
    }
  }
  .link:nth-of-type(10) {
    width: 260px;
    height: 25px;
    top: 893px;
    left: 222px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 141px;
      height: 14px;
      top: 513px;
      left: 115px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 196px;
      height: 18px;
      top: 696px;
      left: 160px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 235px;
      height: 22px;
      top: 813px;
      left: 189px;
    }
  }
  .link:nth-of-type(11) {
    width: 56px;
    height: 50px;
    top: 962px;
    left: 222px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 32px;
      height: 26px;
      top: 552px;
      left: 113px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 44px;
      height: 38px;
      top: 750px;
      left: 158px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 50px;
      height: 46px;
      top: 875px;
      left: 188px;
    }
  }
  .link:nth-of-type(12) {
    width: 56px;
    height: 50px;
    top: 962px;
    left: 300px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 32px;
      height: 26px;
      top: 552px;
      left: 155px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 44px;
      height: 38px;
      top: 750px;
      left: 217px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 50px;
      height: 46px;
      top: 875px;
      left: 258px;
    }
  }
  .link:nth-of-type(13) {
    width: 56px;
    height: 50px;
    top: 962px;
    left: 371px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 32px;
      height: 26px;
      top: 552px;
      left: 195px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 44px;
      height: 38px;
      top: 750px;
      left: 272px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 50px;
      height: 46px;
      top: 875px;
      left: 323px;
    }
  }
  .link:nth-of-type(14) {
    width: 92px;
    height: 17px;
    top: 924px;
    left: 360px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 52px;
      height: 12px;
      top: 528px;
      left: 189px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 71px;
      height: 16px;
      top: 718px;
      left: 264px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 84px;
      height: 16px;
      top: 841px;
      left: 312px;
    }
  }
  .link:nth-of-type(15) {
    width: 62px;
    height: 16px;
    top: 139px;
    left: 1094px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 36px;
      height: 9px;
      top: 105px;
      left: 586px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 50px;
      height: 12px;
      top: 121px;
      left: 822px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 58px;
      height: 14px;
      top: 132px;
      left: 975px;
    }
  }
  .link:nth-of-type(16) {
    width: 102px;
    height: 16px;
    top: 200px;
    left: 848px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 56px;
      height: 8px;
      top: 137px;
      left: 453px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 80px;
      height: 12px;
      top: 167px;
      left: 635px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 92px;
      height: 14px;
      top: 187px;
      left: 753px;
    }
  }
  .link:nth-of-type(17) {
    width: 42px;
    height: 14px;
    top: 420px;
    left: 764px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 23px;
      height: 8px;
      top: 257px;
      left: 408px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 32px;
      height: 12px;
      top: 336px;
      left: 572px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 38px;
      height: 12px;
      top: 386px;
      left: 678px;
    }
  }
  .link:nth-of-type(18) {
    width: 112px;
    height: 16px;
    top: 444px;
    left: 1050px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 62px;
      height: 10px;
      top: 269px;
      left: 563px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 88px;
      height: 14px;
      top: 352px;
      left: 789px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 102px;
      height: 16px;
      top: 406px;
      left: 936px;
    }
  }
  .link:nth-of-type(19) {
    width: 68px;
    height: 16px;
    top: 458px;
    left: 743px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 38px;
      height: 10px;
      top: 276px;
      left: 396px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 61px;
      height: 14px;
      top: 363px;
      left: 556px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 61px;
      height: 16px;
      top: 419px;
      left: 659px;
    }
  }
  .link:nth-of-type(20) {
    width: 72px;
    height: 16px;
    top: 483px;
    left: 996px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 52px;
      height: 10px;
      top: 290px;
      left: 534px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 55px;
      height: 14px;
      top: 383px;
      left: 749px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 66px;
      height: 14px;
      top: 443px;
      left: 888px;
    }
  }
  .link:nth-of-type(21) {
    width: 66px;
    height: 16px;
    top: 498px;
    left: 742px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 36px;
      height: 10px;
      top: 298px;
      left: 396px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 50px;
      height: 13px;
      top: 394px;
      left: 556px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 60px;
      height: 14px;
      top: 456px;
      left: 657px;
    }
  }
  .link:nth-of-type(22) {
    width: 103px;
    height: 29px;
    top: 606px;
    left: 745px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 55px;
      height: 14px;
      top: 358px;
      left: 398px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 79px;
      height: 19px;
      top: 478px;
      left: 557px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 93px;
      height: 24px;
      top: 554px;
      left: 661px;
    }
  }
  .link:nth-of-type(23) {
    width: 103px;
    height: 29px;
    top: 644px;
    left: 745px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 55px;
      height: 14px;
      top: 378px;
      left: 398px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 79px;
      height: 19px;
      top: 507px;
      left: 557px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 93px;
      height: 24px;
      top: 588px;
      left: 661px;
    }
  }
  .link:nth-of-type(24) {
    width: 110px;
    height: 29px;
    top: 604px;
    left: 858px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 60px;
      height: 14px;
      top: 357px;
      left: 459px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 84px;
      height: 19px;
      top: 476px;
      left: 643px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 93px;
      height: 24px;
      top: 554px;
      left: 765px;
    }
  }
  .link:nth-of-type(25) {
    width: 74px;
    height: 29px;
    top: 604px;
    left: 989px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 44px;
      height: 14px;
      top: 357px;
      left: 530px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 60px;
      height: 19px;
      top: 477px;
      left: 743px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 74px;
      height: 24px;
      top: 552px;
      left: 882px;
    }
  }
  .link:nth-of-type(26) {
    width: 74px;
    height: 29px;
    top: 604px;
    left: 1082px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 40px;
      height: 18px;
      top: 355px;
      left: 580px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 58px;
      height: 24px;
      top: 474px;
      left: 813px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 74px;
      height: 29px;
      top: 550px;
      left: 964px;
    }
  }
  .link:nth-of-type(27) {
    width: 110px;
    height: 24px;
    top: 645px;
    left: 858px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 60px;
      height: 16px;
      top: 377px;
      left: 459px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 86px;
      height: 20px;
      top: 506px;
      left: 642px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 100px;
      height: 24px;
      top: 588px;
      left: 764px;
    }
  }
  .link:nth-of-type(28) {
    width: 60px;
    height: 24px;
    top: 646px;
    left: 986px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 32px;
      height: 14px;
      top: 379px;
      left: 528px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 44px;
      height: 19px;
      top: 507px;
      left: 743px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 54px;
      height: 22px;
      top: 590px;
      left: 880px;
    }
  }
  .link:nth-of-type(29) {
    width: 74px;
    height: 16px;
    top: 728px;
    left: 924px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 39px;
      height: 11px;
      top: 422px;
      left: 496px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 55px;
      height: 13px;
      top: 570px;
      left: 695px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 66px;
      height: 14px;
      top: 664px;
      left: 824px;
    }
  }
  .link:nth-of-type(30) {
    width: 98px;
    height: 16px;
    top: 760px;
    left: 740px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 56px;
      height: 10px;
      top: 440px;
      left: 396px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 76px;
      height: 13px;
      top: 594px;
      left: 554px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 92px;
      height: 16px;
      top: 692px;
      left: 656px;
    }
  }
  .link:nth-of-type(31) {
    width: 58px;
    height: 16px;
    top: 759px;
    left: 903px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 32px;
      height: 10px;
      top: 440px;
      left: 483px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 44px;
      height: 13px;
      top: 594px;
      left: 679px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 54px;
      height: 16px;
      top: 692px;
      left: 804px;
    }
  }
  .link:nth-of-type(32) {
    width: 66px;
    height: 18px;
    top: 759px;
    left: 1027px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 34px;
      height: 10px;
      top: 440px;
      left: 550px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 54px;
      height: 14px;
      top: 593px;
      left: 771px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 60px;
      height: 16px;
      top: 692px;
      left: 915px;
    }
  }
  .link:nth-of-type(33) {
    width: 48px;
    height: 17px;
    bottom: 297px;
    left: 740px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 26px;
      height: 10px;
      bottom: 190px;
      left: 396px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 34px;
      height: 14px;
      bottom: 241px;
      left: 556px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 42px;
      height: 16px;
      bottom: 274px;
      left: 656px;
    }
  }
  .link:nth-of-type(34) {
    width: 48px;
    height: 17px;
    bottom: 297px;
    left: 904px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 26px;
      height: 10px;
      bottom: 190px;
      left: 484px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 36px;
      height: 14px;
      bottom: 241px;
      left: 678px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 46px;
      height: 16px;
      bottom: 274px;
      left: 804px;
    }
  }
  .link:nth-of-type(35) {
    width: 66px;
    height: 17px;
    bottom: 297px;
    left: 1026px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 38px;
      height: 11px;
      bottom: 189px;
      left: 548px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 54px;
      height: 14px;
      bottom: 241px;
      left: 772px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 62px;
      height: 16px;
      bottom: 274px;
      left: 914px;
    }
  }
  .link:nth-of-type(36) {
    width: 47px;
    height: 17px;
    bottom: 245px;
    left: 904px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 25px;
      height: 10px;
      bottom: 162px;
      left: 484px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 36px;
      height: 12px;
      bottom: 202px;
      left: 678px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 44px;
      height: 16px;
      bottom: 227px;
      left: 804px;
    }
  }
  .link:nth-of-type(37) {
    width: 64px;
    height: 80px;
    bottom: 84px;
    left: 1004px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 35px;
      height: 46px;
      bottom: 74px;
      left: 536px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 46px;
      height: 62px;
      bottom: 80px;
      left: 754px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 58px;
      height: 76px;
      bottom: 80px;
      left: 893px;
    }
  }
  .link:nth-of-type(38) {
    width: 86px;
    height: 80px;
    bottom: 84px;
    left: 1080px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 46px;
      height: 46px;
      bottom: 74px;
      left: 577px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 64px;
      height: 62px;
      bottom: 80px;
      left: 812px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 78px;
      height: 76px;
      bottom: 82px;
      left: 962px;
    }
  }
  .link:nth-of-type(39) {
    width: 94px;
    height: 18px;
    bottom: 154px;
    left: 252px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 52px;
      height: 11px;
      bottom: 112px;
      left: 130px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 74px;
      height: 14px;
      bottom: 132px;
      left: 180px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 86px;
      height: 18px;
      bottom: 144px;
      left: 216px;
    }
  }

  .content-map-mobile-img {
    width: 100%;
    height: auto;
    position: relative;
    display: block;
    margin: 0 auto;
    margin-top: var(--o-spacing-h2);
    padding: 0 var(--o-spacing-h5);
    @media screen and (min-width: 768px) {
      display: none;
    }
    img {
      width: 100%;
    }
  }
  .content-map-mobile-img-en {
    display: none;
  }
  .mobile-link {
    position: absolute;
    display: block;
    cursor: pointer;
  }
  .mobile-link:nth-of-type(1) {
    width: 72.5%;
    height: 5.4%;
    left: 20%;
    top: 6%;
  }
  .mobile-link:nth-of-type(2) {
    width: 12.5%;
    height: 0.6%;
    left: 78%;
    top: 13.6%;
  }
  .mobile-link:nth-of-type(3) {
    width: 41.5%;
    height: 2.3%;
    left: 23%;
    top: 14.6%;
  }
  .mobile-link:nth-of-type(4) {
    width: 23.2%;
    height: 2.3%;
    left: 66%;
    top: 14.6%;
  }
  .mobile-link:nth-of-type(5) {
    width: 41%;
    height: 2.2%;
    left: 23%;
    top: 17.3%;
  }
  .mobile-link:nth-of-type(6) {
    width: 23.3%;
    height: 2.3%;
    left: 66%;
    top: 17.2%;
  }
  .mobile-link:nth-of-type(7) {
    width: 48%;
    height: 2.6%;
    left: 41.2%;
    top: 19.9%;
  }
  .mobile-link:nth-of-type(8) {
    width: 48.5%;
    height: 2.5%;
    left: 23.2%;
    top: 22.8%;
  }
  .mobile-link:nth-of-type(9) {
    width: 65.9%;
    height: 2.4%;
    left: 23.2%;
    top: 25.7%;
  }
  .mobile-link:nth-of-type(10) {
    width: 14.7%;
    height: 2.1%;
    left: 23.2%;
    top: 36.6%;
  }
  .mobile-link:nth-of-type(11) {
    width: 14.7%;
    height: 2.1%;
    left: 42.2%;
    top: 36.7%;
  }
  .mobile-link:nth-of-type(12) {
    width: 14.7%;
    height: 2.1%;
    left: 62.2%;
    top: 36.6%;
  }
  .mobile-link:nth-of-type(13) {
    width: 66.5%;
    height: 1.2%;
    left: 23%;
    top: 33.2%;
  }
  .mobile-link:nth-of-type(14) {
    width: 23.5%;
    height: 0.8%;
    left: 62%;
    top: 34.7%;
  }
  .mobile-link:nth-of-type(15) {
    width: 16.5%;
    height: 0.8%;
    left: 43%;
    top: 89.4%;
  }
  .mobile-link:nth-of-type(16) {
    width: 28.8%;
    height: 0.7%;
    left: 22.5%;
    top: 92.7%;
  }
  /* 换行链接待处理点击区域样式 */
  .mobile-link:nth-of-type(17) {
    width: 8.8%;
    height: 0.8%;
    left: 80.5%;
    top: 55.9%;
  }
  .mobile-link:nth-of-type(18) {
    width: 47.8%;
    height: 0.8%;
    left: 39.5%;
    top: 58.8%;
  }
  .mobile-link:nth-of-type(19) {
    width: 47.8%;
    height: 0.8%;
    left: 39.5%;
    top: 58.8%;
  }
  .mobile-link:nth-of-type(20) {
    width: 20.8%;
    height: 0.6%;
    left: 30.5%;
    top: 60.7%;
  }
  .mobile-link:nth-of-type(21) {
    width: 12.8%;
    height: 0.7%;
    left: 23%;
    top: 61.4%;
  }
  .mobile-link:nth-of-type(22) {
    width: 25.8%;
    height: 1.6%;
    left: 23.5%;
    top: 67.7%;
  }
  .mobile-link:nth-of-type(23) {
    width: 21.8%;
    height: 1.6%;
    left: 23.5%;
    top: 71.2%;
  }
  .mobile-link:nth-of-type(24) {
    width: 29.2%;
    height: 1.6%;
    left: 55.5%;
    top: 67.6%;
  }
  .mobile-link:nth-of-type(25) {
    width: 19.5%;
    height: 1.6%;
    left: 23.5%;
    top: 69.4%;
  }
  .mobile-link:nth-of-type(26) {
    width: 19.2%;
    height: 1.6%;
    left: 55.5%;
    top: 69.4%;
  }
  .mobile-link:nth-of-type(27) {
    width: 29.5%;
    height: 1.6%;
    left: 55.5%;
    top: 71.2%;
  }
  .mobile-link:nth-of-type(28) {
    width: 22%;
    height: 1.4%;
    left: 23.5%;
    top: 73%;
  }
  .mobile-link:nth-of-type(29) {
    width: 15.5%;
    height: 0.7%;
    left: 74.5%;
    top: 76.8%;
  }
  .mobile-link:nth-of-type(30) {
    width: 26.5%;
    height: 0.7%;
    left: 22.5%;
    top: 78.5%;
  }
  .mobile-link:nth-of-type(31) {
    width: 14.5%;
    height: 0.7%;
    left: 51.5%;
    top: 78.5%;
  }
  .mobile-link:nth-of-type(32) {
    width: 17.5%;
    height: 0.7%;
    left: 68.5%;
    top: 78.5%;
  }
  .mobile-link:nth-of-type(33) {
    width: 11%;
    height: 0.7%;
    left: 23.4%;
    top: 79.5%;
  }
  .mobile-link:nth-of-type(34) {
    width: 11%;
    height: 0.7%;
    left: 37.4%;
    top: 79.5%;
  }
  .mobile-link:nth-of-type(35) {
    width: 16%;
    height: 0.7%;
    left: 52.4%;
    top: 79.5%;
  }
  .mobile-link:nth-of-type(36) {
    width: 13%;
    height: 0.7%;
    left: 67.4%;
    top: 81.8%;
  }
  .mobile-link:nth-of-type(37) {
    width: 18%;
    height: 3.7%;
    left: 34.4%;
    top: 46.8%;
  }
  .mobile-link:nth-of-type(38) {
    width: 18%;
    height: 3.7%;
    left: 60.4%;
    top: 46.8%;
  }
  .mobile-link:nth-of-type(39) {
    width: 25%;
    height: 0.7%;
    left: 31.4%;
    top: 34.8%;
  }
  .link-en {
    cursor: pointer;
    position: absolute;
  }
  .link-en:nth-of-type(1) {
    width: 40px;
    height: 60px;
    top: 255px;
    left: 320px;
    @media screen and (max-width: 1264px) {
      top: 197px;
      left: 112px;
    }
  }
  .link-en:nth-of-type(2) {
    width: 40px;
    height: 60px;
    top: 255px;
    left: 380px;
    @media screen and (max-width: 1264px) {
      top: 197px;
      left: 172px;
    }
  }
  .link-en:nth-of-type(3) {
    width: 40px;
    height: 60px;
    top: 255px;
    left: 452px;
    @media screen and (max-width: 1264px) {
      top: 197px;
      left: 232px;
    }
  }
  .link-en:nth-of-type(4) {
    width: 40px;
    height: 60px;
    top: 255px;
    left: 506px;
    @media screen and (max-width: 1264px) {
      top: 197px;
      left: 290px;
    }
  }
  .link-en:nth-of-type(5) {
    width: 240px;
    height: 48px;
    top: 393px;
    left: 318px;
    @media screen and (max-width: 1264px) {
      width: 218px;
      height: 41px;
      top: 320px;
      left: 110px;
    }
  }
  .link-en:nth-of-type(6) {
    width: 116px;
    height: 48px;
    top: 447px;
    left: 318px;
    @media screen and (max-width: 1264px) {
      width: 90px;
      height: 46px;
      top: 365px;
      left: 110px;
    }
  }
  .link-en:nth-of-type(8) {
    width: 118px;
    height: 48px;
    top: 447px;
    left: 440px;
    @media screen and (max-width: 1264px) {
      width: 218px;
      height: 41px;
      top: 415px;
      left: 108px;
      z-index: 88;
    }
  }
  .link-en:nth-of-type(7) {
    width: 240px;
    height: 48px;
    top: 500px;
    left: 318px;
    @media screen and (max-width: 1264px) {
      width: 121px;
      height: 46px;
      top: 365px;
      left: 208px;
    }
  }
  .link-en:nth-of-type(9) {
    width: 240px;
    height: 48px;
    top: 555px;
    left: 318px;

    @media screen and (max-width: 1264px) {
      width: 218px;
      height: 40px;
      top: 464px;
      left: 108px;
    }
  }
  .link-en:nth-of-type(10) {
    width: 240px;
    height: 48px;
    top: 610px;
    left: 318px;

    @media screen and (max-width: 1264px) {
      width: 218px;
      height: 41px;
      top: 510px;
      left: 108px;
    }
  }
  .link-en:nth-of-type(11) {
    width: 240px;
    height: 60px;
    top: 664px;
    left: 318px;
    @media screen and (max-width: 1264px) {
      width: 218px;
      height: 54px;
      top: 560px;
      left: 108px;
    }
  }
  .link-en:nth-of-type(12) {
    width: 260px;
    height: 24px;
    top: 905px;
    left: 222px;
    @media screen and (max-width: 1264px) {
      width: 210px;
      height: 24px;
      top: 700px;
      left: 116px;
    }
  }
  .link-en:nth-of-type(13) {
    width: 72px;
    height: 45px;
    top: 962px;
    left: 222px;
    @media screen and (max-width: 1264px) {
      width: 60px;
      top: 757px;
      left: 116px;
    }
  }
  .link-en:nth-of-type(14) {
    width: 82px;
    height: 45px;
    top: 962px;
    left: 311px;
    @media screen and (max-width: 1264px) {
      width: 67px;
      top: 757px;
      left: 191px;
    }
  }
  .link-en:nth-of-type(15) {
    width: 71px;
    height: 45px;
    top: 962px;
    left: 410px;
    @media screen and (max-width: 1264px) {
      width: 60px;
      top: 757px;
      left: 272px;
    }
  }
  .link-en:nth-of-type(16) {
    width: 64px;
    height: 80px;
    top: 920px;
    left: 750px;
    @media screen and (max-width: 1264px) {
      top: 940px;
      left: 127px;
    }
  }
  .link-en:nth-of-type(17) {
    width: 64px;
    height: 80px;
    top: 920px;
    left: 859px;
    @media screen and (max-width: 1264px) {
      top: 940px;
      left: 245px;
    }
  }
  .link-en:nth-of-type(18) {
    width: 64px;
    height: 80px;
    top: 920px;
    left: 974px;
    @media screen and (max-width: 1264px) {
      top: 1020px;
      left: 127px;
    }
  }
  .link-en:nth-of-type(19) {
    width: 64px;
    height: 80px;
    top: 920px;
    left: 1080px;
    @media screen and (max-width: 1264px) {
      top: 1020px;
      left: 245px;
    }
  }
  .link-en:nth-of-type(20) {
    width: 60px;
    height: 85px;
    top: 758px;
    left: 1005px;
    @media screen and (max-width: 1264px) {
      top: 1220px;
      left: 127px;
    }
  }
  .link-en:nth-of-type(21) {
    width: 60px;
    height: 85px;
    top: 758px;
    left: 1091px;
    @media screen and (max-width: 1264px) {
      top: 1220px;
      left: 242px;
    }
  }
  .link-en:nth-of-type(22) {
    width: 135px;
    height: 24px;
    top: 601px;
    left: 743px;
    @media screen and (max-width: 1264px) {
      width: 128px;
      height: 14px;
      top: 1422px;
      left: 108px;
    }
  }
  .link-en:nth-of-type(23) {
    width: 89px;
    height: 16px;
    top: 601px;
    left: 889px;
    @media screen and (max-width: 1264px) {
      width: 86px;
      height: 16px;
      top: 1422px;
      left: 251px;
    }
  }
  .link-en:nth-of-type(24) {
    width: 109px;
    height: 18px;
    top: 640px;
    left: 1044px;
    @media screen and (max-width: 1264px) {
      width: 104px;
      height: 14px;
      left: 190px;
      top: 1500px;
    }
  }
  .link-en:nth-of-type(25) {
    width: 187px;
    height: 18px;
    top: 640px;
    left: 750px;
    @media screen and (max-width: 1264px) {
      width: 183px;
      height: 14px;
      left: 112px;
      top: 1470px;
    }
  }
  .link-en:nth-of-type(26) {
    width: 75px;
    height: 18px;
    top: 640px;
    left: 955px;
    @media screen and (max-width: 1264px) {
      width: 70px;
      height: 14px;
      left: 112px;
      top: 1500px;
    }
  }
  .link-en:nth-of-type(27) {
    width: 43px;
    height: 17px;
    top: 684px;
    left: 924px;
    @media screen and (max-width: 1264px) {
      width: 36px;
      height: 14px;
      left: 112px;
      top: 1545px;
    }
  }
  .link-en:nth-of-type(28) {
    width: 159px;
    height: 18px;
    top: 684px;
    left: 744px;
    @media screen and (max-width: 1264px) {
      width: 156;
      height: 14px;
      top: 1520px;
      left: 112px;
    }
  }
  .link-en:nth-of-type(29) {
    width: 176px;
    height: 18px;
    top: 601px;
    left: 987px;
    @media screen and (max-width: 1264px) {
      width: 172px;
      height: 14px;
      left: 112px;
      top: 1445px;
    }
  }
  .link-en:nth-of-type(30) {
    width: 168px;
    height: 18px;
    top: 684px;
    left: 989px;
    @media screen and (max-width: 1264px) {
      width: 166px;
      height: 14px;
      left: 161px;
      top: 1545px;
    }
  }

  .link-en:nth-of-type(31) {
    width: 124px;
    height: 14px;
    top: 281px;
    left: 848px;
    @media screen and (max-width: 1264px) {
      width: 115px;
      height: 16px;
      top: 1770px;
      left: 112px;
    }
  }
  .link-en:nth-of-type(32) {
    width: 104px;
    height: 14px;
    top: 187px;
    left: 854px;
    @media screen and (max-width: 1264px) {
      width: 96px;
      height: 16px;
      top: 1670px;
      left: 112px;
    }
  }
}
</style>
