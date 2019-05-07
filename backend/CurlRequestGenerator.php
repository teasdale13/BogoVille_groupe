<?php
/**
 * Created by PhpStorm.
 * User: UmbrellaCorpAgent
 * Date: 2019-04-25
 * Time: 14:52
 */

namespace backend;

class CurlRequestGenerator
{

    private $requestType;
    private $requestData;
    private $url = "http://bogoville.xyz/rest/";

    /**
     * CurlRequestGenerator constructor.
     * @param String $requestType Correspond à l'une des valeur de la classe RequestType ('GET', 'POST', 'PUT', 'DELETE').
     *        Utiliser les éléments de la classe RequestType pour assurer que seules les requêtes souhaitées soient
     *        utilisées.
     * @param CurlRequestData $requestData Un object contenant un nom de model, un id (optionnel) et un tableau de datas.
     *        Cet object sera utile pour contruire l'URL pour procéder à la requête HTML sur l'API.
     */
    public function __construct($requestType, CurlRequestData $requestData){
        $this->requestType = $requestType;
        $this->requestData = $requestData;
    }

    /**
     * Sert à appeler la méthode qui va générer la requête automatiquement
     * @return mixed|string Les résultats de la requête HTTP
     */
    public function curlRequest(){
        $this->url = $this->url . $this->requestData->getModel();
        if($this->requestData->getId()){
            $this->url = $this->url . "/" . $this->requestData->getId();
        }
        return self::generateRequest(curl_init($this->url), $this->requestType, $this->requestData->getDatas());
    }

    private function setCurlBasicAuthentification($ch, $user='admin', $pass='admin'){
        curl_setopt($ch, CURLOPT_USERPWD, "$user:$pass");
    }

    /**
     * Procède à la construction et l'exécution de la requête HTTP sur la base des éléments fourni dans la propriété
     * $requestData
     * @param $ch La session cURL
     * @param $requestType Le type de requête ('GET', 'POST', 'PUT', 'DELETE')
     * @param $datas Les informations pertinentes pour procéder aux modifications ou à l'ajout dans l'API. Peut être
     *        null si la requête est 'GET' ou 'DELETE'
     * @return mixed|string Les résultats de la requête
     */
    private function generateRequest($ch, $requestType, $datas){
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $requestType);
        $this->setCurlBasicAuthentification($ch);
        if($datas){
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($datas));
        }
        return $this->executeCurl($ch);
    }

    /**
     * Va chercher les info d'un utilisateur à partir de son courriel
     * @param $email Courriel de l'usager
     * @return bool|string
     */
    public function getUserWithEmail(string $email){
        $this->url = $this->url . "usager/validate/" . urlencode($email) . "/val";
        var_dump($this->url);
        $ch = curl_init($this->url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        $this->setCurlBasicAuthentification($ch);
        return $this->executeCurl($ch);
    }

    public function getAllValueFromAGivenSubfield(){
        $this->url = $this->url . $this->requestData->getDatas()['field'] . DIRECTORY_SEPARATOR . $this->requestData->getDatas()['fieldValue'] . DIRECTORY_SEPARATOR . $this->requestData->getModel();
        $ch = curl_init($this->url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        return $this->executeCurl($ch);
    }

    /**
     * Petite commande pour éviter de réécrire la même fonction tout le temp
     * @param $ch
     * @return bool|string
     */
    private function executeCurl($ch){
        $info = curl_exec($ch);
        if(curl_errno($ch)){
            (curl_errno($ch));
            $info = "Aucune information trouvée";
        }
        curl_close($ch);
        return $info;
    }

}