import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import YearHeader from '@/components/layout/year-header';

// This would typically come from a database or CMS
const premiereThemes = [
  {
    id: 'algebre',
    title: 'Algèbre',
    description: 'Suites numériques, équations, inéquations et systèmes.',
    topics: ['Suites numériques', 'Équations du second degré', 'Systèmes d\'équations']
  },
  {
    id: 'analyse',
    title: 'Analyse',
    description: 'Dérivation, fonctions trigonométriques et étude de fonctions.',
    topics: ['Dérivation', 'Variations et extremums', 'Fonctions trigonométriques']
  },
  {
    id: 'geometrie',
    title: 'Géométrie',
    description: 'Géométrie repérée, produit scalaire et transformations géométriques.',
    topics: ['Vecteurs et géométrie repérée', 'Produit scalaire', 'Transformations']
  },
  {
    id: 'probabilites',
    title: 'Probabilités',
    description: 'Variables aléatoires, lois de probabilité et échantillonnage.',
    topics: ['Variables aléatoires', 'Lois de probabilité', 'Échantillonnage']
  },
  {
    id: 'algorithmique',
    title: 'Algorithmique',
    description: 'Algorithmes, listes et fonctions.',
    topics: ['Algorithmes sur les listes', 'Fonctions et procédures', 'Boucles et récursivité']
  }
];

export default function PremierePage() {
  return (
    <div>
      <YearHeader 
        title="Première" 
        description="Programme officiel de mathématiques en classe de Première (spécialité mathématiques)"
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {premiereThemes.map((theme) => (
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
                  <Link href={`/premiere/${theme.id}`}>
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