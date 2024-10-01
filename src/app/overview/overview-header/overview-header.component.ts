import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview-header',
  standalone: true,
  imports: [],
  templateUrl: './overview-header.component.html',
  styleUrl: './overview-header.component.css'
})
export class OverviewHeaderComponent {
  constructor(private router: Router){}
   HEADER_ITEMS=[
    
   ]

   addAnEmployee():void{
    this.router.navigate([`infrrd/add`])
   }
}
