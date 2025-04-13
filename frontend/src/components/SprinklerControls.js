import { useState, useEffect } from 'react';

function SprinklerControls({ updateDeviceStatus }) {
  const [isOn, setIsOn] = useState(true);
  const [flowRate, setFlowRate] = useState(50); // Débit en %

  const toggleSprinkler = () => {
    setIsOn(prev => !prev);
  };

  useEffect(() => {
    updateDeviceStatus('sprinkler', isOn ? 'Allumé' : 'Éteint');
  }, [isOn, updateDeviceStatus]);

  return (
    <div className="sprinkler-controls">
      {isOn && (
        <div className="temperature-control">
          <label>Débit d'eau :</label>
          <input
            type="range"
            min="0"
            max="100"
            value={flowRate}
            onChange={(e) => setFlowRate(Number(e.target.value))}
          />
          <span>{flowRate}%</span>
        </div>
      )}

      <button className="switch" onClick={toggleSprinkler}>
        {isOn ? 'Éteindre l’arrosage' : 'Allumer l’arrosage 💦'}
      </button>
    </div>
  );
}

export default SprinklerControls;
