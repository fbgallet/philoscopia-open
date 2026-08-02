# philoscopia-mcp

**[English](README.md) · Français**

Un serveur MCP qui permet à n'importe quel LLM de travailler avec le [référentiel Philoscopia](https://github.com/fbgallet/philoscopia-open) : explorer les axes de positions philosophiques, lire les profils de figures, et construire **votre propre profil philosophique** dans un espace de travail local et privé. Le référentiel est également consultable en ligne sur [philoscopia.com](https://www.philoscopia.com).

Plus qu'un service de consultation : le corpus est **sourcé et didactique** — distillé de plus de vingt ans d'enseignement de la philosophie — et les outils sont conçus pour que vous (et votre assistant) puissiez véritablement *faire* de la philosophie, et pas seulement la lire : mettre au jour les positions que vous tenez déjà, les éprouver face aux objections les plus fortes, et tenir un espace de travail structuré de votre propre pensée.

Tout s'exécute sur votre machine. Le corpus est embarqué dans le paquet (chaque version fige un état exact du référentiel) ; le serveur ne fait **aucun appel réseau**, et votre espace de travail est un simple dossier de JSON et de markdown qui vous appartient, que vous lisez, modifiez et versionnez à votre guise.

## Installation

Avec Claude Code :

```bash
claude mcp add philoscopia -- npx -y philoscopia-mcp --workspace ~/my-philosophy
```

