<?php

namespace App\Mail;

use App\Models\CourrierEntrant;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnvoieChefServiceCourrierEntrant extends Mailable
{
    use Queueable, SerializesModels;

    public $courrierEntrant;

    public function __construct(CourrierEntrant $courrierEntrant)
    {
        $this->courrierEntrant = $courrierEntrant;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouveau courrier entrant imputé - ' . $this->courrierEntrant->courrier->reference,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.courrier-entrant-impute',
            with: [
                'courrier' => $this->courrierEntrant,
                'reference' => $this->courrierEntrant->courrier->reference,
                'objet' => $this->courrierEntrant->courrier->objet,
                'expediteur' => $this->courrierEntrant->expediteur,
                'dateArrivee' => $this->courrierEntrant->dateArrivee,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
