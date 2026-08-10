import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';

function createShowCaseTimerState() {
  const timer = ref<ReturnType<typeof setInterval> | undefined>();
  const changeCase = vi.fn();

  const setCaseInterval = () => {
    timer.value = setInterval(changeCase, 500000);
  };

  const clearCaseInterval = () => {
    clearInterval(timer.value);
  };

  const onUnmountedCleanup = () => {
    clearInterval(timer.value);
  };

  return { timer, changeCase, setCaseInterval, clearCaseInterval, onUnmountedCleanup };
}

describe('HomeShowCase 定时器清理 — onUnmounted 中 clearInterval(timer.value) 正确清除定时器', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('setCaseInterval 启动后，timer.value 为有效定时器 ID', () => {
    const { timer, setCaseInterval } = createShowCaseTimerState();
    expect(timer.value).toBeUndefined();
    setCaseInterval();
    expect(timer.value).toBeDefined();
  });

  it('setCaseInterval 启动后，定时器回调会触发', () => {
    const { changeCase, setCaseInterval } = createShowCaseTimerState();
    setCaseInterval();
    vi.advanceTimersByTime(500000);
    expect(changeCase).toHaveBeenCalledTimes(1);
  });

  it('clearCaseInterval 后，定时器回调不再触发', () => {
    const { changeCase, setCaseInterval, clearCaseInterval } = createShowCaseTimerState();
    setCaseInterval();
    clearCaseInterval();
    vi.advanceTimersByTime(500000);
    expect(changeCase).not.toHaveBeenCalled();
  });

  it('onUnmountedCleanup（clearInterval(timer.value)）后，定时器回调不再触发', () => {
    const { changeCase, setCaseInterval, onUnmountedCleanup } = createShowCaseTimerState();
    setCaseInterval();
    onUnmountedCleanup();
    vi.advanceTimersByTime(500000);
    expect(changeCase).not.toHaveBeenCalled();
  });

  it('timer.value.clearInterval（旧写法）不会清除定时器 — 回调仍会触发', () => {
    const { timer, changeCase, setCaseInterval } = createShowCaseTimerState();
    setCaseInterval();
    const noOp = (timer.value as any).clearInterval;
    expect(noOp).toBeUndefined();
    vi.advanceTimersByTime(500000);
    expect(changeCase).toHaveBeenCalledTimes(1);
  });

  it('clearInterval(undefined) 不会抛错（组件未挂载就被销毁的场景）', () => {
    const { timer, onUnmountedCleanup } = createShowCaseTimerState();
    expect(timer.value).toBeUndefined();
    expect(() => onUnmountedCleanup()).not.toThrow();
  });

  it('setCaseInterval 多次调用后 onUnmountedCleanup，仅最后一个定时器被清除（第一个因 ID 覆盖而泄漏）', () => {
    const { changeCase, setCaseInterval, onUnmountedCleanup } = createShowCaseTimerState();
    setCaseInterval();
    setCaseInterval();
    onUnmountedCleanup();
    vi.advanceTimersByTime(500000);
    expect(changeCase).toHaveBeenCalledTimes(1);
  });

  it('clearCaseInterval 与 onUnmountedCleanup 行为等价', () => {
    const state1 = createShowCaseTimerState();
    const state2 = createShowCaseTimerState();

    state1.setCaseInterval();
    state2.setCaseInterval();

    state1.clearCaseInterval();
    state2.onUnmountedCleanup();

    vi.advanceTimersByTime(500000);

    expect(state1.changeCase).not.toHaveBeenCalled();
    expect(state2.changeCase).not.toHaveBeenCalled();
  });
});
