import { AlertCircle, RefreshCw } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	onRetry,
}) => {
	return (
		<View style={styles.container}>
			<AlertCircle size={48} color="#D93025" />
			<Text style={styles.title}>Something went wrong</Text>
			<Text style={styles.message}>{message}</Text>
			{onRetry && (
				<TouchableOpacity style={styles.button} onPress={onRetry}>
					<RefreshCw size={18} color="#FFFFFF" style={styles.icon} />
					<Text style={styles.buttonText}>Try Again</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 32,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#202124',
		marginTop: 16,
		marginBottom: 8,
	},
	message: {
		fontSize: 16,
		color: '#5F6368',
		textAlign: 'center',
		marginBottom: 24,
	},
	button: {
		flexDirection: 'row',
		backgroundColor: '#1A73E8',
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 24,
		alignItems: 'center',
	},
	icon: {
		marginRight: 8,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});
