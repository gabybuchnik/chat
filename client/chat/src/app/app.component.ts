import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('user') user: ElementRef;
  @ViewChild('msg') msg: ElementRef;
  private socket: any;
  messages: Array<object>;
  constructor() {
    this.messages = [];
  }
  sendMessage(e: Event) {
    e.preventDefault();
    let _msg = this.msg.nativeElement.value;
    let _user = this.user.nativeElement.innerText;
    this.socket.emit('postMsg', { user: _user, msg: _msg });
    this.getMessage();
  }
  ngOnInit() {
    this.socket = io('http://localhost:5000');
  }
  ngAfterViewInit() {
    this.getMessage();
  }
  getMessage() {
    this.socket.on('chatMsg', chatMsg => {
      this.messages = chatMsg;
    });
  }
}
