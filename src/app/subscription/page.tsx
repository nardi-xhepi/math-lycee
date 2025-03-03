'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { CheckCircle, X, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

const plans = [
  {
    id: 'free',
    name: 'Gratuit',
    price: '0',
    description: 'Idéal pour découvrir la plateforme',
    features: [
      'Accès à tous les cours',
      'Visualisations interactives de base',
      'Accès limité aux exercices simples'
    ],
    notIncluded: [
      'Exercices type bac',
      'Solutions détaillées',
      'Suivi de progression',
      'Exercices illimités',
      'Recommandations personnalisées'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '9,99',
    description: 'Notre formule la plus populaire',
    features: [
      'Accès à tous les cours',
      'Visualisations interactives de base',
      'Accès limité aux exercices simples',
      '5 exercices type bac par mois',
      'Solutions détaillées',
      'Suivi de progression'
    ],
    notIncluded: [
      'Exercices illimités',
      'Recommandations personnalisées'
    ],
    highlight: true
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '19,99',
    description: 'Pour une préparation optimale',
    features: [
      'Accès à tous les cours',
      'Visualisations interactives de base',
      'Accès limité aux exercices simples',
      'Exercices type bac illimités',
      'Solutions détaillées',
      'Suivi de progression',
      'Analyses de performance',
      'Recommandations personnalisées'
    ],
    notIncluded: []
  }
];

export default function SubscriptionPage() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const currentPlan = userData?.role || 'free';
  
  const handleUpgrade = async (planId: string) => {
    if (!user) {
      window.location.href = '/login?redirect=/subscription';
      return;
    }
    
    if (planId === currentPlan) {
      setError('Vous êtes déjà abonné à ce forfait.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setLoading(planId);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, you would integrate with a payment gateway here
      // For now, we'll just update the user's role in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        role: planId
      });
      
      setSuccess(`Votre abonnement a été mis à jour avec succès. Vous êtes maintenant sur le forfait ${planId}.`);
    } catch (error) {
      setError('Une erreur est survenue lors de la mise à jour de votre abonnement. Veuillez réessayer.');
      console.error('Error upgrading subscription:', error);
    } finally {
      setLoading(null);
    }
  };
  
  return (
    <div className="container py-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-4">Choisissez votre formule</h1>
        <p className="text-muted-foreground">
          Accédez à du contenu premium et à des fonctionnalités avancées pour maximiser votre apprentissage.
        </p>
      </div>
      
      {error && (
        <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-4 mb-6 text-center">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-800 border border-green-200 rounded-lg p-4 mb-6 text-center">
          {success}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`${plan.highlight ? 'border-primary shadow-lg' : ''} relative`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Populaire
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center">
                {plan.id === 'premium' || plan.id === 'vip' ? (
                  <Award className="h-5 w-5 text-primary mr-2" />
                ) : null}
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price} €</span>
                <span className="text-muted-foreground"> / mois</span>
              </div>
            </CardHeader>
            <CardContent className="h-80 overflow-auto">
              <h3 className="font-medium mb-3">Inclus :</h3>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {plan.notIncluded.length > 0 && (
                <>
                  <h3 className="font-medium mb-3">Non inclus :</h3>
                  <ul className="space-y-2">
                    {plan.notIncluded.map((feature, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.id === currentPlan ? "outline" : (plan.highlight ? "default" : "outline")}
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading !== null || plan.id === currentPlan}
              >
                {loading === plan.id ? (
                  "Traitement en cours..."
                ) : plan.id === currentPlan ? (
                  "Votre forfait actuel"
                ) : (
                  `Passer à ${plan.name}`
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Questions fréquentes</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="font-semibold mb-2">Comment puis-je changer de forfait ?</h3>
            <p className="text-muted-foreground">
              Vous pouvez changer de forfait à tout moment depuis cette page. Le changement sera effectif immédiatement.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Puis-je annuler mon abonnement ?</h3>
            <p className="text-muted-foreground">
              Oui, vous pouvez annuler votre abonnement à tout moment. Votre abonnement restera actif jusqu'à la fin de la période payée.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Comment fonctionne la facturation ?</h3>
            <p className="text-muted-foreground">
              Votre carte est débitée mensuellement à la date anniversaire de votre abonnement. Vous recevrez une facture par email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}