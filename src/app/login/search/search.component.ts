import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from '../user.model';
import { MatFormFieldControl } from '@angular/material/form-field';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  
  searchTable!: string;
  searchArray!:Result[]; 
  @Input() searchDetails!: Result[];
  @Output() searchResults = new EventEmitter<Result[]>();
  
  constructor(){} 

  ngOnInit(): void {
    
  }

  searchEvent(newValue: string): void {

    this.searchTable = newValue;

    this.searchArray=this.searchDetails.filter((data) => {
      if(this.searchTable === "" || null){
        return this.searchTable;
      }
     return ((data.gender.toLowerCase().includes(newValue)) || (data.email.toLowerCase().includes(newValue)) || (data.name.first.toLowerCase().includes(newValue)) || (data.name.last.toLowerCase().includes(newValue)) || (data.login.username.toLowerCase().includes(newValue)))
    })

    this.searchResults.emit(this.searchArray);
  }
}
