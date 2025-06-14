import React from 'react';

function PatientDisplay({ schedule = [], inventory, currentToken = 0, emergencyAlert = null }) {
  const getAlertColor = (type) => {
    switch (type) {
      case 'Code Blue':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'Code Red':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'Code Black':
        return 'bg-gray-100 border-gray-500 text-gray-700';
      default:
        return 'bg-green-100 border-green-500 text-green-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OT/Consultation Schedule */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {schedule.length > 0 ? (
              schedule.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">{item.room}</p>
                  <p className="text-sm text-gray-600">{item.procedure} - {item.time}</p>
                  <p className="text-xs text-gray-500">{item.doctor}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">NA</div>
            )}
          </div>
        </div>

        {/* Token Queue */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Queue</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-blue-50 p-3 rounded">
              <div>
                <p className="font-medium text-blue-800">Now Serving</p>
                <p className="text-2xl font-bold text-blue-600">Token #{currentToken}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600">Room 201</p>
                <p className="text-xs text-blue-500">Dr. Williams</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-600">Next</p>
                <p className="font-medium">#{currentToken > 0 ? currentToken + 1 : 0}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-600">Waiting</p>
                <p className="font-medium">#{currentToken > 0 ? currentToken + 2 : 0}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="text-sm text-gray-600">Waiting</p>
                <p className="font-medium">#{currentToken > 0 ? currentToken + 3 : 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contacts</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Emergency Room</p>
                <p className="text-sm text-gray-600">Ext. 911</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">ICU</p>
                <p className="text-sm text-gray-600">Ext. 912</p>
              </div>
            </div>
          </div>
        </div>

        {/* Drug Inventory Status */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pharmacy Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Emergency Medicines</span>
              <span className={`font-medium ${inventory.emergency === 'Well Stocked' ? 'text-green-600' : inventory.emergency === 'Medium Stock' ? 'text-yellow-600' : 'text-red-600'}`}>
                {inventory.emergency}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Common Medications</span>
              <span className={`font-medium ${inventory.common === 'Well Stocked' ? 'text-green-600' : inventory.common === 'Medium Stock' ? 'text-yellow-600' : 'text-red-600'}`}>
                {inventory.common}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Specialty Drugs</span>
              <span className={`font-medium ${inventory.specialty === 'Well Stocked' ? 'text-green-600' : inventory.specialty === 'Medium Stock' ? 'text-yellow-600' : 'text-red-600'}`}>
                {inventory.specialty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Alerts */}
      {emergencyAlert ? (
        <div className="mt-6">
          <div className={`border-l-4 p-4 ${getAlertColor(emergencyAlert.type)}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {emergencyAlert.type} - {emergencyAlert.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className={`border-l-4 p-4 bg-green-100 border-green-500 text-green-700`}>
            <div className="flex items-center">
              <div className="ml-3">
                <p className="font-medium">NA</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDisplay;