<?php
/**
 * Created by PhpStorm.
 * User: cedri
 * Date: 2019-05-01
 * Time: 11:08
 */

namespace backend;

use http\Env\Request;

class ConnectionManager
{

    private $email;
    private $password;

    public function __construct($email, $password)
    {
        $this->email = $email;
        $this->password = password_hash($password, PASSWORD_BCRYPT);
    }

    public function checkCorrespondance(){
        /*$connectionData = ['email' => $this->email, 'password' => $this->password];

        $requestData = new \CurlRequestData(DBIndex::USAGER_TABLE_NAME, null, $connectionData);

        $ch = curl_init("localhost/");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, RequestType::$POST);
        curl_exec($ch);
        return curl_getinfo($ch);*/
    }

}