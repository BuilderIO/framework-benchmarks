import React, { Suspense, lazy } from 'react';

import AppHeader from './generated-components/components/app-header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HelloWorld = lazy(() =>
  import('./generated-components/components/hello-world')
);
const Todo = lazy(() => import('./generated-components/components/todo-app'));
const Dashboard = lazy(() =>
  import('./generated-components/components/dashboard')
);

function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <AppHeader framework="react" path={location.pathname} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todo" element={<Todo />} />
            <Route exact path="/" element={<HelloWorld />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
