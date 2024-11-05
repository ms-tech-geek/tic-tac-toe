import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GameModeSelector from './components/gamemode/GameModeSelector';
import Game from './Game';

const router = createBrowserRouter([
  {
    path: "/",
    element: <GameModeSelector />,
  },
  {
    path: "/game/:mode",
    element: <Game />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;