import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview-section.component.html',
  styleUrl: './overview-section.component.css'
})
export class OverviewSectionComponent {
  menuOptions = ['Overview','Messages','Search','Filter','History','My Account']
}
