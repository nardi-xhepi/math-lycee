import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-6">Page non trouvée</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        La page que vous recherchez n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil pour continuer votre apprentissage.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            Retour à l&apos;accueil
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            Mon tableau de bord
          </Link>
        </Button>
      </div>
    </div>
  );
}