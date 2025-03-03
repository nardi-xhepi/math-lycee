'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <h1 className="text-4xl font-bold mb-4">Une erreur est survenue</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Nous sommes désolés, une erreur inattendue s&apos;est produite. Vous pouvez essayer de réactualiser la page ou revenir à l&apos;accueil.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset}>
          Réessayer
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            Retour à l&apos;accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}