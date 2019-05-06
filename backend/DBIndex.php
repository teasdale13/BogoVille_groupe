<?php

namespace backend;

/**
 * Class Model qui va communiquer avec le REST API via un url qui va être construit
 * avec les informations passées par le FrontEnd.
 *
 * Class DBIndex
 * @package backend
 */
class DBIndex
{
    const DB_URL = "www.bogoville.xyz/rest/";
    const DB_URL_ALLMODEL = self::DB_URL . "{model}";
    const DB_URL_SINGLEMODEL = "/{id}";
    const USAGER_TABLE_NAME = "usager";

    /**
     * Créer un URL pour avoir accèes a tout l'information du "model" passé
     * en paramètre par index.php et envoie une requête HTTP au Rest API
     *
     * @param $model String, Ce que l'utilisateur (Ville) désire afficher.
     * @return mixed Array si requête succès ou zmessage d'erreur si erreur.
     */
    public static function getModelUrl($model){
        // REQUETE HTTP AU REST API

        // Dans mon cas je renvoyais l'url construit pour vérifier si tout fonctionnait
        return str_replace("{model}", $model, self::DB_URL_ALLMODEL);

    }

    /**
     * Créer un URL pour avoir tous les informations d'un enregistrement précis et envoie une requête HTTP au Rest API
     *
     * @param $model String, Ce que l'utilisateur (Ville) désire afficher.
     * @param $id L'enregistrement précis que l'utilisateur désire afficher.
     * @return mixed Object JSON si requête succès ou message d'erreur si erreur.
     */
    public static function getSingleModelUrl($model, $id){
        // REQUETE HTTP AU REST API


        // Dans mon cas je renvoyais l'url construit pour vérifier si tout fonctionnait
        $url = str_replace("{model}", $model, self::DB_URL_ALLMODEL) .
            str_replace("{id}", $id, self::DB_URL_SINGLEMODEL);
        return $url;
    }

}