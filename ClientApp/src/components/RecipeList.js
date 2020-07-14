import React, { Component } from 'react';
import { RecipeItem } from './RecipeItem';
import './SearchStyles.css';

export class RecipeList extends Component {

    render() {
      return (
        <div className="row">
        {this.props.recipes.map((recipe) => (          
            <RecipeItem key={recipe.id} id={recipe.id} name={recipe.title} summary={recipe.summary} ingredients={recipe.extendedIngredients}
            readyIn={recipe.readyInMinutes} servings={recipe.servings} imageType={recipe.imageType} instructions={recipe.analyzedInstructions}
            />
        ))}
        </div>
      )
    }
}