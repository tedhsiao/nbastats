import { Component } from "@angular/core";
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from "angularfire2/database";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  items: FirebaseObjectObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.items = db.object("/users");
    this.items.subscribe(t => {
      console.log(t);
    });
  }
}
