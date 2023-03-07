# Web Programming Lab - Vereinsverwaltung Backend
In diesem Repository enthalten ist das Backend des Projekts "Vereinsverwaltung" im Modul Web Programming Lab. Die Ausführumgebung ist dabei [NodeJS](https://nodejs.org/) LTS v18.14.0.
## Installation
1. ```git clone https://github.com/TheRealNoe/weblab-vereinsverwaltung-backend.git```
2. ```npm ci```
## Ausführen
1. ```cd weblab-vereinsverwaltung-backend```
2. Erstellen der .env Datei mit folgenden Variabeln:
    - ```MONGODB_CONN_STRING```: Verbindungsstring zu MonogDB-Datenbank
    - ```MONGODB_NAME```: Datenbankname
    - ```TOKEN_KEY```: Privater Schlüssel zur Erzeugung und Prüfung von Passwörter
3. ```npm run start``` order mit Nodemon ```npm run devserver```
## Tooling
- [ajv](https://www.npmjs.com/package/ajv) v8.12.0
- [ajv-formats](https://www.npmjs.com/package/ajv-formats) v2.1.1
- [bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.0
- [cors](https://www.npmjs.com/package/cors) v2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv) v16.0.3
- [express](https://www.npmjs.com/package/express) v4.18.3
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) v9.0.0
- [moment](https://www.npmjs.com/package/moment) v2.29.4
- [mongodb](https://www.npmjs.com/package/mongodb) v5.0.1
- [prettier](https://www.npmjs.com/package/prettier) v2.8.4
