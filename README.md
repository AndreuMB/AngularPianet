# PIANET
El objecitu del projecte es una pàgina web on es pugen escriure i guardar partitures 
amés de poder compartirles i descarregarles com en una red social.
La aplicacio esta desplegada en webpack, utilitza Firebase de backend i Angular en el frontend.

## LLIBRERIES
Llibreries més importants utilizades al projecte:
- Webpack per desplegar el projecte
- VexFlow per renderizar i manipular les partitures
- Bootstrap per al css
- rxjs per la programació reactiva

## FIREBASE (BD)
Les conexions i peticions a BD estan totes en la carpeta service.

## ESTRUCTURA
Cada pàgina de la web es un component situat a la carpeta components amb el seu css, html i ts específic. Les dades de la BD se soliciten desde els fixers de la carpeta service, les interficies en la carpeta interfaces (en aquest cas sols e utilizat una) i les pipes personalizades en la carpeta pipes. 

## PÀGINES I FITXERS
- app.component.html : Se encarrega de el routing per carregar les diferents pàgines de la aplicació.
### COMPONENTS
- compose : Per a compondre una partitura de manera dinàmica, si estas loggeat es pot guardar en la BD.
- home : Primera pagina que es veu al accedir a la web. Esta inacabada amb dades de example, pero la intencio seria que mostrara partitures de la BD.
- login : Login de la app necesites estar registrat, una vegada amb un compte pots gestionar les teues partitures.
- register : Registre de la app per crearse el teu usuari.
- sheets : (Necessites estar loggeat) Llista les teues partitures i permet crear més, borrarles i accedir a elles per modificarles.
- sheet-details : (Necessites estar loggeat) Partitura de la BD on pots modificarla afegint notes en els botons que hi ha al peu de la pagina, per a guardar els canvis fer click en el botó save.
### INTERFACES
- sheets : Es la interficie utilitzada per guardar la informació de les partitures en BD i tractar les seues dade.
### SERVICE
- register : Totes les peticions a BD sobre els usuaris o les seues dades menys les partitures.
- sheets : Totes les peticions sobre les partitures, he decidit fero en un fitxer diferent perque eren moltes peticions i el fitxer register es faria molt complex de llegir.
### PIPES
- sheet-title : Se encarrega de retornar una llista de Sheets que coinsidixquen amb un parametre string.