<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\{CourrierEntrantRequest, CourrierEntrantPatchRequest};
use App\Models\{Courrier, CourrierEntrant, User};
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class CourrierEntrantController extends Controller
{

    public function index(): JsonResponse
    {
        $courriers = CourrierEntrant::with('courrier')->paginate(10);
        return response()->json(['success' => true, 'data' => $courriers]);
    }

    public function store(CourrierEntrantRequest $request): JsonResponse
    {
        try {
            \Log::info('CourrierEntrant store method called');
            \Log::info('Request data:', $request->all());

            // validation des données est déjà gérée par CourrierEntrantRequest
            $validatedData = $request->validated();

            // verifier est ce que le courrier existe deja
            $existingCourrier = Courrier::where('objet', $request->objet)->first();
            if ($existingCourrier) {
                return response()->json([
                    'success' => false,
                    'message' => 'Un courrier avec le même objet existe déjà.',
                ], 409);
            }
            
            // Générer une référence unique
            $reference = 'CE-' . now()->format('Ymd') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            \Log::info('Generated reference:', ['reference' => $reference]);

            // le fichier joint accepte les format pdf, jpg, png
            $fichierPath = null;
            if ($request->hasFile('fichier_joint')) {
                $file = $request->file('fichier_joint');
                $fichierPath = $file->store('courriers', 'public');
                \Log::info('File uploaded:', ['path' => $fichierPath]);
            }

            // si le fichier existe ce n'est pas la peine de le stocker mais on peut juste utiliser le chemin
            if ($request->fichier_joint && !$fichierPath) {
                $fichierPath = $request->fichier_joint;
                \Log::info('Using existing file path from request:', ['path' => $fichierPath]);
            }

            $courrierData = [
                'reference' => $reference,
                'objet' => $request->objet,
                'niveauConfidentiel' => $request->niveauConfidentiel ?? 'ORDINAIRE',
                'statutCourrier' => 'EN_COURS',
                'fichier_joint' => $fichierPath,
                'nbre_fichiers' => $request->nbre_fichiers ?? 1,
            ];
            \Log::info('Courrier data to create:', $courrierData);
            
            $courrier = Courrier::create($courrierData);
            \Log::info('Courrier created:', ['id' => $courrier->id]);

            $courrierEntrantData = [
                'courrier_id' => $courrier->id,
                'expediteur' => $request->expediteur,
                'dateArrivee' => $request->dateArrivee ?? now()->format('Y-m-d H:i:s'),
            ];
            \Log::info('CourrierEntrant data to create:', $courrierEntrantData);
            
            $courrierEntrant = CourrierEntrant::create($courrierEntrantData);
            \Log::info('CourrierEntrant created:', ['id' => $courrierEntrant->id]);

            return response()->json([
                'success' => true,
                'message' => 'Courrier créé avec succès',
                'data' => $courrierEntrant->load('courrier')
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error in CourrierEntrant store:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ]
            ], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $courrier = CourrierEntrant::with('courrier')->find($id);
            
            if (!$courrier) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            return response()->json(['success' => true, 'data' => $courrier]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function update(CourrierEntrantRequest $request, string $id): JsonResponse
    {
        try {
            $courrierEntrant = CourrierEntrant::with('courrier')->find($id);
            
            if (!$courrierEntrant) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            $fichierPath = $request->fichier_joint ?? $courrierEntrant->courrier->fichier_joint;

            $courrierEntrant->courrier->update([
                'objet' => $request->objet,
                'niveauConfidentiel' => $request->niveauConfidentiel ?? 'ORDINAIRE',
                'statutCourrier' => 'EN_COURS',
                'fichier_joint' => $fichierPath,
                'nbre_fichiers' => $request->nbre_fichiers ?? 0,
            ]);

            $courrierEntrant->update([
                'expediteur' => $request->expediteur,
                'dateArrivee' => $request->dateArrivee ?? $courrierEntrant->dateArrivee,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Courrier mis à jour avec succès',
                'data' => $courrierEntrant->fresh('courrier')
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    // A revoir: la methode ne marche pas
    public function patch(CourrierEntrantPatchRequest $request, string $id): JsonResponse
    {
        try {
            $courrierEntrant = CourrierEntrant::with('courrier')->find($id);
            
            if (!$courrierEntrant) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            $validatedData = $request->validated();
            
            // Mise à jour partielle du courrier
            $courrierData = [];
            if (isset($validatedData['objet'])) $courrierData['objet'] = $validatedData['objet'];
            if (isset($validatedData['niveauConfidentiel'])) $courrierData['niveauConfidentiel'] = $validatedData['niveauConfidentiel'];
            if (isset($validatedData['fichier_joint'])) $courrierData['fichier_joint'] = $validatedData['fichier_joint'];
            if (isset($validatedData['nbre_fichiers'])) $courrierData['nbre_fichiers'] = $validatedData['nbre_fichiers'];
            
            if (!empty($courrierData)) {
                $courrierEntrant->courrier->update($courrierData);
            }

            // Mise à jour partielle du courrier entrant
            $entrantData = [];
            if (isset($validatedData['expediteur'])) $entrantData['expediteur'] = $validatedData['expediteur'];
            if (isset($validatedData['dateArrivee'])) $entrantData['dateArrivee'] = $validatedData['dateArrivee'];
            
            if (!empty($entrantData)) {
                $courrierEntrant->update($entrantData);
            }

            return response()->json([
                'success' => true,
                'message' => 'Courrier mis à jour partiellement',
                'data' => $courrierEntrant->fresh('courrier')
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $courrierEntrant = CourrierEntrant::with('courrier')->find($id);
            
            if (!$courrierEntrant) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            if ($courrierEntrant->courrier->fichier_joint) {
                Storage::disk('public')->delete($courrierEntrant->courrier->fichier_joint);
            }

            $courrierEntrant->courrier->delete();
            $courrierEntrant->delete();

            return response()->json(['success' => true, 'message' => 'Courrier supprimé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function downloadFile(string $id): \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
    {
        try {
            $courrierEntrant = CourrierEntrant::with('courrier')->find($id);
            
            if (!$courrierEntrant || !$courrierEntrant->courrier->fichier_joint) {
                return response(['success' => false, 'message' => 'Fichier non trouvé'], 404);
            }

            $filePath = $courrierEntrant->courrier->fichier_joint;
            if (!Storage::disk('public')->exists($filePath)) {
                return response(['success' => false, 'message' => 'Fichier non trouvé sur le serveur'], 404);
            }

            return response()->download(storage_path('app/public/' . $filePath));
        } catch (\Exception $e) {
            return response(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function impute(string $id): JsonResponse
    {
        try {
            $courrierEntrant = CourrierEntrant::with('courrier')->find($id);

            if (!$courrierEntrant) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            $courrierEntrant->courrier->update([
                'statutCourrier' => 'IMPUTER',
            ]);

            $chefService = User::where('role', 'CHEF_SERVICE')->first();

            if ($chefService) {
                \Mail::to($chefService->email)->send(new \App\Mail\EnvoieChefServiceCourrierEntrant($courrierEntrant));
            }

            return response()->json(['success' => true, 'message' => 'Courrier imputé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }
}
