import { useState } from 'react';

function Inventory({ inventory }) {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = ['all', ...new Set(inventory.map(item => item.department))];

  const filteredInventory = inventory
    .filter(item => selectedDepartment === 'all' || item.department === selectedDepartment)
    .sort((a, b) => {
      // Sort by status priority (critical -> low -> sufficient)
      const statusPriority = { critical: 0, low: 1, sufficient: 2 };
      return statusPriority[a.status] - statusPriority[b.status];
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'sufficient': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastUpdated = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Drug Inventory</h2>
        <div className="flex gap-2">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Drug Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Current Stock</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Min. Required</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredInventory.map((item) => (
              <tr key={item._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {item.drugName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {item.department}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {item.currentStock}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {item.minimumRequired}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatLastUpdated(item.lastUpdated)}
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No inventory items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Critical/Low Stock Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-red-800 font-semibold">Critical Stock Alert</h3>
          <p className="text-red-600 mt-1">
            {filteredInventory.filter(item => item.status === 'critical').length} items need immediate attention
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-yellow-800 font-semibold">Low Stock Warning</h3>
          <p className="text-yellow-600 mt-1">
            {filteredInventory.filter(item => item.status === 'low').length} items running low
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inventory;