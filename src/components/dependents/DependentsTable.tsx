import { EmployeeDependent } from "../../model/Employee";
import { formatSalary, dependentCost } from "../../utils/utils";
import { EditableLabel } from "../editable-label/EditableLabel";
import "./DependentsTable.css";
import { PiggyBank, Trash } from "lucide-react";

export interface DependentsTableProps {
  dependents: EmployeeDependent[];
  dependentsChange: (dependents: EmployeeDependent[]) => void;
  isEditing: boolean;
}

export const DependentsTable = ({
  dependents,
  dependentsChange,
  isEditing,
}: DependentsTableProps) => {
  const removeDependent = (index: number) => {
    const newDependents = dependents.filter((_, i) => i !== index);
    dependentsChange(newDependents);
  };

  const updateDependent = (index: number, dependent: EmployeeDependent) => {
    const newDependents = [...dependents];
    newDependents[index] = dependent;
    dependentsChange(newDependents);
  };

  return (
    <table className="dependents-table">
      <thead>
        <tr>
          {isEditing && <th></th>}
          <th>Name</th>
          <th>Age</th>
          <th>Relationship</th>
          <th>Gender</th>
          <th style={{ textAlign: "right" }}>Costs</th>
        </tr>
      </thead>
      <tbody id="dependents-body">
        {dependents.length > 0 ? (
          dependents.map((dependent, index) => (
            <tr key={dependent.id}>
              {isEditing && (
                <td style={{ cursor: "pointer" }}>
                  <Trash color="red" onClick={() => removeDependent(index)} />
                </td>
              )}
              <td>
                <EditableLabel
                  onChange={(value) => {
                    dependent.name = value.target.value;
                    updateDependent(index, dependent);
                  }}
                  value={dependent.name}
                  isEditable={isEditing}
                >
                  {dependent.name}
                </EditableLabel>
                {dependent.name && dependent.name[0].toLowerCase() === "a" && (
                  <PiggyBank style={{ marginLeft: ".5rem" }} color="green" />
                )}
              </td>
              <td>
                <EditableLabel
                  value={dependent.age}
                  onChange={(value) => {
                    dependent.age = +value.target.value;
                    updateDependent(index, dependent);
                  }}
                  isEditable={isEditing}
                >
                  {dependent.age}
                </EditableLabel>
              </td>
              <td>
                <EditableLabel
                  onChange={(value) => {
                    dependent.relationship = value.target.value;
                    updateDependent(index, dependent);
                  }}
                  value={dependent.relationship}
                  isEditable={isEditing}
                >
                  {dependent.relationship}
                </EditableLabel>
              </td>
              <td>
                <EditableLabel
                  onChange={(value) => {
                    dependent.gender = value.target.value;
                    updateDependent(index, dependent);
                  }}
                  value={dependent.gender}
                  isEditable={isEditing}
                >
                  {dependent.gender}
                </EditableLabel>
              </td>
              <td style={{ textAlign: "right" }}>
                {formatSalary(dependentCost(dependent))}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={isEditing ? 6 : 5} className="no-dependents">
              No dependents found
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={isEditing ? 5 : 4} style={{ textAlign: "right" }}>
            Total Dependent Cost :
          </td>
          <td style={{ color: "red", textAlign: "right" }}>
            {formatSalary(
              dependents.reduce(
                (sum, employee) => sum + dependentCost(employee),
                0
              )
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
