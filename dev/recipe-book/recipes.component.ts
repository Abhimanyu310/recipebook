import {Component} from '@angular/core';
import {RecipeService} from "./recipe.service";
import {RecipeListComponent} from "./recipe-list.component";

@Component({
    selector: 'my-recipes',
    template: `
        <div class="master list">
            <my-recipe-list></my-recipe-list>
        </div>
        <div class="detail">
            Recipe Detail
        </div>
    `,
    providers: [RecipeService],
    directives: [RecipeListComponent]
})
export class RecipesComponent{

}