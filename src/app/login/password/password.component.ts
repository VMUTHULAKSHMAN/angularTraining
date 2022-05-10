import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnChanges {

  @Input() passwordControl!: FormControl;
  @Input() disableControl: boolean = false;
  @Input() passwordlabel!: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.passwordControl.addValidators(Validators.maxLength(20));
  }

}
