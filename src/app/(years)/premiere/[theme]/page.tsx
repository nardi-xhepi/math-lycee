'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { ChevronRight, BookOpen, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MathRenderer from '@/components/math/math-renderer';

interface ThemePageProps {
  params: {
    year: string;
    theme: string;
  };
}

// This would come from a database in a real app
const getThemeData = (year: string, themeId: string) => {
  if (year === 'seconde' && themeId === 'fonctions') {
    return {
      title: 'Fonctions',
      description: 'Étude des fonctions et leurs représentations',
      lessons: [
        {
          id: 'notion-fonction',
          title: 'Notion de fonction',
          description: 'Définition et représentation graphique',
          content: `
            <h2>Définition d'une fonction</h2>
            <p>Une fonction est une relation qui, à tout élément d'un ensemble de départ, associe au plus un élément d'un ensemble d'arrivée.</p>
            
            <h3>Notation</h3>
            <p>Si f est une fonction de E vers F, on note f : E → F.</p>
            <p>Pour tout élément x de E, on note f(x) l'image de x par f.</p>
            
            <h3>Représentation graphique</h3>
            <p>Le graphe d'une fonction f est l'ensemble des points de coordonnées (x, f(x)) où x parcourt l'ensemble de définition de f.</p>
            
            <h3>Exemples</h3>
            <p>La fonction carré : f(x) = x²</p>
            <p>La fonction inverse : g(x) = 1/x (définie pour x ≠ 0)</p>
          `,
          premium: false
        },
        {
          id: 'fonction-affine',
          title: 'Fonction affine',
          description: 'Propriétés et représentation des fonctions affines',
          content: `
            <h2>Fonction affine</h2>
            <p>Une fonction affine est une fonction de la forme f(x) = ax + b, où a et b sont des constantes réelles.</p>
            
            <h3>Propriétés</h3>
            <p>- Si a ≠ 0, la fonction est strictement monotone (croissante si a > 0, décroissante si a < 0).</p>
            <p>- Le graphe d'une fonction affine est une droite.</p>
            <p>- Le coefficient a représente la pente de la droite.</p>
            <p>- Le coefficient b représente l'ordonnée à l'origine.</p>
            
            <h3>Équation de droite</h3>
            <p>Une droite peut être définie par l'équation y = ax + b.</p>
          `,
          premium: false
        },
        {
          id: 'fonctions-reference',
          title: 'Fonctions de référence',
          description: 'Étude des fonctions carré, cube et inverse',
          content: `
            <h2>Fonctions de référence</h2>
            
            <h3>Fonction carré</h3>
            <p>La fonction carré est définie par f(x) = x².</p>
            <p>Propriétés :</p>
            <ul>
              <li>Ensemble de définition : ℝ</li>
              <li>Fonction paire</li>
              <li>Décroissante sur ]-∞, 0] et croissante sur [0, +∞[</li>
              <li>Minimum : f(0) = 0</li>
            </ul>
            
            <h3>Fonction cube</h3>
            <p>La fonction cube est définie par f(x) = x³.</p>
            <p>Propriétés :</p>
            <ul>
              <li>Ensemble de définition : ℝ</li>
              <li>Fonction impaire</li>
              <li>Strictement croissante sur ℝ</li>
            </ul>
            
            <h3>Fonction inverse</h3>
            <p>La fonction inverse est définie par f(x) = 1/x.</p>
            <p>Propriétés :</p>
            <ul>
              <li>Ensemble de définition : ℝ* (tous les réels sauf 0)</li>
              <li>Fonction impaire</li>
              <li>Strictement décroissante sur ]-∞, 0[ et sur ]0, +∞[</li>
            </ul>
          `,
          premium: true
        }
      ],
      exercises: [
        {
          id: 'exercice-fonctions-1',
          title: 'Exercice 1 : Définition et notation',
          difficulty: 'Facile',
          premium: false
        },
        {
          id: 'exercice-fonctions-2',
          title: 'Exercice 2 : Représentation graphique',
          difficulty: 'Moyen',
          premium: false
        },
        {
          id: 'exercice-fonctions-3',
          title: 'Exercice 3 : Fonctions affines',
          difficulty: 'Moyen',
          premium: true
        },
        {
          id: 'exercice-fonctions-4',
          title: 'Exercice 4 : Extremums de fonctions',
          difficulty: 'Difficile',
          premium: true
        }
      ]
    };
  }
  
  return {
    title: 'Thème',
    description: 'Description du thème',
    lessons: [
      {
        id: 'lecon-1',
        title: 'Leçon 1',
        description: 'Description de la leçon',
        content: '<p>Contenu de la leçon</p>',
        premium: false
      }
    ],
    exercises: [
      {
        id: 'exercice-1',
        title: 'Exercice 1',
        difficulty: 'Facile',
        premium: false
      }
    ]
  };
};

