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
    <h2 v-for="item in honorData.award.personal.title" :key="item">
      {{ item }}
    </h2>
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
    <h2 class="title-2023">2023年度贡献之星</h2>
    <div class="award-personal">
      <h5>{{ honorData.award.personal.subTitle }}</h5>
      <div class="personal-box">
        <OCard
          v-for="item in honorData.award.personal.awardList"
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
  </div>
  <p class="notice">{{ honorData.award.notice }}</p>
</template>

<style scoped lang="scss"></style>
