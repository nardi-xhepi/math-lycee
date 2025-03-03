'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Filter, Lock } from 'lucide-react';

// Mock data - this would come from an API in a real application
const exercisesData = [
  {
    id: 'exercice-fonctions-1',
    title: 'Définition et notation des fonctions',
    description: 'Test de compréhension sur la définition et notation des fonctions',
    year: 'seconde',
    theme: 'fonctions',
    difficulty: 1,
    premium: false
  },
  {
    id: 'exercice-fonctions-2',
    title: 'Représentation graphique des fonctions',
    description: 'Exercice sur les représentations graphiques des fonctions',
    year: 'seconde',
    theme: 'fonctions',
    difficulty: 2,
    premium: false
  },
  {
    id: 'exercice-fonctions-3',
    title: 'Fonctions affines',
    description: 'Exercice sur les propriétés des fonctions affines',
    year: 'seconde',
    theme: 'fonctions',
    difficulty: 2,
    premium: true
  },
  {
    id: 'exercice-derivation-1',
    title: 'Calcul de dérivées',
    description: 'Exercice sur le calcul de dérivées de fonctions simples',
    year: 'premiere',
    theme: 'analyse',
    difficulty: 2,
    premium: false
  },
  {
    id: 'exercice-derivation-2',
    title: 'Étude de fonctions avec dérivées',
    description: 'Exercice sur l\'étude complète de fonctions à l\'aide du calcul de dérivées',
    year: 'premiere',
    theme: 'analyse',
    difficulty: 3,
    premium: true
  },
  {
    id: 'exercice-limites-1',
    title: 'Calcul de limites',
    description: 'Exercice sur le calcul de limites de fonctions',
    year: 'terminale',
    theme: 'continuite-derivabilite',
    difficulty: 3,
    premium: false
  },
  {
    id: 'exercice-integration-1',
    title: 'Calcul d\'intégrales',
    description: 'Exercice sur le calcul d\'intégrales de fonctions',
    year: 'terminale',
    theme: 'integration',
    difficulty: 4,
    premium: true
  },
  {
    id: 'exercice-complexes-1',
    title: 'Nombres complexes - Forme algébrique',
    description: 'Exercice sur les opérations en forme algébrique',
    year: 'terminale',
    theme: 'nombres-complexes',
    difficulty: 3,
    premium: true
  }
];

const difficultyLabels = ['Tous', 'Facile', 'Moyen', 'Difficile', 'Très difficile'];

export default function ExercisesPage() {
  const { userData } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState([0]);
  const [currentTab, setCurrentTab] = useState('all');
  
  // Check if user has premium access
  const userRole = userData?.role || 'free';
  const isPremiumUser = userRole === 'premium' || userRole === 'vip' || userRole === 'admin';
  
  // Filter exercises based on search, difficulty, and tab
  const filteredExercises = exercisesData.filter(exercise => {
    // Filter by search term
    const matchesSearch = 
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by difficulty
    const matchesDifficulty = 
      difficulty[0] === 0 || exercise.difficulty === difficulty[0];
    
    // Filter by year (tab)
    const matchesTab = 
      currentTab === 'all' || 
      (currentTab === 'seconde' && exercise.year === 'seconde') ||
      (currentTab === 'premiere' && exercise.year === 'premiere') ||
      (currentTab === 'terminale' && exercise.year === 'terminale');
    
    return matchesSearch && matchesDifficulty && matchesTab;
  });
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Exercices</h1>
          <p className="text-muted-foreground">
            Pratiquez et testez vos connaissances avec nos exercices
          </p>
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un exercice..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="seconde">Seconde</TabsTrigger>
            <TabsTrigger value="premiere">Première</TabsTrigger>
            <TabsTrigger value="terminale">Terminale</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm whitespace-nowrap">Difficulté: {difficultyLabels[difficulty[0]]}</span>
            <Slider
              className="w-32"
              min={0}
              max={4}
              step={1}
              value={difficulty}
              onValueChange={setDifficulty}
            />
          </div>
        </div>
        
        <TabsContent value="all" className="mt-6">
          {renderExercisesList(filteredExercises, isPremiumUser)}
        </TabsContent>
        <TabsContent value="seconde" className="mt-6">
          {renderExercisesList(filteredExercises, isPremiumUser)}
        </TabsContent>
        <TabsContent value="premiere" className="mt-6">
          {renderExercisesList(filteredExercises, isPremiumUser)}
        </TabsContent>
        <TabsContent value="terminale" className="mt-6">
          {renderExercisesList(filteredExercises, isPremiumUser)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function renderExercisesList(exercises: any[], isPremiumUser: boolean) {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Aucun exercice trouvé.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map(exercise => (
        <Card key={exercise.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{exercise.title}</CardTitle>
                <CardDescription className="mt-2">{exercise.description}</CardDescription>
              </div>
              {exercise.premium && !isPremiumUser && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex items-center">
                  <Lock className="h-3 w-3 mr-1" /> Premium
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="capitalize">
                {exercise.year}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {difficultyLabels[exercise.difficulty]}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20">
            {exercise.premium && !isPremiumUser ? (
              <div className="w-full flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Exercice premium</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/subscription">
                    Débloquer
                  </Link>
                </Button>
              </div>
            ) : (
              <Button className="w-full" asChild>
                <Link href={`/exercises/${exercise.id}`}>
                  Commencer l&apos;exercice
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}