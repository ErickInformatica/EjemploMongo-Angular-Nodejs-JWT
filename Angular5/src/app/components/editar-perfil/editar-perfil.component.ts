import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Users } from "../../models/users.model";
import { UsersService } from "../../services/users.sevice";
import { UploadService } from "../../services/upload.service";
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
  providers: [UsersService, UploadService]
})
export class EditarPerfilComponent implements OnInit {

  public user: Users;
  public identity;
  public token;
  public status: string;
  public url: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsersService,
    private _uploadService: UploadService
  ) { 
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url =GLOBAL.url;
  }



  ngOnInit() {
    console.log(this.user);

  }


  onSubmit(){
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response=>{
        if(!response.user){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));

          this.identity = this.user;

          //Subida de imagen
          this._uploadService.makeFileRequest(this.url+'update-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any)=>{
              console.log(result);
              this.user.image = result.user.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
            })
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          this.status = 'error';
        }
      }
    )
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
