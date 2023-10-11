<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import useWindowResize from '@/components/hooks/useWindowResize';
import { meetupApplyForm } from '@/api/api-search';
import { queryPersonalInfo } from '@/api/api-login';
import { showGuard, getUserAuth } from '@/shared/login';
import { isTestEmail, isTestPhone } from '@/shared/utils';

import AppContent from '@/components/AppContent.vue';

const { token } = getUserAuth();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1100 ? true : false));

const ruleFormRef = ref<FormInstance>();
const labelPosition = ref(isMobile.value ? 'top' : 'left');

const meetupData = ref({
  topic: '',
  company: '',
  date: '',
  duration: '' as any,
  city: '',
  meetupSize: '',
  principalUser: '',
  principalCompany: '',
  principalPhone: '',
  principalEmail: '',
  meetupFormat: '' as any,
  supports: [] as any,
  details: '',
});

const placeholderList = [
  '如：xxx有限公司/xxx SIG/xxx城市组',
  '如：openEuler云原生Meetup深圳站/ openEuler DPU Meetup北京站',
  '请初步选择期望举办日期，社区将根据实际排期与您协商安排',
  '如果您有其他时间安排计划，请输入',
  '请填写城市名',
  '请填写预计参加活动的人数，如：30人/50人/80人...',
  '请填写活动负责人真实姓名',
  '请填写活动负责人所属公司',
  '请填写真实手机号码',
  '请填写有效邮箱地址',
  '如果您有其他活动形式计划，请输入',
  '如果您有其他支持需求，请输入',
  '是否已经准备好相关议题，如有请按要求输入 \n 1.《xxx》- 分享人 \n 2.《xxx》- 分享人 ...',
];

// 表单校验规则
const rules = reactive<FormRules>({
  company: [
    {
      required: true,
      message: placeholderList[0],
      trigger: 'blur',
    },
  ],
  topic: [
    {
      required: true,
      message: placeholderList[1],
      trigger: 'blur',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: placeholderList[2],
      trigger: 'change',
    },
  ],
  duration: [
    {
      required: true,
      message: placeholderList[3],
      trigger: 'change',
    },
  ],
  city: [
    {
      required: true,
      message: placeholderList[4],
      trigger: 'blur',
    },
  ],
  meetupSize: [
    {
      required: true,
      message: placeholderList[5],
      trigger: 'blur',
    },
  ],
  principalUser: [
    {
      required: true,
      message: placeholderList[6],
      trigger: 'blur',
    },
  ],
  principalCompany: [
    {
      required: true,
      message: placeholderList[7],
      trigger: 'blur',
    },
  ],
  principalPhone: [
    {
      required: true,
      message: placeholderList[8],
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestPhone(meetupData.value.principalPhone)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
  ],
  principalEmail: [
    {
      required: true,
      message: placeholderList[9],
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestEmail(meetupData.value.principalEmail)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
  ],
  meetupFormat: [
    {
      required: true,
      message: placeholderList[10],
      trigger: 'change',
    },
  ],
  supports: [
    {
      type: 'array',
      required: true,
      message: placeholderList[11],
      trigger: 'change',
    },
  ],
  details: [{ required: true, message: placeholderList[12], trigger: 'blur' }],
});

const isDurationOptional = ref(false);
const durationComment = ref('');
const durationChange = () => {
  isDurationOptional.value =
    meetupData.value.duration === '其他' ? true : false;
};

// 需要支持
const isSupportsComment = ref(false);
const supportsComment = ref('');
const supportsChange = () => {
  meetupData.value.supports.map((item: any) => {
    isSupportsComment.value = item === '其他' ? true : false;
  });
};

const isMeetupFormat = ref(false);
const meetupFormatComment = ref('');
const meetupFormatChange = () => {
  isMeetupFormat.value =
    meetupData.value.meetupFormat === '其他' ? true : false;
};

// 格式化支持数据
const supportsFormat = () => {
  const supports = meetupData.value.supports.map((item: any) => {
    if (item === '其他') {
      return {
        optional: item,
        comment: supportsComment.value,
      };
    } else {
      return {
        optional: item,
      };
    }
  });
  meetupData.value.supports = supports;

  // 活动时长
  if (
    typeof meetupData.value.duration === 'string' ||
    typeof meetupData.value.meetupFormat === 'string'
  ) {
    const duration = {
      optional: meetupData.value.duration,
      comment: durationComment.value,
    };
    meetupData.value.duration = duration;

    // 活动形式
    const meetupFormat = {
      optional: meetupData.value.meetupFormat,
      comment: meetupFormatComment.value,
    };
    meetupData.value.meetupFormat = meetupFormat;
  }
};

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
      supportsFormat();
      meetupApply();
    }
  });
};

// 提交申请
async function meetupApply() {
  try {
    await meetupApplyForm(meetupData.value).then((res) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '申请成功！',
        });
        ruleFormRef.value?.resetFields();
        meetupPrivacy.value = '';
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}