Avec Claude Desktop (ou n'importe quel client MCP), ajoutez à la configuration :

```json
{
  "mcpServers": {
    "philoscopia": {
      "command": "npx",
      "args": ["-y", "philoscopia-mcp"]
    }
  }
}
```

Options : `--workspace <dir>` (par défaut `$PHILOSCOPIA_WORKSPACE`, puis `~/my-philosophy`) et `--locale fr|en` (une fois un espace de travail créé, la locale de son manifeste l'emporte). Dans une configuration client au format JSON, passez à `--workspace` un chemin **absolu** — le `~` n'est développé que par un shell.

## Outils

Guidage — le serveur fournit aussi des `instructions` (injectées dans le contexte de l'assistant à la connexion), de sorte que tout client MCP sait comment procéder sans configuration supplémentaire :

| Outil | Rôle |
|---|---|
| `help` | Le guide d'usage complet : déroulé d'une session type, règles d'enregistrement, règles de soin |
| `orient` | L'aperçu d'ouverture de session, destiné à être reformulé simplement à l'utilisateur : ce qu'offre le référentiel, qui est l'utilisateur (expertise, objectifs, motivations), où en est son carnet, le fil laissé ouvert la dernière fois, et le menu de la session |

Référentiel (lecture seule) :

| Outil | Rôle |
|---|---|
| `list_axes` | Digest compact de tous les axes (id, question, pôles), regroupés par relation — le point d'entrée |
| `get_axis` | Un axe : pôles, enjeux, figures d'ancrage, arguments canoniques par pôle (sous-problèmes détachés, voir plus bas) |
| `get_axis_problems` | La carte des sous-problèmes vivants de l'axe, pour une exploration approfondie |
| `get_entity` | Toute entité par sa référence préfixée : `ph:epictetus`, `c:eudaimonia`, `arg:…` (un argument/une objection)… — les figures arrivent sous forme de digest (`full:true` pour le profil complet) |
| `get_position` | La position sourcée d'une figure sur un axe (`axisId`) ou plusieurs (`axisIds`) |
| `search` | Recherche par sous-chaîne dans tout le corpus (insensible aux diacritiques) |
| `get_tensions_for` | Paires de positions en tension impliquant un axe |
| `get_foundations_for` | Relations de fondation (croyance → croyance/valeur) impliquant un axe |

Espace de travail (fichiers locaux, validés contre les schémas à chaque écriture) :

| Outil | Rôle |
|---|---|
| `init_workspace` | Créer `my-philosophy/` (manifeste, profil et collections vides), éventuellement avec le bloc utilisateur |
| `set_user` | Mettre à jour qui est l'utilisateur : expertise (`BEGINNER` / `AMATEUR` / `EXPERT`), objectifs et motivations dans ses propres mots — le registre auquel chaque session s'adapte |
| `get_profile` / `record_position` | Lire et enregistrer des positions sur les axes, avec provenance, raisons et un historique en ajout seul |
| `add_entry` / `update_entry` / `list_entries` | Croyances personnelles, concepts, amours & détestations, enquêtes ouvertes, pratiques, citations conservées (le florilège — toujours verbatim) et le registre de lecture (avec une liste `TO_READ`) |
| `log_session` | Écrire le récit de la session dans `journal/` ; éventuellement fixer `next`, le fil à reprendre la prochaine fois (resservi par `orient`) |
| `profile_summary` | Couverture, tensions déclenchées, croyances sans fondement, travail en cours ; régénère éventuellement le `summary.md` lisible |
| `get_syntheses` / `write_synthesis` | Lire les synthèses de profil passées et en écrire une nouvelle : un portrait en prose daté et immuable dans `syntheses/`, croisant positions, carnet et bloc utilisateur (voir la skill `philo-synthesize`) |
| `compact` | Déplacer les enregistrements clos vers `archive/` (rien n'est supprimé) |

Le format des fichiers de l'espace de travail est spécifié par les [schémas JSON](../schemas/workspace/) publiés ; chaque écriture est validée contre eux, plus les règles que les schémas ne peuvent porter (une entrée POSITIONED requiert une valeur, les valeurs doivent respecter la forme des pôles de l'axe, les références au référentiel doivent se résoudre). Le serveur ne touche jamais qu'aux fichiers que le format nomme : les fichiers supplémentaires qu'un autre outil garderait dans le même dossier (p. ex. le coffre local de l'application web : `session.json`, `notes/`, `Inbox.md`) sont ignorés, et une référence qui ne se résout plus après une mise à jour du corpus est signalée par `profile_summary`, jamais bloquée à l'écriture.

## Prompts de session (rien à installer)

Outre les outils, le serveur expose des **prompts de session** — des amorces que votre client fait apparaître dans son menu de prompts (le `+` de Claude Desktop). Choisissez-en un et le protocole de session correspondant se charge dans la conversation, avec un focus facultatif à renseigner (un thème, une croyance, une figure…) :

| Prompt | Amorce |
|---|---|
| `problematize` | Laisser émerger une vraie question philosophique à partir de ce que vous aimez, détestez ou tenez pour évident |
| `discover` | Mettre au jour, situer et enregistrer ce que vous pensez d'une question |
| `examine` | Soumettre l'une de vos positions à un examen socratique |
| `compare` | Un face-à-face avec les positions d'un philosophe ou d'un mouvement |
| `read` | Lire un passage ensemble, en trois passes |
| `concept` | Éprouver un concept sur une situation réelle, ou forger le vôtre |
| `articulate` | Exercices de formulation pour votre propre pensée |
| `synthesize` | Un portrait en prose daté de l'ensemble de votre profil |

Chaque prompt porte le protocole complet de la skill correspondante — ils sont générés depuis le même `SKILL.md`, ils ne divergent donc jamais — avec une **dégradation gracieuse** : si vous avez installé la skill, le prompt ne fait que la déclencher ; sinon, le protocole voyage avec le message. Dans les deux cas, aucune configuration n'est nécessaire pour un vrai guidage, et le menu rend les possibilités **découvrables** — ce qu'une skill déclenchée silencieusement en arrière-plan ne peut pas faire.

## Aller plus loin : les skills d'exploration

Le serveur seul guide votre assistant dans les bases (le guide intégré ci-dessus), et les prompts de session portent le savoir-faire complet à la demande. Pour l'expérience la plus fluide, installez les huit **[skills d'exploration](../skills/)** : faire naître une vraie question à partir de votre propre matière, la découverte guidée par six portes, l'examen socratique avec un curseur d'intensité, la comparaison de figures, la lecture de texte pilotée par les difficultés, le travail des concepts, l'entraînement à la formulation, et la synthèse de profil datée. Une skill n'est qu'une fiche d'instructions en markdown que votre assistant lit — rien ne s'exécute ; le [README des skills](../skills/README.fr.md) vous accompagne dans l'installation pour chaque client, y compris une option sans installation (coller le contenu de la skill dans la conversation).

Les skills et les prompts ci-dessus sont **complémentaires** : une skill est *déclenchée automatiquement* — l'assistant y recourt de lui-même quand votre formulation correspond, sans intervention, mais cette correspondance n'est jamais garantie — tandis qu'un prompt est *choisi dans le menu*, déterministe et auto-descriptif. Installer les skills donne la voie mains libres ; les prompts ne demandent rien et partagent la même source de vérité.

## Quoi demander à votre assistant

- « Montre-moi les axes sur le moi, et voyons où je me situe sur le libre arbitre. »
- « Défie ma position sur la LIBERTÉ avec une expérience de pensée, puis enregistre ce qui survit. »
- « Compare mon profil avec Épictète. »
- « Résume ma philosophie et ce qui reste inexaminé. »

## Développement

Dans le dépôt, le serveur lit `../data` en direct (aucun embarquement nécessaire) :

```bash
cd mcp && npm install && npm run smoke   # build + test de bout en bout sur stdio
```

`npm pack`/`npm publish` figent `../data` et `../schemas` dans le paquet via le hook `prepack`.

## Soutenir & suivre

Si ce projet vous est utile, vous pouvez soutenir notre travail sur **[Ko-fi](https://ko-fi.com/philoscopia)** (également via [GitHub Sponsors](https://github.com/sponsors/fbgallet)), et suivre le projet sur **[X (@fbgallet)](https://x.com/fbgallet)** et **[Bluesky (@fbgallet.bsky.social)](https://bsky.app/profile/fbgallet.bsky.social)**.

## Licence

MIT (code). Le corpus embarqué est sous [CC BY-SA 4.0](../LICENSE).
