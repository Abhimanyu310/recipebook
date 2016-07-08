import {Component, OnInit} from "@angular/core";
import {Recipe} from "../shared/recipe";
import { RouteSegment, Router, OnActivate } from "@angular/router";
import {RecipeService} from "./recipe.service";
import {RecipeEditComponent} from "./recipe-edit.component";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    templateUrl: 'templates/recipes/recipe-detail.tpl.html',
    providers: [ShoppingListService],
    directives: [RecipeEditComponent]
})
export class RecipeDetailComponent implements OnInit, OnActivate{
    recipe: Recipe;
    private _recipeIndex: string;
    constructor(private _routeSegment: RouteSegment, private _recipeService: RecipeService, private _router: Router){}

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment):void {
        let itemIndex = curr.getParam('id');
        this._recipeIndex = itemIndex;
    }

    ngOnInit() {
        this.recipe = this._recipeService.getRecipe(this._recipeIndex !== null ? +this._recipeIndex : null) || null;
    }

    onEdit(){
        this._router.navigate(['/recipe/edit', this._recipeIndex]);
    }
}