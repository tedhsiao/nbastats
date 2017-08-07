import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player/player.service';
import { AuthService } from '../services/auth/auth.service';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  public playerName: string;
  public player: any;
  public stats: object;
  public team: object;
  public noPlayerFoundFlag: boolean = false;
  public seasons: Array<string> = [];
  public selectedSeason: string;
  public addToListButton: boolean = true;
  private user;
  items: FirebaseObjectObservable<any>;

  constructor(
    private playerService: PlayerService,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private router: Router
  ) {
    for (let i = 2017; i > 2000; i--) {
      this.seasons.push(`${i - 1}-${i}-regular`);
      this.seasons.push(`${i}-playoff`);
    }
    this.selectedSeason = this.seasons[0];
    this.user = authService.getUser();
  }
  ngOnInit() {}

  addToFavorite(event) {
    this.items = this.db.object(
      `/users/${this.user.sub}/favplayers/${this.player.ID}`
    );
    this.items.set(this.player);
  }

  searchPlayer(event: any) {
    this.addToListButton = true;
    this.playerService.getStats(this.selectedSeason, this.playerName).subscribe(
      stats => {
        if (!stats.cumulativeplayerstats.playerstatsentry) {
          this.player = null;
          this.noPlayerFoundFlag = true;
          return;
        }
        this.noPlayerFoundFlag = false;
        this.stats = stats.cumulativeplayerstats.playerstatsentry;
        this.player = stats.cumulativeplayerstats.playerstatsentry[0].player;
        this.team = stats.cumulativeplayerstats.playerstatsentry[0].team;
        this.items = this.db.object(`/users/${this.user.sub}/favplayers`);
        this.items.subscribe(t => {
          if (t[this.player.ID]) {
            this.addToListButton = false;
          }
        });
      },
      err => {
        this.router.navigate(['/player']);
      }
    );
  }
}
