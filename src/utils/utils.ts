import { Employee, EmployeeDependent } from "../model/Employee";

export const dependentCost = (dependent: EmployeeDependent) => {
  const baseCost = 500 / 26;

  if (dependent.name && dependent.name[0].toLowerCase() === "a") {
    return baseCost - baseCost * 0.1;
  }

  return baseCost;
};

export const employeeCost = (employee: Employee) => {
  const baseCost = 1000 / 26;

  if (employee.name && employee.name[0].toLowerCase() === "a") {
    return baseCost - baseCost * 0.1;
  }

  return baseCost;
};

export const formatSalary = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const getTotalEmployeeCost = (employee: Employee) => {
  return (
    employeeCost(employee) +
    employee.dependents.reduce(
      (acc, dependent) => acc + dependentCost(dependent),
      0
    )
  );
};
