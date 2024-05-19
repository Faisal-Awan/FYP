import React from 'react';

const TestForm = ({ course, items = [
	[1, 'SampleID', 'Sample Course', 'What is React?', 'Option A', 'Option B', 'Option C', 'Option D']
] }) => {
	const parentContainerStyles = {
		display: 'flex',
		flexDirection: 'column', // This is optional based on your layout needs
		justifyContent: 'center', // Centers content vertically if flexDirection is 'column'
		alignItems: 'center', // Centers content horizontally
		height: '100%', // Ensure the container has a height, could be '100vh' if full screen
		width: '100%', // Ensures the container takes full width, modify as per requirement
	};

	const styles = {
		body: {
			fontFamily: 'Arial, sans-serif',
			// textAlign: 'center',
		},
		h1: {
			marginTop: '60px',
			color: 'rgb(12, 46, 96)',
		},
		form: {
			marginTop: '20px',
			// display: 'inline-block',
			// textAlign: 'left',
		},
		label: {
			display: 'block',
			marginBottom: '10px',
			marginLeft: '30px',
			fontSize: '20px',
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
			textAlign: 'center',
			transition: 'background-color 0.3s ease',
			fontSize: '18px',
			fontWeight: '500',
			boxShadow: '5px 10px #ccc',
			width: '120px',
			marginBottom: '100px',
		},
		paragraph: {
			fontSize: '25px',
		}
	};

	return (
		<div style={styles.body}>
			{/* <h1 style={styles.h1}>{course} Test</h1> */}
			<form style={styles.form} method="post" action="/record_response">
				{items.map((item, index) => (
					<div key={item[0]}>
						<input type="hidden" name={`question_id_${item[0]}`} id={`question_id_${item[0]}`} value={item[0]} />
						<p style={styles.paragraph}>{index + 1}. {item[3]}</p>
						<label style={styles.label}><input type="radio" name={`selected_option_${item[0]}`} value="A" /> {item[4]}</label><br />
						<label style={styles.label}><input type="radio" name={`selected_option_${item[0]}`} value="B" /> {item[5]}</label><br />
						<label style={styles.label}><input type="radio" name={`selected_option_${item[0]}`} value="C" /> {item[6]}</label><br />
						<label style={styles.label}><input type="radio" name={`selected_option_${item[0]}`} value="D" /> {item[7]}</label><br />
					</div>
				))}
				<input type="hidden" name="course" value={course} />
				<div style={parentContainerStyles}>
			
					<button type="submit" style={styles.button}>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default TestForm;
























// import React from 'react'
// import InnerAppLayout from 'layouts/inner-app-layout';
// import ChatContent from './ChatContent';
// import ChatMenu from './ChatMenu';

// const Chat = props => {
// 	return (
// 		<div className="chat">
// 			<InnerAppLayout 
// 				sideContent={<ChatMenu {...props}/>}
// 				mainContent={<ChatContent {...props}/>}
// 				sideContentWidth={450}
// 				sideContentGutter={false}
// 				border
// 			/>
// 		</div>

	
// 	)
// }

// export default Chat
