"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: 0, creatinine: 1.3, prografTrough: 8.6, potassium: 4.7, dosage: 2.5, adjustment: "None as of now" },
  {
    month: 3,
    creatinine: 1.4,
    prografTrough: 8.5,
    potassium: 4.7,
    dosage: 2.0,
    adjustment: "Decrease Tacrolimus dose slightly to target ~7 ng/mL",
  },
  { month: 6, creatinine: 1.3, prografTrough: 7.2, potassium: 4.6, dosage: 2.0, adjustment: "No change" },
  {
    month: 9,
    creatinine: 1.5,
    prografTrough: 6.1,
    potassium: 4.8,
    dosage: 2.5,
    adjustment: "Slight increase in dose to maintain 6-8 range",
  },
]

// Health ranges
const healthRanges = {
  creatinine: { min: 0.7, max: 1.3, unit: "mg/dL" },
  potassium: { min: 3.5, max: 5.0, unit: "mEq/L" },
  prografTrough: { min: 6, max: 8, unit: "ng/mL" },
}

// Line configurations
const mainGraphConfigs = [
  { dataKey: "creatinine", color: "#8884d8", unit: "mg/dL", label: "Creatinine", pattern: "solid" },
  { dataKey: "prografTrough", color: "#82ca9d", unit: "ng/mL", label: "Prograf Trough", pattern: "dashed" },
  { dataKey: "potassium", color: "#ffc658", unit: "mEq/L", label: "Potassium", pattern: "dotted" },
]

const dosageConfig = { dataKey: "dosage", color: "#ff7300", unit: "mg", label: "Prograf Dosage", pattern: "solid" }

// Custom tooltip renderer
const renderColorfulTooltipContent = (props) => {
  const { active, payload, label } = props

  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
      <p className="font-bold">{`Month: ${label}`}</p>
      <div>
        {payload.map((entry, index) => {
          const dataKey = entry.dataKey
          const value = entry.value

          // Get label and unit based on dataKey
          let label, unit
          if (dataKey === "creatinine") {
            label = "Creatinine"
            unit = "mg/dL"
          } else if (dataKey === "prografTrough") {
            label = "Prograf Trough"
            unit = "ng/mL"
          } else if (dataKey === "potassium") {
            label = "Potassium"
            unit = "mEq/L"
          } else if (dataKey === "dosage") {
            label = "Prograf Dosage"
            unit = "mg"
          }

          const range = healthRanges[dataKey]

          // Check if value is outside healthy range
          const isOutOfRange = range && (value < range.min || value > range.max)

          return (
            <p key={`item-${index}`} style={{ color: isOutOfRange ? "red" : "inherit" }}>
              {`${label}: ${value} ${unit}`}
              {isOutOfRange ? " (Out of range)" : ""}
            </p>
          )
        })}
        <p className="mt-1 pt-1 border-t border-gray-200">
          <strong>Adjustment:</strong> {payload[0].payload.adjustment}
        </p>
      </div>
    </div>
  )
}

// Manual legend component
const ManualLegend = ({ items }) => {
  return (
    <div className="flex justify-center items-center space-x-6 mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-10 h-0 mr-2"
            style={{
              borderTopWidth: "3px",
              borderTopStyle: item.pattern === "dashed" ? "dashed" : item.pattern === "dotted" ? "dotted" : "solid",
              borderTopColor: item.color,
            }}
          />
          <span style={{ color: item.color }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function TrendGraphs() {
  const [activeTab, setActiveTab] = useState("main")

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Trend Graphs</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="main">Main Metrics</TabsTrigger>
            <TabsTrigger value="dosage">Prograf Dosage</TabsTrigger>
          </TabsList>
          <TabsContent value="main">
            <h3 className="text-lg font-semibold mb-2">Creatinine, Prograf Trough, and Potassium Levels</h3>
            {/* Manual legend */}
            <ManualLegend items={mainGraphConfigs} />
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{ value: "Months Post-Transplant", position: "bottom", offset: 20 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip content={renderColorfulTooltipContent} />

                  {/* Creatinine: Solid line with circle markers */}
                  <Line
                    type="monotone"
                    dataKey="creatinine"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 3 }}
                    activeDot={{ r: 8, strokeWidth: 3 }}
                    name="Creatinine"
                  />

                  {/* Prograf Trough: Dashed line with larger markers */}
                  <Line
                    type="monotone"
                    dataKey="prografTrough"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ r: 6, strokeWidth: 3 }}
                    activeDot={{ r: 8, strokeWidth: 3 }}
                    name="Prograf Trough"
                  />

                  {/* Potassium: Dotted line with smaller markers */}
                  <Line
                    type="monotone"
                    dataKey="potassium"
                    stroke="#ffc658"
                    strokeWidth={3}
                    strokeDasharray="2 2"
                    dot={{ r: 6, strokeWidth: 3 }}
                    activeDot={{ r: 8, strokeWidth: 3 }}
                    name="Potassium"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="dosage">
            <h3 className="text-lg font-semibold mb-2">Prograf Dosage</h3>
            {/* Manual legend */}
            <ManualLegend items={[dosageConfig]} />
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{ value: "Months Post-Transplant", position: "bottom", offset: 20 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip content={renderColorfulTooltipContent} />
                  <Line
                    type="monotone"
                    dataKey="dosage"
                    stroke="#ff7300"
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 3 }}
                    activeDot={{ r: 8, strokeWidth: 3 }}
                    name="Prograf Dosage"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {/* Notes Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Appointment Notes</h3>
          <ul className="list-disc pl-5 space-y-2">
            {data.map((item, index) => (
              <li key={index}>
                <strong>Month {item.month}:</strong> {item.adjustment}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
