<?php


require 'vendor/autoload.php';

$configuration = [
    'settings' => [
        'displayErrorDetails' => false,
    ],
];
$c = new \Slim\Container($configuration);

// instantiate the App object
$app = new \Slim\App($c);


$content = file_get_contents(getcwd().'/build/index.html');

$app->get('/', function ($request, $response, $args) use($content){
    return "T'as rien à faire ici, maudit gibier d'potence!";
    //echo $content;
});

$app->get('/{model}', function ($request, $response, $args)use ($content){

    $data = $request->getParsedBody();
    if($data) {
        $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData($args['model']));
        return $generatron->curlRequest();
    } else {
        return $response->withStatus(404)
            ->withHeader('Content-Type', 'application/json;charset=utf-8')
            ->write('Enregistrement introuvable');
    }

    /*$model = new \backend\DBIndex();
    return $model->getModelUrl($args['model']);*/
});

$app->get('/{model}/{id}', function ($request, $response, $args)use ($content){

    $data = $request->getParsedBody();
    if($data) {
        $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData($args['model'], $args['id']));
        return $generatron->curlRequest();
    } else {
        return $response->withStatus(404)
            ->withHeader('Content-Type', 'application/json;charset=utf-8')
            ->write('Enregistrement introuvable');
    }

    //$model = new \backend\DBIndex();
    //return $model->getSingleModelUrl($args['model'], $args['id']);
});

//TODO je suis pas certain que ça marche ça ...!!
$app->get("/{field}/{fieldValue}/{model}", function ($request, $response, $args) use ($pdo) {
        $data = $request->getParsedBody();
        if ($data) {
            $generatron = new CurlRequestGenerator(RequestType::$GET, new CurlRequestData($args['model']));
            return $generatron->curlRequest();
        } else {
            return $response->withStatus(404)
                ->withHeader('Content-Type', 'application/json;charset=utf-8')
                ->write('Enregistrement introuvable');
        }
});


$app->post('/{model}', function ($request, $response, $args) use ($content){
    $data = $request->getParsedBody();
    if($data) {
        $generatron = new CurlRequestGenerator(RequestType::$POST, new CurlRequestData($args['model'], null, $data));
        return $generatron->curlRequest();
    } else {
        return $response->withStatus(500)
            ->withHeader('Content-Type', 'application/json;charset=utf-8')
            ->write('Cannot insert the object. It\'s too tight, it hurts. :(');
    }
});

$app->put('\{model}\{id}', function ($request, $response, $args) use ($content){
    $data = $request->getParsedBody();
    if($data) {
        $generatron = new CurlRequestGenerator(RequestType::$PUT, new CurlRequestData($args['model'], $args['id'], $data));
        return $generatron->curlRequest();
    } else {
        return $response->withStatus(500)
            ->withHeader('Content-Type', 'application/json;charset=utf-8')
            ->write('Cannot PUT.');
    }
});


// Run application
$app->run();
