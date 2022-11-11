import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';

import { NgLetModule } from 'ng-let';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material.module';
import { NavComponent } from './nav/nav.component';
import { BCRegisterComponent } from './pages/bc-register/bc-register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BCAllComponent } from './pages/bc-all/bc-all.component';
import { BcAllService } from './pages/bc-all/bc-all.service';

@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    BCRegisterComponent,
    BCAllComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgLetModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [BcAllService]
})
export class MainModule { }
