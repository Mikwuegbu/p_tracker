import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
	Calendar,
	CheckCircle2,
	Clock,
	PauseCircle,
	User,
} from 'lucide-react-native';
import { useMemo } from 'react';
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
import { useProjects } from '../../src/hooks/useProjects';
import { ProjectStatus } from '../../src/types/project';

const STATUS_OPTIONS: {
	value: ProjectStatus;
	label: string;
	Icon: any;
	color: string;
}[] = [
	{ value: 'active', label: 'Active', Icon: CheckCircle2, color: '#1E8E3E' },
	{ value: 'on_hold', label: 'On Hold', Icon: PauseCircle, color: '#F9AB00' },
	{ value: 'completed', label: 'Completed', Icon: Clock, color: '#1967D2' },
];

export default function ProjectDetailScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const { allProjects, loading, updateProjectStatus, refresh } = useProjects();

	const project = useMemo(
		() => allProjects.find((p) => p.id === id),
		[allProjects, id],
	);

	const handleUpdateStatus = async (newStatus: ProjectStatus) => {
		if (!project) return;
		if (project.status === newStatus) return;

		try {
			await updateProjectStatus(project.id, newStatus);
			Alert.alert(
				'Success',
				`Project status updated to ${newStatus.replace('_', ' ')}`,
			);
		} catch (err) {
			Alert.alert('Error', 'Failed to update status. Please try again.');
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
		return <ErrorMessage message="Project not found" onRetry={refresh} />;
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<Stack.Screen options={{ title: project.name }} />

			{/* Header Section */}
			<View style={styles.card}>
				<View style={styles.header}>
					<Text style={styles.name}>{project.name}</Text>
					<StatusBadge status={project.status} />
				</View>
				<Text style={styles.description}>{project.description}</Text>
			</View>

			{/* Details Section */}
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

				{project.endDate && (
					<View style={styles.detailRow}>
						<Calendar size={20} color="#5F6368" />
						<View style={styles.detailTextContainer}>
							<Text style={styles.detailLabel}>End Date</Text>
							<Text style={styles.detailValue}>{project.endDate}</Text>
						</View>
					</View>
				)}
			</View>

			{/* Status Update Section */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Update Status</Text>
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
										backgroundColor: option.color + '10',
									},
								]}
								onPress={() => handleUpdateStatus(option.value)}
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
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 12,
		gap: 12,
	},
	name: {
		fontSize: 24,
		fontWeight: '700',
		color: '#202124',
		flex: 1,
	},
	description: {
		fontSize: 16,
		color: '#3C4043',
		lineHeight: 24,
	},
	sectionTitle: {
		fontSize: 18,
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
		fontSize: 12,
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
	statusGrid: {
		flexDirection: 'row',
		gap: 12,
	},
	statusButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#F1F3F4',
		gap: 8,
	},
	statusButtonText: {
		fontSize: 13,
		color: '#5F6368',
		fontWeight: '500',
	},
});
