import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Notification from 'components/Notification/Notification';
import Section from 'components/Section/Section';
import Statistics from 'components/Statistics/Statistics';
import React, { Component } from 'react';
import s from './App.module.css';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countPositiveFeedbackPercentage = () => {
    const {good} = this.state;
    if (!good) {
      return 0;
    }
    const total = this.countTotalFeedback();
    const feedback = (good * 100) / total;
    return Math.round(feedback);
  };
  leaveFeedback = name => {
    this.setState(prevState => ({ [name]: prevState[name] + 1 }));
  };

  countTotalFeedback = () => {
    const { good, bad, neutral } = this.state;
    return good + neutral + bad;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();

    return (
      <div className={s.main}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            leaveFeedback={this.leaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {!total ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              percentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
