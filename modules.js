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
  {
    id: "unit-2",
    number: 2,
    title: "Versuchseinheit 2",
    subtitle: "Eigenständiges Thema mit Sofort- und Erinnerungstest",
    availability: "ready"
  },
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `unit-${index + 3}`,
    number: index + 3,
    title: `Versuchseinheit ${index + 3}`,
    subtitle: "Eigenständiges Thema, wird im nächsten Ausbau ergänzt",
    availability: "planned"
  }))
];
