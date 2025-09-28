<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Non authentifié',
            ], 401);
        }

        $user = Auth::guard('api')->user();

        $userRoles = $user->roles->pluck('nom')->toArray();
        
        if (array_intersect($userRoles, $roles)) {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Accès non autorisé',
        ], 403);
    }
}