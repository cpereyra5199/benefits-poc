import { EmployeeCard } from "../employee/EmployeeCard";
import { PaycheckTable } from "../paycheck/PaycheckTable";
import { getTotalEmployeeCost } from "../../utils/utils";
import { BaseButton } from "../button/BaseButton";
import "./EmployeeBenefitDetail.css";
import { useEmployeeBenefit } from "../../hooks/EmployeeBenefitHook";

export const EmployeeBenefitDetail = () => {
  const {
    currentEmployee,
    isEditing,
    setCurrentEmployee,
    setIsEditing,
    saveEmployee,
    addEmployee,
    dependentsChange,
    addDependent,
    goToNextEmployee,
    goToPreviousEmployee,
  } = useEmployeeBenefit();

  return (
    <>
      <h2>Employee Benefits</h2>
      <BaseButton onClick={addEmployee}>Add Employee</BaseButton>
      <BaseButton
        classNames={isEditing ? "success-background" : "edit-background"}
        onClick={() => (isEditing ? saveEmployee() : setIsEditing(!isEditing))}
      >
        {isEditing ? "Save" : "Edit"}
      </BaseButton>

      {currentEmployee && (
        <EmployeeCard
          employeeChange={setCurrentEmployee}
          isEditing={isEditing}
          dependentsChange={dependentsChange}
          employee={currentEmployee}
        />
      )}

      {isEditing && (
        <BaseButton onClick={addDependent}>Add Dependent</BaseButton>
      )}
      <h3>Paycheck Summary</h3>
      {currentEmployee && (
        <PaycheckTable
          totalBenefitsCost={-getTotalEmployeeCost(currentEmployee)}
        />
      )}

      <div className="move-buttons">
        <BaseButton onClick={goToPreviousEmployee}>Previous</BaseButton>
        <BaseButton onClick={goToNextEmployee}>Next</BaseButton>
      </div>
    </>
  );
};
