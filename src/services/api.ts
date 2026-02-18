import { Project, ProjectStatus } from '../types/project';
import { MOCK_PROJECTS } from './mockData';

// Simulation of network delay
const DELAY = 1000;

// Internal state to persist changes during the session
let projects = [...MOCK_PROJECTS];

export const projectApi = {
	getProjects: async (): Promise<Project[]> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// Randomly simulate an API error (e.g., 5% chance)
				// Set to false for reliable demo, but requirement wants error handling
				if (Math.random() < 0.05) {
					reject(new Error('Failed to fetch projects. Please try again.'));
				} else {
					resolve(projects);
				}
			}, DELAY);
		});
	},

	updateProjectStatus: async (
		id: string,
		status: ProjectStatus,
	): Promise<Project> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const index = projects.findIndex((p) => p.id === id);
				if (index === -1) {
					reject(new Error('Project not found'));
					return;
				}

				const updatedProject = { ...projects[index], status };
				projects[index] = updatedProject;
				resolve(updatedProject);
			}, DELAY);
		});
	},
};
