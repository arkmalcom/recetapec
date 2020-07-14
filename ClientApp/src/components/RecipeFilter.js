import React, { Component } from 'react';
import { toTitleCase } from '../App';
import './SearchStyles.css';

export class RecipeFilter extends Component {

    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
    }
    
    handleFilter = (type, e) => {
        this.props.onHandleFilter(e.target.value, type);
    }

    render () {
        console.log(this.props.diets)
        return (
            <div>
                <h1>Filtrar Recetas</h1>
                <div className="row">
                    <p>Filtrar por ingrediente:</p>
                    <select className="select-filter" onChange={(e) => this.handleFilter('ingredient', e)}>
                        <option>Filtrar</option>
                        {this.props.ingredients.map((ingredient) =>
                        <option key={ingredient.id}>{toTitleCase(ingredient.name)}</option>)}
                    </select>
                </div>
                <div className="row">
                    <p>Filtrar por dieta:</p>
                    <select className="select-filter" onChange={(e) => this.handleFilter('diet', e)}>
                        <option>Filtrar</option>
                        {this.props.diets.map((diet) =>
                            <option key={diet}>{toTitleCase(diet)}</option>
                        )}
                    </select>
                </div>
                <div className="row">
                    <p>Filtrar por tipo de cocina:</p>
                    <select className="select-filter" onChange={(e) => this.handleFilter('cuisine', e)}>
                        <option>Filtrar</option>
                        {this.props.cuisines.map((cuisine) =>
                            <option key={cuisine}>{toTitleCase(cuisine)}</option>
                        )}
                    </select>
                </div>
                <div className="row">
                    <p>Filtrar por tipo de plato:</p>
                    <select className="select-filter" onChange={(e) => this.handleFilter('dishType', e)}>
                        <option>Filtrar</option>
                        {this.props.dishTypes.map((dishType) =>
                            <option key={dishType}>{toTitleCase(dishType)}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }

} 