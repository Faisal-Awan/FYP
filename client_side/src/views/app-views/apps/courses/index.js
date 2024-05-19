import React, { useState, useEffect } from 'react';

function StudentAssessment() {
	// Placeholder for course data
	// const courses = ['Mathematics', 'Science', 'History'];
	const [courses, setCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState('');

	// Fetch courses on component mount
	useEffect(() => {
		fetch('http://127.0.0.1:5000/select_course') // Adjust the URL/port as needed
			.then(response => response.json())
			.then(data => {
				console.log('DATatat',data)
				setCourses(data);
				if (data.length > 0) {
					setSelectedCourse(data[0]); // Set the default selected course to the first one
				}
			})
			.catch(error => console.error('Error fetching courses:', error));
	}, []);

	const handleCourseChange = (event) => {
		setSelectedCourse(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here you would typically call an API to submit the selected course
		console.log('Selected Course:', selectedCourse);
		// You can redirect or do other actions as required
	};

	const styles = {
		body: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			height: '100vh',
			fontFamily: 'Arial, sans-serif',
			textAlign: 'center',
		},
		h1: {
			marginTop: '50px',
			color: 'rgb(12, 46, 96)',
		},
		form: {
			marginTop: '20px',
			display: 'inline-block',
			textAlign: 'left',
		},
		label: {
			display: 'block',
			marginBottom: '10px',
			fontSize: '25px',
			color: 'rgb(12, 46, 96)',
		},
		select: {
			width: '450px',
			height: '35px',
			padding: '5px',
			border: '1px solid #ccc',
			borderRadius: '10px',
			marginLeft: '12px',
			fontSize: '17px',
		},
		button: {
			padding: '10px 20px',
			backgroundColor: '#007bff',
			color: '#fff',
			border: 'none',
			borderRadius: '10px',
			cursor: 'pointer',
			alignItems: 'center',
			justifyContent: 'center',
			transition: 'background-color 0.3s ease',
			fontSize: '18px',
			fontWeight: '500',
			boxShadow: '5px 10px #ccc',
			width: '120px',
		},
		buttonHover: { // Note: This won't work directly in React. You'll need to handle hover with CSS or additional JavaScript
			backgroundColor: '#0056b3',
		},
		divHeader: {
			fontSize: '30px',
			textAlign: 'center',
			marginBottom: '30px',
			marginTop: '40px',
		},
		divButtonContainer: {
			marginTop: '80px',
			textAlign: 'center',
		}
	};

	return (
		<div style={styles.body}>
			{/* <h1 style={styles.h1}>Online Student Assessment</h1> */}
			<form style={styles.form} method="post" action="/select_course">
				{/* <hr /> */}
				<div style={styles.divHeader}>Available Courses</div>
				<div style={{ display: 'inline-flex' }}>
					<label htmlFor="course" style={styles.label}>Select a course:</label>
					<select name="course" id="course" style={styles.select}>
						{courses.map(course => (
							<option key={course} value={course} style={{ fontSize: '17px' }}>{course}</option>
						))}
					</select>
				</div>
				<div style={styles.divButtonContainer}>
					<button type="submit" style={styles.button}>Start Test</button>
				</div>
			</form>
		</div>
	);
}

export default StudentAssessment;





















// import React, { Component } from 'react'
// import InnerAppLayout from 'layouts/inner-app-layout';
// import MailMenu from './MailMenu';
// import MailContent from './MailContent';

// export class Mail extends Component {
// 	render() {
// 		return (
// 			<div className="mail">
// 				<InnerAppLayout 
// 					sideContent={<MailMenu url="/app/apps/mail/" {...this.props}/>}
// 					mainContent={<MailContent {...this.props}/>}
// 					border
// 				/>
// 			</div>

// 		)
// 	}
// }

// export default Mail
