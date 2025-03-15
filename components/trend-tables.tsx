"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const data = {
    features: [
      'Creatinine (mg/dL)',
      'Tacrolimus Trough (ng/mL)',
      'Urine (mg/day)',
      'Potassium (mEq/L)',
      'Sodium (mEq/L)'    
    ],
    days: [
      { day: '03/01', values: [4.0, 12, 300, 5.0, 138 ] },
      { day: '03/02', values: [3.5, 11, 250, 4.8, 138 ] },
      { day: '03/03', values: [3.0, 10, 200, 4.7, 139] },
      { day: '03/04', values: [2.5, 9, 180, 4.6, 138] },
      { day: '03/05', values: [2.0, 8, 160, 4.5, 138] },
      { day: '03/06', values: [1.5, 7, 140, 4.4, 139] },
      { day: '03/07', values: [1.2, 7, 130, 4.3, 138] }
    ]
};

export default function TrendTables(){
  return (
    <Card className="mt-4">
        <CardHeader>
            <CardTitle>Trend Table</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-s text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="pl-2">Features</th>
                            {data.days.map((dayData, index) => <th key={index}>{dayData.day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.features.map((features, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className = "pl-2">{features}</td>
                                {data.days.map((dayData, colIndex) => <td key={colIndex}> {dayData.values[rowIndex]} </td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
    </Card>
  );
};