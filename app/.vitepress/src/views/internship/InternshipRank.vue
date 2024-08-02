<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getRank } from '@/api/api-internship';

interface RankType {
  userId: number;
  integralValue: number;
  GiteeId: string;
  giteeRoom?: string;
  rank?: string;
}

const isAllVisible = ref(false);
const isRankUnfold = ref(false);
const isRankVisible = ref(true);

const rankInfo: any = ref();
const rankTop: any = ref();
const renderData: any = ref();

const rank = {
  first: '第一名',
  second: '第二名',
  third: '第三名',
  score: '积分',
  viewAll: '查看全部',
  packUp: '收起全部',
};

// 获取数据
async function getRankData() {
  try {
    const data = {
      sort: '',
      pageSize: 10000,
    };
    const res = await getRank(data);
    if (res.code === 200) {
      if (res.UserPoints.length < 1) {
        isRankVisible.value = false;
      } else {
        isRankVisible.value = true;
        const info = res.UserPoints;
        info.length > 10 ? (isAllVisible.value = true) : '';
        info.sort((a: any, b: any) => {
          return b.integralValue - a.integralValue;
        });

        info.forEach((item: RankType, index: number | string) => {
          item['giteeRoom'] = `https://gitee.com/${item.GiteeId}`;
          index < 9
            ? (item['rank'] = `0${+index + 1}`)
            : (item['rank'] = +index + 1 + '');
        });

        rankInfo.value = info;
        renderData.value = info.slice(3, 10);
        rankTop.value = info.slice(0, 3);
      }
    } else {
      isRankVisible.value = false;
      throw new Error(res.code + ' ' + res.message);
    }
  } catch (error: any) {
    console.error(error);
  }
}
const toggleRankState = () => {
  if (isRankUnfold.value) {
    renderData.value = rankInfo.value && rankInfo.value.slice(3, 10);
    window.location.href = '#rank';
  } else {
    renderData.value = rankInfo.value && rankInfo.value.slice(3);
  }
  isRankUnfold.value = !isRankUnfold.value;
};

onMounted(() => {
  getRankData();
});
</script>

