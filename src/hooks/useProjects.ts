import { useCallback, useEffect, useMemo, useState } from 'react';
import { projectApi } from '../services/api';
import { Project, ProjectStatus } from '../types/project';

export const useProjects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Search and Filter state
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
			setProjects(data);
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

	const updateProjectStatus = async (id: string, status: ProjectStatus) => {
		try {
			const updatedProject = await projectApi.updateProjectStatus(id, status);
			setProjects((prev) =>
				prev.map((p) => (p.id === id ? updatedProject : p)),
			);
			return updatedProject;
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to update status');
			throw err;
		}
	};

	const filteredProjects = useMemo(() => {
		return projects.filter((project) => {
			const matchesSearch =
				project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.clientName.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesStatus =
				statusFilter === 'all' || project.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [projects, searchQuery, statusFilter]);

	return {
		projects: filteredProjects,
		allProjects: projects, // For checking empty state vs no results
		loading,
		refreshing,
		error,
		searchQuery,
		setSearchQuery,
		statusFilter,
		setStatusFilter,
		refresh: () => fetchProjects(true),
		updateProjectStatus,
	};
};
