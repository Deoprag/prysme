import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {ForgotPasswordComponent} from "./forgotpassword.component";
import {ForgotPasswordRoutingModule} from "./forgotpassword-routing.module";

@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        ButtonModule,
        ForgotPasswordComponent
    ],
    declarations: []
})
export class ForgotPasswordModule { }
