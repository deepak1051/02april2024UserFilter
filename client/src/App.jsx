import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import CreateTeam from './components/CreateTeam';
import Header from './components/Header';
import MyTeams from './components/MyTeams';
import TeamDetails from './components/TeamDetails';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<CreateTeam />} path="/create-team" />
        <Route element={<MyTeams />} path="/teams" />
        <Route element={<TeamDetails />} path="/teams/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
