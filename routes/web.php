<?php

use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', [App\Http\Controllers\HomeController::class, 'index']);
Route::group(['middleware' => 'auth'], function () {

    Route::view('/home', 'home')->name('home');
    Route::view('/add', 'home')->name('add');
    Route::resource('/task-resource',TasksController::class);
    Route::post('/updateStateTask', [TasksController::class, 'updateStateTask']);
    Route::view('/edit/{id}', 'home')->name('edit');
});
