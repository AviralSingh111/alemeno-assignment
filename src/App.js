import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import CourseListingPage from './CourseListingPage';
import CourseDetailPage from './CourseDetailPage';
import StudentDashboard from './StudentDashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<CourseListingPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;