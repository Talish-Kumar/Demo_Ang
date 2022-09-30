import { Component } from '@angular/core';
import { IUser } from './Interfaces/IUser';
import { UiService } from './Services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private uiService: UiService) {
    this.uiService
      .returnUserFound()
      .subscribe((userFound: boolean | undefined) => {
        // If the user is found then subscribe to the currentUser subject and set the currentUser variable to the value of the currentUser subject
        if (userFound === true) {
          this.uiService.returnUser().subscribe((user: IUser | undefined) => {
            this.currentUser = user;
            this.loginFlag = false;
            this.registerFlag = false;
          });

          // Else if the userFound is undefined then set the loginFlag to true and the registerFlag to false
        } else if (userFound === undefined) {
          this.currentUser = undefined;
          this.loginFlag = true;
          this.registerFlag = false;

          // Else alert the user that the user they are trying to log in as does not exist
        } else {
          alert('User not found!');
        }
      });
  }

  ngOnInit() {}

  currentUser: IUser | undefined;
  userFound: boolean = false;

  registerFlag: boolean = false;
  loginFlag: boolean = true;

  changeRegisterFlag(flag: boolean): void {
    this.registerFlag = flag;
    this.loginFlag = !flag;
  }

  changeLoginFlag(flag: boolean): void {
    this.loginFlag = flag;
    this.registerFlag = !flag;
  }

  changeLogoutFlag(flag: boolean): void {
    this.loginFlag = flag;
    this.registerFlag = !flag;
  }
}
