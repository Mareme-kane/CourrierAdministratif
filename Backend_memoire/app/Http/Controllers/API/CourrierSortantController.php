<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourrierSortantRequest;
use App\Http\Requests\InitierCourrierSortantRequest;
use App\Models\{Courrier, CourrierSortant, Notification, User};
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class CourrierSortantController extends Controller
{
    public function index(): JsonResponse
    {
        $courriers = CourrierSortant::with('courrier')->paginate(10);
        return response()->json(['success' => true, 'data' => $courriers]);
    }

    public function store(CourrierSortantRequest $request): JsonResponse
    {
        try {
            $fichierPath = '';
            if ($request->hasFile('fichier_joint')) {
                $fichierPath = $request->file('fichier_joint')->store('courriers', 'public');
            }

            $reference = 'FS' . rand(10000000, 99999999) . '-' . now()->format('Ymd');

            $courrier = Courrier::create([
                'reference' => $reference,
                'objet' => $request->objet,
                'niveauConfidentiel' => $request->niveauConfidentiel ?? 'ORDINAIRE',
                'statutCourrier' => 'NON_VALIDE',
                'fichier_joint' => $fichierPath,
            ]);

            $courrierSortant = CourrierSortant::create([
                'courrier_id' => $courrier->id,
                'destinataire' => $request->destinataire,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Courrier créé avec succès',
                'data' => $courrierSortant->load('courrier')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $courrier = CourrierSortant::with('courrier')->find($id);

            if (!$courrier) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            return response()->json(['success' => true, 'data' => $courrier]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function update(CourrierSortantRequest $request, string $id): JsonResponse
    {
        try {
            $courrierSortant = CourrierSortant::with('courrier')->find($id);

            if (!$courrierSortant) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            $fichierPath = $courrierSortant->courrier->fichier_joint;
            if ($request->hasFile('fichier_joint')) {
                if ($fichierPath) Storage::disk('public')->delete($fichierPath);
                $fichierPath = $request->file('fichier_joint')->store('courriers', 'public');
            }

            $courrierSortant->courrier->update([
                'objet' => $request->objet,
                'niveauConfidentiel' => $request->niveauConfidentiel ?? 'ORDINAIRE',
                'statutCourrier' => 'NON_VALIDE',
                'fichier_joint' => $fichierPath,
            ]);

            $courrierSortant->update([
                'destinataire' => $request->destinataire,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Courrier mis à jour avec succès',
                'data' => $courrierSortant->fresh('courrier')
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $courrierSortant = CourrierSortant::with('courrier')->find($id);

            if (!$courrierSortant) {
                return response()->json(['success' => false, 'message' => 'Courrier non trouvé'], 404);
            }

            if ($courrierSortant->courrier->fichier_joint) {
                Storage::disk('public')->delete($courrierSortant->courrier->fichier_joint);
            }

            $courrierSortant->courrier->delete();
            $courrierSortant->delete();

            return response()->json(['success' => true, 'message' => 'Courrier supprimé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function initialize(InitierCourrierSortantRequest $request): JsonResponse
    {
        try {
            $reference = 'FS' . rand(10000000, 99999999) . '-' . now()->format('Ymd');

            $courrier = Courrier::create([
                'reference' => $reference,
                'objet' => $request->objet,
                'niveauConfidentiel' => $request->niveauConfidentiel ?? 'ORDINAIRE',
                'statutCourrier' => 'INITIE',
            ]);

            $courrierSortant = CourrierSortant::create([
                'courrier_id' => $courrier->id,
                'destinataire' => $request->destinataire,
            ]);

            $secretaire = User::where('email', $request->secretaire_email)->first();
            if ($secretaire) {
                Notification::create([
                    'user_id' => $secretaire->id,
                    'contenu' => "Nouveau courrier sortant initié - Référence: {$reference} - Objet: {$request->objet} - Destinataire: {$request->destinataire}",
                    'est_lue' => false,
                    'date_envoi' => now(),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Courrier initié avec succès et notification envoyée',
                'data' => $courrierSortant->load('courrier')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'initiation: ' . $e->getMessage()
            ], 500);
        }
    }

    public function write(InitierCourrierSortantRequest $request): JsonResponse
    {
        try {
            $reference = 'FS' . rand(10000000, 99999999) . '-' . now()->format('Ymd');

            $courrier = Courrier::create([
                'reference' => $reference,
                'objet' => $request->objet,
                'niveauConfidentiel' => $request->niveauConfidentiel ?? 'ORDINAIRE',
                'statutCourrier' => 'INITIE',
            ]);

            $courrierSortant = CourrierSortant::create([
                'courrier_id' => $courrier->id,
                'destinataire' => $request->destinataire,
            ]);

            $secretaire = User::where('email', $request->secretaire_email)->first();
            if ($secretaire) {
                Notification::create([
                    'user_id' => $secretaire->id,
                    'contenu' => "Nouveau courrier sortant initié - Référence: {$reference} - Objet: {$request->objet} - Destinataire: {$request->destinataire}",
                    'est_lue' => false,
                    'date_envoi' => now(),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Courrier initié avec succès et notification envoyée',
                'data' => $courrierSortant->load('courrier')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'initiation: ' . $e->getMessage()
            ], 500);
        }
    }
}
