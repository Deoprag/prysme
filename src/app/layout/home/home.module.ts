import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HomesRoutingModule } from './home-routing.module';
import {Ripple} from "primeng/ripple";
import {SpinnerComponent} from "../../config/components/spinner/spinner.component";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        HomesRoutingModule,
        Ripple,
        SpinnerComponent,
        DialogModule,
        InputTextModule,
        InputTextareaModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
