import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  flag:Boolean = false;
  userfile={
    flag:''
  }
  constructor(private dataService:DataService, private router:Router) {}

  ngOnInit() {}

  submit(form: NgForm){
    var file_info = $('#userfile')[0].files[0];
    if(file_info != undefined){
      $('#alert').empty();
      $('#alert').attr('hidden',true);
      if(file_info.type == "text/plain"){
        $('#alert').empty();
        $('#alert').attr('hidden',true);
        var reader = new FileReader();
        var me = this;
        reader.readAsText($('#userfile')[0].files[0]);
        reader.onload = function () {
          var fileData = (<string>reader.result).split("\r\n");
          me.dataService.addUserDataByTextDile(fileData).subscribe(response=>{
            form.reset();
            var modal = document.getElementById('popmessage');
            modal.style.display = "block";
            $('#message').text(response.message);
          },error=>{
                      if(error.error.message!=undefined){
                        $('#alert').attr('hidden',false);
                        $('#alert').append(error.error.message);
                      }
                      if(error.error.message == undefined){
                        $('#alert').attr('hidden',false);
                        $('#alert').append(error.error.error.name+', '+error.error.error.message);
                      }
          });
        }
      }
      else{
        $('#alert').attr('hidden',false);
        $('#alert').append("<span>Please Select a text file</span>");
      }
    }
    else{
      $('#alert').attr('hidden',false);
      $('#alert').append("<span>Please Select a file</span>");
    }
    
  }
  updatelist(){
    var modal1 = document.getElementById('popmessage');
    modal1.style.display = "none";
  }
}
