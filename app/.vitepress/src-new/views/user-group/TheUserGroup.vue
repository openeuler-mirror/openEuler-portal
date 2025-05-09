<script lang="ts" setup>
import UserGroupBanner from './components/UserGroupBanner.vue';
import UserGroupGuide from './components/UserGroupGuide.vue';
import UserGroupList from './components/UserGroupList.vue';
import UserGroupIntro from './components/UserGroupIntro.vue';
import UserGroupQuestion from './components/UserGroupQuestion.vue';
</script>

<template>
  <UserGroupBanner />
  <UserGroupGuide />
  <UserGroupList />
  <UserGroupIntro />
  <UserGroupQuestion />
</template>

<style scoped lang="scss">
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
