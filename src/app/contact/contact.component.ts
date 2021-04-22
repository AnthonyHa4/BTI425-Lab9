import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public warning:string;
  constructor() { }

  contact: {
    name: String,
    email: String,
    msg: String
  };

  ngOnInit(): void {
    this.contact = {
      name: "",
      email: "",
      msg: ""
    };
  }

  // Check for empty fields
  validate(Form: NgForm) {
    if (!Form.value.name || !Form.value.email || !Form.value.msg) {
      this.warning = "A Field is empty";
      return false;
    }
    else
      return true;
  }

  onSubmit(firstForm: NgForm) {
    if (this.validate(firstForm)) {
      this.contact = {
        name: firstForm.value.name,
        email: firstForm.value.email,
        msg: firstForm.value.msg,
      }
    };
  }

}
