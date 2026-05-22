# RunTracker

> **Moeilijkheidsgraad:** 2/5  
> **Focus:** Unit testing middels AI agents

## 🎯 Wat is het Idee?

De repository bevat een simpele fitness tracker waarbij de gebruiker zijn statistieken kan bijhouden. In dit Angular project zijn Vitest en code coverage tooling al toegevoegd. De bedoeling is om de applicatie 100% ge-unit test te krijgen met behulp van AI.

## 🤔 Waarom Dit Project?

Dit project geeft de gebruiker inzicht, hoe makkelijk en efficient het gebruik van AI is voor het aftesten van functionaliteit. Gebruikers moeten zelf nog wel opletten dat het juiste getest wordt, maar veel implementatie details zijn met Gen-AI op te lossen.

- Je leert na te denken over je code, of het opgesplits kan worden en verschillende technieken zoals Mocking, Stubs etc.
- Je leert dieper na te denken welke functionaliteiten je hebt en hoe je deze kan aftesten
- Het geeft inzicht hoe je tijd kan besparen door testen met Gen-AI op te pakken en/of hoe je jezelf kunt "unstucken" als je vast loopt.

## 📋 Wat Houdt Dit In?

De opdracht bevat een volledig werkende applicatie waarbij een gebruiker zijn hardloop data kan tracken. er zijn 2 schermen:

1. Het home scherm waar de gebruiker reeds getrackte data ziet en kan verwijderen.
2. Het scherm waar de gebruiker een nieuwe hardloopsessie kan genereren.

**Eindresultaat**:
De applicatie is 100% code coverage afgetest met Vitest.

**Hoofdtaken**:
Zorg dat in ieder geval het toevoegen/verwijderen van een hardloopsessie en het overzicht afgetest wordt. De applicatie maakt gebruik van local storage zodat er geen complexe database setup nodig is.

## 🚀 Aan de Slag

### Technische Setup

**Vereisten:**

- Cursor
- NPM
- Angular CLI (v21)

**Installatie:**

```bash
# Clone de repository
git clone https://github.com/rwormsbecher/runTracker.git

# Installeer de laatste versie van Angular CLI globaal
npm install -g @angular/cli

# Installeer dependencies
npm install

# Start de development server
npm start

# Run Vitest unit testen
npm test

# run Vitest unit testen met coverage
npm run test:coverage
```

**Suggesties om te starten:**

1. Test de applicatie uit. Voeg wat data toe en verwijder deze. Kijk ook in de local storage om te zien welke data er bijgehouden wordt.
2. Bekijk de code, Componenten, services etc.
3. Run `npm run test:coverage`

## 📦 Wat Zit er in Deze Repo?

**Project structuur:**

```
/src
    /app
        /[add-session]/*
        /[home]/*
        /[models]/*
        /[services]/*
        /app.config.ts
        /app.routes.ts
        /app/scss
        /app.html
        /app.spec.ts
        /app.ts
    /index.html
    /main.ts
    .styles.scss
/[...configFiles]

```

**Beschikbare tooling:**

- Vitest, Angular CLI
- Standaard Angular Setup

**Pre-configured features:**

- Test coverage voor Vite
- Compopnenten:
  - home.component.ts
  - add-session.component.ts
- Services:
  - running-session.service.ts

**Handige commando's:**

```bash
npm run start           # Start development server
npm run test            # Run tests
npm run test:coverage   # Check coverage
npm run build           # Build voor productie
```

## 🎯 Doel van het Project

Het doel is voor de al geschreven code 100% coverage te bereiken.

- Bereik 100% test coverage.
- Exposure met Vitest.
- Plezier tijdens het testen.

## 📚 Resources

- De Git repository is heir te vinden:: https://github.com/rwormsbecher/runTracker

**Vragen?** Neem contact op met Rodney Wormsbecher of de andere organisatoren.
