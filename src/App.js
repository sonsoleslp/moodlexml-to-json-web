import React, { Component } from 'react';
import './App.css';
import moodleXMLtoJson from 'moodlexml-to-json';
import aikenToMoodleXML from 'aiken-to-moodlexml';
import sampleAiken from './sampleAiken';
// import * as Moodle from './moodle';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DropdownButton from 'react-bootstrap/DropdownButton'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: sampleAiken,
      right :"",
      from: 'txt',
      to: 'xml',
      es: false,
      nsnc: false,
      penalty: false,
      shuffle: false,
      matchingToMultiple: false,
    }
  }

  
  render() {
    var opcion = "'#{option}'"

    const SpanishTooltip = props => (
      <Tooltip {...props}>Spanish description</Tooltip>
    );

    const EmptyOptionTooltip = props => (
      <Tooltip {...props}>Empty option description</Tooltip>
    );

    const ProportionalPenaltyTooltip = props => (
      <Tooltip {...props}>Proportional penalty description</Tooltip>
    );

    const ShuffleTooltip = props => (
      <Tooltip {...props}>Shuffle description</Tooltip>
    );

    const MatchingToMultipleChoiceTooltip = props => (
      <Tooltip {...props}>
        <label>Transform matching question to multiple choice. It is necessary to include the text {opcion} for craeting the question properly</label>
        <span className="font-weight-bold">The input matching question must be in Aiken format</span>
      </Tooltip>
    );

    return (
      <div className="App">
        <header>
          <h1> <i className="material-icons">school</i> QUIZ converter</h1>
          <div className="links">
            <a target="_blank" rel="noreferrer noopener" href="https://docs.moodle.org/38/en/Moodle_XML_format">MoodleXML</a>
            <a target="_blank" rel="noreferrer noopener" href="https://docs.moodle.org/38/en/Aiken_format">Aiken</a>
          </div>
        </header>
       <div className="content"> 
        
          <div className="content-col left">
             <div className="top-form">
                <div>   
                  <h2>From</h2>
                  <select className="form-control"  onChange={(e)=>{this.setState({from: e.target.value})}} value={this.state.from}>
                    <option value="xml" >MoodleXML</option>
                    <option value="txt" >Aiken</option>
                    {/* <option disabled value="json" >JSON</option> */}
                  </select>
                </div>
                <div>
                  <DropdownButton variant="outline-info"  id="questionsMenuButton" title="New Question">
                     <table>
                          <tbody>
                            <tr>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "multichoice")} type="button" className="btn btn-link">multichoice</button>
                              </td>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "essay")} type="button" className="btn btn-link">essay</button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "shortanswer")} type="button" className="btn btn-link">shortanswer</button>
                              </td>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "truefalse")} type="button" className="btn btn-link">truefalse</button>
                              </td>
                            </tr>
                          {/* <tr>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "description")} type="button" className="btn btn-link">description</button>
                              </td>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "cloze")} type="button" className="btn btn-link">cloze</button>
                              </td>
                            </tr>*/}
                            <tr>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "numerical")} type="button" className="btn btn-link">numerical</button>
                              </td>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "order")} type="button" className="btn btn-link">order</button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "matching")} type="button" className="btn btn-link">matching</button>
                              </td>
                              <td>
                                
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "matching2multiplechoice")} type="button" className="btn btn-link">matching2multiplechoice</button>
                              </td>
                              <td>
                                <button onClick={this.insertNewQuestion.bind(this, "personalizedQuestionType")} type="button" className="btn btn-link">personalizedQuestionType</button>
                              </td>
                            </tr>
                          </tbody>
                    </table>
                  </DropdownButton>
                  <div className="dropdown-menu" aria-labelledby="questionsMenuButton">
                   
                  </div>
                  <DropdownButton variant="outline-info"  id="settingsMenuButton" title="Settings">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.es} onChange={()=>this.setState({es: !this.state.es})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={SpanishTooltip}>
                                  <label className="lc">Spanish</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.nsnc} onChange={()=>this.setState({nsnc: !this.state.nsnc})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={EmptyOptionTooltip}>
                                  <label className="lc">Empty option</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.penalty} onChange={()=>this.setState({penalty: !this.state.penalty})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={ProportionalPenaltyTooltip}>
                                  <label className="lc">Proportional penalty</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.shuffle} onChange={()=>this.setState({shuffle: !this.state.shuffle})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={ShuffleTooltip}>
                                  <label className="lc">Shuffle</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <ul className="list-group list-group-horizontal ml-1 mr-1">
                              <div className="my-auto">
                                <input type="checkbox" checked={this.state.matchingToMultiple} onChange={()=>this.setState({matchingToMultiple: !this.state.matchingToMultiple})}/>
                              </div>
                              <div>
                                <OverlayTrigger placement="right" overlay={MatchingToMultipleChoiceTooltip}>
                                  <label className="lc">Matching to multiple choice</label>
                                </OverlayTrigger>
                              </div>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DropdownButton>

                </div>
                </div>

            <textarea onChange={(e)=>{this.onWrite(e,'left')}} value={this.state.left}></textarea>
            <div className="buttons">
              <button className="btn btn-info" disabled={!this.state.left} onClick={this.convert.bind(this)}>
                <i className="material-icons">play_arrow</i>Convert
              </button>
              <button className="btn btn-info" onClick={this.reset.bind(this)}>
                <i className="material-icons">replay</i>Reset
              </button>
            </div>
          </div>
          <div className="content-col right">
            <div className="top-form">
              <div>
                <h2>To</h2>
                <select className="form-control" onChange={(e)=>{this.setState({to: e.target.value})}} value={this.state.to}>
                  <option value="xml" >MoodleXML</option>
                  <option value="txt" >Aiken</option>
                  <option value="json" >JSON</option>
                </select>
              </div>
            </div>
            <textarea ref="right" onChange={(e)=>{this.onWrite(e,'right')}} value={this.state.right}></textarea>
            <div className="buttons">
              <button className="btn btn-info" disabled={!this.state.right}  onClick={()=>{
                this.refs.right.select();
                document.execCommand('copy');
              }}>
                <i className="material-icons">file_copy</i>Copy
              </button>
              <button className="btn btn-info" disabled={!this.state.right}  onClick={()=>{this.download("quiz."+this.state.to, this.state.right)}}>
                <i className="material-icons">cloud_download</i>Download
              </button>
            </div>
          </div>
       </div>
      </div>
    );
  }


  convert() {
    var {from, to, left} = this.state;
    
    if (from === "xml" && to === "json") {
      moodleXMLtoJson(left, (res,err)=>{
        if (err) {
          console.error(err);
          alert("Not a valid MoodleXML file");
          this.setState({right: ''});
          return;
        }
        let right = JSON.stringify(res, null, 2)
        this.setState({right});
      })
    } else if (from === "txt" && to === "json") {
      left = this.findPersonalizedQuestionsAndChange(left);
      if(this.state.matchingToMultiple){
        left = this.findMatchigQuestionsAndChange(left);
      }
      aikenToMoodleXML(left, (result, error)=>{
        console.log(result, error)
        moodleXMLtoJson(result.replace(/\t/g, "  "), (res,err)=>{
          if (err) {
            console.error(err);
            alert("Not a valid Aiken file");
            this.setState({right: ''});
            return;
          }
          let right = JSON.stringify(res, null, 2)
          
          this.setState({right});
        })
      }, {lang: this.state.es ? "es": "en", penalty: this.state.penalty, nsnc: this.state.nsnc, shuffle: this.state.shuffle});
    } else if (from === "txt" && to === "xml") {
      left = this.findPersonalizedQuestionsAndChange(left);
      if(this.state.matchingToMultiple){
        left = this.findMatchigQuestionsAndChange(left);
      }
      aikenToMoodleXML(left, (res, err) => {
        if (err) {
          console.error(err);
          alert("Not a valid Aiken file");
          this.setState({right: ''});
          return;
        }
          let right = (res)
          .replace(/\t/g, "  ");
          
          this.setState({right});
      }, {lang: this.state.es ? "es": "en", penalty: this.state.penalty, nsnc: this.state.nsnc, shuffle: this.state.shuffle});
    } else if (from === "xml" && to === "xml") {
      this.setState({right: left});
    }else if (from === "txt" && to === "txt"){

      left = this.findPersonalizedQuestionsAndChange(left);

      if(this.state.matchingToMultiple){
        left = this.findMatchigQuestionsAndChange(left);
      }
      this.setState({right: left});
    }
  }

  reset() {
    this.setState({left:"", right: ""});
  }

  onWrite(e,side){
    this.setState({ [side]: e.target.value});
  }

  download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  componentDidMount(){
    window.onbeforeunload = (e) => {
      let {left, right, from, to, es, penalty, nsnc, shuffle, matchingToMultiple} = this.state;
      if (left === "") {
        localStorage.removeItem("moodleXMLtoJson");
      } else {
        localStorage.moodleXMLtoJson = JSON.stringify({left, right, from, to, es, penalty, nsnc, shuffle, matchingToMultiple});
      }
    };
    if (localStorage.moodleXMLtoJson) {
      const {left, from, to, es, penalty, nsnc, shuffle, matchingToMultiple} = JSON.parse(localStorage.moodleXMLtoJson);
      this.setState({left, from, to, es, penalty, nsnc, shuffle, matchingToMultiple});
    }
    // window.Moodle = Moodle;
  }

  findPersonalizedQuestionsAndChange(questions){
    var t = questions.split("\n");    
    var result = '';
    var write = true;
    var aux = '';
    for (var i = 0;i<t.length;i++){
      if(write && t[i].includes("personalizedQuestionType")){
        write = false
      } else if (!write && (t[i].includes("essay") || t[i].includes("shortanswer") || t[i].includes("truefalse") || t[i].includes("description") || t[i].includes("cloze") || t[i].includes("numerical") || t[i].includes("order") || t[i].includes("multichoice"))){
        write = true
        result = result + this.matchingPersonalizedAikenToMultipleMoodleXML(aux);
        aux = ''
      }else if (!write && t[i].includes("personalizedQuestionType")){
        write = false
        result = result + this.matchingPersonalizedAikenToMultipleMoodleXML(aux);   
        aux = ''
      }else if (!write && i+1 === t.length){
        aux = aux + t[i];
        write = false
        result = result + this.matchingPersonalizedAikenToMultipleMoodleXML(aux);    
        aux = ''
      }
      if(write){
        result = result + t[i] + "\n";
      }else{
        aux = aux + t[i] +"\n";
      }
    }
    console.log(result);
    return result;
    
  }

  findMatchigQuestionsAndChange(questions){
    var t = questions.split("\n");    
    var result = '';
    var write = true;
    var aux = '';
    for (var i = 0;i<t.length;i++){
      if(write && t[i].includes("matching")){
        write = false
      } else if (!write && (t[i].includes("essay") || t[i].includes("shortanswer") || t[i].includes("truefalse") || t[i].includes("description") || t[i].includes("cloze") || t[i].includes("numerical") || t[i].includes("order") || t[i].includes("multichoice"))){
        write = true
        result = result + this.matchingAikenToMultipleMoodleXML(aux);
        aux = ''
      }else if (!write && t[i].includes("matching")){
        write = false
        result = result + this.matchingAikenToMultipleMoodleXML(aux);  
        aux = ''
      }else if (!write && i+1 === t.length){
        aux = aux + t[i];
        write = false
        result = result + this.matchingAikenToMultipleMoodleXML(aux);      
        aux = ''
      }
      if(write){
        result = result + t[i] + "\n";
      }else{
        aux = aux + t[i] +"\n";
      }
    }
    console.log(result);
    return result;
    
  }

  matchingAikenToMultipleMoodleXML(matchingQuestion){
    var m = matchingQuestion.split("\n");
    
    var cnt = 1;
    var question = ['','']
    var options = [];
    var answers = [];
    var feedback = "Good";
    for (var i = 0;i < m.length;i++){
      
      if (m[i].includes('#{option}')){
        question = m[i].split('#{option}');        
      }
      if(i+1 <= m.length && (m[i].includes(cnt.toString()+'.') && m[i+1].includes("match"))){        
        options.push(m[i].split(cnt+'. ')[1]);
        answers.push(m[i+1].split('match: ')[1]);
        cnt ++;
      }else if(m[i].includes("Feedback:")){
        feedback = m[i].split('Feedback: ')[1]
      }
    }

    var result = ''

    for ( var k = 0; k < options.length;k++){
      result = result+"multichoice\n"
      result = result+question[0]+options[k]+question[1]+"\n";
      for(var j = 0; j < answers.length;j++){
        result = result+String.fromCodePoint(65+j)+". "+answers[j]+"\n"
      }
      result = result+"Answer: "+String.fromCodePoint(65+k)+"\n"
      result = result+"Feedback: " + feedback + "\n\n";
    }
    
    return result
  }

  matchingPersonalizedAikenToMultipleMoodleXML(matchingPersonalizedQuestion){
    var m = matchingPersonalizedQuestion.split("\n");
    
    var cnt = 0;
    var questions = [];
    var options = [];
    var answers = [];
    var feedback = "Good";
    for (var i = 0;i < m.length;i++){      
      if(i+1 <= m.length && (m[i].includes('Q:') && m[i+1].includes('Answer:'))){        
        questions.push(m[i].split('Q: ')[1]);
        answers.push(m[i+1].split('Answer: ')[1]);
      }else if(m[i].includes(String.fromCodePoint(65+cnt)+'. ')){    
        console.log(m[i]);
            
        options.push(m[i].split(String.fromCodePoint(65+cnt)+'. ')[1]);
        cnt ++;
      }else if(m[i].includes("Feedback:")){
        feedback = m[i].split('Feedback: ')[1]
      }
    }

    var result = ''

    for ( var k = 0; k < questions.length;k++){
      result = result+"multichoice\n"
      result = result+questions[k]+"\n";
      for(var j = 0; j < options.length;j++){
        result = result+String.fromCodePoint(65+j)+". "+options[j]+"\n"
      }
      result = result+"Answer: "+answers[k]+"\n"
      result = result+"Feedback: " + feedback + "\n\n";
    }
    
    return result
  }

  aikenToMoodle(aikenText){
    var re = '';

    aikenToMoodleXML(aikenText, (res, err) => {
      if (err) {
        console.error(err);
        alert("Not a valid Aiken file");
        return;
      }
        re = (res).replace(/\t/g, "  ");
        
    }, {lang: this.state.es ? "es": "en", penalty: this.state.penalty, nsnc: this.state.nsnc, shuffle: this.state.shuffle});

    return re
  }

  insertNewQuestion(type){

const multichoice =  `
multichoice
When an organization decides to control the flow of incident information within the IT organization, which ITIL process would it be putting in place?
A. Availability Management
B. Change Management
C. Incident Management
D. Problem Management
Answer: C, D
gfeed. Duh!

`
const essay =  `
essay
The new role of social blogging in e-learning.
gfeed. Write something about Twitter, Facebook from the aspects of teaching and colloboration.

`
const shortanswer =  `
shortanswer
Calculate: 2 + 2 
Answer: 4, four

`

const truefalse =  `
truefalse
The founder of "Apple" was Steve Jobs.
Answer: True
Feedback: Steve Jobs is the CEO of Apple, which he co-founded in 1976.

`
const description =  `
description
Open Office is the alternative to Microsoft Office.

`

const cloze =  `
cloze
Infrastructure <{1:MULTICHOICE:=Monitoring~Controlling~Service} will provide support teams with alerts directly allowing for faster resolution. 
Such alerts do not need to be recorded in the Incident Management tool as there is little added value in this {1:MULTICHOICE:=true~false}. 
Typically the incident will be resolved automatically before the customer recognises it.

`
const numerical =  `
numerical
How many books are in ITIL V3? Answer only with a number.
Answer: 5, 7

`
const order =  `
order
Place in ascending order
1. 200
2. 500
3. 100
ANSWER: 3,1,2

`
const matching =  `
matching
Match cities and countries
1. Yakutsk
match: Russia
2. Tampere
match: Finland
3. Harbin
match: China
Feedback: Good job!

`;
const matching2multiplechoice =  `
matching
In which country is #{option}?
1. Yakutsk
match: Russia
2. Tampere
match: Finland
3. Harbin
match: China
Feedback: Good job!

`;
const personalizedQuestionType =  `
personalizedQuestionType
Q: In which country is Madrid?
Answer: A
Q: In which country is Barcelona?
Answer: A
Q: In which country is Sevilla?
Answer: A
Q: In which country is Paris?
Answer: B
Q: In which country is London?
Answer: C
A. Spain
B. France
C. United Kingdom
Feedback: Good job!

`;
    const types = {
      multichoice,
      essay,
      shortanswer,
      truefalse,
      description,
      cloze,
      numerical,
      order,
      matching,
      matching2multiplechoice,
      personalizedQuestionType,
    };
    console.log(type)
    if(this.state.from === "txt"){
      this.setState({left : this.state.left + types[type]})
    }else if(this.state.from === "xml"){
      this.setState({left : this.state.left + this.aikenToMoodle(types[type])})
    }else{
      console.log("Error: not possible state");
    }

  }
  
}

export default App;
