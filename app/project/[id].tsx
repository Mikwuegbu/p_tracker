import { Stack, useLocalSearchParams } from 'expo-router';
import {
	Calendar,
	CheckCircle2,
	Clock,
	PauseCircle,
	User,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { ErrorMessage } from '../../src/components/ErrorMessage';
import { StatusBadge } from '../../src/components/StatusBadge';
import { useProjectsContext } from '../../src/context/ProjectsContext';
import { ProjectStatus } from '../../src/types/project';

const STATUS_OPTIONS: {
	value: ProjectStatus;
	label: string;
	Icon: React.ComponentType<{ size: number; color: string }>;
	color: string;
}[] = [
	{ value: 'active', label: 'Active', Icon: CheckCircle2, color: '#1E8E3E' },
	{ value: 'on_hold', label: 'On Hold', Icon: PauseCircle, color: '#F9AB00' },
	{ value: 'completed', label: 'Completed', Icon: Clock, color: '#1967D2' },
];

export default function ProjectDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { allProjects, loading, updateProjectStatus, refresh } =
		useProjectsContext();

	// Local state for the status-update loading indicator
	const [updating, setUpdating] = useState(false);

	const project = useMemo(
		() => allProjects.find((p) => p.id === id),
		[allProjects, id],
	);

	const handleUpdateStatus = async (newStatus: ProjectStatus) => {
		if (!project) return;
		if (project.status === newStatus) return;

		setUpdating(true);
		try {
			await updateProjectStatus(project.id, newStatus);
			Alert.alert(
				'Status Updated',
				`"${project.name}" is now ${newStatus.replace('_', ' ')}.`,
			);
		} catch {
			Alert.alert('Error', 'Failed to update status. Please try again.');
		} finally {
			setUpdating(false);
		}
	};

	if (loading && !project) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color="#1A73E8" />
			</View>
		);
	}

	if (!project) {
		return <ErrorMessage message="Project not found." onRetry={refresh} />;
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			{/* Dynamically update the header title to the project name */}
			<Stack.Screen options={{ title: project.name }} />

			{/* Header Card */}
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.name}>{project.name}</Text>
					<StatusBadge status={project.status} />
				</View>
				{project.description ? (
					<Text style={styles.description}>{project.description}</Text>
				) : null}
			</View>

			{/* Details Card */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Details</Text>

				<View style={styles.detailRow}>
					<User size={20} color="#5F6368" />
					<View style={styles.detailTextContainer}>
						<Text style={styles.detailLabel}>Client</Text>
						<Text style={styles.detailValue}>{project.clientName}</Text>
					</View>
				</View>

				<View style={styles.detailRow}>
					<Calendar size={20} color="#5F6368" />
					<View style={styles.detailTextContainer}>
						<Text style={styles.detailLabel}>Start Date</Text>
						<Text style={styles.detailValue}>{project.startDate}</Text>
					</View>
				</View>

				{project.endDate ? (
					<View style={styles.detailRow}>
						<Calendar size={20} color="#5F6368" />
						<View style={styles.detailTextContainer}>
							<Text style={styles.detailLabel}>End Date</Text>
							<Text style={styles.detailValue}>{project.endDate}</Text>
						</View>
					</View>
				) : null}
			</View>

			{/* Status Update Card */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Update Status</Text>

				{/* Overlay spinner while update is in-flight */}
				{updating ? (
					<View style={styles.updatingContainer}>
						<ActivityIndicator size="small" color="#1A73E8" />
						<Text style={styles.updatingText}>Updating…</Text>
					</View>
				) : (
					<View style={styles.statusGrid}>
						{STATUS_OPTIONS.map((option) => {
							const isActive = project.status === option.value;
							return (
								<TouchableOpacity
									key={option.value}
									style={[
										styles.statusButton,
										isActive && {
											borderColor: option.color,
											backgroundColor: option.color + '15',
										},
									]}
									onPress={() => handleUpdateStatus(option.value)}
									disabled={isActive}
									accessibilityRole="button"
									accessibilityLabel={`Set status to ${option.label}`}
									accessibilityState={{ selected: isActive }}
								>
									<option.Icon
										size={24}
										color={isActive ? option.color : '#5F6368'}
									/>
									<Text
										style={[
											styles.statusButtonText,
											isActive && { color: option.color, fontWeight: '700' },
										]}
									>
										{option.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	content: {
		padding: 16,
		gap: 16,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 1,
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 12,
		gap: 12,
	},
	name: {
		fontSize: 22,
		fontWeight: '700',
		color: '#202124',
		flex: 1,
	},
	description: {
		fontSize: 15,
		color: '#3C4043',
		lineHeight: 22,
	},
	sectionTitle: {
		fontSize: 17,
		fontWeight: '700',
		color: '#202124',
		marginBottom: 16,
	},
	detailRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
		gap: 16,
	},
	detailTextContainer: {
		flex: 1,
	},
	detailLabel: {
		fontSize: 11,
		color: '#5F6368',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
		marginBottom: 2,
	},
	detailValue: {
		fontSize: 16,
		fontWeight: '500',
		color: '#202124',
	},
	updatingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20,
		gap: 10,
	},
	updatingText: {
		fontSize: 15,
		color: '#1A73E8',
		fontWeight: '500',
	},
	statusGrid: {
		flexDirection: 'row',
		gap: 10,
	},
	statusButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#F1F3F4',
		gap: 6,
	},
	statusButtonText: {
		fontSize: 12,
		color: '#5F6368',
		fontWeight: '500',
		textAlign: 'center',
	},
});
