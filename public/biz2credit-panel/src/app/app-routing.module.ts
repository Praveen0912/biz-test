import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'file-upload', component: FileUploadComponent},
  {path: 'users', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
