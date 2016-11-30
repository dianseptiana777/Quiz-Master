require 'rails_helper'

RSpec.describe Question, type: :model do
  context 'validations' do
    it { should validate_presence_of(:question) }
    it { should validate_presence_of(:answer) }
  end

  describe '#question' do
    context 'when blank' do
      it 'should be invalid' do
        question = build(:question, :without_question)
        expect(question).to be_invalid
      end
    end
  end

  describe '#answer' do
    context 'when blank' do
      it 'should be invalid' do
        question = build(:question, :without_answer)
        expect(question).to be_invalid
      end
    end
  end

  # test class methods
  describe '.get_random' do
    context 'when there are questions' do
      it 'should return random question' do
        create_list(:question, 6)

        question_ids =
          6.times.map do |n|
            question = Question.get_random
            question.id
          end

        expect(question_ids.uniq.length).to be > 1
      end
    end

    context 'when there is only one question' do
      it 'should not be random' do
        create(:question)

        question_ids =
          6.times.map do |n|
            question = Question.get_random
            question.id
          end

        expect(question_ids.uniq.length).to eq(1)
      end
    end

    context 'when there is any questions' do
      it 'should return question object' do
        create(:question)
        question = Question.get_random
        expect(question).to be_a(Question)
      end
    end

    context 'when there is no question' do
      it 'should return nil' do
        question = Question.get_random
        expect(question).to be nil
      end
    end
  end

  # test instance methods
  describe '#check_answer' do
    context 'when inputted answer is incorrect' do
      it 'should return false' do
        question = create(:question, :answer_equal_2)
        inputted_answer = '7'
        expect(question.check_answer(inputted_answer)).to be(false)
      end
    end

    context 'when inputted answer is correct and matched exactly' do
      it 'should return true' do
        question = create(:question, :answer_equal_2)
        inputted_answer = '2'
        expect(question.check_answer(inputted_answer)).to be(true)
      end
    end

    context 'when inputted answer is correct but use number in words format' do
      it 'should return true' do
        question = create(:question, :answer_equal_2)
        inputted_answer = 'two'
        expect(question.check_answer(inputted_answer)).to be(true)
      end
    end
  end

  describe '#get_alternative_answer' do
    context 'when the answer contains numbers' do
      it 'should return text representation of the numbers' do
        question = create(:question, :answer_equal_2)
        expect(question.get_alternative_answer).to eq('two')
      end
    end
  end
end
