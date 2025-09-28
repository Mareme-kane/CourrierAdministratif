<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Courrier Entrant Imputé</title>
</head>
<body>
    <h2>Nouveau Courrier Entrant Imputé</h2>
    
    <p>Bonjour,</p>
    
    <p>Un nouveau courrier entrant a été imputé par le directeur et nécessite votre attention :</p>
    
    <ul>
        <li><strong>Référence :</strong> {{ $reference }}</li>
        <li><strong>Objet :</strong> {{ $objet }}</li>
        <li><strong>Expéditeur :</strong> {{ $expediteur }}</li>
        <li><strong>Date d'arrivée :</strong> {{ \Carbon\Carbon::parse($dateArrivee)->format('d/m/Y H:i') }}</li>
    </ul>
    
    <p>Veuillez consulter le système pour traiter ce courrier.</p>
    
    <p>Cordialement,<br>
    Système de Gestion des Courriers</p>
</body>
</html>