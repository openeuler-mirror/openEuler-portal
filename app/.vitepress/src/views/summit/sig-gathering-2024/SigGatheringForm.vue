<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
</script>
<template>
  <AppContent :pc-top="40" :mobile-top="12">
    <div class="form">
      <h2>openEuler SIG Gathering 2024 活动报名</h2>
      <div class="auth-box">
        <OButton type="primary"> 您好，活动报名已截止 </OButton>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.loading-page {
  width: 100%;
  min-height: calc(100vh - 80px - 282px - 80px);
  @media screen and (max-width: 867px) {
    min-height: calc(100vh - 259px - 48px - 52px);
  }
}
:deep(.el-loading-mask) {
  background: var(--e-color-bg2);
  z-index: 3;
}
:deep(.el-textarea) {
  box-shadow: 0 0 0 1px var(--e-color-border1) inset;
  .el-textarea__inner {
    border-radius: 0;
    box-shadow: 0 0 0 1px var(--e-color-border1) inset;
    &:focus {
      box-shadow: 0 0 0 1px var(--e-color-border1) inset;
    }
  }
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: var(--e-color-bg2);
  &::after {
    display: none;
  }
}

:deep(.o-checkbox) {
  .o-checkbox-icon {
    min-width: 16px;
    border: 1px solid var(--e-color-border1);
  }
  .o-checkbox-label {
    color: var(--e-color-text1);
    opacity: 0.8;
  }
  &.o-checkbox-checked {
    .o-checkbox-label {
      color: var(--e-color-text1);
      opacity: 1;
      & .o-icon {
        display: block;
      }
    }
  }
  &.sig-option {
    width: 100%;
    padding: 0 32px 0 20px;
    position: relative;
    .o-icon {
      font-size: 14px;
      position: absolute;
      left: 21px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      display: none;
    }
  }
}
:deep(.o-radio-group) {
  @media screen and (max-width: 867px) {
    flex-direction: column;
    .o-radio {
      margin-left: 0;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
:deep(.o-radio) {
  .o-radio-label {
    color: var(--e-color-text1);
    opacity: 0.8;
  }
  &.o-radio-checked {
    .o-radio-label {
      color: var(--e-color-text1);
      opacity: 1;
    }
  }
}

:deep(.e-select) {
  &:hover {
    box-shadow: 0 0 0 1px var(--e-color-border1) inset !important;
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--e-color-border1) inset;
    }
  }

  & .el-input.is-focus .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--e-color-border1) inset !important;
  }
  .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--e-color-border1) inset;
  }
  @media screen and (max-width: 867px) {
    & .el-input {
      height: auto;
      min-height: 34px;
      .el-input__wrapper {
        padding: 2px 11px;
      }
    }
  }
}

.form {
  background: var(--e-color-bg2);
  box-shadow: var(--e-shadow-l1);
  padding: 40px;
  @media (max-width: 1100px) {
    padding: 16px;
  }

  h2 {
    font-size: 32px;
    font-weight: 500;
    margin: 0 0 40px;
    text-align: center;
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      font-size: 24px;
      margin: 24px 0;
    }
  }
}
:deep(.input-disabled) {
  .el-input__wrapper {
    border-radius: 0;
    padding: 1px 15px;
    .el-input__inner {
      height: 36px;
    }
  }
}
.column {
  flex-direction: column;
  align-items: baseline;
  gap: 8px;
  .o-checkbox-group {
    flex-direction: column;
    align-items: baseline;
    gap: 8px;
  }
  .o-checkbox {
    margin-left: 0 !important;
  }
}
:deep(.el-form) {
  max-width: 764px;
  margin: 0 auto;
  .el-form-item__error {
    left: 16px;
    top: 102%;
  }

  .el-form-item {
    margin-bottom: 24px;
    @media screen and (max-width: 867px) {
      margin-bottom: 16px;
    }
    &:last-child {
      margin-bottom: 0;
    }

    &:nth-child(6),
    &:nth-child(8),
    &:nth-child(9) {
      padding-left: 11px;
      @media screen and (max-width: 867px) {
        padding-left: 0px;
      }
      .el-form-item__label {
        width: 211px !important;
        @media screen and (max-width: 867px) {
          width: 100% !important;
          padding-left: 11px;
        }
      }
    }
    .el-form-item__content {
      flex: 1;
    }

    .el-form-item__label {
      height: auto;
      padding-right: 0;
      margin-right: 32px;
      color: var(--e-color-text1);
      &::before {
        margin-top: 4px;
        width: 7px;
      }
    }

    &:nth-child(6) {
      .el-form-item__label {
        line-height: 24px;
      }
    }
  }

  .private-item,
  .submit-item {
    justify-content: center;
    .el-form-item__content {
      margin-left: 0 !important;
      max-width: max-content;
      width: 100%;
    }
  }
  .private-item {
    margin-top: 8px;
    .o-checkbox-checked {
      .o-checkbox-label {
        color: var(--e-color-text1);
        & .o-icon {
          display: block;
        }
      }
    }
    @media screen and (max-width: 867px) {
      .o-checkbox {
        align-items: start;
        .o-checkbox-icon {
          margin-top: 4px;
        }
      }
    }
  }
  @media screen and (max-width: 867px) {
    .submit-item {
      display: flex;
    }
  }
}
.wrap-item {
  .el-form-item__label {
    height: auto;
    padding-right: 32px;
  }
  &:nth-child(6) {
    .el-form-item__label {
      line-height: 24px;
    }
  }
}
:deep(.el-select) {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--e-color-border1) inset;
  }
  .el-select__input {
    margin-left: 18px !important;
  }
}

.el-select-dropdown__item {
  display: flex;
  padding: 0;

  &.selected .o-checkbox {
    font-weight: 500;
  }
}

.auth-box {
  padding: 64px 0;
  display: grid;
  place-items: center;
}

:deep(.el-input) {
  .el-input__validateIcon {
    display: none;
  }
}

.o-button {
  --e-button-bg-color-primary_hover: var(--e-color-brand1);
  --e-button-bg-color-primary_active: var(--e-color-brand1);
  --e-button-border-primary_hover: 1px solid var(--e-color-brand1);
  --e-button-border-primary_active: 1px solid var(--e-color-brand1);
  cursor: default;
}
</style>

<style lang="scss">
.el-popper.e-select-dropdown .o-option.hover {
  .o-checkbox-icon {
    border-color: var(--e-color-brand2) !important;
  }
}
</style>
