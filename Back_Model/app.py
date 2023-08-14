from flask import Flask, request,jsonify
import os 
import yaml
from tensorflow.keras import preprocessing,utils
import numpy as np
import tensorflow.keras as k
import string
from flask_cors import CORS

app=Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return "Hello, world!"


def create_encoder_decoder_models(encoder_inputs,encoder_states,decoder_lstm,decoder_embedding,decoder_dense,decoder_inputs):
    ##model -encoder-
    encoder_model=k.models.Model(encoder_inputs,encoder_states)
    ##decoder
    decoder_input_state_h=k.layers.Input(shape=(200,))
    decoder_input_state_c=k.layers.Input(shape=(200,))
    decoder_input_states=[decoder_input_state_h,decoder_input_state_c]

    decoder_output,state_h,state_c=decoder_lstm(decoder_embedding,initial_state=decoder_input_states)

    decoder_output_states=[state_h,state_c]
    decoder_output =decoder_dense(decoder_output)
    decoder_model = k.models.Model([decoder_inputs]+decoder_input_states,[decoder_output]+decoder_output_states)
    return encoder_model,decoder_model



test =True
def question_to_tokens(question,question_word_dict,longest_question):
    
    question=question.translate(str.maketrans('','',string.punctuation))
    words=question.lower().split()
    tokens=[]
    for word in words:
        try:
            tokens.append(question_word_dict[word])
        except:
            print("the question is not recognized!")
            test=False
            break
    return preprocessing.sequence.pad_sequences([tokens],maxlen=longest_question,padding='post')



@app.route('/your-route/<string_param>', methods=['POST'])
def your_route_handler(string_param):
    path='/home/mohamedtez/Desktop/PCD_Project/tutor1/data'
    files=os.listdir(path)
    questions=[]
    answers=[]
    for file in files:
        data=open(path+'/'+file,'rb')
        docs=yaml.safe_load(data)
        conversations=docs['conversations']
        for dialogue in conversations:
            if (len(dialogue)>2):
                questions.append(dialogue[0])
                ans=dialogue[1:]
                responses=""
                for res in ans:
                    responses+=' '+res
                answers.append(responses)
            elif len(dialogue)==2:
                questions.append(dialogue[0])
                answers.append(dialogue[1])
    ##part1
    encoder_questions=questions
    tokenizer=preprocessing.text.Tokenizer()
    tokenizer.fit_on_texts(encoder_questions)
    tkz_encoder_questions=tokenizer.texts_to_sequences(encoder_questions)
    ##questions
    longest_question=0
    for que in tkz_encoder_questions:
        if len(que)>longest_question:
            longest_question=len(que)
    padded_tkz_encoder_questions=preprocessing.sequence.pad_sequences(tkz_encoder_questions,maxlen=longest_question,padding='post')
    encoder_questions=np.array(padded_tkz_encoder_questions)
    encoder_questions.shape
    question_word_dict=tokenizer.word_index
    question_word_dict
    question_tokens=len(question_word_dict)+1
    ##part2
    decoder_answers=[]
    for ans in answers:
        decoder_answers.append('<START>'+ans+'<END>')
    
    tokenizer=preprocessing.text.Tokenizer()
    tokenizer.fit_on_texts(decoder_answers)
    tkz_decoder_answers=tokenizer.texts_to_sequences(decoder_answers)
    ##jawna behyyy
    longest_answer=0
    for ans in tkz_decoder_answers:
        if len(ans)>longest_answer:
            longest_answer=len(ans)
    padded_tkz_decoder_answers=preprocessing.sequence.pad_sequences(tkz_decoder_answers,maxlen=longest_answer,padding='post')
    padded_decoder=np.array(padded_tkz_decoder_answers)
    padded_decoder.shape
    answer_word_dict=tokenizer.word_index
    answer_word_dict
    answers_tokens=len(answer_word_dict)+1
    ##part3
    decoder_target_data=[]
    for token in tkz_decoder_answers:
        decoder_target_data.append(token[1:])
    temp=preprocessing.sequence.pad_sequences(decoder_target_data,maxlen=longest_answer,padding='post')
    ##jawna behyy
    onehot_padded_answers=utils.to_categorical(temp,answers_tokens)
    decoder_target_data=np.array(onehot_padded_answers)
    decoder_target_data
    ##part4
    encoder_inputs=k.layers.Input(shape=(None,))
    encoder_embedding=k.layers.Embedding(question_tokens,200,mask_zero=True)(encoder_inputs)
    encoder_outputs,state_h,state_c=k.layers.LSTM(200,return_state=True)(encoder_embedding)
    encoder_states=[state_h,state_c]

    decoder_inputs=k.layers.Input(shape=(None,))
    decoder_embedding=k.layers.Embedding(answers_tokens,200,mask_zero=True)(decoder_inputs)
    decoder_lstm=k.layers.LSTM(200,return_state=True,return_sequences=True)
    decoder_output, _,_ =decoder_lstm(decoder_embedding,initial_state=encoder_states)
    decoder_dense=k.layers.Dense(answers_tokens,activation=k.activations.softmax)
    output=decoder_dense(decoder_output)



    model=k.models.Model([encoder_inputs,decoder_inputs],output)
    model.compile(optimizer=k.optimizers.RMSprop(),loss='categorical_crossentropy',metrics=['accuracy'])
    ##part5
    enc_model,dec_model=create_encoder_decoder_models(encoder_inputs,encoder_states,decoder_lstm,decoder_embedding,decoder_dense,decoder_inputs)
    enc_model
    ##part6
    enc_model=k.models.load_model('/home/mohamedtez/Desktop/PCD_Project/tutor1/encoder_model.h5',compile=False)
    dec_model=k.models.load_model('/home/mohamedtez/Desktop/PCD_Project/tutor1/decoder_model.h5',compile=False)
    ##part6
    states_values=enc_model.predict(question_to_tokens(string_param,question_word_dict,longest_question))##in this line we can test any string
    token=np.zeros((1,1))
    token[0,0]= answer_word_dict['start']

    if test==True:
        stop_condition= False
    else:
        stop_condition= True
    chatbot_answer=""
    while not stop_condition:
        dec_output,h,c=dec_model.predict([token]+states_values)
        index=np.argmax(dec_output[0,0,:])
        word=list(answer_word_dict.keys())[index-1]
        chatbot_answer+=' '+word
        if word == 'end' or len(chatbot_answer.split())>longest_answer:
            stop_condition=True

        token[0,0]=index
        states_values=[h,c]

    ##print(chatbot_answer[:-3])
    ##question_tokens=len(question_word_dict)+1
    ## questions list of all the question
    ## responses list of all the answers
    # Access the request data as a byte string
    return jsonify(chatbot_answer[:-3])

if __name__=="__main__":
    app.run(debug=True)