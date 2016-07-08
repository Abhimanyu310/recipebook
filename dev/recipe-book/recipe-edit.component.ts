import {Component, OnInit} from '@angular/core';
import {ControlGroup} from '@angular/common';
import { RouteSegment, Router, CanDeactivate, RouteTree } from "@angular/router";
import {ControlGroup, Control, ControlArray, Validators, FormBuilder} from "@angular/common";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../shared/recipe";

@Component({
    templateUrl: '/templates/recipes/recipe-edit.tpl.html'
})
export class RecipeEditComponent implements OnInit, CanDeactivate{
    myForm: ControlGroup;
    recipe: Recipe;
    private _editMode = 'create';
    private _recipeIndex: number;
    private _submitted = false;

    constructor(private _routeSegment:RouteSegment, private _recipeService:RecipeService,
                private _formBuilder:FormBuilder, private _router: Router) {
    }

    onAddItem(itemName:string, itemAmount:string) {
        (<ControlArray>this.myForm.controls['ingredients']).push(
            new ControlGroup(
                {
                    name: new Control(itemName, Validators.required),
                    amount: new Control(itemAmount, Validators.compose([
                        Validators.required,
                        hasNumbers,
                        greaterZero
                    ]))
                }
            )
        );
    }

    onRemoveItem(index: number) {
        (<ControlArray>this.myForm.controls['ingredients']).removeAt(index);
    }

    onSubmit() {
        this.recipe = this.myForm.value;
        if (this._editMode === 'edit') {
            this._recipeService.updateRecipe(this._recipeIndex, this.recipe);
        } else {
            this._recipeService.insertRecipe(this.recipe);
        }
        this._submitted = true;
        this.navigateBack();
    }

    onCancel() {
        this.navigateBack();
    }

    private navigateBack() {
        // this.finished.emit(null);
        this._router.navigate(['/recipe', this._recipeIndex]);
    }

    ngOnInit() {
        if (this._routeSegment.getParam('id') !== undefined) {
            this._editMode = 'edit';
            this._recipeIndex = +this._routeSegment.getParam('id');
        }
        let fbRecipeName = '';
        let fbRecipleImageUrl = '';
        let fbRecipeContent = '';
        let fbIngredients:ControlArray = new ControlArray([]);

        if (this._editMode === 'edit') {
            this.recipe = this._recipeService.getRecipe(this._recipeIndex);
            for (let i = 0; i < this.recipe.ingredients.length; i++) {
                fbIngredients.push(
                    new ControlGroup(
                        {
                            name: new Control(this.recipe.ingredients[i].name, Validators.required),
                            amount: new Control(this.recipe.ingredients[i].amount, Validators.compose([
                                Validators.required,
                                hasNumbers,
                                greaterZero
                            ]))
                        }
                    )
                );
                fbRecipeName = this.recipe.name;
                fbRecipleImageUrl = this.recipe.imageUrl;
                fbRecipeContent = this.recipe.content;
            }
        }
        this.myForm = this._formBuilder.group({
            name: [fbRecipeName, Validators.required],
            imageUrl: [fbRecipleImageUrl],
            content: [fbRecipeContent],
            ingredients: this._formBuilder.array(fbIngredients.controls)
        });
    }


    routerCanDeactivate(currTree?:RouteTree, futureTree?:RouteTree):Promise<boolean> {
        if (this._submitted || this.myForm.pristine) {
            return Promise.resolve(true);
        }
        return Promise.resolve(confirm("Sure?"));
    }


}

function hasNumbers(control:Control):{[s: string]: boolean} {
    if (!('' + control.value).match('\\d+')) {
        return {noNumbers: true};
    }
}

function greaterZero(control:Control):{[s: string]: boolean} {
    if (!((+control.value) > 0)) {
        return {tooSmall: true};
    }
}