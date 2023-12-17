import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IAnswer } from '../../../models/IAnswer'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import supabase from '../../../lib/supabase'
interface PropsIAnswer {
  answer: IAnswer
  setIndex: Dispatch<SetStateAction<number>>
  setLoad: Dispatch<SetStateAction<boolean>>
  load: boolean
  que_id: number
}
export const Answer = ({
  answer,
  setIndex,
  setLoad,
  load,
  que_id,
}: PropsIAnswer) => {
  const [right, setRight] = useState(Boolean)
  const [lay, setLay] = useState(Boolean)
  useEffect(() => {
    RememberAnswer()
    UpdateAnswer()
  }, [lay, right])
  const SetIndex = () => {
    setIndex((prev) => prev + 1)
  }

  async function RememberAnswer() {
    await supabase.rpc('answer_on_question', {
      correct_input: right,
      que_id: que_id,
      user_id_input: 8,
    })
  }
  async function UpdateAnswer() {
    if (right) {
      await supabase.rpc('update_answer_on_question', {
        que_id: que_id,
        user_id_input: 8,
      })
    }
  }

  const Check = () => {
    if (answer.correct) {
      setRight(true)
    } else if (answer.correct == false) {
      setLay(true)
      console.log(lay)
    }
    setLoad(true)
    setTimeout(SetIndex, 1000)
  }
  return (
    <TouchableOpacity
      disabled={load}
      onPress={() => {
        Check()
      }}>
      <View
        style={
          right ? styles.contentRight : lay ? styles.contentLay : styles.content
        }>
        <Text>{answer.answer}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 15,
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: 'black',
    paddingBottom: 25,
    textAlign: 'center',
    minWidth: 350,
    maxWidth: 390,
    borderRadius: 15,
    rowGap: 25,
  },
  contentRight: {
    padding: 15,
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: 'green',
    paddingBottom: 25,
    textAlign: 'center',
    minWidth: 350,
    maxWidth: 390,
    borderRadius: 15,
    rowGap: 25,
  },
  contentLay: {
    padding: 15,
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: 'red',
    paddingBottom: 25,
    textAlign: 'center',
    minWidth: 350,
    maxWidth: 390,
    borderRadius: 15,
    rowGap: 25,
  },
})
