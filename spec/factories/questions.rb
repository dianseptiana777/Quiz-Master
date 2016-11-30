FactoryGirl.define do
  factory :question do
    question "What is the first alphabet?"
    answer "A"

    trait :answer_equal_2 do
      question "1 + 1 = ?"
      answer "2"
    end

    trait :without_question do
      question nil
    end

    trait :without_answer do
      answer nil
    end
  end
end
