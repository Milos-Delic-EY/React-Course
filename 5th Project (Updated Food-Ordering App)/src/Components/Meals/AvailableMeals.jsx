import Card from "../UI/Card";
import MealItem from "./MealItem/Mealitem";
import classes from "./availableMeals.module.css";
import { useEffect, useReducer } from "react";

const initialFetchState = {
  meals: [],
  isLoading: true,
  error: null,
};

const reducerHandler = (state, action) => {
  if (action.type === "FETCH_DONE") {
    return {
      meals: action.meals,
      isLoading: false,
      error: false,
    };
  }
  if (action.type === "ERROR") {
    return {
      meals: state.meals,
      isLoading: false,
      error: action.error,
    };
  }
  return initialFetchState;
};

const AvailableMeals = () => {
  const [fetchState, dispatch] = useReducer(reducerHandler, initialFetchState);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-bb10c-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) throw new Error("Something went wrong...");
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      dispatch({ type: "FETCH_DONE", meals: loadedMeals });
    };

    fetchMeals().catch((error) => {
      dispatch({ type: "ERROR", error: error.message });
    });
  }, []);

  if (fetchState.isLoading)
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );

  if (fetchState.error) {
    return (
      <section className={classes.mealsError}>
        <p> {fetchState.error} </p>
      </section>
    );
  }

  const mealList = fetchState.meals.map((e) => (
    <MealItem
      key={e.id}
      name={e.name}
      description={e.description}
      price={e.price}
      id={e.id}
    >
      {e.name}
    </MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul> {mealList} </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
