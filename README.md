# BogoVille_groupe
Git du groupe

C'est icite que ça se passe les boyz


Structure Générale (MVC) :

Model: Classe (DBIndex.php) qui va communiquer directement avec le REST API via des requêtes HTTP.


Controller: (index.php) qui va diriger à la bonne fonction du Model selon les paramètres
envoyé par le FrontEnd (View).


View: Application React qui fera le rendu des informations que le Model
aura récupéré du REST API et renvoyé par le Controller.
