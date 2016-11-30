require 'rails_helper'

RSpec.describe QuestionsController, type: :controller do
  # test index action
  describe "GET #index" do
    before :each do
      get :index, format: :json
    end

    it "should returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "should render the index json template" do
      expect(response).to render_template(:index)
    end
  end

  # test create action
  describe "POST #create" do
    context 'when params question and answer not blank' do
      before :each do
        post :create, format: :json, params: { question: { question: 'Test 1', answer: 'A' } }
      end

      it "should returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "should render the show json template" do
        expect(response).to render_template(:show)
      end

      it "should create new question" do
        expect(Question.last.question).to eq(controller.params[:question][:question])
      end
    end

    context 'when params question blank' do
      before :each do
        post :create, format: :json, params: { question: { question: '', answer: 'A' } }
      end

      it "should respond with 422" do
        expect(response).to have_http_status(422)
      end

      it "should respond with json contains error messages for question field" do
        expect(response.body).to eq({ question: ["can't be blank"] }.to_json)
      end
    end

    context 'when params answer blank' do
      before :each do
        post :create, format: :json, params: { question: { question: 'Test 1', answer: '' } }
      end

      it "should respond with 422" do
        expect(response).to have_http_status(422)
      end

      it "should respond with json contains error messages for answer field" do
        expect(response.body).to eq({ answer: ["can't be blank"] }.to_json)
      end
    end

    context 'when params question and answer blank' do
      before :each do
        post :create, format: :json, params: { question: { question: '', answer: '' } }
      end

      it "should respond with 422" do
        expect(response).to have_http_status(422)
      end

      it "should respond with json contains error messages for question and answer field" do
        expect(response.body).to eq({ question: ["can't be blank"], answer: ["can't be blank"] }.to_json)
      end
    end
  end

  # test update action
  describe "PUT #update" do
    context 'when question not found' do
      it "should raise Mongoid::Errors::DocumentNotFound exception" do
        expect{
          put :update, format: :json, params: { id: '12345' }
        }.to raise_error(Mongoid::Errors::DocumentNotFound)
      end
    end

    context 'when question found, params question and answer present' do
      before :each do
        put :update, format: :json, params: { id: create(:question).id, question: { question: 'Test 1', answer: 'A' } }
      end

      it "should returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "should render the show json template" do
        expect(response).to render_template(:show)
      end

      it "should update the question" do
        question = Question.find(controller.params[:id])
        expect(question.question).to eq(controller.params[:question][:question])
      end
    end

    context 'when question found but params question blank' do
      before :each do
        put :update, format: :json, params: { id: create(:question).id, question: { question: '', answer: 'A' } }
      end

      it "should respond with 422" do
        expect(response).to have_http_status(422)
      end

      it "should respond with json contains error messages for question field" do
        expect(response.body).to eq({ question: ["can't be blank"] }.to_json)
      end
    end

    context 'when question found but params answer blank' do
      before :each do
        put :update, format: :json, params: { id: create(:question).id, question: { question: 'Test 1', answer: '' } }
      end

      it "should respond with 422" do
        expect(response).to have_http_status(422)
      end

      it "should respond with json contains error messages for answer field" do
        expect(response.body).to eq({ answer: ["can't be blank"] }.to_json)
      end
    end

    context 'when question found but params question and answer blank' do
      before :each do
        put :update, format: :json, params: { id: create(:question).id, question: { question: '', answer: '' } }
      end

      it "should respond with 422" do
        expect(response).to have_http_status(422)
      end

      it "should respond with json contains error messages for answer field" do
        expect(response.body).to eq({ question: ["can't be blank"], answer: ["can't be blank"] }.to_json)
      end
    end
  end

  # test the destroy action
  describe "DELETE #destroy" do
    context 'when question not found' do
      it "should raise Mongoid::Errors::DocumentNotFound exception" do
        expect{
          delete :destroy, format: :json, params: { id: '12345' }
        }.to raise_error(Mongoid::Errors::DocumentNotFound)
      end
    end

    context 'when question found' do
      before :each do
        delete :destroy, format: :json, params: { id: create(:question).id }
      end

      it "should returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "should delete the question from the database" do
        expect(Question.where(id: controller.params[:id])).to be_empty
      end
    end
  end

  # test the get_random action
  describe "GET #get_random" do
    context 'when there is any questions' do
      before :each do
        @question = create(:question)
        get :get_random, format: :json
      end

      it "should returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "should render get_random json template" do
        expect(response).to render_template(:get_random)
      end
    end
  end

  # test the get_random action
  describe "POST #check_answer" do
    context 'when question not found' do
      it "should raise Mongoid::Errors::DocumentNotFound exception" do
        expect{
          post :check_answer, format: :json, params: { id: '12345' }
        }.to raise_error(Mongoid::Errors::DocumentNotFound)
      end
    end

    context 'when question found and answer is correct' do
      before :each do
        post :check_answer, format: :json, params: {
          id: create(:question, :answer_equal_2),
          question: { answer: '2' }
        }
      end

      it "should returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "should respond with json with correctness status set to true" do
        expect(response.body).to eq({ correct: true }.to_json)
      end
    end

    context 'when question found and answer is correct (in words format)' do
      before :each do
        post :check_answer, format: :json, params: {
          id: create(:question, :answer_equal_2),
          question: { answer: 'two' }
        }
      end

      it "should returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "should respond with json with correctness status set to true" do
        expect(response.body).to eq({ correct: true }.to_json)
      end
    end

    context 'when question found but answer is incorrect' do
      before :each do
        post :check_answer, format: :json, params: {
          id: create(:question, :answer_equal_2),
          question: { answer: '5' }
        }
      end

      it "should returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "should respond with json with correctness status set to false" do
        expect(response.body).to eq({ correct: false }.to_json)
      end
    end
  end
end
