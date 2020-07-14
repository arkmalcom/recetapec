import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import './SearchStyles.css';
import './ModalStyles.css';

export class RecipeItem extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const recipe = this.props;
        return (
            <div className="col-md-4 recipe-card"  onClick={this.toggle}>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="recipe-modal" size="lg">
                    <ModalHeader toggle={this.toggle} className="recipe-modal-header">{recipe.name}</ModalHeader>
                    <ModalBody>
                        <div className="recipe-container">
                            <div className="row">
                                <div className="col-md-12 recipe-summary">
                                    <p>{ReactHtmlParser(recipe.summary)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 recipe-contents">
                                    <div className="col-md-6">
                                        <img src={`https://spoonacular.com/recipeImages/${recipe.id}-480x360.${recipe.imageType}`} 
                                        className="img-responsive" />
                                    </div>
                                    <div className="col-md-4 offset-md-1">
                                        <ul className="list-group recipe-ingredient-list">
                                            <li className="list-group-item disabled recipe-ingredients">
                                                <p>Ingredientes</p>
                                            </li>
                                        {recipe.ingredients.map(ingredient => {
                                            return ( 
                                            <li className="list-group-item recipe-ingredients">{ingredient.measures.us.amount + ' ' +
                                                 ingredient.measures.us.unitShort + ' ' + ingredient.name}</li>
                                            );
                                        })}
                                        </ul>
                                    </div>                                  
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 recipe-instructions">
                                    <h1>Pasos</h1>{recipe.instructions.map(instruction => {
                                        return instruction.steps.map(step => {
                                            return (
                                                <p className="instruction-step">{step.number + '. ' +
                                                step.step}</p>
                                            );
                                        })
                                    })}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
                <div className="row">
                    <div className="col-md-12 recipe-card-title">
                        <h1>{recipe.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 recipe-card-image">
                        <img src={`https://spoonacular.com/recipeImages/${recipe.id}-240x150.${recipe.imageType}`} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 recipe-card-main-contents">
                        <div className="col-md-6 recipe-card-subcontents">
                            <p><FontAwesomeIcon icon={faClock} />{' ' + recipe.readyIn} minutos</p>
                        </div>
                        <div className="col-md-6 recipe-card-subcontents">
                            <p><FontAwesomeIcon icon={faUtensilSpoon} />{' ' + recipe.servings} porciones</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}