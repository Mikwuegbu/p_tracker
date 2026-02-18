import { Inbox, SearchX } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
	type: 'search' | 'no-data';
	title?: string;
	message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
	type,
	title,
	message,
}) => {
	const isSearch = type === 'search';
	const Icon = isSearch ? SearchX : Inbox;

	const defaultTitle = isSearch ? 'No Results Found' : 'No Projects Yet';
	const defaultMessage = isSearch
		? "We couldn't find any projects matching your criteria."
		: "You don't have any projects tracked yet.";

	return (
		<View style={styles.container}>
			<Icon size={64} color="#BDC1C6" strokeWidth={1.5} />
			<Text style={styles.title}>{title || defaultTitle}</Text>
			<Text style={styles.message}>{message || defaultMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 48,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#3C4043',
		marginTop: 16,
		marginBottom: 8,
	},
	message: {
		fontSize: 16,
		color: '#70757A',
		textAlign: 'center',
		lineHeight: 22,
	},
});
