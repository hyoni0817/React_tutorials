import React, { Component, Fragment } from 'react';

class PhoneInfo extends Component {

    state = {
        editing : false,
        name: '',
        phone: ''
    }

    //scu를 입력하면 shouldComponentUpdate가 실행됨
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state !== nextState) {
            return true;
        }
        return this.props.info !== nextProps.info;
        //만약에 위의 코드들이 === 라면 render함수를 호출하지 않는다.
    }
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);

    }

    handleToggleEdit = () => {
        //editing 값이 true -> false
        //onUpate 사용 -> 내가 업데이트 하겠다는 것을 부모컴포넌트에 알림
        ///editing 값이 false -> true
        //state에 info 값을 넣어주기
        const { info, onUpdate } = this.props;
        if(this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        } else {
            this.setState({
                name:info.name,
                phone:info.phone
            });
        }
        this.setState({
            editing : !this.state.editing
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { name, phone } = this.props.info; 
        const { editing } = this.state;
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        console.log(name);

        return (
            <div style={style}>
                {
                    editing ? (
                        <Fragment>
                            <div>
                                <input 
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                />
                            </div>
                            <div>
                                <input 
                                    name="phone"
                                    onChange={this.handleChange}
                                    value={this.state.phone}
                                />
                            </div>                        
                        </Fragment>
                        
                    ) : (
                        <Fragment>
                            <div><b>{name}</b></div>
                            <div>{phone}</div>
                        </Fragment>
                    )
                }
                <button onClick={this.handleRemove}>삭제</button>
                <button onClick={this.handleToggleEdit}>
                    {editing ? '적용' : '수정'}
                </button>
            </div>
        );
    }
}

export default PhoneInfo;