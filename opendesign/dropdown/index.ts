import type { App } from 'vue';
import Dropdown from './ODropdown.vue';
import DropdownItem from './ODropdownitem.vue';

Dropdown.install = function (app: App) {
  app.component('ODropdown', Dropdown);
};
DropdownItem.install = function (app: App) {
  app.component('ODropdownItem', DropdownItem);
};

export { Dropdown, DropdownItem };
