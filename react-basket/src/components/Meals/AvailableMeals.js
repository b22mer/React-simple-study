// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// MealItem 아이템 하나하나를 뿌려주는 컴포넌트이다. 더미 음식데이터를 가지고있다.
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

    // 더미데이터에서 하나하나 목록을 뽑아 아이템 컴포넌트에 요소들을 뿌려줘 아이템을 생성
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