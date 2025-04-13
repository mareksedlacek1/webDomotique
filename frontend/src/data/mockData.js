export const mockData = {
  connectedDevices: [
    { 
      id: 'Thermo123', 
      name: 'Thermostat Salon', 
      type: 'thermostat', 
      temperature: 21, 
      targetTemperature: 23, 
      mode: 'Automatique', 
      connectivity: 'Wi-Fi', 
      batteryStatus: 65, 
      lastInteraction: '2024-04-10 10:00 AM', 
      access: ['simple', 'complex', 'admin'], // Utilisateurs enregistrés
      
    },
    {
      id: 'Cam123',
      name: 'Caméra Salon',
      type: 'camera',
      status: 'Active',
      connectivity: 'Wi-Fi',
      batteryStatus: 80,
      lastInteraction: '2024-04-10 09:00 AM',
      access: ['simple', 'complex', 'admin'],
      image: 'https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png' // ✅ juste une URL
    },
    
    { 
      id: 'Lamp456', 
      name: 'Lampe Salon', 
      type: 'lamp', 
      status: 'Off', 
      connectivity: 'Bluetooth', 
      batteryStatus: 40, 
      lastInteraction: '2024-04-10 08:30 AM', 
      access: ['simple', 'complex', 'admin'],
      image: 'https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png' // ✅ juste une URL
    },
    { 
      id: 'SmartPlug789', 
      name: 'Arrosage', 
      type: 'sprinkler', 
      status: 'Off', 
      connectivity: 'Wi-Fi', 
      batteryStatus: 100, 
      lastInteraction: '2024-04-10 07:00 AM', 
      access: ['simple', 'complex', 'admin'],
    },
    { 
      id: 'SmartLock101', 
      name: 'Serrure Garage', //nom affiché sur la page
      type: 'lock',           //nom utilisé pour le trouver dans le code
      status: 'Locked', 
      connectivity: 'Bluetooth', //affichage
      batteryStatus: 55,          //affichage
      lastInteraction: '2024-04-09 06:00 PM', //affichage
      access: ['complex', 'admin'],
    }
  ]
};
