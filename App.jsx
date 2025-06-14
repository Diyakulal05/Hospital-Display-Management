import { useState } from 'react'
import StaffDisplay from './components/StaffDisplay'
import PatientDisplay from './components/PatientDisplay'

function App() {
  const [currentView, setCurrentView] = useState('patient')
  const [schedule, setSchedule] = useState([])
  
  const [inventory, setInventory] = useState({
    emergency: 'Well Stocked',
    common: 'Medium Stock',
    specialty: 'Low Stock'
  })

  const [currentToken, setCurrentToken] = useState(0)
  const [emergencyAlert, setEmergencyAlert] = useState(null)

  const handleScheduleUpdate = (newSchedule) => {
    setSchedule([...schedule, newSchedule])
  }

  const handleInventoryUpdate = (medicine, status) => {
    setInventory(prev => ({ ...prev, [medicine.toLowerCase()]: status }))
  }

  const handleAlertUpdate = (alert) => {
    setEmergencyAlert(alert)
  }

  const handleNextToken = () => {
    setCurrentToken(prev => prev + 1)
  }

  const handlePreviousToken = () => {
    setCurrentToken(prev => (prev > 0 ? prev - 1 : 0));
  };
  const handleResetToken = () => {
    setCurrentToken(0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Hospital Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('patient')}
                className={`px-4 py-2 rounded-md ${currentView === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                Patient View
              </button>
              <button 
                onClick={() => setCurrentView('staff')}
                className={`px-4 py-2 rounded-md ${currentView === 'staff' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                Staff View
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {currentView === 'patient' ? (
        <PatientDisplay 
          schedule={schedule}
          inventory={inventory}
          currentToken={currentToken}
          emergencyAlert={emergencyAlert}
        />
      ) : (
        <StaffDisplay 
          onScheduleUpdate={handleScheduleUpdate}
          onInventoryUpdate={handleInventoryUpdate}
          onAlertUpdate={handleAlertUpdate}
          onNextToken={handleNextToken}
          onPreviousToken={handlePreviousToken}
          onResetToken={handleResetToken}
          currentToken={currentToken}
        />
      )}
    </div>
  )
}

export default App
