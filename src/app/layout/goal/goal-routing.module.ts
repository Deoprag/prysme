import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GoalComponent} from "./goal.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'goals', component: GoalComponent},
    ])],
    exports: [RouterModule]
})
export class GoalsRoutingModule {
}
