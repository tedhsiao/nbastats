import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public games: object = [];
  public selectedSeason: string;
  public seasons: Array<string> = [];
  public date: DateModel;
  public options: DatePickerOptions;

  constructor(private gameService: GameService) {
    for (let i = 2017; i > 2000; i--) {
      this.seasons.push(`${i}-playoff`);
      this.seasons.push(`${i - 1}-${i}-regular`);
    }
    this.selectedSeason = this.seasons[0];
    this.options = new DatePickerOptions();
  }

  ngOnInit() {}

  searchSchedule(event: any) {
    let date: string;
    date = this.date.formatted.split('-').join('');
    this.gameService.getSchedules(this.selectedSeason, date).subscribe(res => {
      if (!res) {
        this.games = null;
        return;
      }
      this.games = res.scoreboard.gameScore;
    });
  }
}
