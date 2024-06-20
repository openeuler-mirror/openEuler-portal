---
title: '线上会议'
---

<script setup lang="ts">
import BannerLevel2 from '@/components/BannerLevel2.vue'
import TheMeeting from "@/views/meeting/Join.vue"

import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-meeting.png';

</script>

<ClientOnly>
  <BannerLevel2
    :background-image="banner"
    background-text="SIG"
    title="线上会议"
    :illustration="illustration"
  />
</ClientOnly>

<TheMeeting/>