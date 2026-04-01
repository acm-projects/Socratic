import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "CS2305", value: 70 },
  { name: "CS3345", value: 130 },
  { name: "CS2340", value: 95 },
  { name: "CS3354", value: 55 },
];

export default function WeeklyRecap() {
  return (
    <div className="bg-white rounded-xl p-4 mt-12 w-full">
      <p className="text-lg font-bold text-gray-900 mb-6 mt-2 ml-2">Weekly Recap</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Bar dataKey="value" fill="#D3E4FD" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}