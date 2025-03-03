import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  BarChart, 
  CheckCircle 
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Réussissez en mathématiques au lycée
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Une plateforme complète pour maîtriser les mathématiques du programme français de la Seconde à la Terminale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Commencer gratuitement
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/subscription">
                Voir les offres
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tout ce qu&apos;il vous faut pour réussir
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cours complets</h3>
              <p className="text-muted-foreground">
                Des cours structurés suivant le programme officiel du Ministère de l&apos;Éducation nationale.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exercices progressifs</h3>
              <p className="text-muted-foreground">
                Des exercices classés par difficulté avec des solutions détaillées étape par étape.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <BarChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Suivi de progression</h3>
              <p className="text-muted-foreground">
                Suivez votre progression et identifiez vos points forts et vos faiblesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à améliorer vos résultats en mathématiques?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez des milliers d&apos;élèves qui réussissent grâce à notre plateforme.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              Commencer gratuitement
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}