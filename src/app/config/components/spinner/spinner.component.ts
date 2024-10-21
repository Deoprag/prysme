import {Component, Input} from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'spinner',
  standalone: true,
    imports: [
        ProgressSpinnerModule,
        NgIf
    ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    @Input() show: boolean = false;
}
