import React, { Component } from 'react';
import './SearchStyles.css';

export class SearchBar extends Component {
    static displayName = SearchBar.name;

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.state = { inputValue: '' }
    }

    //Aqui se devuelve la propiedad que se envio a traves de la funcion callback del padre
    handleInput = (input) => {
        this.props.onHandleInput(input);
    }

    //Aqui se devuelve la propiedad que se envio a traves de la funcion callback del padre
    handleLoading = (input) => {
        this.props.onHandleLoading(input);
    }

    /*Funcion de React que se ejecuta cuando el componente se actualiza
    en este caso, chequea si el estado previa es igual al estado actual
    y si no lo es, ejecuta la funcion para verificar si el usuario todavia
    esta tipeando */
    componentDidUpdate(prevProps, prevState) {
        if(prevState.inputValue != this.state.inputValue) {
            this.checkIfTyping();
        }
    }

    /*Esta funcion chequea el valor de un evento y lo agrega como estado, 
    envia el valor de "cargando" a verdadero al padre */
    onChange = (e) => {
        this.setState({inputValue: e.target.value})
        this.handleLoading(true);
    }

    /*Mantiene un intervalo de 750ms que se resetea cada vez que el usuario entra una tecla,
    despues que no haga nada por 750ms, se envia el valor. El objetivo de esta funcion es 
    prevenir que cada tecla envie una llamada al API
    */
    checkIfTyping = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.handleInput(this.state.inputValue);         
        }, 750)
    } 

    render() {
        return (
            <div className="row">
                <div className="col-md-12 search-input">
                    <div className="col-md-2 search-logo">
                        <img src='https://localhost:5001/logo_transparent.png' 
                        className="img-responsive" width="200" height="200"/>                        
                    </div>
                    <div className="col-md-9 offset-md-1 search-bar">
                        <input type="text" className="form-control" placeholder="Buscar recetas..."
                        value={this.state.inputValue} onChange={this.onChange} />
                    </div>
                </div>
            </div>

        )
    }

}