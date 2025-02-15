<template>
  <div class="mirror">
    <img class="bgImg" src="@/assets/nestos/resource/group.png" alt="bgImg" />
    <el-collapse accordion class="collapse">
      <el-collapse-item :name="item.$index" v-for="item in docList" :key="item">
        <template #title>
          <!-- <el-icon class="header-icon"> <Folder /> </el-icon> -->
          &nbsp;{{ item.dateTitle }}
        </template>
        <div class="content">
          <el-radio-group v-model="mirrorArch">
            <el-radio value="x86_64" size="large">x86_64</el-radio>
            <el-radio value="aarch64" size="large">aarch64</el-radio>
          </el-radio-group>
          <div v-if="mirrorArch === 'x86_64'" class="linkDiv">
            <span
              class="linkSpan"
              v-for="link in item.x86List"
              @click="goLink(link)"
              :key="link"
              >{{ link.name }}</span
            >
          </div>
          <div v-else class="linkDiv">
            <span
              class="linkSpan"
              v-for="link in item.armList"
              @click="goLink(link)"
              :key="link"
              >{{ link.name }}</span
            >
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { Folder } from '@element-plus/icons-vue';
import { docList } from '../utils/resource';
const mirrorArch = ref('x86_64');
const goLink = (item) => {
  window.open(item.path, '_blank');
};
</script>

<style lang="scss" scoped>
@import '@/components/nestos/style/collapse.scss';
.mirror {
  position: relative;
  overflow: hidden;
  background-color: var(--o-color-fill2);
  box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1) !important;

  .collapse {
    width: 90%;
    margin: 0 auto;

    .content {
      .linkDiv {
        padding-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .linkSpan {
          padding: 10px;
          height: 10px;
          line-height: 10px;
          background-color: var(--o-color-fill3);
          margin: 0 20px 10px 0;
          border-radius: 6px;
          cursor: pointer;

          &:hover {
            color: #357aef;
            box-shadow: 0 6px 18px rgba(0, 47, 167, 0.14);
          }
        }
      }
    }
  }

  .bgImg {
    width: 20%;
    // display: none;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateX(14%);
  }
}
</style>
