export interface DayDataT {
  creator: string;
  duration_time: string;
  join_url: string;
  startTime: string;
  endTiem: string;
  url: string;
  data?: string;
  id?: string;
  etherpad?: string;
  start_date?: string;
  name?: string;
  title?: string;
  schedules?: any;
  activity_category?: number;
  group_name?: string;
  endTime?: string;
  end_date?: string;
  type: string;
  activity_type?: number | string;
}

export interface TableDataT {
  date: string;
  timeData: DayDataT[];
}
export interface TableDataObjT {
  tableData: TableDataT[];
}
