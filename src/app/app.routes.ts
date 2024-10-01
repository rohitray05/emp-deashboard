import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
  {path:'',redirectTo:'infrrd',pathMatch:'full'},
  {path:'infrrd',
    children:[
      {path:'',component:OverviewComponent},
      {path:':id',component:EmployeeComponent}
    ]
  }
];
