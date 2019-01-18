import React, { Component } from 'react';
import './App.css';
import moodleXMLtoJson from 'moodlexml-to-json';
import aikenToMoodleXML from 'aiken-to-moodlexml';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: "",
      right :"",
      from: 'xml',
      to: 'json'
    }
  }
  render() {
    return (
      <div className="App">
       <header><h1> <i className="material-icons">school</i> QUIZ converter</h1></header>
       <div className="content"> 
          <div className="content-col left">
            <div><h2>From</h2>
            <select onChange={(e)=>{this.setState({from: e.target.value})}} value={this.state.from}>
              <option value="xml" >MoodleXML</option>
              <option value="txt" >Aiken</option>
              <option disabled value="json" >JSON</option>
            </select>
            </div>
            <textarea onChange={(e)=>{this.onWrite(e,'left')}} value={this.state.left}></textarea>
            <div className="buttons">
              <button onClick={this.convert.bind(this)}>
                <i className="material-icons">play_arrow</i>Convert
              </button>
              <button onClick={this.reset.bind(this)}>
                <i className="material-icons">replay</i>Reset
              </button>
            </div>
          </div>
          <div className="content-col right">
            <div><h2>To</h2>
            <select onChange={(e)=>{this.setState({to: e.target.value})}} value={this.state.to}>
              <option value="xml" >MoodleXML</option>
              <option disabled value="txt" >Aiken</option>
              <option value="json" >JSON</option>
            </select>
            </div>
            <textarea ref="right" onChange={(e)=>{this.onWrite(e,'right')}} value={this.state.right}></textarea>
            <div className="buttons">
              <button onClick={()=>{
                this.refs.right.select();
                document.execCommand('copy');
              }}>
                <i className="material-icons">file_copy</i>Copy
              </button>
              <button onClick={()=>{this.download("quiz."+this.state.to, this.state.right)}}>
                <i className="material-icons">cloud_download</i>Download
              </button>
            </div>
          </div>
       </div>
      </div>
    );
  }
  convert() {
    const {from, to, left} = this.state;
    if (from === "xml" && to === "json") {
      moodleXMLtoJson(left, (res,err)=>{
        let right = JSON.stringify(res, null, 2)
        if (err) {
          console.error(err);
          alert("Not a valid MoodleXML file");
          this.setState({right: ''});
          return;
        }
        this.setState({right});
      })
    } else if (from === "txt" && to === "json") {
      aikenToMoodleXML(left, (result,error)=>{
        moodleXMLtoJson(result.replace(/\t/g, "  "), (res,err)=>{
          let right = JSON.stringify(res, null, 2)
          if (err) {
            console.error(err);
            alert("Not a valid Aiken file");
            this.setState({right: ''});
            return;
          }
          this.setState({right});
        })
      })
    } else if (from === "txt" && to === "xml") {
      aikenToMoodleXML(left, (res, err) => {
          let right = (res)
          .replace(/\t/g, "  ");
          if (err) {
            console.error(err);
            alert("Not a valid Aiken file");
            this.setState({right: ''});
            return;
          }
          this.setState({right});
      })
    } else if (from === "xml" && to === "xml") {
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
      const {left, right, from, to} = this.state;
      localStorage.moodleXMLtoJson = JSON.stringify({left, right, from, to});
    };
    if (localStorage.moodleXMLtoJson) {
      const {left, from, to} = JSON.parse(localStorage.moodleXMLtoJson);
      this.setState({left, from, to});
    }
  }


}

export default App;
