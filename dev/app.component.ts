import {Component} from '@angular/core';
import {RecipesComponent} from "./recipe-book/recipes.component";
import { Routes, ROUTER_DIRECTIVES } from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

@Component({
    selector: 'my-app',
    template: `
        <header>
            <nav>
                <ul>
                    <li><a [routerLink]="['recipe']">Recipes</a></li>
                    <li><a [routerLink]="['shopping-list']">Shopping List</a></li>
                </ul>
            </nav>
        </header>
        <div class="main">
            <router-outlet></router-outlet>
        </div>
       
    `,
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/recipe', component: RecipesComponent},
    {path: '/shopping-list', component: ShoppingListComponent}
])
export class AppComponent {

}