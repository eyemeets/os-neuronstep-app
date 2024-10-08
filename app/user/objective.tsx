import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'
import Text from '@/components/atoms/Text'
import View from '@/components/atoms/View'
import PromptBox from '@/components/user/objective/PromptBox'
import { getPaperTheme } from '@/hooks/useThemeColor'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CourseValidationPanel from '@/components/user/objective/CourseValidationPanel'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  }
})

const ObjectivePage = () => {
  const theme = getPaperTheme()
  const [text, setText] = useState('Learn something new')

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          extraScrollHeight={20} // Extra space to ensure inputs aren't hidden
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          {/* Text is now dynamic */}
          <Text textType="h3" value={text} />
          <PromptBox />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <CourseValidationPanel />
    </View>
  )
}

export default ObjectivePage
