import { Component, OnInit } from '@angular/core';
import {VuatConstants} from "../../models/constants/vuat-constants";

@Component({
  selector: 'ngx-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {

  references = VuatConstants.REFERENCES;

  constructor() { }

  ngOnInit(): void {
  }

}
