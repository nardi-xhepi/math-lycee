'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { ChevronRight, ChevronDown, ArrowLeft, ArrowRight, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import MathRenderer from '@/components/math/math-renderer';

interface ExercisePageProps {
  params: {
    id: string;
  };
}

// This would come from a database in a real app
const getExerciseData = (id: string) => {
  if (id === 'exercice-fonctions-1') {
    return {
      title: 'Exercice 1 : Définition et notation',
      description: 'Test de compréhension sur la définition et notation des fonctions',
      difficulty: 'Facile',
      content: `
        <h3>Énoncé</h3>
        <p>Soit f la fonction définie sur ℝ par f(x) = 2x² - 3x + 1.</p>
        <p>1. Calculer f(0), f(1) et f(-2).</p>
        <p>2. Résoudre l'équation f(x) = 0.</p>
        <p>3. Déterminer l'ensemble des réels x tels que f(x) ≥ 0.</p>
      `,
      questions: [
        {
          id: 'q1',
          text: 'Calculer f(0), f(1) et f(-2).',
          solution: `
            <p>f(0) = 2×0² - 3×0 + 1 = 0 - 0 + 1 = 1</p>
            <p>f(1) = 2×1² - 3×1 + 1 = 2 - 3 + 1 = 0</p>
            <p>f(-2) = 2×(-2)² - 3×(-2) + 1 = 2×4 + 6 + 1 = 8 + 6 + 1 = 15</p>
          `
        },
        {
          id: 'q2',
          text: 'Résoudre l\'équation f(x) = 0.',
          solution: `
            <p>f(x) = 0</p>
            <p>2x² - 3x + 1 = 0</p>
            <p>Calculons le discriminant :</p>
            <p>Δ = (-3)² - 4×2×1 = 9 - 8 = 1</p>
            <p>Comme Δ > 0, l'équation admet deux solutions distinctes :</p>
            <p>x₁ = (3 - √1) / 4 = (3 - 1) / 4 = 2/4 = 1/2</p>
            <p>x₂ = (3 + √1) / 4 = (3 + 1) / 4 = 4/4 = 1</p>
            <p>L'équation f(x) = 0 admet donc deux solutions : x = 1/2 et x = 1.</p>
          `
        },
        {
          id: 'q3',
          text: 'Déterminer l\'ensemble des réels x tels que f(x) ≥ 0.',
          solution: `
            <p>Nous avons f(x) = 2x² - 3x + 1 avec a = 2 > 0.</p>
            <p>Comme le coefficient de x² est positif, la parabole représentative de f est tournée vers le haut.</p>
            <p>Nous avons déjà déterminé les racines de f : x = 1/2 et x = 1.</p>
            <p>Comme la parabole est tournée vers le haut, f(x) ≥ 0 pour tout x en dehors de l'intervalle ]1/2, 1[.</p>
            <p>Donc f(x) ≥ 0 pour tout x ∈ ]-∞, 1/2] ∪ [1, +∞[.</p>
          `
        }
      ]
    };
  }
  
  return {
    title: 'Exercice',
    description: 'Description de l\'exercice',
    difficulty: 'Moyen',
    content: '<p>Énoncé de l\'exercice</p>',
    questions: [
      {
        id: 'q1',
        text: 'Question 1',
        solution: '<p>Solution de la question 1</p>'
      }
    ]
  };
};

export default function ExercisePage({ params }: ExercisePageProps) {
  const { id } = params;
  const exercise = getExerciseData(id);
  const { userData } = useAuth();
  
  const [showSolution, setShowSolution] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Check if user has premium access
  const userRole = userData?.role || 'free';
  const isPremiumUser = userRole === 'premium' || userRole === 'vip' || userRole === 'admin';
  
  const totalSteps = exercise.questions.length;
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setShowSolution(null);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowSolution(null);
    }
  };
  
  return (
    <div className="container py-8">
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Accueil
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/exercises" className="hover:text-primary">
          Exercices
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">
          {exercise.title}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{exercise.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Difficulté: {exercise.difficulty}</span>
              </div>
            </CardHeader>
            <CardContent>
              <MathRenderer content={exercise.content} />
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">
                  Question {currentStep + 1} sur {totalSteps}
                </h3>
                <div className="mb-6">
                  <MathRenderer content={exercise.questions[currentStep].text} />
                </div>
                
                {showSolution === exercise.questions[currentStep].id ? (
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Solution
                    </div>
                    <MathRenderer content={exercise.questions[currentStep].solution} />
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      if (isPremiumUser) {
                        setShowSolution(exercise.questions[currentStep].id);
                      }
                    }}
                    variant={isPremiumUser ? "outline" : "secondary"}
                    disabled={!isPremiumUser}
                  >
                    {isPremiumUser ? "Voir la solution" : "Solution (Premium uniquement)"}
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={currentStep === totalSteps - 1}
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Questions</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {exercise.questions.map((question, index) => (
                        <div 
                          key={question.id}
                          className={`flex items-center p-2 rounded-md cursor-pointer ${
                            currentStep === index ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                          }`}
                          onClick={() => {
                            setCurrentStep(index);
                            setShowSolution(null);
                          }}
                        >
                          <div className="h-6 w-6 rounded-full bg-muted-foreground/20 flex items-center justify-center text-sm mr-2">
                            {index + 1}
                          </div>
                          <span className="truncate">Question {index + 1}</span>
                          {showSolution === question.id && (
                            <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Aide</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      N&apos;hésitez pas à utiliser les outils suivants :
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-1" />
                        Papier et crayon pour les calculs
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-1" />
                        Vérifiez vos calculs étape par étape
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-1" />
                        Consultez vos cours au besoin
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          {!isPremiumUser && (
            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  Passez à Premium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Débloquez l&apos;accès à toutes les solutions détaillées et à plus d&apos;exercices.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/subscription">
                    Voir les offres
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}