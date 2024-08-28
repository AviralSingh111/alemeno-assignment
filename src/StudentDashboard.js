import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markCourseCompleted } from './courseSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => 
    state.courses.list.filter(course => course.enrollmentStatus === 'In Progress')
  );

  const handleMarkCompleted = (courseId) => {
    dispatch(markCourseCompleted(courseId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      {enrolledCourses.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map(course => (
            <div key={course.id} className="border rounded p-4 hover:shadow-lg transition-shadow">
              <img src={course.thumbnail} alt={course.name} className="w-full h-32 object-cover mb-2 rounded" />
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-600">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-500 mt-2">Due Date: {course.dueDate || 'Not set'}</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Progress: {course.progress}%</p>
              <button
                onClick={() => handleMarkCompleted(course.id)}
                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;