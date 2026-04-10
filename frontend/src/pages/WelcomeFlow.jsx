import WelcomeLayout from '../components/welcome/WelcomeLayout.jsx';
import { useState } from "react";
import WelcomeStart from "../components/welcome/WelcomeStart";
import PreferenceStep from "../components/welcome/PreferenceStep.jsx";

function WelcomeFlow() {

  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("");
  
const handleLanguageSelect = (language) => {
  setSelectedLanguage(language);
};

const handleOrderTypeSelect = (orderType) => {
  setSelectedOrderType(orderType);
};

const handlePreferenceContinue = () => {
  if (selectedLanguage && selectedOrderType) {
    setStep(3);
  }
};

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStart onNext={nextStep} />;
      case 2:
  return (
    <PreferenceStep
      selectedLanguage={selectedLanguage}
      selectedOrderType={selectedOrderType}
      onSelectLanguage={handleLanguageSelect}
      onSelectOrderType={handleOrderTypeSelect}
      onContinue={handlePreferenceContinue}
    />
  );
      case 3:
        return <h2>Order Type Step</h2>;
      case 4:
        return <h2>Party Size Step</h2>;
      case 5:
        return <h2>Availability Step</h2>;
      case 6:
        return <h2>Ready Step</h2>;
      default:
        return <h2>Welcome Start Step</h2>;
    }
  };
  

  return (
    <WelcomeLayout>
      <div>
        {renderStep()}

        <div style={{ marginTop: "20px" }}>
          {step > 1 && <button onClick={prevStep}>Back</button>}
          {step > 2 && step < 6 && <button onClick={nextStep}>Next</button>}
        </div>
      </div>
    </WelcomeLayout>
  );
}
export default WelcomeFlow;