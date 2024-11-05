import { OpenAnalytics, OpenEventKeys } from '@opensig/open-analytics';
import { reporAnalytics } from '@/api/api-analytics';

export const oa = new OpenAnalytics({
  appKey: 'openEuler',
  request: (data) => {
    reporAnalytics(data);
  },
});

export const enableOA = () => {
  oa.enableReporting(true);
};

export const disableOA = () => {
  oa.enableReporting(false);
};

export const reportPV = () => {
  oa.report(OpenEventKeys.PV);
};

export const reportPerformance = () => {
  oa.report(OpenEventKeys.LCP);
  oa.report(OpenEventKeys.INP);
  oa.report(OpenEventKeys.PageBasePerformance);
};
