import { Component, OnInit } from '@angular/core';

interface User {
  id: number,
  name: string,
}
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  dialogTitle: string = '邀请成员';
  items = [
    {
      id: 0,
      name: 'zhangsan'
    },
    {
      id: 1,
      name: 'lisi'
    },
    {
      id: 2,
      name: 'wangwu'
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  displayUser(user: User): string {
    return user ? user.name : '';
  }

}
