import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  standalone: false,
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  get_solution(hsa:HTMLInputElement, hsb:HTMLInputElement, result:HTMLElement)
  {
    let a=parseFloat(hsa.value);
    let b=parseFloat(hsb.value);
    if(a==0 && b==0)
    {
      result.innerText="Phuong trinh vo so nghiem";
    }
    else if(a==0 && b!=0)
    {
      result.innerText="Phuong trinh vo nghiem";
    }
    else
    {
      let x=-b/a;
      result.innerText=""+x;
    }
  }
  clear_solution(
    hsa: HTMLInputElement,
    hsb: HTMLInputElement,
    result: HTMLElement
  ) {
    // Xóa dữ liệu
    hsa.value = '';
    hsb.value = '';
    result.innerText = '';
  
    // Focus lại ô a
    hsa.focus();
  }
}
