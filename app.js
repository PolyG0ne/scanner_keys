// Application de Scanner de Code-Barres pour Rendez-vous
let appointments = [];
let isScanning = false;

// Éléments DOM
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const searchButton = document.getElementById('searchButton');
const manualBarcodeInput = document.getElementById('manualBarcode');
const resultSection = document.getElementById('result-section');
const errorSection = document.getElementById('error-section');
const appointmentDetails = document.getElementById('appointmentDetails');
const errorMessage = document.getElementById('errorMessage');
const statusMessage = document.getElementById('statusMessage');
const lastScanned = document.getElementById('lastScanned');

// Charger la base de données JSON au démarrage
async function loadAppointments() {
    try {
        const response = await fetch('appointments.json');
        appointments = await response.json();
        console.log('Base de données chargée:', appointments.length, 'rendez-vous');
        updateStatus('Base de données chargée - Prêt à scanner');
    } catch (error) {
        console.error('Erreur lors du chargement de la base de données:', error);
        showError('Erreur lors du chargement de la base de données');
    }
}

// Initialiser le scanner QuaggaJS
function initScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'),
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment"
            }
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
            ],
            debug: {
                showCanvas: true,
                showPatches: false,
                showFoundPatches: false,
                showSkeleton: false,
                showLabels: false,
                showPatchLabels: false,
                showRemainingPatchLabels: false,
                boxFromPatches: {
                    showTransformed: false,
                    showTransformedBox: false,
                    showBB: false
                }
            }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: 4,
        frequency: 10,
        locate: true
    }, function(err) {
        if (err) {
            console.error('Erreur d\'initialisation du scanner:', err);
            showError('Erreur d\'initialisation de la caméra. Vérifiez les permissions.');
            return;
        }
        console.log("Scanner initialisé avec succès");
        Quagga.start();
        isScanning = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        updateStatus('Scanner actif - Présentez un code-barres');
    });

    // Écouter les détections de code-barres
    Quagga.onDetected(onBarcodeDetected);
}

// Arrêter le scanner
function stopScanner() {
    if (isScanning) {
        Quagga.stop();
        isScanning = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        updateStatus('Scanner arrêté');
    }
}

// Callback quand un code-barres est détecté
function onBarcodeDetected(result) {
    const code = result.codeResult.code;
    console.log('Code-barres détecté:', code);

    // Éviter les détections multiples rapides
    if (lastScanned.textContent.includes(code)) {
        return;
    }

    lastScanned.textContent = `Dernier code scanné: ${code}`;
    searchAppointment(code);

    // Optionnel: arrêter le scanner après une détection réussie
    // stopScanner();
}

// Rechercher un rendez-vous par code-barres
function searchAppointment(barcode) {
    hideError();
    hideResult();

    const appointment = appointments.find(apt => apt.barcode === barcode);

    if (appointment) {
        displayAppointment(appointment);
    } else {
        showError(`Aucun rendez-vous trouvé pour le code-barres: ${barcode}`);
    }
}

// Afficher les détails du rendez-vous
function displayAppointment(appointment) {
    const html = `
        <div class="info-row">
            <span class="info-label">Code-barres:</span>
            <span class="info-value">${appointment.barcode}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Patient:</span>
            <span class="info-value">${appointment.patientName}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Médecin:</span>
            <span class="info-value">${appointment.doctorName}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Date:</span>
            <span class="info-value">${formatDate(appointment.date)}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Heure:</span>
            <span class="info-value">${appointment.time}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Service:</span>
            <span class="info-value">${appointment.department}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Salle:</span>
            <span class="info-value">${appointment.room}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Notes:</span>
            <span class="info-value">${appointment.notes}</span>
        </div>
    `;

    appointmentDetails.innerHTML = html;
    resultSection.classList.remove('hidden');
    updateStatus('Rendez-vous trouvé!');
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// Afficher une erreur
function showError(message) {
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
    updateStatus('Erreur de recherche');
}

// Masquer l'erreur
function hideError() {
    errorSection.classList.add('hidden');
}

// Masquer les résultats
function hideResult() {
    resultSection.classList.add('hidden');
}

// Mettre à jour le statut
function updateStatus(message) {
    statusMessage.textContent = message;
}

// Event Listeners
startButton.addEventListener('click', () => {
    initScanner();
});

stopButton.addEventListener('click', () => {
    stopScanner();
});

searchButton.addEventListener('click', () => {
    const barcode = manualBarcodeInput.value.trim();
    if (barcode) {
        searchAppointment(barcode);
        lastScanned.textContent = `Dernier code recherché: ${barcode}`;
    } else {
        showError('Veuillez entrer un code-barres');
    }
});

manualBarcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Charger les données au démarrage
loadAppointments();

// Nettoyer quand la page est fermée
window.addEventListener('beforeunload', () => {
    if (isScanning) {
        stopScanner();
    }
});
