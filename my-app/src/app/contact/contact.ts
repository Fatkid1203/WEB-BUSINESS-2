import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  sendContact():void
  {
    const input_name=document.getElementById("name") as HTMLInputElement
    const input_email=document.getElementById("email") as HTMLInputElement
    const tdphanhoi=document.getElementById("tdphanhoi")
    alert("Tui đã nhận được ["+input_name.value+"]")
  }
}
