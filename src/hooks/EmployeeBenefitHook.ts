import { useState, useEffect } from "react";
import { Employee, EmployeeDependent } from "../model/Employee";
import { EmployeeBenefitService } from "../services/employee-benefit";

export const useEmployeeBenefit = () => {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [index, setIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    EmployeeBenefitService.seedLocalStorage();
    setCurrentEmployee(EmployeeBenefitService.getEmployee(0));
  }, []);

  const goToNextEmployee = () => {
    const employee = EmployeeBenefitService.getEmployee(index + 1);

    if (employee) {
      setCurrentEmployee(employee);
      setIndex(index + 1);
    }
  };

  const goToPreviousEmployee = () => {
    const employee = EmployeeBenefitService.getEmployee(index - 1);

    if (employee) {
      setCurrentEmployee(employee);
      setIndex(index - 1);
    }
  };

  const addDependent = () => {
    if (!currentEmployee) return;

    const newEmployee = { ...currentEmployee };
    newEmployee.dependents.push({
      id: Math.random().toString(36).substring(7),
    });
    setCurrentEmployee(newEmployee);
  };

  const dependentsChange = (dependents: EmployeeDependent[]) => {
    if (!currentEmployee) return;

    const newEmployee = { ...currentEmployee };
    newEmployee.dependents = [...dependents];

    setCurrentEmployee((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        dependents: [...dependents], // Ensure a new array reference
      };
    });
  };

  const saveEmployee = () => {
    if (!currentEmployee) return;

    EmployeeBenefitService.upsertEmployee(currentEmployee);
    setIsEditing(false);
  };

  const addEmployee = () => {
    const newEmployee: Employee = {
      age: 0,
      dependents: [],
      name: "",
      gender: "",
      benefitSelection: "",
      employeeId: null,
    };

    setCurrentEmployee(newEmployee);
    setIsEditing(true);
  };

  return {
    currentEmployee,
    isEditing,
    setCurrentEmployee,
    setIsEditing,
    goToNextEmployee,
    dependentsChange,
    goToPreviousEmployee,
    saveEmployee,
    addEmployee,
    addDependent,
  };
};
