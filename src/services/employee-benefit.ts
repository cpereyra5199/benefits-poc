import { seedData } from "../data/data";
import { Employee, EmployeeDependent } from "../model/Employee";

export class EmployeeBenefitService {
  static getEmployee(index: number): Employee | null {
    try {
      const data = JSON.parse(localStorage.getItem("data")!) as Employee[];
      return data[index];
    } catch {
      return null;
    }
  }

  static getEmployeeDependents(id: number): EmployeeDependent[] {
    return EmployeeBenefitService.getEmployee(id)!.dependents;
  }

  static upsertEmployee(employee: Employee): void {
    const data = JSON.parse(localStorage.getItem("data")!) as Employee[];
    if (employee.employeeId) {
      const index = data.findIndex(
        (ee: Employee) => ee.employeeId === employee.employeeId
      );
      data[index] = employee;
    } else {
      employee.employeeId = data.length + 1;
      data.push(employee);
    }

    localStorage.setItem("data", JSON.stringify(data));
  }

  static seedLocalStorage(): number {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(seedData));
    }

    return JSON.parse(localStorage.getItem("data")!).length;
  }
}
