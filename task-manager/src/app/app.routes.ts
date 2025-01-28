import { Routes } from '@angular/router';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {MainPageComponent} from './components/main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'todos',
    component: TodosListComponent
  }
];
