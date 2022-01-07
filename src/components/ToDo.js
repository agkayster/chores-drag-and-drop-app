import React, { useState } from 'react';
import _ from 'lodash';

const log = console.log.bind(document);

export default function ToDo() {
	const chibokaChildren = ['Kelechi', 'Ejike', 'Ada', 'Akudo', 'Nnamdi'];

	// state for inputing each task//
	const [input, setInput] = useState('');

	// Submit all tasks into an array//
	const [tasks, setTasks] = useState([]);

	// State for data we would be dragging//
	const [dragTask, setDragTask] = useState({});

	//Event handler to implementing dragging//
	const handleDragStart = (e, id, child) => {
		setDragTask({ ...dragTask, id: id, initialChild: child });
	};

	//Drag and Drop will not work without this//
	const handleDragOver = (e) => {
		e.preventDefault();
	};

	//1. makes a copy of tasks(newTasks)//
	//2. changes catergory of its task to its new child//
	// 3. setTasks to newTasks//

	const changeCategory = (taskId, child) => {
		const newTasks = [...tasks];
		newTasks[taskId - 1].childName = child;
		setTasks([...newTasks]);
	};

	//2. sets the task.id//
	//3. does not allow drop in noDrop//
	//4. changeCategory(see above)//

	const handleDrop = (e, child) => {
		const selected = dragTask.id;
		changeCategory(selected, child);
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setInput(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newTask = {
			id: tasks.length + 1,
			task: input,
			childName: 'Kelechi',
		};
		setTasks([...tasks, newTask]);
	};

	log('get input =>', input);
	log('get task =>', tasks);

	return (
		<div className='mt-4 position-relative'>
			<h4 className='text-center'>House Chores</h4>
			<form
				onSubmit={handleSubmit}
				className='row g-2 position-absolute top-0 start-50 translate-middle mt-5'>
				<div className='col-auto mt-3'>
					<input
						type='text'
						placeholder='Add task...'
						value={input}
						onChange={handleChange}
						className='form-control'
					/>
				</div>
				<div className='col-auto mt-3'>
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</div>
			</form>
			<div className='row children mt-5'>
				{_.map(chibokaChildren, (child, idx) => (
					<div
						className='col child m-2 p-2 bg-warning'
						onDrop={(e) => handleDrop(e, child)}
						onDragOver={(e) => handleDragOver(e)}
						key={idx}>
						<h3 className='title text-center'>{child}</h3>
						<div className='tasks'>
							{_.filter(
								tasks,
								({ childName }) => childName === child
							).map(({ task, id }) => (
								<div
									className='task bg-success text-white mt-3 p-2'
									key={id}
									id={id}
									draggable
									onDragStart={(e) =>
										handleDragStart(e, id, child)
									}>
									{task}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
