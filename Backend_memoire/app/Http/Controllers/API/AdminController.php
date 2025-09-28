<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\{User, Role, Courrier, CourrierEntrant, CourrierSortant};
use Illuminate\Http\{JsonResponse, Request};
use Illuminate\Support\Facades\{Validator, Hash, DB};

class AdminController extends Controller
{
    // Gestion des utilisateurs
    public function index(): JsonResponse
    {
        $users = User::with('roles')->paginate(10);
        return response()->json(['success' => true, 'data' => $users]);
    }

    public function createUser(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'email_ens' => 'required|email|unique:users,email_ens',
            'password' => 'required|string|min:6',
            'nom_ens' => 'required|string',
            'prenom_ens' => 'required|string',
            'role_id' => 'required|exists:roles,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $user = User::create([
            'username' => $request->username,
            'email_ens' => $request->email_ens,
            'password' => Hash::make($request->password),
            'nom_ens' => $request->nom_ens,
            'prenom_ens' => $request->prenom_ens,
            'is_active' => true
        ]);

        $user->roles()->attach($request->role_id);

        return response()->json(['success' => true, 'message' => 'Utilisateur créé', 'data' => $user->load('roles')], 201);
    }

    public function updateUser(Request $request, $id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Utilisateur non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'string|unique:users,username,' . $id,
            'email_ens' => 'email|unique:users,email_ens,' . $id,
            'nom_ens' => 'string',
            'prenom_ens' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $user->update($request->only(['username', 'email_ens', 'nom_ens', 'prenom_ens']));

        return response()->json(['success' => true, 'message' => 'Utilisateur mis à jour', 'data' => $user]);
    }

    public function deleteUser($id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Utilisateur non trouvé'], 404);
        }

        $user->roles()->detach();
        $user->delete();

        return response()->json(['success' => true, 'message' => 'Utilisateur supprimé']);
    }

    public function activer(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $user = User::find($request->user_id);
        $user->update(['is_active' => true]);

        return response()->json(['success' => true, 'message' => 'Utilisateur activé']);
    }

    public function desactiver(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $user = User::find($request->user_id);
        $user->update(['is_active' => false]);

        return response()->json(['success' => true, 'message' => 'Utilisateur désactivé']);
    }

    public function attribuer(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $user = User::find($request->user_id);
        $user->roles()->sync([$request->role_id]);

        return response()->json(['success' => true, 'message' => 'Rôle attribué']);
    }

    // Gestion des rôles
    public function listRoles(): JsonResponse
    {
        $roles = Role::all();
        return response()->json(['success' => true, 'data' => $roles]);
    }

    public function createRole(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|unique:roles,nom',
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $role = Role::create([
            'nom' => $request->nom,
            'description' => $request->description
        ]);

        return response()->json(['success' => true, 'data' => $role], 201);
    }

    public function updateRole(Request $request, $id): JsonResponse
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['success' => false, 'message' => 'Rôle non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'string|unique:roles,nom,' . $id,
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $role->update($request->only(['nom', 'description']));

        return response()->json(['success' => true, 'message' => 'Rôle mis à jour', 'data' => $role]);
    }

    public function deleteRole($id): JsonResponse
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['success' => false, 'message' => 'Rôle non trouvé'], 404);
        }

        $role->users()->detach();
        $role->delete();

        return response()->json(['success' => true, 'message' => 'Rôle supprimé']);
    }

    // Gestion des courriers
    public function allCourriers(): JsonResponse
    {
        $courriers = Courrier::with(['courrierEntrant', 'courrierSortant'])->paginate(15);
        return response()->json(['success' => true, 'data' => $courriers]);
    }

    public function deleteCourrier($id): JsonResponse
    {
        $courrier = Courrier::find($id);
        if (!$courrier) {
            return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
        }

        $courrier->delete();
        return response()->json(['success' => true, 'message' => 'Courrier supprimé']);
    }

    // Statistiques
    public function dashboard(): JsonResponse
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'total_courriers' => Courrier::count(),
            'courriers_entrants' => CourrierEntrant::count(),
            'courriers_sortants' => CourrierSortant::count(),
            'courriers_en_cours' => Courrier::where('statutCourrier', 'EN_COURS')->count(),
            'courriers_traites' => Courrier::where('statutCourrier', 'TRAITE')->count(),
        ];

        return response()->json(['success' => true, 'data' => $stats]);
    }

    // Recherche
    public function searchUsers(Request $request): JsonResponse
    {
        $query = $request->get('q');
        $users = User::with('roles')
            ->where('nom_ens', 'LIKE', "%{$query}%")
            ->orWhere('prenom_ens', 'LIKE', "%{$query}%")
            ->orWhere('username', 'LIKE', "%{$query}%")
            ->orWhere('email_ens', 'LIKE', "%{$query}%")
            ->paginate(10);

        return response()->json(['success' => true, 'data' => $users]);
    }

    public function searchCourriers(Request $request): JsonResponse
    {
        $query = $request->get('q');
        $courriers = Courrier::with(['courrierEntrant', 'courrierSortant'])
            ->where('reference', 'LIKE', "%{$query}%")
            ->orWhere('objet', 'LIKE', "%{$query}%")
            ->paginate(10);

        return response()->json(['success' => true, 'data' => $courriers]);
    }
}