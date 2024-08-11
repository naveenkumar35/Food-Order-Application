import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import MealsData from './MealsData';

const AvailableMeals = () => {
  const mealsList = MealsData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image={meal.images[0]} // Assuming the first image is the main one
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.mealList}>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
