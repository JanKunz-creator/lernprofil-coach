window.EXPERIMENT_CONFIG = {
  version: "0.3.6",
  learningSeconds: 165,
  delayedHours: 12,
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
  },
  "unit-2": {
  "id": "unit-2",
  "conditionCode": "A1",
  "primary": {
    "id": "bee-waggle-dance",
    "publicTitle": "Wie Bienen den Weg zu einer Futterstelle mitteilen",
    "pretest": [
      {
        "id": "p1",
        "prompt": "Welche Ortsinformationen kann der Schwänzeltanz einer Honigbiene vermitteln?",
        "options": [
          {
            "id": "a",
            "text": "Nur die Farbe der Blüten"
          },
          {
            "id": "b",
            "text": "Richtung und ungefähre Entfernung"
          },
          {
            "id": "c",
            "text": "Nur die Zahl der Blüten"
          },
          {
            "id": "d",
            "text": "Das weiß ich nicht"
          }
        ],
        "correct": "b"
      },
      {
        "id": "p2",
        "prompt": "Woran orientiert sich die Tanzrichtung auf der senkrechten Wabe im dunklen Stock?",
        "options": [
          {
            "id": "a",
            "text": "An der Schwerkraft beziehungsweise der senkrechten Richtung"
          },
          {
            "id": "b",
            "text": "Am Geruch des Holzes"
          },
          {
            "id": "c",
            "text": "An der Lautstärke der Flügel"
          },
          {
            "id": "d",
            "text": "Das weiß ich nicht"
          }
        ],
        "correct": "a"
      },
      {
        "id": "p3",
        "prompt": "Was bedeutet normalerweise ein längerer Schwänzellauf?",
        "options": [
          {
            "id": "a",
            "text": "Die Futterstelle liegt näher"
          },
          {
            "id": "b",
            "text": "Die Futterstelle liegt weiter entfernt"
          },
          {
            "id": "c",
            "text": "Die Biene hat sich verirrt"
          },
          {
            "id": "d",
            "text": "Das weiß ich nicht"
          }
        ],
        "correct": "b"
      }
    ],
    "learning": {
      "mode": "audio",
      "kicker": "Eine Hörgeschichte in mehreren Abschnitten",
      "audioSrc": "./audio-bienen.mp3?v=036",
      "durationSeconds": 165,
      "segmentCount": 6,
      "script": "Stell dir vor, eine Honigbiene hat außerhalb des Stocks eine ergiebige Stelle mit vielen Blüten gefunden. Sie fliegt zurück und teilt anderen Sammlerinnen nicht nur mit, dass es dort Nahrung gibt, sondern auch, in welcher Richtung und ungefähr in welcher Entfernung sie liegt.\n\nIm dunklen Bienenstock tanzt die Biene auf einer senkrechten Wabe. Der Tanz besteht aus einem geraden Abschnitt, dem sogenannten Schwänzellauf, und aus zwei Bögen. Nach dem geraden Lauf dreht die Biene nach links zurück, wiederholt den Schwänzellauf und dreht danach nach rechts zurück. So entsteht ungefähr die Form einer Acht.\n\nDie Richtung steckt im Winkel des geraden Schwänzellaufs. Weil im Stock die Sonne nicht zu sehen ist, benutzen die Bienen die Schwerkraft als Ersatz für die Himmelsrichtung. Ein Lauf gerade nach oben bedeutet: Fliege vom Stock aus in Richtung der Sonne. Ein Lauf gerade nach unten bedeutet: Fliege von der Sonne weg. Zeigt der Lauf schräg nach links, liegt auch das Ziel entsprechend links von der Sonnenrichtung.\n\nDie Entfernung steckt vor allem in der Dauer des Schwänzellaufs. Je länger die Biene dabei schwänzelt, desto weiter ist die Futterstelle entfernt. Ein kurzer Schwänzellauf steht also für ein näheres Ziel, ein längerer für ein weiter entferntes.\n\nDer Ablauf ist damit klar: Zuerst entdeckt die Biene eine lohnende Futterstelle. Dann fliegt sie in den Stock zurück. Dort führt sie den Tanz mehrfach aus. Andere Bienen folgen ihr dicht und nehmen Winkel und Dauer wahr. Anschließend fliegen sie in die angegebene Richtung und suchen in der passenden Entfernung. Auch der Duft, den die Tänzerin von den Blüten mitbringt, kann den Suchenden helfen, die richtige Futterquelle zu erkennen.\n\nMerke dir das Grundprinzip: Der Winkel des Schwänzellaufs zeigt die Richtung im Verhältnis zur Sonne. Die Dauer des Schwänzellaufs zeigt die Entfernung. Wird der Lauf länger, liegt das Ziel weiter weg. Ändert sich sein Winkel, müssen die Bienen in eine andere Richtung fliegen."
    },
    "immediate": {
      "recall": {
        "prompt": "Erkläre mit eigenen Worten, wie eine Biene anderen Bienen den Weg zu einer Futterstelle mitteilt.",
        "criteria": [
          "Eine Sammlerin findet eine lohnende Futterstelle, kehrt zurück und tanzt im Stock.",
          "Der Tanz enthält einen geraden Schwänzellauf und Rückkehrbögen, ungefähr in Form einer Acht.",
          "Der Winkel des Schwänzellaufs auf der senkrechten Wabe zeigt die Richtung im Verhältnis zur Sonne.",
          "Die Dauer des Schwänzellaufs zeigt die ungefähre Entfernung; länger bedeutet weiter.",
          "Andere Bienen nehmen die Information auf und fliegen anschließend in die passende Richtung und Entfernung."
        ]
      },
      "understanding": [
        {
          "prompt": "Warum kann ein Lauf gerade nach oben im dunklen Stock die Richtung zur Sonne bedeuten?",
          "rubric": [
            "0 Punkte: keine passende Erklärung oder die Biene sieht die Sonne im Stock.",
            "1 Punkt: Die senkrechte Wabe oder Schwerkraft wird erwähnt, aber der Bezug zur Sonne bleibt unklar.",
            "2 Punkte: Die Bienen benutzen die Schwerkraft beziehungsweise die senkrechte Richtung als Bezug; nach oben steht dabei für die Richtung zur Sonne."
          ]
        },
        {
          "prompt": "Warum sagt ein längerer Schwänzellauf nicht automatisch eine andere Flugrichtung voraus?",
          "rubric": [
            "0 Punkte: keine passende Erklärung.",
            "1 Punkt: Entfernung oder Richtung wird einzeln genannt.",
            "2 Punkte: Die Dauer steht für die Entfernung, während der Winkel die Richtung angibt; deshalb kann die Richtung gleich bleiben."
          ]
        }
      ],
      "sequence": {
        "prompt": "Bringe den Ablauf in die richtige Reihenfolge.",
        "options": [
          {
            "id": "find",
            "text": "Eine Biene entdeckt eine lohnende Futterstelle."
          },
          {
            "id": "return",
            "text": "Sie fliegt in den Stock zurück."
          },
          {
            "id": "dance",
            "text": "Sie führt den Schwänzeltanz aus."
          },
          {
            "id": "follow",
            "text": "Andere Bienen fliegen in die angegebene Richtung und Entfernung."
          }
        ],
        "correctOrder": [
          "find",
          "return",
          "dance",
          "follow"
        ]
      },
      "transfer": [
        {
          "id": "t1",
          "prompt": "Der Schwänzellauf zeigt schräg nach rechts statt gerade nach oben. Was verändert sich dadurch vor allem?",
          "options": [
            {
              "id": "a",
              "text": "Die Flugrichtung relativ zur Sonne"
            },
            {
              "id": "b",
              "text": "Die Farbe der gesuchten Blüten"
            },
            {
              "id": "c",
              "text": "Die Zahl der Bienen im Stock"
            },
            {
              "id": "d",
              "text": "Nur die Lautstärke des Tanzes"
            }
          ],
          "correct": "a",
          "points": 2
        },
        {
          "id": "t2",
          "prompt": "Zwei Tänze haben denselben Winkel. Bei Tanz B dauert der Schwänzellauf deutlich länger. Welche Aussage passt?",
          "options": [
            {
              "id": "a",
              "text": "Beide Ziele liegen in derselben Richtung, Ziel B aber weiter entfernt."
            },
            {
              "id": "b",
              "text": "Ziel B liegt näher und in der Gegenrichtung."
            },
            {
              "id": "c",
              "text": "Die Entfernung ist gleich, nur die Blütenfarbe ändert sich."
            },
            {
              "id": "d",
              "text": "Aus der Dauer lässt sich gar nichts ableiten."
            }
          ],
          "correct": "a",
          "points": 2
        }
      ]
    },
    "delayed": {
      "recall": {
        "prompt": "Erkläre ohne Hilfe noch einmal, welche Informationen im Schwänzeltanz stecken und wie andere Bienen sie nutzen.",
        "criteria": [
          "Die Tänzerin ist von einer Futterstelle zurückgekehrt und wirbt im Stock dafür.",
          "Der gerade Schwänzellauf ist der entscheidende Informationsteil des Tanzes.",
          "Sein Winkel zur Senkrechten beschreibt die Richtung relativ zur Sonne.",
          "Seine Dauer beschreibt die ungefähre Entfernung; länger bedeutet weiter.",
          "Folgebienen entschlüsseln die Angaben und suchen am beschriebenen Ort."
        ]
      },
      "understanding": [
        {
          "prompt": "Eine Biene tanzt später am Tag erneut für dieselbe Futterstelle. Warum kann sie den Winkel des Tanzes anpassen müssen?",
          "rubric": [
            "0 Punkte: keine passende Erklärung.",
            "1 Punkt: Die Sonne oder ihre Bewegung wird erwähnt.",
            "2 Punkte: Die Richtung wird relativ zur Sonne angegeben; weil sich deren Stellung im Tagesverlauf verändert, muss der Tanzwinkel angepasst werden."
          ]
        },
        {
          "prompt": "Wozu braucht der Tanz zwei getrennte Merkmale, Winkel und Dauer?",
          "rubric": [
            "0 Punkte: keine passende Erklärung.",
            "1 Punkt: Richtung und Entfernung werden genannt, aber nicht zugeordnet.",
            "2 Punkte: Der Winkel übermittelt die Richtung und die Dauer die Entfernung; zusammen bestimmen sie die ungefähre Lage des Ziels."
          ]
        }
      ],
      "sequence": {
        "prompt": "Ordne die Schritte vom Fund bis zur Suche durch andere Bienen.",
        "options": [
          {
            "id": "food",
            "text": "Eine Sammlerin findet Nahrung."
          },
          {
            "id": "home",
            "text": "Sie kehrt zum Stock zurück."
          },
          {
            "id": "code",
            "text": "Sie codiert Richtung und Entfernung im Tanz."
          },
          {
            "id": "search",
            "text": "Andere Bienen fliegen los und suchen am beschriebenen Ort."
          }
        ],
        "correctOrder": [
          "food",
          "home",
          "code",
          "search"
        ]
      },
      "transfer": [
        {
          "id": "dt1",
          "prompt": "Ein Tanz zeigt gerade nach unten auf der senkrechten Wabe. Welche Richtung ist damit gemeint?",
          "options": [
            {
              "id": "a",
              "text": "Vom Stock aus ungefähr von der Sonne weg"
            },
            {
              "id": "b",
              "text": "Vom Stock aus direkt zur Sonne"
            },
            {
              "id": "c",
              "text": "Senkrecht in den Boden"
            },
            {
              "id": "d",
              "text": "Die Richtung lässt sich grundsätzlich nicht erkennen"
            }
          ],
          "correct": "a",
          "points": 2
        },
        {
          "id": "dt2",
          "prompt": "Der Tanzwinkel bleibt gleich, aber der Schwänzellauf wird kürzer. Was ist am wahrscheinlichsten?",
          "options": [
            {
              "id": "a",
              "text": "Das Ziel liegt in derselben Richtung, aber näher am Stock."
            },
            {
              "id": "b",
              "text": "Das Ziel liegt weiter entfernt."
            },
            {
              "id": "c",
              "text": "Die Flugrichtung dreht sich um 180 Grad."
            },
            {
              "id": "d",
              "text": "Die Bienen müssen nach einer anderen Blütenfarbe suchen."
            }
          ],
          "correct": "a",
          "points": 2
        }
      ]
    }
  },
  "reserve": {
    "id": "squid-chromatophores",
    "publicTitle": "Wie ein Tintenfisch sein Hautmuster verändert",
    "pretest": [
      {
        "id": "rp1",
        "prompt": "Was ist eine Chromatophore bei Tintenfischen?",
        "options": [
          {
            "id": "a",
            "text": "Ein kleines Farborgang in der Haut"
          },
          {
            "id": "b",
            "text": "Ein Teil des Schnabels"
          },
          {
            "id": "c",
            "text": "Ein Sinnesorgan im Auge"
          },
          {
            "id": "d",
            "text": "Das weiß ich nicht"
          }
        ],
        "correct": "a"
      },
      {
        "id": "rp2",
        "prompt": "Wie wird bei einer Chromatophore mehr Farbe sichtbar?",
        "options": [
          {
            "id": "a",
            "text": "Muskeln ziehen den Farbstoffsack breit."
          },
          {
            "id": "b",
            "text": "Die Haut wird mit Meerwasser gefüllt."
          },
          {
            "id": "c",
            "text": "Der Farbstoff verlässt den Körper."
          },
          {
            "id": "d",
            "text": "Das weiß ich nicht"
          }
        ],
        "correct": "a"
      },
      {
        "id": "rp3",
        "prompt": "Was steuert die schnellen Farbänderungen hauptsächlich?",
        "options": [
          {
            "id": "a",
            "text": "Das Nervensystem"
          },
          {
            "id": "b",
            "text": "Nur die Wassertemperatur"
          },
          {
            "id": "c",
            "text": "Der Herzschlag"
          },
          {
            "id": "d",
            "text": "Das weiß ich nicht"
          }
        ],
        "correct": "a"
      }
    ],
    "learning": {
      "mode": "audio",
      "kicker": "Eine Hörgeschichte in mehreren Abschnitten",
      "audioSrc": "./audio-tintenfisch.mp3?v=036",
      "durationSeconds": 165,
      "segmentCount": 7,
      "script": "Stell dir vor, ein Tintenfisch schwimmt über hellen Sand und kurz darauf über dunkle Steine. Seine Haut kann ihr Muster sehr schnell verändern. Dafür besitzt sie viele kleine Farborgane, die Chromatophoren genannt werden.\n\nJede Chromatophore enthält in der Mitte einen elastischen Sack mit Farbstoff. Um diesen Sack herum liegen feine Muskeln, die strahlenförmig nach außen ziehen. Die Muskeln werden direkt durch Nerven gesteuert. Dadurch kann das Tier einzelne Farborgane sehr schnell öffnen oder schließen.\n\nWenn die Nerven den Muskeln ein Signal geben, ziehen sich die strahlenförmigen Muskeln zusammen. Dabei ziehen sie den Farbstoffsack nach außen. Er wird flach und breit, sodass seine Farbe auf einer größeren Hautfläche sichtbar wird. Von außen wirkt die betreffende Stelle nun dunkler oder farbiger.\n\nWenn das Nervensignal endet und die Muskeln entspannen, zieht sich der elastische Farbstoffsack wieder zusammen. Er wird klein, und viel weniger Farbe ist sichtbar. Eine einzelne Chromatophore funktioniert deshalb ein wenig wie ein winziger, dehnbarer Farbpunkt.\n\nDer Tintenfisch steuert nicht nur ein solches Farborgang, sondern sehr viele gleichzeitig. Indem manche Chromatophoren geöffnet und andere geschlossen werden, entstehen Flecken, Streifen oder größere Flächen. Zusätzlich besitzt die Haut reflektierende Zellen, die Licht zurückwerfen und weitere Farbeffekte erzeugen können.\n\nDer Ablauf beginnt mit einem optischen Eindruck. Die Augen nehmen die Umgebung oder ein anderes Tier wahr. Das Nervensystem verarbeitet die Information und sendet Signale an bestimmte Hautbereiche. Dort ziehen Muskeln an ausgewählten Chromatophoren. Die Farbsäcke werden größer sichtbar oder schrumpfen wieder. So entsteht innerhalb sehr kurzer Zeit ein neues Muster.\n\nDiese Muster dienen zum Beispiel der Tarnung und der Verständigung. Auf dunklem Untergrund können mehr dunkle Farborgane geöffnet werden. Für ein auffälliges Signal kann das Tier starke Kontraste erzeugen.\n\nMerke dir das Grundprinzip: Nerven steuern Muskeln. Angespannte Muskeln ziehen den Farbstoffsack breit und machen mehr Farbe sichtbar. Entspannte Muskeln lassen ihn schrumpfen und machen weniger Farbe sichtbar. Das Zusammenspiel vieler Chromatophoren erzeugt das gesamte Hautmuster."
    },
    "immediate": {
      "recall": {
        "prompt": "Erkläre mit eigenen Worten, wie ein Tintenfisch sein Hautmuster verändern kann.",
        "criteria": [
          "Die Haut besitzt viele Chromatophoren mit einem elastischen Farbstoffsack.",
          "Um den Farbstoffsack liegen strahlenförmige Muskeln.",
          "Nerven steuern diese Muskeln sehr schnell.",
          "Angespannte Muskeln ziehen den Sack breit und machen mehr Farbe sichtbar; bei Entspannung schrumpft er.",
          "Das Zusammenspiel vieler Farborgane erzeugt Muster für Tarnung oder Verständigung."
        ]
      },
      "understanding": [
        {
          "prompt": "Warum wird eine Hautstelle farbiger oder dunkler, wenn die Muskeln an einer Chromatophore ziehen?",
          "rubric": [
            "0 Punkte: keine passende Erklärung.",
            "1 Punkt: Der Farbstoffsack oder die Muskeln werden genannt.",
            "2 Punkte: Die Muskeln ziehen den Farbstoffsack flach und breit, sodass derselbe Farbstoff auf einer größeren Fläche sichtbar wird."
          ]
        },
        {
          "prompt": "Wie kann ein Tintenfisch gleichzeitig Flecken und helle Bereiche erzeugen?",
          "rubric": [
            "0 Punkte: keine passende Erklärung.",
            "1 Punkt: Viele Chromatophoren werden erwähnt.",
            "2 Punkte: Das Nervensystem kann verschiedene Chromatophoren beziehungsweise Hautbereiche unterschiedlich steuern, sodass einige geöffnet und andere geschlossen sind."
          ]
        }
      ],
      "sequence": {
        "prompt": "Bringe den Ablauf in die richtige Reihenfolge.",
        "options": [
          {
            "id": "see",
            "text": "Die Augen nehmen die Umgebung wahr."
          },
          {
            "id": "signal",
            "text": "Das Nervensystem sendet Signale an bestimmte Hautbereiche."
          },
          {
            "id": "muscle",
            "text": "Muskeln ziehen an ausgewählten Farbsäcken."
          },
          {
            "id": "pattern",
            "text": "Ein neues Hautmuster wird sichtbar."
          }
        ],
        "correctOrder": [
          "see",
          "signal",
          "muscle",
          "pattern"
        ]
      },
      "transfer": [
        {
          "id": "rt1",
          "prompt": "Die Muskeln um eine dunkle Chromatophore entspannen sich. Was ist wahrscheinlich?",
          "options": [
            {
              "id": "a",
              "text": "Der Farbstoffsack schrumpft und die Stelle wirkt weniger dunkel."
            },
            {
              "id": "b",
              "text": "Der Farbstoffsack wird noch breiter."
            },
            {
              "id": "c",
              "text": "Die Chromatophore verlässt die Haut."
            },
            {
              "id": "d",
              "text": "Die Farbe wird ohne Veränderung stärker."
            }
          ],
          "correct": "a",
          "points": 2
        },
        {
          "id": "rt2",
          "prompt": "Viele dunkle Chromatophoren eines Hautbereichs werden gleichzeitig weit geöffnet. Wie verändert sich der Bereich?",
          "options": [
            {
              "id": "a",
              "text": "Er wirkt dunkler oder farbiger."
            },
            {
              "id": "b",
              "text": "Er wird durchsichtig."
            },
            {
              "id": "c",
              "text": "Er verliert alle Muskeln."
            },
            {
              "id": "d",
              "text": "Er kann sich optisch nicht verändern."
            }
          ],
          "correct": "a",
          "points": 2
        }
      ]
    },
    "delayed": {
      "recall": {
        "prompt": "Erkläre ohne Hilfe noch einmal, wie Nerven, Muskeln und Farbsäcke beim Farbwechsel zusammenarbeiten.",
        "criteria": [
          "Chromatophoren sind kleine Farborgane der Haut.",
          "Ein elastischer Sack enthält den Farbstoff.",
          "Nerven aktivieren strahlenförmige Muskeln um den Sack.",
          "Kontraktion zieht den Sack breit; Entspannung lässt ihn kleiner werden.",
          "Viele einzeln gesteuerte Chromatophoren bilden gemeinsam Muster."
        ]
      },
      "understanding": [
        {
          "prompt": "Warum kann ein Tintenfisch seine Farbe viel schneller ändern als ein Tier, das erst neuen Farbstoff bilden müsste?",
          "rubric": [
            "0 Punkte: keine passende Erklärung.",
            "1 Punkt: Muskeln oder Nerven werden erwähnt.",
            "2 Punkte: Vorhandene Farbsäcke werden durch direkte Nerven- und Muskelsteuerung nur ausgebreitet oder zusammengezogen; es muss kein neuer Farbstoff entstehen."
          ]
        },
        {
          "prompt": "Warum verschwindet die Farbe einer Chromatophore nicht vollständig aus der Haut, wenn sie geschlossen wird?",
          "rubric": [
            "0 Punkte: keine passende Erklärung.",
            "1 Punkt: Der Sack wird kleiner genannt.",
            "2 Punkte: Der Farbstoff bleibt im elastischen Sack, der lediglich auf eine kleine Fläche zusammenschrumpft und deshalb weniger sichtbar ist."
          ]
        }
      ],
      "sequence": {
        "prompt": "Ordne die Schritte vom Sehen bis zum sichtbaren Farbfleck.",
        "options": [
          {
            "id": "input",
            "text": "Das Tier nimmt einen optischen Eindruck wahr."
          },
          {
            "id": "brain",
            "text": "Das Nervensystem verarbeitet die Information."
          },
          {
            "id": "pull",
            "text": "Muskeln ziehen einen Farbstoffsack breit."
          },
          {
            "id": "visible",
            "text": "Auf der Haut wird mehr Farbe sichtbar."
          }
        ],
        "correctOrder": [
          "input",
          "brain",
          "pull",
          "visible"
        ]
      },
      "transfer": [
        {
          "id": "rdt1",
          "prompt": "Ein Nerv zu einer Gruppe von Chromatophoren fällt aus. Was ist dort am ehesten eingeschränkt?",
          "options": [
            {
              "id": "a",
              "text": "Die gezielte schnelle Steuerung dieser Farborgane"
            },
            {
              "id": "b",
              "text": "Die Fähigkeit des Tieres zu atmen"
            },
            {
              "id": "c",
              "text": "Die Herstellung von Meerwasser"
            },
            {
              "id": "d",
              "text": "Die Bewegung aller Arme"
            }
          ],
          "correct": "a",
          "points": 2
        },
        {
          "id": "rdt2",
          "prompt": "Warum kann aus vielen winzigen Farbpunkten ein großes Streifenmuster entstehen?",
          "options": [
            {
              "id": "a",
              "text": "Viele Chromatophoren werden in benachbarten Bereichen passend gemeinsam gesteuert."
            },
            {
              "id": "b",
              "text": "Eine einzelne Chromatophore bedeckt den ganzen Körper."
            },
            {
              "id": "c",
              "text": "Das Wasser malt den Streifen auf die Haut."
            },
            {
              "id": "d",
              "text": "Nur die Augen verändern ihre Farbe."
            }
          ],
          "correct": "a",
          "points": 2
        }
      ]
    }
  }
}
};
