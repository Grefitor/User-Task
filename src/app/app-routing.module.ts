import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  UserListComponent
} from './user-list/user-list.component';
import {
  UserPageComponent
} from './user-page/user-page.component';

const routes: Routes = [{
    path: '',
    component: UserListComponent
  },
  {
    path: 'user/:id',
    component: UserPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
