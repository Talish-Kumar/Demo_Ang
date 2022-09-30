import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { UiService } from 'src/app/Services/ui.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private uiService: UiService) {
    this.uiService.getAllUsers().subscribe((users: IUser[]) => {
      this.users = users;
    });
   }

  ngOnInit(): void {
  }
  
  @Output() logoutFlag = new EventEmitter<boolean>();

  @Input() currentUser: IUser = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  };

  users: IUser[] = [];

  logout(): void {
    this.uiService.Logout()
    this.logoutFlag.emit(true);
  }
}