// 获取用户信息
const userInfo = ref([]);
async function getPersonalInfo() {
  try {
    await queryPersonalInfo().then((res) => {
      userInfo.value = res.data;
      const { username, email, phone } = res.data;
      meetupData.value.principalUser = username;
      meetupData.value.principalEmail = email;
      meetupData.value.principalPhone = phone;
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
</script>

<template>
  <AppContent :pc-top="40" :mobile-top="12">
    <div class="meetup-form">
      <h2>openEuler Meetup申请表</h2>
      <template v-if="token">
        <el-form
          ref="ruleFormRef"
          :model="meetupData"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :label-position="labelPosition"
          status-icon
        >
          <el-form-item label="活动组织" prop="company">
            <OInput
              v-model="meetupData.company"
              :placeholder="placeholderList[0]"
            />
          </el-form-item>
          <el-form-item label="活动主题" prop="topic">
            <OInput
              v-model="meetupData.topic"
              :placeholder="placeholderList[1]"
            />
          </el-form-item>
          <el-form-item label="活动日期" prop="date">
            <el-date-picker
              v-model="meetupData.date"
              type="date"
              value-format="YYYY-MM-DD"
              :placeholder="placeholderList[2]"
            />
          </el-form-item>
          <el-form-item label="活动时长" prop="duration">
            <ORadioGroup v-model="meetupData.duration" @change="durationChange">
              <ORadio value="半天">半天（需准备3-5个议题）</ORadio>
              <ORadio value="全天">全天（需准备8-10个议题）</ORadio>
              <ORadio value="其他">其他</ORadio>
            </ORadioGroup>
            <OInput
              v-if="isDurationOptional"
              v-model="durationComment"
              class="other-input"
              :placeholder="placeholderList[3]"
            />
          </el-form-item>
          <el-form-item label="活动城市" prop="city">
            <OInput
              v-model="meetupData.city"
              :placeholder="placeholderList[4]"
            />
          </el-form-item>
          <el-form-item label="活动规模" prop="meetupSize">
            <OInput
              v-model="meetupData.meetupSize"
              :placeholder="placeholderList[5]"
            />
          </el-form-item>
          <el-form-item label="活动负责人姓名" prop="principalUser">
            <OInput
              v-model="meetupData.principalUser"
              :placeholder="placeholderList[6]"
            />
          </el-form-item>
          <el-form-item label="负责人所在公司" prop="principalCompany">
            <OInput
              v-model="meetupData.principalCompany"
              :placeholder="placeholderList[7]"
            />
          </el-form-item>
          <el-form-item label="负责人联系方式" prop="principalPhone">
            <OInput
              v-model="meetupData.principalPhone"
              :placeholder="placeholderList[8]"
            />
          </el-form-item>
          <el-form-item label="活动负责人邮箱" prop="principalEmail">
            <OInput
              v-model="meetupData.principalEmail"
              :placeholder="placeholderList[9]"
            />
          </el-form-item>
          <el-form-item label="活动形式" prop="meetupFormat">
            <ORadioGroup
              v-model="meetupData.meetupFormat"
              @change="meetupFormatChange"
            >
              <ORadio value="线上活动">线上活动</ORadio>
              <ORadio value="线下活动">线下活动</ORadio>
              <ORadio value="线上+线下">线上+线下</ORadio>
              <ORadio value="其他">其他</ORadio>
            </ORadioGroup>
            <OInput
              v-if="isMeetupFormat"
              v-model="meetupFormatComment"
              class="other-input"
              :placeholder="placeholderList[10]"
            />
          </el-form-item>
          <el-form-item label="需要什么支持" prop="supports">
            <OCheckboxGroup
              v-model="meetupData.supports"
              class="column"
              @change="supportsChange"
            >
              <OCheckbox value="openEuler社区介绍PPT"
                >openEuler社区介绍PPT</OCheckbox
              >
              <OCheckbox value="宣传资料"
                >宣传资料（报名小程序、公众号推文、社群宣传）</OCheckbox
              >
              <OCheckbox value="物料源文件"
                >物料源文件（易拉宝、宣传海报、主KV、横幅、拍照异形牌、直播背景框等源文件）</OCheckbox
              >
              <OCheckbox value="openEuler B站直播资源"
                >openEuler B站直播资源（如需直播）</OCheckbox
              >
              <OCheckbox value="社区周边礼品"
                >社区周边礼品（支持100人规模以下的实际人数申请）</OCheckbox
              >
              <OCheckbox value="其他">其他</OCheckbox>
            </OCheckboxGroup>
            <OInput
              v-if="isSupportsComment"
              v-model="supportsComment"
              class="other-input"
              :placeholder="placeholderList[11]"
            />
          </el-form-item>
          <el-form-item label="活动环节议题" prop="details">
            <OInput
              v-model="meetupData.details"
              type="textarea"
              :rows="3"
              :placeholder="placeholderList[12]"
            />
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
.auth-box {
  padding: 64px 0;
  display: grid;
  place-items: center;
}
.meetup-form {
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
  :deep(.el-date-editor) {
    width: 500px;
    @media (max-width: 767px) {
      width: 100%;
    }
    .el-input__wrapper {
      border-radius: 0;
      box-shadow: 0 0 0 1px var(--o-color-border1) inset;
      height: 36px;
      line-height: 36px;
      background: var(--o-color-bg2);
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
  @media (max-width: 1100px) {
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

  .other-input {
    margin-top: 12px;
  }
}
</style>
