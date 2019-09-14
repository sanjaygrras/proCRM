import { Directive, ElementRef, Input, AfterViewInit, Renderer2, AfterViewChecked, OnInit } from '@angular/core';
import { ActionValidationService } from './action-validation.service';

@Directive({
  selector: '[appActionButton]'
})
export class ActionButtonDirective implements OnInit {
  @Input() actionTitle;

  constructor(private hostElement: ElementRef, private vs: ActionValidationService, private renderer: Renderer2) {
  this.vs.setRolePermission(localStorage.getItem('role'));
  }

  ngOnInit() {
    this.vs.setRolePermission(localStorage.getItem('role'));
    const isAllowed = this.vs.checkRolePermission(this.actionTitle);
    console.log('in directive checkling for ' + this.actionTitle);
    if (!isAllowed) {
    console.log('not allowed for' + this.actionTitle);
    this.hostElement.nativeElement.style.display = 'none';
    this.renderer.removeChild(this.renderer.parentNode(this.hostElement.nativeElement), this.hostElement.nativeElement);
    }  else    {
      console.log('allowed');
    }

}
}
