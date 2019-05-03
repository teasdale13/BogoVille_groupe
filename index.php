<?php


require 'vendor/autoload.php';

use backend\RequestType;

$configuration = [
    'settings' => [
        'displayErrorDetails' => false,
    ],
];
$c = new \Slim\Container($configuration);

// instantiate the App object
$app = new \Slim\App($c);


$content = file_get_contents(getcwd(). DIRECTORY_SEPARATOR .'build' . DIRECTORY_SEPARATOR . 'index.html');

$app->get('/', function ($request, $response, $args) use($content){
    //return "T'as rien à faire ici, maudit gibier d'potence!";
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

            $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData($args['model']));
            return $generatron->curlRequest();

});


$app->post('/{model}', function ($request, $response, $args) use ($content){

    $data = $request->getParsedBody();
    $generatron = new CurlRequestGenerator(RequestType::$POST, new CurlRequestData($args['model'], null, $data));
    return $generatron->curlRequest();

});

$app->put('\{model}\{id}', function ($request, $response, $args) use ($content){

    $data = $request->getParsedBody();
    $generatron = new CurlRequestGenerator(RequestType::$PUT, new CurlRequestData($args['model'], $args['id'], $data));
    return $generatron->curlRequest();

});


// Run application
$app->run();
