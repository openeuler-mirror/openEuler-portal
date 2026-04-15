<script setup lang="ts">
import { OIcon } from '@opensig/opendesign';

import IconTime from '~icons/app-new/icon-time.svg';

import { useCommon } from '@/stores/common';

const commonStore = useCommon();

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
</script>

<template>
  <div class="minisite-agenda">
    <p class="floor-title">{{ agendaData.title }}</p>
    <div v-for="item in agendaData.agenda" :key="item.date" class="agenda-box">
      <p class="date">{{ item.date }}</p>
      <div class="agenda-card" :class="`agenda-card-${commonStore.theme}`">
        <div v-for="(content, i) in item.content" :key="i" class="item-agenda">
          <div class="time">
            <OIcon><IconTime /></OIcon>
            <span>{{ content.time }}</span>
          </div>
          <p class="title">{{ content.title }}</p>
          <div v-if="content.name" class="guest">
            <p class="name">{{ content.name }}</p>
            <p class="post">{{ content.post }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date {
  color: var(--o-color-info1);
  margin-top: 40px;
  text-align: center;
  font-weight: 600;
  @include h2;
}
.agenda-card {
  margin-top: 24px;
  border-radius: var(--o-radius-xs);
  padding: 24px 32px;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: cover;
}
.agenda-box {
  &:nth-of-type(1) {
    .agenda-card {
      background-image: url('../img/agenda_bg1.png'), linear-gradient(135deg, rgba(var(--o-mixedgray-1), 1), rgba(245,249,255,1) 100%);
    }
    .agenda-card-dark {
      background-image: url('../img/agenda_bg1.png'), linear-gradient(135deg, rgba(var(--o-mixedgray-4), 1), rgba(25, 37, 66, 1) 100%);
    }
  }
  &:nth-of-type(2) {
    .agenda-card {
      background-image: url('../img/agenda_bg2.png'), linear-gradient(135deg, rgba(var(--o-mixedgray-1), 1), rgba(245,249,255,1) 100%);
    }
    .agenda-card-dark {
      background-image: url('../img/agenda_bg2.png'), linear-gradient(135deg, rgba(var(--o-mixedgray-4), 1), rgba(25, 37, 66, 1) 100%);
    }
  }
  &:nth-of-type(3) {
    .agenda-card {
      background-image: url('../img/agenda_bg3.png'), linear-gradient(135deg, rgba(var(--o-mixedgray-1), 1), rgba(245,249,255,1) 100%);
    }
    .agenda-card-dark {
      background-image: url('../img/agenda_bg3.png'), linear-gradient(135deg, rgba(var(--o-mixedgray-4), 1), rgba(25, 37, 66, 1) 100%);
    }
  }
}
.item-agenda {
  display: flex;
  align-items: center;
  padding: 16px 0;
  @include text1;
}
.item-agenda + .item-agenda {
  border-top: 1px solid var(--o-color-control4);
}
.time {
  width: 192px;
  display: flex;
  align-items: center;
  color: var(--o-color-info2);
  flex-shrink: 0;
  .o-icon {
    --icon-size: 24px;
    margin-right: 8px;
  }
}
.title {
  width: 508px;
  font-weight: 600;
  margin-left: 32px;
  flex-shrink: 0;
}
.guest {
  display: flex;
  align-items: center;
}
.name {
  width: 80px;
  margin-left: 32px;
  flex-shrink: 0;
}
.post {
  margin-left: 32px;
  color: var(--o-color-info3);
}

@include respond-to('<=laptop') {
  .date {
    margin-top: 24px;
  }
  .agenda-card {
    margin-top: 16px;
    padding: 16px 24px;
  }
  .item-agenda {
    padding: 12px 0;
  }
  .time {
    width: 154px;
  }
  .title {
    width: 406px;
    margin-left: 24px;
  }
  .name {
    margin-left: 24px;
  }
  .post {
    margin-left: 24px;
  }
}
@include respond-to('<=pad') {
  .time {
    width: 124px;
    .o-icon {
      --icon-size: 16px;
    }
  }
  .title {
    width: 300px;
    margin-left: 16px;
  }
  .name {
    width: 60px;
    margin-left: 16px;
  }
  .post {
    margin-left: 16px;
  }
}
@include respond-to('<=pad_v') {
  .date {
    margin-top: 16px;
  }
  .agenda-card {
    margin-top: 12px;
    padding: 12px;
  }
  .item-agenda {
    padding: 8px 0;
    flex-direction: column;
    align-items: flex-start;
  }
  .time {
    width: auto;
  }
  .title {
    width: auto;
    margin: 8px 0 0;
  }
  .guest {
    width: auto;
    margin: 8px 0 0;
  }
  .name {
    width: auto;
    margin-left: 0;
  }
  .post {
    margin-left: 8px;
  }
}
</style>
