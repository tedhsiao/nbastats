import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../services/user/user.service";
import { PlayerService } from "../services/player/player.service";
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from "angularfire2/database";

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
  public playerDataReady: boolean = false;
  public favPlayers: Array<any> = [];
  public players: Array<any>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private db: AngularFireDatabase,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    let user = this.authService.getUser();
    this.userPic = user.picture;
    this.userService.getUserInfo(user.sub).subscribe(user => {
      this.dataReady = true;
      this.user = user;
    });
    let db: any = this.db.object(`/users/${user.sub}/favplayers`);
    db.subscribe(players => {
      for (let id in players) {
        this.favPlayers.push(
          `${players[id].FirstName} ${players[id].LastName}`
        );
      }
      this.playerService
        .getStats("2016-playoff", this.favPlayers.join(","))
        .subscribe(res => {
          this.playerDataReady = true;
          this.players = res.cumulativeplayerstats.playerstatsentry;
        });
    });
  }

  editProfile(event) {
    this.edit = !this.edit;
    this.editedUser = Object.assign({}, this.user);
  }

  saveUserProfile(event) {
    this.userService.updateUser(this.editedUser).subscribe(res => {
      this.user = res;
    });
    this.edit = !this.edit;
  }
}
