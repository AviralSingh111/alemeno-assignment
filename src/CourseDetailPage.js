import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { enrollCourse } from './courseSlice';

const CourseDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector(state => 
    state.courses.list.find(course => course.id === parseInt(id))
  );
  const [expandedWeek, setExpandedWeek] = React.useState(null);

  if (!course) return <div>Course not found</div>;

  const handleEnroll = () => {
    dispatch(enrollCourse(course.id));
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Instructor:</p>
          <p className="mb-2">{course.instructor}</p>
          <p className="font-semibold">Description:</p>
          <p className="mb-2">{course.description}</p>
          <p className="font-semibold">Enrollment Status:</p>
          <p className={`mb-2 inline-block px-2 py-1 rounded ${
            course.enrollmentStatus === 'Open' ? 'bg-green-200 text-green-800' :
            course.enrollmentStatus === 'Closed' ? 'bg-red-200 text-red-800' :
            'bg-yellow-200 text-yellow-800'
          }`}>{course.enrollmentStatus}</p>
          {course.enrollmentStatus === 'Open' && (
            <button
              onClick={handleEnroll}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enroll Now
            </button>
          )}
        </div>
        <div>
          <p className="font-semibold">Duration:</p>
          <p className="mb-2">{course.duration}</p>
          <p className="font-semibold">Schedule:</p>
          <p className="mb-2">{course.schedule}</p>
          <p className="font-semibold">Location:</p>
          <p className="mb-2">{course.location}</p>
          <p className="font-semibold">Pre-requisites:</p>
          <ul className="list-disc list-inside mb-2">
            {course.prerequisites.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Syllabus</h2>
        {course.syllabus.map((week) => (
          <div key={week.week} className="mb-2">
            <button
              onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
              className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Week {week.week}: {week.topic}
            </button>
            {expandedWeek === week.week && (
              <div className="p-2 bg-gray-50">
                {week.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailPage;