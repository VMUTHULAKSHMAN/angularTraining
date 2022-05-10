import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import { UserService } from './user.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs';
import { Result, UserData } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  displayedColumns: string[] = ['gender', 'first name','last name' ,'username', 'email'];
  loginForm!: FormGroup;
  pageChange!: FormGroup;
  submitted = false;
  ConfirmPassword = 'ConfirmPassword';
  userdetails!: UserData;
  result!: Result[];
  nextPage!: number;
  alteredPage!: number;
  searchdetails!: Result[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchResultArray!: Result[];
  dataSource!: MatTableDataSource<Result>;

  constructor( private fb: FormBuilder, private userService: UserService ) {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
      if(this.searchResultArray != null && this.searchResultArray.length > 0 ){
        
        this.dataSource = new MatTableDataSource<Result>(this.searchResultArray);
        this.dataSource.paginator = this.paginator;
        this.searchdetails = this.searchResultArray
        console.log("next page called in if",this.searchResultArray)
      }
  
      else if (this.searchResultArray == null || [] || ''){
      
        this.userService.getUserDetails(this.nextPage).pipe(map((data: UserData) => data.results)).subscribe((users) => {
        this.result=users;
        this.dataSource = new MatTableDataSource<Result>(this.result);
        this.dataSource.paginator = this.paginator;
        this.searchdetails = this.result;
        console.log("next page called in else if",this.searchResultArray)
      })
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', { validators: [Validators.required, Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{3,}"), Validators.email] }),
      password: new FormControl('', { validators: [Validators.minLength(8), Validators.required] }),
      confirmpassword: new FormControl('',[Validators.required])
    },{
      validator: ConfirmedValidator('password', 'confirmpassword')
    });

    this.pageChange = this.fb.group({
      pageNumber: new FormControl('',[ Validators.pattern("^[0-9]*$")])
    });
    
  }
  
  submit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm);
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.loginForm.get('confirmpassword') as FormControl;
  }

  get changePageControl(): FormControl{
    return this.pageChange.get('pageNumber') as FormControl;
  }

  newPage(alteredPage: string): void{
    this.nextPage = parseInt(alteredPage);
    console.log(this.nextPage,'?????')
    this.fetchUserDetails();
  }

  searchEvent(data: Result[]): void{
    this.searchResultArray = data;
    console.log('data in search event ',data)
    this.fetchUserDetails();
  }
}

