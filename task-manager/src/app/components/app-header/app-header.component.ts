import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
@Component({
  selector: 'app-app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  constructor(private router: Router) {}

}
