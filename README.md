# Verkefni 10

## Unnin af: Jaan Jaerving

Útfært var vefsíða sem sækir mynd af handahófi frá NASA.

## Aukastig

Hægt er að næla sér í aukastig ef passað er að myndskeið verði birt rétt í þau fáu skipti sem APOD skilar myndskeiði í staðin fyrir mynd.

Þetta var gert með því að fela apod__img og útfæra responsive iframe element með displayVideo(src) fallið ef myndskeið er fengin í staðinn fyrir mynd.

## NASA APOD API
Í þessu verkefni var notað API sem NASA býður upp á.
 * https://api.nasa.gov/

Notast var við `Astronomy Picture of the Day` Apann

## Forsíða

Þegar forsíðan er hlaðinn er sótt mynd frá NASA API. Hún er birt strax ásamt titil myndarinnar og útskýringar texta. Á forsíðunni eru síðan 3 takkar. 
 * Þegar smellt er á efsta takkann er ný mynd sótt frá NASA og birt. Valið á mynd skal vera handahófskennt.
 * Þegar smellt er á miðju takkann þá er núverandi mynd vistuð í Local Storage.
 * Þegar smellt er á neðsta takkann þá er farið inná Favourites síðuna.

## Favourites

Á favourites síðunni er birt allar myndirnar sem hafa verið vistaðar ásamt titli þeirra.

## Mat

* 10% – Snyrtilegur kóði, engar villur þegar `npm test` er keyrt
* 30% – Virkni á forsíðu rétt.
* 30% – Vista myndir rétt
* 30% – Favourites birtir vistaðar myndir.
* 50% - Hægt er að næla sér í aukastig ef þið passið að birta youtube myndskeið í þeim tilfellum sem það gerist.

## Sett fyrir

<<<<<<< HEAD
Verkefni sett fyrir í  miðvikudaginn 13. nóvember 2019.
=======
Verkefni sett fyrir í  miðvikudaginn 13. nóvember 2019.
>>>>>>> a64fb161a3ad5c33e6a06ed7ac4c0b09463f7d6b
