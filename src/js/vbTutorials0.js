// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

class VBTutorialServeReceieve {
  NS = 'http://www.w3.org/2000/svg'

  /*
  * We want to use the same internal units as the court itself, which is 1100 units wide
  * and our tutorial will be 1700x1600 units, so we will have a scaling factor of
  * {image-width} / 1700, and we allow the court to be (11/17) of our width.
  *
  * The image itself defaults to 900px wide, with the height being set to 16/17 * {width}
  * We could use a transformation, but I'd rather have the final SVG to be "clean"
  */

  constructor (config) {
    const svgWidth = (typeof config.width === 'number') ? config.width : 900
    this.svg = {
      width: svgWidth,
      height: svgWidth * (16/17),
      scale: svgWidth / 1700,
      rotationControlCirleRadius: svgWidth * (24 / 1700)
    }

    this.colours = {
      backgroundColour: (config.colours && typeof config.colours.backgroundColour === 'string') ? config.colours.backgroundColour : '#63b6e0',
      courtColour: (config.colours && typeof config.colours.courtColour === 'string') ? config.colours.courtColour : '#ffb591',
      lineColour: (config.colours && typeof config.colours.lineColour === 'string') ? config.colours.lineColour : 'white',
      playerOutlineColour: (config.colours && typeof config.colours.playerOutlineColour === 'string') ? config.colours.playerOutlineColour : '#f5f5f5',
      playerColour: (config.colours && typeof config.colours.playerColour === 'string') ? config.colours.playerColour : '#efa581',
      playerColourHighlight: (config.colours && typeof config.colours.playerColourHighlight === 'string') ? config.colours.playerColourHighlight : '#66dd66',
      rotationControlColour: (config.colours && typeof config.colours.rotationControlColour === 'string') ? config.colours.rotationControlColour : '#ffffff',
      rotationControlHighlightColour: (config.colours && typeof config.colours.rotationControlHighlightColour === 'string') ? config.colours.rotationControlHighlightColour : '#dddddd',
      rotationControlBackgroundColourA: (config.colours && typeof config.colours.rotationControlBackgroundColourA === 'string') ? config.colours.rotationControlBackgroundColourA : '#65b6df',
      rotationControlBackgroundColourB: (config.colours && typeof config.colours.rotationControlBackgroundColourB === 'string') ? config.colours.rotationControlBackgroundColourB : '#4596bf',
      tutorialColour: (config.colours && typeof config.colours.tutorialColour === 'string') ? config.colours.tutorialColour : '#7ec485',
      tutorialFade: (config.colours && typeof config.colours.tutorialFade === 'string') ? config.colours.tutorialFade : '#999999',
    }

    this.text = {
      'en': {
        players: { s: 'S', o: 'O', m1: 'M1', m2: 'M2', h1: 'H1', h2: 'H2'},
        rotationControl: { serving: 'Serving', receiving: 'Receiving', s1: 'Setter at 1', s2: 'Setter at 2', s3: 'Setter at 3', s4: 'Setter at 4', s5: 'Setter at 5', s6: 'Setter at 6' },
        actionControl: { base: 'Base', serve: 'Serve', set: 'Set', switch: 'Switch', pass: 'Pass', attack: 'Attack' },
        tutorial: [
          'Next',
          'This is a player. Click to highlight it.\n\nH=Hitter, M=Middle, S=Setter, \nO=Opposite',
          'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
          'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labeled with the\nsetter\'s position',
          'These are for when you are serving',
          'These are for when you are\nreceiving',
          'Moving from circle to circle makes\n you rotate like in a match',
          'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
          'These show the player positions\n when your side is serving',
          'These show the player positions\n when your side is receiving',
        ]
      },
      'it': {
        players: { s: 'P', o: 'O', m1: 'C1', m2: 'C2', h1: 'S1', h2: 'S2'},
        rotationControl: { serving: 'Servizio', receiving: 'Ricezione', s1: 'P1', s2: 'P2', s3: 'P3', s4: 'P4', s5: 'P5', s6: 'P6' },
        actionControl: { base: 'Base', serve: 'Servizio', set: 'Alzata', switch: 'Cambio', pass: 'Ricezione', attack: 'Attacco' },
        tutorial: [
          'Avanti',
          'Questo è un giocatore.\nSi seleziona con un clic.\nS=Schiacciatore, C=Centrale,\n P=Palleggiatore, O=Opposto',
          'Questo è in campo con tutti e\n 6 i giocatori.\nAl clic sui bottoni, i giocatori\n si muoveranno intorno al campo',
          'Questo ti permette di scegliere\nla formazione di partenza.\nIl clic sul cerchio cambia la rotazione.\nOgni rotazione è etichettata con la\nposizione dell\'alzatore (P)',
          'Questo mostra la situazione in cui\nla squadra è al servizio',
          'Questo mostra la situazione in cui\nla squadra è in ricezione',
          'Spostandosi da un cerchio ad un\nsi simulano le rotazioni come\ndurante una gara',
          'Da qui si selezionano le situazioni\n di gioco.\nI giocatori si muoveranno nel campo\ndi conseguenza',
          'Qui si hanno le posizioni dei\n giocatori quando la squadra\n è al servizio',
          'Qui si hanno le posizioni dei\n giocatori quando la squadra\n è in ricezione',
        ]
      },
      'fr': {
        players: { s: 'Pa', o: 'Po', m1: 'C1', m2: 'C2', h1: 'A1', h2: 'A2'},
        rotationControl: { serving: 'Service', receiving: 'Récevoir', s1: 'Passeur a 1', s2: 'Passeur a 2', s3: 'Passeur a 3', s4: 'Passeur a 4', s5: 'Passeur a 5', s6: 'Passeur a 6' },
        actionControl: { base: 'Base', serve: 'Service', set: 'Passe', switch: 'Switch', pass: 'Récevoir', attack: 'Attaque' },
        tutorial: [
          'Next',
          'This is a player. Click to highlight it.\n\nA=Attaquant, C=Central,\nPa=Passeur, Po=Pointu',
          'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
          'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labelled with the\nsetter\'s position',
          'These are for when you are serving',
          'These are for when you are\nreceiving',
          'Moving from circle to circle makes\n you rotate like in a match',
          'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
          'These show the player positions\n when your side is serving',
          'These show the player positions\n when your side is receiving',
        ]
      },
      'pl': {
        players: { s: 'S', o: 'O', m1: 'M1', m2: 'M2', h1: 'H1', h2: 'H2'},
        rotationControl: { serving: 'Serving', receiving: 'Receiving', s1: 'Setter at 1', s2: 'Setter at 2', s3: 'Setter at 3', s4: 'Setter at 4', s5: 'Setter at 5', s6: 'Setter at 6' },
        actionControl: { base: 'Base', serve: 'Serve', set: 'Set', switch: 'Switch', pass: 'Pass', attack: 'Attack' },
        tutorial: [
          'Next',
          'This is a player. Click to highlight it.\n\nH=Hitter, M=Middle, S=Setter, \nO=Opposite',
          'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
          'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labelled with the\nsetter\'s position',
          'These are for when you are serving',
          'These are for when you are\nreceiving',
          'Moving from circle to circle makes\n you rotate like in a match',
          'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
          'These show the player positions\n when your side is serving',
          'These show the player positions\n when your side is receiving',
        ]
      },
      'nl': {
        players: { s: 'S', o: 'O', m1: 'M1', m2: 'M2', h1: 'H1', h2: 'H2'},
        rotationControl: { serving: 'Serving', receiving: 'Receiving', s1: 'Setter at 1', s2: 'Setter at 2', s3: 'Setter at 3', s4: 'Setter at 4', s5: 'Setter at 5', s6: 'Setter at 6' },
        actionControl: { base: 'Base', serve: 'Serve', set: 'Set', switch: 'Switch', pass: 'Pass', attack: 'Attack' },
        tutorial: [
          'Next',
          'This is a player. Click to highlight it.\n\nH=Hitter, M=Middle, S=Setter, \nO=Opposite',
          'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
          'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labelled with the\nsetter\'s position',
          'These are for when you are serving',
          'These are for when you are\nreceiving',
          'Moving from circle to circle makes\n you rotate like in a match',
          'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
          'These show the player positions\n when your side is serving',
          'These show the player positions\n when your side is receiving',
        ]
      },
      'de': {
        players: { s: 'S', o: 'O', m1: 'M1', m2: 'M2', h1: 'H1', h2: 'H2'},
        rotationControl: { serving: 'Serving', receiving: 'Receiving', s1: 'Setter at 1', s2: 'Setter at 2', s3: 'Setter at 3', s4: 'Setter at 4', s5: 'Setter at 5', s6: 'Setter at 6' },
        actionControl: { base: 'Base', serve: 'Serve', set: 'Set', switch: 'Switch', pass: 'Pass', attack: 'Attack' },
        tutorial: [
          'Next',
          'This is a player. Click to highlight it.\n\nH=Hitter, M=Middle, S=Setter, \nO=Opposite',
          'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
          'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labelled with the\nsetter\'s position',
          'These are for when you are serving',
          'These are for when you are\nreceiving',
          'Moving from circle to circle makes\n you rotate like in a match',
          'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
          'These show the player positions\n when your side is serving',
          'These show the player positions\n when your side is receiving',
        ]
      },
      'es': {
        players: { s: 'Co', o: 'O', m1: 'C1', m2: 'C2', h1: 'A1', h2: 'A2'},
        rotationControl: { serving: 'Servicio', receiving: 'Recepción', s1: 'Colocadora en 1', s2: 'Colocadora\n en 2', s3: 'Colocadora en 3', s4: 'Colocadora en 4', s5: 'Colocadora en 5', s6: 'Colocadora en 6' },
        actionControl: { base: 'Base', serve: 'Servicio', set: 'Set', switch: 'Cambiar', pass: 'Pass', attack: 'Ataque' },
        tutorial: [
          'Next',
          'This is a player. Click to highlight it.\n\nA=Atacante, C#=Central,\nCo=Colocadora,O=Opuesta',
          'This is the court, with all 6 players.\nAs you click the buttons, the players\n will move round the court',
          'This lets you select the rotations.\nClick the circle to change rotation.\nEach one is labelled with the\nsetter\'s position',
          'These are for when you are serving',
          'These are for when you are\nreceiving',
          'Moving from circle to circle makes\n you rotate like in a match',
          'This lets you select the phase of\n the rally.  The players will then\nmove around the court',
          'These show the player positions\n when your side is serving',
          'These show the player positions\n when your side is receiving',
        ]
      }
    }

    this.language = (typeof config.language === 'string' && Object.keys(this.text).includes(config.language) ) ? config.language : 'en'

    this.tutorialData = [
      {
        boxPosition: {
          left:   450 * this.svg.scale,
          right:  650 * this.svg.scale,
          top:    700 * this.svg.scale,
          bottom: 900 * this.svg.scale,
        },
        textPosition: {
          left:   700 * this.svg.scale,
          right:  1320 * this.svg.scale,
          top:    700 * this.svg.scale,
          bottom: 900 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[1],
        nextPosition: {
          left: 1120 * this.svg.scale,
          top:  950 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   100 * this.svg.scale,
          right:  1000 * this.svg.scale,
          top:    100 * this.svg.scale,
          bottom: 1000 * this.svg.scale,
        },
        textPosition: {
          left:   1050 * this.svg.scale,
          right:  1670 * this.svg.scale,
          top:    400 * this.svg.scale,
          bottom: 600 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[2],
        nextPosition: {
          left: 1470 * this.svg.scale,
          top:  650 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1650 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 270 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[3],
        nextPosition: {
          left: 900 * this.svg.scale,
          top:  300 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1330 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    150 * this.svg.scale,
          bottom: 350 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[4],
        nextPosition: {
          left: 900 * this.svg.scale,
          top:  400 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1330 * this.svg.scale,
          right:  1510 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    250 * this.svg.scale,
          bottom: 450 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[5],
        nextPosition: {
          left: 900 * this.svg.scale,
          top:  500 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   1150 * this.svg.scale,
          right:  1510 * this.svg.scale,
          top:    50 * this.svg.scale,
          bottom: 1070 * this.svg.scale,
        },
        textPosition: {
          left:   480 * this.svg.scale,
          right:  1100 * this.svg.scale,
          top:    350 * this.svg.scale,
          bottom: 550 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[6],
        nextPosition: {
          left: 900 * this.svg.scale,
          top:  600 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   80 * this.svg.scale,
          right:  1016 * this.svg.scale,
          top:    1120 * this.svg.scale,
          bottom: 1500 * this.svg.scale,
        },
        textPosition: {
          left:   90 * this.svg.scale,
          right:  710 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[7],
        nextPosition: {
          left: 760 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   80 * this.svg.scale,
          right:  1016 * this.svg.scale,
          top:    1120 * this.svg.scale,
          bottom: 1314 * this.svg.scale,
        },
        textPosition: {
          left:   140 * this.svg.scale,
          right:  760 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[8],
        nextPosition: {
          left: 810 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
      {
        boxPosition: {
          left:   80 * this.svg.scale,
          right:  1016 * this.svg.scale,
          top:    1316 * this.svg.scale,
          bottom: 1500 * this.svg.scale,
        },
        textPosition: {
          left:   190 * this.svg.scale,
          right:  810 * this.svg.scale,
          top:    880 * this.svg.scale,
          bottom: 1080 * this.svg.scale,
        },
        text: this.text[this.language].tutorial[9],
        nextPosition: {
          left: 860 * this.svg.scale,
          top:  1000 * this.svg.scale,
        },
      },
    ]

    this.court = new VBHalfCourt({
      width: (11/17) * svgWidth
    })

    this.svg.svgRoot = document.createElementNS(this.NS, 'svg')
    this.svg.svgRoot.setAttribute('width', this.svg.width)
    this.svg.svgRoot.setAttribute('height', this.svg.height)
    this.svg.snapRoot = Snap(this.svg.svgRoot)
    this.svg.snapRoot.append(this.court.getSVG())

    this.playerPositions = {
      base: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m1: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 200, y: 600 },
          m2: { x: 450, y: 700 }
        },
        2: {
          m2: { x: 700, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 100 },
          m1: { x: 200, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m2: { x: 700, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 200, y: 100 },
          m1: { x: 200, y: 600 },
          o:  { x: 450, y: 700 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 700, y: 100 },
          m2: { x: 450, y: 100 },
          s:  { x: 200, y: 100 },
          h1: { x: 200, y: 600 },
          m1: { x: 450, y: 700 }
        },
        5: {
          m1: { x: 700, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 450, y: 100 },
          m2: { x: 200, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m1: { x: 700, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 200, y: 100 },
          m2: { x: 200, y: 600 },
          s:  { x: 450, y: 700 }
        }
      },
      serveServe: {
        1: {
          s:  { x: 700, y: 940 },
          h1: { x: 580, y: 100 },
          m1: { x: 450, y: 100 },
          o:  { x: 320, y: 100 },
          h2: { x: 200, y: 600 },
          m2: { x: 450, y: 700 }
        },
        2: {
          m2: { x: 700, y: 940 },
          s:  { x: 580, y: 100 },
          h1: { x: 450, y: 100 },
          m1: { x: 320, y: 100 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 }
        },
        3: {
          h2: { x: 700, y: 940 },
          m2: { x: 580, y: 100 },
          s:  { x: 450, y: 100 },
          h1: { x: 320, y: 100 },
          m1: { x: 200, y: 600 },
          o:  { x: 450, y: 700 }
        },
        4: {
          o:  { x: 700, y: 940 },
          h2: { x: 580, y: 100 },
          m2: { x: 450, y: 100 },
          s:  { x: 320, y: 100 },
          h1: { x: 200, y: 600 },
          m1: { x: 450, y: 700 }
        },
        5: {
          m1: { x: 700, y: 940 },
          o:  { x: 580, y: 100 },
          h2: { x: 450, y: 100 },
          m2: { x: 320, y: 100 },
          s:  { x: 200, y: 600 },
          h1: { x: 450, y: 700 }
        },
        6: {
          h1: { x: 700, y: 940 },
          m1: { x: 580, y: 100 },
          o:  { x: 450, y: 100 },
          h2: { x: 320, y: 100 },
          m2: { x: 200, y: 600 },
          s:  { x: 450, y: 700 }
        }
      },
      switchServe: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 450, y: 700 },
          m2: { x: 200, y: 600 }
        },
        2: {
          m2: { x: 200, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          o:  { x: 700, y: 600 },
          h2: { x: 450, y: 700 }
        },
        3: {
          h2: { x: 450, y: 700 },
          m2: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m1: { x: 200, y: 600 },
          o:  { x: 700, y: 600 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 700 },
          m1: { x: 200, y: 600 }
        },
        5: {
          m1: { x: 200, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          s:  { x: 700, y: 600 },
          h1: { x: 450, y: 700 }
        },
        6: {
          h1: { x: 450, y: 700 },
          m1: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m2: { x: 200, y: 600 },
          s:  { x: 700, y: 600 }
        }
      },
      switchReceive: {
        1: {
          s:  { x: 700, y: 600 },
          h1: { x: 700, y: 100 },
          m1: { x: 450, y: 100 },
          o:  { x: 200, y: 100 },
          h2: { x: 450, y: 700 },
          m2: { x: 200, y: 600 }
        },
        2: {
          m2: { x: 200, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m1: { x: 450, y: 100 },
          o:  { x: 700, y: 600 },
          h2: { x: 450, y: 700 }
        },
        3: {
          h2: { x: 450, y: 700 },
          m2: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 100 },
          m1: { x: 200, y: 600 },
          o:  { x: 700, y: 600 }
        },
        4: {
          o:  { x: 700, y: 600 },
          h2: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          s:  { x: 700, y: 100 },
          h1: { x: 450, y: 700 },
          m1: { x: 200, y: 600 }
        },
        5: {
          m1: { x: 200, y: 600 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m2: { x: 450, y: 100 },
          s:  { x: 700, y: 600 },
          h1: { x: 450, y: 700 }
        },
        6: {
          h1: { x: 450, y: 700 },
          m1: { x: 450, y: 100 },
          o:  { x: 700, y: 100 },
          h2: { x: 200, y: 100 },
          m2: { x: 200, y: 600 },
          s:  { x: 700, y: 600 }
        }
      },
      receiveReceive: {
        1: {
          s:  { x: 800, y: 170 },
          h1: { x: 840, y: 60 },
          m1: { x: 760, y: 280 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 },
          m2: { x: 700, y: 600 }
        },
        2: {
          m2: { x: 700, y: 600 },
          s:  { x: 700, y: 100 },
          h1: { x: 200, y: 600 },
          m1: { x: 40, y: 160 },
          o:  { x: 260, y: 840 },
          h2: { x: 450, y: 700 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m2: { x: 740, y: 140 },
          s:  { x: 600, y: 100 },
          h1: { x: 200, y: 600 },
          m1: { x: 450, y: 700 },
          o:  { x: 560, y: 820 }
        },
        4: {
          o:  { x: 760, y: 820 },
          h2: { x: 200, y: 600 },
          m2: { x: 140, y: 140 },
          s:  { x: 60, y: 60 },
          h1: { x: 450, y: 700 },
          m1: { x: 700, y: 600 }
        },
        5: {
          m1: { x: 700, y: 600 },
          o:  { x: 840, y: 100 },
          h2: { x: 200, y: 600 },
          m2: { x: 60, y: 60 },
          s:  { x: 240, y: 140 },
          h1: { x: 450, y: 700 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m1: { x: 700, y: 140 },
          o:  { x: 560, y: 60 },
          h2: { x: 200, y: 600 },
          m2: { x: 450, y: 700 },
          s:  { x: 510, y: 170 }
        }
      },
      receiveSet: {
        1: {
          s:  { x: 600, y: 100 },
          h1: { x: 900, y: 300 },
          m1: { x: 450, y: 300 },
          o:  { x: 0,   y: 300 },
          h2: { x: 450, y: 700 },
          m2: { x: 700, y: 600 }
        },
        2: {
          m2: { x: 700, y: 600 },
          s:  { x: 600, y: 100 },
          h1: { x: 0,   y: 300 },
          m1: { x: 450, y: 300 },
          o:  { x: 200, y: 600 },
          h2: { x: 450, y: 700 }
        },
        3: {
          h2: { x: 700, y: 600 },
          m2: { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 0,   y: 300 },
          m1: { x: 450, y: 700 },
          o:  { x: 560, y: 820 }
        },
        4: {
          o:  { x: 760, y: 820 },
          h2: { x: 0,   y: 300 },
          m2: { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 700 },
          m1: { x: 700, y: 600 }
        },
        5: {
          m1: { x: 700, y: 600 },
          o:  { x: 900, y: 300 },
          h2: { x: 0,   y: 300 },
          m2: { x: 450, y: 300 },
          s:  { x: 600, y: 100 },
          h1: { x: 450, y: 700 }
        },
        6: {
          h1: { x: 700, y: 600 },
          m1: { x: 450, y: 300 },
          o:  { x: 900, y: 300 },
          h2: { x: 0,   y: 300 },
          m2: { x: 450, y: 700 },
          s:  { x: 600, y: 100 }
        }
      },
      receiveHit: {
          1: {
            s:  { x: 600, y: 100 },
            h1: { x: 800, y: 100 },
            m1: { x: 450, y: 100 },
            o:  { x: 100, y: 100 },
            h2: { x: 450, y: 700 },
            m2: { x: 700, y: 600 }
          },
          2: {
            m2: { x: 700, y: 600 },
            s:  { x: 600, y: 100 },
            h1: { x: 100, y: 100 },
            m1: { x: 450, y: 100 },
            o:  { x: 200, y: 600 },
            h2: { x: 450, y: 700 }
          },
          3: {
            h2: { x: 700, y: 600 },
            m2: { x: 450, y: 100 },
            s:  { x: 600, y: 100 },
            h1: { x: 100, y: 100 },
            m1: { x: 450, y: 700 },
            o:  { x: 560, y: 820 }
          },
          4: {
            o:  { x: 760, y: 820 },
            h2: { x: 100, y: 100 },
            m2: { x: 450, y: 100 },
            s:  { x: 600, y: 100 },
            h1: { x: 450, y: 700 },
            m1: { x: 700, y: 600 }
          },
          5: {
            m1: { x: 700, y: 600 },
            o:  { x: 800, y: 100 },
            h2: { x: 100, y: 100 },
            m2: { x: 450, y: 100 },
            s:  { x: 600, y: 100 },
            h1: { x: 450, y: 700 }
          },
          6: {
            h1: { x: 700, y: 600 },
            m1: { x: 450, y: 100 },
            o:  { x: 800, y: 100 },
            h2: { x: 100, y: 100 },
            m2: { x: 450, y: 700 },
            s:  { x: 600, y: 100 }
          }
        },
    }
    this.players = {
      s: this.court.addPlayer(this.playerPositions.base[2].s.x, this.playerPositions.base[2].s.y, this.text[this.language].players.s),
      h1: this.court.addPlayer(this.playerPositions.base[2].h1.x, this.playerPositions.base[2].h1.y, this.text[this.language].players.h1),
      m2: this.court.addPlayer(this.playerPositions.base[2].m2.x, this.playerPositions.base[2].m2.y, this.text[this.language].players.m2),
      o: this.court.addPlayer(this.playerPositions.base[2].o.x, this.playerPositions.base[2].o.y, this.text[this.language].players.o),
      h2: this.court.addPlayer(this.playerPositions.base[2].h2.x, this.playerPositions.base[2].h2.y, this.text[this.language].players.h2),
      m1: this.court.addPlayer(this.playerPositions.base[2].m1.x, this.playerPositions.base[2].m1.y, this.text[this.language].players.m1)
    }

    this.state = {
      moving: false,
      setterAt: 2
    }

    this.showTutorial = typeof config.showTutorial === 'boolean' ? config.showTutorial : true
  }

  getSVG () {
    return this.svg.svgRoot
  }

  draw () {
    if (this.drawn) {
      return
    }
    this.drawn = true
    this.court.draw()
    this.drawRotationControl()
    this.drawActionControl()
    if (this.showTutorial) {
      this.drawTutorialButton()
    }
  }

  drawRotationControl () {
    const vOffset1 = 20 * this.svg.scale
    const vOffset2 = 140 * this.svg.scale

    const box1 = this.svg.snapRoot.rect(0, 0 * this.svg.scale, 500 * this.svg.scale, 60 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box2 = this.svg.snapRoot.rect(0, 60 * this.svg.scale, 500 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box3 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (1 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box4 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (2 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box5 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (3 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const box6 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (4 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 160 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA,
    })
    const box7 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (5 * (vOffset1 + vOffset2)), 500 * this.svg.scale, 161 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB,
    })
    const backgroundBoxes = this.svg.snapRoot.group(box1, box2, box3, box4, box5, box6, box7)

    const textHeadingS = this.svg.snapRoot.text(80 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.serving).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textHeadingR = this.svg.snapRoot.text(280 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.receiving).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

    const textLabel2 = this.svg.snapRoot.text(480 * this.svg.scale, 100 * this.svg.scale, this.text[this.language].rotationControl.s2).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel1 = this.svg.snapRoot.text(480 * this.svg.scale, 100 * this.svg.scale + (1 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s1).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel6 = this.svg.snapRoot.text(480 * this.svg.scale, 100 * this.svg.scale + (2 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s6).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel5 = this.svg.snapRoot.text(480 * this.svg.scale, 100 * this.svg.scale + (3 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s5).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel4 = this.svg.snapRoot.text(480 * this.svg.scale, 100 * this.svg.scale + (4 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s4).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const textLabel3 = this.svg.snapRoot.text(480 * this.svg.scale, 100 * this.svg.scale + (5 * (vOffset1 + vOffset2)), this.text[this.language].rotationControl.s3).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'end',
      'font-family': 'Verdana',
      'font-size': '' + 28 * this.svg.scale,
    })
    const rotationLabels = this.svg.snapRoot.group(textLabel1, textLabel2, textLabel3, textLabel4, textLabel5, textLabel6)

    const joinLine1 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
        'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine2 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), 80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine3 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine4 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine5 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine6 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine7 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine8 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine9 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine10 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLine11 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
       strokeWidth: 4 * this.svg.scale,
      'stroke-dasharray': 8 * this.svg.scale + ', ' + 8 * this.svg.scale,
    })
    const joinLines = this.svg.snapRoot.group(joinLine1, joinLine2, joinLine3, joinLine4, joinLine5, joinLine6, joinLine7, joinLine8, joinLine9, joinLine10, joinLine11)

    const setLineS = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLineR = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
    })
    const setLines = this.svg.snapRoot.group(setLineS, setLineR)

    this.controlTwoSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlColour,
      cursor: 'pointer',
    })
    this.controlTwoRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlOneSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlOneRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })

    this.controlSixSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })
    this.controlSixRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlFiveSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius)
    this.controlFiveSrv.attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlFiveRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })

    this.controlFourSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })
    this.controlFourRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer',
    })

    this.controlThreeSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    this.controlThreeRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourB,
      cursor: 'pointer',
    })
    const controlCircles = this.svg.snapRoot.group(this.controlOneSrv, this.controlTwoSrv, this.controlThreeSrv, this.controlFourSrv, this.controlFiveSrv, this.controlSixSrv,
        this.controlOneRcv, this.controlTwoRcv, this.controlThreeRcv, this.controlFourRcv, this.controlFiveRcv, this.controlSixRcv)

    this.controlTwoRcv.click(() => {this.state.setterAt = 2;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlTwoSrv.click(() => {this.state.setterAt = 2;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlOneRcv.click(() => {this.state.setterAt = 1;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlOneSrv.click(() => {this.state.setterAt = 1;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlSixRcv.click(() => {this.state.setterAt = 6;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);  this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlSixSrv.click(() => {this.state.setterAt = 6;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFiveRcv.click(() => {this.state.setterAt = 5;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFiveSrv.click(() => {this.state.setterAt = 5;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFourRcv.click(() => {this.state.setterAt = 4;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlFourSrv.click(() => {this.state.setterAt = 4;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlThreeRcv.click(() => {this.state.setterAt = 3;if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlThreeSrv.click(() => {this.state.setterAt = 3;if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.rotationControls = this.svg.snapRoot.group(backgroundBoxes, headingLabels, rotationLabels, joinLines, setLines, controlCircles)

    this.rotationControls.transform(`t${1150 * this.svg.scale}, ${50 * this.svg.scale}`)
  }

  drawActionControl () {
    const actionBox1 = this.svg.snapRoot.rect(0, 170 * this.svg.scale, 188 * this.svg.scale, 380 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBox2 = this.svg.snapRoot.rect(188 * this.svg.scale, 170 * this.svg.scale, 188 * this.svg.scale, 380 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const actionBox3 = this.svg.snapRoot.rect(376 * this.svg.scale, 170 * this.svg.scale, 188 * this.svg.scale, 380 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBox4 = this.svg.snapRoot.rect(564 * this.svg.scale, 170 * this.svg.scale, 184 * this.svg.scale, 380 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourA
    })
    const actionBox5 = this.svg.snapRoot.rect(748 * this.svg.scale, 170 * this.svg.scale, 192 * this.svg.scale, 380 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const actionBoxes = this.svg.snapRoot.group(actionBox1, actionBox2, actionBox3, actionBox4, actionBox5)

    const linkBar1 = this.svg.snapRoot.rect(940 * this.svg.scale, 230 * this.svg.scale, 230 * this.svg.scale, 40 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar2 = this.svg.snapRoot.rect(1130 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 150 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar3 = this.svg.snapRoot.rect(940 * this.svg.scale, 430 * this.svg.scale, 430 * this.svg.scale, 40 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkBar4 = this.svg.snapRoot.rect(1330 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 350 * this.svg.scale).attr({
      fill: this.colours.rotationControlBackgroundColourB
    })
    const linkLine1 = this.svg.snapRoot.line(90 * this.svg.scale, 250 * this.svg.scale, 1150 * this.svg.scale, 250 * this.svg.scale).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine2 = this.svg.snapRoot.line(1150 * this.svg.scale, 250 * this.svg.scale, 1150 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine3 = this.svg.snapRoot.line(90 * this.svg.scale, 450 * this.svg.scale, 1350 * this.svg.scale, 450 * this.svg.scale).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const linkLine4 = this.svg.snapRoot.line(1350 * this.svg.scale, 450 * this.svg.scale, 1350 * this.svg.scale, 20 * this.svg.scale + this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
    })
    const links = this.svg.snapRoot.group(linkBar1, linkBar2, linkBar3, linkBar4, linkLine1, linkLine2, linkLine3, linkLine4)

    const textHeadingS = this.svg.snapRoot.text(70 * this.svg.scale, 206 * this.svg.scale, this.text[this.language].rotationControl.serving)
    textHeadingS.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale
    })
    const textHeadingR = this.svg.snapRoot.text(80 * this.svg.scale, 396 * this.svg.scale, this.text[this.language].rotationControl.receiving)
    textHeadingR.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 28 * this.svg.scale
    })
    const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

    this.controlServeBase = this.svg.snapRoot.circle(90 * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlColour,
      cursor: 'pointer'
    })
    this.controlServeServe = this.svg.snapRoot.circle(460 * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlServeSwitch = this.svg.snapRoot.circle(830 * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    const controlServe = this.svg.snapRoot.group(this.controlServeBase, this.controlServeServe, this.controlServeSwitch)

    this.controlReceiveBase = this.svg.snapRoot.circle(90 * this.svg.scale, 450 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveReceive = this.svg.snapRoot.circle(274 * this.svg.scale, 450 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveSet = this.svg.snapRoot.circle(460 * this.svg.scale, 450 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveHit = this.svg.snapRoot.circle(646 * this.svg.scale, 450 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    this.controlReceiveSwitch = this.svg.snapRoot.circle(830 * this.svg.scale, 450 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
      stroke: this.colours.rotationControlColour,
      strokeWidth: 4 * this.svg.scale,
      fill: this.colours.rotationControlBackgroundColourA,
      cursor: 'pointer'
    })
    const controlReceive = this.svg.snapRoot.group(this.controlReceiveBase, this.controlReceiveReceive, this.controlReceiveSet, this.controlReceiveHit, this.controlReceiveSwitch)

    const textLabelS1 = this.svg.snapRoot.text(90 * this.svg.scale, 330 * this.svg.scale, this.text[this.language].actionControl.base).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelS2 = this.svg.snapRoot.text(460 * this.svg.scale, 330 * this.svg.scale, this.text[this.language].actionControl.serve).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelS3 = this.svg.snapRoot.text(830 * this.svg.scale, 330 * this.svg.scale, this.text[this.language].actionControl.switch).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelS = this.svg.snapRoot.group(textLabelS1, textLabelS2, textLabelS3)

    const textLabelR1 = this.svg.snapRoot.text(90 * this.svg.scale, 530 * this.svg.scale, this.text[this.language].actionControl.base).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelR2 = this.svg.snapRoot.text(274 * this.svg.scale, 530 * this.svg.scale, this.text[this.language].actionControl.pass).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelR3 = this.svg.snapRoot.text(460 * this.svg.scale, 530 * this.svg.scale, this.text[this.language].actionControl.set).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelR4 = this.svg.snapRoot.text(646 * this.svg.scale, 530 * this.svg.scale, this.text[this.language].actionControl.attack).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelR5 = this.svg.snapRoot.text(830 * this.svg.scale, 530 * this.svg.scale, this.text[this.language].actionControl.switch).attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale
    })
    const textLabelR = this.svg.snapRoot.group(textLabelR1, textLabelR2, textLabelR3, textLabelR4, textLabelR5)

    this.controlServeBase.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlServeServe.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeServe); this.move(this.playerPositions.serveServe[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlServeSwitch.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, true, this.controlServeSwitch); this.move(this.playerPositions.switchServe[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveBase.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveBase); this.move(this.playerPositions.base[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveReceive.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveReceive); this.move(this.playerPositions.receiveReceive[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveSet.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveSet); this.move(this.playerPositions.receiveSet[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveHit.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveHit); this.move(this.playerPositions.receiveHit[this.state.setterAt], 600).then(() => this.state.moving = false)}})
    this.controlReceiveSwitch.click(() => {if (!this.state.moving) {this.controlSelect(this.state.setterAt, false, this.controlReceiveSwitch); this.move(this.playerPositions.switchReceive[this.state.setterAt], 600).then(() => this.state.moving = false)}})

    this.actionControls = this.svg.snapRoot.group(actionBoxes, links, headingLabels, controlServe, controlReceive, textLabelS, textLabelR)

    this.actionControls.transform(`t${80 * this.svg.scale}, ${950 * this.svg.scale}`)
  }

  controlSelect (setterPos, serving, action) {
    this.controlTwoRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlTwoSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlOneRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlOneSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlSixRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlSixSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlFiveRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlFiveSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlFourRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlFourSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlThreeRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
    this.controlThreeSrv.attr({fill: this.colours.rotationControlBackgroundColourB})

    let currentControl
    if (setterPos === 1) {
      currentControl = serving ? this.controlOneSrv : this.controlOneRcv
    }
    else if (setterPos === 2) {
      currentControl = serving ? this.controlTwoSrv : this.controlTwoRcv
    }
    else if (setterPos === 3) {
      currentControl = serving ? this.controlThreeSrv : this.controlThreeRcv
    }
    else if (setterPos === 4) {
      currentControl = serving ? this.controlFourSrv : this.controlFourRcv
    }
    else if (setterPos === 5) {
      currentControl = serving ? this.controlFiveSrv : this.controlFiveRcv
    }
    else if (setterPos === 6) {
      currentControl = serving ? this.controlSixSrv : this.controlSixRcv
    }

    currentControl.attr({fill: this.colours.rotationControlColour})
    this.actionSelect(action)
  }

  actionSelect (action) {
    this.controlServeBase.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlServeServe.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlServeSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveBase.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveReceive.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveSet.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveHit.attr({fill: this.colours.rotationControlBackgroundColourA})
    this.controlReceiveSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
    action.attr({fill: this.colours.rotationControlColour})
  }

  drawTutorialButton () {
    const tutorialButtonBox = this.svg.snapRoot.rect(1500 * this.svg.scale , 1420 * this.svg.scale, 200 * this.svg.scale, 80 * this.svg.scale)
    tutorialButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    const tutorialButtonText = this.svg.snapRoot.text(1600 * this.svg.scale, 1476 * this.svg.scale, 'Tutorial')
    tutorialButtonText.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale,
    })

    this.tutorialButton = this.svg.snapRoot.group(tutorialButtonBox, tutorialButtonText)
    this.tutorialButton.attr({ cursor: 'pointer' })

    this.tutorialButton.click(() => {
      this.drawTutorial(0)
    })
  }

  drawTutorial (index) {
    if (index >= this.tutorialData.length) {
      return
    }

    var p1 = this.svg.snapRoot.path("M0 0 H" + this.svg.width + "V" + this.svg.height + "H0Z " +
      "M" + this.tutorialData[index].boxPosition.right + " " + this.tutorialData[index].boxPosition.top + " " +
      "H" + this.tutorialData[index].boxPosition.left + "V" + this.tutorialData[index].boxPosition.bottom +
      "H" + this.tutorialData[index].boxPosition.right + "Z")

    this.tutorialMask = this.svg.snapRoot.group(p1)
    this.tutorialMask.attr({
      'fill-rule': 'evenodd',
      'fill': this.colours.tutorialFade,
      'fill-opacity': 0.8
    })

    this.tutorialMaskEdge = this.svg.snapRoot.rect(
      this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.top,
      this.tutorialData[index].boxPosition.right - this.tutorialData[index].boxPosition.left,
      this.tutorialData[index].boxPosition.bottom - this.tutorialData[index].boxPosition.top
    )
    this.tutorialMaskEdge.attr({
      stroke: this.colours.tutorialColour,
      fill: 'none'
    })

    var textBox = this.svg.snapRoot.rect(
      this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.top,
      this.tutorialData[index].textPosition.right - this.tutorialData[index].textPosition.left,
      this.tutorialData[index].textPosition.bottom - this.tutorialData[index].textPosition.top
    )
    textBox.attr({
      fill: this.colours.tutorialColour
    })

    this.tutorialTextBox = this.svg.snapRoot.group(textBox)

    var textChunks = this.tutorialData[index].text.split('\n')
    for(var i = 0; i < textChunks.length; i++) {
      var textLine = this.svg.snapRoot.text(this.tutorialData[index].textPosition.left + (10 * this.svg.scale),
        this.tutorialData[index].textPosition.top + (42 * this.svg.scale) + (i * 40 * this.svg.scale),
        textChunks[i])
      textLine.attr({
        fill: this.colours.rotationControlColour,
        stroke: this.colours.rotationControlColour,
        strokeWidth: 2  * this.svg.scale,
        'text-anchor': 'left',
        'font-family': 'Verdana',
        'font-size': 32 * this.svg.scale,
        cursor: 'pointer',
      })
      this.tutorialTextBox.add(textLine)
    }

    var nextButtonBox = this.svg.snapRoot.rect(
      this.tutorialData[index].nextPosition.left,
      this.tutorialData[index].nextPosition.top,
      200 * this.svg.scale,
      80 * this.svg.scale
    )
    nextButtonBox.attr({
      fill: this.colours.tutorialColour
    })
    var nextButtonText = this.svg.snapRoot.text(this.tutorialData[index].nextPosition.left + 100 * this.svg.scale,
      this.tutorialData[index].nextPosition.top + (56 * this.svg.scale),
      this.text[this.language].tutorial[0]
    )
    nextButtonText.attr({
      fill: this.colours.rotationControlColour,
      stroke: this.colours.rotationControlColour,
      strokeWidth: 2 * this.svg.scale,
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size': 44 * this.svg.scale,
      cursor: 'pointer',
    })

    this.tutorialNextButton = this.svg.snapRoot.group(nextButtonBox, nextButtonText)
    this.tutorialNextButton.attr({ cursor: 'pointer' })

    this.tutorialNextButton.click(() => {
      this.tutorialMask.remove()
      this.tutorialTextBox.remove()
      this.tutorialNextButton.remove()
      this.tutorialMaskEdge.remove()
      this.drawTutorial(index+1)
    })
  }

  move (players, time) {
    this.state.moving = true

    this.players.s.setPosition(players.s.x, players.s.y)
    this.players.o.setPosition(players.o.x, players.o.y)
    this.players.m1.setPosition(players.m1.x, players.m1.y)
    this.players.m2.setPosition(players.m2.x, players.m2.y)
    this.players.h1.setPosition(players.h1.x, players.h1.y)
    this.players.h2.setPosition(players.h2.x, players.h2.y)

    return this.court.draw()
  }
}