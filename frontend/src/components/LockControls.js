import { useState, useEffect } from 'react';

function LockControls({ updateDeviceStatus }) {
    const [isOn, setIsOn] = useState(true); // Allumé = vrai, Éteint = faux

    const toggleLock = () => {
        setIsOn(prev => !prev);
    };

    useEffect(() => {
        updateDeviceStatus('lock', isOn ? 'Allumé' : 'Éteint');
    }, [isOn, updateDeviceStatus]);

    return (

        <>
            <div className="lock-controls">

                <button className="switch" onClick={toggleLock}>
                    {isOn ? 'Déverrouiller 🔓' : 'Verrouiller 🔒'}
                </button>

            </div>
        </>


    );

}

export default LockControls;
