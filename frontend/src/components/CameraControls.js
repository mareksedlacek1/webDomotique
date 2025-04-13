import React, { useState, useEffect } from 'react';

function CameraControls({ updateDeviceStatus }) {
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Fonction pour basculer l'état de la caméra
  const handleToggleCamera = () => {
    setIsCameraActive(prevState => !prevState);
  };

  // Mise à jour du statut dans le composant parent
  useEffect(() => {
    updateDeviceStatus('camera', isCameraActive ? 'Allumé' : 'Éteint');
  }, [isCameraActive, updateDeviceStatus]);

  return (
    <div className="camera-controls">
      <div className="camera-image">
        {isCameraActive && (
          <img
            src="https://th.bing.com/th/id/R.affa1ced418e8234d38d4df6888dddad?rik=dX3cEKCRkPB6mQ&riu=http%3a%2f%2flecomptoirdeviolette.fr%2fwp-content%2fuploads%2f2017%2f07%2fD%c3%a9coration-en-bois-maison.jpg&ehk=z0JinVv6aQ5NorRwOaSL879E2CP1Wz7ygy3%2fLeBPGCs%3d&risl=&pid=ImgRaw&r=0"
            alt="Caméra"
          />
        )}
      </div>

      <div className="camera-controls-buttons">
        <button className="switch" onClick={handleToggleCamera}>
          {isCameraActive ? 'Éteindre la caméra' : 'Allumer la caméra 🎥'}
        </button>
      </div>
    </div>
  );
}

export default CameraControls;
