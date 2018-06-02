import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import SecondaryButton from '../Buttons/SecondaryButton';
import { resetQuiz } from '../../actions/quizActions';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../../utils/helpers';
const StyledQuizScoreText = styled.Text`
  font-size: 20;
  padding-vertical: 15;
  padding-horizontal: 15;
  text-align: center;
`;

const QuizScore = ({
  totalQuizQuestions,
  userCorrectScore,
  userIncorrectScore,
  userResetQuiz, backToDeck,
  volta,
}) => {
  const dt = new Date();
  clearLocalNotification()
    .then(setLocalNotification(dt));
  return (
    <View>
      <StyledQuizScoreText>
        You got {userCorrectScore} right and {userIncorrectScore} wrong from a
        total of {totalQuizQuestions} questions.
      </StyledQuizScoreText>
      <SecondaryButton
        text="Reset Quiz?"
        onPress={() => {
          userResetQuiz();
        }}
      />
      <SecondaryButton
        text="Back to Deck"
        onPress={volta}
      />

    </View>
  );
};

QuizScore.propTypes = {
  totalQuizQuestions: PropTypes.number.isRequired,
  userCorrectScore: PropTypes.number.isRequired,
  userIncorrectScore: PropTypes.number.isRequired,
  userResetQuiz: PropTypes.func.isRequired,
  backToDeck: PropTypes.func.isRequired,
  volta: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userQuizScore: state.quiz.quizNumbers.quizScore,
});

const mapDispatchToProps = dispatch => ({
  userResetQuiz: () => {
    dispatch(resetQuiz());
  },
  backToDeck: () => {
    this.volta();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizScore);
