<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue';

import { ElMessage, FormInstance, FormRules } from 'element-plus';
import useWindowResize from '@/components/hooks/useWindowResize';
import { showGuard, getUserAuth } from '@/shared/login';

import AppContent from '@/components/AppContent.vue';

import { isTestEmail, isTestPhone } from '@/shared/utils';

import { queryPersonalInfo } from '@/api/api-login';

const { token } = getUserAuth();
const ruleFormRef = ref<FormInstance>();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1100 ? true : false));
const labelPosition = ref(isMobile.value ? 'top' : 'left');

const formData = ref({
  name: '',
  phone: '',
  email: '',
  id: '',
  address: '',
  sig: '',
  subject: [],
  join: '',
});

const placeholderList = [
  '请填写您的真实姓名',
  '请填写您的真实手机号以便接收活动通知',
  '请填写您的真实邮箱信息以便接收活动通知',
  '关联的账号信息',
  '请填写您的真实工作单位',
  '如：xxx SIG，如代表多个SIG参与，可写多个SIG组名称',
  '至少选择一个专场',
  '',
];

// 表单校验规则
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: placeholderList[0],
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: placeholderList[1],
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestPhone(formData.value.phone)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: placeholderList[2],
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestEmail(formData.value.email)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
  ],
  id: [
    {
      required: true,
      message: placeholderList[3],
      trigger: 'blur',
    },
  ],
  address: [
    {
      required: true,
      message: placeholderList[4],
      trigger: 'blur',
    },
  ],
  sig: [
    {
      required: true,
      message: placeholderList[5],
      trigger: 'blur',
    },
  ],
  subject: [
    {
      required: true,
      message: placeholderList[6],
      trigger: 'blur',
    },
  ],
  //   join: [
  //     {
  //       required: true,
  //       message: placeholderList[7],
  //       trigger: 'blur',
  //     },
  //   ],
});

// 获取用户信息
const userInfo = ref([]);
async function getPersonalInfo() {
  try {
    await queryPersonalInfo().then((res) => {
      userInfo.value = res.data;
      const { username, email, phone } = res.data;
      formData.value.email = email;
      formData.value.phone = phone;
      formData.value.id = username;
    });
  } catch (error: any) {
    console.error(error);
  }
}
onMounted(() => {
  if (token) {
    getPersonalInfo();
  }
});

const meetupPrivacy = ref('');
const submitMeetupForm = async (formEl: FormInstance | undefined) => {
  if (meetupPrivacy.value.length < 1) {
    ElMessage({
      type: 'error',
      message: '请勾选隐私声明',
    });
    return;
  }
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      console.log('submit');
    }
  });
};
</script>
<template>
  <AppContent :pc-top="40" :mobile-top="12">
    <div class="form">
      <h2>Sig Gathering申请表</h2>
      <template v-if="token">
        <el-form
          ref="ruleFormRef"
          :model="formData"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :label-position="labelPosition"
          status-icon
        >
          <el-form-item label="姓名" prop="name">
            <OInput v-model="formData.name" :placeholder="placeholderList[0]" />
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <OInput
              v-model="formData.phone"
              :placeholder="placeholderList[1]"
            />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <OInput
              v-model="formData.email"
              :placeholder="placeholderList[2]"
            />
          </el-form-item>

          <el-form-item label="openeuler ID" prop="id">
            <OInput v-model="formData.id" :placeholder="placeholderList[3]" />
          </el-form-item>

          <el-form-item label="工作单位" prop="address">
            <OInput
              v-model="formData.address"
              :placeholder="placeholderList[4]"
            />
          </el-form-item>

          <el-form-item label="您在openeuler社区哪个SIG组参与贡献" prop="sig">
            <OInput v-model="formData.sig" :placeholder="placeholderList[5]" />
          </el-form-item>

          <el-form-item label="您计划参与的技术研讨专场" prop="subject">
            <OCheckboxGroup v-model="formData.subject" class="column">
              <OCheckbox value="专题一：多样性算力">
                专题一：多样性算力
              </OCheckbox>
              <OCheckbox value="专题二：全场景应用">
                专题二：全场景应用
              </OCheckbox>
              <OCheckbox value="专题三：AI原生支持">
                专题三：AI原生支持
              </OCheckbox>
              <OCheckbox value="专题四：openEuler原生支持">
                专题四：openEuler原生支持
              </OCheckbox>
              <OCheckbox value="专题五：上游原生支持">
                专题五：上游原生支持
              </OCheckbox>
              <OCheckbox value="专题六：用户体验研究">
                专题六：用户体验研究
              </OCheckbox>
            </OCheckboxGroup>
          </el-form-item>

          <el-form-item label="您是否参与开发者之夜" prop="join">
            <ORadioGroup v-model="formData.join">
              <ORadio value="yes">是</ORadio>
              <ORadio value="no">否</ORadio>
            </ORadioGroup>
          </el-form-item>

          <el-form-item>
            <OCheckboxGroup v-model="meetupPrivacy">
              <OCheckbox value="1"
                >您理解并同意，请填写并提交的内容，即视为您已充分阅读并理解openEuler的
                <a
                  href="/zh/other/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >隐私声明</a
                >
              </OCheckbox>
            </OCheckboxGroup>
          </el-form-item>

          <el-form-item>
            <div style="margin-top: 12px">
              <OButton type="primary" @click="submitMeetupForm(ruleFormRef)">
                提交申请
              </OButton>
            </div>
          </el-form-item>
        </el-form>
      </template>

      <template v-else>
        <div class="auth-box">
          <OButton type="primary" @click="showGuard()"
            >请先登录后，在填写</OButton
          >
        </div>
      </template>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.form {
  background: var(--o-color-bg2);
  box-shadow: var(--o-shadow-l1);
  padding: 40px;
  @media (max-width: 1100px) {
    padding: 16px;
  }

  h2 {
    font-size: 32px;
    font-weight: 500;
    margin: 0 0 40px;
    text-align: center;
    color: var(--o-color-text1);
    @media (max-width: 1100px) {
      font-size: 24px;
      margin: 24px 0;
    }
  }
}

.column {
  flex-direction: column;
  align-items: baseline;
  .o-checkbox-group,
  .o-radio-group {
    flex-direction: column;
    align-items: baseline;
    gap: 8px;
  }
  .o-checkbox,
  .o-radio {
    margin-left: 0 !important;
  }
}
:deep(.el-form) {
  .el-form-item {
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      flex-direction: column;
      .el-form-item__label {
        width: auto !important;
      }
      .el-form-item__content {
        padding-left: 120px;
      }
      .el-form-item__error {
        margin-left: 120px;
      }
    }
  }
}
.auth-box {
  padding: 64px 0;
  display: grid;
  place-items: center;
}
</style>
