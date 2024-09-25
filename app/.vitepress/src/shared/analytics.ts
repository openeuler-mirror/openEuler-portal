import { OpenAnalytics, OpenEventKeys } from '@opensig/open-analytics';

export const oa = new OpenAnalytics({
  appKey: 'openEuler',
  request: (data) => {
    console.log(data);
  },
});

export const enableOA = () => {
  oa.enableReporting(true);
};

export const disableOA = () => {
  oa.enableReporting(false);
};

export const reportBaseInfo = () => {
  oa.report(OpenEventKeys.PV);
  oa.report(OpenEventKeys.LCP);
  oa.report(OpenEventKeys.INP);
  oa.report(OpenEventKeys.PageBasePerformance);
};
