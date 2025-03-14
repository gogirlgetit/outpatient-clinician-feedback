import PatientInfo from "@/components/patient-info"
import TrendGraphs from "@/components/trend-graphs"
import DosageRecommendation from "@/components/dosage-recommendation"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kidney Transplant Outpatient Follow-up Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <PatientInfo />
        </div>
        <div className="md:col-span-2">
          <TrendGraphs />
          <DosageRecommendation />
        </div>
      </div>
    </div>
  )
}

