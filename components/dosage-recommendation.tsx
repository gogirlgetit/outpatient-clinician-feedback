"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function DosageRecommendation() {
  const [recommendedDose, setRecommendedDose] = useState(2.5) // Current dose from last follow-up
  const [approved, setApproved] = useState<boolean | null>(null)
  const [revisedDose, setRevisedDose] = useState("")
  const [adjustmentReason, setAdjustmentReason] = useState("")

  const handleApprove = () => {
    setApproved(true)
  }

  const handleReject = () => {
    setApproved(false)
  }

  const handleSubmitRevision = () => {
    // Here you would typically send the revised dose and reason to your backend
    console.log("Revised dose:", revisedDose)
    console.log("Adjustment reason:", adjustmentReason)
    // Reset the form
    setApproved(null)
    setRevisedDose("")
    setAdjustmentReason("")
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Dosage Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Current Prograf Dose: {recommendedDose} mg</p>
        {approved === null ? (
          <div className="flex space-x-2">
            <Button onClick={handleApprove}>Maintain Current Dose</Button>
            <Button variant="outline" onClick={handleReject}>
              Adjust Dose
            </Button>
          </div>
        ) : approved ? (
          <p className="text-green-600">Current dosage maintained</p>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="revisedDose">Revised Dose (mg)</Label>
              <Input
                id="revisedDose"
                type="number"
                value={revisedDose}
                onChange={(e) => setRevisedDose(e.target.value)}
                placeholder="Enter revised dose"
              />
            </div>
            <div>
              <Label htmlFor="adjustmentReason">Reason for Adjustment</Label>
              <Textarea
                id="adjustmentReason"
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                placeholder="Enter reason for adjustment"
              />
            </div>
            <Button onClick={handleSubmitRevision}>Submit Revision</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

