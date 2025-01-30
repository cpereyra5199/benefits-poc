export interface Employee {
  employeeId: number | null;
  name: string;
  age: number;
  gender: string;
  benefitSelection: string;
  dependents: EmployeeDependent[];
}

export interface EmployeeDependent {
  id?: string;
  name?: string;
  age?: number;
  relationship?: string;
  gender?: string;
}
