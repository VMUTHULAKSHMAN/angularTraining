import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})

export class PlaygroundComponent implements OnInit {
  
  @Input() num!: number;
  @Output() newIncreaseEvent = new EventEmitter<number>();
  myForm!: FormGroup;
  testing!: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['Sammy', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  increaseNumber(){
    this.newIncreaseEvent.emit();
  }  

  onSubmit() {
    const form = this.myForm
    console.log('Valid?', form.valid); // true or false
    console.log('form',this.myForm.value)
  }

  oncheck(){
    this.testing=true;
  }

  makeFalse(){
    this.testing=false;
  }
  
}
