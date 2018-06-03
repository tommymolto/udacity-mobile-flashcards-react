import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import ButtonWrapper from '../Buttons/ButtonWrapper';
import PrimaryButton from '../Buttons/PrimaryButton';
import { resetQuiz } from '../../actions/quizActions';

const StyledView = styled.View`
  flex: 1;
`;

const StyledTitleText = styled.Text`
  font-size: 20;
  padding-vertical: 15;
  padding-horizontal: 15;
  text-align: center;
`;

const StyledQuestionsNumText = styled.Text`
  font-size: 16;
  font-style: italic;
  padding-vertical: 15;
  padding-horizontal: 15;
  text-align: center;
`;

const QuizOverview = (props) => {
  const { title, questions } = props.navigation.state.params;
  const volta = () => {
    props.navigation.navigate('QuizOverview', {
      title,
      questions,
    });
  };
  return (
    <StyledView>
      <StyledTitleText>Quiz: {title}</StyledTitleText>
      <StyledQuestionsNumText>{props.quizLength} cards</StyledQuestionsNumText>
      <ButtonWrapper>
        <PrimaryButton
          text="Start quiz"
          onPress={() => {
            props.userResetQuiz();
            // console.log('aqui');
            props.navigation.navigate('Quiz', {
              title,
              questions,
              volta,
            });
          }
          }
        />
        <PrimaryButton
          text="Add new question"
          onPress={() => props.navigation.navigate('NewCardForm', { title })}
        />
        <PrimaryButton
          text="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
      </ButtonWrapper>
    </StyledView>
  );
};

QuizOverview.propTypes = {
  navigation: PropTypes.object.isRequired,
  quizLength: PropTypes.number.isRequired,
  volta: PropTypes.func.isRequired,
  userResetQuiz: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  quizLength: state.decks[ownProps.navigation.state.params.title].quizLength,
  volta: () => {
    this.props.navigation.navigate('QuizOverview', props)
  },
});
const mapDispatchToProps = dispatch => ({
  userResetQuiz: () => {
    dispatch(resetQuiz());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(QuizOverview);
