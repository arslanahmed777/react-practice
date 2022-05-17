import React, { useState, useCallback } from "react";
import Count from "../components/UseCallback/Count";
import Title from "../components/UseCallback/Title";
import Button from "../components/UseCallback/Button";
const UseCallbackPage = () => {
  const [age, setAge] = useState(25);
  const [salary, seSalary] = useState(20000);

  const IncrementAge = useCallback(() => {
    setAge(age + 1);
  }, [age]);
  const IncrementSalary = useCallback(() => {
    seSalary(salary + 1000);
  }, [salary]);

  return (
    <div>
      <Title />
      <Count text="Age" count={age} />
      <Button handleClick={IncrementAge}>Increment Age</Button>
      <Count text="Salary" count={salary} />
      <Button handleClick={IncrementSalary}>Increment Salary</Button>
    </div>
  );
};

export default UseCallbackPage;
