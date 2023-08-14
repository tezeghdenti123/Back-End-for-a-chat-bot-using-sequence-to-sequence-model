import { AuthGuard } from '../ProtectedRouting/auth.guard';
import { MainComponent } from '../main/main.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'SignIn',pathMatch:'full'},
  {path:"SignUp",component:SignUpComponent},
  {path:"Main",component:MainComponent,canActivate:[AuthGuard]},
  {path:"SignIn",component:SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
