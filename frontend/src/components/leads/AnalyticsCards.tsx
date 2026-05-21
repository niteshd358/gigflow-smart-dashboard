import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import type { Lead } from "../../types/lead";

interface Props {
  leads: Lead[];
}

const AnalyticsCards = ({leads}: Props) => {
  // STATUS DATA
  const statusData = [
    {
      name: "New",
      value: leads.filter(
        (lead) => lead.status === "new"
      ).length,
    },

    {
      name: "Contacted",
      value: leads.filter(
        (lead) =>
          lead.status === "contacted"
      ).length,
    },

    {
      name: "Qualified",
      value: leads.filter(
        (lead) =>
          lead.status ===
          "qualified"
      ).length,
    },

    {
      name: "Lost",
      value: leads.filter(
        (lead) =>
          lead.status === "lost"
      ).length,
    },
  ];

  // SOURCE DATA

  const sourceData = [
    {
      name: "Website",
      value: leads.filter(
        (lead) =>
          lead.source ===
          "website"
      ).length,
    },

    {
      name: "Instagram",
      value: leads.filter(
        (lead) =>
          lead.source ===
          "instagram"
      ).length,
    },

    {
      name: "Referral",
      value: leads.filter(
        (lead) =>
          lead.source ===
          "referral"
      ).length,
    },

    {
      name: "Other",
      value: leads.filter(
        (lead) =>
          lead.source === "other"
      ).length,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      {/* PIE CHART */}

      <div className="bg-white  dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 className="dark:text-gray-300 text-xl font-bold mb-6">
          Lead Sources
        </h2>

        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={sourceData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {sourceData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART */}

      <div className="bg-white dark:bg-gray-800 dark:text-gray-300 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">
          Lead Status Analytics
        </h2>

        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={statusData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;