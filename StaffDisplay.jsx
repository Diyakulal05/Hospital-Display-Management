import React, { useState } from 'react';

function StaffDisplay({ onScheduleUpdate, onInventoryUpdate, onAlertUpdate, onNextToken, onPreviousToken, onResetToken, currentToken }) {
  const [scheduleForm, setScheduleForm] = useState({
    room: '',
    procedure: '',
    time: '',
    doctor: ''
  });

  const [inventoryForm, setInventoryForm] = useState({
    medicine: '',
    status: 'Well Stocked'
  });

  const [alertForm, setAlertForm] = useState({
    type: 'Code Blue',
    location: '',
    message: ''
  });

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    onScheduleUpdate(scheduleForm);
    setScheduleForm({ room: '', procedure: '', time: '', doctor: '' });
  };

  const handleInventorySubmit = (e) => {
    e.preventDefault();
    onInventoryUpdate(inventoryForm.medicine, inventoryForm.status);
    setInventoryForm({ medicine: '', status: 'Well Stocked' });
  };

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    onAlertUpdate(alertForm);
    setAlertForm({ type: 'Code Blue', location: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Schedule</h2>
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Room/Theater</label>
              <input
                type="text"
                value={scheduleForm.room}
                onChange={(e) => setScheduleForm({...scheduleForm, room: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Procedure</label>
              <input
                type="text"
                value={scheduleForm.procedure}
                onChange={(e) => setScheduleForm({...scheduleForm, procedure: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor</label>
              <input
                type="text"
                value={scheduleForm.doctor}
                onChange={(e) => setScheduleForm({...scheduleForm, doctor: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Update Schedule
            </button>
            <button
              onClick={() => setScheduleForm({ room: '', procedure: '', time: '', doctor: '' })}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            >
              Reset Schedule
            </button>
          </form>
        </div>

        {/* Inventory Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Inventory</h2>
          <form onSubmit={handleInventorySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Medicine Category</label>
              <input
                type="text"
                value={inventoryForm.medicine}
                onChange={(e) => setInventoryForm({...inventoryForm, medicine: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="emergency, common, or specialty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={inventoryForm.status}
                onChange={(e) => setInventoryForm({...inventoryForm, status: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option>Well Stocked</option>
                <option>Medium Stock</option>
                <option>Low Stock</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            >
              Update Inventory
            </button>
          </form>
        </div>

        {/* Token Queue Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Queue Management</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-lg font-medium text-blue-800">Current Token: #{currentToken}</p>
            </div>
            <button
              onClick={onNextToken}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Call Next Token
            </button>
            <button
              onClick={onPreviousToken}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            >
              Call Previous Token
            </button>
            <button
              onClick={onResetToken}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Reset Queue
            </button>
          </div>
        </div>
        {/* Emergency Alert Management */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Broadcast Alert</h2>
          <form onSubmit={handleAlertSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Alert Type</label>
              <select
                value={alertForm.type}
                onChange={(e) => setAlertForm({...alertForm, type: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option>Code Blue</option>
                <option>Code Red</option>
                <option>Code Black</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={alertForm.location}
                onChange={(e) => setAlertForm({...alertForm, location: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                value={alertForm.message}
                onChange={(e) => setAlertForm({...alertForm, message: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Broadcast Alert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StaffDisplay;