<template>
  <div class="rank-border">
    <div class="rank-content">
      <div v-if="isRankVisible" class="rank-box">
        <div class="rank-top">
          <div
            v-for="(item, index) in rankTop"
            :key="index"
            class="top-item"
            :class="`rank` + index"
          >
            <a
              class="gitee-name"
              target="_blank"
              rel="noopener noreferrer"
              :href="item.giteeRoom"
            >
              {{ item.GiteeId }}
            </a>
            <div class="score">
              {{ item.integralValue }}
              <span>{{ rank.score }}</span>
            </div>
            <div
              class="rank-box"
              :class="[
                { second: +index === 1 },
                { first: +index === 0 },
                { third: +index === 2 },
              ]"
            >
              <span v-if="+index === 1">{{ rank.second }}</span>
              <span v-if="+index === 0">{{ rank.first }}</span>
              <span v-if="+index === 2">{{ rank.third }}</span>
            </div>
          </div>
        </div>
        <div class="rank-last">
          <div
            v-for="(item, index) in renderData"
            :key="index"
            class="rank-item"
          >
            <div class="rank-left">
              <div class="rank-class">{{ item.rank }}</div>
              <a
                :href="item.giteeRoom"
                target="_blank"
                rel="noopener noreferrer"
                class="gitee-name"
                >{{ item.GiteeId }}</a
              >
            </div>
            <div class="rank-right">
              <div class="score">{{ item.integralValue }}</div>
              <span>{{ rank.score }}</span>
            </div>
          </div>
        </div>
        <div v-if="isAllVisible" class="view-all">
          <a @click="toggleRankState()">
            {{ !isRankUnfold ? rank.viewAll : rank.packUp }}
            <div>
              <img
                :class="{ arrow: isRankUnfold }"
                src="@/assets/category/internship/right.svg"
                alt=""
              />
            </div>
          </a>
        </div>
      </div>
      <div v-else class="rank404">
        <div>虚位以待</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rank404 {
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  color: #eaeaea;
}
.rank-border {
  border-radius: 8px;
  border: 5px solid #ff7c56;
  border-top: 16px solid #ff7c56;
  background-color: #ff7c56;
}
.rank-content {
  border-radius: 8px;
  padding: 30px 290px 25px;
  background-color: #fff2ee;
  transition: all 0.5s;
  @media (max-width: 1000px) {
    border-radius: 8px;
    padding: 26px 15px 10px;
    height: 100%;
  }
  .rank-top {
    display: flex;
    justify-content: center;
    .top-item {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      text-align: center;
      .gitee-name {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 16px;
        @media (max-width: 1000px) {
          font-size: 12px;
        }
      }
      .gitee-name:hover {
        color: #002fa7;
      }
      &.rank1 {
        order: -1;
      }
      .score {
        margin: 10px 0 20px;
        font-size: 18px;
        color: #ff644e;
        line-height: 16px;
        @media (max-width: 1000px) {
          margin: 10px 0;
          font-size: 14px;
        }
        span {
          padding-left: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          @media (max-width: 1000px) {
            font-size: 12px;
          }
        }
      }
      .rank-box {
        width: 170px;
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        @media (max-width: 1000px) {
          width: 92px;
          font-size: 16px;
          line-height: 24px;
        }
      }
      .second {
        height: 66px;
        line-height: 66px;
        background: #5dc8ff;
        border: 1px solid #a4e1ff;
        @media (max-width: 1000px) {
          height: 60px;
          line-height: 60px;
        }
      }
      .first {
        position: relative;
        height: 104px;
        line-height: 104px;
        background: #ff7c56;
        border: 1px solid #a4e1ff;
        @media (max-width: 1000px) {
          height: 85px;
          line-height: 85px;
        }
      }
      .third {
        height: 48px;
        line-height: 48px;
        background: #2e9afe;
        border: 1px solid #a4e1ff;
        @media (max-width: 1000px) {
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
  .rank-last {
    .rank-item:nth-of-type(1) {
      margin-top: 30px;
      border-top: 1px dashed #ff7c56;
      @media (max-width: 1000px) {
        margin-top: 20px;
      }
    }
    .rank-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      margin-bottom: 10px;
      border-bottom: 1px dashed #ff7c56;
      @media (max-width: 1000px) {
        padding: 14px 0;
        margin: 0;
      }
      .rank-left,
      .rank-right {
        display: flex;
        align-items: center;
        .rank-class {
          font-size: 24px;
          color: #ff7c56;
          @media (max-width: 1000px) {
            font-size: 16px;
          }
        }
        .gitee-name {
          padding-left: 20px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          line-height: 16px;
          @media (max-width: 1000px) {
            padding-left: 10px;
            font-size: 12px;
          }
        }
        .gitee-name:hover {
          color: #002fa7;
        }
      }
      .rank-right {
        .score {
          font-size: 18px;
          color: #ff644e;
          line-height: 16px;
          @media (max-width: 1000px) {
            font-size: 14px;
          }
        }
        span {
          padding-left: 30px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          line-height: 16px;
          @media (max-width: 1000px) {
            padding-left: 6px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .dash {
    padding-top: 50px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #ff7c56;
    @media (max-width: 1000px) {
      padding-top: 30px;
    }
  }
  .view-all {
    padding-top: 15px;
    font-size: 14px;
    @media (max-width: 1000px) {
      padding-top: 20px;
      font-size: var(--o-font-size-tip);
    }
    a {
      cursor: pointer;
      display: flex;
      justify-content: center;
      color: var(--o-color-text1);
      div {
        display: flex;
        justify-content: center;
        padding-left: 9px;
        img {
          transform: rotate(90deg);
          transition: 0.3s;
          @media (max-width: 1000px) {
            width: 12px;
            height: 12px;
          }
        }
        .arrow {
          transform: rotate(-90deg);
        }
      }
    }
  }
}
</style>
