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
      { day: '03/01', values: [4.0, 12, 300, 6.0, 138 ] },
      { day: '03/02', values: [3.5, 11, 250, 4.8, 138 ] },
      { day: '03/03', values: [3.0, 10, 260, 5, 139] },
      { day: '03/04', values: [2.5, 9, 170, 4.2, 138] },
      { day: '03/05', values: [2.0, 8, 140, 3.8, 138] },
      { day: '03/06', values: [1.5, 7, 160, 3.4, 139] },
      { day: '03/07', values: [1.2, 7, 130, 3.6, 138] }
    ]
};

interface ranges {
    [name: string]: {min: number, max: number},
}

const featureRanges: ranges = {
    'Creatinine (mg/dL)': { min: 0.6, max: 2.0 },
    'Tacrolimus Trough (ng/mL)': { min: 5, max: 10 },
    'Urine (mg/day)': { min: 0, max: 150 },
    'Potassium (mEq/L)': { min: 3.5, max: 5.0 },
    'Sodium (mEq/L)': { min: 135, max: 145 },
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
                            <th className="pl-4 pr-6 py-4 font-medium border-r border-gray-200">Features</th>
                            {data.days.map((dayData, index) => 
                                <th key={index} className="px-4 py-3 border-r border-gray-200 last:border-r-0">
                                    {dayData.day}
                                </th>)}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.features.map((feature, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                <td className="pl-4 pr-6 py-3 font-medium border-r border-gray-200">{feature}</td>
                                {data.days.map((dayData, colIndex) => {
                                    const value = dayData.values[rowIndex];
                                    const key = data.features[rowIndex]

                                    let bgColor = '';
                                    let arrow = '';
                                    
                                    //color also differentiates between over and under ranges
                                    // if (value > featureRanges[key].max) {
                                    //     bgColor = 'bg-red-100';
                                    //     arrow = '↑';
                                    // } else if (value < featureRanges[key].min) {
                                    //     bgColor = 'bg-orange-100';
                                    //     arrow = '↓';
                                    // }

                                    //only cares about if out of range, arrows show above or below normal range
                                    if (value > featureRanges[key].max || value < featureRanges[key].min){
                                        bgColor = 'bg-red-100'
                                        arrow = value > featureRanges[key].max ? '↑' : '↓'
                                    }
                                    
                                    return (
                                        <td className = "px-4 border-r border-gray-200 last:border-r-0" key={colIndex}>
                                            <div className={`${bgColor} flex items-center gap-2 rounded-md px-3 py-2`}>
                                                <span className="tabular-nums">{value}</span>
                                                {arrow && <span className="font-semibold text-sm">{arrow}</span>}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
    </Card>
  );
};