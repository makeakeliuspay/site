/**
 * evaluer-data.js — recognized Quebec tenancy problems and their deterministic mapping.
 *
 * Every string here is pre-written and grounded in documented campaign sources
 * (the site's About page + the campaign's worked legal specifics). Nothing is
 * generated at runtime. No statute, number, or remedy appears here that is not
 * grounded in those sources. The test suite enforces that: any "art. NNNN" that
 * is not on ALLOWED_CITATIONS fails the build.
 *
 * Works in the browser (attaches to window.EvaluerData) and in Node
 * (module.exports) so the same logic the page runs is the logic the tests check.
 */
(function (root) {
  'use strict';

  // Legal article numbers grounded in the documented sources. The only C.c.Q.
  // article numbers allowed to appear anywhere in tool output.
  var ALLOWED_CITATIONS = ['1854', '1902', '1903', '1904'];

  // Each category maps a plain-language situation to a documented legal basis,
  // a per-issue documentation checklist, the TAL next step, and the kinds of
  // remedies the TAL can order. Never a promise of outcome.
  var CATEGORIES = [
    {
      id: 'jouissance',
      name: {
        fr: 'Harcèlement, voisin dangereux, ou pression pour partir',
        en: 'Harassment, a dangerous neighbour, or pressure to leave'
      },
      desc: {
        fr: "Votre propriétaire vous harcèle, vous pousse à quitter, ou n'agit pas contre un voisin menaçant ou dangereux.",
        en: 'Your landlord harasses you, pressures you to leave, or fails to act on a threatening or dangerous neighbour.'
      },
      basis: {
        fr: 'Jouissance paisible du logement',
        en: 'Peaceful enjoyment of your home'
      },
      cite: {
        fr: "Article 1854 C.c.Q. — le locateur est tenu de vous procurer la jouissance paisible du logement pendant toute la durée du bail. Ne pas agir contre un voisin menaçant peut être un manquement.",
        en: 'Article 1854 C.c.Q. — the landlord must provide you with peaceful enjoyment of the dwelling for the entire lease. Failing to act on a threatening neighbour can be a breach.'
      },
      document: {
        fr: [
          'La date et une description de chaque incident',
          'Chaque plainte faite au propriétaire, et sa réponse — ou son absence de réponse',
          'Les noms ou coordonnées de témoins',
          "Tout rapport de police, s'il y a lieu"
        ],
        en: [
          'The date and a description of each incident',
          'Every complaint you made to the landlord, and their response — or lack of one',
          'The names or contact details of any witnesses',
          'Any police report, if applicable'
        ]
      },
      remedies: {
        fr: 'Le TAL peut accorder une réduction de loyer, des dommages, et jusqu’à 25 000 $ en dommages punitifs pour harcèlement.',
        en: 'The TAL can award a rent reduction, damages, and up to $25,000 in punitive damages for harassment.'
      }
    },
    {
      id: 'entree',
      name: {
        fr: 'Entrée sans préavis suffisant',
        en: 'Entry without proper notice'
      },
      desc: {
        fr: "Le propriétaire ou un sous-traitant est entré, ou a exigé d'entrer, avec un préavis insuffisant ou une fenêtre horaire déraisonnable.",
        en: 'The landlord or a contractor entered, or demanded to enter, with too little notice or an unreasonable time window.'
      },
      basis: {
        fr: "Préavis et conditions d'accès au logement",
        en: 'Notice and conditions of access to the dwelling'
      },
      cite: {
        fr: "Articles 1902 à 1904 C.c.Q. — encadrent les conditions d'accès et interdisent le harcèlement visant à vous faire quitter. L'accès exige normalement un préavis (souvent 24 heures) et une fenêtre raisonnable.",
        en: 'Articles 1902 to 1904 C.c.Q. — govern conditions of access and prohibit harassment aimed at making you leave. Access normally requires notice (often 24 hours) and a reasonable time window.'
      },
      document: {
        fr: [
          "L'avis lui-même : quand vous l'avez reçu, la date d'entrée prévue, et la fenêtre horaire",
          'Ce qui était exigé de vous (par exemple confiner un animal, ou être présent toute la journée)',
          'Si cela fait partie d’un schéma qui se répète',
          'Toute déclaration du propriétaire ou du sous-traitant'
        ],
        en: [
          'The notice itself: when you received it, the planned entry date, and the time window',
          'What was demanded of you (for example confining a pet, or being home all day)',
          'Whether this is part of a repeating pattern',
          'Any statement from the landlord or contractor'
        ]
      },
      remedies: {
        fr: 'Le TAL peut accorder une réduction de loyer rétroactive et des dommages. Si l’entrée fait partie d’un schéma, cela peut constituer du harcèlement.',
        en: 'The TAL can award a backdated rent reduction and damages. If the entry is part of a pattern, it can amount to harassment.'
      }
    },
    {
      id: 'service',
      name: {
        fr: 'Perte de service ou entretien refusé',
        en: 'Loss of service or refused maintenance'
      },
      desc: {
        fr: "Un service a diminué ou disparu (pression d'eau, chauffage, entrée sans clé, ascenseur…) sans réduction de loyer, ou des réparations sont refusées.",
        en: 'A service dropped or stopped (water pressure, heat, keyless entry, elevator…) with no rent reduction, or repairs are being refused.'
      },
      basis: {
        fr: 'Réduction de service sans réduction de loyer, et obligation d’entretien',
        en: 'Reduced service without a rent reduction, and the duty to maintain'
      },
      cite: {
        fr: "Reconnu par le TAL comme litige de réduction de service et d'entretien (voir la page À propos). Le Québec fixe des minimums, dont une pression d'eau minimale.",
        en: 'Recognized by the TAL as a reduction-of-service and maintenance dispute (see the About page). Quebec sets minimums, including a minimum water pressure.'
      },
      document: {
        fr: [
          'Quand le problème a commencé et comment il a évolué',
          'Photos, vidéos ou mesures',
          'Chaque demande de réparation par écrit, et la réponse reçue',
          'Une inspection municipale (311) pour un problème de salubrité ou d’entretien',
          'Votre bail, qui montre le service inclus'
        ],
        en: [
          'When the problem started and how it changed over time',
          'Photos, videos, or measurements',
          'Every repair request in writing, and the response you got',
          'A municipal (311) inspection for a health or maintenance problem',
          'Your lease, showing the included service'
        ]
      },
      remedies: {
        fr: 'Le TAL peut accorder une réduction de loyer proportionnelle au service perdu, rétroactive au début du problème.',
        en: 'The TAL can award a rent reduction proportional to the lost service, backdated to when the problem began.'
      }
    },
    {
      id: 'loyer',
      name: {
        fr: 'Hausse de loyer abusive ou avis de non-renouvellement',
        en: 'Improper rent increase or non-renewal notice'
      },
      desc: {
        fr: "Une augmentation dépasse le taux permis sans votre accord, ou vous avez reçu un avis de non-renouvellement.",
        en: 'An increase exceeds the allowed rate without your agreement, or you received a non-renewal notice.'
      },
      basis: {
        fr: 'Fixation du loyer et reconduction du bail',
        en: 'Rent setting and lease renewal'
      },
      cite: {
        fr: "Reconnu par le TAL (voir la page À propos). Au Québec, le bail se reconduit automatiquement ; un refus exige un motif valide et respecte des délais stricts.",
        en: 'Recognized by the TAL (see the About page). In Quebec a lease renews automatically; refusing renewal requires a valid reason and strict deadlines apply.'
      },
      urgent: true,
      document: {
        fr: [
          "L'avis reçu et sa date",
          'Votre loyer actuel et le loyer proposé',
          'Votre bail'
        ],
        en: [
          'The notice you received and its date',
          'Your current rent and the proposed rent',
          'Your lease'
        ]
      },
      remedies: {
        fr: 'Le TAL peut refuser ou ajuster la hausse. Des délais stricts s’appliquent — contactez le TAL sans tarder.',
        en: 'The TAL can refuse or adjust the increase. Strict deadlines apply — contact the TAL without delay.'
      }
    },
    {
      id: 'eviction',
      name: {
        fr: 'Éviction ou reprise de mauvaise foi',
        en: 'Bad-faith eviction or repossession'
      },
      desc: {
        fr: "Un avis d'éviction pour rénovations majeures, ou une reprise par le propriétaire, que vous croyez être un prétexte.",
        en: 'An eviction notice for major renovations, or a repossession by the landlord, that you believe is a pretext.'
      },
      basis: {
        fr: 'Éviction de mauvaise foi',
        en: 'Bad-faith eviction'
      },
      cite: {
        fr: "Reconnu par le TAL comme litige d'éviction de mauvaise foi (voir la page À propos).",
        en: 'Recognized by the TAL as a bad-faith eviction dispute (see the About page).'
      },
      urgent: true,
      document: {
        fr: [
          "L'avis d'éviction et sa date",
          'Le motif invoqué',
          'Tout indice que le motif est un prétexte (par exemple, logement reloué plus cher ensuite)'
        ],
        en: [
          'The eviction notice and its date',
          'The reason given',
          'Any sign the reason is a pretext (for example, the unit re-listed at a higher rent afterward)'
        ]
      },
      remedies: {
        fr: 'Le TAL peut conclure à la mauvaise foi et accorder des dommages.',
        en: 'The TAL can find bad faith and award damages.'
      }
    }
  ];

  // General TAL information shown alongside any result. All grounded in the
  // About page: filing cost $0–$104, file online/mail/in person, no lawyer
  // required, keep your documentation.
  var GENERAL = {
    fr: 'Déposer une demande au TAL coûte de 0 $ à 104 $. Vous pouvez déposer en ligne, par la poste, ou en personne. Vous n’avez pas besoin d’un avocat. Conservez toute votre documentation.',
    en: 'Filing at the TAL costs $0 to $104. You can file online, by mail, or in person. You do not need a lawyer. Keep all of your documentation.'
  };

  // Repeated, non-negotiable framing: this organizes a potential claim; it is
  // not legal advice and promises no outcome.
  var DISCLAIMER = {
    fr: 'Cet outil vous aide à organiser une réclamation potentielle. Ce n’est pas un avis juridique et ce n’est pas une garantie de résultat.',
    en: 'This tool helps you organize a potential claim. It is not legal advice, and it is not a guarantee of any outcome.'
  };

  function categoryById(id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i];
    }
    return null;
  }

  /**
   * Build the organized situation map for the selected category ids, in the
   * given language ('fr' or 'en'). Returns a plain, already-localized object —
   * no interpretation of free text, no inference beyond the selected ids.
   */
  function buildSituation(selectedIds, lang) {
    var L = (lang === 'en') ? 'en' : 'fr';
    var items = [];
    (selectedIds || []).forEach(function (id) {
      var cat = categoryById(id);
      if (!cat) return; // ignore unknown ids; never fabricate a category
      items.push({
        id: cat.id,
        name: cat.name[L],
        basis: cat.basis[L],
        cite: cat.cite[L],
        document: cat.document[L].slice(),
        remedies: cat.remedies[L],
        urgent: !!cat.urgent
      });
    });
    return {
      lang: L,
      items: items,
      general: GENERAL[L],
      disclaimer: DISCLAIMER[L]
    };
  }

  var api = {
    ALLOWED_CITATIONS: ALLOWED_CITATIONS,
    CATEGORIES: CATEGORIES,
    GENERAL: GENERAL,
    DISCLAIMER: DISCLAIMER,
    categoryById: categoryById,
    buildSituation: buildSituation
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.EvaluerData = api;
})(typeof window !== 'undefined' ? window : this);
