'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, User, Lock, Mail, CreditCard, LogOut } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { formatFirebaseDate } from '@/lib/utils';


export default function ProfilePage() {
  const { user, userData, logout } = useAuth();
  
  const [displayName, setDisplayName] = useState(userData?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  if (!user || !userData) {
    return (
      <div className="container py-10 flex justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-10">
            <h2 className="text-2xl font-bold mb-4">Vous n&apos;êtes pas connecté</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Veuillez vous connecter pour accéder à votre profil.
            </p>
            <Button asChild>
              <a href="/login">Se connecter</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const updateProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Update user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName
      });
      
      setSuccess('Profil mis à jour avec succès.');
    } catch (error) {
      setError('Une erreur est survenue lors de la mise à jour du profil.');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateUserEmail = async () => {
    if (!newEmail) {
      setError('Veuillez entrer une adresse email.');
      return;
    }
    
    if (!currentPassword) {
      setError('Veuillez entrer votre mot de passe actuel.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update email
      await updateEmail(user, newEmail);
      
      // Update user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        email: newEmail
      });
      
      setSuccess('Adresse email mise à jour avec succès.');
      setNewEmail('');
      setCurrentPassword('');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          setError('Mot de passe incorrect.');
          break;
        case 'auth/email-already-in-use':
          setError('Cette adresse email est déjà utilisée.');
          break;
        case 'auth/invalid-email':
          setError('Adresse email invalide.');
          break;
        default:
          setError('Une erreur est survenue lors de la mise à jour de l\'email.');
      }
      console.error('Error updating email:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateUserPassword = async () => {
    if (!newPassword) {
      setError('Veuillez entrer un nouveau mot de passe.');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    if (!currentPassword) {
      setError('Veuillez entrer votre mot de passe actuel.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      setSuccess('Mot de passe mis à jour avec succès.');
      setNewPassword('');
      setConfirmNewPassword('');
      setCurrentPassword('');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          setError('Mot de passe actuel incorrect.');
          break;
        case 'auth/weak-password':
          setError('Le nouveau mot de passe est trop faible.');
          break;
        default:
          setError('Une erreur est survenue lors de la mise à jour du mot de passe.');
      }
      console.error('Error updating password:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
              <CardDescription>Informations sur votre compte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                  <div>{user.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Nom d&apos;utilisateur</div>
                  <div>{userData.displayName || 'Non défini'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Formule</div>
                  <div className="capitalize">{userData.role}</div>
                </div>
                // In src/app/dashboard/profile/page.tsx
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Compte créé le</div>
                  <div>{formatFirebaseDate(userData.createdAt).toLocaleDateString('fr-FR')}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="profile" className="flex-1">
                <User className="h-4 w-4 mr-2" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1">
                <Lock className="h-4 w-4 mr-2" />
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" />
                Abonnement
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Modifier mon profil</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">{success}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nom complet</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={updateProfile} disabled={loading}>
                    {loading ? 'Mise à jour...' : 'Enregistrer les modifications'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Changer d&apos;adresse email</CardTitle>
                  <CardDescription>
                    Mettez à jour votre adresse email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">{success}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">Nouvelle adresse email</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={updateUserEmail} disabled={loading}>
                    {loading ? 'Mise à jour...' : 'Changer d\'email'}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Changer de mot de passe</CardTitle>
                  <CardDescription>
                    Mettez à jour votre mot de passe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword2">Mot de passe actuel</Label>
                    <Input
                      id="currentPassword2"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Confirmer le nouveau mot de passe</Label>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={updateUserPassword} disabled={loading}>
                    {loading ? 'Mise à jour...' : 'Changer de mot de passe'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Gérer mon abonnement</CardTitle>
                  <CardDescription>
                    Consultez et gérez votre abonnement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg mb-6">
                    <div className="font-medium">Formule actuelle</div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-lg font-bold capitalize">
                          {userData.role}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {userData.role === 'free' && 'Formule gratuite'}
                          {userData.role === 'premium' && '9,99 € par mois'}
                          {userData.role === 'vip' && '19,99 € par mois'}
                        </div>
                      </div>
                      
                      {userData.role !== 'vip' && (
                        <Button asChild>
                          <a href="/subscription">Mettre à niveau</a>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Fonctionnalités de votre formule</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Accès à tous les cours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Visualisations interactives de base</span>
                      </li>
                      
                      {(userData.role === 'premium' || userData.role === 'vip') && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>{userData.role === 'premium' ? '5 exercices type bac par mois' : 'Exercices type bac illimités'}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Solutions détaillées</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Suivi de progression</span>
                          </li>
                        </>
                      )}
                      
                      {userData.role === 'vip' && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Analyses de performance</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Recommandations personnalisées</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="text-sm text-muted-foreground mb-4">
                    Vous pouvez modifier ou annuler votre abonnement à tout moment.
                  </div>
                  <Button asChild variant="outline">
                    <a href="/subscription">Gérer l&apos;abonnement</a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}