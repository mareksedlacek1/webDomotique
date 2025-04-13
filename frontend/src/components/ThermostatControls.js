import React, { useState, useEffect } from 'react';

function ThermostatControls({ device, onCurrentTempChange, updateDeviceStatus }) {
  const [currentTemp, setCurrentTemp] = useState(device?.currentTemp ?? 20);
  const [temperatureStarted, setTemperatureStarted] = useState(false);
  const [heatingOn, setHeatingOn] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTemperatureStarted(true);
    }, 1000);

    const interval = setInterval(() => {
      if (temperatureStarted && typeof device.targetTemp === 'number') {
        setCurrentTemp(prev => {
          const diff = device.targetTemp - prev;
          const step = diff > 0 ? 0.2 : (diff < 0 ? -0.1 : 0);
          const newTemp = parseFloat((prev + step).toFixed(1));
          
          // Notifie le parent de la nouvelle température actuelle
          onCurrentTempChange(newTemp);

          return newTemp;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [device.targetTemp, temperatureStarted]);

  const handleTempChange = (e) => {
    device.targetTemp = parseFloat(e.target.value);
  };

  const toggleHeating = () => {
    setHeatingOn(prevState => !prevState);
    // Met à jour le statut du chauffage dans le parent
    updateDeviceStatus('thermostat', heatingOn ? 'Éteint' : 'Allumé');
  };

  return (
    <div className="thermostat-controls">
      {heatingOn && (
        <div className="temperature-control">
          <label htmlFor="tempRange">Réglage de la température</label>
          <input
            id="tempRange"
            type="range"
            min="10"
            max="30"
            step="0.5"
            value={device.targetTemp}
            onChange={handleTempChange}
          />
          <span>{device.targetTemp}°C</span>
        </div>
      )}
      
      <button 
        className="switch"
        onClick={toggleHeating}
        style={{ marginBottom: '10px' }}
      >
        {heatingOn ? 'Éteindre chauffage' : 'Allumer chauffage 🌡'}
      </button>
    </div>
  );
}

export default ThermostatControls;
