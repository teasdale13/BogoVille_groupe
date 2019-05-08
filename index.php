<?php


require 'vendor/autoload.php';

use backend\RequestType;
use backend\CurlRequestGenerator;
use backend\CurlRequestData;

session_start();
session_regenerate_id();
if(!isset($_SESSION['LAST_ACTIVITY'])){
    $_SESSION['LAST_ACTIVITY'] = time();
}
if (time() - $_SESSION['LAST_ACTIVITY'] > 1800) { //1800 secondes = 30m
    session_unset();
    session_destroy();
    session_start();
    $_SESSION['LAST_ACTIVITY'] = time();
} else if(time() != $_SESSION['LAST_ACTIVITY']) {
    $SESSION['LAST_ACTIVITY'] = time();
}

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);

// instantiate the App object
$app = new \Slim\App($c);

$content = file_get_contents(getcwd(). DIRECTORY_SEPARATOR .'build' . DIRECTORY_SEPARATOR . 'index.html');

$app->get('/', function ($request, $response, $args) use($content){
    echo $content;
});

$app->get('/{model}', function ($request, $response, $args){
    $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData($args['model']));
    return $generatron->curlRequest();
});

$app->get('/{model}/{id}', function ($request, $response, $args){
    $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData($args['model'], $args['id']));
    return $generatron->curlRequest();
});

$app->get("/{field}/{fieldValue}/{model}", function ($request, $response, $args) {
    $data = ['field' => $args['field'],
            'fieldValue' => $args['fieldValue']];
    $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData($args['model'], null, $data));
});

$app->post('/{model}', function ($request, $response, $args){
    $data = $request->getParsedBody();
    $generatron = new CurlRequestGenerator(RequestType::$POST, new CurlRequestData($args['model'], null, $data));
    return $generatron->curlRequest();
});

$app->put('/{model}/{id}', function ($request, $response, $args){
    $data = $request->getParsedBody();
    $generatron = new CurlRequestGenerator(RequestType::$PUT, new CurlRequestData($args['model'], $args['id'], $data));
    return $generatron->curlRequest();
});

$app->delete('/{model}/{id}', function ($request, $response, $args) use ($content) {
    $data = $request->getParsedBody();
    $generatron = new CurlRequestGenerator(RequestType::$DELETE, new \backend\CurlRequestData($args['model'], $args['id'], $data));
    return $generatron->curlRequest();
});

$app->post('/usager/validate/{email}/val', function ($request, $response, $args) use ($content) {
    $data = $request->getParsedBody();
    $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData("usager", null, $data));
    $user = $generatron->getUserWithEmail(urldecode($data['email']));
    $userToArray = json_decode($user, true);
    if (!password_verify($data['password'], $userToArray['password'])){ //Si il y a pas de users ou que le mot de passe ne correspond pas
        $_SESSION['state'] = "NOT CONNECTED";
        header("Impposible d'authentifier",null, 401);
    } else {
        $_SESSION['user_id'] = $userToArray['idUsager'];
        $_SESSION['state'] = "CONNECTED";
        $_SESSION['usager'] = $userToArray['email'];
        $_SESSION['ville'] = $userToArray['id_ville'];
    };
    return $_SESSION['state'];
});

// Run application
$app->run();
