import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Recipetile from "./recipetile/Recipetile";

function App() {
  const YOUR_APP_ID = "7184cf21";
  const YOUR_APP_KEY = "a9337d6a73353c7c9921eb69850b411c";
  const [query, setQuery] = useState("");
  const [healthLabel, setHealthLabel] = useState("vegetarian");
  const [recipes, setRecipes] = useState([]);

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault(); //this will prevent page from reloading.
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>
        <u>Yemek liste</u>🥗
      </h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Malzemeyi yazın "
          autoComplete="Off"
          className="app__input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <select className="app__healthLabels">
          <option
            value="vegan"
            onClick={() => {
              setHealthLabel("vegan");
            }}
          >
            vegan
          </option>
          <option
            value="vegetarian"
            onClick={() => {
              setHealthLabel("vegetarian");
            }}
          >
            vejeteryan
          </option>
          <option
            value="low-sugar"
            onClick={() => {
              setHealthLabel("low-sugar");
            }}
          >
            sekersiz
          </option>
          <option
            value="dairy-free"
            onClick={() => {
              setHealthLabel("dairy-free");
            }}
          >
            sütsüz
          </option>
          <option
            value=" immuno-supportive "
            onClick={() => {
              setHealthLabel(" immuno-supportive ");
            }}
          >
            bağışıklık destekleyici 
          </option>
          <option
            value="wheat-free"
            onClick={() => {
              setHealthLabel("wheat-free");
            }}
          >
            buğdaysız 
          </option>
        </select>
        <input type="submit" value="Yemekleri getir" className="app__submit" />
      </form>
      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <Recipetile recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default App;
