import { PiggyBank } from "lucide-react";
import { Employee, EmployeeDependent } from "../../model/Employee";
import {
  formatSalary,
  employeeCost,
  getTotalEmployeeCost,
} from "../../utils/utils";
import { DependentsTable } from "../dependents/DependentsTable";
import { EditableLabel } from "../editable-label/EditableLabel";
import "./EmployeeCard.css";

export interface EmployeeCardProps {
  employee: Employee;
  dependentsChange: (dependents: EmployeeDependent[]) => void;
  employeeChange: (employee: Employee) => void;
  isEditing: boolean;
}

export const EmployeeCard = ({
  employee,
  dependentsChange,
  employeeChange,
  isEditing,
}: EmployeeCardProps) => {
  const evaluateBenefitType = () => {
    if (!employee.dependents.length) {
      return "Individual";
    }

    if (
      employee.dependents.length === 1 &&
      employee.dependents[0].relationship === "Spouse"
    ) {
      return "Individual+Spouse";
    }

    if (
      employee.dependents.length &&
      employee.dependents.every(
        (dependent) => dependent.relationship === "Child"
      )
    ) {
      return "Individual+Children";
    }

    return "Family";
  };

  const updateEmployee = (emp: Employee) => {
    const newEmployee = { ...emp };
    employeeChange(newEmployee);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="employee-name">
        <EditableLabel
          value={employee.name}
          onChange={(value) => {
            employee.name = value.target.value;
            updateEmployee(employee);
          }}
          isEditable={isEditing}
        >
          {employee.name}
        </EditableLabel>
        {employee.name && employee.name[0].toLowerCase() === "a" && (
          <PiggyBank style={{ marginLeft: ".5rem" }} color="green" />
        )}
      </div>
      <div className="employee-card">
        <div className="employee-info">
          Age:{" "}
          <EditableLabel
            onChange={(value) => {
              employee.age = +value.target.value;
              updateEmployee(employee);
            }}
            value={employee.age}
            isEditable={isEditing}
          >
            {employee.age}
          </EditableLabel>
        </div>
        <div className="employee-info">
          Gender:{" "}
          <EditableLabel
            onChange={(value) => {
              employee.gender = value.target.value;
              updateEmployee(employee);
            }}
            value={employee.gender}
            isEditable={isEditing}
          >
            {employee.gender}
          </EditableLabel>
        </div>
        <div className="employee-benefit">Benefit: {evaluateBenefitType()}</div>
        <div>
          Employee Cost:{" "}
          <span className="danger">{formatSalary(employeeCost(employee))}</span>
        </div>
        <div>
          Total Cost:{" "}
          <span className="danger">
            {formatSalary(getTotalEmployeeCost(employee))}
          </span>
        </div>
      </div>
      <DependentsTable
        isEditing={isEditing}
        dependentsChange={dependentsChange}
        dependents={employee.dependents}
      />
    </div>
  );
};
