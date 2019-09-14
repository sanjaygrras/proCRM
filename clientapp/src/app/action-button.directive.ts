import { Directive, ElementRef, Input, AfterViewInit, Renderer2 } from '@angular/core';
import { ActionValidationService } from './action-validation.service';

@Directive({
  selector: '[appActionButton]'
})
export class ActionButtonDirective implements AfterViewInit {
  @Input() actionTitle;

  constructor(private hostElement: ElementRef, private vs: ActionValidationService, private renderer: Renderer2) {
  this.vs.setRolePermission(localStorage.getItem('role'));
  }

  ngAfterViewInit()  {
    this.vs.setRolePermission(localStorage.getItem('role'));
    const isAllowed = this.vs.checkRolePermission(this.actionTitle);
    console.log('in directive checkling for ' + this.actionTitle);
    if (!isAllowed) {
    console.log('in actionButton Directive title is' + this.actionTitle);
    this.hostElement.nativeElement.style.display = 'none';
    this.renderer.removeChild(this.renderer.parentNode(this.hostElement.nativeElement), this.hostElement.nativeElement);
    }

}
}
