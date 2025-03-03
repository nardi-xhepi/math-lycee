'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, CheckCircle, Clock, Award, BarChart } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  timestamp: Date;
  themeId?: string;
  yearLevel?: string;
}

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (!user) return;

      try {
        const activitiesQuery = query(
          collection(db, 'user_activities'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc'),
          limit(5)
        );

        const snapshot = await getDocs(activitiesQuery);
        const activities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate()
        } as RecentActivity));

        setRecentActivities(activities);
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      } finally {
        setLoadingActivities(false);
      }
    };

    if (user && !loading) {
      fetchRecentActivities();
    }
  }, [user, loading]);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="container py-10">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-10">
            <h2 className="text-2xl font-bold mb-4">Vous n&apos;êtes pas connecté</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Veuillez vous connecter ou créer un compte pour accéder à votre tableau de bord.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">S&apos;inscrire</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Niveau</CardTitle>
            <CardDescription>Votre niveau actuel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium">{userData?.yearLevel || 'Non défini'}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Progression globale</CardTitle>
            <CardDescription>Sur tous les cours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium">27%</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-3">
              <div className="bg-primary h-2 rounded-full w-[27%]"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Formule actuelle</CardTitle>
            <CardDescription>Votre abonnement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium capitalize">{userData?.role || 'Gratuit'}</span>
            </div>
            {userData?.role === 'free' && (
              <Button variant="outline" className="w-full mt-3" size="sm" asChild>
                <Link href="/subscription">Passer à Premium</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Vos dernières activités sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingActivities ? (
                <div className="flex justify-center py-6">Chargement...</div>
              ) : recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                      {activity.type === 'lesson_completed' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                      {activity.type === 'exercise_completed' && <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                      {activity.type === 'lesson_started' && <BookOpen className="h-5 w-5 text-primary mt-0.5" />}
                      
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.type === 'lesson_completed' && 'Cours terminé'}
                          {activity.type === 'exercise_completed' && 'Exercice terminé'}
                          {activity.type === 'lesson_started' && 'Cours commencé'}
                        </p>
                      </div>
                      
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(activity.timestamp).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>Aucune activité récente</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link href="/seconde">Commencer à apprendre</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Commencer un cours</CardTitle>
              <CardDescription>Parcourez par niveau</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/seconde">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Seconde
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/premiere">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Première
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/terminale">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Terminale
                </Link>
              </Button>
              
              <div className="pt-3 border-t mt-3">
                <Button className="w-full" asChild>
                  <Link href="/exercises">
                    Pratiquer des exercices
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}