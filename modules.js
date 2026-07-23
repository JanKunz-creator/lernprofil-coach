window.LEARNING_MODULES = [
  {
    id: "technik-demo",
    number: "D",
    title: "Technik-Demo",
    subtitle: "Prüft Navigation, Speicherung und Auswertung",
    availability: "demo"
  },
  {
    id: "unit-1",
    number: 1,
    title: "Versuchseinheit 1",
    subtitle: "Eigenständiges Thema mit Sofort- und Erinnerungstest",
    availability: "ready"
  },
  ...Array.from({ length: 7 }, (_, index) => ({
    id: `unit-${index + 2}`,
    number: index + 2,
    title: `Versuchseinheit ${index + 2}`,
    subtitle: "Eigenständiges Thema, wird im nächsten Ausbau ergänzt",
    availability: "planned"
  }))
];
