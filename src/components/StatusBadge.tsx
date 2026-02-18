import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProjectStatus } from '../types/project';

interface StatusBadgeProps {
	status: ProjectStatus;
}

const statusConfig = {
	active: {
		label: 'Active',
		bgColor: '#E6F4EA',
		textColor: '#1E8E3E',
	},
	on_hold: {
		label: 'On Hold',
		bgColor: '#FEF7E0',
		textColor: '#F9AB00',
	},
	completed: {
		label: 'Completed',
		bgColor: '#E8F0FE',
		textColor: '#1967D2',
	},
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const config = statusConfig[status];

	return (
		<View style={[styles.container, { backgroundColor: config.bgColor }]}>
			<Text style={[styles.text, { color: config.textColor }]}>
				{config.label}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		alignSelf: 'flex-start',
	},
	text: {
		fontSize: 12,
		fontWeight: '600',
		textTransform: 'capitalize',
	},
});
