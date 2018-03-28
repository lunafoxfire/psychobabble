import { Component, OnInit } from '@angular/core';
import { ClientService } from './../../client.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'requests',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.scss']
})

export class MakeRequestComponent implements OnInit {
  public softSkills: Array<any>;
  public toggle: boolean = false;
  public weekFromNow: string;
  public myControl: FormControl = new FormControl();
  public filteredOptions: string[];
  public chips = [];
  public visible: boolean = true;
  public selectable: boolean = false;
  public removable: boolean = true;
  public addOnBlur: boolean = true;
  constructor(
    public service: ClientService,
    public router: Router
  ) {
    const date = new Date();
    const month = this.padMonth(date);
    this.weekFromNow = (`${date.getFullYear()}-${month}-${date.getDate() + 7}`);
  }

  ngOnInit() {
    this.service.getSkills().subscribe(data => {
      this.softSkills = data.skillArray;
      this.myControl.valueChanges
      .subscribe(changes =>
        this.filter(changes)
      );
    });
  }

  private filter(val) {
    this.filteredOptions = this.softSkills
      .filter(obj => obj.name.toLowerCase().indexOf(val.toString().toLowerCase()) === 0);
    }

  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    // Define selection constant
    const selection = event.option.value;
    // Add chip for selected option
    this.chips.push(selection);
    // Remove selected option from available options and set filteredOptions
    this.softSkills = this.softSkills.filter(obj => obj.name !== selection.name);
    this.filteredOptions = this.softSkills;
    // Reset the autocomplete input text value
    if (input) {
    input.value = '';
    }
  }

  removeChip(chip: any): void {
    // Find key of object in array
    const index = this.chips.indexOf(chip);
    // If key exists
    if (index >= 0) {
      // Remove key from chips array
      this.chips.splice(index, 1);
      // Add key to options array
      this.softSkills.push(chip);
    }
  }

  private padMonth(date) {
    const current = (date.getMonth() + 1).toString();
    if (current.length < 2) {
      const newMonth = "0" + current;
      return newMonth;
    } else {
      return current;
    }
  }

  public switchToggle() {
    this.toggle = !this.toggle;
  }

  public submitRequest(jobTitle, expiration, details) {
    const request = {
      softSkills: this.chips,
      details: details.value,
      expiration: expiration.value,
      jobTitle: jobTitle.value,
    };
    console.log(request);
    this.service.makeRequest(request).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/');
    });
  }
}
