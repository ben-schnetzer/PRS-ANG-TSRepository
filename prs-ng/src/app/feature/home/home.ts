import { Component } from '@angular/core';
import { SystemService } from '../../service/system-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
constructor(public sysSvc: SystemService) {}
}
