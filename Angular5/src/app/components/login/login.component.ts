import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Users  } from "../../models/users.model";
import { UsersService } from "../../services/users.sevice";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  public user: Users;
  public token;
  public identity;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService
  ) { 
    this.user = new Users("","","","","","ROLE_USUARIO","");
  }



  ngOnInit() {
  }

  onSubmit(){
    this._userService.login(this.user).subscribe(
      response=>{
        this.identity = response.user;
        console.log(this.identity);
        if(!this.identity){
          this.status = 'error';
        }else{
          //PERSISTIR LOS DATOS DEL USUARIO
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this.getToken();
          this._router.navigate(['/home']);
        }

      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  getToken(){
    this._userService.login(this.user, 'true').subscribe(
      response=>{
        this.token = response.token;
        console.log(this.token);
        if(this.token <= 0){
          this.status = 'error';
        }else{
          //PERSISTIR DATOS DEL USUARIO
          localStorage.setItem('token', this.token);

        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }
}
