import React, { Component } from 'react';

class PhoneForm extends Component {
    input = React.createRef();
    //input = null;
    state = {
        name: '',
        phone: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value //input이 이벤트 타겟
        });
    }

    handleSubmit = (e) => {
        e.preventDefault(); //페이지 리로딩 방지
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: ''
        });
        //this.input.focus();
        this.input.current.focus(); 
        //등록 후 포커스가 다시 이름에 위치함
        //current라는 값을 통해서 해당 DOM에 접근 가능해짐(createRef 사용했을 때)
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name="name" 
                    placeholder="이름" 
                    onChange={this.handleChange} 
                    value={this.state.name}
                    ref={this.input}
                    /** ref={ref => this.input = ref}*/
                />
                <input
                    name="phone"
                    placeholder="전화번호"
                    onChange={this.handleChange}
                    value={this.state.phone}
                />
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;