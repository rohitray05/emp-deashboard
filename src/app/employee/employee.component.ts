import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers:[EmployeeService]
})

export class EmployeeComponent implements OnInit{
  detailsForm: FormGroup;
  employeeId: number | null = null;
  isEditMode = false;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private employeeService:EmployeeService,private router:Router) {
    this.detailsForm = this.fb.group({
      id:[null],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      middleName: ['', []],
      lastName: ['', [Validators.minLength(3)]],
      designation: ['', Validators.required],
      doj: ['', [Validators.required, Validators.minLength(3)]],
      currentTeam: ['', []],
      repManFirstName: ['', [Validators.required, Validators.minLength(3)]],
      repManMiddleName: ['', []],
      repManLastName: ['', [Validators.minLength(3)]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.employeeService.getAnEmployee(id).subscribe((employee) => {
      if (employee) {
        const empObj = {
          id:employee.id,
          firstName:employee?.name?.firstName,
          middleName:employee?.name?.middleName,
          lastName:employee?.name?.lastName,
          designation:employee?.designation,
          doj:employee?.doj,
          currentTeam:employee?.currentTeam,
          repManFirstName:employee?.reportingMangaer?.firstName,
          repManMiddleName:employee?.reportingMangaer?.middleName,
          repManLastName:employee?.reportingMangaer?.lastName,
          mobile:employee?.mobile,
          email:employee?.email
        }
        this.detailsForm.patchValue(empObj);
      }
    });
  }

  onSubmit() {
    if (this.detailsForm.valid) {
      const formData = this.detailsForm.value;
      console.log('Form Submitted', formData);
      const empObj:Employee = {
        name:{
          firstName:formData.firstName,
          middleName:formData.middleName,
          lastName:formData.lastName
        },
        id:0,
        designation:formData.designation,
        experience:formData.designation,
        doj:formData.doj,
        currentTeam:formData.currentTeam,
        reportingMangaer:{
          firstName:formData.repManFirstName,
          middleName:formData.repManMiddleName,
          lastName:formData.repManLastName
        },
        mobile:formData.mobile,
        email:formData.email
       }
      if(this.isEditMode){
        empObj.id = formData.id
        this.employeeService.updateAnEmployee(formData.id,empObj).subscribe(res=>{
          console.log('Updated Employee Data:', res);
        },err=>{
          console.log('Updated Employee Data:', err);
        });
      }else{
        this.employeeService.getListOfEmployees().subscribe(res=>{
          // Generating a new ID
          empObj.id = Math.max(...res.map((e: { id: number}) => +e.id)) + 1;
          this.employeeService.addAnEmployee(empObj).subscribe({
            next:(data) => {
              console.log('Added Employee Data:', data);
              this.router.navigate(['/infrrd'])
            },
            error:(err: any)=>{
              console.log(err)
            }
          });
         
        },err=>{
          console.log(err)
        })
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
