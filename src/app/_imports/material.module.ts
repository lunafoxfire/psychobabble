import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// https://material.angular.io/components/categories
// https://material.angular.io/guide/theming

let matImports = [
  MatButtonModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
];

@NgModule({
  imports: [...matImports],
  exports: [...matImports]
})
export class MaterialModule { }
