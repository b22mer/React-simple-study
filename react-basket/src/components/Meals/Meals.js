// -----------------------------------------------------------------------------------------
// 📌 강의내용중 중요부분 체크
// ⭐️ 집중하자 집중을
// -----------------------------------------------------------------------------------------
// 음식 소개란과 음식 리트스트를 "디스플레이" 하는 컴포넌트
import React from 'react';
import AvailableMeals from './AvailableMeals';
import MealSummary from './MealSummary';

const Meals = () => {
    return (
        <div>
           <MealSummary/> 
           <AvailableMeals/>
        </div>
    );
};

export default Meals;