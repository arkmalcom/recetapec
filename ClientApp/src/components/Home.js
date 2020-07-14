import React, { Component } from 'react';
import { SearchBar } from './SearchBar';
import { RecipeList } from './RecipeList';
import { RecipeFilter } from './RecipeFilter';
import { ApiInfo } from './APIConstants';
import './SearchStyles.css';


export class Home extends Component {
  static displayName = Home.name;

  /* En React, el constructor de clase se utiliza para definir los metodos, estados o 
  propiedades de un componente */
  constructor(props) {
    super(props);
    this.handleInput.bind(this);
    this.handleFilter.bind(this);
    this.handleLoading.bind(this);
    this.state = { recipes: [], ingredients: [], diets: [], cuisines: [], 
    dishTypes: [], input: '', filter: 'filtrar', filterType: '', 
    isLoading: true}
  }

  //Todas estas funciones se pasan a un hijo como propiedades
  /*Recibe un valor boolean de sus hijos, indicando si se debe desplegar
  'Cargando...' mientras se buscan los resultados de una llamada al API */
  handleLoading = (isLoading) => {
    this.setState( {isLoading: isLoading})
  }

  /*Esta funcion recibira los filtros del hijo 'RecipeFilter'
  indicando como debemos filtrar las recetas */
  handleFilter = (filter, type) => {
    this.setState( { filter : filter });
    this.setState( {filterType: type })
    switch(type) {
      case 'ingredient':
        this.filterByIngredient(filter);
        break;
      case 'diet':
        this.filterByDiet(filter);
        break;
      case 'cuisine':
        this.filterByCuisine(filter)
        break;
      case 'dishType':
        this.filterByDishType(filter)
        break;
    }    
  }

  /*Esta funcion recibira una propiedad del hijo 'SearchBar'
  la cual nos dira que debemos buscar en el API */
  handleInput = (input) => {
    this.setState({input: input, isLoading: true});
    this.fetchAPIData(input);
  }


  /*Esta funcion es responsable por recibir los filtros de su hijo
  y procesar los resultados recibidos del API para que solo se muestren
  recetas con ciertos ingredientes */
  filterByIngredient = (filter) => {
    filter = filter.toLowerCase();
    console.log(filter);
    var filteredRecipes = []
    if (filter != 'filtrar') {
      this.state.recipes.filter(recipe => {
        recipe.extendedIngredients.map(ingredient => {
          if(ingredient.name == filter) { 
            filteredRecipes = filteredRecipes.concat(recipe);
            filteredRecipes = filteredRecipes.filter((item, idx, self) => {
              return self.map(details => 
                details.id).indexOf(item.id) === idx;
            })   
          };
        });
      })
      this.setState({recipes: filteredRecipes})
      this.getIngredients(filteredRecipes);
      this.getDiets(filteredRecipes);
      this.getCuisines(filteredRecipes);
      this.getDishTypes(filteredRecipes);
    }
    else {
      this.handleInput(this.state.input);
    }
  }

  filterByDiet = (filter) => {
    filter = filter.toLowerCase();
    console.log(filter);
    var filteredRecipes = []
    if (filter != 'filtrar') {
      this.state.recipes.filter(recipe => {
        recipe.diets.map(diet => {
          if(diet == filter) { 
            filteredRecipes = filteredRecipes.concat(recipe);
            filteredRecipes = filteredRecipes.filter((item, idx, self) => {
              return self.map(details => 
                details.id).indexOf(item.id) === idx;
            })   
          };
        });
      })
      this.setState({recipes: filteredRecipes})
      this.getIngredients(filteredRecipes);
      this.getDiets(filteredRecipes);
      this.getCuisines(filteredRecipes);
      this.getDishTypes(filteredRecipes);
    }
    else {
      this.handleInput(this.state.input);
    }
  }

  filterByCuisine = (filter) => {
    console.log(filter);
    var filteredRecipes = []
    if (filter != 'filtrar') {
      this.state.recipes.filter(recipe => {
        recipe.cuisines.map(cuisine => {
          if(cuisine == filter) { 
            filteredRecipes = filteredRecipes.concat(recipe);
            filteredRecipes = filteredRecipes.filter((item, idx, self) => {
              return self.map(details => 
                details.id).indexOf(item.id) === idx;
            })   
          };
        });
      })
      this.setState({recipes: filteredRecipes})
      this.getIngredients(filteredRecipes);
      this.getDiets(filteredRecipes);
      this.getCuisines(filteredRecipes);
      this.getDishTypes(filteredRecipes);
    }
    else {
      this.handleInput(this.state.input);
    }
  }

