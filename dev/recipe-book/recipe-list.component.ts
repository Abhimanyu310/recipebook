import {Component, OnInit} from '@angular/core';
import {Recipe} from "../shared/recipe";
import {RecipeService} from "./recipe.service";


@Component({
    selector: 'my-recipe-list',
    template: `
        <button class="btn" (click)="onAddRecipe()">Add Recipe</button>
        <ul>
            <li *ngFor="let item of recipes">
                <div class="image">
                    <img [src]="item.imageUrl" alt="Recipe">
                    <div class="text">{{item.name}}</div>
                </div>
                
            </li>
        </ul>
    
    `

})
export class RecipeListComponent implements OnInit{
    recipes: Recipe[];

    constructor(private _recipeService : RecipeService) {}

    ngOnInit(){
        this.recipes = this._recipeService.getAllRecipes();
    }

}