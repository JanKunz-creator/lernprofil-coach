# Lernprofil-Coach

Progressive Web App für einen quantifizierbaren Lernversuch.

## Version 0.3.0

Enthalten sind:

- Teilnehmerprofil und geschützter Elternbereich
- Eltern-PIN mit doppelter Eingabe bei der Ersteinrichtung
- Versuchseinheit 1: bildlich-strukturierte Lernbedingung
- Versuchseinheit 2: auditiv-sprachliche Lernbedingung
- unabhängige Reservethemen bei zu hohem Vorwissen
- Vorwissenstest, Soforttest und Erinnerungstest
- Erinnerungstest nach 12 Stunden, im Testmodus nach 2 Minuten
- Speicherung des tatsächlichen Abrufabstands
- lokale Speicherung und JSON-Export
- Offline-Cache einschließlich der Audioaufnahmen

## Versuchslogik

Jede Einheit verwendet ein eigenes Thema. Die nächste Einheit wird erst freigeschaltet, wenn der Erinnerungstest der vorherigen Einheit abgeschlossen wurde. Die App zeigt während des Versuchs keine Zwischenrangliste und keine Punktwerte.

## GitHub Pages

- Source: Deploy from a branch
- Branch: main
- Folder: /(root)
