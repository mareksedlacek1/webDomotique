import { useState, useEffect } from 'react';

function LampControls({ updateDeviceStatus }) {
    const [red, setRed] = useState(128);
    const [green, setGreen] = useState(128);
    const [blue, setBlue] = useState(128);
    const [isOn, setIsOn] = useState(true); // Etat pour la lampe (allumée/éteinte)

    // Fonction pour allumer/éteindre la lampe
    const toggleLamp = () => {
        setIsOn(prevState => !prevState);
    };

    // Mise à jour de l'état dans le composant parent lorsque l'état de la lampe change
    useEffect(() => {
        updateDeviceStatus('lamp', isOn ? 'Allumé' : 'Éteint');
    }, [isOn, updateDeviceStatus]);

    return (
        <div className="lamp-controls">
            {isOn && (
                <>
                    <label>Rouge: {red}</label>
                    <input type="range" min="0" max="255" value={red} onChange={(e) => setRed(Number(e.target.value))} />

                    <label>Vert: {green}</label>
                    <input type="range" min="0" max="255" value={green} onChange={(e) => setGreen(Number(e.target.value))} />

                    <label>Bleu: {blue}</label>
                    <input type="range" min="0" max="255" value={blue} onChange={(e) => setBlue(Number(e.target.value))} />

                    <div
                        style={{
                            marginTop: '10px',
                            height: '40px',
                            backgroundColor: `rgb(${red}, ${green}, ${blue})`,
                            border: '1px solid #ccc',
                            borderRadius: '8px'
                        }}
                    />
                </>
            )}
            <button className="switch" onClick={toggleLamp} style={{ marginBottom: '10px' }}>
                {isOn ? 'Éteindre la lampe' : 'Allumer la lampe '}
            </button>
        </div>
    );
}

export default LampControls;
