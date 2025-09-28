<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\{CourrierEntrantController, CourrierSortantController};
use App\Http\Controllers\API\ConsommationAPIController;
use App\Http\Controllers\API\AdminController;

// Routes de consommation d'API
 Route::group(['prefix' => 'consommation'], function () {
     Route::get('ien-list', [ConsommationAPIController::class, 'index']);
 });

// Routes d'authentification
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('profile', [AuthController::class, 'profile'])->name('auth.profile');
        Route::post('refresh', [AuthController::class, 'refresh'])->name('auth.refresh');
    });
});

Route::group(
    ['middleware' => 'auth:api'],
    function () {
        // Routes Admin
        Route::group(['prefix' => 'admin', 'middleware' => 'check_role:ADMIN'], function () {
            // Dashboard et statistiques
            Route::get('dashboard', [AdminController::class, 'dashboard']);
            
            // Gestion des utilisateurs
            Route::get('users', [AdminController::class, 'index']);
            Route::post('users', [AdminController::class, 'createUser']);
            Route::put('users/{id}', [AdminController::class, 'updateUser']);
            Route::delete('users/{id}', [AdminController::class, 'deleteUser']);
            Route::post('users/activate', [AdminController::class, 'activer']);
            Route::post('users/deactivate', [AdminController::class, 'desactiver']);
            Route::post('users/assign-role', [AdminController::class, 'attribuer']);
            Route::get('users/search', [AdminController::class, 'searchUsers']);
            
            // Gestion des rôles
            Route::get('roles', [AdminController::class, 'listRoles']);
            Route::post('roles', [AdminController::class, 'createRole']);
            Route::put('roles/{id}', [AdminController::class, 'updateRole']);
            Route::delete('roles/{id}', [AdminController::class, 'deleteRole']);
            
            // Gestion des courriers
            Route::get('courriers', [AdminController::class, 'allCourriers']);
            Route::delete('courriers/{id}', [AdminController::class, 'deleteCourrier']);
            Route::get('courriers/search', [AdminController::class, 'searchCourriers']);
        });

        // Routes Agent Bureau Courrier
        Route::group(['prefix' => 'agent-bureau', 'middleware' => 'check_role:AGENT_BUREAU_COURRIER'], function () {
            Route::apiResource('courrier-entrant', CourrierEntrantController::class);
        });

        // Routes Secrétaire
        Route::group(['prefix' => 'secretaire', 'middleware' => 'check_role:SECRETAIRE'], function () {
            Route::get('courrier-entrant', [CourrierEntrantController::class, 'index']);
            Route::apiResource('courrier-sortant', CourrierSortantController::class);
        });

        // Routes Chef Secrétaire
        Route::group(['prefix' => 'chef-secretaire', 'middleware' => 'check_role:CHEF_SERVICE'], function () {
  
        });

        // Routes Directeur
        Route::group(['prefix' => 'directeur', 'middleware' => 'check_role:DIRECTEUR'], function () {
            Route::get('courrier-entrant', [CourrierEntrantController::class, 'index']);
            Route::post('imputer-courrier', [CourrierSortantController::class, 'imputer']);
            Route::get('courrier-entrant/{id}', [CourrierEntrantController::class, 'show']);
        });
    }
);