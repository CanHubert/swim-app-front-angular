import { NgModule } from '@angular/core';
import {MatSliderModule, MatTableModule} from "@angular/material";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

const MaterialModules = [
  MatSliderModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class MaterialModule { }
