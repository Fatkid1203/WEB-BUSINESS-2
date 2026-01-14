import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbinding',
  standalone: false,
  templateUrl: './learnbinding.html',
  styleUrl: './learnbinding.css',
})
export class Learnbinding {
  student_id:string="k234111414"
  student_name:string="Tan Phat Huynh"
  student_address:string="HCM City"
  red_text_style={
    color:'red'
  }
}
