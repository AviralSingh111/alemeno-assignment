import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm } from './courseSlice';

const CourseListingPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.list);
  const searchTerm = useSelector(state => state.courses.searchTerm);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Course Listings</h1>
        <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Student Dashboard
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search courses or instructors"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <Link to={`/course/${course.id}`} key={course.id} className="block">
            <div className="border rounded p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-600">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-500 mt-2">Duration: {course.duration}</p>
              <p className={`mt-2 inline-block px-2 py-1 rounded text-sm ${
                course.enrollmentStatus === 'Open' ? 'bg-green-200 text-green-800' :
                course.enrollmentStatus === 'Closed' ? 'bg-red-200 text-red-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {course.enrollmentStatus}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseListingPage;