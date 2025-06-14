import { useState } from 'react';

function Schedule({ schedules }) {
  const [filter, setFilter] = useState('all'); // 'all', 'OT', 'consultation'

  const filteredSchedules = schedules
    .filter(schedule => filter === 'all' || schedule.type === filter)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Schedules</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('OT')}
            className={`px-4 py-2 rounded-md ${filter === 'OT' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            OT
          </button>
          <button
            onClick={() => setFilter('consultation')}
            className={`px-4 py-2 rounded-md ${filter === 'consultation' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Consultation
          </button>
          <button
            onClick={() => setFilter('')}
            className="px-4 py-2 rounded-md bg-gray-500 text-white"
          >
            Reset Filter
          </button>
          <button
            onClick={() => console.log('Delete functionality to be implemented')}
            className="px-4 py-2 rounded-md bg-red-500 text-white"
          >
            Delete Schedule
          </button>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Token ID</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredSchedules.map((schedule) => (
              <tr key={schedule._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                  {formatTime(schedule.startTime)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {schedule.department}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {schedule.type}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {schedule.patientTokenId}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredSchedules.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No schedules found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;