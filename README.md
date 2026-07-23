# Lernprofil-Coach

PWA für einen quantifizierbaren Lernversuch zur Bestimmung individueller Lernpräferenzen.

## Version 0.2.0

Die technische Basis ist um die erste echte Versuchseinheit erweitert worden.

Enthalten sind:

- Teilnehmerprofil mit geschützter Eltern-PIN
- acht voneinander getrennte Einheiten im Versuchsplan
- vollständige Versuchseinheit 1
- objektiver Vorwissenstest mit Reservethema
- standardisierte Lernzeit von sechs Minuten
- freie Erinnerung mit Eltern-Checkliste
- zwei Verständnisfragen mit 0–2-Punkte-Rubrik
- automatische Bewertung einer Ablaufreihenfolge
- zwei Übertragungsfragen
- subjektive Einschätzung von Anstrengung, Interesse, Sicherheit und Wiederholungsbereitschaft
- Erinnerungstest nach 24 Stunden
- Testmodus mit zweiminütiger Wartezeit
- lokale Speicherung und JSON-Sicherung

## Unabhängigkeit der Einheiten

Jede Einheit erhält ein eigenes Thema und einen eigenen Datensatz. Ein Thema wird nur einmal gelernt. Die nächste neue Lernphase soll später erst nach dem Erinnerungstest der vorherigen Einheit freigeschaltet werden. Lernbedingungen und Zwischenergebnisse werden während des Versuchs nicht angezeigt.

Version 0.2.0 enthält zunächst nur die vollständige Einheit 1. Die Einheiten 2 bis 8 sind technisch vorbereitet, aber noch nicht mit Lernmaterial gefüllt.

## Normaler Aufruf

```text
https://DEIN-NAME.github.io/Lernprofil-Coach/
```

Hier beträgt die Wartezeit bis zum Erinnerungstest 24 Stunden.

## Technischer Testmodus

```text
https://DEIN-NAME.github.io/Lernprofil-Coach/?testmodus=1
```

Im Testmodus wird der Erinnerungstest nach zwei Minuten freigeschaltet. Die Ergebnisse dürfen nicht als echtes Lernprofil verwendet werden.

## Update über GitHub

1. ZIP-Datei entpacken.
2. Im Repository **Add file → Upload files** öffnen.
3. Alle entpackten Dateien und den Ordner `icons` hochladen.
4. Vorhandene Dateien ersetzen lassen.
5. Commit-Nachricht: `Version 0.2.0 – erste echte Versuchseinheit`
6. Nach dem Deployment die Seite mit `?v=020` neu laden.

## Dateien

```text
index.html
styles.css
modules.js
experiment-data.js
app.js
manifest.webmanifest
service-worker.js
README.md
.nojekyll
icons/
```

## Datenschutz

Die App überträgt keine Versuchsdaten an einen Server. Alle Angaben und Ergebnisse bleiben im Browser und können als JSON-Datei exportiert werden.
