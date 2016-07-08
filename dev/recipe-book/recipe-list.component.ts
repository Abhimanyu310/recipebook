import {Component, OnInit} from '@angular/core';
import {Recipe} from "../shared/recipe";
import {RecipeService} from "./recipe.service";
import {Router} from '@angular/router';


@Component({
    selector: 'my-recipe-list',
    template: `
        <button class="btn" (click)="onAddRecipe()">Add Recipe</button>
        <ul>
            <li *ngFor="let item of recipes" (click)="onSelect(item)">
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

    constructor(private _recipeService : RecipeService, private _router: Router) {}

    ngOnInit(){
        this.recipes = this._recipeService.getAllRecipes();
    }

    onSelect(item: Recipe){
        this._router.navigate(['/recipe', Number(this._recipeService.getRecipeIndex(item))]);
    }

}