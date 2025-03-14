import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const patientData = {
  id: "#67890",
  age: 60,
  weight: "80 kg",
  ethnicity: "Caucasian",
  transplantType: "Kidney Only",
  donorType: "Deceased, Standard Criteria",
  rejectionHistory: "Prior borderline TCMR at 9 months (resolved)",
  cPRA: "70%",
  bkVirusStatus: "Low-level BK copies detected (not nephropathy)",
  otherConditions: "Hypertension, well-controlled diabetes",
  currentImmunosuppression: "Tacrolimus (Goal: 6-8 ng/mL), Mycophenolate, Prednisone",
  inductionAgent: "Thymoglobulin",
  dialysis: "Not required",
  timeSinceTransplant: "1 year",
}

export default function PatientInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          {Object.entries(patientData).map(([key, value]) => (
            <div key={key} className="flex">
              <dt className="font-semibold w-1/2 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</dt>
              <dd className="w-1/2">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}

