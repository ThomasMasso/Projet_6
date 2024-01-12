# Projet étudiant 6

## Construisez une API sécurisée pour une application d'avis gastronomiques

**Obectif** : développer une application web de critique des sauces piquantes appelée « Hot Takes » .

**Technologies utilisées**
* nodeJS

**Tâches réalisées**
*  Démarrer le serveur backend
  
  ○ express, mongoose, mongoDB
  
*  Construire le parcours utilisateur
  
  ○ Modèle d'utilisateur
  
  ○ Parcours utilisateur
  
  ○ Contrôleur d'utilisateur.
  
  L'utilisateur est en mesure d'effectuer les opérations suivantes :
  
  ○ Créer un compte
  
  ○ Se connecter et disposer d'un token valide
  
*  Démarrer le middleware
  
  ○ Ajout de multer pour les images
  
  ○ Ajout d’authorize pour la validation des tokens

*  Construire la route Sauce de l’API
  
  ○ Modèle Sauce
  
  ○ Route Sauce
  
  ○ Contrôleur Sauce
  
  L'utilisateur est en mesure d'effectuer les opérations suivantes :
  
  ○ Ajouter une nouvelle sauce
  
  ○ Supprimer une sauce
  
  ○ Voir toutes les sauces
  
  L’utilisateur peut liker ou ne pas aimer une sauce
  
  Seul le propriétaire de la sauce peut modifier ou supprimer une sauce existante

**Exigences de sécurité**
* Le mot de passe de l'utilisateur doit être haché
* L'authentification doit être renforcée sur toutes les routes sauce requises
* Les adresses électroniques dans la base de données sont uniques et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs
* La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur
* Un plugin Mongoose doit assurer la remontée des erreurs issues de la base de données
* Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés

**Installation**

Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande `npm install`

**Lancement du serveur**

Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande `npm start`. Par défaut le serveur sera lancé sur le port 3000 ( http://localhost:3000 )

**Compétences évaluées pour ce projet**
* Implémenter un modèle logique de données conformément à la réglementation
* Mettre en œuvre des opérations CRUD de manière sécurisée
* Stocker des données de manière sécurisée
