<?php


require 'vendor/autoload.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);


$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);

// instantiate the App object
$app = new \Slim\App($c);


$content = file_get_contents(getcwd().'/build/index.html');


$app->get('/{model}', function ($request, $response, $args)use ($content){
    $model = new \backend\DBIndex();
    return $model->getModelUrl($args['model']);
});


$app->get('/', function ($request, $response, $args) use($content){
   echo $content;
});
$app->get('/{model}/{id}', function ($request, $response, $args)use ($content){
    $model = new \backend\DBIndex();
    return $model->getSingleModelUrl($args['model'], $args['id']);
});


// Run application
$app->run();
