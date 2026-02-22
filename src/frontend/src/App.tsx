import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import GameLobby from './pages/GameLobby';
import GameBoard from './pages/GameBoard';
import Leaderboard from './pages/Leaderboard';
import AuthGuard from './components/AuthGuard';
import ProfileSetupModal from './components/ProfileSetupModal';
import { Toaster } from 'sonner';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ProfileSetupModal />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AuthGuard>
      <GameLobby />
    </AuthGuard>
  ),
});

const gameBoardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game/$roomId',
  component: () => (
    <AuthGuard>
      <GameBoard />
    </AuthGuard>
  ),
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
  component: Leaderboard,
});

const routeTree = rootRoute.addChildren([indexRoute, gameBoardRoute, leaderboardRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
