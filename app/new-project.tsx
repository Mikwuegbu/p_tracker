import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useProjectsContext } from '../src/context/ProjectsContext';
import { ProjectStatus } from '../src/types/project';

const STATUS_OPTIONS: { value: ProjectStatus; label: string; color: string }[] =
	[
		{ value: 'active', label: 'Active', color: '#1E8E3E' },
		{ value: 'on_hold', label: 'On Hold', color: '#F9AB00' },
		{ value: 'completed', label: 'Completed', color: '#1967D2' },
	];

export default function NewProjectScreen() {
	const router = useRouter();
	const { addProject } = useProjectsContext();

	const [name, setName] = useState('');
	const [clientName, setClientName] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [status, setStatus] = useState<ProjectStatus>('active');
	const [saving, setSaving] = useState(false);

	const isFormValid =
		name.trim().length > 0 &&
		clientName.trim().length > 0 &&
		startDate.trim().length > 0;

	const handleSave = async () => {
		if (!isFormValid) {
			Alert.alert(
				'Missing Fields',
				'Name, client, and start date are required.',
			);
			return;
		}

		setSaving(true);
		try {
			await addProject({
				name: name.trim(),
				clientName: clientName.trim(),
				description: description.trim() || undefined,
				startDate: startDate.trim(),
				endDate: endDate.trim() || undefined,
				status,
			});
			router.back();
		} catch {
			Alert.alert('Error', 'Failed to add project. Please try again.');
		} finally {
			setSaving(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.flex}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
			>
				{/* Name */}
				<View style={styles.fieldGroup}>
					<Text style={styles.label}>
						Project Name <Text style={styles.required}>*</Text>
					</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g. Website Redesign"
						placeholderTextColor="#9AA0A6"
						value={name}
						onChangeText={setName}
						returnKeyType="next"
						autoFocus
					/>
				</View>

				{/* Client */}
				<View style={styles.fieldGroup}>
					<Text style={styles.label}>
						Client Name <Text style={styles.required}>*</Text>
					</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g. Acme Corp"
						placeholderTextColor="#9AA0A6"
						value={clientName}
						onChangeText={setClientName}
						returnKeyType="next"
					/>
				</View>

				{/* Description */}
				<View style={styles.fieldGroup}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={[styles.input, styles.multilineInput]}
						placeholder="Brief description of the project..."
						placeholderTextColor="#9AA0A6"
						value={description}
						onChangeText={setDescription}
						multiline
						numberOfLines={3}
						returnKeyType="next"
					/>
				</View>

				{/* Start Date */}
				<View style={styles.fieldGroup}>
					<Text style={styles.label}>
						Start Date <Text style={styles.required}>*</Text>
					</Text>
					<TextInput
						style={styles.input}
						placeholder="YYYY-MM-DD"
						placeholderTextColor="#9AA0A6"
						value={startDate}
						onChangeText={setStartDate}
						returnKeyType="next"
						keyboardType="numbers-and-punctuation"
					/>
				</View>

				{/* End Date */}
				<View style={styles.fieldGroup}>
					<Text style={styles.label}>End Date (optional)</Text>
					<TextInput
						style={styles.input}
						placeholder="YYYY-MM-DD"
						placeholderTextColor="#9AA0A6"
						value={endDate}
						onChangeText={setEndDate}
						returnKeyType="done"
						keyboardType="numbers-and-punctuation"
					/>
				</View>

				{/* Status */}
				<View style={styles.fieldGroup}>
					<Text style={styles.label}>Initial Status</Text>
					<View style={styles.statusRow}>
						{STATUS_OPTIONS.map((opt) => {
							const isSelected = status === opt.value;
							return (
								<TouchableOpacity
									key={opt.value}
									style={[
										styles.statusChip,
										isSelected && {
											backgroundColor: opt.color + '15',
											borderColor: opt.color,
										},
									]}
									onPress={() => setStatus(opt.value)}
									accessibilityRole="radio"
									accessibilityState={{ checked: isSelected }}
								>
									<Text
										style={[
											styles.statusChipText,
											isSelected && { color: opt.color, fontWeight: '700' },
										]}
									>
										{opt.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				{/* Save Button */}
				<TouchableOpacity
					style={[
						styles.saveButton,
						(!isFormValid || saving) && styles.saveButtonDisabled,
					]}
					onPress={handleSave}
					disabled={!isFormValid || saving}
					accessibilityRole="button"
					accessibilityLabel="Save new project"
				>
					{saving ? (
						<ActivityIndicator color="#fff" size="small" />
					) : (
						<Text style={styles.saveButtonText}>Add Project</Text>
					)}
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
	container: { flex: 1, backgroundColor: '#F8F9FA' },
	content: { padding: 16, gap: 20, paddingBottom: 40 },
	fieldGroup: { gap: 6 },
	label: {
		fontSize: 13,
		fontWeight: '600',
		color: '#5F6368',
		letterSpacing: 0.3,
	},
	required: { color: '#D93025' },
	input: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#DADCE0',
		borderRadius: 10,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 16,
		color: '#202124',
	},
	multilineInput: {
		minHeight: 80,
		textAlignVertical: 'top',
		paddingTop: 12,
	},
	statusRow: { flexDirection: 'row', gap: 10 },
	statusChip: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#DADCE0',
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
	},
	statusChipText: {
		fontSize: 13,
		fontWeight: '500',
		color: '#5F6368',
	},
	saveButton: {
		backgroundColor: '#1A73E8',
		borderRadius: 12,
		paddingVertical: 16,
		alignItems: 'center',
		marginTop: 8,
	},
	saveButtonDisabled: {
		backgroundColor: '#AECBFA',
	},
	saveButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '700',
	},
});
