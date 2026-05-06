import WelcomeLayout from '../components/welcome/WelcomeLayout.jsx';
import { useState } from "react";
import WelcomeStart from "../components/welcome/WelcomeStart";
import PreferenceStep from "../components/welcome/PreferenceStep.jsx";
import { useNavigate } from "react-router-dom";
import PartySizeStep from "../components/welcome/PartySizeStep.jsx";
import { useTranslation } from "react-i18next";

function WelcomeFlow() {

  const { t, i18n } = useTranslation();

    const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("");
     const [selectedPartySize, setSelectedPartySize] = useState("");
  
const handleLanguageSelect = (languageCode) => {
  setSelectedLanguage(languageCode);
  i18n.changeLanguage(languageCode);
};

const handleOrderTypeSelect = (orderTypeCode) => {
  setSelectedOrderType(orderTypeCode);
};

const handlePreferenceContinue = () => {
    if (!selectedLanguage || !selectedOrderType) return;
    setStep("partySize");
    

    if (selectedOrderType === "takeAway") {
      navigate("/menu");
      return;
    }

    if (selectedOrderType === "dineIn") {
      setStep(3);
    }
  };

  const handlePartySizeContinue = () => {
    if (!selectedPartySize) return;

    navigate("/menu");
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step === 3 && selectedOrderType === "dineIn") {
      setStep(2);
      return;
    }

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
        return (
         <PartySizeStep
      selectedPartySize={selectedPartySize}
      onSelectPartySize={setSelectedPartySize}
      onContinue={handlePartySizeContinue}
      onBack={prevStep}
    />
        );

      default:
        return <WelcomeStart onNext={nextStep} />;
    }
  };

        //return <h2>Order Type Step</h2>;
      //case 4:
       // return <h2>Party Size Step</h2>;
      //case 5:
        //return <h2>Availability Step</h2>;
      //case 6:
        //return <h2>Ready Step</h2>;
      //default:
       // return <h2>Welcome Start Step</h2>;
   // }
  //};
  

  return (
    <WelcomeLayout>
        {renderStep()}
    </WelcomeLayout>
  );
}
export default WelcomeFlow;