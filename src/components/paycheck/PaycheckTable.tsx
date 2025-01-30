import { formatSalary } from "../../utils/utils";
import "./PaycheckTable.css";

interface PaycheckTableProps {
  totalBenefitsCost: number;
}

export const PaycheckTable = ({ totalBenefitsCost }: PaycheckTableProps) => {
  return (
    <table className="paycheck-table">
      <thead>
        <tr>
          <th>Item</th>
          <th style={{ textAlign: "right" }}>Amount</th>
        </tr>
      </thead>
      <tbody id="paycheck-body">
        <tr>
          <td>Employee Salary</td>
          <td style={{ textAlign: "right" }}>$2000</td>
        </tr>
        <tr>
          <td>Employee Benefits Cost</td>
          <td style={{ textAlign: "right" }} className="danger">
            {formatSalary(totalBenefitsCost)}
          </td>
        </tr>

        <tr>
          <td style={{ textAlign: "right" }}>Paycheck Total:</td>
          <td className="success" style={{ textAlign: "right" }}>
            {formatSalary(2000 + totalBenefitsCost)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
