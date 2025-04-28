<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from 'vue-i18n';
import cityData from '~@/data/user-group/city/';
import DetailIntroCard from './components/DetailIntroCard.vue';
import DetailMember from './components/DetailMember.vue';
import DetailGuide from './components/DetailGuide.vue';
import DetailEvent from './components/DetailEvent.vue';
import DetailCase from './components/DetailCase.vue';

const { t } = useI18n();
const router = useRouter();

const groupData = ref();
const cityGroup = ref();
onMounted(() => {
  const params = new URLSearchParams(window?.location?.search);
  if (params.has('name')) {
    const city = params.get('name');
    cityGroup.value = `${city}${t('usergroup.userGroup')}`;
    const data = cityData.find((item) => item.name === city);
    if (!data) router.go('/zh/community/user-group/');
    groupData.value = data?.data ?? {};
    console.log(cityGroup.value, groupData.value);
  } else {
    router.go('/zh/community/user-group/');
  }
});
</script>
<template>
  <DetailIntroCard
    :city-group="cityGroup"
    :organizational="groupData?.organizational"
  />
  <DetailMember
    v-if="groupData?.organizer.length || groupData?.ambassador.length"
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

<style lang="scss" scoped></style>
