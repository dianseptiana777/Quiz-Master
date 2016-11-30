class Question
  include Mongoid::Document
  include Mongoid::Timestamps

  field :question, type: String
  field :answer, type: String

  validates :question, :answer, presence: true

  def check_answer(user_answer)
    real_answer = self.answer.strip.squeeze(' ').downcase
    alternative_answer = self.get_alternative_answer
    user_answer = user_answer.strip.squeeze(' ').downcase

    user_answer.eql?(real_answer) || user_answer.eql?(alternative_answer)
  end

  def get_alternative_answer
    alternative_answer = self.answer.dup

    alternative_answer.split(' ').each do |word|
      if number_found = word[/\d+/]
        number_in_words = NumbersInWords.in_words(number_found)
        # to remove conjunction like 'and'
        number_in_words.slice!('and')
        alternative_answer.gsub!(number_found.to_s, number_in_words)
      end
    end

    alternative_answer.strip.squeeze(' ').downcase
  end

  private
    def self.get_random
      self.skip(rand(self.count)).first
    end
end
