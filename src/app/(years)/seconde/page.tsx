import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import YearHeader from '@/components/layout/year-header';

// This would typically come from a database or CMS
const secondeThemes = [
  {
    id: 'nombres-calculs',
    title: 'Nombres et calculs',
    description: 'Ensembles de nombres, calcul numérique et algébrique, équations et inéquations.',
    topics: ['Ensembles de nombres', 'Calcul littéral', 'Équations et inéquations']
  },
  {
    id: 'geometrie',
    title: 'Géométrie',
    description: 'Géométrie plane, triangles, quadrilatères, cercles et géométrie dans l\'espace.',
    topics: ['Géométrie plane', 'Triangles semblables', 'Géométrie dans l\'espace']
  },
  {
    id: 'fonctions',
    title: 'Fonctions',
    description: 'Fonctions et leurs représentations. Fonctions affines et fonctions de référence.',
    topics: ['Notion de fonction', 'Fonction affine', 'Fonctions de référence']
  },
  {
    id: 'statistiques-probabilites',
    title: 'Statistiques et probabilités',
    description: 'Statistiques descriptives, échantillonnage et probabilités.',
    topics: ['Statistiques descriptives', 'Probabilités', 'Échantillonnage']
  },
  {
    id: 'algorithmique-programmation',
    title: 'Algorithmique et programmation',
    description: 'Variables, expressions, fonctions et structures de contrôle.',
    topics: ['Variables et expressions', 'Fonctions', 'Structures de contrôle']
  }
];

export default function SecondePage() {
  return (
    <div>
      <YearHeader 
        title="Seconde" 
        description="Programme officiel de mathématiques en classe de Seconde"
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondeThemes.map((theme) => (
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
                  <Link href={`/seconde/${theme.id}`}>
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