// import WasteClassifier from './WasteClassifier'

// const App = () => {
//   return (
//     <div>
//       <WasteClassifier />
//     </div>
//   )
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import WasteClassifier from "./WasteClassifier";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classify" element={<WasteClassifier />} />
      </Routes>
    </Router>
  );
}

export default App;


