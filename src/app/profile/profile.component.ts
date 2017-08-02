import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../services/user/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user: object;
  public edit: boolean = false;
  public editedUser: object;
  public userPic: string;
  public dataReady: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    let user = this.authService.getUser();
    this.userPic = user.picture;
    this.userService.getUserInfo(user.sub).subscribe(user => {
      this.dataReady = true;
      this.user = user;
    });
  }

  editProfile(event) {
    this.edit = !this.edit;
    this.editedUser = Object.assign({}, this.user);
  }

  saveUserProfile(event) {
    this.userService.updateUser(this.editedUser).subscribe(res => {
      console.log(res);
      this.user = res;
    });
    this.edit = !this.edit;
  }
}
