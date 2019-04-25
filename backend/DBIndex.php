<?php

namespace backend;

class DBIndex
{
    const DB_URL = "www.bogoville.xyz/rest/";
    const DB_URL_ALLMODEL = self::DB_URL . "{model}";
    const DB_URL_SINGLEMODEL = /*self::DB_URL_ALLMODEL . */"/{id}";

    public static function getModelUrl($model){
        return str_replace("{model}", $model, self::DB_URL_ALLMODEL);
        //return file_get_contents(str_replace("{model}", $model, self::DB_URL_ALLMODEL));

    }

    public static function getSingleModelUrl($model, $id){
        $url = str_replace("{model}", $model, self::DB_URL_ALLMODEL) .
            str_replace("{id}", $id, self::DB_URL_SINGLEMODEL);
        return $url;
    }

}