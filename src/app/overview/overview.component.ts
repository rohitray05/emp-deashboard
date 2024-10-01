import { Component, OnInit } from '@angular/core';
import { OverviewHeaderComponent } from './overview-header/overview-header.component';
import { OverviewSectionComponent } from './overview-section/overview-section.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../employee.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewHeaderComponent,
    OverviewSectionComponent,
    OverviewCardComponent,
    CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
  providers:[EmployeeService]
})

export class OverviewComponent implements OnInit{

   employees:Employee[]
   constructor(private employeeService: EmployeeService){
    this.employees = [];
   }
   
   ngOnInit(): void {
     this.getEmployeesData()
   }

   getEmployeesData(): void {
    this.employeeService.getListOfEmployees().subscribe(res=>{
      this.employees = res;
    })
   }
}
