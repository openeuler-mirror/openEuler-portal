<script lang="ts" setup>
import BannerLevel3 from '~@/components/BannerLevel3.vue';
</script>
<template>
  <div class="sig-meeting">
    <BannerLevel3
      :title="$t('sig.meetingBannerTitle')"
      :subtitle="$t('sig.meetingBannerSubtitle')"
    />
  </div>
</template>

<style scoped lang="scss"></style>
