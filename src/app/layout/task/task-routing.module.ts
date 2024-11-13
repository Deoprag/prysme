import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TaskComponent} from "./task.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'tasks', component: TaskComponent},
    ])],
    exports: [RouterModule]
})
export class TasksRoutingModule {
}
