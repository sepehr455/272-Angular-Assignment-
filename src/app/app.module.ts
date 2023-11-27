import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppComponent} from "./main/app.component";
import {MapComponent} from "./map/map.component";
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
      AppComponent,
      MapComponent
    ],
    imports: [
      CommonModule,
      RouterModule
    ],
})
export class AppModule {
}
