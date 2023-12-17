import { useRoute } from '@react-navigation/native'
import { View, Text, Image, StyleSheet } from 'react-native'
import { QuestionScreenRouteProp } from '../../types.nav'
import supabase from '../../lib/supabase'
import { useEffect, useMemo, useState } from 'react'
import { IQuestion } from '../../models/IQuestion'
import { IAnswer } from '../../models/IAnswer'
import { Answer } from './components/Answer'

export const Question = () => {
  const { params } = useRoute<QuestionScreenRouteProp>()
  const [questuions, setQuestions] = useState<IQuestion[]>([])
  const [answers, setAnswers] = useState<IAnswer[]>([])
  const [load, setLoad] = useState(false)
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getQuestion()
  }, [])

  const Load = () => {
    setIsLoading(false)
  }
  useEffect(() => {
    getAnswers()
    if (load) {
      setLoad((prev) => !prev)
    }
    setIsLoading(true)
    setTimeout(Load, 400)
  }, [questuions, index])

  async function getQuestion() {
    try {
      const { data, error, status } = await supabase
        .from('QUESTION')
        .select('*')
        .eq('quiz_name', `${params.name}`)
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setQuestions(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }
  async function getAnswers() {
    let { data } = await supabase.rpc('show_answers_on_question', {
      id_input: questuions[index].id,
    })
    setAnswers(data)
    console.log(answers)
  }

  return (
    <View style={styles.container}>
      {questuions.length == 0 ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <Text>{questuions[index].question}</Text>
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: params.img_code,
          }}></Image>
      </View>
      <View style={styles.content}>
        {!isLoading ? (
          <>
            {answers.map((answer) => (
              <Answer
                que_id={questuions[index].id}
                load={load}
                setLoad={setLoad}
                setIndex={setIndex}
                answer={answer}
                key={answer.answer}
              />
            ))}
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9E2B6',
    flex: 1,
    alignItems: 'center',
  },
  content: {
    padding: 15,
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: '#FCBF4A',
    paddingBottom: 25,
    minWidth: 350,
    maxWidth: 390,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 25,
  },
  imageContainer: {
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: '#FF902B',
    minHeight: 200,
    flexDirection: 'row',
    width: 380,
    borderRadius: 15,
  },
  image: {
    margin: 15,
    width: 130,
    height: 200,
  },
  word: {
    color: 'black',
    textAlign: 'center',
    fontSize: 32,
  },
  definition: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
})
