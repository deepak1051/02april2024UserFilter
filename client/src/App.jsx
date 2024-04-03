import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import CreateTeam from './components/CreateTeam';
import Header from './components/Header';
function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route element={<Homepage />} path="/" />
        {/* <Route element={<CreateTeam />} path="/create-team" /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
