# Scanner de Code-Barres 1D - Consultation de Rendez-vous

Application web pour scanner des codes-barres 1D et consulter une base de données JSON de rendez-vous médicaux.

## Fonctionnalités

- Scanner de code-barres 1D en temps réel via la caméra
- Support de multiples formats de codes-barres (EAN, Code 128, Code 39, UPC, etc.)
- Recherche manuelle par saisie de code-barres
- Base de données JSON de rendez-vous
- Interface responsive et moderne
- Affichage complet des informations de rendez-vous

## Structure du Projet

```
scanner_keys/
├── index.html          # Interface principale
├── style.css           # Styles de l'application
├── app.js             # Logique de l'application
├── appointments.json  # Base de données des rendez-vous
└── README.md          # Documentation
```

## Installation et Utilisation

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur web local (nécessaire pour charger le fichier JSON)

### Lancement de l'application

1. Démarrer un serveur web local dans le dossier du projet:

   ```bash
   # Option 1: Avec Python 3
   python3 -m http.server 8000

   # Option 2: Avec Python 2
   python -m SimpleHTTPServer 8000

   # Option 3: Avec Node.js (npx)
   npx http-server -p 8000

   # Option 4: Avec PHP
   php -S localhost:8000
   ```

2. Ouvrir votre navigateur et accéder à:
   ```
   http://localhost:8000
   ```

3. Autoriser l'accès à la caméra lorsque le navigateur le demande

### Utilisation

#### Scanner un code-barres:

1. Cliquer sur "Démarrer le Scanner"
2. Autoriser l'accès à la caméra
3. Présenter un code-barres devant la caméra
4. Les informations du rendez-vous s'affichent automatiquement

#### Recherche manuelle:

1. Entrer le code-barres dans le champ de saisie
2. Cliquer sur "Rechercher" ou appuyer sur Entrée
3. Les informations du rendez-vous s'affichent

## Base de Données

Le fichier `appointments.json` contient les rendez-vous avec la structure suivante:

```json
{
  "barcode": "123456789012",
  "patientName": "Jean Dupont",
  "doctorName": "Dr. Martin",
  "date": "2025-10-28",
  "time": "09:30",
  "department": "Cardiologie",
  "room": "201",
  "notes": "Consultation de suivi"
}
```

### Codes-barres de test inclus:

- `123456789012` - Jean Dupont (Cardiologie)
- `234567890123` - Marie Lambert (Dermatologie)
- `345678901234` - Pierre Leroy (Orthopédie)
- `456789012345` - Sophie Moreau (Pédiatrie)
- `567890123456` - Luc Blanchard (Ophtalmologie)

## Personnalisation

### Ajouter des rendez-vous

Modifier le fichier `appointments.json` pour ajouter de nouveaux rendez-vous:

```json
[
  {
    "barcode": "VOTRE_CODE_BARRES",
    "patientName": "Nom du Patient",
    "doctorName": "Dr. Nom",
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "department": "Service",
    "room": "Numéro de salle",
    "notes": "Notes additionnelles"
  }
]
```

### Modifier les styles

Éditer `style.css` pour personnaliser l'apparence de l'application.

## Technologies Utilisées

- **HTML5** - Structure de l'application
- **CSS3** - Design et mise en page
- **JavaScript (ES6+)** - Logique de l'application
- **QuaggaJS** - Bibliothèque de scan de code-barres
- **Fetch API** - Chargement de la base de données JSON

## Support des Navigateurs

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Formats de Code-Barres Supportés

- Code 128
- EAN-13 / EAN-8
- Code 39
- Codabar
- UPC-A / UPC-E
- Interleaved 2 of 5 (I2of5)

## Licence

MIT License

## Auteur

Créé avec Claude Code
