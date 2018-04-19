import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Users  } from "../../models/users.model";
import { UsersService } from "../../services/users.sevice";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [UsersService]
})
export class RegistrarComponent implements OnInit {
  public user: Users;
  public token;
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
    this._userService.registrar(this.user).subscribe(
      response=>{
        if(response){
          console.log(response.user);
          this.status = 'success';
        }
      },
      error=>{
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }
}
