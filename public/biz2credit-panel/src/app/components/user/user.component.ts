import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:any = [];
  text:String = '';
  cordinates = {
    latitude:Number,
    longitude:Number
  }
  constructor(private dataService:DataService, private router:Router) {
    this.dataService.getAllUsers().subscribe(users=>{
     this.users = users;
     this.text = 'all';
    }); 
  }

  ngOnInit() {
  }
  
  getDublin(){
    this.dataService.getUserbyLocation(-6.257664, 53.339428).subscribe(users=>{
      this.users = users;
      this.text = 'from Dublin';
    });
  }

  getAll(){
    this.dataService.getAllUsers().subscribe(users=>{
      this.text = 'all';
      this.users = users;
     }); 
  }
  
  onClickManual(){
    var span = document.getElementById('sec');
    var modal = document.getElementById('manual');
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
  }

  getManual(){
    var modal = document.getElementById('manual');
    modal.style.display = "none";
    this.dataService.getUserbyLocation(this.cordinates.longitude, this.cordinates.latitude).subscribe(users=>{
      this.users = users;
      this.text = 'manual';
    });
  }
}
