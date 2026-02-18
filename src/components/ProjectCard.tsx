import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Project } from '../types/project';
import { StatusBadge } from './StatusBadge';

interface ProjectCardProps {
	project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => router.push(`/project/${project.id}`)}
			activeOpacity={0.7}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.name} numberOfLines={1}>
						{project.name}
					</Text>
					<StatusBadge status={project.status} />
				</View>

				<Text style={styles.client} numberOfLines={1}>
					Client: {project.clientName}
				</Text>

				<View style={styles.footer}>
					<Text style={styles.date}>Started {project.startDate}</Text>
					<ChevronRight size={20} color="#BDC1C6" />
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		borderWidth: 1,
		borderColor: '#F1F3F4',
	},
	content: {
		gap: 8,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 8,
	},
	name: {
		fontSize: 18,
		fontWeight: '700',
		color: '#202124',
		flex: 1,
	},
	client: {
		fontSize: 14,
		color: '#5F6368',
		fontWeight: '500',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 4,
	},
	date: {
		fontSize: 12,
		color: '#80868B',
	},
});
