import { useEffect } from 'react';

function EmergencyAlert({ alerts }) {
  useEffect(() => {
    // Play alert sound when new emergency alert is received
    if (alerts.length > 0) {
      const audio = new Audio('/alert-sound.mp3');
      audio.play().catch(error => console.log('Audio playback failed:', error));
    }
  }, [alerts.length]);

  if (alerts.length === 0) return null;

  const getAlertStyles = (type) => {
    return type === 'Code Blue'
      ? 'bg-blue-600 border-blue-700'
      : 'bg-red-600 border-red-700';
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert._id}
          className={`border-l-4 p-4 animate-pulse ${getAlertStyles(alert.type)}`}
          role="alert"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-2xl font-bold text-white">
                {alert.type} - Emergency Alert
              </p>
              <p className="mt-1 text-lg text-white">
                Location: {alert.location}
              </p>
              {alert.description && (
                <p className="mt-1 text-white">{alert.description}</p>
              )}
            </div>
            <div className="ml-4">
              <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-sm font-medium">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmergencyAlert;