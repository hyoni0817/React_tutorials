import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 0; // id값은 렌더링 되는 값이 아니기 때문에 굳이 setState에 넣어줄 필요없다.
  state = {
    information: [] 

  }
  handleCreate = (data) => {
    //this.state.information.push(data); 처럼 사용하면 절대 안된다.
    //push를 사용하지 않고 concat이라는 내장함수를 사용한다.
    // this.setState({
    //   information:this.state.information, 
    // }) 이렇게도 해주면 안된다.
    const { information } = this.state;
    this.setState({
      information:information.concat(Object.assign({}, data, {
        //...data,
        // name:data.name,
        // phone:data.phone,
        id: this.id++
      }))
    });
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState ({
      //info 값이 info.id가 파라미터로 받은 id가 아닌 것들만 필터링 하기
      information : information.filter(info => info.id !== id) 
    })
  }

  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information : information.map(
        info => {
          if(info.id === id) {
            return {
              id, 
              ...data,
            };
          }
          return info;
        }
      )
    })
  }
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        {/*Ctrl 키를 누르고 아래 phoneInfoList 에 마우스 커서를 대면 파일을 바로 열 수 있다.*/}
        <PhoneInfoList 
          data={this.state.information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
