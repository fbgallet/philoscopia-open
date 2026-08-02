# Skills d'exploration

**[English](README.md) · Français**

Huit [skills d'agent](https://agentskills.io) qui transforment n'importe quel assistant capable en compagnon philosophique par-dessus le [serveur MCP Philoscopia](../mcp/README.fr.md) : elles portent le savoir-faire conversationnel (comment conduire une session), tandis que le serveur porte les données et la persistance.

> Les fichiers `SKILL.md` sont rédigés en anglais : ce sont les instructions que lit l'assistant, et il dialogue avec vous en français sans difficulté. Les garder dans une seule langue en fait une source de vérité unique — le même `SKILL.md` alimente aussi les prompts de session du serveur.

| Skill | Rôle |
|---|---|
| [`philo-problematize`](philo-problematize/SKILL.md) | Faire émerger une vraie question philosophique à partir de la matière propre de la personne, la trier face aux réponses scientifiques, psychologiques, historiques ou de développement personnel, et la conserver comme enquête vivante |
| [`philo-discover`](philo-discover/SKILL.md) | Mettre au jour des positions que la personne ne se sait pas tenir, par six portes (opinions communes, expériences de pensée, dilemmes, amours & détestations, théories, citations) |
| [`philo-examine`](philo-examine/SKILL.md) | Éprouver une position ou une croyance existante avec rigueur socratique (objections, racines, tensions, alternatives, vivabilité) |
| [`philo-compare`](philo-compare/SKILL.md) | Comparer le profil de la personne avec un philosophe ou un mouvement, et exploiter les différences |
| [`philo-read`](philo-read/SKILL.md) | Lire un texte philosophique AVEC la personne : suivre le fil, repérer et travailler ses difficultés (compréhension → explication, recevabilité → justification), laisser le texte l'interroger |
| [`philo-concept`](philo-concept/SKILL.md) | Travailler un concept comme un dispositif intellectuel : l'essayer et éprouver ce qu'il change, ou forger le sien par contre-exemples |
| [`philo-articulate`](philo-articulate/SKILL.md) | S'entraîner à formuler sa pensée : thèses en une phrase, changements d'auditoire, steelmanning, l'essai d'une minute |
| [`philo-synthesize`](philo-synthesize/SKILL.md) | Générer la synthèse de profil de la personne : un portrait en prose daté croisant positions, carnet et qui elle est — valeurs centrales et leur ordre, lignes de force, tensions vives, angles morts, évolution |

## Qu'est-ce qu'une « skill », et que veut dire l'« installer » ?

Une skill est **un simple fichier texte d'instructions** (`SKILL.md`) que votre assistant IA lit avant de conduire une session — une fiche de méthode, pas un programme. Rien ne s'exécute sur votre machine, rien n'est téléchargé au-delà du fichier lui-même. « Installer » une skill signifie simplement **placer ce fichier là où votre assistant cherche ses instructions** — ou, plus simple encore, coller son contenu dans la conversation.

Répartition des rôles : le **serveur MCP** donne à votre assistant le référentiel (les axes, les figures, les concepts des textes) et sauvegarde votre travail dans votre dossier local `my-philosophy/` ; les **skills** lui apprennent à conduire une vraie session (quand insister, quand enregistrer, comment lire un texte, comment s'ajuster à votre niveau).

## En ai-je besoin ?

À la rigueur, non — il existe désormais deux façons d'obtenir un vrai guidage avec **rien à installer** :

- Les **prompts de session** du serveur — dans le menu de prompts de votre client (le `+` de Claude Desktop) : choisissez *« Découvrir ce que je pense »*, *« Examiner l'une de mes convictions »*, etc., et le protocole correspondant se charge dans la conversation. Chaque prompt est généré depuis ces mêmes fichiers de skills, il porte donc le même savoir-faire — et le menu rend les possibilités **découvrables**.
- Le **guide intégré** du serveur (reçu automatiquement à la connexion, relisible avec l'outil `help`) pour une exploration informelle.

Alors pourquoi installer les skills ? Parce qu'une skill est **déclenchée automatiquement** : l'assistant y recourt de lui-même quand votre formulation correspond (*« aide-moi à savoir ce que je pense du libre arbitre »*), sans intervention — alors qu'un prompt attend que vous le choisissiez, et vous n'aurez pas toujours le bon en tête. Les skills installées offrent l'expérience la plus fluide, mains libres ; les prompts et le guide sont le repli sans configuration. Les trois partagent une seule source de vérité, vous ne perdez donc aucune méthode quel que soit votre choix.

## Installation, pas à pas

**Prérequis** — le serveur MCP `philoscopia` configuré dans votre assistant (5 minutes, guidé dans [mcp/README.fr.md](../mcp/README.fr.md)). Les skills pilotent ses outils ; sans lui, elles vous demanderont de le configurer d'abord.

**Récupérer les fichiers** : clonez ce dépôt (`git clone https://github.com/fbgallet/philoscopia-open`) ou téléchargez-le en ZIP (bouton vert « Code » → Download ZIP). Les skills sont les dossiers sous `skills/`.

Ensuite, selon votre assistant :

- **Claude Code** (terminal) : copiez les dossiers de skills dans votre répertoire personnel de skills :

  ```bash
  cp -r philoscopia-open/skills/philo-* ~/.claude/skills/
  ```

  C'est tout. Dans n'importe quelle conversation, vous pouvez désormais taper `/philo-discover` (ou tout autre nom de skill), ou simplement dire ce que vous voulez (« aide-moi à savoir ce que je pense du libre arbitre ») — l'assistant choisit la bonne skill de lui-même.

- **Claude Desktop / claude.ai** : dans les Réglages, ouvrez la section Capacités/Skills et ajoutez chaque skill en téléversant son dossier (ou un ZIP de celui-ci). L'emplacement exact du menu varie légèrement selon les versions ; cherchez « skills » dans les réglages si besoin.

- **Tout autre assistant — la voie sans installation** : ouvrez le `SKILL.md` de la session voulue, copiez tout son contenu, et collez-le au début de votre conversation avec une ligne : *« Suis ces instructions pour cette session. »* Cela fonctionne avec tout assistant capable d'atteindre le serveur MCP philoscopia, sans rien à installer du tout.

## Démarrer une session

Vous n'appelez jamais les outils vous-même — vous parlez, tout simplement. Quelques amorces, et la skill qu'elles convoquent :

- « Je suis curieux de philosophie mais je ne saurais pas quoi demander. » → `philo-problematize`
- « J'aimerais découvrir ce que je pense vraiment de la liberté. » → `philo-discover`
- « Défie ma croyance que le travail acharné finit toujours par payer — ne me ménage pas. » → `philo-examine`
- « Compare-moi à Spinoza. » → `philo-compare`
- « Voici un passage du *Manuel* — lisons-le ensemble. » → `philo-read`
- « Qu'est-ce que l'*amor fati* changerait à ma façon de voir ma situation ? » → `philo-concept`
- « Aide-moi à dire clairement ce que je pense du travail. » → `philo-articulate`
- « Après toutes ces sessions — qu'est-ce que je pense, au fond, dans l'ensemble ? » → `philo-synthesize`

Chaque session se termine de la même façon : votre journal reçoit le récit de la session, votre portrait `summary.md` est rafraîchi, et tout reste dans votre dossier local `my-philosophy/` — à vous de le lire, le modifier et le versionner.

## Conception

Une session = une conversation = une entrée de journal. Les skills partagent une discipline commune, apprise au fil d'années d'itération sur un système antérieur : un axe à la fois ; `EXPLORING` avant `POSITIONED` ; toujours enregistrer la *provenance* (quelle porte a suscité la position) et les *raisons* dans les propres mots de l'utilisateur ; **la formulation d'abord** (avant tout enregistrement, l'utilisateur l'énonce dans une phrase qu'il signerait — la formulation de l'assistant n'est au mieux qu'un échafaudage) ; clore avec `log_session` et un `summary.md` rafraîchi. Les fichiers de l'utilisateur restent la source de vérité, locaux et privés.

Les sessions s'enchaînent aussi : chaque conversation s'ouvre avec l'outil `orient` du serveur (qui vous êtes — débutant, amateur cultivé ou expert, vos objectifs et motivations — où en est votre carnet, le fil que vous avez laissé ouvert) et peut se clore en nommant ce qu'il faudra reprendre la fois suivante (le `next` de `log_session`). Chaque skill ajuste son registre à ce bloc utilisateur : la même session est conduite très différemment pour quelqu'un qui éclaircit quelques questions et pour un chercheur qui creuse un problème fin.

Et une limite assumée clairement : rien de tout cela ne remplace une conversation vivante avec des humains, l'expérience de lire les philosophes eux-mêmes, ni le fait de vivre effectivement selon ses principes. Les skills sont conçues pour orienter vers ces trois-là, pas pour s'y substituer.

## Soutenir & suivre

Si ce projet vous est utile, vous pouvez soutenir notre travail sur **[Ko-fi](https://ko-fi.com/philoscopia)** (également via [GitHub Sponsors](https://github.com/sponsors/fbgallet)), et suivre le projet sur **[X (@fbgallet)](https://x.com/fbgallet)** et **[Bluesky (@fbgallet.bsky.social)](https://bsky.app/profile/fbgallet.bsky.social)**.
