import React, { useState } from 'react';
import '../styles/SmartDeviceCard.css';
import ThermostatControls from './ThermostatControls';
import LampControls from './LampControls';
import CameraControls from './CameraControls';
import LockControls from './LockControls';
import SprinklerControls from './SprinklerControls';

function SmartDeviceCard({ device }) {
  const [currentTemp, setCurrentTemp] = useState(device?.currentTemp ?? 20);
  const [lampStatus, setLampStatus] = useState(device?.status === 'on' ? 'Allumé' : 'Éteint');
  const [cameraStatus, setCameraStatus] = useState(device?.status === 'on' ? 'Allumé' : 'Éteint');
  const [thermostatStatus, setThermostatStatus] = useState(device?.status === 'on' ? 'Allumé' : 'Éteint');
  const [lockStatus, setLockStatus] = useState(device?.status === 'on' ? 'Allumé' : 'Éteint');
  const [sprinklerStatus, setSprinklerStatus] = useState(device?.status === 'on' ? 'Allumé' : 'Éteint');
  
  const updateDeviceStatus = (deviceType, newStatus) => {
    device.status = newStatus === 'Allumé' ? 'on' : 'off'; 
    switch (deviceType) {
      case 'lamp':
        setLampStatus(newStatus);
        break;
      case 'camera':
        setCameraStatus(newStatus);
        break;
      case 'thermostat':
        setThermostatStatus(newStatus);
        break;
      case 'lock':
        setLockStatus(newStatus);
        break;
      case 'sprinkler':
        setSprinklerStatus(newStatus);
        break;
      default:
        break;
    }
  };
  
  const handleCurrentTempChange = (newTemp) => {
    setCurrentTemp(newTemp);
  };

  if (!device) {
    return <div className="smart-device-card">Aucun appareil sélectionné</div>;
  }

  return (
    <div className="smart-device-card">
      <h3>{device.name || 'Nom inconnu'}</h3>

      {/* Affichage des infos spécifiques */}
      {device.type === 'thermostat' && (
        <>
          <p><strong>État :</strong> {thermostatStatus}</p>
          <p><strong>Temp. actuelle :</strong> {currentTemp.toFixed(1)}°C</p>
          <p><strong>Temp. cible :</strong> {typeof device.targetTemp === 'number' ? `${device.targetTemp.toFixed(1)}°C` : 'N/A'}</p>
        </>
      )}

      {device.type === 'lamp' && (
        <p><strong>État :</strong> {lampStatus}</p>
      )}

      {device.type === 'camera' && (
        <p><strong>État :</strong> {cameraStatus}</p>
      )}

      {device.type === 'lock' && (
        <p><strong>État :</strong> {lockStatus}</p>
      )}

      {device.type === 'sprinkler' && (
        <p><strong>État :</strong> {sprinklerStatus}</p>
      )}

      <p><strong>Connectivité :</strong> {device.connectivity || 'Non spécifiée'}</p>

      <br />
      <hr />

      {/* Contrôles spécifiques */}
      {device.type === 'thermostat' && (
        <ThermostatControls
          device={device}
          onCurrentTempChange={handleCurrentTempChange}
          updateDeviceStatus={updateDeviceStatus}
        />
      )}

      {device.type === 'lamp' && (
        <LampControls updateDeviceStatus={updateDeviceStatus} />
      )}

      {device.type === 'camera' && (
        <CameraControls updateDeviceStatus={updateDeviceStatus} />
      )}

      {device.type === 'lock' && (
        <LockControls updateDeviceStatus={updateDeviceStatus} />
      )}

      {device.type === 'sprinkler' && (
        <SprinklerControls updateDeviceStatus={updateDeviceStatus} />
      )}
    </div>
  );
}

export default SmartDeviceCard;
