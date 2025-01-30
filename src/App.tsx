import "./App.css";

import { EmployeeBenefitDetail } from "./components/benefit-detail/EmployeeBenefitDetail";

function App() {
  return (
    <>
      <div style={{ marginBottom: "5rem" }}>
        <a href="https://www.paylocity.com/" target="_blank" rel="noreferrer">
          <img
            width={200}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Paylocity_logo.svg/2560px-Paylocity_logo.svg.png"
            alt="Paylocity Logo"
          />
        </a>
      </div>
      <EmployeeBenefitDetail />
    </>
  );
}

export default App;
