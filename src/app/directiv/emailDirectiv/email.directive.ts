import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmail]'
})
export class EmailDirective {
  constructor() {}
  @HostListener('mouseenter')
  emailSend() {
    console.log('Działa Dyrektywa ');
  }
}
