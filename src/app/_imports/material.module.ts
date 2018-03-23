import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule, MatStepperModule, MatAutocompleteModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
// https://material.angular.io/components/categories
// https://material.angular.io/guide/theming

let matImports = [
  MatButtonModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, 
  MatProgressBarModule, 
  MatRadioModule, 
  MatRippleModule, 
  MatSelectModule, 
  MatSidenavModule, 
  MatSliderModule, 
  MatSlideToggleModule, 
  MatSnackBarModule, 
  MatSortModule, 
  MatTableModule, 
  MatTabsModule, 
  MatTooltipModule, 
  MatStepperModule, 
  MatAutocompleteModule
];

@NgModule({
  imports: [...matImports],
  exports: [...matImports]
})
export class MaterialModule { }
