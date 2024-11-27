<script lang="ts" setup>
import bgImg from '@/assets/category/honor/bg-right.png';
import IconRight from '~icons/app/icon-arrow-right.svg';

defineProps({
  honorData: {
    type: Object,
  },
});
</script>
<template>
  <div class="award-box">
    <h2>openEuler 年度优秀项目</h2>
    <div
      v-for="item in honorData.award.team"
      :key="item.title"
      class="award-team"
    >
      <h5>{{ item.title }}</h5>
      <div class="team-card-box">
        <div v-for="award in item.awardList" :key="award.name" class="team-box">
          <OCard class="team-item" :style="{ '--el-card-padding': 0 }">
            <p class="name">{{ award.name }}</p>
            <div class="detail">
              <p v-for="itemDetail in award.detail" :key="itemDetail">
                {{ itemDetail }}
              </p>
            </div>
            <a
              :href="award.link"
              v-if="award.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton class="address-btn" type="text" animation size="nomral">
                项目地址
                <template #suffixIcon>
                  <OIcon class="address-icon">
                    <IconRight />
                  </OIcon>
                </template>
              </OButton>
            </a>
            <img class="bg-right" :src="bgImg" alt="" />
          </OCard>
        </div>
      </div>
    </div>
    <h2 class="title-2023">2024年度贡献之星</h2>
    <div
      v-for="personal in honorData.award.personal"
      class="award-personal"
      :key="personal.title"
    >
      <h5>{{ personal.title }}</h5>
      <div class="personal-box">
        <OCard
          v-for="item in personal.awardList"
          :key="item"
          :style="{ '--el-card-padding': 0 }"
          class="personal-item"
        >
          <div class="item-head">
            <img class="item-img" :src="item.img" alt="" />
            <img class="bg-right" :src="bgImg" alt="" />
          </div>
          <div class="item-body">
            <p class="name">{{ item.name }}</p>
            <p v-for="itemPost in item.post" :key="itemPost" class="post">
              {{ itemPost }}
            </p>
          </div>
          <div class="personal-hover">
            <p class="name">{{ item.name }}</p>
            <div class="detail">
              <p v-for="itemDetail in item.detail" :key="itemDetail">
                {{ itemDetail }}
              </p>
            </div>
          </div>
        </OCard>
      </div>
    </div>
    <div class="award-personal">
      <h5 class="nomination-title">同时感谢所有提名者</h5>
      <div class="nomination">
        <div
          v-for="nomination in honorData.award.nomination"
          class="nomination-item"
        >
          {{ nomination.name }}
        </div>
      </div>
    </div>
  </div>
  <p class="notice">{{ honorData.award.notice }}</p>
</template>

<style scoped lang="scss">
.award-box {
  @media screen and (max-width: 768px) {
    margin-top: 0 !important;
  }
}
.award-personal {
  .nomination {
    margin-top: 24px;
    display: grid;
    @include text1;
    color: var(--o-color-info2);
    border-top: 5px solid var(--o-color-primary1);
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    box-shadow: var(--e-shadow-l2);
    background-color: var(--o-color-fill2);
    padding: 24px 64px 32px;
    gap: 32px;
    @include respond-to('<=laptop') {
      grid-template-columns: repeat(3, minmax(100px, 1fr));
    }
    @include respond-to('<=pad_v') {
      padding: 16px 24px 24px;
      grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
  }
}
</style>
