import React from 'react';
import Cube from './cube';
import Timer from '../timer/timer';
import BPM from '../bpm/bpm';
import $ from "jquery";
import SampleContainer from '../sample/sample_container'
import { timingSafeEqual } from 'crypto';


class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.grid = this.props.grid;
    this.timer = 0;
    this.bpm = 120;
    this.addTimer = this.addTimer.bind(this);
    this.switchPos = this.switchPos.bind(this);
    // this.bpmChanger = this.bpmChanger.bind(this);
    // debugger
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   // debugger

  //   let ele = e.currentTarget;
  //   // return ($(ele).addClass("here"));
  // }

  classDispersion(ele) {
    let col = document.getElementById(`idx${ele}`);

    for (let i = 0; i < col.children.length; i++) {
      if (col.children[i].className !== "clicked") {
        $(col.children[i]).addClass("rowLit1");
      } else {
        $(col.children[i]).addClass("bright");
        $(col.children[i]).removeClass("clicked");
      }
    }

    let temp;
    let oldCol;

    temp = ((ele - 1 + 16) % 16);
    oldCol = document.getElementById(`idx${temp}`);

    for (let i = 0; i < oldCol.children.length; i++) {
      // debugger
      if ((oldCol.children[i].className === "ele rowLit1")) {
        $(oldCol.children[i]).removeClass("rowLit1");
        $(oldCol.children[i]).addClass("rowLit2");
      } else if (oldCol.children[i].className === "bright") {
        $(oldCol.children[i]).removeClass("bright");
        $(oldCol.children[i]).addClass("clicked");
      }
    }

    temp = ((ele - 2 + 16) % 16);
    oldCol = document.getElementById(`idx${temp}`);

    for (let i = 0; i < oldCol.children.length; i++) {
      if ((oldCol.children[i].className === "ele rowLit2")) {
        $(oldCol.children[i]).removeClass("rowLit2");
        $(oldCol.children[i]).addClass("rowLit3");
      } 
    }

    temp = ((ele - 3 + 16) % 16);
    oldCol = document.getElementById(`idx${temp}`);

    for (let i = 0; i < oldCol.children.length; i++) {
      if ((oldCol.children[i].className === "ele rowLit3")) {
        $(oldCol.children[i]).removeClass("rowLit3");
        $(oldCol.children[i]).addClass("rowLit4");
      }
    }

    temp = ((ele - 4 + 16) % 16);
    oldCol = document.getElementById(`idx${temp}`);

    for (let i = 0; i < oldCol.children.length; i++) {
      if ((oldCol.children[i].className === "ele rowLit4")) {
        $(oldCol.children[i]).removeClass("rowLit4");
        $(oldCol.children[i]).addClass("rowLit5");
      }
    }

    temp = ((ele - 5 + 16) % 16);
    oldCol = document.getElementById(`idx${temp}`);

    for (let i = 0; i < oldCol.children.length; i++) {
      if ((oldCol.children[i].className === "ele rowLit5")) {
        $(oldCol.children[i]).removeClass("rowLit5");
      }
    }
  }

  addTimer(ele) {
    if (document.getElementById(`idx${ele}`)) {
      this.classDispersion(ele);
    }
    
    // debugger
    this.timer = ele;
    // console.log(this.grid[ele]);
    this.playAudioRow(this.grid[this.timer]);

  }

  playAudioRow(row){
    row.forEach( (ele, idx) => {
      if (ele === 1){
        let audio = document.getElementById(`sample-${idx}`);
        audio.load();
        audio.play();
      }
    });
  }



  switchPos(coord) {
    let pos = this.grid[coord[0]][coord[1]];
    if (pos === 1) {
      this.grid[coord[0]][coord[1]] = 0;
    } else {
      this.grid[coord[0]][coord[1]] = 1;
    }

    // console.log(this.grid);
  }

  render() {
    // debugger
    return (
      <div className="outsideGrid">
        <div className="gridBackground">
          <div className="mainGrid">
            {this.grid.map((row, idx) => ( 
              <div className="row" id={`idx${idx}`} key={idx}>
              {row.map((ele, idx2) => (
                < Cube 
                  row={idx} 
                  col={idx2} 
                  key={idx2} 
                  ele={ele}
                  switchPos={this.switchPos}/>
              ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <Timer start={this.timer} addTimer={this.addTimer} bpm={this.bpm}/>
        </div>
        <div>
          <SampleContainer/>
        </div>
      </div>
    )
  }
}

export default Grid;