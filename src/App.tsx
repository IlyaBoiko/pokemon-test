import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import PokemonDetail from "./components/PokemonDetail";
import { Provider } from "react-redux";
import store from './redux/store';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'pokemon/:pokemonName',
    element: <PokemonDetail/>
  }
])

function App() {
  return (
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    
  )
}

export default App;
