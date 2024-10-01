import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-overview-card',
  standalone: true,
  imports: [],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.css'
})

export class OverviewCardComponent {
  @Input() employee:any
  constructor(private router: Router,private employeeService: EmployeeService){}
  getEmployeeDetails(empId:number): void {
    this.router.navigate([`infrrd/${empId}`])
  }
  
  deleteEmployee(empId:string):void{
    this.employeeService.deleteAnEmployee(empId).subscribe({
      next:(data)=>{
        console.log('Employee Deleted')
        this.router.navigate(['/infrrd '])
      },
      error:(e:any)=>{
        console.log('Error',e)
      }
    })
  }
}
