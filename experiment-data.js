window.EXPERIMENT_CONFIG = {
  version: "0.2.0",
  learningSeconds: 360,
  delayedHours: 24,
  testModeDelayMinutes: 2,
  pretestExclusionThreshold: 2
};

window.EXPERIMENT_UNITS = {
  "unit-1": {
    id: "unit-1",
    conditionCode: "V1",
    primary: {
      id: "sprinkler",
      publicTitle: "Wie ein Feuersprinkler auslöst",
      pretest: [
        {
          id: "p1",
          prompt: "Was löst einen normalen Feuersprinkler direkt am Sprinklerkopf aus?",
          options: [
            { id: "a", text: "Rauch in der Raumluft" },
            { id: "b", text: "Ausreichend starke Wärme am Sprinklerkopf" },
            { id: "c", text: "Das Geräusch eines Rauchmelders" },
            { id: "d", text: "Eine Person in der Leitstelle" }
          ],
          correct: "b"
        },
        {
          id: "p2",
          prompt: "Öffnen sich bei einem Brand normalerweise sofort alle Sprinkler eines Gebäudes?",
          options: [
            { id: "a", text: "Ja, immer alle gleichzeitig" },
            { id: "b", text: "Nur die Sprinkler, die ausreichend stark erwärmt werden" },
            { id: "c", text: "Nur der Sprinkler am Gebäudeeingang" },
            { id: "d", text: "Das weiß ich nicht" }
          ],
          correct: "b"
        },
        {
          id: "p3",
          prompt: "Welche Aufgabe hat die kleine Glasampulle in vielen Sprinklerköpfen?",
          options: [
            { id: "a", text: "Sie färbt das Löschwasser" },
            { id: "b", text: "Sie misst den Rauchgehalt" },
            { id: "c", text: "Sie hält den Verschluss geschlossen und reagiert auf Wärme" },
            { id: "d", text: "Das weiß ich nicht" }
          ],
          correct: "c"
        }
      ],
      learning: {
        kicker: "Ein technischer Ablauf in fünf Schritten",
        intro: "Im dargestellten Nasssystem steht Wasser bereits unter Druck hinter einem Verschluss. Der Sprinklerkopf reagiert selbstständig auf Wärme.",
        steps: [
          { number: 1, icon: "●", title: "Geschlossen", text: "Eine Glasampulle hält den Verschluss im Sprinklerkopf fest." },
          { number: 2, icon: "↟", title: "Wärme steigt", text: "Heiße Luft sammelt sich unter der Decke und erwärmt den Sprinklerkopf." },
          { number: 3, icon: "↔", title: "Flüssigkeit dehnt sich aus", text: "Die Flüssigkeit in der Ampulle braucht bei Wärme mehr Platz." },
          { number: 4, icon: "✦", title: "Ampulle bricht", text: "Bei ihrer festgelegten Auslösetemperatur zerbricht die Glasampulle." },
          { number: 5, icon: "▼", title: "Wasser tritt aus", text: "Der Verschluss wird frei. Wasser trifft auf den Verteilteller und wird versprüht." }
        ],
        causeEffects: [
          { cause: "Mehr Wärme am Sprinklerkopf", effect: "Die Flüssigkeit dehnt sich stärker aus und die Ampulle bricht." },
          { cause: "Die Ampulle ist zerbrochen", effect: "Der Verschluss wird freigegeben und der Wasserdruck kann wirken." }
        ],
        facts: [
          "Ein Sprinklerkopf reagiert direkt auf Wärme, nicht direkt auf Rauch.",
          "Jeder Sprinklerkopf besitzt sein eigenes wärmeempfindliches Auslöseelement.",
          "Darum öffnen normalerweise nur ausreichend erhitzte Sprinklerköpfe.",
          "Im dargestellten Nasssystem steht Wasser schon hinter dem Verschluss bereit.",
          "Ein ausgelöster Sprinkler schließt sich nicht selbst wieder und muss ersetzt werden."
        ],
        takeaway: "Wärme verändert die Ampulle. Die gebrochene Ampulle gibt den Verschluss frei. Erst dadurch kann das Wasser austreten."
      },
      immediate: {
        recall: {
          prompt: "Erkläre mit eigenen Worten alles, woran du dich über den Sprinklerkopf erinnerst.",
          criteria: [
            "Er reagiert auf Wärme am Sprinklerkopf, nicht direkt auf Rauch.",
            "Eine Glasampulle hält den Verschluss geschlossen.",
            "Die Flüssigkeit in der Ampulle dehnt sich bei Wärme aus.",
            "Die Ampulle bricht bei einer festgelegten Temperatur und gibt den Verschluss frei.",
            "Wasser wird am Verteilteller versprüht; normalerweise öffnen nur erhitzte Köpfe."
          ]
        },
        understanding: [
          {
            prompt: "Warum kann dichter Rauch allein den dargestellten Sprinklerkopf normalerweise nicht öffnen?",
            rubric: [
              "0 Punkte: keine passende Erklärung oder Rauch wird als direkter Auslöser genannt.",
              "1 Punkt: Wärme wird als wichtig genannt, aber der Zusammenhang bleibt unvollständig.",
              "2 Punkte: Es wird erklärt, dass der Kopf auf Wärme reagiert, weil sich die Flüssigkeit ausdehnt und die Ampulle erst bei ausreichender Erwärmung bricht."
            ]
          },
          {
            prompt: "Warum öffnen bei einem kleinen Brand häufig nicht alle Sprinkler im Gebäude?",
            rubric: [
              "0 Punkte: keine passende Erklärung oder alle Köpfe würden zentral geöffnet.",
              "1 Punkt: Nur nahe Sprinkler werden genannt, aber ohne klares Prinzip.",
              "2 Punkte: Jeder Kopf besitzt ein eigenes Auslöseelement; nur ausreichend erwärmte Köpfe öffnen."
            ]
          }
        ],
        sequence: {
          prompt: "Bringe den Ablauf in die richtige Reihenfolge.",
          options: [
            { id: "heat", text: "Heiße Luft erwärmt den Sprinklerkopf." },
            { id: "expand", text: "Die Flüssigkeit in der Ampulle dehnt sich aus." },
            { id: "break", text: "Die Glasampulle zerbricht." },
            { id: "water", text: "Der Verschluss wird frei und Wasser tritt aus." }
          ],
          correctOrder: ["heat", "expand", "break", "water"]
        },
        transfer: [
          {
            id: "t1",
            prompt: "Zwei gleiche Sprinklerköpfe hängen im selben Raum. Kopf A wird stark erhitzt, Kopf B bleibt deutlich kühler. Was ist am wahrscheinlichsten?",
            options: [
              { id: "a", text: "Beide öffnen gleichzeitig." },
              { id: "b", text: "Nur Kopf A öffnet." },
              { id: "c", text: "Nur Kopf B öffnet." },
              { id: "d", text: "Keiner kann öffnen." }
            ],
            correct: "b",
            points: 2
          },
          {
            id: "t2",
            prompt: "Warum ist diese Vorhersage sinnvoll?",
            options: [
              { id: "a", text: "Alle Köpfe werden über ein gemeinsames Kabel gleichzeitig geöffnet." },
              { id: "b", text: "Jeder Kopf reagiert mit seiner eigenen Ampulle auf die Wärme an seinem Ort." },
              { id: "c", text: "Kühlere Luft lässt Wasser schneller fließen." },
              { id: "d", text: "Rauch verteilt sich nur an einer Stelle." }
            ],
            correct: "b",
            points: 2
          }
        ]
      },
      delayed: {
        recall: {
          prompt: "Erkläre noch einmal ohne Hilfe, wie der Sprinklerkopf funktioniert und wodurch er ausgelöst wird.",
          criteria: [
            "Wärme am Sprinklerkopf ist der direkte Auslöser, nicht Rauch allein.",
            "Die Glasampulle hält den Verschluss fest.",
            "Die Flüssigkeit in der Ampulle dehnt sich bei Erwärmung aus.",
            "Die Ampulle zerbricht und gibt den Verschluss frei.",
            "Wasser tritt aus und wird verteilt; andere kühle Köpfe können geschlossen bleiben."
          ]
        },
        understanding: [
          {
            prompt: "Ein Rauchmelder piept, aber der Raum bleibt kühl. Warum kann der Sprinkler trotzdem geschlossen bleiben?",
            rubric: [
              "0 Punkte: keine passende Erklärung.",
              "1 Punkt: Es wird gesagt, dass noch nicht genug Wärme vorhanden ist.",
              "2 Punkte: Es wird erklärt, dass der Sprinkler ein eigenes wärmeempfindliches Auslöseelement besitzt und das Signal des Rauchmelders die Glasampulle nicht öffnet."
            ]
          },
          {
            prompt: "Warum kann nach dem Zerbrechen der Ampulle plötzlich Wasser austreten?",
            rubric: [
              "0 Punkte: keine passende Erklärung.",
              "1 Punkt: Die Ampulle wird als Auslöser genannt, aber der Verschluss fehlt.",
              "2 Punkte: Die Ampulle hielt den Verschluss; nach dem Bruch wird dieser freigegeben und der vorhandene Wasserdruck kann das Wasser austreten lassen."
            ]
          }
        ],
        sequence: {
          prompt: "Ordne die Schritte vom Beginn bis zum Wasseraustritt.",
          options: [
            { id: "warm", text: "Der Kopf wird ausreichend warm." },
            { id: "liquid", text: "Die Flüssigkeit beansprucht mehr Raum." },
            { id: "glass", text: "Das Glas gibt nach und zerbricht." },
            { id: "release", text: "Der Verschluss wird freigegeben." }
          ],
          correctOrder: ["warm", "liquid", "glass", "release"]
        },
        transfer: [
          {
            id: "dt1",
            prompt: "Ein Sprinklerkopf ist für eine höhere Auslösetemperatur gebaut als ein anderer. Beide werden gleichmäßig erwärmt. Welcher öffnet wahrscheinlich später?",
            options: [
              { id: "a", text: "Der Kopf mit der höheren Auslösetemperatur." },
              { id: "b", text: "Der Kopf mit der niedrigeren Auslösetemperatur." },
              { id: "c", text: "Beide müssen immer genau gleichzeitig öffnen." },
              { id: "d", text: "Die Temperatur spielt keine Rolle." }
            ],
            correct: "a",
            points: 2
          },
          {
            id: "dt2",
            prompt: "Welche Begründung passt dazu?",
            options: [
              { id: "a", text: "Seine Ampulle muss stärker erwärmt werden, bevor sie zerbricht." },
              { id: "b", text: "Höhere Temperaturen machen Glas grundsätzlich unzerbrechlich." },
              { id: "c", text: "Er wird durch Rauch statt durch Wärme ausgelöst." },
              { id: "d", text: "Er enthält grundsätzlich kein Wasser." }
            ],
            correct: "a",
            points: 2
          }
        ]
      }
    },
    reserve: {
      id: "bimetal",
      publicTitle: "Wie ein Bimetall-Thermostat schaltet",
      pretest: [
        {
          id: "rp1",
          prompt: "Was ist ein Bimetallstreifen?",
          options: [
            { id: "a", text: "Zwei fest miteinander verbundene Metalle" },
            { id: "b", text: "Ein Metall mit zwei Farben" },
            { id: "c", text: "Ein besonders starker Magnet" },
            { id: "d", text: "Das weiß ich nicht" }
          ],
          correct: "a"
        },
        {
          id: "rp2",
          prompt: "Warum kann sich ein Bimetallstreifen bei Erwärmung krümmen?",
          options: [
            { id: "a", text: "Weil beide Metalle genau gleich stark wachsen" },
            { id: "b", text: "Weil sich die verbundenen Metalle unterschiedlich stark ausdehnen" },
            { id: "c", text: "Weil Wärme das Metall magnetisch macht" },
            { id: "d", text: "Das weiß ich nicht" }
          ],
          correct: "b"
        },
        {
          id: "rp3",
          prompt: "Wozu kann die Bewegung eines Bimetallstreifens genutzt werden?",
          options: [
            { id: "a", text: "Zum Öffnen oder Schließen eines elektrischen Kontakts" },
            { id: "b", text: "Nur zum Färben einer Anzeige" },
            { id: "c", text: "Zum Erzeugen von Funkwellen" },
            { id: "d", text: "Das weiß ich nicht" }
          ],
          correct: "a"
        }
      ],
      learning: {
        kicker: "Ein Temperatur-Schalter in fünf Schritten",
        intro: "Ein Bimetall besteht aus zwei fest verbundenen Metallen. Beide reagieren auf Wärme, aber nicht gleich stark.",
        steps: [
          { number: 1, icon: "═", title: "Zwei Metalle", text: "Metall A und Metall B sind über ihre ganze Länge fest verbunden." },
          { number: 2, icon: "☀", title: "Erwärmung", text: "Die Temperatur steigt und beide Metalle wollen länger werden." },
          { number: 3, icon: "⇢", title: "Ungleiche Ausdehnung", text: "Ein Metall dehnt sich stärker aus als das andere." },
          { number: 4, icon: "⌒", title: "Der Streifen biegt sich", text: "Weil die Metalle verbunden bleiben, krümmt sich der ganze Streifen." },
          { number: 5, icon: "⊣", title: "Kontakt schaltet", text: "Die Bewegung kann einen elektrischen Kontakt öffnen oder schließen." }
        ],
        causeEffects: [
          { cause: "Die Temperatur steigt", effect: "Die beiden Metalle dehnen sich unterschiedlich stark aus." },
          { cause: "Der Streifen krümmt sich", effect: "Ein elektrischer Kontakt kann betätigt werden." }
        ],
        facts: [
          "Ein Bimetall besteht aus zwei fest verbundenen Metallen.",
          "Verschiedene Metalle können sich bei gleicher Erwärmung unterschiedlich stark ausdehnen.",
          "Die feste Verbindung zwingt den Streifen zum Krümmen.",
          "Die Bewegung kann einen elektrischen Kontakt schalten.",
          "Beim Abkühlen bewegt sich der Streifen wieder in Richtung seiner Ausgangsform."
        ],
        takeaway: "Nicht die Wärme allein schaltet den Kontakt. Entscheidend ist die unterschiedliche Ausdehnung der fest verbundenen Metalle."
      },
      immediate: {
        recall: {
          prompt: "Erkläre mit eigenen Worten alles, woran du dich über den Bimetall-Thermostat erinnerst.",
          criteria: [
            "Ein Bimetall besteht aus zwei fest verbundenen Metallen.",
            "Die Metalle dehnen sich bei Erwärmung unterschiedlich stark aus.",
            "Durch die feste Verbindung krümmt sich der Streifen.",
            "Die Bewegung kann einen elektrischen Kontakt öffnen oder schließen.",
            "Beim Abkühlen bewegt sich der Streifen wieder zurück."
          ]
        },
        understanding: [
          {
            prompt: "Warum würde ein Streifen aus nur einem gleichmäßigen Metall nicht auf dieselbe Weise funktionieren?",
            rubric: [
              "0 Punkte: keine passende Erklärung.",
              "1 Punkt: Zwei Metalle werden als notwendig genannt.",
              "2 Punkte: Die Krümmung entsteht durch die unterschiedliche Ausdehnung zweier fest verbundener Metalle; bei einem einheitlichen Metall fehlt dieser Unterschied."
            ]
          },
          {
            prompt: "Warum kann die Krümmung einen Stromkreis beeinflussen?",
            rubric: [
              "0 Punkte: keine passende Erklärung.",
              "1 Punkt: Der Kontakt wird erwähnt.",
              "2 Punkte: Die mechanische Bewegung des Streifens öffnet oder schließt einen elektrischen Kontakt."
            ]
          }
        ],
        sequence: {
          prompt: "Bringe den Ablauf in die richtige Reihenfolge.",
          options: [
            { id: "heat", text: "Die Temperatur steigt." },
            { id: "different", text: "Die Metalle dehnen sich unterschiedlich stark aus." },
            { id: "bend", text: "Der verbundene Streifen krümmt sich." },
            { id: "switch", text: "Ein elektrischer Kontakt wird geschaltet." }
          ],
          correctOrder: ["heat", "different", "bend", "switch"]
        },
        transfer: [
          {
            id: "rt1",
            prompt: "Zwei fest verbundene Metalle dehnen sich bei Wärme nahezu gleich stark aus. Was passiert wahrscheinlich?",
            options: [
              { id: "a", text: "Der Streifen krümmt sich besonders stark." },
              { id: "b", text: "Der Streifen krümmt sich nur wenig." },
              { id: "c", text: "Der Streifen beginnt zu leuchten." },
              { id: "d", text: "Der Streifen wird zum Magneten." }
            ],
            correct: "b",
            points: 2
          },
          {
            id: "rt2",
            prompt: "Warum ist das wahrscheinlich?",
            options: [
              { id: "a", text: "Für eine starke Krümmung braucht es einen deutlichen Unterschied in der Ausdehnung." },
              { id: "b", text: "Gleiche Metalle stoßen sich elektrisch ab." },
              { id: "c", text: "Wärme wirkt nur auf farbige Metalle." },
              { id: "d", text: "Ein Kontakt kann nur durch einen Magneten bewegt werden." }
            ],
            correct: "a",
            points: 2
          }
        ]
      },
      delayed: {
        recall: {
          prompt: "Erkläre ohne Hilfe, wie ein Bimetall-Thermostat auf eine Temperaturänderung reagiert.",
          criteria: [
            "Zwei verschiedene Metalle sind fest verbunden.",
            "Sie dehnen sich bei Wärme unterschiedlich stark aus.",
            "Dadurch krümmt sich der Streifen.",
            "Die Krümmung bewegt einen elektrischen Kontakt.",
            "Beim Abkühlen bewegt sich der Streifen wieder zurück."
          ]
        },
        understanding: [
          {
            prompt: "Weshalb bleibt der Streifen nicht einfach gerade, obwohl beide Metalle länger werden möchten?",
            rubric: [
              "0 Punkte: keine passende Erklärung.",
              "1 Punkt: Die feste Verbindung wird erwähnt.",
              "2 Punkte: Weil die Metalle fest verbunden sind, aber unterschiedlich stark länger werden möchten, kann der Unterschied nur durch Krümmung ausgeglichen werden."
            ]
          },
          {
            prompt: "Wie kann aus einer Temperaturänderung eine elektrische Schaltbewegung entstehen?",
            rubric: [
              "0 Punkte: keine passende Erklärung.",
              "1 Punkt: Krümmung oder Kontakt wird einzeln erwähnt.",
              "2 Punkte: Temperatur führt zu unterschiedlicher Ausdehnung, dadurch zur Krümmung, und diese mechanische Bewegung betätigt den Kontakt."
            ]
          }
        ],
        sequence: {
          prompt: "Ordne die Schritte vom Temperaturanstieg bis zum Schalten.",
          options: [
            { id: "temperature", text: "Die Temperatur nimmt zu." },
            { id: "growth", text: "Ein Metall möchte stärker länger werden." },
            { id: "curve", text: "Der verbundene Streifen biegt sich." },
            { id: "contact", text: "Der Kontakt wird bewegt." }
          ],
          correctOrder: ["temperature", "growth", "curve", "contact"]
        },
        transfer: [
          {
            id: "rdt1",
            prompt: "Ein Bimetallstreifen wird abgekühlt, nachdem er zuvor einen Kontakt geöffnet hat. Was ist wahrscheinlich?",
            options: [
              { id: "a", text: "Er bewegt sich in Richtung Ausgangsform und kann den Kontakt wieder schließen." },
              { id: "b", text: "Er krümmt sich immer weiter in dieselbe Richtung." },
              { id: "c", text: "Er verliert sofort beide Metallschichten." },
              { id: "d", text: "Abkühlung hat grundsätzlich keine Wirkung." }
            ],
            correct: "a",
            points: 2
          },
          {
            id: "rdt2",
            prompt: "Welche Begründung passt dazu?",
            options: [
              { id: "a", text: "Die temperaturabhängige Ausdehnung nimmt wieder ab." },
              { id: "b", text: "Kälte erzeugt automatisch einen Magneten." },
              { id: "c", text: "Der Kontakt zieht den Streifen elektrisch zurück." },
              { id: "d", text: "Metalle können sich bei Kälte grundsätzlich nicht verändern." }
            ],
            correct: "a",
            points: 2
          }
        ]
      }
    }
  }
};
