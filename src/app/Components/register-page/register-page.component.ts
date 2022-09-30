import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { UiService } from 'src/app/Services/ui.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  @Output() registerFlag = new EventEmitter<boolean>();

  user: IUser = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  };

  register(): void {
    if (
      this.user.firstName === '' ||
      this.user.lastName === '' ||
      this.user.username === '' ||
      this.user.password === ''
    ) {
      alert('Please fill out all fields');
    } else {
      this.uiService.Register(this.user);
    }
  }

  changeRegisterFlag(): void {
    this.registerFlag.emit(false);
  }
}
