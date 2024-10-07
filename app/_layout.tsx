import React, { useEffect, useState } from 'react'
import { StatusBar, View as RNView, StyleSheet } from 'react-native'
import { Slot, useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { BlurView } from 'expo-blur'
import View from '@/components/atoms/View'
import Text from '@/components/atoms/Text'
import { getPaperTheme } from '@/hooks/useThemeColor'
import { useAuthStore, listenToAuthChanges } from '@/stores'
import { useLoadFonts } from '@/css/fonts'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import type { AuthStackParamList } from '@/types/auth'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1
  },
  slotContainer: {
    flex: 1,
    zIndex: 0
  }
})

const RootLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.user !== null)
  const loading = useAuthStore((state) => state.loading)
  const router = useRouter()
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [fontsLoadError, setFontsLoadError] = useState(false)
  const navigation = useTypedNavigation<AuthStackParamList>()

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await useLoadFonts()
        setFontsLoaded(true)
      }
      catch (error) {
        console.error('Error loading fonts:', error)
        setFontsLoadError(true)
      }
    }

    const fontTimeout = setTimeout(() => {
      if (!fontsLoaded) {
        setFontsLoadError(true)
      }
    }, 10000)

    loadFonts()

    return () => clearTimeout(fontTimeout)
  }, [])

  useEffect(() => {
    const unsubscribe = listenToAuthChanges()
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!loading && fontsLoaded) {
      if (isAuthenticated) {
        navigation.navigate('user', { screen: 'objective' })
      }
      else {
        router.replace('/auth/login')
      }
    }
  }, [loading, isAuthenticated, fontsLoaded, router])

  const theme = getPaperTheme()

  if (!fontsLoaded || loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        {fontsLoadError && <Text value="Failed to load fonts, continuing without custom fonts." />}
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <BlurView intensity={50} style={styles.blurView} />
        <RNView style={styles.slotContainer}>
          <Slot />
        </RNView>
      </View>
    </PaperProvider>
  )
}

export default RootLayout
