// components/DashboardLayout.jsx
import React from "react";

const DashboardLayout = ({ children, title, description, user }) => {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500">{description}</p>
          </div>
          {children[0]}
        </div>
        {children.slice(1)}
      </div>
    </div>
  );
};

export default DashboardLayout;