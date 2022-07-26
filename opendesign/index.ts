import type { App } from 'vue';

import { Button } from './button';
import { Radio, RadioGroup } from './radio';
import { Select } from './select';

import { Icon } from './icon';
import { Card } from './card';
import { Tag } from './tag';
import { Tabs, TabPane } from './tabs';
import { Input } from './input';
import { Tree } from './tree';
import { Pagination } from './pagination';
import { Table, TableColumn } from './table';
import { Timeline } from './timeline';
import { Search } from './search';

const components = [
  Button,
  Radio,
  RadioGroup,
  Select,
  Icon,
  Card,
  Input,
  Pagination,
  Table,
  TableColumn,
  Tag,
  Timeline,
  Tabs,
  TabPane,
  Tree,
  Search,
];
export default {
  install(app: App): void {
    components.forEach((component) => {
      app.use(component as any);
    });
  },
};
