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

const mainGraphConfigs = {
  creatinine: { color: "#8884d8", unit: "mg/dL", label: "Creatinine", shape: "circle" },
  prografTrough: { color: "#82ca9d", unit: "ng/mL", label: "Prograf Trough", shape: "square" },
  potassium: { color: "#ffc658", unit: "mEq/L", label: "Potassium", shape: "triangle" },
}

const dosageConfig = { color: "#ff7300", unit: "mg", label: "Prograf Dosage" }

const CustomShape = (props) => {
  const { cx, cy, fill, shape } = props

  if (shape === "circle") {
    return <circle cx={cx} cy={cy} r={4} fill={fill} />
  } else if (shape === "square") {
    return <rect x={cx - 4} y={cy - 4} width={8} height={8} fill={fill} />
  } else if (shape === "triangle") {
    return <polygon points={`${cx},${cy - 4} ${cx - 4},${cy + 4} ${cx + 4},${cy + 4}`} fill={fill} />
  }
  return null
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
                  <Tooltip
                    formatter={(value, name, props) => {
                      const config = mainGraphConfigs[name as keyof typeof mainGraphConfigs]
                      if (config) {
                        return [`${config.label}: ${value} ${config.unit}`, name]
                      }
                      return [value, name]
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend layout="horizontal" verticalAlign="top" align="center" />
                  {Object.entries(mainGraphConfigs).map(([key, config]) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={config.color}
                      strokeWidth={2}
                      dot={<CustomShape shape={config.shape} fill={config.color} />}
                      activeDot={<CustomShape shape={config.shape} fill={config.color} />}
                      name={config.label}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="dosage">
            <h3 className="text-lg font-semibold mb-2">Prograf Dosage</h3>
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
                  <Tooltip
                    formatter={(value) => [`${dosageConfig.label}: ${value} ${dosageConfig.unit}`, dosageConfig.label]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend layout="horizontal" verticalAlign="top" align="center" />
                  <Line
                    type="monotone"
                    dataKey="dosage"
                    stroke={dosageConfig.color}
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                    name={dosageConfig.label}
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

