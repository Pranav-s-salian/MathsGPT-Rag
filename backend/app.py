from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq
from langchain.chains.llm_math.base import LLMMathChain
from langchain_community.utilities import WikipediaAPIWrapper
from langchain.prompts import PromptTemplate
from langchain.agents import AgentType, initialize_agent, Tool
from langchain.schema import OutputParserException
import re

app = Flask(__name__)
CORS(app)

llm = ChatGroq(
    model='gemma2-9b-it',## feel free to use any good model  
    api_key="Replace with your groq api key"
    
)

def clean_llm_response(response):
    """Clean the LLM response to remove problematic formatting"""
    
    response = re.sub(r'<think>.*?</think>', '', response, flags=re.DOTALL)
    
    response = re.sub(r'\n+', '\n', response.strip())
    return response

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "message": "No data provided"
            }), 400
                 
        question = data.get('question')
        if not question:
            return jsonify({
                "message": "Question is required"
            }), 400
        
        print(f"Question received: {question}")
                 
        
        wikipedia_wrapper = WikipediaAPIWrapper()
        wikipedia_tool = Tool(
            name="Wikipedia",
            func=wikipedia_wrapper.run,
            description="Use this tool to search Wikipedia for factual information about topics, people, places, or events."
        )
                 
        
        math_chain = LLMMathChain.from_llm(llm=llm, verbose=False)
        calculator = Tool(
            name="Calculator",
            func=math_chain.run,
            description="Use this tool to perform mathematical calculations. Input should be a mathematical expression like '2+2' or '10*5/2'."
        )
                 
        
        reasoning_prompt = PromptTemplate(
            input_variables=['question'],
            template="""You are a helpful assistant that provides clear, logical reasoning for questions.
            
Question: {question}

Provide a step-by-step logical explanation and answer."""
        )
        
        
        reasoning_chain = reasoning_prompt | llm
        
        def reasoning_func(query):
            try:
                result = reasoning_chain.invoke({"question": query})
                
                if hasattr(result, 'content'):
                    return clean_llm_response(result.content)
                else:
                    return clean_llm_response(str(result))
            except Exception as e:
                return f"Error in reasoning: {str(e)}"
                           
        reasoning_tool = Tool(
            name="Reasoning",
            func=reasoning_func,
            description="Use this tool for logical reasoning, explanations, and general questions that don't require calculations or Wikipedia searches."
        )
                           
        
        assistant_agent = initialize_agent(
            tools=[calculator, wikipedia_tool, reasoning_tool],
            llm=llm,
            agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True,
            max_iterations=3,  
            early_stopping_method="generate"
        )
                 
        
        try:
            response = assistant_agent.invoke({"input": question})
            
            
            if isinstance(response, dict):
                final_answer = response.get('output', str(response))
            else:
                final_answer = str(response)
            
            final_answer = clean_llm_response(final_answer)
            
            return jsonify({
                'success': True,
                'message': final_answer
            }), 200
            
        except OutputParserException as e:
            print(f"Parser error: {e}")
            
            fallback_response = llm.invoke(f"Please answer this question clearly and concisely: {question}")
            if hasattr(fallback_response, 'content'):
                content = fallback_response.content
            else:
                content = str(fallback_response)
            
            return jsonify({
                'success': True,
                'message': clean_llm_response(content)
            }), 200
            
        except Exception as e:
            print(f"Agent error: {e}")
            return jsonify({
                'success': False,
                'message': f"I encountered an error while processing your question: {str(e)}"
            }), 500
         
    except Exception as e:
        print(f"General error: {e}")
        return jsonify({
            'success': False,
            'message': f"There was an error processing your request: {str(e)}"
        }), 500
                           
if __name__ == '__main__':
    app.run(debug=True)