import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useCurriculumStore } from '@/stores/curriculum'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { useUiStore } from '@/stores/user-ui'
import SlideUpPanel from '@/components/molecules/SlideUpPanel'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Icon from 'react-native-vector-icons/MaterialIcons' // Assuming you're using Material Icons
import { getPaperTheme } from '@/hooks/useThemeColor'

const CurriculumValidationPanel: React.FC = () => {
  const theme = getPaperTheme()

  const styles = StyleSheet.create({
    classificationText: {
      fontSize: 20,
      color: theme.colors.onPrimary,
      marginBottom: 16
    },
    feedbackText: {
      color: theme.colors.onPrimary,
      marginBottom: 8
    },
    button: {
      marginTop: 16
    },
    noDataText: {
      color: theme.colors.onPrimary
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12
    },
    iconTextRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    icon: {
      marginRight: 4
    }
  })

  const { objective } = useCurriculumStore()
  const navigation = useTypedNavigation()
  const { isValidationPanelVisible, closeValidationPanel } = useUiStore()

  const handleConfirm = () => {
    navigation.navigate('courseCreation')
  }

  return (
    <SlideUpPanel panelTitle="Overview" isVisible={isValidationPanelVisible} onClose={closeValidationPanel}>
      {objective ? (
        <View>
          {/* Classification */}
          {objective.standard_classification?.description && (
            <Text
              value={objective.standard_classification.description}
              style={styles.classificationText}
            />
          )}

          {/* Content Description */}
          <Text
            value={objective.content_description}
            variant="bodyLarge"
            style={styles.feedbackText}
          />

          {/* Feedback if not valid */}
          {!objective.valid && objective.friendly_feedback && (
            <Text
              value={objective.friendly_feedback}
              variant="bodyLarge"
              style={styles.feedbackText}
            />
          )}

          {/* Flex Row with Time and Language */}
          <View style={styles.flexRow}>
            <View style={styles.iconTextRow}>
              <Icon name="schedule" size={20} color={theme.colors.onPrimary} style={styles.icon} />
              <Text value={`${objective.estimated_timeframe} hours`} variant="bodyLarge" />
            </View>
            <View style={styles.iconTextRow}>
              <Icon name="language" size={20} color={theme.colors.onPrimary} style={styles.icon} />
              <Text value={objective.languageName} variant="bodyLarge" />
            </View>
          </View>

          <Button text="Create course" mode="contained" onPress={handleConfirm} style={styles.button} />
        </View>
      ) : (
        <Text value="No validation data available." variant="bodyLarge" style={styles.noDataText} />
      )}
    </SlideUpPanel>
  )
}

export default CurriculumValidationPanel
