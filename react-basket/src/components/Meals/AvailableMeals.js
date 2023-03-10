// -----------------------------------------------------------------------------------------
// π κ°μλ΄μ©μ€ μ€μλΆλΆ μ²΄ν¬
// β­οΈ μ§μ€νμ μ§μ€μ
// -----------------------------------------------------------------------------------------
// MealItem μμ΄ν νλνλλ₯Ό λΏλ €μ£Όλ μ»΄ν¬λνΈμ΄λ€. λλ―Έ μμλ°μ΄ν°λ₯Ό κ°μ§κ³ μλ€.
import React from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];
const AvailableMeals = () => {

    // λλ―Έλ°μ΄ν°μμ νλνλ λͺ©λ‘μ λ½μ μμ΄ν μ»΄ν¬λνΈμ μμλ€μ λΏλ €μ€ μμ΄νμ μμ±
    const mealsList= DUMMY_MEALS.map(meal=>
        <MealItem key={meal.id}  id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>
    );
    console.log(mealsList);

    return (
        <section className={classes.meals}>
            <Card>
              <ul>
                {mealsList}
            </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;