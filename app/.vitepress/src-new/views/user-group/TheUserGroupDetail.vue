<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import cityData from '~@/data/user-group/city/';
import DetailIntroCard from './components/DetailIntroCard.vue';
import DetailMember from './components/DetailMember.vue';
import DetailGuide from './components/DetailGuide.vue';
import DetailEvent from './components/DetailEvent.vue';
import DetailCase from './components/DetailCase.vue';

const router = useRouter();
const { t, locale } = useLocale();

const groupData = ref();
const cityGroup = ref();
onMounted(() => {
  const params = new URLSearchParams(window?.location?.search);
  if (params.has('name')) {
    const city = params.get('name');
    cityGroup.value = `${city}${t('usergroup.userGroup')}`;
    const data = cityData.find((item) => item.name === city);
    if (!data) router.go(`/${locale.value}/community/user-group/`);
    groupData.value = data?.data ?? {};
  } else {
    router.go(`/${locale.value}/community/user-group/`);
  }
});
</script>
<template>
  <DetailIntroCard
    :city-group="cityGroup"
    :organizational="groupData?.organizational"
  />
  <DetailMember
    :organizer-list="groupData?.organizer"
    :ambassador-list="groupData?.ambassador"
  />
  <DetailEvent v-if="groupData?.news?.length" :options="groupData?.news" />
  <DetailCase
    v-if="groupData?.showcase?.length"
    :options="groupData?.showcase"
  />
  <DetailGuide id="group-detail-guide" />
</template>

<style lang="scss" scoped>
:deep(.hover-underline) {
  --link-color-hover: var(--o-color-link2);
  --link-underline-x: 100%;
  background: linear-gradient(
      0deg,
      var(--link-color-hover),
      var(--link-color-hover)
    )
    no-repeat var(--link-underline-x) bottom;
  background-size: 0 1px;
  transition: background-size var(--o-easing-standard) var(--o-duration-m2);

  @include hover {
    background-size: var(--link-underline-x) 1px;
    background-position-x: left;
  }
}

:deep(.o-btn-small) {
  --btn-height: 28px;
}
</style>
