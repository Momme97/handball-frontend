import {Component, OnInit, Input, HostListener} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-header',
  templateUrl: './appointment-header.component.html',
  styleUrls: ['./appointment-header.component.scss']
})
export class AppointmentHeaderComponent implements OnInit {
  @Input() appointmentDate: string;
  @Input() appointmentTitle: string;
  @Input() appointmentFileUrl: string;





  constructor(
    private location: Location

  ) { }

  ngOnInit(): void {

  }


  navigateBack(){
    this.location.back();
  }

}
