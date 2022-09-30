import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/IUser';
import { UiService } from 'src/app/Services/ui.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  @Input() user: IUser = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  }

  onDelete(id: number | undefined) {
    this.uiService.deleteUser(id);
  }

  startEdit(): void {
    this.uiService.startEditing(this.user.id);
  }

}
