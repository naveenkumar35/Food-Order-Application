import { Fragment } from 'react';
import AvailableMeals from './AvailableMeals';
import ToySummary from './ToySummary';

const Meals = () => {
  return (
    <Fragment>
      <ToySummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
