import React, {Component} from 'react';

import './assets/scss/App.css';

import Toast from './components/Toast';



class App extends Component {

    state = {
        queue: [],
        errorMsg: false,
        levelError: true,
        enableSubmit: false,
    };


    onSubmit = (event) => {

        event.preventDefault();
        const {title, text, level} = this.state;
        if (level === 'success' || level === 'success' || level === 'warning' || level === 'error'){
            this.setState({enableSubmit: true});
        }
        if (this.state.title == null || this.state.text == null || this.state.level == null || this.state.enableSubmit == false) {

            this.setState({errorMsg: true});

        } else {
            this.toast.showNotification({title, text, level});
        }

    };

    onChange = (event, field) => {

        this.setState({
            [field]: event.target.value
        });


        if (field === 'level') {
            const levelInput = event.target.value;
            if (levelInput === 'success' || levelInput === 'message' || levelInput === 'error' || levelInput === 'warning') {
                this.setState({enableSubmit: true});
            } else {
                this.setState({enableSubmit: false});
            }
        }
    }

    render() {
        return (
            <div className="app">
                <form className="form-container" onSubmit={this.onSubmit}>
                    <div>
                        <input
                            className={"form-input " + (this.state.errorMsg == true && this.state.title == null ? 'errorInput' : null)}
                            value={this.state.title || ''}
                            placeholder="Title..."
                            onChange={e => this.onChange(e, 'title')}/>
                        <label
                            className={'errorLabel'}> {this.state.errorMsg == true && this.state.title == null ? 'Missing title' : ''}</label>
                    </div>
                    <div>
                        <input
                            className={"form-input " + (this.state.errorMsg == true && this.state.text == null ? 'errorInput' : '')}
                            value={this.state.text || ''}
                            placeholder="Text..."
                            onChange={e => this.onChange(e, 'text')}/>
                        <label
                            className={'errorLabel'}>{this.state.errorMsg == true && this.state.text == null ? 'Missing text' : ''}</label>
                    </div>
                    <div>
                        <input
                            className={"form-input " + (this.state.errorMsg == true && this.state.level == null ? 'errorInput' : '')}
                            value={this.state.level || ''}
                            placeholder="Level... i.e: success"
                            onChange={e => this.onChange(e, 'level')}/>
                        <label
                            className={'errorLabel'}> {this.state.errorMsg == true && this.state.level == null ? 'Missing level' : ''}</label><br/>
                        <label className={'errorLabel'}> {this.state.enableSubmit == false && this.state.errorMsg == true ? 'Level text should be one of the following statuses: "Success", "Warning", "Error", "Message"' : ''}</label>
                    </div>
                    <div>
                        <button id={'submitForm'}
                                className={"form-submit"}>Show
                        </button>
                    </div>
                </form>

                <Toast ref={(element) => this.toast = element}/>


            </div>
        );
    }
}


export default App;
