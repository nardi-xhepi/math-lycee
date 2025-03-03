import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import YearHeader from '@/components/layout/year-header';

// This would typically come from a database or CMS
const terminaleThemes = [
  {
    id: 'continuite-derivabilite',
    title: 'Continuité et dérivabilité',
    description: 'Continuité, théorème des valeurs intermédiaires, dérivation.',
    topics: ['Continuité', 'Théorème des valeurs intermédiaires', 'Convexité']
  },
  {
    id: 'exponentielle-logarithme',
    title: 'Exponentielle et logarithme',
    description: 'Fonctions exponentielles et logarithmiques.',
    topics: ['Fonction exponentielle', 'Logarithme népérien', 'Applications']
  },
  {
    id: 'integration',
    title: 'Intégration',
    description: 'Primitives, intégration et applications.',
    topics: ['Primitives', 'Intégrale', 'Calculs d\'aires']
  },
  {
    id: 'suites-limites',
    title: 'Suites et limites',
    description: 'Suites, raisonnement par récurrence et limites.',
    topics: ['Raisonnement par récurrence', 'Limites de suites', 'Suite géométrique']
  },
  {
    id: 'probabilites-conditionnelles',
    title: 'Probabilités conditionnelles',
    description: 'Probabilités conditionnelles, variables aléatoires et loi binomiale.',
    topics: ['Indépendance', 'Variables aléatoires', 'Loi binomiale']
  },
  {
    id: 'nombres-complexes',
    title: 'Nombres complexes',
    description: 'Représentation géométrique, forme algébrique et exponentielle.',
    topics: ['Forme algébrique', 'Forme exponentielle', 'Applications géométriques']
  }
];

export default function TerminalePage() {
  return (
    <div>
      <YearHeader 
        title="Terminale" 
        description="Programme officiel de mathématiques en classe de Terminale (spécialité mathématiques)"
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terminaleThemes.map((theme) => (
            <Card key={theme.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle>{theme.title}</CardTitle>
                <CardDescription>{theme.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {theme.topics.map((topic, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      {topic}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-end bg-muted/20 border-t">
                <Button asChild>
                  <Link href={`/terminale/${theme.id}`}>
                    Accéder au chapitre
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}