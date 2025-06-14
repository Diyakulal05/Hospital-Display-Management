import { useState } from 'react';

function PatientQueue({ patients }) {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = ['all', ...new Set(patients.map(patient => patient.department))];

  const filteredPatients = patients
    .filter(patient => selectedDepartment === 'all' || patient.department === selectedDepartment)
    .sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAppointmentTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedWaitTime = (patient) => {
    if (patient.status === 'completed') return '-';
    if (patient.status === 'in-progress') return '0-5 mins';
    
    const appointmentTime = new Date(patient.appointmentTime);
    const now = new Date();
    const waitTimeInMinutes = Math.max(0, Math.round((appointmentTime - now) / (1000 * 60)));
    
    if (waitTimeInMinutes <= 15) return '0-15 mins';
    if (waitTimeInMinutes <= 30) return '15-30 mins';
    return '30+ mins';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Patient Queue</h2>
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
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Token ID</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Patient</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Est. Wait</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {patient.tokenId}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {patient.initials}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {patient.department}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {formatAppointmentTime(patient.appointmentTime)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {getEstimatedWaitTime(patient)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No patients in queue
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Queue Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-yellow-800 font-semibold">Waiting</h3>
          <p className="text-yellow-600 mt-1">
            {filteredPatients.filter(p => p.status === 'waiting').length} patients
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-800 font-semibold">In Progress</h3>
          <p className="text-green-600 mt-1">
            {filteredPatients.filter(p => p.status === 'in-progress').length} patients
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-gray-800 font-semibold">Completed</h3>
          <p className="text-gray-600 mt-1">
            {filteredPatients.filter(p => p.status === 'completed').length} patients
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientQueue;