import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const patientData = {
    id: "#67890",
    age: 60,
    height: "175 cm",
    weight: "80 kg",
    ethnicity: "Caucasian",
    gender: "Male",
    nativeKidneyDisease: "Hypertensive nephrosclerosis",
    
    transplantDetails: {
      transplantType: "Kidney Only",
      donorType: "Deceased, Standard Criteria",
      livingDonorStatus: "N/A",
      recipientDonorMatch: "ABO compatible, HLA mismatch 3/6",
      coldIschemicTime: "10 hours",
      kidneyPI: "Moderate (PI: 1.2)",
    },
  
    rejectionHistory: "Prior borderline TCMR at 9 months (resolved)",
    antibodyHistory: "No DSA detected",
    cPRA: "70%",
    antibodyLevel: "Class I: 50%, Class II: 30%",
    daysFromTransplant: 365,
    
    bkVirusHistory: "Low-level BK copies detected (not nephropathy)",
    hyperkalemia: "No history of hyperkalemia",
    infectionHistory: "No major infections post-transplant",
    cancerHistory: "No history of malignancy",
    
    antimetaboliteTolerance: "Tolerating mycophenolate well",
    drugInteractions: "No significant drug interactions reported",
    
    inductionAgents: "Thymoglobulin",
    dischargeRegimen: {
      tacrolimus: "Goal: 6-8 ng/mL",
      mycophenolate: "Standard dosing",
      prednisone: "5 mg daily",
    },
    
    virologyStatus: {
      CMV: "Negative",
      EBV: "Positive",
      HepatitisB: "Negative",
      HepatitisC: "Negative",
    },
  
    suppressiveRegimen: "Triple therapy: Tacrolimus, Mycophenolate, Prednisone",
    longTermOutpatientConsiderations: "Monitor BP, glucose control, kidney function, and BK viral load",
};

export default function PatientInfo() {
    const renderValue = (value) => {
      if (typeof value === "object" && value !== null) {
        return (
          <dl className="ml-4 space-y-1">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} className="flex">
                <dt className="font-medium w-1/2 capitalize">{subKey.replace(/([A-Z])/g, " $1").trim()}:</dt>
                <dd className="w-1/2">{typeof subValue === "object" ? renderValue(subValue) : subValue}</dd>
              </div>
            ))}
          </dl>
        );
      }
      return value;
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            {Object.entries(patientData).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <dt className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</dt>
                <dd className="pl-4">{renderValue(value)}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    );
}
