import { RouterOutlet } from '@angular/router';
import {Component} from "@angular/core";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CheckboxModule, ButtonDirective, Ripple, InputTextModule, NgOptimizedImage],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
})
export class AppComponent {
  title = 'prysme';
}
