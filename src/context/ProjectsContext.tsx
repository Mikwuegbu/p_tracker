/**
 * ProjectsContext.tsx
 *
 * Provides a single shared data source for all screens.
 * This solves the problem of each screen creating its own independent
 * copy of the project list via useProjects(), which meant status updates
 * on the detail screen were never reflected on the list screen.
 */

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { projectApi } from '../services/api';
import { Project, ProjectStatus } from '../types/project';

type NewProjectPayload = Omit<Project, 'id'>;

interface ProjectsContextValue {
	projects: Project[]; // filtered result for display
	allProjects: Project[]; // full unfiltered dataset
	loading: boolean;
	refreshing: boolean;
	error: string | null;
	searchQuery: string;
	setSearchQuery: (q: string) => void;
	statusFilter: ProjectStatus | 'all';
	setStatusFilter: (f: ProjectStatus | 'all') => void;
	refresh: () => void;
	updateProjectStatus: (id: string, status: ProjectStatus) => Promise<Project>;
	addProject: (payload: NewProjectPayload) => Promise<Project>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [allProjects, setAllProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Search and filter state
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>(
		'all',
	);

	const fetchProjects = useCallback(async (isRefreshing = false) => {
		if (isRefreshing) {
			setRefreshing(true);
		} else {
			setLoading(true);
		}
		setError(null);

		try {
			const data = await projectApi.getProjects();
			setAllProjects(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	/**
	 * updateProjectStatus: mutates both the API layer and the local state.
	 * Because allProjects lives here in context, any screen consuming the
	 * context will immediately see the update — no re-fetch needed.
	 */
	const updateProjectStatus = useCallback(
		async (id: string, status: ProjectStatus): Promise<Project> => {
			const updatedProject = await projectApi.updateProjectStatus(id, status);
			setAllProjects((prev) =>
				prev.map((p) => (p.id === id ? updatedProject : p)),
			);
			return updatedProject;
		},
		[],
	);

	// Memoized filtered list — recomputes only when dependencies change
	const projects = useMemo(() => {
		return allProjects.filter((project) => {
			const q = searchQuery.toLowerCase();
			const matchesSearch =
				project.name.toLowerCase().includes(q) ||
				project.clientName.toLowerCase().includes(q);
			const matchesStatus =
				statusFilter === 'all' || project.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [allProjects, searchQuery, statusFilter]);

	const addProject = useCallback(
		async (payload: NewProjectPayload): Promise<Project> => {
			const newProject = await projectApi.addProject(payload);
			setAllProjects((prev) => [newProject, ...prev]);
			return newProject;
		},
		[],
	);

	// Stable callback so the value object ref stays the same when status/filter change
	const refresh = useCallback(() => {
		fetchProjects(true);
	}, [fetchProjects]);

	const value = useMemo<ProjectsContextValue>(
		() => ({
			projects,
			allProjects,
			loading,
			refreshing,
			error,
			searchQuery,
			setSearchQuery,
			statusFilter,
			setStatusFilter,
			refresh,
			updateProjectStatus,
			addProject,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			projects,
			allProjects,
			loading,
			refreshing,
			error,
			searchQuery,
			statusFilter,
			refresh,
			updateProjectStatus,
			addProject,
		],
	);

	return (
		<ProjectsContext.Provider value={value}>
			{children}
		</ProjectsContext.Provider>
	);
};

/**
 * useProjectsContext — typed hook for consuming the context.
 * Throws a clear error if used outside of ProjectsProvider.
 */
export const useProjectsContext = (): ProjectsContextValue => {
	const ctx = useContext(ProjectsContext);
	if (!ctx) {
		throw new Error(
			'useProjectsContext must be used inside a <ProjectsProvider>',
		);
	}
	return ctx;
};
