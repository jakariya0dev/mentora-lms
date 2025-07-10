import React from 'react'
import useAuth from '../hooks/useAuth'
import EnrolledCouses from './EnrolledCourses';
import ConductedCourses from './ConductedCourses';
import AllCourses from '../components/dashboard/AllCourses';
import LoaderDotted from '../components/common/LoaderDotted';

export default function Courses() {

    const {user} = useAuth();
    
    if(!user) return <LoaderDotted />;
    if (user?.role === "student") return <EnrolledCouses />;
    if (user?.role === "teacher") return <ConductedCourses />;
    if (user?.role === "admin") return <AllCourses />;
}