  filterByDishType = (filter) => {
    filter = filter.toLowerCase();
    console.log(filter);
    var filteredRecipes = []
    if (filter != 'filtrar') {
      this.state.recipes.filter(recipe => {
        recipe.dishTypes.map(dishType => {
          if(dishType == filter) { 
            filteredRecipes = filteredRecipes.concat(recipe);
            filteredRecipes = filteredRecipes.filter((item, idx, self) => {
              return self.map(details => 
                details.id).indexOf(item.id) === idx;
            })   
          };
        });
      })
      this.setState({recipes: filteredRecipes})
      this.getIngredients(filteredRecipes);
      this.getDiets(filteredRecipes);
      this.getCuisines(filteredRecipes);
      this.getDishTypes(filteredRecipes);
    }
    else {
      this.handleInput(this.state.input);
    }
  }

  //Esta llamada al API nos da una lista de recetas como resultado
  fetchAPIData(input) {
    if(input == '') {
      input = 'hamburger';
    }
    fetch(ApiInfo.ApiSearchEndpoint + input + '&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true&' + ApiInfo.ApiKey)
    //fetch('https://localhost:5001/testData.json')
    .then((res) => res.json())
    .then((data) => {
        this.setState( { recipes: data.results, isLoading: false });
        this.getIngredients(this.state.recipes);
        this.getDiets(this.state.recipes);
        this.getCuisines(this.state.recipes);
        this.getDishTypes(this.state.recipes);
    })
  }

  /*Esta funcion mantiene una lista de los ingredientes presentes en los resultados
  para poder filtrarlos */
  getIngredients = (recipes) => {
    var ingredients = [];
    recipes.forEach((recipe) => {
      ingredients = ingredients.concat(recipe.extendedIngredients)
      ingredients = ingredients.filter((ing, idx, self) => {
        return self.map(ingredient =>
          ingredient.id).indexOf(ing.id) === idx;
      })
    })
    this.setState({ingredients: ingredients});
  }

  getDiets = (recipes) => {
    var diets = [];
    recipes.forEach((recipe) => {
      diets = diets.concat(recipe.diets)
      diets = diets.filter((item, idx, self) => {
        return self.map(diet =>
          diet).indexOf(item) === idx;
      })
    })
    this.setState({diets: diets})
  }

  getCuisines = (recipes) => {
    var cuisines = [];
    recipes.forEach((recipe) => {
      cuisines = cuisines.concat(recipe.cuisines)
      cuisines = cuisines.filter((item, idx, self) => {
        return self.map(cuisine =>
          cuisine).indexOf(item) === idx;
      })
    })
    this.setState({cuisines: cuisines})
  }

  getDishTypes = (recipes) => {
    var dishTypes = [];
    recipes.forEach((recipe) => {
      dishTypes = dishTypes.concat(recipe.dishTypes)
      dishTypes = dishTypes.filter((item, idx, self) => {
        return self.map(dishType =>
          dishType).indexOf(item) === idx;
      })
    })
    this.setState({dishTypes: dishTypes})
  }


  
  /*Una funcion de React que se ejecuta cuando el componente 
  se crea en el DOM por primera vez */
  componentDidMount() {
    this.fetchAPIData(this.state.input);
  }


  /*La funcion de React que despliega el componente en si, 
  usa una combinacion de JSX y HTML */ 
  render () {
    const isLoading = this.state.isLoading;
    return (
      <div>
        <div className="row">
          <div className="col-md-12 search-bar">
            <SearchBar onHandleInput={this.handleInput} onHandleLoading={this.handleLoading} />
          </div>
        </div>
        {isLoading
        ? <img src="https://localhost:5001/cargando_grafico.png" width="350" height="350" className="animated bounceInDown mx-auto d-block"/>
        : <div className="row">
          <div className="col-md-2 recipe-filter">
            <RecipeFilter onHandleFilter={this.handleFilter} ingredients={this.state.ingredients} diets={this.state.diets}
            cuisines={this.state.cuisines} dishTypes={this.state.dishTypes} />
          </div>
          <div className="col-md-10 recipe-list">
            <RecipeList recipes={this.state.recipes} />
          </div> 
          </div>   }     
      </div>
    );
  }
}