export default function ThemePage({ params }: ThemePageProps) {
  const { year, theme } = params;
  const [themeData, setThemeData] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const { userData } = useAuth();
  
  // Format the year for display
  const formattedYear = year.charAt(0).toUpperCase() + year.slice(1);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const data = getThemeData(year, theme);
    setThemeData(data);
    
    // Select the first lesson by default
    if (data.lessons.length > 0) {
      setSelectedLesson(data.lessons[0].id);
    }
  }, [year, theme]);
  
  if (!themeData) {
    return <div className="container py-10">Chargement...</div>;
  }
  
  const userRole = userData?.role || 'free';
  const isPremiumUser = userRole === 'premium' || userRole === 'vip' || userRole === 'admin';
  
  const currentLesson = themeData.lessons.find((lesson: any) => lesson.id === selectedLesson);
  
  return (
    <div>
      {/* Theme header */}
      <div className="bg-gradient-to-r from-primary/10 to-background border-b">
        <div className="container py-12">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${year}`} className="hover:text-primary">
              {formattedYear}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">
              {themeData.title}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{themeData.title}</h1>
              <p className="text-muted-foreground mt-1">
                {themeData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content tabs */}
      <div className="container py-8">
        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lessons">Cours</TabsTrigger>
            <TabsTrigger value="exercises">Exercices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lessons">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lessons sidebar */}
              <div>
                <h2 className="text-xl font-bold mb-4">Leçons</h2>
                <div className="space-y-3">
                  {themeData.lessons.map((lesson: any) => (
                    <Card 
                      key={lesson.id}
                      className={`cursor-pointer ${selectedLesson === lesson.id ? 'border-primary' : ''}`}
                      onClick={() => setSelectedLesson(lesson.id)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{lesson.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {lesson.description}
                            </CardDescription>
                          </div>
                          {lesson.premium && !isPremiumUser && (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Lesson content */}
              <div className="md:col-span-2">
                {currentLesson ? (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{currentLesson.title}</CardTitle>
                          <CardDescription>{currentLesson.description}</CardDescription>
                        </div>
                        {currentLesson.premium && !isPremiumUser && (
                          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <Lock className="h-3 w-3 mr-1" /> Premium
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {currentLesson.premium && !isPremiumUser ? (
                        <div className="text-center py-10">
                          <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Contenu premium</h3>
                          <p className="text-muted-foreground mb-6">
                            Cette leçon est réservée aux abonnés premium et VIP.
                          </p>
                          <Button asChild>
                            <Link href="/subscription">
                              Passer à un abonnement supérieur
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <MathRenderer content={currentLesson.content} />
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-muted/20 px-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Marquer comme terminé
                      </div>
                      <Button size="sm">
                        Chapitre suivant
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    Sélectionnez une leçon
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="exercises">
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Exercices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themeData.exercises.map((exercise: any) => (
                  <Card key={exercise.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        {exercise.premium && !isPremiumUser && (
                          <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <Lock className="h-3 w-3 mr-1" /> Premium
                          </div>
                        )}
                      </div>
                      <CardDescription>
                        Difficulté: {exercise.difficulty}
                      </CardDescription>
                    </CardHeader>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}