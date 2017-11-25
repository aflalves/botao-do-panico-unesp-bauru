# This project was developed by André Fonseca Leopoldino Alves with the mentoring of Profa Dra Simone das Graças Domingues Prado as the final project of my computer science graduation course.

# Botão do Pãnico UNESP Bauru
Panic Button - UNESP Bauru is a safety app for emergency situations that occur inside the campus Bauru of the São Paulo State University.

#General setup:
This application uses NodeJS, so make sure you have that installed: https://nodejs.org/en/download/

#Mobile App Setup:
Install the Ionic Framework & Cordava: npm install -g ionic cordova
Install geolocation plugin: ionic cordova plugin add cordova-plugin-geolocation

#Running the project: 
npm run ionic:serve

#Build mobile app:
ionic cordova build android

#run android:
ionic cordova run android --device

#webapp: 
ng build --prod --aot=false

firebase deploy

Policy:

This Mobile Application will access your geolocation and SIM information.
