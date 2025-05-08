# Meldeportal gegen Diskriminierung - Bachelorprojekt 

## Backend


## Frontend

Start dev server:
npm start 

## Verwendete Technologien & Bibliotheken

Dieses Projekt verwendet unter anderem folgende Open-Source-Bibliotheken:

- [React](https://reactjs.org/) – JavaScript-Bibliothek für Benutzeroberflächen (MIT)
- [React Router](https://reactrouter.com/) – Routing für React-Anwendungen (MIT)
- [Material UI (MUI)](https://mui.com/) – React-Komponentenbibliothek basierend auf Material Design (MIT)
- [Emotion](https://emotion.sh/docs/introduction) – CSS-in-JS-Bibliothek zur Styling-Erstellung (MIT)
- [Leaflet](https://leafletjs.com/) – JavaScript-Kartenbibliothek (BSD 2-Clause)
- [React Leaflet](https://react-leaflet.js.org/) – React-Bindings für Leaflet (MIT)
- [OpenStreetMap](https://www.openstreetmap.org/) – Kartendaten unter der Open Database License (ODbL)
- [@turf/boolean-point-in-polygon](https://turfjs.org/) – Geodatenanalyse (MIT)
- [Testing Library](https://testing-library.com/) – Testwerkzeuge für React-Komponenten (MIT)
- [Prettier](https://prettier.io/) – Code-Formatter (MIT)

## Nutzung von Kartendaten

Diese Anwendung verwendet Kartendaten von **OpenStreetMap**, die über den **FOSSGIS e.V.** Tile-Server bereitgestellt werden. Die Kartenkacheln werden von den Servern von [FOSSGIS](https://www.fossgis.de/) in Deutschland geladen.

### Lizenz und Nutzung

- **Nicht-kommerzielle Nutzung**: Die Nutzung der Kartenkacheln ist auf nicht-kommerzielle Projekte beschränkt. Jegliche kommerzielle Nutzung ist untersagt.
- **Attribution**: Die Kacheln werden mit folgender Attribution bereitgestellt:
  > „© OpenStreetMap-Mitwirkende, Tiles courtesy of FOSSGIS e.V.“
- **Fair Use**: Bitte beachte, dass unnötige Anfragen an den Server vermieden werden sollten, um eine Überlastung zu verhindern. Eine lokale Speicherung oder das Vorladen großer Bereiche der Kartenkacheln ist ebenfalls nicht gestattet.

### Datenschutz

Beim Laden der Karten werden **IP-Adressen an die FOSSGIS-Server übermittelt**. Weitere Informationen zum Datenschutz und der Nutzung von OpenStreetMap-Daten findest du in der Datenschutzerklärung von [FOSSGIS](https://www.fossgis.de/arbeitsgruppen/osm-server/nutzungsbedingungen/).

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](https://opensource.org/licenses/MIT).  
© 2025 Carina Jin Hertel

Weitere Lizenzinformationen befinden sich in der Datei [`LICENSE`](./frontend/LICENSE).