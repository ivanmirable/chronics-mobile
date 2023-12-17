import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'

import { useNavigation } from '@react-navigation/native'
import { GreetingScreenNavigationProp } from '../../types.nav'
import { useStatisticContext } from '../../сontext/context'
import { useUserContext } from '../../сontext/contexUser'
import supabase from '../../lib/supabase'

const Category = () => {
  const { productsInCart } = useStatisticContext()
  const { user } = useUserContext()
  const [learnWord, setLearnWord] = useState(0)
  const [rightAnswer, setRightAnswer] = useState(0)
  const navigation = useNavigation<GreetingScreenNavigationProp>()

  useEffect(() => {
    getLearnWord()
    getRightAnswers()
  }, [])
  async function getLearnWord() {
    let { data, error } = await supabase.rpc('count_of_learned_words', {
      id_input: 8,
    })
    setLearnWord(data)
    console.log(learnWord)
    if (error) console.error(error)
    else console.log(data)
  }

  async function getRightAnswers() {
    let { data, error } = await supabase.rpc('count_of_correct_answers', {
      id_input: 8,
    })
    setRightAnswer(data)
    if (error) console.error(error)
    else console.log(data)
  }

  return (
    <View style={{ position: 'relative' }}>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.pageTittle}>
          <Text style={{ fontFamily: 'Cormorant', fontSize: 25 }}>ХРОНИКИ</Text>
          <Text style={{ fontFamily: 'Cormorant', fontSize: 25, color: 'red' }}>
            АККАУНТ
          </Text>
        </View>

        <Image
          source={{
            uri: user.photo,
          }}
          style={styles.user}
        />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.statTittle}>{user.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.favContainer}
          onPress={() => navigation.navigate('Favorite')}>
          <View>
            <Text style={{ fontFamily: 'Cormorant' }}>Избранное</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          margin: 26,
          marginBottom: 13,
          borderBottomColor: '#278D9A',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.statTittle}>Статистика</Text>
      </View>
      <View style={styles.statistiContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <View
            style={{
              backgroundColor: '#4293D4',
              width: 135,
              height: 60,
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 15,
              marginRight: 10,
            }}>
            <View style={styles.container}>
              <View style={styles.textView}>
                <Text style={styles.title}>Изучено слов</Text>
                <Text style={styles.desc}>{learnWord}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View
            style={{
              backgroundColor: '#FCBF4A',
              width: 135,
              height: 60,
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 15,
              marginRight: 10,
            }}>
            <View style={styles.container}>
              <View style={styles.textView}>
                <Text style={styles.title}>Изучено категорий</Text>
                <Text style={styles.desc}>{productsInCart}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View
            style={{
              backgroundColor: '#D45442',
              width: 135,
              height: 60,
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 15,
              marginRight: 10,
            }}>
            <View style={styles.container}>
              <View style={styles.textView}>
                <Text style={styles.title}>Изучено слов</Text>
                <Text style={styles.desc}>{productsInCart}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View
            style={{
              backgroundColor: '#42D462',
              width: 135,
              height: 60,
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 15,
              marginRight: 5,
            }}>
            <View style={styles.container}>
              <View style={styles.textView}>
                <Text style={styles.title}>Правильных ответов</Text>
                <Text style={styles.desc}>{rightAnswer}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          margin: 26,
          borderBottomColor: '#278D9A',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <View style={styles.Button}>
            <Text style={styles.buttonText}>Выйти</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.Button2}>
            <Text style={styles.buttonText}>Изменить</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  statistiContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 30,
    gap: 50,
    flexWrap: 'wrap',
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  favContainer: {
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute',
    height: 30,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    right: -6,
    top: 110,
  },
  favText: {},
  title: {
    paddingBottom: 8,
    fontFamily: 'Cormorant',
    color: '#fff',
    fontSize: 12,
  },
  desc: {
    paddingBottom: 25,
    fontFamily: 'Jost-Light',
    color: '#f0f0f0',
    fontSize: 11,
    overflow: 'hidden',
  },
  statTittle: {
    fontFamily: 'Cormorant',
    fontSize: 20,
  },
  user: {
    margin: 15,
    marginTop: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  pageTittle: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Button: {
    borderRadius: 14,
    width: 150,
    height: 70,
    backgroundColor: '#CD6964',
    padding: 12,
  },
  Button2: {
    borderRadius: 14,
    width: 150,
    height: 70,
    backgroundColor: '#278D9A',
    padding: 12,
  },
  buttonText: {
    paddingTop: 4,
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'Jost-Light',
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
})
