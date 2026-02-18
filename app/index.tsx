import { Filter, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { EmptyState } from '../src/components/EmptyState';
import { ErrorMessage } from '../src/components/ErrorMessage';
import { ProjectCard } from '../src/components/ProjectCard';
import { useProjects } from '../src/hooks/useProjects';
import { ProjectStatus } from '../src/types/project';

const STATUS_OPTIONS: (ProjectStatus | 'all')[] = [
	'all',
	'active',
	'on_hold',
	'completed',
];

export default function ProjectListScreen() {
	const {
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
	} = useProjects();

	const [showFilters, setShowFilters] = useState(false);

	if (loading && !refreshing) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color="#1A73E8" />
			</View>
		);
	}

	if (error && projects.length === 0) {
		return <ErrorMessage message={error} onRetry={refresh} />;
	}

	return (
		<View style={styles.container}>
			{/* Search Header */}
			<View style={styles.header}>
				<View style={styles.searchContainer}>
					<Search size={20} color="#5F6368" style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search projects or clients..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholderTextColor="#80868B"
					/>
					{searchQuery.length > 0 && (
						<TouchableOpacity onPress={() => setSearchQuery('')}>
							<X size={20} color="#5F6368" />
						</TouchableOpacity>
					)}
				</View>

				<TouchableOpacity
					style={[
						styles.filterButton,
						showFilters && styles.filterButtonActive,
					]}
					onPress={() => setShowFilters(!showFilters)}
				>
					<Filter size={20} color={showFilters ? '#1A73E8' : '#5F6368'} />
				</TouchableOpacity>
			</View>

			{/* Filter Chips */}
			{showFilters && (
				<View style={styles.filterContainer}>
					{STATUS_OPTIONS.map((status) => (
						<TouchableOpacity
							key={status}
							style={[
								styles.chip,
								statusFilter === status && styles.chipActive,
							]}
							onPress={() => setStatusFilter(status)}
						>
							<Text
								style={[
									styles.chipText,
									statusFilter === status && styles.chipTextActive,
								]}
							>
								{status.replace('_', ' ')}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			{/* Project List */}
			<FlatList
				data={projects}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <ProjectCard project={item} />}
				contentContainerStyle={[
					styles.listContent,
					projects.length === 0 && { flex: 1 },
				]}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={refresh}
						color="#1A73E8"
					/>
				}
				ListEmptyComponent={
					allProjects.length === 0 ? (
						<EmptyState type="no-data" />
					) : (
						<EmptyState type="search" />
					)
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		padding: 16,
		gap: 12,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#F1F3F4',
	},
	searchContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F1F3F4',
		borderRadius: 8,
		paddingHorizontal: 12,
		height: 48,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: '#202124',
		paddingVertical: 8,
	},
	filterButton: {
		padding: 12,
		borderRadius: 8,
		backgroundColor: '#F1F3F4',
	},
	filterButtonActive: {
		backgroundColor: '#E8F0FE',
	},
	filterContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 12,
		gap: 8,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#F1F3F4',
	},
	chip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: '#F1F3F4',
		borderWidth: 1,
		borderColor: 'transparent',
	},
	chipActive: {
		backgroundColor: '#E8F0FE',
		borderColor: '#1A73E8',
	},
	chipText: {
		fontSize: 14,
		color: '#5F6368',
		fontWeight: '500',
		textTransform: 'capitalize',
	},
	chipTextActive: {
		color: '#1A73E8',
	},
	listContent: {
		paddingVertical: 8,
	},
});
