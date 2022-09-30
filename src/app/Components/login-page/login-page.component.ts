import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/Services/ui.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  @Output() registerFlag = new EventEmitter<boolean>();

  username: string = '';
  password: string = '';

  login(): void {
    if (this.username === '' || this.password === '') {
      alert('Please fill out all fields');
    } else {
      this.uiService.Login(this.username, this.password);
    }
  }

  emitRegister(): void {
    this.registerFlag.emit(true);
  }
}
