import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { UiService } from 'src/app/Services/ui.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private uiService: UiService) {
  }

  ngOnInit(): void {
    this.userBeingEdited.id = this.user.id;
    this.userBeingEdited.firstName = this.user.firstName;
    this.userBeingEdited.lastName = this.user.lastName;
    this.userBeingEdited.username = this.user.username;
    this.userBeingEdited.password = this.user.password;
  }

  @Input() user: IUser = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  }

  userBeingEdited: IUser = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  }

  // Cancel the edit
  onCancel(): void {
    this.uiService.cancelEdit();
  }

  // Apply the edit
  applyEdit(): void {
    this.uiService.applyEdit(this.userBeingEdited);
  }

}
