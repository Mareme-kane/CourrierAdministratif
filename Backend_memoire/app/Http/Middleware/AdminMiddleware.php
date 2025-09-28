<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('api')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Non authentifié',
            ], 401);
        }

        $user = Auth::guard('api')->user();
        
        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Compte désactivé',
            ], 403);
        }

        $userRoles = $user->roles->pluck('nom')->toArray();
        
        if (!in_array('ADMIN', $userRoles)) {
            return response()->json([
                'success' => false,
                'message' => 'Accès administrateur requis',
            ], 403);
        }

        return $next($request);
    }
}